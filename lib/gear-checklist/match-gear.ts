import type { Trip, TripVehicleAccess } from "@/data/trips";
import { GEAR_ITEMS } from "@/data/gear-items";
import { PRIORITY_LABELS, PRIORITY_ORDER } from "@/lib/gear-checklist/constants";
import {
  compareGearPackOrder,
  getGearPackLabel,
} from "@/lib/gear-checklist/packs";
import type {
  GearItem,
  GearPackId,
  ResolvedGearItem,
  TripGearChecklist,
} from "@/lib/gear-checklist/types";
import {
  getTripMatcherProfile,
  inferTripActivities,
  inferTripCompanions,
  inferTripWeatherTraits,
  toTripRef,
} from "@/lib/find-my-trip/trip-profile";
import { getTripVehicleAccess } from "@/lib/trip-vehicle-access";

const ACCESS_LEVEL: Record<TripVehicleAccess, number> = {
  "private-car": 0,
  "soft-suv": 1,
  "real-4x4": 2,
  "hard-4x4": 3,
};

const FAMILY_FRIENDLY_CATEGORIES = new Set([
  "טיול משפחתי",
  "בילוי משפחתי",
  "פארק",
  "חוף",
  "חיות וטבע",
  "טיול מים",
  "מעיין",
  "מעיינות",
]);

const WATER_CATEGORIES = new Set([
  "טיול מים",
  "מעיין",
  "מעיינות",
  "חוף",
  "פארק מים",
]);

function resolveItem(item: GearItem): ResolvedGearItem {
  return {
    ...item,
    packLabel: getGearPackLabel(item.pack),
    priorityLabel: PRIORITY_LABELS[item.priority],
  };
}

function compareItems(a: ResolvedGearItem, b: ResolvedGearItem): number {
  const packOrder = compareGearPackOrder(a.pack, b.pack);
  if (packOrder !== 0) {
    return packOrder;
  }

  const priorityOrder =
    PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority);
  if (priorityOrder !== 0) {
    return priorityOrder;
  }

  return a.sortOrder - b.sortOrder;
}

function itemMeetsVehicleAccess(
  item: GearItem,
  vehicleAccess: TripVehicleAccess,
): boolean {
  if (!item.minVehicleAccess) {
    return true;
  }

  return ACCESS_LEVEL[vehicleAccess] >= ACCESS_LEVEL[item.minVehicleAccess];
}

function getActivePacks(trip: Trip): Set<GearPackId> {
  const tripRef = toTripRef(trip);
  const activities = inferTripActivities(tripRef);
  const companions = inferTripCompanions(tripRef);
  const weatherTraits = inferTripWeatherTraits(tripRef);
  const matcher = getTripMatcherProfile(tripRef);
  const vehicleAccess = getTripVehicleAccess(trip);

  const packs = new Set<GearPackId>(["essentials"]);

  const hasWater =
    activities.includes("water") ||
    weatherTraits.includes("water-friendly") ||
    WATER_CATEGORIES.has(trip.category);

  if (hasWater) {
    packs.add("water");
  }

  const hasFamily =
    companions.some((c) => c === "kids" || c === "family") ||
    FAMILY_FRIENDLY_CATEGORIES.has(trip.category);

  if (hasFamily) {
    packs.add("family");
  }

  const hasOffroad =
    ACCESS_LEVEL[vehicleAccess] >= ACCESS_LEVEL["soft-suv"] ||
    trip.category === "שטח 4x4";

  if (hasOffroad) {
    packs.add("offroad");
  }

  const hasPicnic =
    activities.includes("picnic") || FAMILY_FRIENDLY_CATEGORIES.has(trip.category);

  if (hasPicnic) {
    packs.add("picnic");
  }

  const hasCamping =
    activities.includes("camping") ||
    (trip.category === "שטח 4x4" &&
      ACCESS_LEVEL[vehicleAccess] >= ACCESS_LEVEL["soft-suv"]);

  if (hasCamping) {
    packs.add("camping");
  }

  const hasHotDay =
    weatherTraits.includes("heat-tolerant") ||
    weatherTraits.includes("heat-sensitive") ||
    trip.region === "דרום";

  if (hasHotDay) {
    packs.add("hot-day");
  }

  const hasWinterRain =
    weatherTraits.includes("rain-sensitive") ||
    weatherTraits.includes("winter-ideal") ||
    (matcher.weatherAvoid?.includes("rainy") ?? false);

  if (hasWinterRain) {
    packs.add("winter-rain");
  }

  return packs;
}

export function buildTripGearChecklist(trip: Trip): TripGearChecklist {
  const activePacks = getActivePacks(trip);
  const vehicleAccess = getTripVehicleAccess(trip);

  const seen = new Set<string>();
  const items: ResolvedGearItem[] = [];

  for (const item of GEAR_ITEMS) {
    if (item.pack === "cooking") {
      continue;
    }

    if (!activePacks.has(item.pack)) {
      continue;
    }

    if (!itemMeetsVehicleAccess(item, vehicleAccess)) {
      continue;
    }

    if (seen.has(item.id)) {
      continue;
    }

    seen.add(item.id);
    items.push(resolveItem(item));
  }

  items.sort(compareItems);

  return {
    tripSlug: trip.slug,
    items,
    packs: [...activePacks].sort(compareGearPackOrder),
  };
}
