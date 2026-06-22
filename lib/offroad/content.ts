export type OffroadIconId =
  | "route"
  | "pack"
  | "kids"
  | "water"
  | "sun"
  | "warning"
  | "gear"
  | "coffee";

export type OffroadTipCard = {
  id: string;
  title: string;
  icon: OffroadIconId;
  items: string[];
};

export type OffroadDifficultyCard = {
  id: "easy" | "medium" | "hard";
  title: string;
  items: string[];
  tone: "green" | "yellow" | "red";
};

export type OffroadMistake = {
  id: string;
  text: string;
};

export type OffroadGearItem = {
  id: string;
  label: string;
  icon: OffroadIconId;
  /** Reserved for future affiliate links */
  affiliateHref?: string;
};

export const OFFROAD_FIRST_TIME_CARDS: OffroadTipCard[] = [
  {
    id: "choose-route",
    title: "איך לבחור מסלול",
    icon: "route",
    items: [
      "להתחיל במסלול קל",
      "לבדוק מזג אוויר",
      "לבחור מסלול מתאים לילדים",
    ],
  },
  {
    id: "what-to-bring",
    title: "מה לקחת איתכם",
    icon: "pack",
    items: ["מים", "כובע", "ערכת עזרה ראשונה", "גלגל רזרבי"],
  },
  {
    id: "with-kids",
    title: "נוסעים עם ילדים",
    icon: "kids",
    items: ["עצירות", "אוכל", "הצללה", "פעילויות בדרך"],
  },
];

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

export const OFFROAD_BEGINNER_MISTAKES: OffroadMistake[] = [
  { id: "water", text: "יוצאים בלי מספיק מים" },
  { id: "rain", text: "נכנסים לשטח אחרי גשם" },
  { id: "signal", text: "לא בודקים קליטה" },
  { id: "waze", text: "סומכים רק על ווייז" },
  { id: "alone", text: "יוצאים לבד בפעם הראשונה" },
];

export const OFFROAD_GEAR_ITEMS: OffroadGearItem[] = [
  { id: "compressor", label: "קומפרסור", icon: "gear" },
  { id: "flashlight", label: "פנס", icon: "gear" },
  { id: "cables", label: "כבלים", icon: "gear" },
  { id: "first-aid", label: "ערכת עזרה ראשונה", icon: "gear" },
  { id: "cooler", label: "צידנית", icon: "gear" },
  { id: "coffee", label: "ערכת קפה", icon: "coffee" },
];

export const OFFROAD_ROUTE_GROUPS = [
  {
    id: "beginner-families" as const,
    title: "למשפחות מתחילות",
    description: "מסלולים רכים, נגישים ומתאימים ליציאה ראשונה מהאספלט",
  },
  {
    id: "viewpoints" as const,
    title: "תצפיות ושקיעות",
    description: "נקודות נוף מרהיבות ששווה להגיע אליהן בדרך",
  },
  {
    id: "water-terrain" as const,
    title: "מים ושטח",
    description: "שילוב של התרעננות, טבע ודרך מעניינת",
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
