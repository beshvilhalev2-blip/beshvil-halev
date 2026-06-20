import type { AdventureDestination } from "@/lib/hero-adventure-selector";

export const HERO_RECOMMENDATION_COUNT = 3;

export function sameDestinationSet(
  a: AdventureDestination[],
  b: AdventureDestination[],
): boolean {
  if (a.length !== b.length) return false;
  const slugs = new Set(a.map((item) => item.slug));
  return b.every((item) => slugs.has(item.slug));
}

export function shuffleDestinations<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

export function pickFeaturedDestination(
  destinations: AdventureDestination[],
): AdventureDestination | null {
  return destinations.find((destination) => destination.image) ?? destinations[0] ?? null;
}

/** Pick `count` items from `pool`, avoiding the same set as `previous` when possible. */
export function pickRotatedDestinations(
  pool: AdventureDestination[],
  count: number,
  previous: AdventureDestination[] = [],
): AdventureDestination[] {
  if (pool.length <= count) {
    return [...pool];
  }

  let picked = pool.slice(0, count);
  for (let attempt = 0; attempt < 12; attempt += 1) {
    picked = shuffleDestinations(pool).slice(0, count);
    if (!sameDestinationSet(picked, previous)) {
      break;
    }
  }

  return picked;
}

export type CategoryRecommendationDisplay = {
  destinations: AdventureDestination[];
  featured: AdventureDestination | null;
};

export function buildCategoryRecommendationDisplay(
  destinations: AdventureDestination[],
): CategoryRecommendationDisplay {
  return {
    destinations,
    featured: pickFeaturedDestination(destinations),
  };
}
