import type { GearPackId } from "@/lib/gear-checklist/types";

export const GEAR_PACK_LABELS: Record<GearPackId, string> = {
  essentials: "ציוד חובה",
  water: "טיול מים",
  family: "טיול עם ילדים",
  offroad: "שטח 4x4",
  picnic: "פיקניק",
  camping: "קמפינג",
  "hot-day": "יום חם",
  "winter-rain": "חורף / אחרי גשם",
  cooking: "בישול בשטח",
};

export const GEAR_PACK_ORDER: GearPackId[] = [
  "essentials",
  "water",
  "family",
  "offroad",
  "picnic",
  "camping",
  "hot-day",
  "winter-rain",
  "cooking",
];

export function getGearPackLabel(pack: GearPackId): string {
  return GEAR_PACK_LABELS[pack];
}

export function compareGearPackOrder(a: GearPackId, b: GearPackId): number {
  return GEAR_PACK_ORDER.indexOf(a) - GEAR_PACK_ORDER.indexOf(b);
}
