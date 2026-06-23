export type OffroadIconId =
  | "route"
  | "pack"
  | "kids"
  | "water"
  | "sun"
  | "warning"
  | "gear"
  | "coffee"
  | "shield"
  | "trail"
  | "convoy"
  | "sunset"
  | "nature";


export type OffroadDifficultyCard = {
  id: "easy" | "medium" | "hard";
  title: string;
  items: string[];
  tone: "green" | "yellow" | "red";
};

export type OffroadMistake = {
  id: string;
  text: string;
  icon: OffroadIconId;
  /** Short hover/tap explanation */
  hint: string;
};

export type OffroadGearItem = {
  id: string;
  label: string;
  icon: OffroadIconId;
  /** Reserved for future affiliate links */
  affiliateHref?: string;
};

export type OffroadFirstTimeTip = {
  id: string;
  title: string;
  body: string;
};

export const OFFROAD_FIRST_TIME_TIPS: OffroadFirstTimeTip[] = [
  {
    id: "easy-route",
    title: "בחרו מסלול קל",
    body: "אל תתחילו במסלול שמוגדר ל־4x4 מתקדם. לטיול ראשון עדיף לבחור שבילי עפר נוחים ומסלולים ידידותיים למשפחות.",
  },
  {
    id: "not-alone",
    title: "אל תצאו לבד",
    body: "במיוחד באזורים מרוחקים. בטיולים הראשונים מומלץ לצאת עם רכב נוסף או עם חברים בעלי ניסיון.",
  },
  {
    id: "vehicle-fit",
    title: "בדקו שהרכב מתאים",
    body: "לא כל מסלול מתאים לכל רכב. בדקו את רמת הקושי ואת דרישות הרכב לפני היציאה.",
  },
  {
    id: "time-buffer",
    title: "תכננו זמן ביטחון",
    body: "השטח תמיד איטי יותר ממה שנראה במפה. צאו מוקדם ותכננו לחזור לפני החשיכה.",
  },
  {
    id: "essentials",
    title: "מים, טעינה וניווט",
    body: "הצטיידו בכמות מים מספקת, טלפון טעון ומפת ניווט זמינה גם ללא קליטה.",
  },
];

export const OFFROAD_FIRST_TIME_SUBTITLE =
  "5 דברים שכדאי לדעת לפני שיוצאים לטיול השטח הראשון";

export const OFFROAD_LEARNING_GALLERY_TITLE = "רגעי למידה מהשטח";
export const OFFROAD_LEARNING_GALLERY_STORY =
  "גם אצלנו לא הכל יצא חלק מהיום הראשון. אלה כמה רגעים אמיתיים מהדרך - בלי פילטרים, בשביל לזכור שגם טעויות זה חלק מהמסע.";

export const OFFROAD_DIFFICULTY_CARDS: OffroadDifficultyCard[] = [
  {
    id: "easy",
    title: "שטח קל",
    tone: "green",
    items: [
      "מתאים גם לרכבי פנאי",
      "שבילים נוחים",
      "אידיאלי למשפחות",
    ],
  },
  {
    id: "medium",
    title: "שטח בינוני",
    tone: "yellow",
    items: ["דורש מעט ניסיון", "דרכי עפר משובשות"],
  },
  {
    id: "hard",
    title: "שטח מתקדם",
    tone: "red",
    items: ["4x4 בלבד", "מטיילים מנוסים"],
  },
];

export type OffroadSafetyRule = {
  id: string;
  text: string;
  description?: string;
  icon: OffroadIconId;
};

export type OffroadVehicleLevel = {
  id: "private-car" | "soft-suv" | "real-4x4" | "hard-4x4";
  title: string;
  explanation: string;
  examples: string;
  tone: "stone" | "green" | "amber" | "rose";
};

