import type { Metadata } from "next";
import type { Trip } from "@/data/trips";

const SITE_URL = "https://beshvil-halev.vercel.app";

function absoluteAssetUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${encodeURI(normalized)}`;
}

export function buildTripPageMetadata(trip: Trip): Metadata {
  const title = trip.seoTitle ?? `${trip.title} | בשביל הלב`;
  const description = trip.metaDescription;
  const canonicalUrl = `${SITE_URL}/trips/${trip.slug}`;
  const heroAlt = trip.heroImageLabel?.trim() || trip.title;
  const openGraphImages = trip.heroImage
    ? [
        {
          url: absoluteAssetUrl(trip.heroImage),
          alt: heroAlt,
        },
      ]
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      locale: "he_IL",
      siteName: "בשביל הלב",
      ...(openGraphImages ? { images: openGraphImages } : {}),
    },
  };
}
