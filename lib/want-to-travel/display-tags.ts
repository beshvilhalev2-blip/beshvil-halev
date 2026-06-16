import type { Trip } from "@/data/trips";
import {
  inferTripActivities,
  inferTripCompanions,
  inferTripCostNis,
  toTripRef,
} from "@/lib/find-my-trip/trip-profile";

export type WantToTravelDisplayTag =
  | "מים"
  | "ילדים"
  | "חינם"
  | "שטח"
  | "קמפינג";

const TAG_ORDER: WantToTravelDisplayTag[] = [
  "מים",
  "ילדים",
  "חינם",
  "שטח",
  "קמפינג",
];

export function getWantToTravelDisplayTags(
  trip: Trip,
): WantToTravelDisplayTag[] {
  const ref = toTripRef(trip);
  const tags = new Set<WantToTravelDisplayTag>();

  const activities = inferTripActivities(ref);
  if (activities.includes("water")) {
    tags.add("מים");
  }

  if (activities.includes("camping")) {
    tags.add("קמפינג");
  }

  const companions = inferTripCompanions(ref);
  if (companions.includes("kids") || companions.includes("family")) {
    tags.add("ילדים");
  }

  const cost = inferTripCostNis(ref);
  if (cost === "free" || cost === 0) {
    tags.add("חינם");
  }

  const vehicleAccess = trip.vehicleAccess ?? "private-car";
  if (
    trip.category === "שטח 4x4" ||
    vehicleAccess === "soft-suv" ||
    vehicleAccess === "real-4x4" ||
    vehicleAccess === "hard-4x4"
  ) {
    tags.add("שטח");
  }

  return TAG_ORDER.filter((tag) => tags.has(tag));
}
