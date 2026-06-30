import type { TripMatcherProfile } from "@/lib/find-my-trip/trip-profile";
import { applyPlacesFilterSync } from "@/lib/apply-places-filter-sync";
import { normalizeTripVehicleAccess } from "@/lib/trip-vehicle-access";
import { placesFilterSyncBySlug } from "./places-filter-sync";
import { visitedByMilanaMatchedSlugs } from "./visited-place-matches";
import { visitedPlaceTrips } from "./visited-place-trips";

import type { TripFilterTags } from "@/lib/trip-filter-tags";

export type { TripFilterValue, TripFilterTags } from "@/lib/trip-filter-tags";

export type TripCostItem = {
  label: string;
  value: string;
  note?: string;
};

export type TripQuickFact = {
  label: string;
  value: string;
  emphasis?: boolean;
};

export type TripFaqItem = {
  question: string;
  answer: string;
};

export type TripGalleryItem = {
  label?: string;
  gradient?: string;
  src?: string;
};

export type TripNearbyPlace = {
  title: string;
  description: string;
  href: string;
};

export type TripGettingThere = {
  parking?: string;
  walking?: string;
  notes?: string[];
};

export type TripVehicleAccess =
  | "private-car"
  | "soft-suv"
  | "real-4x4"
  | "hard-4x4";

export const DEFAULT_TRIP_VEHICLE_ACCESS: TripVehicleAccess = "private-car";

export type TripLocation = {
  lat: number;
  lng: number;
  label: string;
  googleMapsUrl?: string;
  wazeUrl?: string;
};

export type TripStatus = "published" | "needs-content";

export type Trip = {
  slug: string;
  title: string;
  subtitle: string;
  region: string;
  category: string;
  tags?: string[];
  metaDescription: string;
  seoTitle?: string;
  featured?: boolean;
  status?: TripStatus;
  visitedByMilana?: boolean;
  heroImage?: string;
  heroImagePosition?: string;
  heroImageLabel: string;
  heroBackgroundImage: string;
  heroNote?: string;
  heroNoteLabel?: string;
  location?: TripLocation;
  wazeUrl?: string;
  googleMapsUrl?: string;
  highlights?: string[];
  quickFacts?: TripQuickFact[];
  gettingThere?: TripGettingThere;
  closingNote?: string;
  faq?: TripFaqItem[];
  about: string[];
  personalStory: string[];
  cost: TripCostItem[];
  tips: string[];
  gallery: TripGalleryItem[];
  gallerySubtitle: string;
  /** Manual nearby trip slugs - when set (including []), overrides coordinate lookup. */
  nearbyTripSlugs?: string[];
  nearbyPlaces: TripNearbyPlace[];
  nearbySubtitle: string;
  vehicleAccess?: TripVehicleAccess;
  matcher?: TripMatcherProfile;
  filterTags?: TripFilterTags;
  /** Hidden from public site when not present in places-filter Excel */
  excludedFromSite?: boolean;
};

export type Region = {
  slug: string;
  title: string;
  description: string;
  iconBg: string;
  accent: string;
  borderHover: string;
  heroBackgroundImage: string;
};

export const regions: Region[] = [
  {
    slug: "north",
    title: "צפון",
    description: "גליל, גולן, חופים ויערות ירוקים",
    iconBg: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    accent: "from-emerald-500/20 to-teal-600/10",
    borderHover: "hover:border-emerald-200 dark:hover:border-emerald-800",
    heroBackgroundImage: `
      linear-gradient(160deg, rgba(6, 78, 59, 0.8) 0%, rgba(15, 118, 110, 0.6) 50%, rgba(28, 25, 23, 0.7) 100%),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='480' viewBox='0 0 1920 480'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23059669'/%3E%3Cstop offset='100%25' stop-color='%23134e4a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='1920' height='480'/%3E%3C/svg%3E")
    `,
  },
  {
    slug: "hasharon",
    title: "השרון",
    description: "חופים, יערות ושבילים במישור החוף הצפוני",
    iconBg: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
    accent: "from-sky-500/20 to-blue-600/10",
    borderHover: "hover:border-sky-200 dark:hover:border-sky-800",
    heroBackgroundImage: `
      linear-gradient(160deg, rgba(3, 105, 161, 0.78) 0%, rgba(14, 165, 233, 0.55) 50%, rgba(28, 25, 23, 0.7) 100%),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='480' viewBox='0 0 1920 480'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2338bdf8'/%3E%3Cstop offset='100%25' stop-color='%230369a1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='1920' height='480'/%3E%3C/svg%3E")
    `,
  },
  {
    slug: "center",
    title: "מרכז",
    description: "שפלה, מישור החוף ושבילי הטבע",
    iconBg: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    accent: "from-amber-500/20 to-orange-600/10",
    borderHover: "hover:border-amber-200 dark:hover:border-amber-800",
    heroBackgroundImage: `
      linear-gradient(160deg, rgba(180, 83, 9, 0.75) 0%, rgba(217, 119, 6, 0.55) 50%, rgba(28, 25, 23, 0.7) 100%),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='480' viewBox='0 0 1920 480'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23f59e0b'/%3E%3Cstop offset='100%25' stop-color='%23b45309'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='1920' height='480'/%3E%3C/svg%3E")
    `,
  },
  {
    slug: "jerusalem",
    title: "ירושלים",
    description: "עיר הקודש, הרים ונקודות תצפית",
    iconBg: "bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-200",
    accent: "from-stone-500/20 to-amber-700/10",
    borderHover: "hover:border-stone-300 dark:hover:border-stone-600",
    heroBackgroundImage: `
      linear-gradient(160deg, rgba(87, 83, 78, 0.8) 0%, rgba(180, 83, 9, 0.5) 50%, rgba(28, 25, 23, 0.7) 100%),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='480' viewBox='0 0 1920 480'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23a8a29e'/%3E%3Cstop offset='100%25' stop-color='%2344403c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='1920' height='480'/%3E%3C/svg%3E")
    `,
  },
  {
    slug: "south",
    title: "דרום",
    description: "מדבר, מכתשים ושקיעות אינסופיות",
    iconBg: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    accent: "from-orange-500/20 to-rose-600/10",
    borderHover: "hover:border-orange-200 dark:hover:border-orange-800",
    heroBackgroundImage: `
      linear-gradient(160deg, rgba(154, 52, 18, 0.8) 0%, rgba(194, 65, 12, 0.55) 50%, rgba(28, 25, 23, 0.7) 100%),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='480' viewBox='0 0 1920 480'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23f97316'/%3E%3Cstop offset='100%25' stop-color='%237c2d12'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='1920' height='480'/%3E%3C/svg%3E")
    `,
  },
  {
    slug: "judea-samaria",
    title: "יהודה ושומרון",
    description: "הרים, נחלים ונופים פתוחים בלב הארץ",
    iconBg: "bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-300",
    accent: "from-lime-500/20 to-emerald-600/10",
    borderHover: "hover:border-lime-200 dark:hover:border-lime-800",
    heroBackgroundImage: `
      linear-gradient(160deg, rgba(77, 124, 15, 0.75) 0%, rgba(101, 163, 13, 0.5) 50%, rgba(28, 25, 23, 0.7) 100%),
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='480' viewBox='0 0 1920 480'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2384cc16'/%3E%3Cstop offset='100%25' stop-color='%23365314'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='1920' height='480'/%3E%3C/svg%3E")
    `,
  },
];

