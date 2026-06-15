import type {
  ActivityType,
  BudgetTier,
  CityId,
  CompanionType,
  TravelTime,
  WeatherPreference,
} from "@/lib/find-my-trip/types";
import type { VehicleCategoryId } from "@/lib/vehicle-trip-match";

export const WIZARD_STEP_COUNT = 7;

export const RESULTS_LIMIT = 12;

export const MIN_RESULTS_BEFORE_RELAX = 3;

export const COMPANION_OPTIONS: {
  id: CompanionType;
  label: string;
}[] = [
  { id: "solo", label: "לבד" },
  { id: "friends", label: "חברים" },
  { id: "kids", label: "ילדים" },
  { id: "family", label: "משפחה" },
];

export const ACTIVITY_OPTIONS: {
  id: ActivityType;
  label: string;
}[] = [
  { id: "water", label: "מים" },
  { id: "nature-shade", label: "טבע וצל" },
  { id: "viewpoint", label: "תצפית" },
  { id: "picnic", label: "פיקניק" },
  { id: "easy-trails", label: "שבילים קלים" },
  { id: "camping", label: "קמפינג" },
];

export const CITY_OPTIONS: {
  id: CityId;
  label: string;
}[] = [
  { id: "rishon", label: "ראשון לציון" },
  { id: "tel-aviv", label: "תל אביב" },
  { id: "jerusalem", label: "ירושלים" },
  { id: "beer-sheva", label: "באר שבע" },
  { id: "haifa", label: "חיפה" },
  { id: "modiin", label: "מודיעין" },
  { id: "netanya", label: "נתניה" },
  { id: "ashdod", label: "אשדוד" },
];

export const TRAVEL_TIME_OPTIONS: {
  id: TravelTime;
  label: string;
}[] = [
  { id: "30m", label: "עד 30 דקות" },
  { id: "1h", label: "עד שעה" },
  { id: "1h30", label: "עד שעה וחצי" },
  { id: "2h", label: "עד שעתיים" },
  { id: "any", label: "לא משנה" },
];

export const BUDGET_OPTIONS: {
  id: BudgetTier;
  label: string;
  sublabel?: string;
}[] = [
  { id: "free", label: "חינם", sublabel: "כניסה ללא עלות" },
  { id: "up-to-50", label: "עד 50₪", sublabel: "כניסה וחניה" },
  { id: "up-to-100", label: "עד 100₪", sublabel: "יום משפחתי קטן" },
  { id: "any", label: "לא משנה" },
];

export const WEATHER_OPTIONS: {
  id: WeatherPreference;
  label: string;
}[] = [
  { id: "hot-day", label: "יום חם" },
  { id: "pleasant", label: "מזג אוויר נעים" },
  { id: "winter-after-rain", label: "חורף / אחרי גשם" },
];

export const ACTIVITY_LABELS: Record<ActivityType, string> = {
  water: "מים",
  "nature-shade": "טבע וצל",
  viewpoint: "תצפית",
  picnic: "פיקניק",
  "easy-trails": "שבילים קלים",
  camping: "קמפינג",
};

export const COMPANION_LABELS: Record<CompanionType, string> = {
  solo: "לבד",
  friends: "חברים",
  kids: "ילדים",
  family: "משפחה",
};

export const BUDGET_LABELS: Record<BudgetTier, string> = {
  free: "חינם",
  "up-to-50": "עד 50₪",
  "up-to-100": "עד 100₪",
  any: "לא משנה",
};

export const WEATHER_LABELS: Record<WeatherPreference, string> = {
  "hot-day": "יום חם",
  pleasant: "מזג אוויר נעים",
  "winter-after-rain": "חורף / אחרי גשם",
};

export const VEHICLE_LABELS: Record<VehicleCategoryId, string> = {
  private_car: "רכב פרטי",
  soft_suv: "SUV רך",
  real_4x4: "4x4 אמיתי",
  serious_jeep: "ג׳יפ גבוה",
};

/** Stable ids for match reasons — used for future personalization and analytics. */
export const REASON_IDS = {
  activity: (activity: ActivityType) => `activity-${activity}`,
  location: (city: CityId) => `location-${city}`,
  budget: (budget: BudgetTier) => `budget-${budget}`,
  weather: (weather: WeatherPreference) => `weather-${weather}`,
  companion: (companion: CompanionType) => `companion-${companion}`,
  vehicle: (vehicle: VehicleCategoryId) => `vehicle-${vehicle}`,
  qualityAuthored: "quality-authored",
  qualityFeatured: "quality-featured",
  fallbackNearMatch: "fallback-near-match",
} as const;

/** Reserved DOM slot ids for future monetization modules. */
export const RESULTS_SLOT_IDS = {
  gear: "find-my-trip-gear",
  checklist: "find-my-trip-checklist",
  affiliate: "find-my-trip-affiliate",
} as const;

/** Homepage CTA copy — wizard lives only at /find-my-trip. */
export const HOMEPAGE_CTA = {
  title: "לא יודעת לאן לטייל היום?",
  description:
    "עני על כמה שאלות קצרות ונמצא עבורך את הטיול המושלם.",
  button: "מצאי לי טיול",
  href: "/find-my-trip",
} as const;

export const PRIMARY_RECOMMENDATION_TITLE = "ההמלצה שלנו להיום";
export const MATCH_REASONS_TITLE = "למה בחרנו את זה בשבילך";
