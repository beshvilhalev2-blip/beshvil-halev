import type {
  GearPackId,
  GearPriority,
  ResolvedGearItem,
} from "@/lib/gear-checklist/types";

export type GearDisplayGroupId =
  | "water"
  | "family"
  | "offroad"
  | "cooking"
  | "basics";

export type GearDisplayGroup = {
  id: GearDisplayGroupId;
  emoji: string;
  label: string;
  packs: GearPackId[];
};

export const GEAR_DISPLAY_GROUPS: GearDisplayGroup[] = [
  {
    id: "water",
    emoji: "🌊",
    label: "ציוד מים",
    packs: ["water", "hot-day"],
  },
  {
    id: "family",
    emoji: "👨‍👩‍👧‍👦",
    label: "ציוד למשפחה",
    packs: ["family", "picnic"],
  },
  {
    id: "offroad",
    emoji: "🚙",
    label: "ציוד שטח",
    packs: ["offroad", "camping"],
  },
  {
    id: "cooking",
    emoji: "🍳",
    label: "בישול בשטח",
    packs: ["cooking"],
  },
  {
    id: "basics",
    emoji: "🎒",
    label: "ציוד בסיסי",
    packs: ["essentials", "winter-rain"],
  },
];

export function groupItemsByDisplayGroup(
  items: ResolvedGearItem[],
): Map<GearDisplayGroupId, ResolvedGearItem[]> {
  const groups = new Map<GearDisplayGroupId, ResolvedGearItem[]>();

  for (const group of GEAR_DISPLAY_GROUPS) {
    const groupItems = items.filter((item) => group.packs.includes(item.pack));
    if (groupItems.length > 0) {
      groups.set(group.id, groupItems);
    }
  }

  return groups;
}

export function getDisplayGroupForPack(
  pack: GearPackId,
): GearDisplayGroup | undefined {
  return GEAR_DISPLAY_GROUPS.find((group) => group.packs.includes(pack));
}

export type GearPriorityGroupId = GearPriority;

export type GearPriorityGroup = {
  id: GearPriorityGroupId;
  emoji: string;
  label: string;
};

export const GEAR_PRIORITY_GROUPS: GearPriorityGroup[] = [
  { id: "required", emoji: "⭐", label: "חובה" },
  { id: "recommended", emoji: "👍", label: "מומלץ" },
  { id: "bonus", emoji: "✨", label: "בונוס" },
];

export function groupItemsByPriority(
  items: ResolvedGearItem[],
): Map<GearPriorityGroupId, ResolvedGearItem[]> {
  const groups = new Map<GearPriorityGroupId, ResolvedGearItem[]>();

  for (const group of GEAR_PRIORITY_GROUPS) {
    const groupItems = items
      .filter((item) => item.priority === group.id)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    if (groupItems.length > 0) {
      groups.set(group.id, groupItems);
    }
  }

  return groups;
}
