import type {
  ActivityType,
  BudgetTier,
  CityId,
  CompanionType,
  WeatherPreference,
  WizardAnswers,
} from "@/lib/find-my-trip/types";
import { ACTIVITY_LABELS } from "@/lib/find-my-trip/constants";

/** Schema version for forward-compatible local storage migrations. */
export const PREFERENCE_SCHEMA_VERSION = 3 as const;

export type InferredPreferences = {
  favoriteActivities?: ActivityType[];
  /** Free-form trip type labels inferred from history — e.g. category strings. */
  favoriteTripTypes?: string[];
  favoriteCity?: CityId;
  typicalBudget?: BudgetTier;
  typicalWeather?: WeatherPreference;
  typicalCompanion?: CompanionType;
  skippedVehicleUsually?: boolean;
};

export type LocalUserPreferences = {
  version: typeof PREFERENCE_SCHEMA_VERSION;
  lastUpdated: string;
  recentSnapshots: WizardPreferenceSnapshot[];
  inferred: InferredPreferences;
};

export type WizardPreferenceSnapshot = {
  id: string;
  answers: WizardAnswers;
  results: {
    primarySlug: string | null;
    matchedSlugs: string[];
    scores: Record<string, number>;
  };
  reasonIds: Record<string, string[]>;
  createdAt: string;
  source: "find-my-trip";
  version: typeof PREFERENCE_SCHEMA_VERSION;
};

export function createEmptyLocalPreferences(): LocalUserPreferences {
  return {
    version: PREFERENCE_SCHEMA_VERSION,
    lastUpdated: new Date(0).toISOString(),
    recentSnapshots: [],
    inferred: {},
  };
}

export function createWizardSnapshot(input: {
  id: string;
  answers: WizardAnswers;
  primarySlug: string | null;
  matchedSlugs: string[];
  scores: Record<string, number>;
  reasonIds: Record<string, string[]>;
}): WizardPreferenceSnapshot {
  return {
    id: input.id,
    answers: input.answers,
    results: {
      primarySlug: input.primarySlug,
      matchedSlugs: input.matchedSlugs,
      scores: input.scores,
    },
    reasonIds: input.reasonIds,
    createdAt: new Date().toISOString(),
    source: "find-my-trip",
    version: PREFERENCE_SCHEMA_VERSION,
  };
}

/** V2: derive inferred preferences from anonymous history. Not used in V1. */
export function inferPreferencesFromHistory(
  snapshots: WizardPreferenceSnapshot[],
): InferredPreferences {
  if (snapshots.length === 0) {
    return {};
  }

  const activityCounts = new Map<ActivityType, number>();
  const tripTypeCounts = new Map<string, number>();
  const cityCounts = new Map<CityId, number>();
  let skippedVehicleCount = 0;

  for (const snapshot of snapshots) {
    activityCounts.set(
      snapshot.answers.activity,
      (activityCounts.get(snapshot.answers.activity) ?? 0) + 1,
    );

    const tripTypeLabel = ACTIVITY_LABELS[snapshot.answers.activity];
    tripTypeCounts.set(
      tripTypeLabel,
      (tripTypeCounts.get(tripTypeLabel) ?? 0) + 1,
    );

    cityCounts.set(
      snapshot.answers.city,
      (cityCounts.get(snapshot.answers.city) ?? 0) + 1,
    );

    if (!snapshot.answers.vehicle) {
      skippedVehicleCount += 1;
    }
  }

  const favoriteActivities = [...activityCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([activity]) => activity);

  const favoriteTripTypes = [...tripTypeCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([type]) => type);

  const latest = snapshots[0]?.answers;

  return {
    favoriteActivities: favoriteActivities.length ? favoriteActivities : undefined,
    favoriteTripTypes: favoriteTripTypes.length ? favoriteTripTypes : undefined,
    favoriteCity: getMostCommon(cityCounts),
    typicalBudget: latest?.budget,
    typicalWeather: latest?.weather,
    typicalCompanion: latest?.companion,
    skippedVehicleUsually:
      snapshots.length > 0
        ? skippedVehicleCount / snapshots.length >= 0.5
        : undefined,
  };
}

function getMostCommon<T>(counts: Map<T, number>): T | undefined {
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0];
}
