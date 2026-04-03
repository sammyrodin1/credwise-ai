import type {ProductItem} from "./Composition";
import {
  projectRoot,
  readJsonFile,
  renderComposition,
} from "./render-helpers";
import {buildCompositionProps} from "./video-config";

type RenderConfig = {
  durationInFrames: number;
  voiceoverSrc: string | null;
};

const render = async () => {
  const products = await readJsonFile<ProductItem[]>(
    `${projectRoot}/data/products.json`
  );
  const renderConfig = await readJsonFile<RenderConfig>(
    `${projectRoot}/data/render-config.json`
  );

  await renderComposition(
    buildCompositionProps(products, renderConfig.voiceoverSrc),
    "video.mp4"
  );
};

render().catch((error) => {
  console.error("Automatic render failed.");
  console.error(error);
  process.exit(1);
});
