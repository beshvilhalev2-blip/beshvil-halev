import type {
  LocalUserPreferences,
  WizardPreferenceSnapshot,
} from "@/lib/find-my-trip/preference-types";
import {
  createEmptyLocalPreferences,
  inferPreferencesFromHistory,
} from "@/lib/find-my-trip/preference-types";

const STORAGE_KEY = "beshvil-halev-find-my-trip-preferences";

/** V1 stub — no persistence yet. */
export function loadLocalPreferences(): LocalUserPreferences | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as LocalUserPreferences;
  } catch {
    return null;
  }
}

/** V1 stub — wired in V2 when history UI is added. */
export function saveWizardSnapshot(snapshot: WizardPreferenceSnapshot): void {
  if (typeof window === "undefined") {
    return;
  }

  const existing = loadLocalPreferences() ?? createEmptyLocalPreferences();
  const recentSnapshots = [snapshot, ...existing.recentSnapshots].slice(0, 10);

  const next: LocalUserPreferences = {
    version: existing.version,
    lastUpdated: new Date().toISOString(),
    recentSnapshots,
    inferred: inferPreferencesFromHistory(recentSnapshots),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export { inferPreferencesFromHistory };
