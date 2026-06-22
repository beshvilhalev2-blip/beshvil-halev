#!/usr/bin/env node
/**
 * Safe image compression workflow for public/images.
 *
 * Reads originals from public/images/ (never deletes or modifies them).
 * Writes path-compatible optimized files to public/images-optimized/.
 * Writes WebP previews to public/images/_optimized-report/webp-preview/.
 * Writes JSON + Markdown report to public/images/_optimized-report/.
 *
 * Usage:
 *   node scripts/compress-public-images.mjs
 *   node scripts/compress-public-images.mjs --dry-run
 *   node scripts/compress-public-images.mjs --limit 10
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const SOURCE_ROOT = path.join(PROJECT_ROOT, "public", "images");
const OPTIMIZED_ROOT = path.join(PROJECT_ROOT, "public", "images-optimized");
const REPORT_ROOT = path.join(SOURCE_ROOT, "_optimized-report");
const WEBP_PREVIEW_ROOT = path.join(REPORT_ROOT, "webp-preview");

const SKIP_DIR_NAMES = new Set([
  "images-optimized",
  "_optimized-report",
  "webp-preview",
]);

const RASTER_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const SKIP_EXTENSIONS = new Set([".svg", ".gif", ".ico", ".heic", ".heif"]);
const COPY_AS_IS_EXTENSIONS = new Set([".svg", ".gif", ".ico"]);

const HERO_MAX_WIDTH = 1800;
const HERO_TARGET_BYTES = 500_000;
const HERO_SOFT_TARGET_BYTES = 300_000;

const GALLERY_MAX_WIDTH = 1400;
const GALLERY_TARGET_BYTES = 300_000;
const GALLERY_SOFT_TARGET_BYTES = 150_000;

const OTHER_MAX_WIDTH = 1800;
const OTHER_TARGET_BYTES = 500_000;

const DEFAULT_QUALITY = 80;
const MIN_QUALITY = 65;
const QUALITY_STEP = 5;
const WEBP_QUALITY = 78;

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const keepOutput = args.includes("--keep-output");
const limitArg = args.find((arg) => arg.startsWith("--limit="));
const limit = limitArg ? Number.parseInt(limitArg.split("=")[1] ?? "0", 10) : 0;

function formatBytes(num) {
  if (num == null) return "—";
  if (num < 1024) return `${num} B`;
  if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
  return `${(num / (1024 * 1024)).toFixed(2)} MB`;
}

function isHeroFile(relativePath) {
  const parsed = path.parse(relativePath);
  return parsed.name.toLowerCase() === "hero" && RASTER_EXTENSIONS.has(parsed.ext.toLowerCase());
}

function isPlaceImage(relativePath) {
  const parts = relativePath.split(path.sep);
  return parts.length >= 3 && parts[0] === "places";
}

function classifyImage(relativePath) {
  if (isPlaceImage(relativePath)) {
    if (isHeroFile(relativePath)) return "hero";
    const ext = path.extname(relativePath).toLowerCase();
    if (RASTER_EXTENSIONS.has(ext)) return "gallery";
  }
  return "other";
}

function shouldSkipRelative(relativePath) {
  return relativePath.split(path.sep).some((part) => SKIP_DIR_NAMES.has(part));
}

async function walkFiles(dir, base = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(base, fullPath);
    if (shouldSkipRelative(relativePath)) continue;

    if (entry.isDirectory()) {
      files.push(...(await walkFiles(fullPath, base)));
    } else if (entry.isFile()) {
      files.push({ fullPath, relativePath });
    }
  }

  return files.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function removeDirIfExists(dirPath) {
  await fs.rm(dirPath, { recursive: true, force: true });
}

async function copyFile(source, dest) {
  await ensureDir(path.dirname(dest));
  await fs.copyFile(source, dest);
}

function getTargets(category) {
  if (category === "hero") {
    return {
      maxWidth: HERO_MAX_WIDTH,
      targetBytes: HERO_TARGET_BYTES,
      softTargetBytes: HERO_SOFT_TARGET_BYTES,
    };
  }
  if (category === "gallery") {
    return {
      maxWidth: GALLERY_MAX_WIDTH,
      targetBytes: GALLERY_TARGET_BYTES,
      softTargetBytes: GALLERY_SOFT_TARGET_BYTES,
    };
  }
  return {
    maxWidth: OTHER_MAX_WIDTH,
    targetBytes: OTHER_TARGET_BYTES,
    softTargetBytes: OTHER_TARGET_BYTES / 2,
  };
}

async function prepareResizedBuffer(sourcePath, maxWidth) {
  const { data, info } = await sharp(sourcePath, { failOn: "none", limitInputPixels: false })
    .rotate()
    .resize({
      width: maxWidth,
      withoutEnlargement: true,
      fit: "inside",
    })
    .toBuffer({ resolveWithObject: true });

  return {
    buffer: data,
    width: info.width,
    height: info.height,
  };
}

async function encodeCompatibleFromBuffer(
  resizedBuffer,
  ext,
  targetBytes,
  outputWidth,
) {
  const extLower = ext.toLowerCase();
  const qualities = [DEFAULT_QUALITY, 72, MIN_QUALITY];
  let lastBuffer = null;
  let lastQuality = DEFAULT_QUALITY;

  if (extLower === ".jpg" || extLower === ".jpeg") {
    for (const quality of qualities) {
      lastBuffer = await sharp(resizedBuffer)
        .jpeg({ quality, mozjpeg: true, progressive: true })
        .toBuffer();
      lastQuality = quality;
      if (lastBuffer.length <= targetBytes) break;
    }

    if (lastBuffer.length > targetBytes) {
      for (const scale of [0.9, 0.82, 0.74]) {
        const scaledWidth = Math.max(1, Math.round(outputWidth * scale));
        const scaled = await sharp(resizedBuffer)
          .resize({ width: scaledWidth, withoutEnlargement: true, fit: "inside" })
          .jpeg({ quality: MIN_QUALITY, mozjpeg: true, progressive: true })
          .toBuffer();
        lastBuffer = scaled;
        lastQuality = MIN_QUALITY;
        if (lastBuffer.length <= targetBytes) break;
      }
    }

    return { buffer: lastBuffer, qualityUsed: lastQuality };
  }

  if (extLower === ".png") {
    lastBuffer = await sharp(resizedBuffer)
      .png({ compressionLevel: 9, palette: false })
      .toBuffer();

    if (lastBuffer.length > targetBytes) {
      for (const scale of [0.9, 0.82, 0.74, 0.66]) {
        const scaledWidth = Math.max(1, Math.round(outputWidth * scale));
        lastBuffer = await sharp(resizedBuffer)
          .resize({ width: scaledWidth, withoutEnlargement: true, fit: "inside" })
          .png({ compressionLevel: 9, palette: false })
          .toBuffer();
        if (lastBuffer.length <= targetBytes) break;
      }
    }

    return { buffer: lastBuffer, qualityUsed: 100 };
  }

  if (extLower === ".webp") {
    for (const quality of qualities) {
      lastBuffer = await sharp(resizedBuffer).webp({ quality }).toBuffer();
      lastQuality = quality;
      if (lastBuffer.length <= targetBytes) break;
    }
    return { buffer: lastBuffer, qualityUsed: lastQuality };
  }

  throw new Error(`Unsupported output extension: ${ext}`);
}

async function encodeCompatible(sourcePath, destPath, ext, maxWidth, targetBytes) {
  const sourceMeta = await sharp(sourcePath, { failOn: "none", limitInputPixels: false })
    .rotate()
    .metadata();

  const resized = await prepareResizedBuffer(sourcePath, maxWidth);
  const encoded = await encodeCompatibleFromBuffer(
    resized.buffer,
    ext,
    targetBytes,
    resized.width,
  );

  if (!dryRun) {
    await ensureDir(path.dirname(destPath));
    await fs.writeFile(destPath, encoded.buffer);
  }

  return {
    originalWidth: sourceMeta.width ?? null,
    originalHeight: sourceMeta.height ?? null,
    outputWidth: resized.width,
    outputHeight: resized.height,
    optimizedBytes: encoded.buffer.length,
    qualityUsed: encoded.qualityUsed,
    resizedBuffer: resized.buffer,
  };
}

async function encodeWebpPreviewFromBuffer(resizedBuffer, destPath) {
  const webpBuffer = await sharp(resizedBuffer).webp({ quality: WEBP_QUALITY }).toBuffer();

  if (!dryRun) {
    await ensureDir(path.dirname(destPath));
    await fs.writeFile(destPath, webpBuffer);
  }

  return webpBuffer.length;
}

async function processRaster(sourcePath, relativePath, category) {
  const originalBytes = (await fs.stat(sourcePath)).size;
  const ext = path.extname(relativePath);
  const { maxWidth, targetBytes, softTargetBytes } = getTargets(category);
  const optimizedDest = path.join(OPTIMIZED_ROOT, relativePath);
  const webpDest = path.join(
    WEBP_PREVIEW_ROOT,
    relativePath.replace(/\.[^.]+$/, ".webp"),
  );

  const result = {
    relative_path: relativePath.split(path.sep).join("/"),
    category,
    original_bytes: originalBytes,
    optimized_bytes: null,
    webp_bytes: null,
    original_width: null,
    original_height: null,
    output_width: null,
    output_height: null,
    quality_used: null,
    action: "pending",
    note: null,
  };

  try {
    if (dryRun) {
      const metadata = await sharp(sourcePath, { failOn: "none" }).rotate().metadata();
      result.original_width = metadata.width ?? null;
      result.original_height = metadata.height ?? null;
      result.output_width =
        (metadata.width ?? 0) > maxWidth ? maxWidth : metadata.width ?? null;
      result.action = "dry-run";
      result.note = `Would optimize to max width ${maxWidth}px`;
      return result;
    }

    const encoded = await encodeCompatible(
      sourcePath,
      optimizedDest,
      ext,
      maxWidth,
      targetBytes,
    );
    result.original_width = encoded.originalWidth;
    result.original_height = encoded.originalHeight;
    result.output_width = encoded.outputWidth;
    result.output_height = encoded.outputHeight;
    result.optimized_bytes = encoded.optimizedBytes;
    result.quality_used = encoded.qualityUsed;
    result.action = "optimized";

    result.webp_bytes = await encodeWebpPreviewFromBuffer(
      encoded.resizedBuffer,
      webpDest,
    );

    if (result.optimized_bytes > targetBytes) {
      result.note = `Still above hard target (${Math.round(targetBytes / 1024)}KB)`;
    } else if (result.optimized_bytes > softTargetBytes) {
      result.note = `Above soft target (${Math.round(softTargetBytes / 1024)}KB) but within hard cap`;
    }
  } catch (error) {
    result.action = "error";
    result.note = error instanceof Error ? error.message : String(error);
  }

  return result;
}

function buildReport(results) {
  const processed = results.filter((r) => r.action === "optimized");
  const originalTotal = results.reduce((sum, r) => sum + r.original_bytes, 0);
  const optimizedTotal = results.reduce(
    (sum, r) => sum + (r.optimized_bytes ?? 0),
    0,
  );
  const webpTotal = results.reduce((sum, r) => sum + (r.webp_bytes ?? 0), 0);
  const savings = originalTotal - optimizedTotal;
  const savingsPct = originalTotal ? (savings / originalTotal) * 100 : 0;

  const overTarget = processed.filter(
    (r) => r.note && r.note.startsWith("Still above hard target"),
  );

  const largest = [...processed]
    .filter((r) => r.optimized_bytes)
    .sort((a, b) => b.optimized_bytes - a.optimized_bytes)
    .slice(0, 25)
    .map((r) => ({
      path: r.relative_path,
      category: r.category,
      optimized_bytes: r.optimized_bytes,
      optimized_human: formatBytes(r.optimized_bytes),
      original_bytes: r.original_bytes,
      original_human: formatBytes(r.original_bytes),
    }));

  const skipped = results.filter((r) => r.action === "skipped" || r.action === "error");

  return {
    generated_at: new Date().toISOString(),
    source_root: "public/images",
    optimized_root: "public/images-optimized",
    webp_preview_root: "public/images/_optimized-report/webp-preview",
    dry_run: dryRun,
    webp_path_change_required: true,
    webp_migration_note:
      "WebP previews use .webp extensions under _optimized-report/webp-preview/. Trip data and components reference .jpeg/.jpg paths — switching to WebP requires updating data/ trip heroImage/gallery paths OR a build step that maps paths. Path-compatible JPEG/PNG outputs in public/images-optimized/ can replace originals without code changes.",
    totals: {
      files_scanned: results.length,
      images_optimized: processed.length,
      assets_copied_as_is: results.filter((r) => r.action === "copied-as-is").length,
      skipped_or_errors: skipped.length,
      original_bytes: originalTotal,
      optimized_bytes: optimizedTotal,
      webp_preview_bytes: webpTotal,
      estimated_savings_bytes: savings,
      estimated_savings_percent: Math.round(savingsPct * 10) / 10,
      hero_count: results.filter((r) => r.category === "hero").length,
      gallery_count: results.filter((r) => r.category === "gallery").length,
      other_count: results.filter((r) => r.category === "other").length,
      over_hard_target_count: overTarget.length,
    },
    images: results,
    largest_remaining_optimized: largest,
    skipped,
    over_target: overTarget,
  };
}

function buildMarkdown(report) {
  const { totals } = report;
  const lines = [
    "# Image compression report",
    "",
    `Generated: ${report.generated_at}`,
    `Dry run: **${report.dry_run}**`,
    "",
    "## Summary",
    "",
    `- Files scanned: **${totals.files_scanned}**`,
    `- Images optimized: **${totals.images_optimized}**`,
    `- Assets copied as-is (SVG/ICO/etc.): **${totals.assets_copied_as_is}**`,
    `- Skipped / errors: **${totals.skipped_or_errors}**`,
    `- Hero images: **${totals.hero_count}**`,
    `- Gallery images: **${totals.gallery_count}**`,
    `- Other images: **${totals.other_count}**`,
    "",
    "## Size",
    "",
    `- Original total: **${formatBytes(totals.original_bytes)}**`,
    `- Optimized total (path-compatible): **${formatBytes(totals.optimized_bytes)}**`,
    `- WebP preview total (not production-ready): **${formatBytes(totals.webp_preview_bytes)}**`,
    `- Estimated savings: **${formatBytes(totals.estimated_savings_bytes)}** (${totals.estimated_savings_percent}%)`,
    "",
    "## Output locations",
    "",
    `- Safe swap candidates: \`${report.optimized_root}/\` (same paths & extensions as originals)`,
    `- WebP previews only: \`${report.webp_preview_root}/\``,
    `- Originals untouched: \`${report.source_root}/\``,
    "",
    "## WebP migration",
    "",
    report.webp_migration_note,
    "",
    `- Files still above hard target after optimization: **${totals.over_hard_target_count}**`,
    "",
    "## Largest optimized files (top 25)",
    "",
    "| Optimized | Original | Category | Path |",
    "| --- | --- | --- | --- |",
  ];

  for (const item of report.largest_remaining_optimized) {
    lines.push(
      `| ${item.optimized_human} | ${item.original_human} | ${item.category} | \`${item.path}\` |`,
    );
  }

  if (report.skipped.length > 0) {
    lines.push("", "## Skipped / errors", "");
    for (const item of report.skipped.slice(0, 40)) {
      lines.push(`- \`${item.relative_path}\` — ${item.note ?? item.action}`);
    }
  }

  if (report.over_target.length > 0) {
    lines.push("", "## Still above hard target", "");
    for (const item of report.over_target.slice(0, 40)) {
      lines.push(
        `- \`${item.relative_path}\` (${item.category}): ${formatBytes(item.optimized_bytes)} — ${item.note}`,
      );
    }
  }

  lines.push(
    "",
    "## Next steps (manual approval required)",
    "",
    "1. Review optimized samples visually in `public/images-optimized/`.",
    "2. Compare a few heroes/galleries side-by-side with originals.",
    "3. If approved, replace originals by copying optimized files over them (keep a backup tarball of `public/images/` first).",
    "4. Do **not** deploy WebP previews until trip data paths are updated.",
    "",
  );

  return lines.join("\n");
}

async function main() {
  try {
    await fs.access(SOURCE_ROOT);
  } catch {
    console.error(`Missing source directory: ${SOURCE_ROOT}`);
    process.exit(1);
  }

  if (!dryRun && !keepOutput) {
    await removeDirIfExists(OPTIMIZED_ROOT);
    await removeDirIfExists(WEBP_PREVIEW_ROOT);
  }

  await ensureDir(REPORT_ROOT);

  const files = await walkFiles(SOURCE_ROOT);
  const results = [];
  let rasterProcessed = 0;
  const totalRaster = files.filter(({ relativePath }) => {
    const ext = path.extname(relativePath).toLowerCase();
    return RASTER_EXTENSIONS.has(ext);
  }).length;

  for (const { fullPath, relativePath } of files) {
    const ext = path.extname(relativePath).toLowerCase();
    const normalizedRelative = relativePath.split(path.sep).join("/");

    if (SKIP_EXTENSIONS.has(ext)) {
      results.push({
        relative_path: normalizedRelative,
        category: classifyImage(relativePath),
        original_bytes: (await fs.stat(fullPath)).size,
        action: "skipped",
        note: `Unsupported extension ${ext} (not processed)`,
      });
      continue;
    }

    if (COPY_AS_IS_EXTENSIONS.has(ext)) {
      const dest = path.join(OPTIMIZED_ROOT, relativePath);
      if (!dryRun) await copyFile(fullPath, dest);
      const size = (await fs.stat(fullPath)).size;
      results.push({
        relative_path: normalizedRelative,
        category: "asset",
        original_bytes: size,
        optimized_bytes: size,
        action: dryRun ? "dry-run" : "copied-as-is",
        note: dryRun ? "Non-raster asset — would copy unchanged" : null,
      });
      continue;
    }

    if (!RASTER_EXTENSIONS.has(ext)) {
      results.push({
        relative_path: normalizedRelative,
        category: "asset",
        original_bytes: (await fs.stat(fullPath)).size,
        action: "skipped",
        note: `Unknown extension ${ext} — not processed`,
      });
      continue;
    }

    if (limit > 0 && rasterProcessed >= limit) continue;

    const category = classifyImage(relativePath);
    results.push(await processRaster(fullPath, relativePath, category));
    rasterProcessed += 1;
    if (rasterProcessed % 25 === 0 || rasterProcessed === totalRaster) {
      console.log(`  Processed ${rasterProcessed}/${totalRaster} raster images...`);
    }
  }

  const report = buildReport(results);
  const jsonPath = path.join(REPORT_ROOT, "compression-report.json");
  const mdPath = path.join(REPORT_ROOT, "compression-report.md");

  await fs.writeFile(jsonPath, JSON.stringify(report, null, 2), "utf8");
  await fs.writeFile(mdPath, buildMarkdown(report), "utf8");

  console.log("");
  console.log("Image compression complete");
  console.log(`  Scanned:    ${report.totals.files_scanned} files`);
  console.log(`  Optimized:  ${report.totals.images_optimized} images`);
  console.log(`  Original:   ${formatBytes(report.totals.original_bytes)}`);
  console.log(`  Optimized:  ${formatBytes(report.totals.optimized_bytes)}`);
  console.log(
    `  Savings:    ${formatBytes(report.totals.estimated_savings_bytes)} (${report.totals.estimated_savings_percent}%)`,
  );
  console.log(`  Report:     ${path.relative(PROJECT_ROOT, mdPath)}`);
  if (dryRun) {
    console.log("  (dry run — no optimized files written except report)");
  } else {
    console.log(`  Output:     ${path.relative(PROJECT_ROOT, OPTIMIZED_ROOT)}/`);
  }
  console.log("");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
