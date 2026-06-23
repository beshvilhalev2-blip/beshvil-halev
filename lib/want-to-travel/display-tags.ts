import type { Trip } from "@/data/trips";
import { getTripCardTags, TRIP_CARD_TAG_LABELS } from "@/lib/trip-card-tags";

export type WantToTravelDisplayTag =
  | "מים"
  | "ילדים"
  | "חינם"
  | "שטח"
  | "קמפינג";

const LEGACY_LABEL_MAP: Record<string, WantToTravelDisplayTag | undefined> = {
  [TRIP_CARD_TAG_LABELS.water]: "מים",
  [TRIP_CARD_TAG_LABELS.offroad]: "שטח",
  [TRIP_CARD_TAG_LABELS.camping]: "קמפינג",
  [TRIP_CARD_TAG_LABELS.kids]: "ילדים",
  [TRIP_CARD_TAG_LABELS.free]: "חינם",
};

/** @deprecated Prefer getTripCardTags from @/lib/trip-card-tags */
export function getWantToTravelDisplayTags(
  trip: Trip,
): WantToTravelDisplayTag[] {
  return getTripCardTags(trip)
    .map((tag) => LEGACY_LABEL_MAP[tag])
    .filter((tag): tag is WantToTravelDisplayTag => tag !== undefined);
}
