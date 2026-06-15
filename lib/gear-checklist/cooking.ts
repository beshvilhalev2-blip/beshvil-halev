import { COOKING_GEAR_ITEM_IDS, GEAR_ITEMS } from "@/data/gear-items";
import { PRIORITY_LABELS } from "@/lib/gear-checklist/constants";
import { compareGearPackOrder, getGearPackLabel } from "@/lib/gear-checklist/packs";
import type {
  GearItemStatus,
  GearPackId,
  ResolvedGearItem,
  TripGearChecklist,
} from "@/lib/gear-checklist/types";

export { COOKING_GEAR_ITEM_IDS };

function resolveCookingItem(
  item: (typeof GEAR_ITEMS)[number],
): ResolvedGearItem {
  return {
    ...item,
    packLabel: getGearPackLabel(item.pack),
    priorityLabel: PRIORITY_LABELS[item.priority],
  };
}

export function getCookingGearItems(): ResolvedGearItem[] {
  return GEAR_ITEMS.filter((item) => item.pack === "cooking")
    .map(resolveCookingItem)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function appendCookingItems(
  checklist: TripGearChecklist,
): TripGearChecklist {
  const cookingItems = getCookingGearItems();
  const existingIds = new Set(checklist.items.map((item) => item.id));
  const merged = [...checklist.items];

  for (const item of cookingItems) {
    if (!existingIds.has(item.id)) {
      merged.push(item);
    }
  }

  const packs: GearPackId[] = checklist.packs.includes("cooking")
    ? checklist.packs
    : ([...checklist.packs, "cooking"] as GearPackId[]).sort(
        compareGearPackOrder,
      );

  return {
    ...checklist,
    items: merged,
    packs,
  };
}

export function stripCookingStatuses(
  items: Record<string, GearItemStatus>,
): Record<string, GearItemStatus> {
  const next = { ...items };

  for (const id of COOKING_GEAR_ITEM_IDS) {
    delete next[id];
  }

  return next;
}

export function mergeChecklistWithCooking(
  checklist: TripGearChecklist,
  cookingPlans: boolean | null,
): TripGearChecklist {
  if (cookingPlans !== true) {
    return checklist;
  }

  return appendCookingItems(checklist);
}