const nahalHashofetHeroBackground = `
  linear-gradient(
    160deg,
    rgba(6, 78, 59, 0.7) 0%,
    rgba(15, 118, 110, 0.55) 40%,
    rgba(28, 25, 23, 0.65) 100%
  ),
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='water' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23059669'/%3E%3Cstop offset='50%25' stop-color='%230d9488'/%3E%3Cstop offset='100%25' stop-color='%23134e4a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23water)' width='1920' height='1080'/%3E%3Cpath fill='%23047857' opacity='0.4' d='M0 600 Q320 500 640 580 T1280 560 T1920 620 L1920 1080 L0 1080 Z'/%3E%3Cpath fill='%2310b981' opacity='0.25' d='M0 700 Q480 620 960 700 T1920 680 L1920 1080 L0 1080 Z'/%3E%3C/svg%3E")
`;

const satafHeroBackground = `
  linear-gradient(
    160deg,
    rgba(87, 83, 78, 0.75) 0%,
    rgba(180, 83, 9, 0.5) 40%,
    rgba(28, 25, 23, 0.7) 100%
  ),
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='hills' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23a8a29e'/%3E%3Cstop offset='50%25' stop-color='%23d97706'/%3E%3Cstop offset='100%25' stop-color='%2344403c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23hills)' width='1920' height='1080'/%3E%3Cpath fill='%2378716c' opacity='0.4' d='M0 620 Q480 500 960 600 T1920 580 L1920 1080 L0 1080 Z'/%3E%3Cpath fill='%23b45309' opacity='0.25' d='M0 720 Q640 640 1280 710 T1920 690 L1920 1080 L0 1080 Z'/%3E%3C/svg%3E")
`;

const einBokekHeroBackground = `
  linear-gradient(
    160deg,
    rgba(180, 83, 9, 0.7) 0%,
    rgba(217, 119, 6, 0.5) 40%,
    rgba(28, 25, 23, 0.7) 100%
  ),
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='bokek' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23fbbf24'/%3E%3Cstop offset='50%25' stop-color='%23f59e0b'/%3E%3Cstop offset='100%25' stop-color='%23b45309'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23bokek)' width='1920' height='1080'/%3E%3Cpath fill='%23d97706' opacity='0.3' d='M0 680 Q500 580 1000 660 T1920 620 L1920 1080 L0 1080 Z'/%3E%3C/svg%3E")
`;

const nitzanimLakeHeroBackground = `
  linear-gradient(
    160deg,
    rgba(14, 116, 144, 0.7) 0%,
    rgba(6, 182, 212, 0.5) 40%,
    rgba(28, 25, 23, 0.7) 100%
  ),
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='lake' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2306b6d4'/%3E%3Cstop offset='50%25' stop-color='%230891b2'/%3E%3Cstop offset='100%25' stop-color='%23155e75'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23lake)' width='1920' height='1080'/%3E%3Cpath fill='%2322d3ee' opacity='0.25' d='M0 700 Q480 620 960 700 T1920 680 L1920 1080 L0 1080 Z'/%3E%3C/svg%3E")
`;

const einModaImages = [
  "/images/trips/ein-moda/01.jpeg",
  "/images/trips/ein-moda/02.jpeg",
  "/images/trips/ein-moda/03.jpeg",
  "/images/trips/ein-moda/04.jpeg",
] as const;

const benShemenForestHeroBackground = `
  linear-gradient(
    160deg,
    rgba(39, 39, 42, 0.8) 0%,
    rgba(120, 53, 15, 0.5) 40%,
    rgba(28, 25, 23, 0.75) 100%
  ),
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='forest' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%2352525b'/%3E%3Cstop offset='50%25' stop-color='%23a16207'/%3E%3Cstop offset='100%25' stop-color='%23276432'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23forest)' width='1920' height='1080'/%3E%3Cpath fill='%233f3f46' opacity='0.35' d='M0 600 Q320 480 640 560 T1280 540 T1920 580 L1920 1080 L0 1080 Z'/%3E%3C/svg%3E")
`;

const nahalSorekEstuaryHeroBackground = `
  linear-gradient(
    160deg,
    rgba(217, 119, 6, 0.7) 0%,
    rgba(14, 165, 233, 0.5) 40%,
    rgba(28, 25, 23, 0.7) 100%
  ),
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='estuary' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23f59e0b'/%3E%3Cstop offset='50%25' stop-color='%2338bdf8'/%3E%3Cstop offset='100%25' stop-color='%230284c7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23estuary)' width='1920' height='1080'/%3E%3Cpath fill='%230ea5e9' opacity='0.3' d='M0 720 Q640 640 1280 710 T1920 690 L1920 1080 L0 1080 Z'/%3E%3C/svg%3E")
`;

