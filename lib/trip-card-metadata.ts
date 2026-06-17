import type { Trip } from "@/data/trips";
import { DEFAULT_TRIP_VEHICLE_ACCESS } from "@/data/trips";
import {
  inferTripActivities,
  inferTripCompanions,
  inferTripCostNis,
  toTripRef,
} from "@/lib/find-my-trip/trip-profile";

export type TripCardChip = {
  label: string;
  className: string;
};

const REGION_CHIP_CLASS: Record<string, string> = {
  צפון: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200",
  מרכז: "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200",
  ירושלים: "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200",
  דרום: "bg-orange-50 text-orange-800 dark:bg-orange-950/60 dark:text-orange-200",
};

const SIGNAL_CHIP_CLASS =
  "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-200";

const CHIP_BASE_CLASS = "rounded-full px-2.5 py-0.5 text-xs font-semibold";

function is4x4Trip(trip: Trip): boolean {
  const access = trip.vehicleAccess ?? DEFAULT_TRIP_VEHICLE_ACCESS;
  return (
    trip.category === "שטח 4x4" ||
    access === "real-4x4" ||
    access === "hard-4x4"
  );
}

function isFreeTrip(trip: Trip): boolean {
  const tripRef = toTripRef(trip);
  if (inferTripCostNis(tripRef) === "free") {
    return true;
  }

  const entryCost = trip.cost.find((item) => item.label.includes("כניסה"));
  return entryCost?.value.trim() === "חינם";
}

function isFamilyTrip(trip: Trip): boolean {
  const companions = inferTripCompanions(toTripRef(trip));
  return companions.includes("kids") || companions.includes("family");
}

function isWaterTrip(trip: Trip): boolean {
  if (trip.category.includes("מים") || trip.category.includes("מעיין")) {
    return true;
  }

  return inferTripActivities(toTripRef(trip)).includes("water");
}

function signalDuplicatesCategoryBadge(trip: Trip, signalLabel: string): boolean {
  if (signalLabel === "4×4" && trip.category === "שטח 4x4") {
    return true;
  }

  return false;
}

export function getTripCardRegionChip(trip: Trip): TripCardChip {
  const regionClass =
    REGION_CHIP_CLASS[trip.region] ??
    "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300";

  return {
    label: trip.region,
    className: `${CHIP_BASE_CLASS} ${regionClass}`,
  };
}

export function getTripCardSignalChip(trip: Trip): TripCardChip | null {
  let label: string | null = null;

  if (is4x4Trip(trip)) {
    label = "4×4";
  } else if (isFreeTrip(trip)) {
    label = "חינם";
  } else if (isFamilyTrip(trip)) {
    label = "משפחות";
  } else if (isWaterTrip(trip)) {
    label = "מים";
  }

  if (!label || signalDuplicatesCategoryBadge(trip, label)) {
    return null;
  }

  return {
    label,
    className: `${CHIP_BASE_CLASS} ${SIGNAL_CHIP_CLASS}`,
  };
}
