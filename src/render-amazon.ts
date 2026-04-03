import crypto from "node:crypto";
import path from "node:path";
import {execFile} from "node:child_process";
import {promisify} from "node:util";
import {mkdir, writeFile} from "node:fs/promises";
import type {ProductItem} from "./Composition";
import {
  fileExists,
  projectRoot,
  readJsonFile,
  renderComposition,
  writeJsonFile,
} from "./render-helpers";
import {buildCompositionProps} from "./video-config";

type ProductUrlInput = {
  url: string;
};

type AmazonPaApiResponse = {
  imageUrl: string;
  title?: string;
};

type RenderConfig = {
  durationInFrames: number;
  voiceoverSrc: string | null;
};

type MetaOutput = {
  productUrl: string;
  title: string;
  benefit: string;
  tag: string;
  voiceoverScript: string;
  hashtags: string[];
  socialCaption: string;
  outputFile: string;
};

const execFileAsync = promisify(execFile);

const AMAZON_HOST = process.env.AMAZON_PAAPI_HOST ?? "webservices.amazon.com";
const AMAZON_REGION = process.env.AMAZON_PAAPI_REGION ?? "us-east-1";
const AMAZON_PARTNER_TAG = process.env.AMAZON_PAAPI_PARTNER_TAG;
const AMAZON_ACCESS_KEY = process.env.AMAZON_PAAPI_ACCESS_KEY;
const AMAZON_SECRET_KEY = process.env.AMAZON_PAAPI_SECRET_KEY;

const headers = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "accept-language": "en-US,en;q=0.9",
};

const BASE_DURATION_FRAMES = 210;
const FPS = 30;
const CTA_MIN_FRAMES = 40;

const logStep = (message: string) => {
  console.log(`[render:amazon] ${message}`);
};

const getCliUrl = () => {
  const args = process.argv.slice(2);
  return args.find((arg) => /^https?:\/\//i.test(arg)) ?? null;
};

const extractAsin = (url: string): string | null => {
  const patterns = [
    /\/dp\/([A-Z0-9]{10})(?:[/?]|$)/i,
    /\/gp\/product\/([A-Z0-9]{10})(?:[/?]|$)/i,
    /\/product\/([A-Z0-9]{10})(?:[/?]|$)/i,
    /asin=([A-Z0-9]{10})(?:[&]|$)/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return match[1].toUpperCase();
    }
  }

  return null;
};

const sha256Hex = (value: string) =>
  crypto.createHash("sha256").update(value).digest("hex");

const hmac = (key: Buffer | string, value: string) =>
  crypto.createHmac("sha256", key).update(value).digest();

const getSigningKey = (secret: string, dateStamp: string, region: string) => {
  const kDate = hmac(`AWS4${secret}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, "ProductAdvertisingAPI");
  return hmac(kService, "aws4_request");
};

const fetchFromPaApi = async (asin: string): Promise<AmazonPaApiResponse | null> => {
  if (
    !AMAZON_ACCESS_KEY ||
    !AMAZON_SECRET_KEY ||
    !AMAZON_PARTNER_TAG ||
    !asin
  ) {
    return null;
  }

  const endpoint = "/paapi5/getitems";
  const host = AMAZON_HOST;
  const region = AMAZON_REGION;
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
  const dateStamp = amzDate.slice(0, 8);

  const payload = JSON.stringify({
    ItemIds: [asin],
    PartnerTag: AMAZON_PARTNER_TAG,
    PartnerType: "Associates",
    Marketplace: "www.amazon.com",
    Resources: ["Images.Primary.Large", "ItemInfo.Title"],
  });

  const canonicalHeaders =
    `content-encoding:amz-1.0\n` +
    `content-type:application/json; charset=utf-8\n` +
    `host:${host}\n` +
    `x-amz-date:${amzDate}\n` +
    `x-amz-target:com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems\n`;
  const signedHeaders =
    "content-encoding;content-type;host;x-amz-date;x-amz-target";
  const canonicalRequest = [
    "POST",
    endpoint,
    "",
    canonicalHeaders,
    signedHeaders,
    sha256Hex(payload),
  ].join("\n");

  const credentialScope = `${dateStamp}/${region}/ProductAdvertisingAPI/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join("\n");

  const signingKey = getSigningKey(AMAZON_SECRET_KEY, dateStamp, region);
  const signature = crypto
    .createHmac("sha256", signingKey)
    .update(stringToSign)
    .digest("hex");

  const authorization =
    `AWS4-HMAC-SHA256 Credential=${AMAZON_ACCESS_KEY}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const response = await fetch(`https://${host}${endpoint}`, {
    method: "POST",
    headers: {
      "content-encoding": "amz-1.0",
      "content-type": "application/json; charset=utf-8",
      host,
      "x-amz-date": amzDate,
      "x-amz-target": "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems",
      authorization,
    },
    body: payload,
  });

  if (!response.ok) {
    const text = await response.text();
    logStep("Amazon PA API request failed, falling back to HTML extraction");
    console.warn(text);
    return null;
  }

  const data = (await response.json()) as {
    ItemsResult?: {
      Items?: Array<{
        Images?: {Primary?: {Large?: {URL?: string}}};
        ItemInfo?: {Title?: {DisplayValue?: string}};
      }>;
    };
  };

  const item = data.ItemsResult?.Items?.[0];
  const imageUrl = item?.Images?.Primary?.Large?.URL;
  const title = item?.ItemInfo?.Title?.DisplayValue;

  if (!imageUrl) {
    return null;
  }

  return {imageUrl, title};
};

