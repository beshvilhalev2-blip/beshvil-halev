import type { Trip } from "@/data/trips";
import { getRegionBySlug, regions } from "@/data/trips";
import { tripMatchesActivity } from "@/lib/find-my-trip/activity-matching";
import { tripMatchesCompanion } from "@/lib/find-my-trip/companion-matching";
import {
  inferTripActivities,
  isFamilyFriendlyTrip,
  toTripRef,
} from "@/lib/find-my-trip/trip-profile";
import {
  isFilterTagActive,
  isFilterTagTrue,
} from "@/lib/trip-filter-tags";
import { getTripVehicleAccess } from "@/lib/trip-vehicle-access";
import type { OFFROAD_WIZARD_DURATIONS } from "@/lib/offroad/content";

export type OffroadRouteGroupId =
  | "beginner-families"
  | "viewpoints"
  | "water-terrain";

export type OffroadWizardAnswers = {
  regionSlug: string;
  withKids: boolean | null;
  wantsWater: boolean | null;
  wantsCamping: boolean | null;
  wantsViewpoint: boolean | null;
  duration: (typeof OFFROAD_WIZARD_DURATIONS)[number]["id"] | null;
};

const ACCESS_LEVEL = {
  "private-car": 0,
  "soft-suv": 1,
  "real-4x4": 2,
  "hard-4x4": 3,
} as const;

const REGION_TITLE_BY_SLUG = Object.fromEntries(
  regions.map((region) => [region.slug, region.title]),
) as Record<string, string>;

const MIN_GROUP_SIZE = 3;
const MAX_GROUP_SIZE = 6;
const WIZARD_RESULT_LIMIT = 6;

function rankTrips(trips: Trip[]): Trip[] {
  return [...trips].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    if (a.visitedByMilana !== b.visitedByMilana) {
      return a.visitedByMilana ? -1 : 1;
    }
    return a.title.localeCompare(b.title, "he");
  });
}

function takeTrips(trips: Trip[], max = MAX_GROUP_SIZE): Trip[] {
  return rankTrips(trips).slice(0, max);
}

function isOffroadRelevant(trip: Trip): boolean {
  const access = getTripVehicleAccess(trip);
  return (
    ACCESS_LEVEL[access] >= ACCESS_LEVEL["soft-suv"] ||
    trip.category === "שטח 4x4" ||
    isFilterTagActive(trip.filterTags?.offroad)
  );
}

function hasViewpoint(trip: Trip): boolean {
  const ref = toTripRef(trip);
  return (
    tripMatchesActivity(ref, "viewpoint") ||
    isFilterTagActive(trip.filterTags?.viewpoint) ||
    trip.category === "תצפית ונוף"
  );
}

function hasWater(trip: Trip): boolean {
  const ref = toTripRef(trip);
  return (
    tripMatchesActivity(ref, "water") ||
    isFilterTagActive(trip.filterTags?.water) ||
    trip.category === "טיול מים" ||
    trip.category === "מעיין"
  );
}

function isBeginnerFamilyTrip(trip: Trip): boolean {
  const ref = toTripRef(trip);
  const access = getTripVehicleAccess(trip);
  const familyOk =
    tripMatchesCompanion(ref, "kids") ||
    tripMatchesCompanion(ref, "family") ||
    isFilterTagTrue(trip.filterTags?.strollerAccessible);
  const easyAccess = ACCESS_LEVEL[access] <= ACCESS_LEVEL["soft-suv"];
  const easyTrails =
    tripMatchesActivity(ref, "easy-trails") ||
    tripMatchesActivity(ref, "picnic") ||
    isFamilyFriendlyTrip(trip);

  return familyOk && easyAccess && easyTrails;
}

function filterBeginnerFamilies(trips: Trip[]): Trip[] {
  const strict = trips.filter(
    (trip) => isBeginnerFamilyTrip(trip) && isOffroadRelevant(trip),
  );
  if (strict.length >= MIN_GROUP_SIZE) {
    return strict;
  }

  const relaxed = trips.filter(
    (trip) =>
      isBeginnerFamilyTrip(trip) ||
      (isOffroadRelevant(trip) &&
        (tripMatchesCompanion(toTripRef(trip), "kids") ||
          tripMatchesCompanion(toTripRef(trip), "family"))),
  );
  return relaxed;
}

