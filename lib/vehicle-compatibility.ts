import type { VehicleCategoryId } from "@/lib/vehicle-trip-match";

export type VehicleCompatibilityCategory =
  | "offroad"
  | "softroad"
  | "privateCar"
  | "unknown";

export type CompatibilityWarningLevel = "low" | "medium" | "high" | "info";

export type CompatibilityCategoryInfo = {
  id: VehicleCompatibilityCategory;
  label: string;
  summary: string;
  warningLevel: CompatibilityWarningLevel;
  warningLabel: string;
  recommendedFilters: string[];
  suitableTripTypes: string[];
};

export const COMPATIBILITY_DISCLAIMER =
  "ההתאמה היא כללית בלבד ואינה מחליפה בדיקת דרך, מזג אוויר, מרווח גחון, צמיגים וניסיון נהיגה.";

export const PRIVATE_CAR_RECOMMENDATIONS = [
  "מסלולים עם חניה קרובה",
  "ללא שטח",
  "נגישים לרכב פרטי",
  "לא להיכנס לשבילי עפר לא מסומנים",
] as const;

const compatibilityCategories: Record<
  VehicleCompatibilityCategory,
  CompatibilityCategoryInfo
> = {
  offroad: {
    id: "offroad",
    label: "מתאים לשטח קל / 4x4",
    summary:
      "רכב עם הנעה כפולה ועבירות טובה — מתאים לשבילי עפר, קק״ל ושטח קל עד בינוני, בתנאי בדיקה מראש.",
    warningLevel: "medium",
    warningLabel: "בדקו מסלול, מזג אוויר וצמיגים לפני יציאה",
    recommendedFilters: [
      "שטח קל ו-4x4",
      "שבילי קק״ל",
      "נקודות תצפית בדרכי עפר",
      "מסלולים משפחתיים בשטח",
    ],
    suitableTripTypes: [
      "כביש סלול וגישה קלה",
      "דרכי עפר קלות ושבילי קק״ל",
      "נקודות תצפית ומסלולים משפחתיים",
      "שטח בינוני (עפר רטוב, עליות מתונות)",
    ],
  },
  softroad: {
    id: "softroad",
    label: "מתאים לשבילי עפר קלים בלבד",
    summary:
      "SUV / קרוסאובר — מתאים לשבילים מסומנים ויציבים, לא לשטח מאתגר או לאחר גשם.",
    warningLevel: "medium",
    warningLabel: "הימנעו משטח רטוב, בוץ ושבילים לא מסומנים",
    recommendedFilters: [
      "שבילי עפר קלים",
      "גישה קלה",
      "ללא שטח מאתגר",
      "מתאים למשפחות",
    ],
    suitableTripTypes: [
      "כביש סלול וגישה קלה",
      "דרכי עפר יבשות ומסומנות",
      "נקודות תצפית עם גישה נוחה",
      "מקומות מים עם חניה קרובה",
    ],
  },
  privateCar: {
    id: "privateCar",
    label: "מתאים לרכב פרטי בלבד — לא מומלץ לשטח",
    summary:
      "רכב שטחי נמוך — מתאים לכביש סלול ולמסלולים עם חניה קרובה בלבד.",
    warningLevel: "high",
    warningLabel: "לא מומלץ להיכנס לשבילי עפר או שטח",
    recommendedFilters: [...PRIVATE_CAR_RECOMMENDATIONS],
    suitableTripTypes: [
      "כביש סלול",
      "חניה קרובה לנקודת העניין",
      "מסלולים נגישים ללא שטח",
    ],
  },
  unknown: {
    id: "unknown",
    label: "אין מספיק מידע — מומלץ לבדוק לפני יציאה",
    summary:
      "לא מצאנו מספיק נתונים על הרכב — התייעצו, בדקו מפרט ואל תיכנסו לשטח ללא ודאות.",
    warningLevel: "info",
    warningLabel: "בדקו מפרט רכב, מרווח גחון וצמיגים לפני מסלול",
    recommendedFilters: [
      "מסלולים עם גישה קלה",
      "ללא שטח עד לבדיקה",
      "חניה קרובה",
      "בדקו מפרט רכב מול המסלול",
    ],
    suitableTripTypes: [
      "כביש סלול",
      "גישה קלה מאוד (חניה / שביל קצר)",
    ],
  },
};

const defaultTripCategory: Record<
  VehicleCompatibilityCategory,
  VehicleCategoryId
> = {
  offroad: "real_4x4",
  softroad: "soft_suv",
  privateCar: "private_car",
  unknown: "private_car",
};

export function getCompatibilityCategoryInfo(
  category: VehicleCompatibilityCategory,
): CompatibilityCategoryInfo {
  return compatibilityCategories[category];
}

export function getTripCategoryForCompatibility(
  category: VehicleCompatibilityCategory,
  override?: VehicleCategoryId,
): VehicleCategoryId {
  return override ?? defaultTripCategory[category];
}

export function getWarningLevelStyles(
  level: CompatibilityWarningLevel,
): { badge: string; panel: string } {
  switch (level) {
    case "low":
      return {
        badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
        panel:
          "border-emerald-200/80 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30",
      };
    case "medium":
      return {
        badge: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
        panel:
          "border-amber-200/80 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30",
      };
    case "high":
      return {
        badge: "bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-200",
        panel:
          "border-rose-200/80 bg-rose-50 dark:border-rose-900/50 dark:bg-rose-950/30",
      };
    case "info":
    default:
      return {
        badge: "bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-200",
        panel:
          "border-sky-200/80 bg-sky-50 dark:border-sky-900/50 dark:bg-sky-950/30",
      };
  }
}