const decodeHtml = (value: string) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const stripTags = (value: string) =>
  decodeHtml(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());

const findFirstMatch = (html: string, patterns: RegExp[]) => {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      return decodeHtml(match[1].trim());
    }
  }

  return null;
};

const fetchProductHtml = async (url: string) => {
  const response = await fetch(url, {headers, redirect: "follow"});
  if (!response.ok) {
    throw new Error(`Failed to fetch product page (${response.status}).`);
  }

  return response.text();
};

const extractFromHtml = (html: string): AmazonPaApiResponse => {
  const imageUrl = findFirstMatch(html, [
    /<meta\s+property="og:image"\s+content="([^"]+)"/i,
    /<meta\s+name="twitter:image"\s+content="([^"]+)"/i,
    /"hiRes"\s*:\s*"([^"]+)"/i,
    /"large"\s*:\s*"([^"]+)"/i,
    /"mainUrl"\s*:\s*"([^"]+)"/i,
    /data-old-hires="([^"]+)"/i,
  ]);

  const title =
    findFirstMatch(html, [
      /<span[^>]*id="productTitle"[^>]*>\s*([^<]+)\s*<\/span>/i,
      /<title>\s*([^<]+?)\s*<\/title>/i,
    ]) ?? undefined;

  if (!imageUrl) {
    throw new Error(
      "Could not find a primary product image on the Amazon page."
    );
  }

  return {imageUrl, title};
};

const findBenefitCandidates = (html: string) => {
  const candidates: string[] = [];

  const bulletSectionMatch = html.match(
    /<div[^>]*id="feature-bullets"[\s\S]*?<\/div>/i
  );

  if (bulletSectionMatch?.[0]) {
    const bulletMatches = bulletSectionMatch[0].matchAll(
      /<span[^>]*class="[^"]*a-list-item[^"]*"[^>]*>([\s\S]*?)<\/span>/gi
    );

    for (const match of bulletMatches) {
      const cleaned = stripTags(match[1] ?? "");
      if (cleaned) {
        candidates.push(cleaned);
      }
    }
  }

  const descriptionCandidates = [
    /<meta\s+name="description"\s+content="([^"]+)"/i,
    /<div[^>]*id="productDescription"[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i,
  ];

  for (const pattern of descriptionCandidates) {
    const match = html.match(pattern);
    if (match?.[1]) {
      candidates.push(stripTags(match[1]));
    }
  }

  return candidates;
};

const isUsefulBenefit = (value: string) => {
  const cleaned = value.replace(/\s+/g, " ").trim();
  if (cleaned.length < 18 || cleaned.length > 140) {
    return false;
  }

  const bannedSnippets = [
    "make sure this fits",
    "amazon",
    "ships from",
    "sold by",
    "visit the",
    "learn more",
    "customer reviews",
  ];

  return !bannedSnippets.some((snippet) =>
    cleaned.toLowerCase().includes(snippet)
  );
};

const toSentenceCase = (value: string) => {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
};

const extractBenefitFromHtml = (html: string) => {
  const candidates = findBenefitCandidates(html);
  const useful = candidates.find(isUsefulBenefit);
  return useful ? toSentenceCase(useful) : null;
};

const generateBenefitFromTitle = (title: string) => {
  const lower = title.toLowerCase();

  if (/(travel|portable|carry|compact)/.test(lower)) {
    return "Compact design that makes everyday use and travel feel effortless.";
  }
  if (/(wireless|bluetooth|headphone|earbud|speaker|audio)/.test(lower)) {
    return "Wireless convenience with a polished everyday listening experience.";
  }
  if (/(kitchen|air fryer|blender|coffee|cook)/.test(lower)) {
    return "Makes daily routines faster, easier, and more satisfying.";
  }
  if (/(keyboard|mouse|desk|office|laptop|macbook|computer)/.test(lower)) {
    return "Powerful performance and a polished workflow upgrade for everyday use.";
  }
  if (/(beauty|skin|hair|makeup)/.test(lower)) {
    return "A simple upgrade that helps your routine feel premium every day.";
  }

  return "A smart Amazon find designed to make everyday life easier.";
};