export const OFFROAD_SAFETY_RULES: OffroadSafetyRule[] = [
  { id: "marked-trails", text: "נוסעים רק בשבילים מסומנים", icon: "trail" },
  {
    id: "not-alone",
    text: "לא יוצאים לבד באזורים מרוחקים",
    icon: "convoy",
  },
  {
    id: "before-dark",
    text: "מתכננים לחזור לפני החשיכה",
    icon: "sunset",
  },
  {
    id: "convoy-distance",
    text: "שומרים מרחק בין רכבים",
    icon: "convoy",
  },
  {
    id: "after-rain",
    text: "נמנעים מבוץ, מעברי מים ותוואי דרך לא מוכר",
    icon: "water",
  },
  {
    id: "leave-clean",
    text: "שומרים על הטבע ומשאירים נקי",
    icon: "nature",
  },
];

export const OFFROAD_VEHICLE_LEVELS: OffroadVehicleLevel[] = [
  {
    id: "private-car",
    title: "רכב רגיל",
    explanation: "מתאים לכביש סלול ולגישה קלה בלבד - לא לשטח.",
    examples: "למשל: מזדה 3, טויוטה קורולה, יונדאי i30",
    tone: "stone",
  },
  {
    id: "soft-suv",
    title: "ג׳יפון / SUV",
    explanation:
      "מתאים לדרכי עפר קלות, שבילי קק״ל ומסלולים משפחתיים רכים.",
    examples: "למשל: סובארו פורסטר, טויוטה RAV4, פולקסווגן טיגואן",
    tone: "green",
  },
  {
    id: "real-4x4",
    title: "4x4 אמיתי",
    explanation:
      "מתאים לשטח בינוני - עפר רטוב, עליות מתונות והילוך כח כשצריך.",
    examples: "למשל: ג׳יפ Wrangler, טויוטה לנד קרוזר, מיצובישי Pajero",
    tone: "amber",
  },
  {
    id: "hard-4x4",
    title: "4x4 מתקדם",
    explanation:
      "מתאים למסלולים מאתגרים - מדרגות, סלעים ובוץ עמוק, לנהגים מנוסים.",
    examples: "למשל: ג׳יפ מוגבה, לנד קרוזר מחוזק, רכב עם עבירות גבוהה",
    tone: "rose",
  },
];

export const OFFROAD_BEGINNER_MISTAKES: OffroadMistake[] = [
  {
    id: "alone",
    text: "לא יוצאים לבד בפעם הראשונה",
    icon: "convoy",
    hint: "בפעם הראשונה כדאי לצאת עם מישהו שמכיר את השטח או עם רכב נוסף.",
  },
  {
    id: "rain",
    text: "לא נכנסים לשטח אחרי גשם",
    icon: "water",
    hint: "בוץ, החלקה ונחלים מסכנים - השבילים משתנים מהר אחרי גשם.",
  },
  {
    id: "waze",
    text: "לא סומכים רק על ווייז",
    icon: "route",
    hint: "הורידו מפה לשימוש ללא קליטה ובדקו את המסלול מראש.",
  },
  {
    id: "water",
    text: "לא יוצאים בלי מספיק מים",
    icon: "water",
    hint: "לפחות שני ליטר לאדם - גם בחורף ובימים קצרים.",
  },
  {
    id: "signal",
    text: "בודקים קליטה ומזג אוויר",
    icon: "sun",
    hint: "בדקו תחזית ואזורים בלי קליטה לפני שיוצאים מהבית.",
  },
  {
    id: "off-trail",
    text: "ירידה מהשביל המסומן",
    icon: "trail",
    hint: "פגיעה בטבע, סיכון להיתקע וחוקית - נשארים על השביל.",
  },
  {
    id: "late-start",
    text: "יציאה מאוחרת מדי",
    icon: "sunset",
    hint: "בשטח הכל איטי יותר - תכננו חזרה לפני החשיכה.",
  },
  {
    id: "tire-pressure",
    text: "לחץ אוויר לא מתאים",
    icon: "gear",
    hint: "לחץ נמוך עוזר בשטח; לפני כביש מוצק - הנפיחו חזרה.",
  },
  {
    id: "wadi-rain",
    text: "כניסה לנחל אחרי גשם",
    icon: "warning",
    hint: "נחלים יכולים להפוך למסוכנים תוך דקות גם בלי גשם באזור.",
  },
  {
    id: "unknown-vehicle",
    text: "יציאה בלי להכיר את הרכב",
    icon: "shield",
    hint: "דעו איפה 4x4, מרכוכ, בקרים ובלמים לפני היציאה.",
  },
];

