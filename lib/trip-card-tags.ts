import type { Trip } from "@/data/trips";
import {
  inferTripActivities,
  inferTripCompanions,
  inferTripCostNis,
  toTripRef,
} from "@/lib/find-my-trip/trip-profile";
import {
  isFilterTagActive,
  isFilterTagTrue,
} from "@/lib/trip-filter-tags";

const HIDDEN_CATEGORY = "מקום שביקרנו";

export type TripCardTagId =
  | "water"
  | "offroad"
  | "camping"
  | "kids"
  | "free"
  | "viewpoint";

export const TRIP_CARD_TAG_LABELS: Record<TripCardTagId, string> = {
  water: "מים",
  offroad: "4x4",
  camping: "קמפינג",
  kids: "ילדים",
  free: "חינם",
  viewpoint: "תצפית",
};

/** Highest-priority tags first; cards show at most 3. */
export const TRIP_CARD_TAG_PRIORITY: TripCardTagId[] = [
  "water",
  "offroad",
  "camping",
  "kids",
  "free",
  "viewpoint",
];

export const TRIP_CARD_MAX_TAGS = 3;

function addFilterTagMatches(trip: Trip, matched: Set<TripCardTagId>) {
  const tags = trip.filterTags;
  if (!tags) {
    return;
  }

  if (isFilterTagTrue(tags.water) || isFilterTagActive(tags.water)) {
    matched.add("water");
  }
  if (isFilterTagTrue(tags.offroad) || isFilterTagActive(tags.offroad)) {
    matched.add("offroad");
  }
  if (isFilterTagTrue(tags.camping) || isFilterTagActive(tags.camping)) {
    matched.add("camping");
  }
  if (isFilterTagTrue(tags.viewpoint) || isFilterTagActive(tags.viewpoint)) {
    matched.add("viewpoint");
  }
  if (isFilterTagTrue(tags.free) || isFilterTagActive(tags.free)) {
    matched.add("free");
  }
}

function addInferredTagMatches(trip: Trip, matched: Set<TripCardTagId>) {
  const ref = toTripRef(trip);
  const activities = inferTripActivities(ref);

  if (activities.includes("water")) {
    matched.add("water");
  }
  if (activities.includes("camping")) {
    matched.add("camping");
  }
  if (activities.includes("viewpoint")) {
    matched.add("viewpoint");
  }

  const companions = inferTripCompanions(ref);
  if (companions.includes("kids") || companions.includes("family")) {
    matched.add("kids");
  }

  const cost = inferTripCostNis(ref);
  if (cost === "free" || cost === 0) {
    matched.add("free");
  }

  const vehicleAccess = trip.vehicleAccess ?? "private-car";
  if (
    trip.category === "שטח 4x4" ||
    vehicleAccess === "soft-suv" ||
    vehicleAccess === "real-4x4" ||
    vehicleAccess === "hard-4x4"
  ) {
    matched.add("offroad");
  }
}

function addCategoryTagMatches(trip: Trip, matched: Set<TripCardTagId>) {
  const category = trip.category;
  if (!category || category === HIDDEN_CATEGORY) {
    return;
  }

  if (category.includes("מים") || category.includes("מעיין")) {
    matched.add("water");
  }
  if (category.includes("4x4") || category.includes("שטח")) {
    matched.add("offroad");
  }
  if (category.includes("קמפ")) {
    matched.add("camping");
  }
  if (category.includes("תצפ")) {
    matched.add("viewpoint");
  }
}

export function getTripCardTags(
  trip: Trip,
  max = TRIP_CARD_MAX_TAGS,
): string[] {
  const matched = new Set<TripCardTagId>();

  addFilterTagMatches(trip, matched);
  addInferredTagMatches(trip, matched);
  addCategoryTagMatches(trip, matched);

  return TRIP_CARD_TAG_PRIORITY.filter((id) => matched.has(id))
    .slice(0, max)
    .map((id) => TRIP_CARD_TAG_LABELS[id]);
}
