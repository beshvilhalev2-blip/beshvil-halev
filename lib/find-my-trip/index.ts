export { matchTrips, matchTripsFromAnswers } from "@/lib/find-my-trip/match-trips";
export { buildMatchReasons } from "@/lib/find-my-trip/match-reasons";
export { toTripRef } from "@/lib/find-my-trip/trip-profile";
export type {
  WizardAnswers,
  MatchResult,
  MatchedTrip,
  MatchReason,
  MatchContext,
} from "@/lib/find-my-trip/types";
export type { TripMatcherProfile, WeatherTrait } from "@/lib/find-my-trip/trip-profile";
export type {
  LocalUserPreferences,
  WizardPreferenceSnapshot,
  InferredPreferences,
} from "@/lib/find-my-trip/preference-types";
export {
  createWizardSnapshot,
  createEmptyLocalPreferences,
} from "@/lib/find-my-trip/preference-types";
export {
  WIZARD_STEP_COUNT,
  HOMEPAGE_CTA,
  PRIMARY_RECOMMENDATION_TITLE,
  MATCH_REASONS_TITLE,
} from "@/lib/find-my-trip/constants";
