import type { GearItem } from "@/lib/gear-checklist/types";

export const GEAR_ITEMS: GearItem[] = [
  // Essentials
  { id: "water", label: "מים", pack: "essentials", priority: "required", sortOrder: 10 },
  { id: "snacks", label: "חטיפים", pack: "essentials", priority: "recommended", sortOrder: 20 },
  { id: "first-aid", label: "ערכת עזרה ראשונה", pack: "essentials", priority: "required", sortOrder: 30 },
  { id: "sun-hat", label: "כובע", pack: "essentials", priority: "recommended", sortOrder: 40 },
  { id: "trash-bags", label: "שקיות אשפה", pack: "essentials", priority: "recommended", sortOrder: 50 },
  { id: "power-bank", label: "מטען נייד", pack: "essentials", priority: "recommended", sortOrder: 60 },
  { id: "offline-maps", label: "מפת offline / ניווט", pack: "essentials", priority: "recommended", sortOrder: 70 },
  { id: "id-cash", label: "תעודה מזהה ומזומן", pack: "essentials", priority: "bonus", sortOrder: 80 },

  // Water
  { id: "water-shoes", label: "נעלי מים", pack: "water", priority: "required", sortOrder: 10 },
  { id: "towel", label: "מגבת", pack: "water", priority: "recommended", sortOrder: 20 },
  { id: "change-clothes", label: "בגדי החלפה", pack: "water", priority: "recommended", sortOrder: 30 },
  { id: "wet-bag", label: "שקית לבגדים רטובים", pack: "water", priority: "recommended", sortOrder: 40 },
  { id: "dry-bag", label: "שקית/תיק אטום למים", pack: "water", priority: "bonus", sortOrder: 50 },

  // Family
  { id: "kids-life-jackets", label: "מצופים לילדים", pack: "family", priority: "required", sortOrder: 10 },
  { id: "wipes", label: "מגבונים", pack: "family", priority: "recommended", sortOrder: 20 },
  { id: "spare-kids-clothes", label: "בגדי החלפה לילדים", pack: "family", priority: "recommended", sortOrder: 30 },
  { id: "stroller-friendly-check", label: "עגלה / מנשא (לפי הצורך)", pack: "family", priority: "bonus", sortOrder: 40 },
  { id: "kids-snacks", label: "חטיפים לילדים", pack: "family", priority: "recommended", sortOrder: 50 },

  // Offroad - soft-suv tier
  { id: "flashlight", label: "פנס", pack: "offroad", priority: "required", sortOrder: 10, minVehicleAccess: "soft-suv" },
  { id: "hiking-shoes", label: "נעלי הליכה", pack: "offroad", priority: "recommended", sortOrder: 20, minVehicleAccess: "soft-suv" },
  { id: "tire-pressure-gauge", label: "מד לחץ אוויר", pack: "offroad", priority: "bonus", sortOrder: 30, minVehicleAccess: "soft-suv" },

  // Offroad - real-4x4 tier
  { id: "compressor", label: "קומפרסור", pack: "offroad", priority: "recommended", sortOrder: 40, minVehicleAccess: "real-4x4" },
  { id: "tow-strap", label: "רצועת גרירה", pack: "offroad", priority: "bonus", sortOrder: 50, minVehicleAccess: "real-4x4" },
  { id: "recovery-boards", label: "רפטיה", pack: "offroad", priority: "bonus", sortOrder: 60, minVehicleAccess: "real-4x4" },

  // Picnic
  { id: "picnic-blanket", label: "שמיכת פיקניק", pack: "picnic", priority: "recommended", sortOrder: 10 },
  { id: "picnic-utensils", label: "כלים וצלחות", pack: "picnic", priority: "recommended", sortOrder: 20 },
  { id: "cooler", label: "צ'ילר / שק קירור", pack: "picnic", priority: "bonus", sortOrder: 30 },

  // Camping
  { id: "camping-tent", label: "אוהל", pack: "camping", priority: "recommended", sortOrder: 10 },
  { id: "sleeping-bag", label: "שק שינה", pack: "camping", priority: "recommended", sortOrder: 20 },
  { id: "camping-mat", label: "מזרן שטח", pack: "camping", priority: "recommended", sortOrder: 30 },
  { id: "headlamp", label: "פנס ראש", pack: "camping", priority: "required", sortOrder: 40 },

  // Hot day
  { id: "sunscreen", label: "קרם הגנה", pack: "hot-day", priority: "required", sortOrder: 10 },
  { id: "sunglasses", label: "משקפי שמש", pack: "hot-day", priority: "recommended", sortOrder: 20 },
  { id: "electrolytes", label: "אלקטרוליטים / משקה", pack: "hot-day", priority: "bonus", sortOrder: 30 },

  // Winter / rain
  { id: "rain-jacket", label: "מעיל גשם", pack: "winter-rain", priority: "required", sortOrder: 10 },
  { id: "warm-layer", label: "שכבה חמה", pack: "winter-rain", priority: "recommended", sortOrder: 20 },
  { id: "waterproof-bag", label: "תיק/שקית אטומה", pack: "winter-rain", priority: "recommended", sortOrder: 30 },
  { id: "grip-shoes", label: "נעליים עם אחיזה", pack: "winter-rain", priority: "recommended", sortOrder: 40 },

  // Cooking (user opt-in only)
  { id: "cooking-stove", label: "גזייה", pack: "cooking", priority: "required", sortOrder: 10 },
  { id: "cooking-gas", label: "בלון גז", pack: "cooking", priority: "required", sortOrder: 20 },
  { id: "cooking-lighter", label: "מצית", pack: "cooking", priority: "required", sortOrder: 30 },
  { id: "cooking-pot", label: "סיר", pack: "cooking", priority: "recommended", sortOrder: 40 },
  { id: "cooking-pan", label: "מחבת", pack: "cooking", priority: "recommended", sortOrder: 50 },
  { id: "cooking-utensils", label: "כלי אוכל", pack: "cooking", priority: "recommended", sortOrder: 60 },
  { id: "cooking-knife", label: "סכין", pack: "cooking", priority: "recommended", sortOrder: 70 },
  { id: "cooking-board", label: "קרש חיתוך", pack: "cooking", priority: "recommended", sortOrder: 80 },
  { id: "cooking-trash-bags", label: "שקיות אשפה", pack: "cooking", priority: "required", sortOrder: 90 },
];

export const COOKING_GEAR_ITEM_IDS = GEAR_ITEMS.filter(
  (item) => item.pack === "cooking",
).map((item) => item.id);

export function getGearItemById(id: string): GearItem | undefined {
  return GEAR_ITEMS.find((item) => item.id === id);
}
