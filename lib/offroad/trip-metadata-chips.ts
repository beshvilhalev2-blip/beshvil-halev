import type { Trip, TripVehicleAccess } from "@/data/trips";

export type OffroadTripMetadataChip = {
  id: string;
  label: string;
  tone: "neutral" | "vehicle" | "family" | "duration" | "weather" | "season";
};

const VEHICLE_ACCESS_LABELS: Partial<Record<TripVehicleAccess, string>> = {
  "soft-suv": "SUV רך",
  "real-4x4": "4x4",
  "hard-4x4": "4x4 מתקדם",
};

function getDurationChip(trip: Trip): OffroadTripMetadataChip | null {
  const durationItem = trip.cost.find((item) => item.label.includes("משך"));
  if (!durationItem?.value) {
    return null;
  }

  const value = durationItem.value.replace(/\[placeholder\]/gi, "").trim();
  if (!value) {
    return null;
  }

  return {
    id: "duration",
    label: value,
    tone: "duration",
  };
}

function getVehicleAccessChip(trip: Trip): OffroadTripMetadataChip | null {
  if (trip.vehicleAccess === undefined) {
    return null;
  }

  const label = VEHICLE_ACCESS_LABELS[trip.vehicleAccess];
  if (!label) {
    return null;
  }

  return {
    id: "vehicle",
    label,
    tone: "vehicle",
  };
}

function getFamilyChip(trip: Trip): OffroadTripMetadataChip | null {
  const companions = trip.matcher?.companions;
  if (!companions?.includes("kids") && !companions?.includes("family")) {
    return null;
  }

  return {
    id: "family",
    label: "משפחות",
    tone: "family",
  };
}

function getRainChip(trip: Trip): OffroadTripMetadataChip | null {
  const profile = trip.matcher;
  if (!profile) {
    return null;
  }

  if (profile.weatherAvoid?.includes("rainy")) {
    return {
      id: "rain-avoid",
      label: "לא מומלץ אחרי גשם",
      tone: "weather",
    };
  }

  if (profile.weatherTraits?.includes("rain-sensitive")) {
    return {
      id: "rain-sensitive",
      label: "לא מומלץ אחרי גשם",
      tone: "weather",
    };
  }

  return null;
}

function getSeasonChip(trip: Trip): OffroadTripMetadataChip | null {
  const traits = trip.matcher?.weatherTraits;
  if (!traits?.length) {
    return null;
  }

  if (traits.includes("winter-ideal")) {
    return {
      id: "winter",
      label: "מומלץ בחורף",
      tone: "season",
    };
  }

  return null;
}

export function getOffroadTripMetadataChips(trip: Trip): OffroadTripMetadataChip[] {
  const chips = [
    getVehicleAccessChip(trip),
    getFamilyChip(trip),
    getDurationChip(trip),
    getSeasonChip(trip),
    getRainChip(trip),
  ].filter(Boolean) as OffroadTripMetadataChip[];

  return chips;
}

export const OFFROAD_CHIP_TONE_CLASSES: Record<
  OffroadTripMetadataChip["tone"],
  string
> = {
  neutral:
    "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300",
  vehicle:
    "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
  family:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  duration:
    "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200",
  weather:
    "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  season:
    "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200",
};
