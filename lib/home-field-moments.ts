import type { Trip } from "@/data/trips";

export type HomeFieldMoment = {
  slug: string;
  title: string;
  category: string;
  imageSrc: string;
  href: string;
  recentlyUpdated: boolean;
};

export const FEATURED_FIELD_MOMENT_SLUGS = [
  "ein-moda",
  "sataf",
  "nahal-hashofet",
  "rbdym",
] as const;

function isRealTripPhoto(url: string | undefined): url is string {
  if (!url) return false;
  return url.startsWith("/images/") && !url.includes("data:image");
}

export function getTripDisplayImage(trip: Trip): string | null {
  if (isRealTripPhoto(trip.heroImage)) {
    return trip.heroImage;
  }

  const galleryPhoto = trip.gallery?.find(
    (item): item is { src: string } =>
      "src" in item && isRealTripPhoto(item.src),
  );

  return galleryPhoto?.src ?? null;
}

function toFieldMoment(trip: Trip, imageSrc: string): HomeFieldMoment {
  return {
    slug: trip.slug,
    title: trip.title,
    category: trip.category,
    imageSrc,
    href: `/trips/${trip.slug}`,
    recentlyUpdated: trip.visitedByMilana === true,
  };
}

export function getHomeFieldMomentPool(trips: Trip[]): HomeFieldMoment[] {
  const bySlug = new Map(trips.map((trip) => [trip.slug, trip]));
  const pool: HomeFieldMoment[] = [];
  const usedSlugs = new Set<string>();

  for (const slug of FEATURED_FIELD_MOMENT_SLUGS) {
    const trip = bySlug.get(slug);
    if (!trip) continue;

    const imageSrc = getTripDisplayImage(trip);
    if (!imageSrc) continue;

    pool.push(toFieldMoment(trip, imageSrc));
    usedSlugs.add(slug);
  }

  for (const trip of trips) {
    if (usedSlugs.has(trip.slug)) continue;

    const imageSrc = getTripDisplayImage(trip);
    if (!imageSrc) continue;

    pool.push(toFieldMoment(trip, imageSrc));
    usedSlugs.add(trip.slug);
  }

  return pool;
}
