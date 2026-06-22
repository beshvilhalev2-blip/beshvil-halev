import type { Trip } from "@/data/trips";
import { DEFAULT_TRIP_VEHICLE_ACCESS } from "@/data/trips";
import type {
  ActivityType,
  BudgetTier,
  CityId,
  CompanionType,
  TravelTime,
  TripRef,
  WeatherPreference,
} from "@/lib/find-my-trip/types";

export type WeatherTrait =
  | "water-friendly"
  | "shade-rich"
  | "heat-tolerant"
  | "heat-sensitive"
  | "rain-sensitive"
  | "winter-ideal"
  | "indoor-fallback";

export type TripMatcherProfile = {
  activities?: ActivityType[];
  companions?: CompanionType[];
  travelTimeFrom?: Partial<Record<CityId, TravelTime>>;
  estimatedCostNis?: number | "free";
  weatherTraits?: WeatherTrait[];
  weatherAvoid?: WeatherPreference[];
};

const DEFAULT_UNKNOWN_COST_NIS = 50;

const FAMILY_FRIENDLY_CATEGORIES = new Set([
  "טיול משפחתי",
  "בילוי משפחתי",
  "פארק",
  "חוף",
  "חיות וטבע",
  "טיול מים",
  "מעיין",
]);

export function isFamilyFriendlyTrip(trip: Pick<Trip, "category">): boolean {
  return FAMILY_FRIENDLY_CATEGORIES.has(trip.category);
}

const ACTIVITY_TAG_MAP: Record<string, ActivityType> = {
  מים: "water",
  "שבילים-קלים": "easy-trails",
  קמפינג: "camping",
  פיקניק: "picnic",
};

const ACTIVITY_CATEGORY_MAP: Record<string, ActivityType[]> = {
  "טיול מים": ["water"],
  מעיין: ["water"],
  חוף: ["water", "picnic"],
  "תצפית ונוף": ["viewpoint"],
  יער: ["nature-shade", "easy-trails"],
  "שמורת טבע": ["nature-shade", "easy-trails"],
  פארק: ["nature-shade", "picnic", "easy-trails"],
  "טבע והרים": ["nature-shade", "viewpoint", "easy-trails"],
  "טיול משפחתי": ["picnic", "easy-trails"],
  "בילוי משפחתי": ["picnic", "easy-trails"],
  "שטח 4x4": ["camping", "viewpoint"],
};

const CATEGORY_WEATHER_TRAITS: Record<string, WeatherTrait[]> = {
  "טיול מים": ["water-friendly"],
  מעיין: ["water-friendly"],
  חוף: ["water-friendly", "heat-tolerant"],
  "פארק מים": ["water-friendly"],
  יער: ["shade-rich"],
  "שמורת טבע": ["shade-rich", "rain-sensitive"],
  "תצפית ונוף": ["heat-sensitive", "winter-ideal"],
  "טבע והרים": ["shade-rich", "heat-sensitive"],
  "שטח 4x4": ["rain-sensitive", "heat-sensitive"],
  "חיות וטבע": ["indoor-fallback", "shade-rich"],
  "בילוי משפחתי": ["indoor-fallback"],
  עיר: ["indoor-fallback", "heat-tolerant"],
};

export function toTripRef(trip: Trip): TripRef {
  return {
    slug: trip.slug,
    title: trip.title,
    subtitle: trip.subtitle,
    region: trip.region,
    category: trip.category,
    featured: trip.featured,
    tags: trip.tags,
    cost: trip.cost,
    vehicleAccess: trip.vehicleAccess ?? DEFAULT_TRIP_VEHICLE_ACCESS,
    matcher: trip.matcher,
    location: trip.location,
    about: trip.about,
  };
}

export function getTripMatcherProfile(trip: TripRef): TripMatcherProfile {
  return trip.matcher ?? {};
}

export function inferTripActivities(trip: TripRef): ActivityType[] {
  const explicit = getTripMatcherProfile(trip).activities;
  if (explicit?.length) {
    return explicit;
  }

  const fromCategory = ACTIVITY_CATEGORY_MAP[trip.category] ?? [];
  const fromTags = (trip.tags ?? [])
    .map((tag) => ACTIVITY_TAG_MAP[tag])
    .filter(Boolean) as ActivityType[];

  const combined = [...new Set([...fromCategory, ...fromTags])];
  if (combined.length > 0) {
    return combined;
  }

  return ["easy-trails"];
}

export function inferTripCompanions(trip: TripRef): CompanionType[] {
  const explicit = getTripMatcherProfile(trip).companions;
  if (explicit?.length) {
    return explicit;
  }

  if (FAMILY_FRIENDLY_CATEGORIES.has(trip.category)) {
    return ["solo", "friends", "kids", "family"];
  }

  if (trip.category === "שטח 4x4") {
    return ["solo", "friends"];
  }

  return ["solo", "friends", "kids", "family"];
}

export function inferTripWeatherTraits(trip: TripRef): WeatherTrait[] {
  const explicit = getTripMatcherProfile(trip).weatherTraits;
  if (explicit?.length) {
    return explicit;
  }

  const fromCategory = CATEGORY_WEATHER_TRAITS[trip.category] ?? [];
  if (fromCategory.length > 0) {
    return fromCategory;
  }

  if (trip.region === "דרום") {
    return ["heat-sensitive", "winter-ideal"];
  }

  return [];
}

export function inferTripCostNis(trip: TripRef): number | "free" {
  const explicit = getTripMatcherProfile(trip).estimatedCostNis;
  if (explicit !== undefined) {
    return explicit;
  }

  const entryCost = trip.cost.find((item) => item.label.includes("כניסה"));
  if (!entryCost) {
    return DEFAULT_UNKNOWN_COST_NIS;
  }

  const value = entryCost.value.trim();
  if (value === "חינם" || value === "0") {
    return "free";
  }

  const numeric = value.replace(/[^\d]/g, "");
  if (numeric) {
    return Number(numeric);
  }

  if (value === "-" || value.includes("-")) {
    return DEFAULT_UNKNOWN_COST_NIS;
  }

  return DEFAULT_UNKNOWN_COST_NIS;
}

export function isTripFullyAuthored(trip: TripRef): boolean {
  const draftMarker = "כתבה מלאה תעלה בקרוב";
  return !trip.about.some((paragraph) => paragraph.includes(draftMarker));
}

export function tripMatchesBudget(trip: TripRef, budget: BudgetTier): boolean {
  if (budget === "any") {
    return true;
  }

  const cost = inferTripCostNis(trip);

  switch (budget) {
    case "free":
      return cost === "free" || cost === 0;
    case "up-to-50":
      return cost === "free" || cost <= 50;
    case "above-50":
      return typeof cost === "number" && cost > 50;
    default:
      return true;
  }
}

export function relaxBudgetTier(budget: BudgetTier): BudgetTier {
  switch (budget) {
    case "free":
      return "up-to-50";
    case "up-to-50":
      return "any";
    case "above-50":
      return "any";
    default:
      return "any";
  }
}
