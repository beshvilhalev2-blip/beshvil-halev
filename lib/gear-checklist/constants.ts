import type { GearPriority } from "@/lib/gear-checklist/types";

export const GEAR_STORAGE_KEY_PREFIX = "beshvil-halev-gear-checklist";

export const GEAR_STORAGE_VERSION = 1 as const;

export const PRIORITY_LABELS: Record<GearPriority, string> = {
  required: "חובה",
  recommended: "מומלץ",
  bonus: "בונוס",
};

export const PRIORITY_WEIGHT: Record<GearPriority, number> = {
  required: 3,
  recommended: 2,
  bonus: 1,
};

export const PRIORITY_ORDER: GearPriority[] = [
  "required",
  "recommended",
  "bonus",
];

export const GEAR_HOMEPAGE_CTA = {
  title: "🎒 מוכנים לטיול?",
  description: "בדקו מה חסר לכם לפני שיוצאים לדרך.",
  button: "בדקו את הרשימה",
  href: "/gear",
} as const;

export const GEAR_LANDING_PAGE = {
  title: "רשימת ציוד לטיול",
  subtitle:
    "בחרו את סוג הרשימה שמתאים לכם — או בנו רשימה חכמה לפי טיול ספציפי.",
  eyebrow: "הכנה לטיול",
} as const;

export type GearHubOptionId =
  | "camping"
  | "day-trip"
  | "offroad"
  | "cooking"
  | "by-trip";

export type GearHubOptionIcon =
  | "camping"
  | "day-trip"
  | "offroad"
  | "cooking"
  | "by-trip";

export type GearHubOption = {
  id: GearHubOptionId;
  title: string;
  description: string;
  status: "coming-soon" | "active";
  cta?: string;
  href?: string;
  icon: GearHubOptionIcon;
  iconBg: string;
  accent: string;
  borderHover: string;
};

export const GEAR_HUB_OPTIONS: GearHubOption[] = [
  {
    id: "camping",
    title: "רשימת ציוד לקמפינג",
    description:
      "אוהל, שקי שינה, תאורה, בישול וכל מה שצריך ללילה בשטח.",
    status: "coming-soon",
    icon: "camping",
    iconBg:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    accent: "from-emerald-500/15 to-teal-600/10",
    borderHover: "border-stone-200/80 dark:border-stone-800",
  },
  {
    id: "day-trip",
    title: "רשימת ציוד ליום טיול",
    description:
      "מים, כובע, נעליים נוחות, חטיפים וציוד בסיסי ליציאה קצרה.",
    status: "coming-soon",
    icon: "day-trip",
    iconBg: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
    accent: "from-sky-500/15 to-blue-600/10",
    borderHover: "border-stone-200/80 dark:border-stone-800",
  },
  {
    id: "offroad",
    title: "רשימת ציוד לטיול שטח",
    description:
      "ציוד בטיחות, ניווט, קומפרסור, תאורה וכלים בסיסיים לרכב.",
    status: "coming-soon",
    icon: "offroad",
    iconBg: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
    accent: "from-zinc-500/15 to-amber-700/10",
    borderHover: "border-stone-200/80 dark:border-stone-800",
  },
  {
    id: "cooking",
    title: "רשימת ציוד לבישול בשטח",
    description:
      "גזייה, כלי אוכל, סיר, מחבת, קרש חיתוך ושקיות אשפה.",
    status: "coming-soon",
    icon: "cooking",
    iconBg:
      "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    accent: "from-amber-500/15 to-orange-600/10",
    borderHover: "border-stone-200/80 dark:border-stone-800",
  },
  {
    id: "by-trip",
    title: "בנה לי רשימת ציוד לפי טיול",
    description:
      "בחרו טיול מתוך האתר וניצור לכם רשימת ציוד מותאמת לפי סוג הטיול.",
    status: "active",
    cta: "בחרו טיול",
    href: "/recommendations",
    icon: "by-trip",
    iconBg:
      "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
    accent: "from-teal-500/20 to-emerald-600/10",
    borderHover:
      "border-emerald-200/80 hover:border-emerald-300 dark:border-emerald-900/60 dark:hover:border-emerald-700",
  },
];

export const GEAR_SHARE = {
  channels: ["whatsapp"] as const,
  siteName: "בשביל הלב",
} as const;

export const AUTO_SAVE_NOTE = "הרשימה נשמרת אוטומטית במכשיר שלכם";
