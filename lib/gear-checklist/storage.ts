import {
  GEAR_STORAGE_KEY_PREFIX,
  GEAR_STORAGE_VERSION,
} from "@/lib/gear-checklist/constants";
import type {
  GearItemStatus,
  TripGearStorageState,
} from "@/lib/gear-checklist/types";

function storageKey(tripSlug: string): string {
  return `${GEAR_STORAGE_KEY_PREFIX}:${tripSlug}`;
}

function createEmptyState(): TripGearStorageState {
  return {
    version: GEAR_STORAGE_VERSION,
    items: {},
    cookingPlans: null,
    updatedAt: new Date().toISOString(),
  };
}

export function loadGearState(tripSlug: string): TripGearStorageState {
  if (typeof window === "undefined") {
    return createEmptyState();
  }

  try {
    const raw = window.localStorage.getItem(storageKey(tripSlug));
    if (!raw) {
      return createEmptyState();
    }

    const parsed = JSON.parse(raw) as TripGearStorageState;
    if (parsed.version !== GEAR_STORAGE_VERSION) {
      return createEmptyState();
    }

    return {
      version: GEAR_STORAGE_VERSION,
      items: parsed.items ?? {},
      cookingPlans:
        parsed.cookingPlans === true || parsed.cookingPlans === false
          ? parsed.cookingPlans
          : null,
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return createEmptyState();
  }
}

export function saveGearState(
  tripSlug: string,
  state: Omit<TripGearStorageState, "version" | "updatedAt">,
): TripGearStorageState {
  const next: TripGearStorageState = {
    version: GEAR_STORAGE_VERSION,
    items: state.items,
    cookingPlans: state.cookingPlans,
    updatedAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(storageKey(tripSlug), JSON.stringify(next));
  }

  return next;
}

export function clearGearState(tripSlug: string): TripGearStorageState {
  const empty = createEmptyState();

  if (typeof window !== "undefined") {
    window.localStorage.setItem(storageKey(tripSlug), JSON.stringify(empty));
  }

  return empty;
}

export function updateGearItemStatus(
  tripSlug: string,
  current: TripGearStorageState,
  itemId: string,
  status: GearItemStatus,
): TripGearStorageState {
  const items = { ...current.items };

  if (status === "unset") {
    delete items[itemId];
  } else {
    items[itemId] = status;
  }

  return saveGearState(tripSlug, {
    items,
    cookingPlans: current.cookingPlans,
  });
}

export function updateCookingPlans(
  tripSlug: string,
  current: TripGearStorageState,
  cookingPlans: boolean | null,
  itemsOverride?: Record<string, GearItemStatus>,
): TripGearStorageState {
  return saveGearState(tripSlug, {
    items: itemsOverride ?? current.items,
    cookingPlans,
  });
}
