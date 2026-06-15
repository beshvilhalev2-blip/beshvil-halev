import { PRIORITY_ORDER, PRIORITY_WEIGHT } from "@/lib/gear-checklist/constants";
import type {
  GearItemStatus,
  ReadinessResult,
  ResolvedGearItem,
} from "@/lib/gear-checklist/types";

function compareByPriority(a: ResolvedGearItem, b: ResolvedGearItem): number {
  const priorityOrder =
    PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority);
  if (priorityOrder !== 0) {
    return priorityOrder;
  }

  return a.sortOrder - b.sortOrder;
}

export function calculateReadiness(
  items: ResolvedGearItem[],
  statuses: Record<string, GearItemStatus>,
): ReadinessResult {
  let earnedWeight = 0;
  let totalWeight = 0;
  let haveCount = 0;
  let missingCount = 0;
  let unsetCount = 0;
  const missingItems: ResolvedGearItem[] = [];

  for (const item of items) {
    const status = statuses[item.id] ?? "unset";
    const weight = PRIORITY_WEIGHT[item.priority];

    totalWeight += weight;

    if (status === "have") {
      earnedWeight += weight;
      haveCount += 1;
    } else if (status === "missing") {
      missingCount += 1;
      missingItems.push(item);
    } else {
      unsetCount += 1;
    }
  }

  const percent =
    totalWeight === 0 ? 0 : Math.round((earnedWeight / totalWeight) * 100);

  missingItems.sort(compareByPriority);

  return {
    percent,
    total: items.length,
    haveCount,
    missingCount,
    unsetCount,
    missingItems,
  };
}
