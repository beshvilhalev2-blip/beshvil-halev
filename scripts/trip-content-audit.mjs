#!/usr/bin/env node
/**
 * Trip content audit for Beshvil HaLev.
 * Usage: node scripts/trip-content-audit.mjs [--json-only]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const tripsTs = fs.readFileSync(path.join(root, "data/trips.ts"), "utf8");
const visitedTs = fs.readFileSync(path.join(root, "data/visited-place-trips.ts"), "utf8");
const visibilityTs = fs.readFileSync(path.join(root, "lib/trip-site-visibility.ts"), "utf8");

const hiddenMatch = visibilityTs.match(
  /hiddenFromPublicSlugs\s*=\s*\[([\s\S]*?)\]/,
);
const hiddenSlugs = hiddenMatch
  ? [...hiddenMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
  : [];

function extractArrayContent(content, marker) {
  const start = content.indexOf(marker);
  if (start < 0) return "";
  const open = content.indexOf("[", start);
  let depth = 0;
  for (let i = open; i < content.length; i++) {
    const ch = content[i];
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) return content.slice(open + 1, i);
    }
  }
  return "";
}

function splitTopLevelObjects(arrayContent) {
  const blocks = [];
  let depth = 0;
  let start = -1;
  for (let i = 0; i < arrayContent.length; i++) {
    const ch = arrayContent[i];
    if (ch === "{") {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 0 && start >= 0) {
        blocks.push(arrayContent.slice(start, i + 1));
        start = -1;
      }
    }
  }
  return blocks;
}

function extractArrayField(block, field) {
  const re = new RegExp(`${field}:\\s*\\[`);
  const m = re.exec(block);
  if (!m) return "";
  const open = m.index + m[0].length - 1;
  let depth = 0;
  for (let i = open; i < block.length; i++) {
    if (block[i] === "[") depth++;
    else if (block[i] === "]") {
      depth--;
      if (depth === 0) return block.slice(open, i + 1);
    }
  }
  return "";
}

function countStringItems(arrayInner) {
  return (arrayInner.match(/^\s+"/gm) || []).length;
}

function countObjectItems(arrayInner, marker = "{ label:") {
  return (arrayInner.match(new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || [])
    .length;
}

function countFaqItems(block) {
  const faqArray = extractArrayField(block, "faq");
  return (faqArray.match(/question:/g) || []).length;
}

function extractHeroPath(block) {
  const m = block.match(/heroImage:\s*"([^"]+)"/);
  return m ? m[1] : null;
}

function heroExistsOnDisk(heroPath) {
  if (!heroPath) return false;
  const rel = heroPath.startsWith("/") ? heroPath.slice(1) : heroPath;
  return fs.existsSync(path.join(root, "public", rel));
}

function parseTripBlock(block, source) {
  const slugM = block.match(/^\s*slug:\s*"([^"]+)"/m);
  if (!slugM) return null;
  const slug = slugM[1];
  const titleM = block.match(/title:\s*"([^"]+)"/);

  const quickFactsArray = extractArrayField(block, "quickFacts");
  const galleryArray = extractArrayField(block, "gallery");
  const gallerySrcCount = (galleryArray.match(/src:\s*"/g) || []).length;

  return {
    slug,
    title: titleM?.[1] ?? slug,
    source,
    status: /status:\s*"needs-content"/.test(block) ? "needs-content" : "published",
    excluded: /excludedFromSite:\s*true/.test(block),
    hidden: hiddenSlugs.includes(slug),
    heroPath: extractHeroPath(block),
    galleryCount: gallerySrcCount,
    aboutCount: countStringItems(extractArrayField(block, "about")),
    personalCount: countStringItems(extractArrayField(block, "personalStory")),
    tipsCount: countStringItems(extractArrayField(block, "tips")),
    faqCount: countFaqItems(block),
    quickFactsCount: countObjectItems(quickFactsArray),
    highlightsCount: countStringItems(extractArrayField(block, "highlights")),
    hasNav: /wazeUrl:\s*"/.test(block) && /googleMapsUrl:\s*"/.test(block),
    hasSeo: /seoTitle:\s*"/.test(block),
    hasGettingThere: /gettingThere:\s*\{/.test(block),
    hasPlaceholders: /\[(טקסט|סיפור|placeholder|Milena|מילנה)/i.test(block),
  };
}

const rawContent = extractArrayContent(tripsTs, "const rawTrips: Trip[] =");
const visitedContent = extractArrayContent(visitedTs, "export const visitedPlaceTrips =");

const all = [
  ...splitTopLevelObjects(rawContent).map((b) => parseTripBlock(b, "trips.ts")),
  ...splitTopLevelObjects(visitedContent).map((b) =>
    parseTripBlock(b, "visited-place-trips.ts"),
  ),
].filter(Boolean);

const visible = all.filter((t) => !t.excluded && !t.hidden);

function reviewReasons(t) {
  const reasons = [];
  if (t.status === "needs-content") reasons.push("status: needs-content");
  if (t.aboutCount < 3) reasons.push(`about: ${t.aboutCount}/3`);
  if (t.personalCount < 3) reasons.push(`personalStory: ${t.personalCount}/3`);
  if (t.tipsCount < 1) reasons.push("tips: missing");
  if (t.faqCount < 4) reasons.push(`faq: ${t.faqCount}/4`);
  if (t.quickFactsCount < 3) reasons.push(`quickFacts: ${t.quickFactsCount}/3`);
  if (t.highlightsCount < 3) reasons.push(`highlights: ${t.highlightsCount}/3`);
  if (!t.hasGettingThere) reasons.push("gettingThere: missing");
  if (!t.hasSeo) reasons.push("seoTitle: missing");
  if (!t.hasNav) reasons.push("navigation: missing");
  if (t.hasPlaceholders) reasons.push("placeholders remain");
  if (!heroExistsOnDisk(t.heroPath)) reasons.push("hero image missing on disk");
  if (t.galleryCount === 0) reasons.push("gallery empty");
  return reasons;
}

function classify(t) {
  if (t.status === "needs-content") return "stub";
  if (t.hasPlaceholders) return "partial";
  const writtenComplete =
    t.aboutCount >= 3 &&
    t.personalCount >= 3 &&
    t.tipsCount >= 1 &&
    t.faqCount >= 4 &&
    t.quickFactsCount >= 3 &&
    t.highlightsCount >= 3 &&
    t.hasGettingThere &&
    t.hasSeo &&
    t.hasNav;
  return writtenComplete ? "complete" : "partial";
}

function tally(list) {
  const c = { complete: 0, partial: 0, stub: 0 };
  for (const t of list) c[classify(t)]++;
  return c;
}

const report = {
  totalTrips: all.length,
  totalVisible: visible.length,
  totalHidden: all.length - visible.length,
  hiddenSlugs: all.filter((t) => t.hidden || t.excluded).map((t) => t.slug),
  after: tally(visible),
  stubsRemaining: visible
    .filter((t) => t.status === "needs-content")
    .map((t) => ({ slug: t.slug, title: t.title, source: t.source })),
  reviewPages: visible
    .map((t) => ({
      slug: t.slug,
      title: t.title,
      source: t.source,
      class: classify(t),
      reasons: reviewReasons(t),
    }))
    .filter((t) => t.reasons.length > 0),
  missingHero: visible.filter((t) => !heroExistsOnDisk(t.heroPath)).map((t) => t.slug),
  missingGallery: visible.filter((t) => t.galleryCount === 0).map((t) => t.slug),
  missingNav: visible.filter((t) => !t.hasNav).map((t) => t.slug),
};

console.log(JSON.stringify(report, null, 2));
