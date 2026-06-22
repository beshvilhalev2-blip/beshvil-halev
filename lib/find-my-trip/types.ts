import type { VehicleCategoryId } from "@/lib/vehicle-trip-match";
import type { CityId } from "@/lib/find-my-trip/cities";

export type { CityId };

export type CompanionType = "solo" | "friends" | "kids" | "family";

export type ActivityType =
  | "water"
  | "nature-shade"
  | "viewpoint"
  | "picnic"
  | "easy-trails"
  | "camping";

export type TravelTime = "30m" | "1h" | "1h-plus" | "any";

export type BudgetTier = "free" | "up-to-50" | "above-50" | "any";

export type WeatherPreference = "hot" | "pleasant" | "cold" | "rainy";

export type WizardVehicleChoice = VehicleCategoryId | null;

export type WizardAnswers = {
  companion: CompanionType;
  activity: ActivityType;
  city: CityId;
  travelTime: TravelTime;
  budget: BudgetTier;
  weather: WeatherPreference;
  vehicle: WizardVehicleChoice;
  completedAt?: string;
  sessionId?: string;
};

export type ReasonCategory =
  | "activity"
  | "location"
  | "budget"
  | "weather"
  | "companion"
  | "vehicle"
  | "quality"
  | "fallback";

export type MatchReason = {
  id: string;
  label: string;
  category: ReasonCategory;
};

export type MatchedTrip = {
  trip: TripRef;
  score: number;
  reasons: MatchReason[];
  isPrimary: boolean;
  usedFallback: boolean;
};

export type MatchResult = {
  primary: MatchedTrip | null;
  additional: MatchedTrip[];
  totalCount: number;
  usedFallback: boolean;
  summaryChips: string[];
};

/** Minimal trip shape for matching - keeps lib decoupled from full article fields. */
export type TripRef = {
  slug: string;
  title: string;
  subtitle: string;
  region: string;
  category: string;
  featured?: boolean;
  tags?: string[];
  cost: { label: string; value: string; note?: string }[];
  vehicleAccess?: import("@/data/trips").TripVehicleAccess;
  matcher?: import("@/lib/find-my-trip/trip-profile").TripMatcherProfile;
  location?: {
    lat: number;
    lng: number;
    label?: string;
  };
  about: string[];
};

export type MatchContext = {
  answers: WizardAnswers;
  trips: TripRef[];
  preferences?: import("@/lib/find-my-trip/preference-types").InferredPreferences;
};

export type RelaxLevel = 0 | 1 | 2 | 3 | 4;

export type ScoredTripCandidate = {
  trip: TripRef;
  score: number;
  usedFallback: boolean;
};