function filterViewpoints(trips: Trip[]): Trip[] {
  const strict = trips.filter((trip) => hasViewpoint(trip) && isOffroadRelevant(trip));
  if (strict.length >= MIN_GROUP_SIZE) {
    return strict;
  }
  return trips.filter((trip) => hasViewpoint(trip));
}

function filterWaterTerrain(trips: Trip[]): Trip[] {
  const strict = trips.filter((trip) => hasWater(trip) && isOffroadRelevant(trip));
  if (strict.length >= MIN_GROUP_SIZE) {
    return strict;
  }

  const relaxed = trips.filter(
    (trip) => hasWater(trip) || (isOffroadRelevant(trip) && hasViewpoint(trip)),
  );
  return relaxed;
}

export function getOffroadRouteGroups(trips: Trip[]): Record<
  OffroadRouteGroupId,
  Trip[]
> {
  return {
    "beginner-families": takeTrips(filterBeginnerFamilies(trips)),
    viewpoints: takeTrips(filterViewpoints(trips)),
    "water-terrain": takeTrips(filterWaterTerrain(trips)),
  };
}

function tripMatchesRegion(trip: Trip, regionSlug: string): boolean {
  if (regionSlug === "any") {
    return true;
  }

  const regionTitle = REGION_TITLE_BY_SLUG[regionSlug];
  if (!regionTitle) {
    return true;
  }

  return trip.region === regionTitle;
}

function inferDurationScore(
  trip: Trip,
  duration: OffroadWizardAnswers["duration"],
): number {
  if (!duration) {
    return 0;
  }

  const durationItem = trip.cost.find((item) => item.label.includes("משך"));
  const value = durationItem?.value ?? "";
  const activities = inferTripActivities(toTripRef(trip));

  if (duration === "short") {
    if (value.includes("2") || value.includes("3")) return 12;
    if (activities.includes("easy-trails")) return 8;
    return 4;
  }

  if (duration === "half-day") {
    if (value.includes("4") || value.includes("5") || value.includes("6")) return 12;
    if (activities.includes("picnic") || activities.includes("viewpoint")) return 8;
    return 5;
  }

  if (duration === "full-day") {
    if (value.includes("8") || value.includes("יום")) return 12;
    if (activities.includes("camping")) return 10;
    return 6;
  }

  return 0;
}

function scoreWizardTrip(trip: Trip, answers: OffroadWizardAnswers): number {
  const ref = toTripRef(trip);
  let score = 0;

  if (trip.featured) score += 8;
  if (trip.visitedByMilana) score += 6;
  if (isOffroadRelevant(trip)) score += 10;
  if (trip.category === "שטח 4x4") score += 12;

  if (answers.withKids === true) {
    if (tripMatchesCompanion(ref, "kids") || tripMatchesCompanion(ref, "family")) {
      score += 15;
    } else {
      score -= 20;
    }
  }

  if (answers.wantsWater === true) {
    score += hasWater(trip) ? 18 : -15;
  }

  if (answers.wantsCamping === true) {
    score += tripMatchesActivity(ref, "camping") ||
      isFilterTagActive(trip.filterTags?.camping)
      ? 16
      : -12;
  }

  if (answers.wantsViewpoint === true) {
    score += hasViewpoint(trip) ? 16 : -12;
  }

  score += inferDurationScore(trip, answers.duration);

  const access = getTripVehicleAccess(trip);
  if (answers.withKids === true && ACCESS_LEVEL[access] >= ACCESS_LEVEL["real-4x4"]) {
    score -= 10;
  }

  return score;
}

export function matchOffroadWizardTrips(
  trips: Trip[],
  answers: OffroadWizardAnswers,
): Trip[] {
  const pool = trips.filter((trip) => tripMatchesRegion(trip, answers.regionSlug));

  const scored = pool
    .map((trip) => ({ trip, score: scoreWizardTrip(trip, answers) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, WIZARD_RESULT_LIMIT)
    .map((entry) => entry.trip);

  if (scored.length > 0) {
    return scored;
  }

  return takeTrips(
    pool.filter((trip) => isOffroadRelevant(trip) || isFamilyFriendlyTrip(trip)),
    WIZARD_RESULT_LIMIT,
  );
}

export function getOffroadRegionLabel(regionSlug: string): string {
  if (regionSlug === "any") {
    return "כל הארץ";
  }
  return getRegionBySlug(regionSlug)?.title ?? regionSlug;
}
