import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const sourceSvg = join(root, "assets/favicon-preview/source.svg");
const outDir = join(root, "assets/favicon-preview");

async function renderPng(size) {
  return sharp(sourceSvg, { density: size * 8 })
    .resize(size, size, { fit: "fill" })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const png16 = await renderPng(16);
  const png32 = await renderPng(32);
  const png180 = await renderPng(180);
  const png256 = await renderPng(256);

  await writeFile(join(outDir, "icon.png"), png32);
  await writeFile(join(outDir, "apple-icon.png"), png180);
  await writeFile(join(outDir, "favicon.ico"), await pngToIco([png16, png32]));

  await writeFile(join(outDir, "preview-16.png"), png16);
  await writeFile(join(outDir, "preview-32.png"), png32);
  await writeFile(join(outDir, "preview-180.png"), png180);
  await writeFile(join(outDir, "preview-256.png"), png256);

  console.log("Generated favicon preview assets in assets/favicon-preview/");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
