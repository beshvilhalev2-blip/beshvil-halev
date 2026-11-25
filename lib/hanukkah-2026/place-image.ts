import { existsSync } from "node:fs";
import path from "node:path";

const HERO_FILE_NAMES = [
  "hero.jpeg",
  "hero.jpg",
  "hero.JPG",
  "hero.JPEG",
  "hero.png",
  "hero.webp",
];

/**
 * מחזיר את נתיב תמונת ה-hero בתיקייה תחת public, אם הקובץ קיים.
 * כך תמונה שמעלים לתיקייה מתחברת לבד, ובלי קובץ מוצג כרטיס בלי תמונה.
 */
export function findPlaceHeroImage(folder: string | undefined): string | undefined {
  if (!folder) return undefined;
  for (const name of HERO_FILE_NAMES) {
    const publicPath = `${folder}/${name}`;
    if (existsSync(path.join(process.cwd(), "public", publicPath))) {
      return publicPath;
    }
  }
  return undefined;
}
