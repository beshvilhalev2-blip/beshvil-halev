import { PRIORITY_LABELS } from "@/lib/gear-checklist/constants";
import type { GearHubOptionId } from "@/lib/gear-checklist/constants";
import { getGearPackLabel } from "@/lib/gear-checklist/packs";
import type {
  GearItem,
  GearPackId,
  GearPriority,
  ResolvedGearItem,
} from "@/lib/gear-checklist/types";

export type GearPresetId = Exclude<GearHubOptionId, "by-trip">;

type PresetItemDef = {
  id: string;
  label: string;
  priority: GearPriority;
  sortOrder: number;
};

type PresetDefinition = {
  id: GearPresetId;
  title: string;
  pack: GearPackId;
  items: PresetItemDef[];
};

const PRESET_DEFINITIONS: PresetDefinition[] = [
  {
    id: "camping",
    title: "רשימת ציוד לקמפינג",
    pack: "camping",
    items: [
      { id: "camping-tent", label: "אוהל", priority: "required", sortOrder: 10 },
      { id: "camping-stakes", label: "יתדות", priority: "required", sortOrder: 20 },
      { id: "camping-stake-hammer", label: "פטיש יתדות", priority: "required", sortOrder: 30 },
      { id: "camping-sleeping-bag", label: "שק שינה", priority: "required", sortOrder: 40 },
      { id: "camping-mat", label: "מזרן שטח", priority: "required", sortOrder: 50 },
      { id: "camping-headlamp", label: "פנס ראש", priority: "required", sortOrder: 60 },
      { id: "camping-power-bank", label: "סוללה ניידת", priority: "required", sortOrder: 70 },
      { id: "camping-water", label: "מים", priority: "required", sortOrder: 80 },
      { id: "camping-first-aid", label: "ערכת עזרה ראשונה", priority: "required", sortOrder: 90 },
      { id: "camping-trash-bags", label: "שקיות אשפה", priority: "required", sortOrder: 100 },
      { id: "camping-tarp", label: "צילייה", priority: "recommended", sortOrder: 110 },
      { id: "camping-table", label: "שולחן מתקפל", priority: "recommended", sortOrder: 120 },
      { id: "camping-chairs", label: "כיסאות שטח", priority: "recommended", sortOrder: 130 },
      { id: "camping-car-charger", label: "מטען לרכב", priority: "recommended", sortOrder: 140 },
      { id: "camping-rope", label: "חבל", priority: "recommended", sortOrder: 150 },
      { id: "camping-extra-flashlight", label: "פנס נוסף", priority: "recommended", sortOrder: 160 },
      { id: "camping-hammock", label: "ערסל", priority: "bonus", sortOrder: 170 },
      { id: "camping-speaker", label: "רמקול", priority: "bonus", sortOrder: 180 },
      { id: "camping-cards", label: "קלפים", priority: "bonus", sortOrder: 190 },
      { id: "camping-ambient-light", label: "תאורת אווירה", priority: "bonus", sortOrder: 200 },
    ],
  },
  {
    id: "day-trip",
    title: "רשימת ציוד ליום טיול",
    pack: "essentials",
    items: [
      { id: "day-trip-water", label: "מים", priority: "required", sortOrder: 10 },
      { id: "day-trip-hat", label: "כובע", priority: "required", sortOrder: 20 },
      { id: "day-trip-shoes", label: "נעליים נוחות", priority: "required", sortOrder: 30 },
      { id: "day-trip-phone", label: "טלפון טעון", priority: "required", sortOrder: 40 },
      { id: "day-trip-sunscreen", label: "קרם הגנה", priority: "required", sortOrder: 50 },
      { id: "day-trip-snacks", label: "חטיפים", priority: "recommended", sortOrder: 60 },
      { id: "day-trip-wipes", label: "מגבונים", priority: "recommended", sortOrder: 70 },
      { id: "day-trip-power-bank", label: "מטען נייד", priority: "recommended", sortOrder: 80 },
      { id: "day-trip-spare-shirt", label: "חולצה להחלפה", priority: "recommended", sortOrder: 90 },
      { id: "day-trip-backpack", label: "תיק גב", priority: "recommended", sortOrder: 100 },
      { id: "day-trip-camera", label: "מצלמה", priority: "bonus", sortOrder: 110 },
      { id: "day-trip-binoculars", label: "משקפת", priority: "bonus", sortOrder: 120 },
      { id: "day-trip-blanket", label: "מחצלת", priority: "bonus", sortOrder: 130 },
    ],
  },
  {
    id: "offroad",
    title: "רשימת ציוד לטיול שטח",
    pack: "offroad",
    items: [
      { id: "offroad-water", label: "מים", priority: "required", sortOrder: 10 },
      { id: "offroad-phone", label: "טלפון טעון", priority: "required", sortOrder: 20 },
      { id: "offroad-car-charger", label: "מטען לרכב", priority: "required", sortOrder: 30 },
      { id: "offroad-flashlight", label: "פנס", priority: "required", sortOrder: 40 },
      { id: "offroad-first-aid", label: "ערכת עזרה ראשונה", priority: "required", sortOrder: 50 },
      { id: "offroad-compressor", label: "קומפרסור", priority: "recommended", sortOrder: 60 },
      { id: "offroad-jumper-cables", label: "כבלי התנעה", priority: "recommended", sortOrder: 70 },
      { id: "offroad-tow-strap", label: "רצועת גרירה", priority: "recommended", sortOrder: 80 },
      { id: "offroad-basic-tools", label: "כלי עבודה בסיסיים", priority: "recommended", sortOrder: 90 },
      { id: "offroad-gloves", label: "כפפות עבודה", priority: "recommended", sortOrder: 100 },
      { id: "offroad-walkie-talkie", label: "מכשיר קשר", priority: "bonus", sortOrder: 110 },
      { id: "offroad-jack", label: "ג׳ק שטח", priority: "bonus", sortOrder: 120 },
      { id: "offroad-emergency-light", label: "תאורת חירום", priority: "bonus", sortOrder: 130 },
      { id: "offroad-gps", label: "GPS שטח", priority: "bonus", sortOrder: 140 },
    ],
  },
  {
    id: "cooking",
    title: "רשימת ציוד לבישול בשטח",
    pack: "cooking",
    items: [
      { id: "cooking-stove", label: "גזייה", priority: "required", sortOrder: 10 },
      { id: "cooking-gas", label: "בלון גז", priority: "required", sortOrder: 20 },
      { id: "cooking-lighter", label: "מצית", priority: "required", sortOrder: 30 },
      { id: "cooking-pot", label: "סיר", priority: "required", sortOrder: 40 },
      { id: "cooking-pan", label: "מחבת", priority: "required", sortOrder: 50 },
      { id: "cooking-utensils", label: "כלי אוכל", priority: "required", sortOrder: 60 },
      { id: "cooking-knife", label: "סכין", priority: "required", sortOrder: 70 },
      { id: "cooking-board", label: "קרש חיתוך", priority: "required", sortOrder: 80 },
      { id: "cooking-trash-bags", label: "שקיות אשפה", priority: "required", sortOrder: 90 },
      { id: "cooking-cooler", label: "צידנית", priority: "recommended", sortOrder: 100 },
      { id: "cooking-ice", label: "קרחונים", priority: "recommended", sortOrder: 110 },
      { id: "cooking-spices", label: "תבלינים", priority: "recommended", sortOrder: 120 },
      { id: "cooking-paper-towels", label: "נייר סופג", priority: "recommended", sortOrder: 130 },
      { id: "cooking-coffee", label: "קפה", priority: "recommended", sortOrder: 140 },
      { id: "cooking-kettle", label: "קומקום", priority: "bonus", sortOrder: 150 },
      { id: "cooking-grill", label: "מנגל קטן", priority: "bonus", sortOrder: 160 },
      { id: "cooking-thermos-cups", label: "כוסות תרמיות", priority: "bonus", sortOrder: 170 },
      { id: "cooking-table", label: "שולחן בישול", priority: "bonus", sortOrder: 180 },
    ],
  },
];

