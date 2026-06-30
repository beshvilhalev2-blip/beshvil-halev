import type { Trip, TripQuickFact } from "@/data/trips";
import {
  inferTripCompanions,
  toTripRef,
} from "@/lib/find-my-trip/trip-profile";
import { isPlaceholderValue } from "@/lib/trip-content-utils";
import { isStrollerAccessibleFilterMatch } from "@/lib/trip-filter-tags";

const QUICK_FACT_LABELS = [
  "עלות",
  "מתאים לילדים",
  "מים כל השנה",
  "נגיש לעגלות",
  "זמן ביקור",
] as const;

function normalizeLabel(label: string): string {
  return label.trim();
}

function findCostItem(trip: Trip, matcher: (label: string) => boolean) {
  return trip.cost.find((item) => matcher(item.label.trim()));
}

function deriveQuickFacts(trip: Trip): TripQuickFact[] {
  const derived = new Map<string, TripQuickFact>();

  const visitDuration = findCostItem(
    trip,
    (label) => label.includes("משך") || label.includes("בילוי"),
  );
  if (visitDuration?.value.trim() && !isPlaceholderValue(visitDuration.value)) {
    derived.set("זמן ביקור", {
      label: "זמן ביקור",
      value: visitDuration.value.trim(),
    });
  }

  const entryCost = findCostItem(trip, (label) => label.includes("כניסה"));
  if (entryCost?.value.trim() && !isPlaceholderValue(entryCost.value)) {
    derived.set("עלות", {
      label: "עלות",
      value: entryCost.value.trim(),
      ...(entryCost.note && !isPlaceholderNote(entryCost.note)
        ? { emphasis: true }
        : {}),
    });
  }

  const companions = inferTripCompanions(toTripRef(trip));
  if (companions.includes("kids") || companions.includes("family")) {
    derived.set("מתאים לילדים", {
      label: "מתאים לילדים",
      value: "כן",
    });
  }

  const stroller = trip.filterTags?.strollerAccessible;
  if (isStrollerAccessibleFilterMatch(stroller)) {
    derived.set("נגיש לעגלות", {
      label: "נגיש לעגלות",
      value: stroller === "partial" ? "חלקית" : "כן",
    });
  } else if (stroller === false) {
    derived.set("נגיש לעגלות", {
      label: "נגיש לעגלות",
      value: "לא",
    });
  }

  return [...derived.values()];
}

function isPlaceholderNote(note: string): boolean {
  return note.trim().startsWith("[");
}

function mergeQuickFacts(
  derived: TripQuickFact[],
  overrides: TripQuickFact[] | undefined,
): TripQuickFact[] {
  const merged = new Map<string, TripQuickFact>();

  for (const fact of derived) {
    merged.set(normalizeLabel(fact.label), fact);
  }

  for (const fact of overrides ?? []) {
    const label = normalizeLabel(fact.label);
    if (!label || !fact.value.trim() || isPlaceholderValue(fact.value)) {
      continue;
    }
    merged.set(label, {
      label,
      value: fact.value.trim(),
      emphasis: fact.emphasis,
    });
  }

  const ordered: TripQuickFact[] = [];

  for (const label of QUICK_FACT_LABELS) {
    const fact = merged.get(label);
    if (fact) {
      ordered.push(fact);
    }
  }

  return ordered;
}

export function resolveTripQuickFacts(trip: Trip): TripQuickFact[] {
  return mergeQuickFacts(deriveQuickFacts(trip), trip.quickFacts);
}

export function hasTripQuickFacts(trip: Trip): boolean {
  return resolveTripQuickFacts(trip).length > 0;
}
