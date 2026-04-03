import {bundle} from "@remotion/bundler";
import {renderMedia, selectComposition} from "@remotion/renderer";
import path from "node:path";
import {access, mkdir, readFile, writeFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import type {MyCompositionProps} from "./Composition";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const projectRoot = path.resolve(__dirname, "..");

export const readJsonFile = async <T>(filePath: string): Promise<T> => {
  const contents = await readFile(filePath, "utf8");
  return JSON.parse(contents) as T;
};

export const writeJsonFile = async (filePath: string, payload: unknown) => {
  await mkdir(path.dirname(filePath), {recursive: true});
  await writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
};

export const fileExists = async (filePath: string) => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

export const renderComposition = async (
  inputProps: MyCompositionProps,
  outputFileName: string
) => {
  const entryPoint = path.join(projectRoot, "src", "index.ts");
  const outputLocation = path.join(projectRoot, "out", outputFileName);

  await mkdir(path.dirname(outputLocation), {recursive: true});

  const bundled = await bundle({
    entryPoint,
    webpackOverride: (config) => config,
  });

  const composition = await selectComposition({
    serveUrl: bundled,
    id: "MyComp",
    inputProps,
  });

  await renderMedia({
    composition,
    serveUrl: bundled,
    codec: "h264",
    outputLocation,
    inputProps,
  });

  console.log(`Rendered video to ${outputLocation}`);
};
