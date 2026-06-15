import { DEFAULT_TRIP_VEHICLE_ACCESS } from "@/data/trips";
import type { CompanionType, TripRef } from "@/lib/find-my-trip/types";
import { inferTripCompanions } from "@/lib/find-my-trip/trip-profile";

const FAMILY_COMPANIONS = new Set<CompanionType>(["kids", "family"]);

const HARD_OFFROAD_ACCESS = new Set(["real-4x4", "hard-4x4"]);

export function isFamilyCompanion(companion: CompanionType): boolean {
  return FAMILY_COMPANIONS.has(companion);
}

export function tripMatchesCompanion(
  trip: TripRef,
  companion: CompanionType,
): boolean {
  const access = trip.vehicleAccess ?? DEFAULT_TRIP_VEHICLE_ACCESS;

  if (isFamilyCompanion(companion) && HARD_OFFROAD_ACCESS.has(access)) {
    return false;
  }

  const allowed = inferTripCompanions(trip);
  return allowed.includes(companion);
}

export function getCompanionMatchScore(
  trip: TripRef,
  companion: CompanionType,
): number {
  if (!tripMatchesCompanion(trip, companion)) {
    return 0;
  }

  const allowed = inferTripCompanions(trip);
  if (isFamilyCompanion(companion) && allowed.includes(companion)) {
    return 15;
  }

  return 10;
}

export function getCompanionReasonLabel(companion: CompanionType): string {
  const labels: Record<CompanionType, string> = {
    solo: "מתאים לטיול לבד",
    friends: "מתאים ליציאה עם חברים",
    kids: "מתאים לילדים",
    family: "מתאים למשפחות",
  };

  return labels[companion];
}