const rawTrips: Trip[] = [
  {
    slug: "nahal-hashofet",
    title: "נחל השופט",
    subtitle: "מסלול מים קסום וקליל למשפחות בצפון",
    region: "צפון",
    category: "טיול מים",
    matcher: {
      activities: ["water", "nature-shade", "easy-trails"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["water-friendly", "shade-rich"],
      weatherAvoid: ["rainy"],
    },
    location: {
      lat: 32.982,
      lng: 35.527,
      label: "חניון נחל השופט",
    },
    metaDescription:
      "מסלול מים קסום וקליל למשפחות בצפון - מדריך מלא לנחל השופט עם טיפים, עלויות ומקומות נוספים באזור",
    heroImage: "/images/places/north/נחל שופט/hero.jpeg",
    heroImageLabel: "תמונת רקע - נחל השופט",
    heroBackgroundImage: nahalHashofetHeroBackground,
    about: [
      "נחל השופט הוא אחד ממסלולי המים האהובים ביותר בגליל העליון - שביל מוצל לאורך נחל זורם, עם בריכות טבעיות, צמחייה עשירה ואווירה קסומה שמתאימה לכל המשפחה.",
      "המסלול עובר בין עצי אורן ושיטה, עם נקודות עצירה לאורך הדרך שבהן אפשר להתרענן, לשכשך וליהנות מהטבע. זהו מקום מושלם ליום טיול רגוע, במיוחד בחודשי הקיץ החמים.",
      "[טקסט מקום - יוחלף בתוכן אמיתי]",
    ],
    personalStory: [
      "בפעם הראשונה שהגענו לנחל השופט, הילדים רצו ישר למים - ואנחנו עמדנו רגע והתבוננו בירוק שמקיף את הנחל. היה שקט, רק קול המים וציוץ הציפורים.",
      "מאז חזרנו לכאן כמה פעמים, בכל פעם מגלה משהו חדש: פינה שקטה, בריכה עמוקה יותר, או פשוט רגע של חיבור למשפחה ולטבע.",
      "[סיפור אישי - יוחלף בתוכן אמיתי]",
    ],
    cost: [
      { label: "כניסה", value: "חינם", note: "[placeholder]" },
      { label: "חניה", value: "₪-", note: "[placeholder]" },
      { label: "משך טיול", value: "2–3 שעות", note: "[placeholder]" },
    ],
    tips: [
      "הגיעו מוקדם בבוקר - במיוחד בסופי שבוע וחגים",
      "הביאו נעלי מים נוחות ומגבת לכל המשפחה",
      "שמרו על ניקיון המקום והשאירו רק טביעות אצבעות",
      "בדקו מראש את מצב המים ורמת הקושי של המסלול",
      "חנו בחניון המסודר ולכו ברגל עד לנקודת הכניסה",
    ],
    gallery: [
      { src: "/images/places/north/נחל שופט/IMG_3836.jpeg" },
      { src: "/images/places/north/נחל שופט/IMG_3871%203.jpeg" },
      { src: "/images/places/north/נחל שופט/IMG_8734.jpeg" },
      { src: "/images/places/north/נחל שופט/IMG_8748.jpeg" },
      { src: "/images/places/north/נחל שופט/IMG_8762%202.jpeg" },
      { src: "/images/places/north/נחל שופט/IMG_8764.jpeg" },
      { src: "/images/places/north/נחל שופט/IMG_9108.jpeg" },
    ],
    gallerySubtitle: "",
    nearbyPlaces: [
      {
        title: "מעיינות השופט",
        description: "מעיינות קרירים ובריכות טבעיות בלב הגליל",
        href: "#",
      },
      {
        title: "יער ביריה",
        description: "יער אורן ירוק עם שבילי הליכה מוצלים",
        href: "#",
      },
      {
        title: "כפר גלעדי",
        description: "מוזיאון ונקודת תצפית על עמק החולה",
        href: "#",
      },
    ],
    nearbySubtitle: "המשיכו לגלות את הצפון",
  },
  {
    slug: "sataf",
    title: "הסטף",
    subtitle: "מעיינות קסומים וטרסות עתיקות בהרי ירושלים",
    region: "ירושלים",
    category: "מעיינות",
    matcher: {
      activities: ["water", "nature-shade", "easy-trails", "picnic"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["water-friendly", "shade-rich", "rain-sensitive"],
      travelTimeFrom: {
        jerusalem: "30m",
        "maale-adumim": "30m",
        "beit-shemesh": "30m",
        modiin: "1h",
        ramla: "1h",
      },
    },
    location: {
      lat: 31.768,
      lng: 35.114,
      label: "חניון הסטף",
    },
    metaDescription:
      "הסטף - מעיינות וטרסות עתיקות בהרי ירושלים. מדריך מלא עם טיפים, עלויות ומקומות נוספים באזור",
    heroImage: "/images/places/jerusalem/הסטף/hero.jpeg",
    heroImageLabel: "תמונת רקע - הסטף",
    heroBackgroundImage: satafHeroBackground,
    about: [
      "הסטף הוא אחד האתרים היפים ביותר בהרי ירושלים - שילוב של מעיינות טבעיים, טרסות חקלאיות עתיקות ושבילי הליכה מוצלים בין עצי זית ואלון.",
      "האתר מנוהל על ידי קק״ל ומציע מספר מסלולים בדרגות קושי שונות, עם נקודות עצירה לאורך הדרך ונוף מרהיב על עמק האלה וירושלים.",
      "[טקסט מקום - יוחלף בתוכן אמיתי]",
    ],
    personalStory: [
      "ביקרנו בהסטף ביום אביבי נעים, כשהכל ירוק ופרח. הלכנו בשביל שעובר בין הטרסות ולמדנו על חקלאות עתיקה - חוויה שמשלבת טבע והיסטוריה.",
      "עצרנו ליד אחד המעיינות, שתינו מים קרירים ופשוט נהנינו מהשקט. זה מקום שמאלץ אותך להאט ולהתבונן.",
      "[סיפור אישי - יוחלף בתוכן אמיתי]",
    ],
    cost: [
      { label: "כניסה", value: "חינם", note: "[placeholder]" },
      { label: "חניה", value: "₪-", note: "[placeholder]" },
      { label: "משך טיול", value: "2–4 שעות", note: "[placeholder]" },
    ],
    tips: [
      "בחרו מסלול מתאים לרמת הכושר - יש מסלולים קלים ומאתגרים",
      "הביאו נעלי הליכה נוחות - השבילים סלעיים בחלקם",
      "הגיעו בשעות הבוקר המוקדמות לחוויה שקטה יותר",
      "שמרו על הטרסות - אל תיכנסו לשטחי החקלאות",
      "בדקו באתר קק״ל לגבי שעות פתיחה ואירועים מיוחדים",
    ],
    gallery: [
      { src: "/images/places/jerusalem/הסטף/IMG_0440.jpeg" },
      { src: "/images/places/jerusalem/הסטף/IMG_0449.jpeg" },
      { src: "/images/places/jerusalem/הסטף/IMG_0450.jpeg" },
      { src: "/images/places/jerusalem/הסטף/IMG_0457.jpeg" },
      { src: "/images/places/jerusalem/הסטף/IMG_0466.jpeg" },
      { src: "/images/places/jerusalem/הסטף/IMG_0469.jpeg" },
      { src: "/images/places/jerusalem/הסטף/IMG_0471.jpeg" },
    ],
    gallerySubtitle: "",
    nearbyPlaces: [
      {
        title: "יער ירושלים",
        description: "יער אורנים ירוק עם שבילי הליכה ונקודות פיקניק",
        href: "#",
      },
      {
        title: "עין כרם",
        description: "שכונה עתיקה עם סמטאות, כנסיות ונוף על ירושלים",
        href: "#",
      },
      {
        title: "מצדה",
        description: "מבצר עתיק עם נוף מרהיב על ים המלח",
        href: "#",
      },
    ],
    nearbySubtitle: "המשיכו לגלות את ירושלים והסביבה",
  },
  {
    slug: "ein-bokek",
    title: "עין בוקק",
    subtitle: "נחל מים ומפלים בלב מדבר יהודה - חוויה משפחתית בדרום",
    region: "דרום",
    category: "טיול מים",
    matcher: {
      activities: ["water", "easy-trails", "picnic"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["water-friendly", "heat-sensitive"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        "beer-sheva": "1h-plus",
        arad: "1h-plus",
      },
    },
    location: {
      lat: 31.826,
      lng: 35.364,
      label: "חניון עין בוקק",
    },
    metaDescription:
      "עין בוקק - נחל מים ומפלים במדבר יהודה. מדריך מלא עם טיפים, עלויות ומקומות נוספים באזור",
    heroImage: "/images/places/south/עין בוקק/hero.jpeg",
    heroImageLabel: "תמונת רקע - עין בוקק",
    heroBackgroundImage: einBokekHeroBackground,
    about: [
      "עין בוקק הוא נחל זורם בצפון מדבר יהודה, עם מפלים, בריכות טבעיות ושביל מסודר שמתאים למשפחות.",
      "האזור משלב נוף מדברי מרהיב עם פינות ירוקות לאורך הנחל - מקום מושלם ליום טיול בחודשי הקיץ.",
      "[טקסט מקום - יוחלף בתוכן אמיתי]",
    ],
    personalStory: [
      "הליכה לאורך הנחל עם רוח קלה וקול המים ברקע - כך נזכור את הבוקר הראשון בעין בוקק.",
      "הילדים קפצו בין הבריכות ואנחנו מצאנו פינה שקטה לקפה ולשקט. יום פשוט שהפך לזיכרון מושלם.",
      "[סיפור אישי - יוחלף בתוכן אמיתי]",
    ],
    cost: [
      { label: "כניסה", value: "חינם", note: "[placeholder]" },
      { label: "חניה", value: "₪-", note: "[placeholder]" },
      { label: "משך טיול", value: "2–3 שעות", note: "[placeholder]" },
    ],
    tips: [
      "הגיעו מוקדם - המקום פופולרי מאוד בסופי שבוע",
      "הביאו נעלי מים, מגבות ומים לשתייה",
      "שימו לב לשילוט - חלק מהמסלולים סגורים בעונות מסוימות",
      "אין צל לאורך כל השביל - כובע וקרם הגנה חובה",
      "בדקו מראש את זרימת המים בעונה",
    ],
    gallery: [
      { src: "/images/places/south/עין בוקק/IMG_2560.jpeg" },
      { src: "/images/places/south/עין בוקק/IMG_2562.jpeg" },
      { src: "/images/places/south/עין בוקק/IMG_2569.jpeg" },
      { src: "/images/places/south/עין בוקק/IMG_2582.jpeg" },
      { src: "/images/places/south/עין בוקק/IMG_2598.jpeg" },
      { src: "/images/places/south/עין בוקק/IMG_2632.jpeg" },
    ],
    gallerySubtitle: "",
    nearbyPlaces: [
      {
        title: "חאן עין גדי",
        description: "נחל ומעיינות ירוקים ליד ים המלח",
        href: "/trips/chn-yn-gdy",
      },
      {
        title: "מעיינות עין גדי",
        description: "נחל ומעיינות ירוקים ליד ים המלח",
        href: "#",
      },
      {
        title: "אגם ניצנים",
        description: "אגם מלאכותי מדהים עם חוף ים ופיקניק",
        href: "/trips/nitzanim-lake",
      },
    ],
    nearbySubtitle: "המשיכו לגלות את הדרום",
  },
  {
    slug: "nitzanim-lake",
    title: "אגם ניצנים",
    subtitle: "אגם, חול ושקיעות - יום כיף משפחתי על חוף הדרום",
    region: "דרום",
    category: "טיול מים",
    matcher: {
      activities: ["water", "picnic", "easy-trails"],
      companions: ["solo", "friends", "kids", "family"],
      weatherTraits: ["water-friendly", "heat-tolerant"],
      travelTimeFrom: {
        ashdod: "30m",
        ashkelon: "30m",
        rishon: "1h",
        holon: "1h",
        "bat-yam": "1h",
      },
    },
    location: {
      lat: 31.749,
      lng: 34.622,
      label: "חניון אגם ניצנים",
    },
    metaDescription:
      "אגם ניצנים - אגם מלאכותי עם חוף ים בדרום. מדריך עם טיפים, עלויות ומקומות נוספים באזור",
    heroImage: "/images/places/south/אגם ניצנים/hero.jpeg",
    heroImageLabel: "תמונת רקע - אגם ניצנים",
    heroBackgroundImage: nitzanimLakeHeroBackground,
    about: [
      "אגם ניצנים הוא אגם מלאכותי יפהפה בחוף הדרומי, עם חוף מדורג, דשא, שבילי הליכה ואזורי פיקניק.",
      "המקום מתאים למשפחות שמחפשות יום שלם של טבע, מים ושקט - בלי לנסוע רחוק מהמרכז.",
      "[טקסט מקום - יוחלף בתוכן אמיתי]",
    ],
    personalStory: [
      "פשטנו שמיכה על הדשא, הילדים רצו למים ואנחנו נשארנו לצפות בשקיעה. לא ציפינו שמקום כל כך קרוב לבית ירגיש כמו חופשה.",
      "חזרנו לכאן כמה פעמים - בכל פעם עם פיקניק אחר, אבל תמיד עם אותה תחושה של רוגע.",
      "[סיפור אישי - יוחלף בתוכן אמיתי]",
    ],
    cost: [
      { label: "כניסה", value: "₪-", note: "[placeholder]" },
      { label: "חניה", value: "₪-", note: "[placeholder]" },
      { label: "משך בילוי", value: "חצי יום", note: "[placeholder]" },
    ],
    tips: [
      "הגיעו לפני השקיעה - הנוף מדהים בשעות הערב",
      "הביאו ציוד פיקניק, מגבות וקרם הגנה",
      "בדקו שעות פתיחה וכללי בטיחות במים",
      "בסופי שבוע חנו מוקדם - המקום מתמלא",
      "שמרו על ניקיון האגם והחוף",
    ],
    gallery: [
      { src: "/images/places/south/אגם ניצנים/IMG_1024.jpeg" },
      { src: "/images/places/south/אגם ניצנים/IMG_1465.jpeg" },
      { src: "/images/places/south/אגם ניצנים/IMG_1488.jpeg" },
      { src: "/images/places/south/אגם ניצנים/IMG_1503.jpeg" },
      { src: "/images/places/south/אגם ניצנים/IMG_4588.jpeg" },
    ],
    gallerySubtitle: "",
    nearbyPlaces: [
      {
        title: "עין בוקק",
        description: "נחל מים ומפלים בלב מדבר יהודה",
        href: "/trips/ein-bokek",
      },
      {
        title: "חולות ניצנים",
        description: "דיונות חול ונוף ים פתוח",
        href: "#",
      },
      {
        title: "מדבריום",
        description: "פארק חיות מדבריות עם תצוגות ונשרים",
        href: "/trips/mdbryvm",
      },
    ],
    nearbySubtitle: "המשיכו לגלות את הדרום",
  },
  {
    slug: "ein-moda",
    title: "עין מודע",
    subtitle: "מים צלולים, צל טבעי והמון מקום לילדים להשתולל",
    heroNote: "ביקרנו כאן מספר פעמים עם הילדים",
    heroNoteLabel: "המלצה אישית",
    region: "צפון",
    category: "מעיין",
    featured: true,
    matcher: {
      activities: ["water", "picnic", "easy-trails"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["water-friendly", "shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        "kfar-saba": "1h",
        raanana: "1h",
        "hod-hasharon": "1h",
        herzliya: "1h",
        netanya: "1h",
        modiin: "1h-plus",
        ramla: "1h-plus",
        lod: "1h-plus",
      },
    },
    location: {
      lat: 32.683,
      lng: 35.289,
      label: "עין מודע",
      wazeUrl:
        "https://waze.com/ul?q=%D7%A2%D7%99%D7%9F%20%D7%9E%D7%95%D7%93%D7%A2&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=%D7%A2%D7%99%D7%9F%20%D7%9E%D7%95%D7%93%D7%A2",
    },
    seoTitle: "עין מודע – מעיין מומלץ למשפחות בצפון | שביל הלב",
    metaDescription:
      "עין מודע הוא אחד המעיינות היפים בצפון. מים צלולים, צל טבעי, שולחנות פיקניק, שירותים ומסלול נוח למשפחות עם ילדים.",
    heroImage: "/images/places/north/עין מודע/hero.jpeg",
    heroImageLabel: "תמונת רקע - עין מודע",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/עין מודע/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%A2%D7%99%D7%9F%20%D7%9E%D7%95%D7%93%D7%A2&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=%D7%A2%D7%99%D7%9F%20%D7%9E%D7%95%D7%93%D7%A2",
    highlights: [
      "מים צלולים ונקיים",
      "הרבה אזורי צל טבעיים",
      "מתאים במיוחד למשפחות עם ילדים",
      "שולחנות פיקניק ומקומות ישיבה",
      "שירותים במקום",
      "הכניסה ללא תשלום",
      "ניתן להגיע גם עם עגלה",
    ],
    about: [
      "אם אתם מחפשים מקום שבו הילדים יכולים לקפוץ למים, לשחק בבטחה ואתם יכולים לשבת בצל עם קפה ופיקניק – עין מודע הוא אחד המקומות היפים והנעימים בצפון.",
      "המים צלולים, הטמפרטורה נעימה כמעט בכל עונות השנה, והאווירה כולה מרגישה כמו חופשה קטנה באמצע הטבע.",
      "עין מודע נמצא בלב עמק המעיינות ונחשב לאחד המעיינות האהובים באזור.",
      "מדובר בבריכת מים גדולה ומסודרת המוזנת ממי מעיין טבעיים. סביב הבריכה תמצאו עצים גבוהים, אזורי ישיבה מוצלים ומרחבים פתוחים שמאפשרים להעביר כאן כמה שעות טובות בכיף.",
      "המים משלבים אזורים רדודים לצד אזורים עמוקים יותר, כך שגם ילדים וגם מבוגרים יכולים ליהנות מהמקום.",
    ],
    personalStory: [
      "הגענו לעין מודע ביום חם, בדיוק מהימים האלה שבהם כולם רק מחפשים מים.",
      "כבר בדרך למעיין הילדים התחילו לרוץ קדימה בהתרגשות, וכשהגענו לבריכה הם לא חיכו אפילו דקה לפני שנכנסו למים.",
      "יש משהו מרגיע במקום הזה. המים הצלולים, העצים מסביב והשקט של העמק יוצרים תחושה של חופש אמיתי.",
      "אני אוהבת במיוחד מקומות שמאפשרים לילדים להרגיש עצמאיים, לשחק, לחקור ולהתנסות – ועין מודע בהחלט נותן את התחושה הזאת.",
      "לפעמים כל מה שצריך זה יום פשוט בטבע כדי לזכור כמה אושר אפשר למצוא בדברים הקטנים.",
    ],
    cost: [
      { label: "כניסה", value: "חינם" },
      { label: "חניה", value: "הליכה ~10 דק׳" },
      { label: "משך בילוי", value: "2–4 שעות" },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "כן, במיוחד" },
      { label: "מים כל השנה", value: "כן, נעים בכל עונה" },
      { label: "נגיש לעגלות", value: "כן" },
      { label: "זמן ביקור", value: "2–4 שעות" },
    ],
    gettingThere: {
      parking: "חניה בחוץ + הליכה קצרה",
      walking:
        "ההליכה מהחניה למעיין לוקחת בערך 10 דקות. המסלול נוח גם למשפחות עם עגלת תינוק.",
      notes: [
        "בסופי שבוע וחגים כדאי להגיע מוקדם — המקום מתמלא מהר.",
        "יש שירותים במקום.",
      ],
    },
    closingNote:
      "בואו נשמור על הטבע יפה. קחו איתכם את האשפה והשאירו את המקום בדיוק כמו שמצאתם אותו 💚",
    faq: [
      {
        question: "מתאים לעגלות?",
        answer:
          "כן. הגישה למעיין נוחה יחסית, ויש מסלול מתאים גם למשפחות עם עגלת תינוק.",
      },
      {
        question: "יש שירותים?",
        answer: "כן, יש שירותים במקום.",
      },
      {
        question: "יש צל?",
        answer:
          "כן. סביב הבריכה יש עצים גבוהים ואזורי ישיבה מוצלים — אחד היתרונות הגדולים של המקום.",
      },
      {
        question: "אפשר לעשות מנגל?",
        answer:
          "לא מומלץ לעשות מנגל ליד הבריכה עצמה. אפשר להביא פיקניק, מחצלת ואוכל, אבל כדאי לשמור על ניקיון המקום.",
      },
      {
        question: "כמה זמן לוקח המסלול?",
        answer:
          "ההליכה מהחניה למעיין לוקחת בערך 10 דקות. רוב המבקרים נשארים 2–4 שעות, תלוי בקצב ובמזג האוויר.",
      },
    ],
    tips: [
      "להגיע מוקדם בבוקר",
      "להביא מחצלת או שמיכה לפיקניק",
      "להביא נעלי מים לילדים",
      "בסופי שבוע וחגים המקום יכול להיות עמוס",
      "לשלב עם טיולים נוספים באזור עמק המעיינות",
    ],
    gallery: [
      { src: "/images/places/north/עין מודע/IMG_02.jpeg" },
      { src: "/images/places/north/עין מודע/IMG_03.jpeg" },
      { src: "/images/places/north/עין מודע/IMG_04.jpeg" },
    ],
    gallerySubtitle: "",
    nearbyPlaces: [
      {
        title: "נחל השופט",
        description: "מסלול מים קסום וקליל למשפחות בגליל",
        href: "/trips/nahal-hashofet",
      },
      {
        title: "מעיינות השופט",
        description: "מעיינות קרירים ובריכות טבעיות בעמק המעיינות",
        href: "#",
      },
      {
        title: "יער ביריה",
        description: "יער אורן ירוק עם שבילי הליכה מוצלים",
        href: "#",
      },
    ],
    nearbySubtitle: "המשיכו לגלות את עמק המעיינות והצפון",
  },
  {
    slug: "nchl-dn",
    title: "שמורת תל דן",
    subtitle:
      "שמורת טבע קסומה בצפון עם מסלול קל למשפחות, פלגי מים זורמים לאורך כל הדרך, מסלול נגיש לעגלות ואווירה שפשוט מרגיעה את הלב.",
    region: "צפון",
    category: "טיול מים",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "nature-shade", "easy-trails"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: 31,
      weatherTraits: ["water-friendly", "shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        "kfar-saba": "1h-plus",
        raanana: "1h-plus",
        "hod-hasharon": "1h-plus",
        herzliya: "1h-plus",
        netanya: "1h-plus",
        modiin: "1h-plus",
        ramla: "1h-plus",
        lod: "1h-plus",
      },
    },
    location: {
      lat: 33.248611,
      lng: 35.651944,
      label: "שמורת תל דן",
      wazeUrl:
        "https://waze.com/ul?q=%D7%A9%D7%9E%D7%95%D7%A8%D7%AA%20%D7%AA%D7%9C%20%D7%93%D7%9F&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=%D7%A9%D7%9E%D7%95%D7%A8%D7%AA%20%D7%AA%D7%9C%20%D7%93%D7%9F",
    },
    seoTitle: "שמורת תל דן - מסלול קל למשפחות בצפון | בשביל הלב",
    metaDescription:
      "שמורת תל דן היא אחת משמורות הטבע היפות בישראל - מסלול קל למשפחות, פלגי מים זורמים, בריכות שכשוך, מסלול נגיש ואווירת טבע קסומה.",
    heroImage: "/images/places/north/שמורת תל דן/hero.jpeg",
    heroImageLabel: "תמונת רקע - שמורת תל דן",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/שמורת תל דן/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%A9%D7%9E%D7%95%D7%A8%D7%AA%20%D7%AA%D7%9C%20%D7%93%D7%9F&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=%D7%A9%D7%9E%D7%95%D7%A8%D7%AA%20%D7%AA%D7%9C%20%D7%93%D7%9F",
    about: [
      "אם יש מקום אחד בצפון שגורם לכם להרגיש כאילו נכנסתם לעולם אחר - זאת שמורת תל דן.",
      "כבר מהרגע שנכנסים לשמורה שומעים את זרימת המים מכל עבר. ככל שמתקדמים בשבילים, הנחל מלווה אתכם כמעט לכל אורך הדרך, העצים הגבוהים מספקים צל נעים גם בימים חמים, והאוויר מרגיש אחר - שקט, רגוע ומלא חיים.",
      "בשמורה יש שני מסלולים עיקריים - מסלול קצר ומונגש המתאים גם לעגלות ילדים, ומסלול מעט ארוך יותר שאינו מונגש, אך מתאים בהחלט למשפחות עם ילדים קטנים שאוהבים ללכת.",
      "בסיום המסלול מחכות בריכות שכשוך קטנות, מקום מושלם לעצור, לנוח וליהנות מהרגע.",
    ],
    personalStory: [
      "הגענו לשמורה אחרי יותר משעתיים נסיעה, ובכניסה עצרנו לפיקניק קטן באחד משולחנות העץ.",
      "דוד היה אז רק בן שנה וחצי.",
      "ככל שהתקדמנו במסלול, רעש המים רק הלך והתחזק. בכל פעם שעברנו ליד פלג קטן הוא נעצר, הסתכל והקשיב, כאילו גם הוא הרגיש שיש במקום הזה משהו מיוחד.",
      "כשהגענו לבריכות השכשוך היה חודש פברואר.",
      "המים היו קרים.",
      "אבל דווקא בגלל זה עודדתי אותו להוריד נעליים ולהכניס את הרגליים למים.",
      "לא רציתי שהוא יפחד מהטבע רק בגלל ש\"חורף\".",
      "רציתי שהוא ילמד להרגיש אותו.",
      "ותאמינו לי - ללמד ילדים מגיל קטן להתמודד עם חוסר נוחות, לא לפחד מקצת קור, להקשיב לגוף וללב שלהם ולא רק למה ש\"מקובל\" - אלו המתנות האמיתיות שאנחנו יכולים לתת להם.",
      "אז דווקא להכניס את הרגליים לנחל קר באמצע חודש פברואר, כשאתה בן שנה וחצי, אולי נשמע פחות הגיוני לאחרים. אבל אם זה מה שהלב שלך רוצה - פשוט תעשה את זה.",
      "לפעמים דווקא שם מתחיל החיבור האמיתי לטבע.",
      "הוא הסתכל עליי, חייך, ובלי לחשוב יותר מדי נכנס עם שתי הרגליים למים.",
      "עמדתי מהצד, הסתכלתי עליו ופשוט התמלאתי באושר.",
      "אני באמת מאמינה שלחיבור לטבע יש כוח לרפא, להרגיע ולחזק אותנו - ילדים ומבוגרים כאחד.",
      "לפעמים כל מה שצריך זה לעצור לרגע, להרגיש את המים, להקשיב לרעש הנחל ולתת לטבע לעשות את שלו.",
    ],
    cost: [
      {
        label: "כניסה",
        value: "₪31 למבוגר, ₪16 לילד (רשות הטבע והגנים, 2025)",
      },
      { label: "חניה", value: "יש חניה מסודרת" },
      {
        label: "משך בילוי",
        value: "כשעתיים (אפשר גם יותר אם עוצרים לפיקניק ולשכשוך)",
      },
    ],
    quickFacts: [
      { label: "עלות", value: "₪31 מבוגר / ₪16 ילד" },
      { label: "מתאים לילדים", value: "בהחלט" },
      { label: "נגיש לעגלות", value: "במסלול הקצר בלבד" },
      { label: "זמן ביקור", value: "כשעתיים" },
    ],
    gettingThere: {
      parking: "יש חניה מסודרת",
      walking:
        "יש שני מסלולים - מסלול קצר ומונגש ומסלול מעט ארוך יותר שאינו מונגש ומתאים למשפחות עם ילדים.",
      notes: [
        "כניסה בתשלום של רשות הטבע והגנים. מנויי מטמון נכנסים ללא תשלום.",
        "בחגים ובתקופות עמוסות מומלץ לבדוק באתר parks.org.il האם נדרשת הזמנה מראש.",
      ],
    },
    nearbyTripSlugs: [],
    faq: [
      {
        question: "האם מתאים לעגלות?",
        answer: "כן. המסלול הקצר בשמורה מונגש ומתאים לעגלות.",
      },
      {
        question: "האם אפשר להיכנס למים?",
        answer:
          "אפשר לשכשך את הרגליים ואף להיכנס לבריכות השכשוך שבסיום המסלול.",
      },
      {
        question: "כמה זמן לוקח המסלול?",
        answer: "כשעתיים בקצב משפחתי עם עצירות.",
      },
      {
        question: "האם יש צל?",
        answer: "כן. רוב המסלול מוצל בזכות עצי השמורה.",
      },
      {
        question: "האם צריך להזמין מקום מראש?",
        answer:
          "בחגים ובתקופות עמוסות מומלץ לבדוק באתר רשות הטבע והגנים האם נדרשת הזמנה מראש.",
      },
    ],
    tips: [
      "לא משנה באיזו עונה אתם מגיעים - תרגישו את המים על הגוף שלכם.",
      "גם בחורף.",
      "זה אולי נשמע קטן, אבל החיבור הזה לטבע, למים הקרים, לרעש הנחל ולרגע של שקט הוא בדיוק מה שנשאר איתנו הרבה אחרי שהטיול נגמר.",
      "תעודדו גם את הילדים להתנסות.",
      "לפעמים כל מה שהם צריכים זה מבוגר אחד שיגיד להם: \"בוא ננסה ביחד.\"",
    ],
    gallery: [
      {
        src: "/images/places/north/שמורת תל דן/IMG_2313%202%202.jpeg",
        label: "שמורת תל דן - תמונה 1",
      },
      {
        src: "/images/places/north/שמורת תל דן/IMG_2315%202.jpeg",
        label: "שמורת תל דן - תמונה 2",
      },
      {
        src: "/images/places/north/שמורת תל דן/IMG_2317.jpeg",
        label: "שמורת תל דן - תמונה 3",
      },
      {
        src: "/images/places/north/שמורת תל דן/IMG_2320%202%202.jpeg",
        label: "שמורת תל דן - תמונה 4",
      },
      {
        src: "/images/places/north/שמורת תל דן/IMG_2328.jpeg",
        label: "שמורת תל דן - תמונה 5",
      },
    ],
    gallerySubtitle: "",
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "ben-shemen-forest",
    title: "יער בן שמן",
    subtitle: "מסלולי שטח קלים בלב השפלה - הרפתקה משפחתית במרכז",
    region: "מרכז",
    category: "שטח 4x4",
    vehicleAccess: "soft-suv",
    matcher: {
      activities: ["easy-trails", "picnic", "viewpoint", "camping"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["shade-rich", "rain-sensitive"],
      travelTimeFrom: {
        modiin: "30m",
        ramla: "30m",
        lod: "30m",
        rishon: "1h",
        "tel-aviv": "1h",
        "petah-tikva": "1h",
      },
    },
    location: {
      lat: 31.929,
      lng: 34.939,
      label: "חניון יער בן שמן",
    },
    metaDescription:
      "יער בן שמן - מסלולי שטח קלים במרכז. מדריך עם טיפים, עלויות ומקומות נוספים באזור",
    heroImageLabel: "תמונת רקע - יער בן שמן",
    heroBackgroundImage: benShemenForestHeroBackground,
    about: [
      "יער בן שמן הוא יער אורנים גדול בשפלה, עם שבילי שטח קלים שמתאימים למשפחות ולמתחילים בנהיגת שטח.",
      "האזור מציע שילוב של יער מוצל, נקודות תצפית ודרכי עפר נוחות - מושלם ליום טיול קצר מהמרכז.",
      "[טקסט מקום - יוחלף בתוכן אמיתי]",
    ],
    personalStory: [
      "נסענו ב-4x4 לראשונה ביער בן שמן - מסלול קל, ילדים מתרגשים ואנחנו נהנים מהיער הירוק ממש ליד הבית.",
      "עצרנו לפיקניק בין האורנים, והבנו שאין צורך לנסוע רחוק כדי להרגיש בשטח.",
      "[סיפור אישי - יוחלף בתוכן אמיתי]",
    ],
    cost: [
      { label: "כניסה", value: "חינם", note: "[placeholder]" },
      { label: "חניה", value: "חינם", note: "[placeholder]" },
      { label: "משך טיול", value: "2–4 שעות", note: "[placeholder]" },
    ],
    tips: [
      "מתאים למתחילים - התחילו במסלול הקל ביותר",
      "בדקו מראש את מצב הדרך - אחרי גשם הדרכים עלולות להיות בוציות",
      "הביאו מים, פיקניק ורפטיה",
      "שמרו על מהירות נמוכה - היער פופולרי עם הולכי רגל",
      "אין לנהוג מחוץ לשבילים המסומנים",
    ],
    gallery: [
      { label: "שבילי שטח ביער", gradient: "from-zinc-400/40 to-amber-700/30" },
      { label: "יער אורנים", gradient: "from-green-400/40 to-zinc-700/30" },
      { label: "דרך עפר", gradient: "from-amber-400/40 to-stone-700/30" },
      { label: "נקודת תצפית", gradient: "from-orange-400/40 to-zinc-600/30" },
      { label: "פיקניק ביער", gradient: "from-lime-400/40 to-amber-700/30" },
      { label: "רכב בשטח", gradient: "from-zinc-500/40 to-stone-600/30" },
    ],
    gallerySubtitle: "תמונות מהמסלול - יוחלפו בתוכן אמיתי",
    nearbyPlaces: [
      {
        title: "שפך נחל שורק",
        description: "שמורת טבע עם תצפיות ונוף מרהיב",
        href: "/trips/nahal-sorek-estuary",
      },
      {
        title: "מודיעין",
        description: "עיר עם שבילי טבע ונקודות עצירה בקרבת היער",
        href: "#",
      },
      {
        title: "יער שוהם",
        description: "יער נוסף עם שבילי הליכה ושטח קל",
        href: "#",
      },
    ],
    nearbySubtitle: "המשיכו לגלות את המרכז",
  },
  {
    slug: "nahal-sorek-estuary",
    title: "שפך נחל שורק",
    subtitle: "שמורת טבע עם תצפיות, ציפורים ונוף ים ושמורה",
    region: "מרכז",
    category: "תצפיות ונוף",
    matcher: {
      activities: ["viewpoint", "easy-trails", "nature-shade", "picnic"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["shade-rich", "rain-sensitive"],
      travelTimeFrom: {
        rishon: "1h",
        holon: "1h",
        "bat-yam": "1h",
        ramla: "1h",
      },
    },
    location: {
      lat: 31.857,
      lng: 34.714,
      label: "חניון שפך נחל שורק",
    },
    metaDescription:
      "שפך נחל שורק - שמורת טבע עם תצפיות ונוף במרכז. מדריך מלא עם טיפים, עלויות ומקומות נוספים באזור",
    heroImageLabel: "תמונת רקע - שפך נחל שורק",
    heroBackgroundImage: nahalSorekEstuaryHeroBackground,
    about: [
      "שפך נחל שורק הוא שמורת טבע ייחודית במרכז, שבה נחל שורק פוגש את הים - עם שבילי תצפית, צמחייה מגוונת ועולם של ציפורים.",
      "המקום מתאים לטיול רגוע, צילום נוף ולמידה על אקוסיסטם של שפך - חוויה שונה מכל מסלול מים רגיל.",
      "[טקסט מקום - יוחלף בתוכן אמיתי]",
    ],
    personalStory: [
      "עמדנו על גשר התצפית וצפינו בציפורים שעפות מעל המים - הילדים היו מרותקים.",
      "הליכה שקטה, נשימה של אוויר ים ונחל יחד. מקום שלא שמענו עליו מספיק לפני שביקרנו.",
      "[סיפור אישי - יוחלף בתוכן אמיתי]",
    ],
    cost: [
      { label: "כניסה", value: "חינם", note: "[placeholder]" },
      { label: "חניה", value: "₪-", note: "[placeholder]" },
      { label: "משך טיול", value: "1.5–2.5 שעות", note: "[placeholder]" },
    ],
    tips: [
      "הביאו משקפת לצפייה בציפורים",
      "הגיעו בשעות הבוקר המוקדמות - שקט וציפורים פעילות",
      "נעלי הליכה נוחות - השבילים חוליים בחלקם",
      "שמרו על שקט - זו שמורת טבע",
      "בדקו שעות פתיחה ומצב הגשרים",
    ],
    gallery: [
      { label: "שפך הנחל", gradient: "from-sky-400/40 to-amber-600/30" },
      { label: "גשר תצפית", gradient: "from-blue-400/40 to-cyan-700/30" },
      { label: "ציפורים בשמורה", gradient: "from-teal-400/40 to-sky-600/30" },
      { label: "נוף ים ושמורה", gradient: "from-cyan-400/40 to-orange-600/30" },
      { label: "שביל בשמורה", gradient: "from-amber-400/40 to-blue-600/30" },
      { label: "שקיעה על השפך", gradient: "from-orange-400/40 to-sky-700/30" },
    ],
    gallerySubtitle: "תמונות מהמקום - יוחלפו בתוכן אמיתי",
    nearbyPlaces: [
      {
        title: "יער בן שמן",
        description: "מסלולי שטח קלים בלב השפלה",
        href: "/trips/ben-shemen-forest",
      },
      {
        title: "חוף פלמחים",
        description: "חוף ים עם דיונות ושמורת טבע",
        href: "#",
      },
      {
        title: "רחובות",
        description: "עיר עם שווקים, מוזיאונים ונקודות עצירה",
        href: "#",
      },
    ],
    nearbySubtitle: "המשיכו לגלות את המרכז",
  },
];

const VISITED_BY_MILANA_MATCHED = new Set<string>(visitedByMilanaMatchedSlugs);

function applyVisitedPlaceFlags(trip: Trip): Trip {
  if (trip.visitedByMilana || trip.status === "needs-content") {
    return trip;
  }

  if (!VISITED_BY_MILANA_MATCHED.has(trip.slug)) {
    return trip;
  }

  return { ...trip, visitedByMilana: true };
}

function sortTripsForRegion(a: Trip, b: Trip): number {
  const aNeeds = a.status === "needs-content" ? 1 : 0;
  const bNeeds = b.status === "needs-content" ? 1 : 0;
  if (aNeeds !== bNeeds) {
    return aNeeds - bNeeds;
  }

  return a.title.localeCompare(b.title, "he");
}

export function isPublishedTrip(trip: Trip): boolean {
  return trip.status !== "needs-content";
}

export function isSiteVisibleTrip(trip: Trip): boolean {
  return trip.excludedFromSite !== true;
}

export function getSiteVisibleTrips(): Trip[] {
  return trips.filter(isSiteVisibleTrip);
}

export const trips: Trip[] = [
  ...rawTrips.map(normalizeTripVehicleAccess),
  ...(visitedPlaceTrips as unknown as Trip[]),
]
  .map(applyVisitedPlaceFlags)
  .map(applyPlacesFilterSync);

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((trip) => trip.slug === slug);
}

export function getAllTripSlugs(): string[] {
  return getSiteVisibleTrips().map((trip) => trip.slug);
}

export function getPublicTripBySlug(slug: string): Trip | undefined {
  const trip = getTripBySlug(slug);
  if (!trip || !isSiteVisibleTrip(trip)) {
    return undefined;
  }
  return trip;
}

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find((region) => region.slug === slug);
}

export function getTripRegionTitle(trip: { region: string }): string {
  return getRegionBySlug(trip.region)?.title ?? trip.region;
}

export function getAllRegionSlugs(): string[] {
  return regions.map((region) => region.slug);
}

export function getTripsByRegionSlug(slug: string): Trip[] {
  if (!getRegionBySlug(slug)) return [];
  return trips
    .filter((trip) => isSiteVisibleTrip(trip) && getTripRegionSlug(trip) === slug)
    .sort(sortTripsForRegion);
}

export function getPublishedTripsByRegionSlug(slug: string): Trip[] {
  return getTripsByRegionSlug(slug).filter(isPublishedTrip);
}

export function getTripRegionSlug(trip: Trip): string | undefined {
  const syncedRegionSlug = placesFilterSyncBySlug[trip.slug]?.regionSlug;
  if (syncedRegionSlug) {
    return syncedRegionSlug;
  }

  const match = regions.find(
    (region) => trip.region === region.title || trip.region === region.slug,
  );
  return match?.slug;
}

export function getSiteVisibleTripsForMapFilter(filter: "all" | string): Trip[] {
  if (filter === "all") {
    return getSiteVisibleTrips().sort(sortTripsForRegion);
  }
  return getTripsByRegionSlug(filter);
}

/** @deprecated Prefer getSiteVisibleTripsForMapFilter - map uses Excel-visible trips */
export function getPublishedTripsForMapFilter(filter: "all" | string): Trip[] {
  return getSiteVisibleTripsForMapFilter(filter);
}

export function getMapRegionTripCounts(): Record<string, number> {
  return Object.fromEntries(
    regions.map((region) => [region.slug, getTripsByRegionSlug(region.slug).length]),
  );
}

export function getTripsByCategory(category: string): Trip[] {
  return trips.filter((trip) => isSiteVisibleTrip(trip) && trip.category === category);
}

export function getFeaturedTrips(): Trip[] {
  return trips.filter((trip) => trip.featured && isSiteVisibleTrip(trip));
}

export function getHomepageTrips(limit = 6): Trip[] {
  const featured = getFeaturedTrips();
  const featuredSlugs = new Set(featured.map((trip) => trip.slug));
  const remaining = trips.filter(
    (trip) => !featuredSlugs.has(trip.slug) && isSiteVisibleTrip(trip),
  );

  return [...featured, ...remaining].slice(0, limit);
}

export function getPublishedTrips(): Trip[] {
  return trips.filter((trip) => isSiteVisibleTrip(trip) && isPublishedTrip(trip));
}
