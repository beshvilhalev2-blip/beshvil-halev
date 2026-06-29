import type { Trip, TripGettingThere } from "@/data/trips";
import { isPlaceholderContent, isPlaceholderValue } from "@/lib/trip-content-utils";

function cleanGettingThereNotes(notes: string[] | undefined): string[] {
  return (notes ?? []).filter(
    (note) => note.trim() && !isPlaceholderContent(note),
  );
}

function cleanGettingThereField(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed || isPlaceholderValue(trimmed)) {
    return undefined;
  }
  return trimmed;
}

function hasGettingThereContent(data: TripGettingThere): boolean {
  return Boolean(
    cleanGettingThereField(data.parking) ||
      cleanGettingThereField(data.walking) ||
      cleanGettingThereNotes(data.notes).length > 0,
  );
}

function normalizeGettingThere(data: TripGettingThere): TripGettingThere {
  return {
    parking: cleanGettingThereField(data.parking),
    walking: cleanGettingThereField(data.walking),
    notes: cleanGettingThereNotes(data.notes),
  };
}

function findCostItem(trip: Trip, matcher: (label: string) => boolean) {
  return trip.cost.find((item) => matcher(item.label.trim()));
}

export function resolveTripGettingThere(trip: Trip): TripGettingThere | null {
  if (trip.gettingThere && hasGettingThereContent(trip.gettingThere)) {
    return normalizeGettingThere(trip.gettingThere);
  }

  const derived: TripGettingThere = {};
  const parking = findCostItem(trip, (label) => label.includes("חניה"));

  if (parking?.value.trim() && !isPlaceholderValue(parking.value)) {
    const value = parking.value.trim();
    if (/הליכה|דק/i.test(value)) {
      derived.walking = value;
    } else {
      derived.parking = value;
    }
  }

  const walk = findCostItem(trip, (label) => label.includes("הליכה"));
  if (walk?.value.trim() && !isPlaceholderValue(walk.value) && !derived.walking) {
    derived.walking = walk.value.trim();
  }

  return hasGettingThereContent(derived) ? normalizeGettingThere(derived) : null;
}
