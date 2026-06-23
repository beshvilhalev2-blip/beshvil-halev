import fs from "node:fs";
import path from "node:path";
import { getOffroadLearningMomentAlt } from "@/lib/offroad/learning-moments-utils";

export { getOffroadLearningMomentAlt };

export const OFFROAD_LEARNING_MOMENTS_PUBLIC_DIR =
  "/images/offroad/learning-moments";

const LEARNING_MOMENTS_DISK_DIR = path.join(
  process.cwd(),
  "public/images/offroad/learning-moments",
);

const IMAGE_EXTENSIONS = new Set([
  ".avif",
  ".gif",
  ".heic",
  ".heif",
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
]);

function isImageFilename(name: string): boolean {
  return IMAGE_EXTENSIONS.has(path.extname(name).toLowerCase());
}

function toPublicImagePath(filename: string): string {
  return `${OFFROAD_LEARNING_MOMENTS_PUBLIC_DIR}/${encodeURIComponent(filename)}`;
}

/** All image files in public/images/offroad/learning-moments/, sorted A→Z. */
export function getOffroadLearningMomentImages(): string[] {
  if (!fs.existsSync(LEARNING_MOMENTS_DISK_DIR)) {
    return [];
  }

  return fs
    .readdirSync(LEARNING_MOMENTS_DISK_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isImageFilename(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .map(toPublicImagePath);
}
