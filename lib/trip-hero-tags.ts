import type { Trip } from "@/data/trips";
import { getTripCardTags } from "@/lib/trip-card-tags";
import { isStrollerAccessibleFilterMatch } from "@/lib/trip-filter-tags";

const HIDDEN_CATEGORY = "מקום שביקרנו";

export type TripHeroPills = {
  region: string;
  category?: string;
  attribute?: string;
};

function isRedundantWithCategory(tag: string, category: string): boolean {
  if (tag === "מים" && (category.includes("מעיין") || category.includes("מים"))) {
    return true;
  }
  if (tag === "4x4" && (category.includes("4x4") || category.includes("שטח"))) {
    return true;
  }
  if (tag === "קמפינג" && category.includes("קמפ")) {
    return true;
  }
  if (tag === "תצפית" && category.includes("תצפ")) {
    return true;
  }
  return false;
}

function getTripHeroAttributeTag(
  trip: Trip,
  category: string | undefined,
): string | undefined {
  const available = new Set(getTripCardTags(trip, 6));

  for (const label of ["ילדים", "חינם", "תצפית"] as const) {
    if (available.has(label) && !isRedundantWithCategory(label, category ?? "")) {
      return label;
    }
  }

  if (isStrollerAccessibleFilterMatch(trip.filterTags?.strollerAccessible)) {
    return "נגיש לעגלות";
  }

  for (const label of ["קמפינג", "4x4", "מים"] as const) {
    if (available.has(label) && !isRedundantWithCategory(label, category ?? "")) {
      return label;
    }
  }

  return undefined;
}

export function getTripHeroPills(trip: Trip): TripHeroPills {
  const category =
    trip.category && trip.category !== HIDDEN_CATEGORY ? trip.category : undefined;

  return {
    region: trip.region,
    category,
    attribute: getTripHeroAttributeTag(trip, category),
  };
}
