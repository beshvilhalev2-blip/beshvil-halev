import type {
  ActivityType,
  BudgetTier,
  CompanionType,
  TravelTime,
  WeatherPreference,
} from "@/lib/find-my-trip/types";
import type { CityId } from "@/lib/find-my-trip/cities";
import type { VehicleCategoryId } from "@/lib/vehicle-trip-match";
import { ISRAEL_CITIES } from "@/lib/find-my-trip/cities";

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

export const CITY_OPTIONS = ISRAEL_CITIES.map((city) => ({
  id: city.id,
  label: city.label,
}));

export const TRAVEL_TIME_OPTIONS: {
  id: TravelTime;
  label: string;
}[] = [
  { id: "30m", label: "עד חצי שעה" },
  { id: "1h", label: "עד שעה" },
  { id: "1h-plus", label: "שעה+" },
  { id: "any", label: "לא משנה" },
];

export const BUDGET_OPTIONS: {
  id: BudgetTier;
  label: string;
  sublabel: string;
}[] = [
  {
    id: "free",
    label: "חינם",
    sublabel: "טיולים עם כניסה ללא עלות",
  },
  {
    id: "up-to-50",
    label: "עד 50 ₪ לאדם",
    sublabel: "דמי כניסה נמוכים או חניה בתשלום",
  },
  {
    id: "above-50",
    label: "50 ₪ ומעלה",
    sublabel: "פארקים, אטרקציות או כניסה בתשלום גבוה יותר",
  },
  {
    id: "any",
    label: "לא משנה לי",
    sublabel: "תראו לי את כל האפשרויות",
  },
];

export const WEATHER_OPTIONS: {
  id: WeatherPreference;
  label: string;
}[] = [
  { id: "hot", label: "חם" },
  { id: "pleasant", label: "נעים" },
  { id: "cold", label: "קר" },
  { id: "rainy", label: "גשום / אחרי גשם" },
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
  "up-to-50": "עד 50 ₪ לאדם",
  "above-50": "50 ₪ ומעלה",
  any: "לא משנה לי",
};

export const WEATHER_LABELS: Record<WeatherPreference, string> = {
  hot: "חם",
  pleasant: "נעים",
  cold: "קר",
  rainy: "גשום / אחרי גשם",
};

export const VEHICLE_LABELS: Record<VehicleCategoryId, string> = {
  private_car: "רכב פרטי",
  soft_suv: "SUV רך",
  real_4x4: "4x4 אמיתי",
  serious_jeep: "ג׳יפ גבוה",
};

/** Stable ids for match reasons - used for future personalization and analytics. */
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

/** Homepage CTA copy - wizard lives only at /find-my-trip. */
export const HOMEPAGE_CTA = {
  title: "לא יודעים לאן לטייל היום?",
  description:
    "ענו על כמה שאלות קצרות ונמצא עבורכם את הטיול המושלם.",
  button: "מצאו לי טיול",
  href: "/find-my-trip",
} as const;

export const PRIMARY_RECOMMENDATION_TITLE = "ההמלצה שלנו להיום";
export const MATCH_REASONS_TITLE = "למה בחרנו את זה בשבילך";

export const CITY_GEOLOCATION_FEATURE = "city-geolocation";
