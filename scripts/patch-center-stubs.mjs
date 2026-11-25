import fs from "fs";

const path = "data/visited-place-trips.ts";
let content = fs.readFileSync(path, "utf8");

const centerSvg = `linear-gradient(160deg, rgba(180, 83, 9, 0.75) 0%, rgba(217, 119, 6, 0.55) 50%, rgba(28, 25, 23, 0.7) 100%),
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='480' viewBox='0 0 1920 480'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23f59e0b'/%3E%3Cstop offset='100%25' stop-color='%23b45309'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='1920' height='480'/%3E%3C/svg%3E")`;

function heroBg(imagePath) {
  return `linear-gradient(160deg, rgba(180, 83, 9, 0.78) 0%, rgba(217, 119, 6, 0.55) 50%, rgba(28, 25, 23, 0.7) 100%), url("${imagePath}")`;
}

const travel = {
  haifa: "1h-plus",
  "kfar-saba": "45m",
  raanana: "45m",
  "hod-hasharon": "45m",
  herzliya: "40m",
  netanya: "50m",
  modiin: "30m",
  ramla: "30m",
  lod: "30m",
};

function fmt(obj, indent = 4) {
  return JSON.stringify(obj, null, 2).replace(/^/gm, " ".repeat(indent));
}

function buildEntry(o) {
  const heroImageLine = o.heroImage
    ? `\n    heroImage: "${o.heroImage}",`
    : "";
  const bg = o.heroImage ? heroBg(o.heroImage) : centerSvg;
  const vehicle = o.vehicleAccess
    ? `\n    vehicleAccess: "${o.vehicleAccess}",`
    : "";
  return `  {
    slug: "${o.slug}",
    title: "${o.title}",
    subtitle:
      "${o.subtitle}",
    region: "${o.region ?? "מרכז"}",
    category: "טיול משפחתי",
    visitedByMilana: true,${vehicle}
    matcher: {
      activities: ${fmt(o.activities, 6).trim()},
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: ${JSON.stringify(o.estimatedCostNis)},
      weatherTraits: ${fmt(o.weatherTraits ?? ["heat-tolerant", "shade-rich"], 6).trim()},
      weatherAvoid: ["rainy"],
      travelTimeFrom: ${fmt(travel, 6).trim()},
    },
    location: {
      lat: ${o.lat},
      lng: ${o.lng},
      label: "${o.label}",
      wazeUrl:
        "https://waze.com/ul?q=${encodeURIComponent(o.wazeQ).replace(/'/g, "%27")}&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=${o.lat}%2C${o.lng}",
    },
    seoTitle: "${o.seoTitle}",
    metaDescription:
      "${o.metaDescription}",${heroImageLine}
    heroImageLabel: "${o.heroImageLabel}",
    heroBackgroundImage: \`${bg}\`,
    wazeUrl:
      "https://waze.com/ul?q=${encodeURIComponent(o.wazeQ).replace(/'/g, "%27")}&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=${o.lat}%2C${o.lng}",
    highlights: ${fmt(o.highlights).trim()},
    about: ${fmt(o.about).trim()},
    personalStory: ${fmt(o.personalStory).trim()},
    cost: ${fmt(o.cost).trim()},
    quickFacts: ${fmt(o.quickFacts).trim()},
    gettingThere: ${fmt(o.gettingThere).trim()},
    faq: ${fmt(o.faq).trim()},
    tips: ${fmt(o.tips).trim()},
    closingNote:
      "${o.closingNote}",
    gallery: ${fmt(o.gallery ?? []).trim()},
    gallerySubtitle: "",
    nearbyTripSlugs: ${fmt(o.nearbyTripSlugs ?? []).trim()},
    nearbyPlaces: [],
    nearbySubtitle: "",
  }`;
}

/** @type {import('./center-stubs-data.mjs').CenterStub[]} */
const stubs = (await import("./center-stubs-data.mjs")).default;

function replaceStub(slug, newBody) {
  const withNext = new RegExp(
    `(\\{\\s*slug: "${slug}"[\\s\\S]*?)\\n  \\},\\n  \\{\\s*slug:`,
    "m",
  );
  if (withNext.test(content)) {
    content = content.replace(withNext, `${newBody},\n  {\n    slug:`);
    return;
  }
  const lastItem = new RegExp(
    `(\\{\\s*slug: "${slug}"[\\s\\S]*?)\\n  \\},\\n\\] as const;`,
    "m",
  );
  if (!lastItem.test(content)) {
    throw new Error(`Stub not found for ${slug}`);
  }
  content = content.replace(lastItem, `${newBody},\n] as const;`);
}

for (const stub of stubs) {
  const slugMarker = `slug: "${stub.slug}"`;
  const slugIdx = content.indexOf(slugMarker);
  if (slugIdx === -1) {
    console.log(`Skip ${stub.slug} (slug not in file)`);
    continue;
  }
  const nextSlugIdx = content.indexOf("\n    slug:", slugIdx + slugMarker.length);
  const block = content.slice(
    slugIdx,
    nextSlugIdx > slugIdx ? nextSlugIdx : undefined,
  );
  if (!block.includes('status: "needs-content"') || !block.includes("about: []")) {
    console.log(`Skip ${stub.slug} (already complete)`);
    continue;
  }
  replaceStub(stub.slug, buildEntry(stub));
  console.log(`Patched ${stub.slug}`);
}

fs.writeFileSync(path, content);
console.log("Done");