function resolvePresetItem(item: PresetItemDef, pack: GearPackId): ResolvedGearItem {
  const gearItem: GearItem = {
    id: item.id,
    label: item.label,
    pack,
    priority: item.priority,
    sortOrder: item.sortOrder,
  };

  return {
    ...gearItem,
    packLabel: getGearPackLabel(pack),
    priorityLabel: PRIORITY_LABELS[item.priority],
  };
}

export function getPresetStorageKey(presetId: GearPresetId): string {
  return `preset:${presetId}`;
}

export function isGearPresetId(value: string | null): value is GearPresetId {
  return (
    value === "camping" ||
    value === "day-trip" ||
    value === "offroad" ||
    value === "cooking"
  );
}

export function buildPresetChecklist(presetId: GearPresetId): {
  presetId: GearPresetId;
  title: string;
  storageKey: string;
  items: ResolvedGearItem[];
} {
  const definition = PRESET_DEFINITIONS.find((preset) => preset.id === presetId);

  if (!definition) {
    throw new Error(`Unknown gear preset: ${presetId}`);
  }

  return {
    presetId: definition.id,
    title: definition.title,
    storageKey: getPresetStorageKey(definition.id),
    items: definition.items.map((item) => resolvePresetItem(item, definition.pack)),
  };
}

export function getPresetTitle(presetId: GearPresetId): string {
  return buildPresetChecklist(presetId).title;
}
