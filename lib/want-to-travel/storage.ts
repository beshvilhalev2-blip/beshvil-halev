import { notifyWantToTravelUpdated } from "@/lib/want-to-travel/events";

export const WANT_TO_TRAVEL_STORAGE_KEY = "beshvil-halev-want-to-travel";
export const WANT_TO_TRAVEL_STORAGE_VERSION = 1 as const;

export type WantToTravelStorageState = {
  version: typeof WANT_TO_TRAVEL_STORAGE_VERSION;
  tripSlugs: string[];
  updatedAt: string;
};

function createEmptyState(): WantToTravelStorageState {
  return {
    version: WANT_TO_TRAVEL_STORAGE_VERSION,
    tripSlugs: [],
    updatedAt: new Date().toISOString(),
  };
}

function readState(): WantToTravelStorageState {
  if (typeof window === "undefined") {
    return createEmptyState();
  }

  try {
    const raw = window.localStorage.getItem(WANT_TO_TRAVEL_STORAGE_KEY);
    if (!raw) {
      return createEmptyState();
    }

    const parsed = JSON.parse(raw) as WantToTravelStorageState;
    if (parsed.version !== WANT_TO_TRAVEL_STORAGE_VERSION) {
      return createEmptyState();
    }

    return {
      version: WANT_TO_TRAVEL_STORAGE_VERSION,
      tripSlugs: Array.isArray(parsed.tripSlugs)
        ? parsed.tripSlugs.filter((slug) => typeof slug === "string")
        : [],
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return createEmptyState();
  }
}

function writeState(state: WantToTravelStorageState): WantToTravelStorageState {
  const next: WantToTravelStorageState = {
    version: WANT_TO_TRAVEL_STORAGE_VERSION,
    tripSlugs: state.tripSlugs,
    updatedAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      WANT_TO_TRAVEL_STORAGE_KEY,
      JSON.stringify(next),
    );
    notifyWantToTravelUpdated();
  }

  return next;
}

export function getSavedWantToTravelTrips(): string[] {
  return readState().tripSlugs;
}

export function isTripSaved(tripSlug: string): boolean {
  return readState().tripSlugs.includes(tripSlug);
}

export function saveTripToWantToTravel(tripSlug: string): WantToTravelStorageState {
  const current = readState();
  const withoutDuplicate = current.tripSlugs.filter((slug) => slug !== tripSlug);

  return writeState({
    ...current,
    tripSlugs: [tripSlug, ...withoutDuplicate],
  });
}

export function removeTripFromWantToTravel(
  tripSlug: string,
): WantToTravelStorageState {
  const current = readState();

  return writeState({
    ...current,
    tripSlugs: current.tripSlugs.filter((slug) => slug !== tripSlug),
  });
}

export function clearAllWantToTravelTrips(): WantToTravelStorageState {
  return writeState(createEmptyState());
}
