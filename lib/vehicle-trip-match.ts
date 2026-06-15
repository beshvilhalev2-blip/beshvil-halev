export type VehicleCategoryId =
  | "private_car"
  | "soft_suv"
  | "real_4x4"
  | "serious_jeep";

export type RouteSuitability = {
  label: string;
  suitable: boolean;
};

export type WarningNote = {
  id: string;
  label: string;
  text: string;
  minCategory: VehicleCategoryId;
};

export type VehicleCategory = {
  id: VehicleCategoryId;
  label: string;
  shortLabel: string;
  chipLabel: string;
  summary: string;
};

const CATEGORY_ORDER: VehicleCategoryId[] = [
  "private_car",
  "soft_suv",
  "real_4x4",
  "serious_jeep",
];

export const vehicleCategories: VehicleCategory[] = [
  {
    id: "private_car",
    label: "רכב פרטי רגיל",
    shortLabel: "רכב פרטי",
    chipLabel: "רכב פרטי",
    summary:
      "מתאים לכביש סלול ולגישה קלה מאוד בלבד — לא לטיולי שטח.",
  },
  {
    id: "soft_suv",
    label: "SUV רך / קרוסאובר",
    shortLabel: "SUV רך",
    chipLabel: "SUV רך / קרוסאובר",
    summary:
      "מתאים לדרכי עפר קלות, שבילי קק״ל, נקודות תצפית ומסלולים משפחתיים.",
  },
  {
    id: "real_4x4",
    label: "4x4 אמיתי",
    shortLabel: "4x4 אמיתי",
    chipLabel: "4x4 אמיתי",
    summary:
      "מתאים גם לשטח בינוני — עפר רטוב, עליות מתונות ומסלולים מעבר לשביל קל.",
  },
  {
    id: "serious_jeep",
    label: "ג׳יפ גבוה / עבירות גבוהה",
    shortLabel: "ג׳יפ גבוה",
    chipLabel: "ג׳יפ גבוה / עבירות גבוהה",
    summary:
      "מתאים גם למסלולים מתקדמים — בתנאי ניסיון, צמיגים מתאימים ובדיקת מסלול מראש.",
  },
];

const routeMatrix: Record<VehicleCategoryId, RouteSuitability[]> = {
  private_car: [
    { label: "כביש סלול", suitable: true },
    { label: "גישה קלה מאוד (חניה / שביל קצר)", suitable: true },
    { label: "דרכי עפר קלות ושבילי קק״ל", suitable: false },
    { label: "נקודות תצפית ומסלולים משפחתיים", suitable: false },
    { label: "מקומות מים ופיקניק בדרך", suitable: false },
    { label: "שטח בינוני (עפר רטוב, עליות מתונות)", suitable: false },
    { label: "שטח מתקדם (סלעים, עליות תלולות)", suitable: false },
  ],
  soft_suv: [
    { label: "כביש סלול", suitable: true },
    { label: "גישה קלה מאוד (חניה / שביל קצר)", suitable: true },
    { label: "דרכי עפר קלות ושבילי קק״ל", suitable: true },
    { label: "נקודות תצפית ומסלולים משפחתיים", suitable: true },
    { label: "מקומות מים ופיקניק בדרך", suitable: true },
    { label: "שטח בינוני (עפר רטוב, עליות מתונות)", suitable: false },
    { label: "שטח מתקדם (סלעים, עליות תלולות)", suitable: false },
  ],
  real_4x4: [
    { label: "כביש סלול", suitable: true },
    { label: "גישה קלה מאוד (חניה / שביל קצר)", suitable: true },
    { label: "דרכי עפר קלות ושבילי קק״ל", suitable: true },
    { label: "נקודות תצפית ומסלולים משפחתיים", suitable: true },
    { label: "מקומות מים ופיקניק בדרך", suitable: true },
    { label: "שטח בינוני (עפר רטוב, עליות מתונות)", suitable: true },
    { label: "שטח מתקדם (סלעים, עליות תלולות)", suitable: false },
  ],
  serious_jeep: [
    { label: "כביש סלול", suitable: true },
    { label: "גישה קלה מאוד (חניה / שביל קצר)", suitable: true },
    { label: "דרכי עפר קלות ושבילי קק״ל", suitable: true },
    { label: "נקודות תצפית ומסלולים משפחתיים", suitable: true },
    { label: "מקומות מים ופיקניק בדרך", suitable: true },
    { label: "שטח בינוני (עפר רטוב, עליות מתונות)", suitable: true },
    { label: "שטח מתקדם (סלעים, עליות תלולות)", suitable: true },
  ],
};

export const warningNotes: WarningNote[] = [
  {
    id: "weather",
    label: "מזג אוויר",
    text: "גשם ושטח לא הולכים יחד — מסלול קל עלול להפוך למסוכן אחרי גשם.",
    minCategory: "private_car",
  },
  {
    id: "mud",
    label: "בוץ",
    text: "בוץ עמוק עלול לחסום כל רכב — גם SUV. בדקו מצב דרך לפני יציאה.",
    minCategory: "soft_suv",
  },
  {
    id: "sand",
    label: "חול עמוק",
    text: "חול דורש ניסיון, לחץ אוויר נמוך ורכב מתאים — לא לנסות בלי הכנה.",
    minCategory: "real_4x4",
  },
  {
    id: "rocks",
    label: "סלעים",
    text: "סלעים ושבבי אבן עלולים לפגוע בתחתית הרכב — עבירות גבוהה וצמיגי שטח חשובים.",
    minCategory: "real_4x4",
  },
  {
    id: "steep",
    label: "עליות תלולות",
    text: "עליות תלולות דורשות כוח, מומנט ושליטה — אל תנסו מכשול שאינכם בטוחים בו.",
    minCategory: "soft_suv",
  },
  {
    id: "tires",
    label: "צמיגים",
    text: "צמיגי כביש רגילים אינם מתאימים לשטח — A/T או שטח מומלצים כבר ממסלולים קלים.",
    minCategory: "soft_suv",
  },
  {
    id: "experience",
    label: "ניסיון",
    text: "התחילו במסלול קל וקצר — ניסיון נבנה בהדרגה, לא בקפיצה למסלול קשה.",
    minCategory: "soft_suv",
  },
];

function categoryIndex(id: VehicleCategoryId): number {
  return CATEGORY_ORDER.indexOf(id);
}

export function getCategoryById(id: VehicleCategoryId): VehicleCategory {
  const category = vehicleCategories.find((item) => item.id === id);
  if (!category) {
    throw new Error(`Unknown vehicle category: ${id}`);
  }
  return category;
}

export function getRoutesForCategory(
  categoryId: VehicleCategoryId,
): RouteSuitability[] {
  return routeMatrix[categoryId];
}

export function getWarningsForCategory(
  categoryId: VehicleCategoryId,
): WarningNote[] {
  const index = categoryIndex(categoryId);
  return warningNotes.filter(
    (note) => categoryIndex(note.minCategory) <= index,
  );
}