export const OFFROAD_GEAR_ITEMS: OffroadGearItem[] = [
  { id: "compressor", label: "קומפרסור", icon: "gear" },
  { id: "flashlight", label: "פנס", icon: "gear" },
  { id: "cables", label: "כבלים", icon: "gear" },
  { id: "first-aid", label: "ערכת עזרה ראשונה", icon: "gear" },
  { id: "cooler", label: "צידנית", icon: "gear" },
  { id: "coffee", label: "ערכת קפה", icon: "coffee" },
];

export const OFFROAD_ROUTES_INTRO =
  "כל המסלולים בעמוד זה מתאימים למשפחות, רכבי SUV וג׳יפונים, עם עבירות קלה וללא צורך בהילוך כוח.";

export const OFFROAD_ROUTES_INTRO_HIGHLIGHT =
  "כל המסלולים בעמוד זה מתאימים למשפחות, רכבי SUV וג׳יפונים";

export const OFFROAD_ROUTES_INTRO_DETAIL = "עבירות קלה • ללא צורך בהילוך כוח";

export type OffroadCookingTip = {
  id: string;
  text: string;
  category: string;
  icon: OffroadIconId;
};

export const OFFROAD_COOKING_SECTION_TITLE = "טיפים לבישול בשטח";
export const OFFROAD_COOKING_SECTION_SUBTITLE =
  "רגעים טובים ליד האש - פשוט, נקי ומוכן מראש";

export const OFFROAD_COOKING_TIPS: OffroadCookingTip[] = [
  {
    id: "plan-meals",
    text: "תכננו מראש את הארוחות",
    category: "תכנון",
    icon: "pack",
  },
  {
    id: "simple-gear",
    text: "העדיפו ציוד פשוט וקל לניקוי",
    category: "ציוד",
    icon: "gear",
  },
  {
    id: "water-cooking",
    text: "הביאו מים גם לבישול ולשטיפה",
    category: "מים",
    icon: "water",
  },
  {
    id: "fire-safety",
    text: "שמרו על בטיחות ליד גזייה ומנגל",
    category: "בטיחות",
    icon: "warning",
  },
  {
    id: "trash",
    text: "אספו את כל האשפה בסיום",
    category: "ניקיון",
    icon: "nature",
  },
  {
    id: "prep-ahead",
    text: "הכינו מראש ירקות, רטבים וחומרי גלם",
    category: "הכנה",
    icon: "coffee",
  },
];

export const OFFROAD_ROUTE_GROUPS = [
  {
    id: "beginner-families" as const,
    title: "למשפחות מתחילות",
  },
  {
    id: "viewpoints" as const,
    title: "תצפיות ושקיעות",
  },
  {
    id: "water-terrain" as const,
    title: "מים ושטח",
  },
];

export const OFFROAD_WIZARD_REGIONS = [
  { slug: "any", label: "כל הארץ" },
  { slug: "north", label: "צפון" },
  { slug: "hasharon", label: "השרון" },
  { slug: "center", label: "מרכז" },
  { slug: "jerusalem", label: "ירושלים" },
  { slug: "south", label: "דרום" },
] as const;

export const OFFROAD_WIZARD_DURATIONS = [
  { id: "short" as const, label: "עד 3 שעות" },
  { id: "half-day" as const, label: "חצי יום" },
  { id: "full-day" as const, label: "יום שלם" },
] as const;