const generateTag = (title: string, benefit: string) => {
  const source = `${title} ${benefit}`.toLowerCase();

  if (/(work|office|desk|keyboard|laptop|macbook|computer)/.test(source)) {
    return "Work Essential";
  }
  if (/(creator|edit|design|content)/.test(source)) {
    return "Creator Favorite";
  }
  if (/(travel|portable|carry|compact)/.test(source)) {
    return "Travel Favorite";
  }
  if (/(wireless|audio|speaker|headphone)/.test(source)) {
    return "Must-Have";
  }
  if (/(kitchen|cook|fryer|blend)/.test(source)) {
    return "Best Seller";
  }

  return "Top Pick";
};

const downloadHeroImage = async (imageUrl: string) => {
  const response = await fetch(imageUrl, {
    headers: {
      "user-agent": headers["user-agent"],
      accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      referer: "https://www.amazon.com/",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download hero image (${response.status}).`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  const destination = path.join(projectRoot, "public", "current-product.jpg");

  await mkdir(path.dirname(destination), {recursive: true});
  await writeFile(destination, bytes);
};

const cleanTitle = (title: string) =>
  title
    .replace(/\s*[-|]\s*Amazon.*$/i, "")
    .replace(/\s+/g, " ")
    .trim();

const buildProduct = (title: string, benefit: string, tag: string): ProductItem => ({
  image: "current-product.jpg",
  title,
  benefit,
  tag,
});

const buildVoiceoverScript = (product: ProductItem) => {
  return [
    `Stop scrolling and check out the ${product.title}.`,
    product.benefit,
    `This ${product.tag.toLowerCase()} is getting a lot of attention right now.`,
    "Tap to see the latest price and details today.",
  ].join(" ");
};

const splitScriptIntoCaptions = (script: string) => {
  return script
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
};

const createCaptionTimings = (segments: string[], totalDurationMs: number) => {
  const totalWords = Math.max(
    1,
    segments.reduce((sum, segment) => sum + segment.split(/\s+/).length, 0)
  );

  let cursor = 0;

  return segments.map((segment, index) => {
    const wordCount = Math.max(1, segment.split(/\s+/).length);
    const rawDuration = Math.round((wordCount / totalWords) * totalDurationMs);
    const duration = Math.max(900, rawDuration);
    const startMs = cursor;
    const endMs =
      index === segments.length - 1
        ? totalDurationMs
        : Math.min(totalDurationMs, startMs + duration);

    cursor = endMs;

    return {
      startMs,
      endMs,
      text: segment,
    };
  });
};

const estimateScriptDurationMs = (script: string) => {
  const wordCount = Math.max(1, script.trim().split(/\s+/).length);
  const wordsPerSecond = 2.7;
  return Math.max(6500, Math.round((wordCount / wordsPerSecond) * 1000));
};

const detectAudioDurationSeconds = async (audioPath: string) => {
  try {
    const {stdout} = await execFileAsync("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      audioPath,
    ]);

    const seconds = Number.parseFloat(stdout.trim());
    if (!Number.isFinite(seconds) || seconds <= 0) {
      throw new Error("ffprobe returned an invalid duration.");
    }

    return seconds;
  } catch (error) {
    throw new Error(
      `voiceover.mp3 exists but audio duration detection failed. Ensure ffprobe is installed. ${String(
        error
      )}`
    );
  }
};

const updateProductsJson = async (product: ProductItem) => {
  const productsPath = path.join(projectRoot, "data", "products.json");
  const updated = [product];
  await writeJsonFile(productsPath, updated);
  return updated;
};

const saveVoiceoverScript = async (script: string) => {
  const scriptPath = path.join(projectRoot, "data", "voiceover-script.txt");
  await writeFile(scriptPath, `${script}\n`, "utf8");
  return scriptPath;
};

const saveCaptions = async (captions: Array<{startMs: number; endMs: number; text: string}>) => {
  const captionsPath = path.join(projectRoot, "data", "captions.json");
  await writeJsonFile(captionsPath, captions);
  return captionsPath;
};

const saveRenderConfig = async (config: RenderConfig) => {
  const configPath = path.join(projectRoot, "data", "render-config.json");
  await writeJsonFile(configPath, config);
  return configPath;
};

const saveMetaOutput = async (meta: MetaOutput) => {
  const metaPath = path.join(projectRoot, "out", "MyComp-meta.json");
  await mkdir(path.dirname(metaPath), {recursive: true});
  await writeJsonFile(metaPath, meta);
  return metaPath;
};

const buildMetaOutput = (
  productUrl: string,
  product: ProductItem,
  voiceoverScript: string
): MetaOutput => {
  const hashtags = ["#AmazonFinds", "#TikTokMadeMeBuyIt", "#Shorts", "#MustHave"];
  return {
    productUrl,
    title: product.title,
    benefit: product.benefit,
    tag: product.tag,
    voiceoverScript,
    hashtags,
    socialCaption: `${product.title} | ${product.benefit} ${hashtags.join(" ")}`,
    outputFile: "out/MyComp.mp4",
  };
};

const resolveInputUrl = async () => {
  const cliUrl = getCliUrl();
  if (cliUrl) {
    return cliUrl;
  }

  const inputPath = path.join(projectRoot, "data", "product-url.json");
  const input = await readJsonFile<ProductUrlInput>(inputPath);
  if (!input.url?.trim()) {
    throw new Error(
      `Missing product URL. Pass one via CLI or set ${inputPath}.`
    );
  }

  return input.url;
};

const renderAmazon = async () => {
  const productUrl = await resolveInputUrl();
  logStep(`URL received: ${productUrl}`);

  const asin = extractAsin(productUrl);
  const productHtml = await fetchProductHtml(productUrl);

  let amazonData: AmazonPaApiResponse | null = null;
  if (asin) {
    amazonData = await fetchFromPaApi(asin);
  }
  if (!amazonData) {
    amazonData = extractFromHtml(productHtml);
  }

  if (!amazonData.imageUrl) {
    throw new Error("Hero image extraction failed.");
  }

  const title = cleanTitle(amazonData.title ?? extractFromHtml(productHtml).title ?? "");
  if (!title) {
    throw new Error("Could not extract product title from the Amazon page.");
  }
  logStep(`Title extracted: ${title}`);

  const extractedBenefit = extractBenefitFromHtml(productHtml);
  const benefit = extractedBenefit ?? generateBenefitFromTitle(title);
  logStep(
    `${extractedBenefit ? "Benefit extracted" : "Benefit generated"}: ${benefit}`
  );

  const tag = generateTag(title, benefit);
  logStep(`Tag generated: ${tag}`);

  await downloadHeroImage(amazonData.imageUrl);
  logStep("Image download success: public/current-product.jpg");

  const product = buildProduct(title, benefit, tag);
  const products = await updateProductsJson(product);
  logStep("products.json updated");

  const voiceoverScript = buildVoiceoverScript(product);
  const scriptPath = await saveVoiceoverScript(voiceoverScript);
  logStep(`Voiceover script generated: ${scriptPath}`);

  const voiceoverPath = path.join(projectRoot, "public", "voiceover.mp3");
  const voiceoverExists = await fileExists(voiceoverPath);

  let audioDurationSeconds: number | null = null;
  let voiceoverSrc: string | null = null;

  if (voiceoverExists) {
    voiceoverSrc = "voiceover.mp3";
    logStep("Voiceover found: public/voiceover.mp3");
    audioDurationSeconds = await detectAudioDurationSeconds(voiceoverPath);
    logStep(`Audio duration detected: ${audioDurationSeconds.toFixed(2)}s`);
  } else {
    logStep("Voiceover not found, using estimated script timing");
  }

  const totalDurationMs = audioDurationSeconds
    ? Math.ceil(audioDurationSeconds * 1000)
    : estimateScriptDurationMs(voiceoverScript);

  const captions = createCaptionTimings(
    splitScriptIntoCaptions(voiceoverScript),
    totalDurationMs
  );
  const captionsPath = await saveCaptions(captions);
  logStep(`captions.json updated: ${captionsPath}`);

  const finalDurationFrames = Math.max(
    BASE_DURATION_FRAMES,
    Math.ceil((totalDurationMs / 1000) * FPS) + CTA_MIN_FRAMES
  );
  const renderConfigPath = await saveRenderConfig({
    durationInFrames: finalDurationFrames,
    voiceoverSrc,
  });
  logStep(`Final duration chosen: ${finalDurationFrames} frames`);
  logStep(`render-config.json updated: ${renderConfigPath}`);

  const metaPath = await saveMetaOutput(
    buildMetaOutput(productUrl, product, voiceoverScript)
  );
  logStep(`Upload metadata prepared: ${metaPath}`);

  logStep("Render started");
  await renderComposition(
    buildCompositionProps(products, voiceoverSrc),
    "MyComp.mp4"
  );
  logStep("Render completed");
};

renderAmazon().catch((error) => {
  console.error("[render:amazon] Failed.");
  console.error(error);
  process.exit(1);
});
