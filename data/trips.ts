import type { TripMatcherProfile } from "@/lib/find-my-trip/trip-profile";
import { applyPlacesFilterSync } from "@/lib/apply-places-filter-sync";
import { isHiddenFromPublic } from "@/lib/trip-site-visibility";
import { normalizeTripVehicleAccess } from "@/lib/trip-vehicle-access";
import { placesFilterSyncBySlug } from "./places-filter-sync";
import {
  tripOfficialGuideSlugs,
  tripOfficialUrlsBySlug,
} from "./trip-official-urls";
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
  routeLength?: string;
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
  /** Verified link to the place's page on the official managing body's site. */
  officialUrl?: string;
  /** "guide" when officialUrl is a broader official guide that covers this place or route. */
  officialLinkKind?: "site" | "guide";
  highlights?: string[];
  quickFacts?: TripQuickFact[];
  /** Short notice shown under the "במבט מהיר" visit details, e.g. a seasonal closure. */
  visitNote?: string;
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
      url("/images/regions/north/hero.jpeg")
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
  url("/images/places/center/יער בן שמן/hero.jpeg")
`;

const nahalSorekEstuaryHeroBackground = `
  linear-gradient(
    160deg,
    rgba(217, 119, 6, 0.7) 0%,
    rgba(14, 165, 233, 0.5) 40%,
    rgba(28, 25, 23, 0.7) 100%
  ),
  url("/images/places/center/שפך נחל שורק/hero.jpeg")
`;

const rawTrips: Trip[] = [
  {
    slug: "nahal-hashofet",
    title: "נחל השופט",
    subtitle:
      "מסלול קסום בלב רמות מנשה, עם נחל זורם, בריכות קטנות, עצים ענקיים, שביל נגיש לעגלות ואווירה שפשוט מרפאת את הלב.",
    region: "צפון",
    category: "טיול מים",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "nature-shade", "easy-trails", "picnic"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["water-friendly", "shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        "kfar-saba": "1h-plus",
        raanana: "1h-plus",
        "hod-hasharon": "1h-plus",
        herzliya: "1h-plus",
        netanya: "1h-plus",
        modiin: "1h",
        ramla: "1h",
        lod: "1h",
      },
    },
    location: {
      lat: 32.58165,
      lng: 35.58825,
      label: "חניון חרובים נחל השופט",
      wazeUrl:
        "https://waze.com/ul?q=%D7%97%D7%A0%D7%99%D7%94%20%D7%A0%D7%97%D7%9C%20%D7%94%D7%A9%D7%95%D7%A4%D7%98%20%D7%97%D7%A8%D7%95%D7%91%D7%99%D7%9D&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=32.58165%2C35.58825",
    },
    seoTitle:
      "נחל השופט - אחד המסלולים המשפחתיים היפים בישראל | בשביל הלב",
    metaDescription:
      "מסלול קסום בלב רמות מנשה, עם נחל זורם, בריכות קטנות, עצים ענקיים, שביל נגיש לעגלות ואווירה שפשוט מרפאת את הלב.",
    heroImage: "/images/places/north/נחל שופט/hero.jpeg",
    heroImageLabel: "תמונת רקע - נחל השופט",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/נחל שופט/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%97%D7%A0%D7%99%D7%94%20%D7%A0%D7%97%D7%9C%20%D7%94%D7%A9%D7%95%D7%A4%D7%98%20%D7%97%D7%A8%D7%95%D7%91%D7%99%D7%9D&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32.58165%2C35.58825",
    about: [
      "אם הייתי צריכה לבחור מסלול אחד שמתאים כמעט לכל משפחה בישראל - כנראה שזה היה נחל השופט.",
      "זה אחד המסלולים היפים, הנגישים והנעימים ביותר בארץ.",
      "המסלול עובר לאורך נחל זורם, גשרי עץ, בריכות קטנות, עצים עצומים ופינות מוצלות כמעט לכל אורכו. השביל המרכזי מונגש ומתאים גם לעגלות, מה שהופך אותו למקום נהדר לטיול עם ילדים בכל גיל.",
      "גם הדרך אל הנחל היא חלק מהחוויה.",
      "בכל פעם שאני נוסעת לשם אני מרגישה כאילו קפצתי לרגע להרים בשווייץ.",
      "ואם אתם אוהבים גם טיולי שטח - באזור שמסביב תמצאו דרכי 4x4 יפות שמשתלבות נהדר עם יום הטיול.",
    ],
    personalStory: [
      "בנחל השופט ביקרנו כבר כמה פעמים.",
      "ולא סתם.",
      "זה אחד המקומות שאני תמיד שמחה לחזור אליהם.",
      "ביקרתי שם עם הילדים כשהיו ממש תינוקות, עם המשפחה וגם עם חברים.",
      "כל פעם מחדש אני מגלה בו משהו אחר.",
      "אני אוהבת לראות את הילדים רצים בין העצים, עוצרים ליד פלגי המים, מטפסים על גזעי העצים הענקיים ופשוט חוקרים את הטבע בקצב שלהם.",
      "יש במקום גם מערה קטנה עם הסבר היסטורי על התקופה שבה עוברי אורח וסוחרים היו עוצרים שם עם הגמלים שלהם למנוחה.",
      "הילדים תמיד מתלהבים לגלות אותה מחדש.",
      "מה שאני הכי אוהבת במקום הזה הוא התחושה.",
      "אין לחץ.",
      "לא צריך להספיק.",
      "פשוט הולכים.",
      "מקשיבים לרעש המים.",
      "נושמים.",
      "ונותנים לטבע לעשות את שלו.",
      "בכל פעם שאני רואה את הילדים מרגישים בטוחים, עצמאיים וסקרנים בתוך הטבע, אני מבינה שוב כמה המקומות האלה חשובים עבורם.",
      "נחל השופט תמיד מזכיר לי שלא צריך אטרקציות גדולות כדי ליצור זיכרונות גדולים.",
      "לפעמים כל מה שילדים צריכים הוא מים זורמים, כמה עצים גדולים והמון חופש לחקור את העולם.",
    ],
    cost: [
      { label: "כניסה", value: "חינם" },
      { label: "חניה", value: "חניון חרובים מוסדר" },
      { label: "משך בילוי", value: "2-3 שעות" },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "כן, בכל גיל" },
      { label: "נגיש לעגלות", value: "כן, במסלול המונגש" },
      { label: "זמן ביקור", value: "2-3 שעות" },
    ],
    gettingThere: {
      parking: "חניון חרובים סמוך לנחל, עם חניה מוסדרת ומקומות נגישים.",
      notes: [
        "כמות המים משתנה לאורך השנה.",
        "הקיוסק לא תמיד פעיל.",
      ],
    },
    faq: [
      {
        question: "האם מתאים לעגלות?",
        answer:
          "כן. המסלול המרכזי הוא שביל מעגלי מונגש, המתאים לעגלות ילדים ולכיסאות גלגלים.",
      },
      {
        question: "כמה עולה כניסה?",
        answer: "הכניסה חינמית, ללא תשלום.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. חניון חרובים סמוך לנחל, עם חניה מוסדרת ומקומות נגישים.",
      },
      {
        question: "כמה זמן לוקח המסלול?",
        answer:
          "2-3 שעות בקצב רגוע, כולל עצירות. המסלול המונגש לוקח כשעה עד שעה וחצי.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "בחורף ובאביב הזרימה בדרך כלל מרשימה יותר. גם סתיו נעים לטיול.",
      },
      {
        question: "האם יש הגבלת שעות?",
        answer:
          "האתר פתוח ללא הגבלת שעות. מומלץ לטייל בשעות האור.",
      },
    ],
    tips: [
      "מקום נהדר לפיקניק.",
      "עצרו לקרוא את שלטי הטבע.",
      "אם יש לכם 4X4 - טיילו באזור.",
      "תהנו מהנוף שמרגיש כמו שווייץ.",
    ],
    highlights: [
      "משפחות עם ילדים",
      "תינוקות",
      "אוהבי מים",
      "פיקניק",
      "טיול קל",
      "עגלות",
    ],
    gallery: [
      { src: "/images/places/north/נחל שופט/IMG_3836.jpeg" },
      { src: "/images/places/north/נחל שופט/IMG_3871 3.jpeg" },
      { src: "/images/places/north/נחל שופט/IMG_8734.jpeg" },
      { src: "/images/places/north/נחל שופט/IMG_8748.jpeg" },
      { src: "/images/places/north/נחל שופט/IMG_8762 2.jpeg" },
      { src: "/images/places/north/נחל שופט/IMG_8764.jpeg" },
      { src: "/images/places/north/נחל שופט/IMG_9108.jpeg" },
    ],
    gallerySubtitle: "",
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "sataf",
    title: "הסטף",
    subtitle:
      "טרסות עתיקות, מעיינות ויער ירוק בהרי ירושלים - טיול משפחתי עם נוף, היסטוריה ומסלולים לכל גיל.",
    region: "ירושלים",
    category: "מעיינות",
    visitedByMilana: true,
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
      lat: 31.7683,
      lng: 35.1139,
      label: "סטף - החניה העליונה",
      wazeUrl:
        "https://waze.com/ul?q=%D7%A1%D7%98%D7%A3%20-%20%D7%94%D7%97%D7%A0%D7%99%D7%94%20%D7%94%D7%A2%D7%9C%D7%99%D7%95%D7%A0%D7%94&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=31.7683%2C35.1139",
    },
    seoTitle: "הסטף - טרסות, מעיינות וטיול משפחתי בהרי ירושלים | בשביל הלב",
    metaDescription:
      "יער סטף בהרי ירושלים משלב טרסות חקלאיות עתיקות, מעיינות, שבילי הליכה מוצלים ומרכז מבקרים חדש. כל המידע לביקור משפחתי.",
    heroImage: "/images/places/jerusalem/הסטף/hero.jpeg",
    heroImageLabel: "תמונת רקע - הסטף",
    heroBackgroundImage: satafHeroBackground,
    wazeUrl:
      "https://waze.com/ul?q=%D7%A1%D7%98%D7%A3%20-%20%D7%94%D7%97%D7%A0%D7%99%D7%94%20%D7%94%D7%A2%D7%9C%D7%99%D7%95%D7%A0%D7%94&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=31.7683%2C35.1139",
    highlights: [
      "משפחות עם ילדים",
      "אוהבי היסטוריה",
      "מעיינות",
      "פיקניק",
      "טיול קל",
      "פריחת שקד",
    ],
    about: [
      "יער סטף הוא אחד האתרים היפים בהרי ירושלים - שילוב של מעיינות טבעיים, טרסות חקלאיות עתיקות ושבילי הליכה מוצלים בין עצי זית, שקד ואלון.",
      "האתר מנוהל על ידי קק\"ל ומשמר את הנוף ההררי-חקלאי המסורתי של האזור. לאורך השנה אפשר לראות כאן גידולים מקומיים, בוסתנים וטרסות משוקמות שמספרות על חקלאות עתיקה.",
      "בלב האתר שני מעיינות נקבה - עין סטף ועין ביכורה - ובמסלולים שונים עוברים בין תצפיות, גשרונים ופינות ירוקות. לפי קק\"ל, יש מסלולים בדרגות קושי שונות, חלקם מתאימים במיוחד למשפחות.",
      "בשנים האחרונים נפתח במקום מוקד מבקרים חדש עם מידע, תצפית, כיתת לימוד חיצונית ובייקרי. שעות הפעילות והשירותים במוקד משתנים - מומלץ לבדוק באתר קק\"ל לפני ההגעה.",
    ],
    personalStory: [
      "ביקרנו בהסטף ביום אביבי נעים, כשהכל ירוק ופרח. הלכנו בשביל שעובר בין הטרסות ולמדנו על חקלאות עתיקה - חוויה שמשלבת טבע והיסטוריה.",
      "עצרנו ליד אחד המעיינות, שתינו מים קרירים ופשוט נהנינו מהשקט. זה מקום שמאלץ אותך להאט ולהתבונן.",
      "הטרסות העתיקות, עצי הזית והשקד - כל פינה מספרת סיפור אחר על חקלאות הרים.",
    ],
    cost: [
      { label: "כניסה", value: "חינם" },
      {
        label: "חניה",
        value: "חניה באתר. מומלץ לבדוק מראש באתר קק\"ל.",
      },
      {
        label: "משך בילוי",
        value: "כמה שעות - לפי המסלול שבוחרים",
      },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "כן" },
      { label: "נגיש לעגלות", value: "חלק מהמסלולים" },
      { label: "זמן בילוי", value: "כמה שעות" },
    ],
    gettingThere: {
      parking: "יש חניה עליונה ותחתונה באתר. לפי קק\"ל, הניווט המומלץ הוא \"סטף - החניה העליונה\".",
      notes: [
        "לפי קק\"ל, הכניסה לאתר ללא תשלום.",
        "שעות מוקד המבקרים והבייקרי משתנות - מומלץ לבדוק באתר kkl.org.il לפני יציאה.",
        "חלק מהמסלולים חשופים לשמש. בקיץ כדאי להגיע בשעות הבוקר המוקדמות או אחר הצהריים.",
        "יש לשמור על הטרסות ולא להיכנס לשטחי חקלאות פעילים.",
        "מומלץ נעלי הליכה נוחות. חלק מהשבילים סלעיים.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer:
          "כן. יש מסלולים קלים המתאימים למשפחות, עם טרסות, מעיינות ונקודות עצירה לאורך הדרך.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer:
          "חלקית. מוקד המבקרים נגיש, אך לא כל המסלולים בשטח מתאימים לעגלת תינוק. מומלץ לבדוק מראש איזה מסלול מתאים.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש חניה עליונה ותחתונה באתר.",
      },
      {
        question: "כמה עולה כניסה?",
        answer: "לפי קק\"ל, הכניסה לאתר ללא תשלום.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "בחורף ובאביב המקום ירוק במיוחד, ובפברואר מפריחות השקדיות. בקיץ מומלץ להימנע משעות החום.",
      },
      {
        question: "האם אפשר להיכנס למעיינות?",
        answer:
          "יש מעיינות נקבה באתר. כדאי לבדוק בשטח את הסימון והכללים, ולהימנע מכניסה למקומות שאינם מיועדים לכך.",
      },
    ],
    tips: [
      "בחרו מסלול מתאים לגיל הילדים - יש מסלולים קלים וארוכים יותר.",
      "הביאו נעלי הליכה נוחות. חלק מהשבילים סלעיים.",
      "בקיץ הגיעו מוקדם או אחר הצהריים, כשיש פחות חום.",
      "עצרו במוקד המבקרים לקבלת מידע ומפת מסלולים.",
      "שמרו על הטרסות - אל תיכנסו לשטחי חקלאות.",
      "בדקו באתר קק\"ל לגבי שעות פתיחה ואירועים מיוחדים.",
    ],
    closingNote:
      "בואו נשמור על הטרסות והמעיינות נקיים. קחו איתכם את האשפה ותנו לילדים ליהנות מהטבע בכבוד.",
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
    subtitle:
      "נחל מים ומפלים בלב מדבר יהודה - טיול רטוב, מוצל ומתאים למשפחות גם בימים חמים.",
    region: "דרום",
    category: "טיול מים",
    visitedByMilana: true,
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
      lat: 31.1986,
      lng: 35.3628,
      label: "חניון נחל בוקק - עין בוקק",
      wazeUrl:
        "https://waze.com/ul?q=%D7%97%D7%A0%D7%99%D7%95%D7%9F%20%D7%A0%D7%97%D7%9C%20%D7%91%D7%95%D7%A7%D7%A7&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=31.1986%2C35.3628",
    },
    seoTitle: "עין בוקק - נחל מים ומפלים במדבר יהודה | בשביל הלב",
    metaDescription:
      "נחל בוקק בעין בוקק הוא מסלול מים מוצל במדבר יהודה, עם בריכות שכשוך ומפלים. כל המידע לטיול משפחתי באזור ים המלח.",
    heroImage: "/images/places/south/עין בוקק/hero.jpeg",
    heroImageLabel: "תמונת רקע - עין בוקק",
    heroBackgroundImage: einBokekHeroBackground,
    wazeUrl:
      "https://waze.com/ul?q=%D7%97%D7%A0%D7%99%D7%95%D7%9F%20%D7%A0%D7%97%D7%9C%20%D7%91%D7%95%D7%A7%D7%A7&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=31.1986%2C35.3628",
    highlights: [
      "משפחות עם ילדים",
      "אוהבי מים",
      "טיול קיץ",
      "מדבר יהודה",
      "פיקניק",
      "ים המלח",
    ],
    about: [
      "נחל בוקק הוא אחד הנחלים הקצרים במדבר יהודה, אך הוא יוצר קניון עמוק עם מפלים, בריכות וצמחייה ירוקה לאורך המים.",
      "המסלול בעין בוקק משלב הליכה נוחה ומסודרת בנוף מדברי עם מפגשים מרעננים עם המים, בריכות שכשוך ומפלים. השילוב בין הדרך המדברית, החום והעצירות במים הופך אותו למסלול טבע משפחתי עם תחושת הישג אמיתית.",
      "הגישה למסלול מתבצעת מחניון מוסדר ליד מתחם עין בוקק. ניתן לחנות ללא תשלום בתחילת המסלול. חשוב לבדוק לפני ההגעה באתר parks.org.il את מצב המסלול, שעות הפעילות והנחיות הבטיחות - הן משתנות לפי העונה ותנאי השטח.",
    ],
    personalStory: [
      "וואו, זה מסוג הטיולים האלה שאתה מרגיש שהשקעת, שהתאמצת והגעת לנחלה.",
      "כן, זה דורש הליכה מאוד נוחה ומסודרת. כן, זה מגביר קצת את דפיקות הלב. כן, הולכים בחום, עוצרים וממשיכים באזור מדברי. אבל זה כל כך מדויק - מסלול קטן עם ערך גדול. זאת טעימה ממסלולי טיול גדולים, בצורה שכל כך מדויקת למשפחות עם ילדים.",
      "השילוב בין המאמץ, ההליכה, החום והזיעה לבין הטעימות ממסלולי המים, הטבילות באמצע, עצירות ההתרעננות והנוף עוצר הנשימה מסביב - פשוט מושלם.",
      "בסוף מגיעים לאזור עם מים שניתן לטבול בו. זה כל כך שווה את המאמץ, ומבחינתי זה טיול טבע אמיתי שמדויק ברמה מופתית מבחינת הדרך, המרחק והאופי שלו למשפחות עם ילדים.",
      "נהנינו כל כך. חזרנו מסופקים, עם תחושת אליפות והערכה עצמית, שבעים מהנוף ומהחוויה העוצמתית. בדרך חיזקנו אחד את השני שאנחנו יכולים, התלהבנו מפלגי המים, התרעננו - פשוט חלום קסום.",
    ],
    cost: [
      { label: "כניסה", value: "חינם" },
      {
        label: "חניה",
        value: "חניה מוסדרת ללא תשלום בתחילת המסלול (לפי parks.org.il)",
      },
      {
        label: "משך בילוי",
        value: "כמה שעות - לפי קצב המשפחה",
      },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "כן" },
      { label: "נגיש לעגלות", value: "לא" },
      { label: "זמן בילוי", value: "כמה שעות" },
    ],
    gettingThere: {
      parking:
        "חניון מוסדר ליד מתחם עין בוקק, בכניסה מכביש הגישה של תחנת הדלק סמוך למלונות.",
      notes: [
        "הכניסה והחניה ללא תשלום.",
        "מומלץ להגיע עם נעלי הליכה המתאימות למים.",
        "הביאו את כל מה שנדרש לשהייה במקום חם ושמשי - כובע, מים וקרם הגנה למי שמשתמש.",
        "בדקו באתר רשות הטבע והגנים לפני היציאה את מצב המסלול ואת ההנחיות העדכניות.",
        "בסופי שבוע ובחגים המקום מלא באנשים, וזה מורגש היטב במסלול. אותנו באופן אישי זה לא מרתיע - עם ישראל חי! אבל כדאי לקחת זאת בחשבון.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer:
          "כן. המסלול הקצר בעין בוקק מיועד למשפחות, עם בריכות רדודות יחסית בחלק מהאזורים.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer: "לא. המסלול עובר בערוץ הנחל ובמים.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש חניה מוסדרת ללא תשלום בתחילת המסלול.",
      },
      {
        question: "כמה עולה כניסה?",
        answer: "לפי parks.org.il, הכניסה ללא תשלום.",
      },
      {
        question: "מה כדאי להביא?",
        answer:
          "נעלי מים, מגבות, מים לשתייה, כובע וקרם הגנה. בגדי החלפה לילדים מומלצים.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "המסלול פופולרי בקיץ בזכות הצל והמים. מומלץ להגיע מוקדם בבוקר בסופי שבוע.",
      },
    ],
    tips: [
      "הגיעו מוקדם - המקום פופולרי מאוד בסופי שבוע.",
      "אל תעמיסו על עצמכם ציוד למסלול. תיק קטן עם מים ונשנושים לגמרי סוגר פינה.",
      "המסלול דורש הליכה. העריכו מראש את יכולת ההליכה של הילדים, במיוחד אם הם עדיין לא מתורגלים בהליכה ממושכת.",
      "זה המקום המושלם למסלול טבע אמיתי בקצב וברמה שמתאימים למשפחות עם ילדים - מומלץ בחום!",
      "קחו בחשבון שזה אזור חם, בעיקר בחודשי הקיץ.",
    ],
    closingNote:
      "בואו נשמור על הנחל והטבע סביבו. מים במדבר הם מקור חיים - כדאי לטייל בכבוד ובזהירות.",
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
    subtitle:
      "אגם, דשא ופעילויות משפחתיות בלב השפלה - יום כיף קרוב לבית עם נוף פתוח.",
    region: "דרום",
    category: "טיול מים",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "picnic", "easy-trails"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
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
      label: "פארק אגם ניצנים",
      wazeUrl:
        "https://waze.com/ul?q=%D7%90%D7%92%D7%9D%20%D7%A0%D7%99%D7%A6%D7%A0%D7%99%D7%9D&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=31.749%2C34.622",
    },
    seoTitle: "אגם ניצנים - יום משפחתי באגם ובטבע | בשביל הלב",
    metaDescription:
      "פארק אגם ניצנים בדרום מציע אגם, דשא, פינות ישיבה ופעילויות משפחתיות. כל המידע לביקור - כולל מה כדאי לבדוק מראש.",
    heroImage: "/images/places/south/אגם ניצנים/hero.jpeg",
    heroImageLabel: "תמונת רקע - אגם ניצנים",
    heroBackgroundImage: nitzanimLakeHeroBackground,
    wazeUrl:
      "https://waze.com/ul?q=%D7%90%D7%92%D7%9D%20%D7%A0%D7%99%D7%A6%D7%A0%D7%99%D7%9D&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=31.749%2C34.622",
    highlights: [
      "משפחות עם ילדים",
      "יום כיף קרוב לבית",
      "פיקניק",
      "שקיעה",
      "פעילויות מים",
      "בילוי בסופ\"ש",
    ],
    about: [
      "פארק אגם ניצנים הוא מתחם פרטי באזור ניצנים, עם דשא, פינות ישיבה ופעילויות לכל המשפחה.",
      "המקום מתאים למי שמחפש יום רגוע בטבע - שייט, פיקניק, ישיבה מול המים או פשוט שעות של משחקים על הדשא.",
      "שימו לב - ניתן להגיע גם לאזורים נוספים באגם בתנאי שיש לכם רכב 4x4.",
    ],
    personalStory: [
      "האמת היא שזה מקום שאני חוזרת אליו לעיתים קרובות. היינו פה אינספור פעמים - גם באזור המוכרז, המושלם יש לומר, וגם באזורים מסביב שההגעה אליהם דורשת רכב 4x4.",
      "אגם מתוק וכיפי, והאזור המוכרז פשוט חלומי. אגלה לכם בגילוי נאות - חלום להתחתן שם! זה מתחם מדהים שיש בו הכול מהכול - מדשאות ואזורי ישיבה, קיאקים, בר, מוזיקה, אוכל ונדנדות. פשוט מקום חלומי!",
      "אני ממליצה מאוד מאוד לשכור קיאק ולצאת לשייט באגם, להגיע וליהנות מהאטרקציות שהמקום מציע ופשוט לרבוץ שם שעות. זה אחד המקומות האהובים עליי!",
      "אני כל כך מעריכה את בעל המקום שהקים מקום כזה מגניב, נגיש וכיפי. באמת חלום. החוויה שלנו שם קסומה בכל פעם מחדש - הילדים מגיעים ומתפזרים להם במרחב, במים, במדשאות ובין האטרקציות השונות.",
    ],
    cost: [
      {
        label: "כניסה",
        value: "ללא תשלום",
        note: "פעילויות אופציונליות כמו שכירת קיאק, אטרקציות מיוחדות או אירועים עשויות להיות בתשלום.",
      },
      {
        label: "חניה",
        value: "חניה במתחם. מומלץ לבדוק מראש באתר הרשמי.",
      },
      {
        label: "משך בילוי",
        value: "חצי יום ויותר - לפי הקצב",
      },
    ],
    quickFacts: [
      { label: "עלות", value: "ללא תשלום" },
      { label: "מתאים לילדים", value: "כן" },
      { label: "נגיש לעגלות", value: "חלקית - לפי שטח המתחם" },
      { label: "זמן בילוי", value: "חצי יום" },
    ],
    gettingThere: {
      parking: "יש חניה במתחם הפארק.",
      notes: [
        "מומלץ לבדוק באתר agam-nitzanim.co.il את שעות הפתיחה העדכניות.",
        "פעילויות כמו שייט ואירועים מיוחדים עשויים לדרוש תיאום או תשלום נוסף.",
        "הביאו כובע, מים, מגבות וקרם הגנה - חלק מהשטח חשוף לשמש.",
        "ניתן להביא אוכל ונשנושים, ויש במקום גם מסעדה, מזנון ובר עם הדברים האהובים.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer:
          "כן. הפארק מציע חוויה משפחתית עם אגם, דשא ופעילויות המתאימות לילדים.",
      },
      {
        question: "האם זה אותו מקום כמו שמורת חולות ניצנים?",
        answer:
          "לא. אגם ניצנים הוא מתחם פרטי. שמורת חולות ניצנים של רשות הטבע והגנים היא אתר טבע נפרד באזור.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש חניה במתחם.",
      },
      {
        question: "כמה עולה כניסה?",
        answer:
          "הכניסה ללא תשלום. פעילויות אופציונליות כמו שכירת קיאק או אירועים מיוחדים עשויים להיות בתשלום - מומלץ לבדוק באתר agam-nitzanim.co.il.",
      },
      {
        question: "האם אפשר לשייט באגם?",
        answer:
          "לפי האתר הרשמי, מוצעות פעילויות שייט. זמינות ומחיר - כדאי לבדוק מראש.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "בשעות הבוקר המוקדמות או לקראת שקיעה, כשפחות חם. שעות הפתיחה משתנות - בדקו באתר.",
      },
    ],
    tips: [
      "יש במקום מקומות ישיבה לשימוש חופשי - כיסאות, שולחנות ומקומות ישיבה על הבר.",
      "אפשר להביא גם מחצלת ופשוט להיזרק.",
      "באזור המוכרז המים רדודים ומתאימים לילדים קטנים.",
      "האזור המוכרז לרחצה קטן יחסית.",
      "ניתן להגיע לאזורים אחרים באגם עם רכב 4x4. קחו בחשבון שאין בהם שירותי הצלה או שירותים נוספים.",
      "יש באגם דגיגונים.",
    ],
    closingNote:
      "בואו נשמור על האגם והסביבה נקיים. יום משפחתי טוב מתחיל בכבוד לטבע ולמבקרים האחרים.",
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
    seoTitle: "עין מודע - מעיין מומלץ למשפחות בצפון | שביל הלב",
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
      "אם אתם מחפשים מקום שבו הילדים יכולים לקפוץ למים, לשחק בבטחה ואתם יכולים לשבת בצל עם קפה ופיקניק - עין מודע הוא אחד המקומות היפים והנעימים בצפון.",
      "המים צלולים, הטמפרטורה נעימה כמעט בכל עונות השנה, והאווירה כולה מרגישה כמו חופשה קטנה באמצע הטבע.",
      "עין מודע נמצא בלב עמק המעיינות ונחשב לאחד המעיינות האהובים באזור.",
      "מדובר בבריכת מים גדולה ומסודרת המוזנת ממי מעיין טבעיים. סביב הבריכה תמצאו עצים גבוהים, אזורי ישיבה מוצלים ומרחבים פתוחים שמאפשרים להעביר כאן כמה שעות טובות בכיף.",
      "המים משלבים אזורים רדודים לצד אזורים עמוקים יותר, כך שגם ילדים וגם מבוגרים יכולים ליהנות מהמקום.",
    ],
    personalStory: [
      "הגענו לעין מודע ביום חם, בדיוק מהימים האלה שבהם כולם רק מחפשים מים.",
      "כבר בדרך למעיין הילדים התחילו לרוץ קדימה בהתרגשות, וכשהגענו לבריכה הם לא חיכו אפילו דקה לפני שנכנסו למים.",
      "יש משהו מרגיע במקום הזה. המים הצלולים, העצים מסביב והשקט של העמק יוצרים תחושה של חופש אמיתי.",
      "אני אוהבת במיוחד מקומות שמאפשרים לילדים להרגיש עצמאיים, לשחק, לחקור ולהתנסות - ועין מודע בהחלט נותן את התחושה הזאת.",
      "לפעמים כל מה שצריך זה יום פשוט בטבע כדי לזכור כמה אושר אפשר למצוא בדברים הקטנים.",
    ],
    cost: [
      { label: "כניסה", value: "חינם" },
      { label: "חניה", value: "חניה בחוץ + הליכה קצרה" },
      { label: "משך בילוי", value: "כמה שעות, לפי הקצב" },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "כן, במיוחד" },
      { label: "מים כל השנה", value: "כן, נעים בכל עונה" },
      { label: "נגיש לעגלות", value: "כן" },
      { label: "זמן ביקור", value: "כמה שעות, לפי הקצב" },
    ],
    gettingThere: {
      parking: "חניה בחוץ + הליכה קצרה",
      walking: "המסלול מהחניה למעיין נוח, גם למשפחות עם עגלת תינוק.",
      notes: [
        "בסופי שבוע ובחגים מומלץ להגיע מוקדם.",
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
          "כן. סביב הבריכה יש עצים גבוהים ואזורי ישיבה מוצלים - אחד היתרונות הגדולים של המקום.",
      },
      {
        question: "אפשר לעשות מנגל?",
        answer:
          "לא מומלץ לעשות מנגל ליד הבריכה עצמה. אפשר להביא פיקניק, מחצלת ואוכל, אבל כדאי לשמור על ניקיון המקום.",
      },
      {
        question: "כמה זמן כדאי לתכנן?",
        answer:
          "תלוי בקצב ובמזג האוויר. רוב המשפחות מבלות כאן כמה שעות נעימות, עם הליכה קצרה מהחניה.",
      },
    ],
    tips: [
      "אם אפשר - הגיעו באמצע השבוע.",
      "הביאו מחצלת או שמיכה לפיקניק.",
      "נעלי מים מומלצות לילדים.",
      "שלבו את הביקור עם מעיינות נוספים באזור.",
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
        "https://www.google.com/maps/search/?api=1&query=33.248611%2C35.651944",
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
      "https://www.google.com/maps/search/?api=1&query=33.248611%2C35.651944",
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
      notes: [
        "מומלץ להתעדכן באתר הרשמי בשעות הפעילות.",
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
      "לא משנה באיזו עונה תגיעו - אל תוותרו על מגע במים.",
      "אם אפשר - עשו את המסלול הארוך. גם עם תינוק במנשא.",
      "למשפחות עם עגלות - המסלול הקצר נגיש ומתאים מאוד.",
    ],
    highlights: [
      "משפחות עם ילדים",
      "תינוקות",
      "אוהבי מים",
      "טיול קל",
      "פיקניק",
      "עגלות",
    ],
    gallery: [
      {
        src: "/images/places/north/שמורת תל דן/IMG_2313 2 2.jpeg",
        label: "שמורת תל דן - תמונה 1",
      },
      {
        src: "/images/places/north/שמורת תל דן/IMG_2315 2.jpeg",
        label: "שמורת תל דן - תמונה 2",
      },
      {
        src: "/images/places/north/שמורת תל דן/IMG_2317.jpeg",
        label: "שמורת תל דן - תמונה 3",
      },
      {
        src: "/images/places/north/שמורת תל דן/IMG_2320 2 2.jpeg",
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
    slug: "brykt-rm-msdh",
    title: "בריכת רם",
    subtitle:
      "אגם טבעי בגובה של כ-1,000 מטר מעל פני הים, מוקף בנופי הגולן והחרמון. מקום מושלם לעצירה רגועה, במיוחד בשעת השקיעה.",
    region: "צפון",
    category: "תצפיות ונוף",
    visitedByMilana: true,
    matcher: {
      activities: ["viewpoint", "easy-trails", "picnic"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["shade-rich", "heat-tolerant"],
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
      lat: 33.232528,
      lng: 35.766333,
      label: "בריכת רם",
      wazeUrl:
        "https://waze.com/ul?ll=33.232528,35.766333&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=33.232528%2C35.766333",
    },
    seoTitle: "בריכת רם - אגם קסום ברמת הגולן | בשביל הלב",
    metaDescription:
      "בריכת רם היא אגם טבעי יפהפה ברמת הגולן, בגובה של כ-1,000 מטר מעל פני הים. מקום מושלם לעצירה רגועה, עם נוף מרהיב ואווירה מיוחדת, במיוחד בשעת השקיעה.",
    heroImage: "/images/places/north/בריכת רם - מסעדה/hero.jpeg",
    heroImageLabel: "תמונת רקע - בריכת רם",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/בריכת רם - מסעדה/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?ll=33.232528,35.766333&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=33.232528%2C35.766333",
    about: [
      "יש מקומות שלא מגיעים אליהם בשביל אטרקציה, אלא בשביל התחושה.",
      "בריכת רם היא בדיוק מקום כזה.",
      "האגם השקט, אוויר ההרים הצלול והנוף הפתוח יוצרים אווירה שקשה למצוא במקומות אחרים בארץ. מסביב תמצאו טיילת קצרה, נקודות תצפית יפות ואפשרות פשוט לעצור, לשבת ולהסתכל על המים.",
      "אם אתם מטיילים באזור החרמון, מסעדה, מג'דל שמס או צפון רמת הגולן - זאת עצירה שאני בהחלט ממליצה לשלב בדרך.",
    ],
    personalStory: [
      "הגענו לבריכת רם לקראת ערב, אחרי כמה ימים של טיולים באזור החרמון, בזמן שהתארחנו ביישוב מסעדה.",
      "לא הייתה לנו תוכנית מיוחדת.",
      "רק רצינו לצאת, לנשום אוויר וליהנות מהשקט.",
      "דוד היה אז בן שנה וחצי.",
      "עמדנו יחד על שפת האגם, אספנו אבנים קטנות וניסינו להקפיץ אותן על המים.",
      "כמובן שבגיל שנה וחצי הוא בעיקר זרק אותן ישר פנימה, אבל מבחינתו זאת הייתה הצלחה גדולה.",
      "בשבילי זה היה רגע מצחיק ומרגש.",
      "בשביל שנינו זאת הייתה עוד תזכורת לכך שלא צריך הרבה כדי להיות מאושרים - קצת טבע, אגם יפה, כמה אבנים קטנות והרבה זמן ביחד.",
      "בזמן שישבנו שם ראינו משפחות דרוזיות מהאזור מטיילות עם הילדים שלהן לאורך שפת האגם.",
      "בכל פעם שאני מטיילת באזור הזה אני מרגישה את הכנסת האורחים והאווירה המיוחדת של הכפרים הדרוזיים.",
      "יש משהו מאוד נעים בידיעה שגם המקומיים בוחרים לבלות בדיוק באותם מקומות בטבע.",
      "לא משנה מאיפה באנו, באיזו שפה אנחנו מדברים או איך אנחנו חיים - כשאנחנו נמצאים בטבע עם הילדים שלנו, צוחקים, זורקים אבנים למים ופשוט נהנים מהרגע, כולנו אותו הדבר.",
      "יש משהו מאוד מרגיע, מאחד ופותח את הלב ברגעים האלה.",
    ],
    cost: [
      { label: "כניסה", value: "ללא תשלום" },
      {
        label: "חניה",
        value: "יש מספר אזורי חניה סמוך לאגם. ההליכה מהחניה קצרה מאוד.",
      },
      { label: "משך בילוי", value: "כשעה" },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "בהחלט" },
      { label: "נגיש לעגלות", value: "כן, באזור הטיילת" },
      { label: "זמן ביקור", value: "כשעה" },
    ],
    gettingThere: {
      parking: "יש מספר אזורי חניה סמוך לאגם. ההליכה מהחניה קצרה מאוד.",
      walking: "ההליכה מהחניה קצרה מאוד.",
      notes: ["האגם אינו מיועד לרחצה."],
    },
    nearbyTripSlugs: [],
    faq: [
      {
        question: "האם אפשר להיכנס למים?",
        answer: "לא. בריכת רם אינה מיועדת לרחצה.",
      },
      {
        question: "האם המקום מתאים לילדים?",
        answer:
          "כן. זה מקום נהדר לעצירה קצרה עם ילדים ולבילוי רגוע ליד האגם.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש מספר אזורי חניה סמוך לאגם.",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer: "כשעה, או יותר אם תרצו לשבת מול הנוף ולהירגע.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer: "בשעות אחר הצהריים המאוחרות או לקראת השקיעה.",
      },
    ],
    tips: [
      "אם יש לכם אפשרות - תגיעו כשעה לפני השקיעה.",
      "האור שמתחיל לרדת על המים, האוויר הקריר של ההרים והשקט מסביב יוצרים אווירה מיוחדת שקשה להעביר בתמונות.",
      "לפעמים לא צריך לעשות הרבה.",
      "פשוט לשבת, לנשום ולהיות.",
      "ואם יש לכם ילדים - תנו להם פשוט להיות ילדים.",
      "לפעמים אבן אחת קטנה ומים שקטים שווים יותר מכל אטרקציה.",
    ],
    highlights: [
      "משפחות עם ילדים",
      "עצירה בדרך",
      "אוהבי נוף",
      "שקיעה",
      "פיקניק",
      "טיול קל",
    ],
    gallery: [
      {
        src: "/images/places/north/בריכת רם - מסעדה/IMG_2379.jpeg",
        label: "בריכת רם - תמונה 1",
      },
      {
        src: "/images/places/north/בריכת רם - מסעדה/IMG_2383 2.jpeg",
        label: "בריכת רם - תמונה 2",
      },
    ],
    gallerySubtitle: "",
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "chrmvn",
    title: "חרמון",
    subtitle:
      "אתר החרמון הוא המקום היחיד בישראל שבו אפשר ליהנות משלג אמיתי, נוף עוצר נשימה ורכבל המטפס אל פסגת ההר. חוויה מיוחדת לכל המשפחה - עם כמה טיפים חשובים למי שמגיע עם פעוטות.",
    region: "צפון",
    category: "תצפיות ונוף",
    visitedByMilana: true,
    matcher: {
      activities: ["viewpoint", "easy-trails"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: 45,
      weatherTraits: ["winter-ideal", "shade-rich"],
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
      lat: 33.277194,
      lng: 35.775833,
      label: "אתר החרמון",
      wazeUrl: "https://waze.com/ul?ll=33.277194,35.775833&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=33.277194%2C35.775833",
    },
    seoTitle:
      "הר החרמון - לגעת בשלג, לנשום אוויר הרים ולראות את ישראל מזווית אחרת | בשביל הלב",
    metaDescription:
      "אתר החרמון הוא המקום היחיד בישראל שבו אפשר ליהנות משלג אמיתי, נוף עוצר נשימה ורכבל המטפס אל פסגת ההר. חוויה מיוחדת לכל המשפחה - עם כמה טיפים חשובים למי שמגיע עם פעוטות.",
    heroImage: "/images/places/north/חרמון/hero.jpeg",
    heroImageLabel: "תמונת רקע - הר החרמון",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/חרמון/hero.jpeg")`,
    wazeUrl: "https://waze.com/ul?ll=33.277194,35.775833&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=33.277194%2C35.775833",
    about: [
      "יש מקומות שמרגישים כאילו קפצתם לרגע למדינה אחרת.",
      "הר החרמון הוא בדיוק כזה.",
      "שלג לבן, אוויר הרים צלול, נוף אינסופי ורכבל שמטפס אל פסגת ההר - כל אלה יוצרים חוויה שקשה למצוא בשום מקום אחר בישראל.",
      "גם אם אתם לא גולשים, עצם העלייה לפסגה וההליכה בשלג הן חוויה מיוחדת בפני עצמה.",
    ],
    personalStory: [
      "הגענו לחרמון בבוקר, אחרי שלילה קודם התארחנו ביישוב מסעדה.",
      "בדיעבד, זאת אחת ההחלטות הכי טובות שקיבלנו.",
      "במקום לצאת מהבית לפנות בוקר, לנסוע יותר משעתיים ולהגיע עייפים, התעוררנו רגועים, אכלנו ארוחת בוקר והגענו לאתר בלי לחץ.",
      "דוד היה אז בן שנה וחצי.",
      "זאת הייתה הפעם הראשונה שלו שהוא ראה שלג.",
      "לפני שנכנסנו עצרנו לארוחת בוקר קטנה, ומשם המשכנו לרכבל.",
      "כשהגענו לפסגת ההר ראיתי את ההתרגשות בעיניים שלו.",
      "הכול היה לבן.",
      "שקט.",
      "שונה מכל מה שהוא הכיר.",
      "ניסיתי לתת לו זמן פשוט להסתכל, לגעת בשלג, להרגיש את הקור ולנשום את אוויר ההרים הצלול.",
      "אבל אם להיות כנה...",
      "לדעתי האישית, גיל שנה וחצי הוא קצת מוקדם לחוויית החרמון.",
      "ההליכה בשלג מאתגרת, הקרקע מחליקה, קשה להתנייד עם עגלה, והפעוטות עדיין לא יכולים ליהנות מרוב האטרקציות.",
      "לשמחתי, אנחנו כבר טיילנו כמה ימים באזור ולא הגענו במיוחד רק בשביל החרמון, כך שמבחינתנו זאת הייתה עוד עצירה מיוחדת בטיול.",
      "ואחרי כל ההתרגשות...",
      "מרוב אוויר הרים צלול, דוד פשוט נרדם.",
      "אחרי זמן קצר בפסגה ירדנו בחזרה והמשכנו ליעד הבא.",
      "למרות הכול, אני לא מתחרטת לרגע שהגענו.",
      "לפעמים גם חוויות שהן פחות מושלמות מלמדות אותנו משהו.",
      "הן מזכירות לנו שאפשר ליהנות גם כשהמציאות לא בדיוק כמו שדמיינו.",
      "הר החרמון הזכיר לי שלא כל טיול חייב להיות מושלם כדי להיות מוצלח.",
      "לפעמים אנחנו צריכים לדעת להתאים את עצמנו למה שהמציאות מביאה, ליהנות ממה שיש ולא להילחם במה שאין.",
      "וזה נכון בטיולים, אבל גם בחיים.",
    ],
    cost: [
      {
        label: "כניסה",
        value: "₪45 מבוגר, ₪40 ילד (מגיל 3, אתר החרמון)",
      },
      { label: "חניה", value: "יש חניה באתר במפלס התחתון" },
      { label: "משך בילוי", value: "חצי יום עד יום שלם" },
    ],
    quickFacts: [
      { label: "עלות", value: "₪45 מבוגר / ₪40 ילד" },
      { label: "נגיש לעגלות", value: "חלקית" },
      { label: "זמן ביקור", value: "חצי יום עד יום שלם" },
    ],
    gettingThere: {
      parking: "יש חניה באתר במפלס התחתון",
      notes: [
        "שעות פתיחה:",
        "08:00-16:00.",
        "כניסת רכבים עד 15:00.",
        "הכניסה בהזמנה מראש בלבד.",
        "הפעילות מתקיימת בהתאם למזג האוויר.",
      ],
    },
    faq: [
      {
        question: "האם צריך להזמין מקום מראש?",
        answer:
          "כן. הכניסה לאתר החרמון מחייבת הזמנה ורכישת כרטיסים מראש (skihermon.co.il).",
      },
      {
        question: "מה שעות הפתיחה?",
        answer:
          "האתר פתוח בין 08:00 ל-16:00. כניסת רכבים עד 15:00.",
      },
      {
        question: "כמה עולה כניסה?",
        answer:
          "כניסה לאתר: ₪45 למבוגר, ₪40 לילד מגיל 3-12 (מחירון מבקרים, אתר החרמון). מחירי חבילות עם רכבל ואטרקציות משתנים.",
      },
      {
        question: "האם האתר פתוח בכל מזג אוויר?",
        answer:
          "לא. כל הפעילויות מתקיימות בהתאם לתנאי מזג האוויר. מומלץ להתעדכן לפני ההגעה.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer:
          "ההתניידות בשלג ובשטח ההר מוגבלת. חלק מהמתקנים אינם מותאמים לעגלות. נגישות לכיסא גלגלים ברכבל זמינה בהתאם להסדרים באתר.",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer: "חצי יום עד יום שלם, בהתאם לכרטיס ולתנאי השטח.",
      },
    ],
    tips: [
      "אם אפשר - לונו באזור לילה לפני.",
      "קחו בחשבון זמני נסיעה ופקקים.",
      "אם אתם עם פעוטות - הגיעו עם ציפיות מותאמות.",
      "בגדי החלפה מלאים לילדים - חובה.",
      "נצלו את ההגעה לטיול באזור.",
      "אירוח בכפרים הדרוזיים באזור מומלץ מאוד.",
    ],
    highlights: [
      "משפחות עם ילדים",
      "חובבי שלג",
      "חוויה ייחודית",
      "נוף הרים",
      "טיול חורף",
      "רכבל",
    ],
    gallery: [
      {
        src: "/images/places/north/חרמון/IMG_2349 2.jpeg",
        label: "הר החרמון - תמונה 1",
      },
      {
        src: "/images/places/north/חרמון/IMG_2351.jpeg",
        label: "הר החרמון - תמונה 2",
      },
      {
        src: "/images/places/north/חרמון/IMG_2352.jpeg",
        label: "הר החרמון - תמונה 3",
      },
      {
        src: "/images/places/north/חרמון/IMG_2362 2.jpeg",
        label: "הר החרמון - תמונה 4",
      },
    ],
    gallerySubtitle: "",
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "gmvn-hchvlh",
    title: "אגמון החולה",
    subtitle:
      "שמורת טבע קסומה בלב עמק החולה, עם עשרות מיני ציפורים, בעלי חיים, מסלולי רכיבה ונופים פתוחים שגורמים פשוט לעצור ולהתפעל.",
    region: "צפון",
    category: "תצפיות ונוף",
    visitedByMilana: true,
    matcher: {
      activities: ["viewpoint", "easy-trails", "picnic"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: 35,
      weatherTraits: ["shade-rich", "heat-tolerant"],
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
      lat: 33.054722,
      lng: 35.588333,
      label: "אגמון החולה",
      wazeUrl: "https://waze.com/ul?ll=33.054722,35.588333&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=33.054722%2C35.588333",
    },
    seoTitle:
      "אגמון החולה - טבע פראי, אלפי ציפורים ואחת החוויות היפות בישראל | בשביל הלב",
    metaDescription:
      "שמורת טבע קסומה בלב עמק החולה, עם עשרות מיני ציפורים, בעלי חיים, מסלולי רכיבה ונופים פתוחים שגורמים פשוט לעצור ולהתפעל.",
    heroImage: "/images/places/north/אגמון החולה/hero.jpeg",
    heroImageLabel: "תמונת רקע - אגמון החולה",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/אגמון החולה/hero.jpeg")`,
    wazeUrl: "https://waze.com/ul?ll=33.054722,35.588333&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=33.054722%2C35.588333",
    about: [
      "יש מקומות שבהם הטבע הוא לא רק הנוף - הוא כל הסיפור.",
      "אגמון החולה הוא אחד מהם.",
      "כאן לא מגיעים בשביל מתקנים או אטרקציות, אלא כדי להיכנס לעולם שבו בעלי החיים חיים בדיוק כמו שהם אמורים לחיות.",
      "לאורך המסלול תפגשו אגמים, עופות מים, עופות נודדים, תאואים, צמחייה מרהיבה והמון שקט.",
      "זאת אחת החוויות הכי קרובות שיש בארץ לטבע פראי, ולפעמים מרגישים לרגע כאילו קפצתם לאפריקה - בלב ישראל.",
    ],
    personalStory: [
      "הגענו לאגמון אני, דוד - שהיה אז בן שנה וחצי - ואמא שלי.",
      "החלטנו לשכור טוקטוק קטן ולצאת לטיול מסביב לאגמון.",
      "זאת הייתה אחת ההחלטות הכי טובות של אותו יום.",
      "לא מיהרנו לשום מקום.",
      "עצרנו בכל פעם שראינו משהו מעניין.",
      "דוד הסתכל בהתלהבות על הציפורים, על התאואים ועל כל בעלי החיים שפגשנו בדרך.",
      "מה שהכי ריגש אותי היה לראות אותו פוגש את בעלי החיים במקום האמיתי שלהם.",
      "לא מאחורי זכוכית.",
      "לא בכלוב.",
      "אלא בטבע.",
      "במקום שבו הם באמת שייכים.",
      "יש משהו מאוד מרגש בלהבין שאנחנו רק אורחים בעולם שלהם.",
      "לאט לאט, בלי למהר, נסענו בין הנופים, עצרנו בתחנות התצפית ופשוט נהנינו להיות שם.",
      "זאת הייתה אחת מאותן חוויות שלא קורות בגלל אטרקציה מסוימת, אלא בגלל כל האווירה שמסביב.",
      "אגמון החולה הזכיר לי כמה הטבע יודע לחיות בהרמוניה כשאנחנו פשוט נותנים לו להיות.",
      "לפעמים כל מה שאנחנו צריכים הוא להאט את הקצב, להתבונן, ולהיזכר שאנחנו חלק ממשהו הרבה יותר גדול מאיתנו.",
    ],
    cost: [
      {
        label: "כניסה",
        value: "₪35 מבוגר, ₪21 ילד (מגיל 5-18, agamon-hula.co.il)",
      },
      { label: "חניה", value: "יש חניה באתר" },
      { label: "משך בילוי", value: "2-4 שעות (חצי יום)" },
    ],
    quickFacts: [
      { label: "עלות", value: "₪35 מבוגר / ₪21 ילד" },
      { label: "מתאים לילדים", value: "כן" },
      { label: "נגיש לעגלות", value: "כן, במסלולים המונגשים" },
      { label: "זמן ביקור", value: "2-4 שעות" },
    ],
    gettingThere: {
      parking: "יש חניה באתר",
      notes: [
        "שעות פעילות:",
        "א'-ה' כניסה 09:00-16:30, יציאה עד 18:00.",
        "שישי כניסה 08:00-16:00, יציאה עד 17:30.",
        "שבת כניסה 08:00-16:30, יציאה עד 18:00.",
        "מומלץ להתעדכן באתר הרשמי לפני ההגעה בשעות הפעילות המעודכנות.",
      ],
    },
    faq: [
      {
        question: "מה שעות הפתיחה?",
        answer:
          "א'-ה': כניסה 09:00-16:30, יציאה עד 18:00. שישי: כניסה 08:00-16:00, יציאה עד 17:30. שבת: כניסה 08:00-16:30, יציאה עד 18:00 (agamon-hula.co.il).",
      },
      {
        question: "כמה עולה כניסה?",
        answer:
          "₪35 למבוגר, ₪21 לילד מגיל 5-18 (agamon-hula.co.il). השכרת אופניים, רכב גולף וסיורים בתשלום נוסף.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש חניה באתר.",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer: "2-4 שעות, או יום שלם אם משכירים אופניים/רכב גולף ועוצרים לתצפית.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer:
          "יש מסלולים מונגשים ומתקני נגישות באתר. מומלץ לבדוק מראש באתר agamon-hula.co.il את המסלול המתאים.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "בעונות הנדידה (סתיו-אביב) לצפייה בציפורים. מומלץ להגיע מוקדם בבוקר או לקראת שקיעה.",
      },
    ],
    tips: [
      "אם יש לכם אפשרות - שכרו טוקטוק או אופניים.",
      "זאת הדרך הכי מהנה לעצור מתי שמתחשק, להתבונן בבעלי החיים בקצב שלכם ופשוט ליהנות מהדרך.",
      "ואל תשכחו להביא משקפת אם יש לכם - היא לגמרי מוסיפה לחוויה.",
    ],
    highlights: [
      "משפחות עם ילדים",
      "אוהבי ציפורים",
      "טבע ונוף",
      "רכיבת אופניים",
      "עונת נדידה",
      "צילום",
    ],
    gallery: [],
    gallerySubtitle: "",
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "myyn-hsvsym",
    title: "מעיין הסוסים",
    subtitle:
      "מעיין טבעי וצלול עם מים נעימים, אווירת שטח מיוחדת ומקום מפגש של משפחות, אנשי שטח, רוכבי סוסים ומטיילים מכל הארץ.",
    region: "צפון",
    category: "מעיינות",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "nature-shade", "easy-trails", "picnic"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["water-friendly", "shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        "kfar-saba": "1h-plus",
        raanana: "1h-plus",
        "hod-hasharon": "1h-plus",
        herzliya: "1h",
        netanya: "1h",
        haifa: "30m",
        modiin: "1h-plus",
        ramla: "1h-plus",
        lod: "1h-plus",
      },
    },
    location: {
      lat: 32.757972,
      lng: 35.213889,
      label: "מעיין הסוסים",
      wazeUrl:
        "https://waze.com/ul?q=%D7%9E%D7%A2%D7%99%D7%99%D7%9F%20%D7%94%D7%A1%D7%95%D7%A1%D7%99%D7%9D&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=32.757972%2C35.213889",
    },
    seoTitle: "מעיין הסוסים - מעיין טבעי ברמת הגולן | בשביל הלב",
    metaDescription:
      "מעיין הסוסים הוא מעיין טבעי צלול המתאים למשפחות, עם מים נעימים, אווירת שטח מיוחדת והמון טבע. כל מה שצריך לדעת לפני שמגיעים.",
    heroImage: "/images/places/north/מעיין הסוסים/hero.JPG",
    heroImageLabel: "תמונת רקע - מעיין הסוסים",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/מעיין הסוסים/hero.JPG")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%9E%D7%A2%D7%99%D7%99%D7%9F%20%D7%94%D7%A1%D7%95%D7%A1%D7%99%D7%9D&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32.757972%2C35.213889",
    about: [
      "יש מעיינות שמגיעים אליהם רק בשביל המים.",
      "ויש מעיינות שמגיעים אליהם גם בשביל האנשים.",
      "מעיין הסוסים הוא בדיוק כזה.",
      "המים הצלולים, האווירה הפתוחה והמפגש בין משפחות, מטיילי שטח, רוכבי סוסים, טרקטורונים וג'יפים יוצרים מקום עם אנרגיה מיוחדת.",
      "למרות שהוא הפך בשנים האחרונות למקום מוכר ואהוב, עדיין אפשר למצוא בו פינה שקטה, להיכנס למים ופשוט ליהנות מהטבע.",
    ],
    personalStory: [
      "הגענו למעיין באמצע חודש ספטמבר, אני ושני הילדים - אחד בן שנה והשני בן שלוש.",
      "כבר כשהגענו ראינו שהמקום די עמוס.",
      "אבל אנחנו לא מוותרים, אנחנו יודעים להתאים את עצמנו למקום, הרי לטבע כולם שייכים זוכרים?",
      "אחרי כמה דקות מצאנו לעצמנו פינה קטנה ליד המים, פרשנו מחצלת ופשוט התחלנו ליהנות.",
      "הילדים נכנסו למים הצלולים, שיחקו, צחקו והיו מאושרים.",
      "לאורך כל היום עברו לידנו רוכבי סוסים, ג'יפים, טרקטורונים ואופנועי שטח.",
      "זה הרגיש כמו נקודת מפגש של כל מי שאוהב טבע.",
      "מה שהכי ריגש אותי היה לראות את הפסיפס האנושי שנוצר שם.",
      "משפחות, מטיילים, אנשי שטח, ילדים קטנים, זוגות וחברים - כולם הגיעו לאותו מקום בדיוק, וכל אחד מצא לעצמו את הפינה שלו.",
      "באחד הרגעים עברו לידנו כמה רוכבי סוסים.",
      "דוד כל כך התלהב, שאחד מהם עצר, העלה אותו על הסוס ואפילו עשה איתו סיבוב קטן.",
      "בהמשך גם אחד מנהגי הטרקטורונים לקח אותו לסיבוב קצר.",
      "אלו היו מחוות קטנות של אנשים שלא הכרנו, אבל הן נשארו איתי הרבה אחרי שהטיול הסתיים.",
      "לפעמים כל מה שצריך זה קצת טבע ואנשים טובים באמצע הדרך.",
      "הטיול הזה הזכיר לי שלא תמיד צריך לחפש מקום מבודד כדי ליהנות.",
      "גם כשיש הרבה אנשים, עדיין אפשר למצוא את השקט שלנו.",
      "לטבע יש מקום לכולם.",
      "וכשכל אחד מגיע עם חיוך וכבוד לאחר, נוצרת אווירה שפשוט כיף להיות חלק ממנה.",
    ],
    cost: [
      { label: "כניסה", value: "חינם" },
      { label: "חניה", value: "יש חניה באזור" },
      { label: "משך בילוי", value: "שעה עד 3 שעות" },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "בהחלט" },
      {
        label: "נגיש לעגלות",
        value: "חלקי - הגישה אינה סלולה לכל האורך",
      },
      { label: "זמן ביקור", value: "שעה עד 3 שעות" },
    ],
    gettingThere: {
      parking: "יש חניה באזור.",
      walking: "קרוב מאוד לרכב.",
      notes: [
        "המקום עלול להיות עמוס בסופי שבוע.",
        "יש תנועה של רכבי שטח באזור.",
      ],
    },
    faq: [
      {
        question: "האם מתאים לעגלות?",
        answer:
          "הגישה אינה סלולה לכל אורכה. מומלץ לאמת את תנאי השטח לפני ההגעה.",
      },
      {
        question: "כמה עולה כניסה?",
        answer: "הכניסה חינמית, ללא תשלום.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש חניה באזור.",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer: "שעה עד 3 שעות.",
      },
      {
        question: "האם אפשר להיכנס למים?",
        answer: "כן. ניתן לרחצה במים הצלולים של המעיין.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "באמצע השבוע המקום בדרך כלל שקט יותר. יש מים לאורך כל השנה, והביקור נעים במיוחד בימים חמים.",
      },
    ],
    tips: [
      "אם אפשר - הגיעו באמצע השבוע.",
      "הביאו מחצלות, אוכל והרבה מים.",
      "בדקו אילו מקומות נוספים יש באזור.",
    ],
    highlights: [
      "משפחות עם ילדים",
      "אוהבי מים",
      "טיול בשטח",
      "פיקניק",
      "מעיינות",
      "בילוי קיץ",
    ],
    gallery: [
      { src: "/images/places/north/מעיין הסוסים/IMG_5983.JPG" },
      { src: "/images/places/north/מעיין הסוסים/IMG_5985.JPG" },
      { src: "/images/places/north/מעיין הסוסים/IMG_5990.JPG" },
      { src: "/images/places/north/מעיין הסוסים/IMG_5999.JPG" },
      { src: "/images/places/north/מעיין הסוסים/IMG_6002.JPG" },
      { src: "/images/places/north/מעיין הסוסים/IMG_6007.JPG" },
      { src: "/images/places/north/מעיין הסוסים/IMG_6015.JPG" },
    ],
    gallerySubtitle: "",
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "shmvrt-tb-bnys",
    title: "שמורת הטבע בניאס",
    subtitle:
      "נחל שזורם בחוזקה, מפל אדיר, צמחייה ירוקה לאורך כל השנה ואחד ממסלולי ההליכה המרשימים ביותר בארץ.",
    region: "צפון",
    category: "טיול מים",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "viewpoint", "easy-trails", "nature-shade"],
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
        haifa: "1h-plus",
        modiin: "1h-plus",
        ramla: "1h-plus",
        lod: "1h-plus",
      },
    },
    location: {
      lat: 33.2475,
      lng: 35.6933,
      label: "שמורת טבע בניאס",
      wazeUrl:
        "https://waze.com/ul?q=%D7%A9%D7%9E%D7%95%D7%A8%D7%AA%20%D7%98%D7%91%D7%A2%20%D7%91%D7%A0%D7%99%D7%90%D7%A1&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=33.2475%2C35.6933",
    },
    seoTitle:
      "שמורת הטבע בניאס - מסלול למשפחות ומפל הבניאס | בשביל הלב",
    metaDescription:
      "שמורת הטבע בניאס היא אחת משמורות הטבע היפות בישראל. מסלול הליכה מרהיב, מפל עוצמתי, נחל זורם, צמחייה עשירה וחוויה בלתי נשכחת לכל המשפחה.",
    heroImage: "/images/places/north/בניאס/hero.JPG",
    heroImageLabel: "תמונת רקע - שמורת הטבע בניאס",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/בניאס/hero.JPG")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%A9%D7%9E%D7%95%D7%A8%D7%AA%20%D7%98%D7%91%D7%A2%20%D7%91%D7%A0%D7%99%D7%90%D7%A1&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=33.2475%2C35.6933",
    about: [
      "אם יש מקום אחד שאני ממליצה עליו כמעט לכל מי שמגיע לצפון - זאת שמורת הטבע בניאס.",
      "יש כאן שילוב נדיר של נחל זורם בעוצמה, מים צלולים, צמחייה עשירה, גשרים תלויים, שבילי הליכה מסודרים ואחד המפלים המרשימים בישראל.",
      "אבל בשבילי הבניאס הוא הרבה יותר ממסלול.",
      "כשהייתי ילדה היינו מגיעים לכאן כמעט בכל שנה או אפילו כמה פעמים בשנה לקמפינג משפחתי.",
      "יש לי מהמקום הזה זיכרונות ילדות מדהימים, ואני חושבת שחלק גדול מהאהבה שלי לטבע התחיל ממש כאן.",
      "אולי אפילו אני חייבת לבניאס את החיבור שיש לי היום לטבע.",
      "מבחינה גיאוגרפית, נחל הבניאס הוא אחד משלושת מקורות נהר הירדן. מימיו נובעים למרגלות החרמון, זורמים בעוצמה לאורך השמורה ובהמשך מתאחדים עם נחל דן ונחל שניר ליצירת נהר הירדן - אחד הנחלים החשובים בישראל.",
    ],
    personalStory: [
      "הפעם הגעתי לכאן עם שני הילדים שלי.",
      "ופתאום מצאתי את עצמי חוזרת לילדות - רק מהצד של אמא.",
      "אני תמיד אומרת שההורות היא גלגל החיים.",
      "זאת הזדמנות לחוות שוב את הילדות שלנו, אבל הפעם דרך העיניים של הילדים שלנו.",
      "זאת הזדמנות לרפא מקומות שכאבו לנו, ולהעצים את כל מה שעשה לנו טוב.",
      "המסלול בבניאס לא מתאים לעגלות.",
      "רפאל היה אז בן שנה, אז קשרתי אותו במנשא.",
      "דוד היה בן שלוש, והחליט שהוא עושה את המסלול ברגל.",
      "לאורך הדרך היו רגעים שבהם כבר ראיתי שהוא מתעייף.",
      "ואז...",
      "פתאום נשמע רעש המים.",
      "עוד כמה צעדים.",
      "ופתאום נפתח מולנו המפל העצום של הבניאס.",
      "אני לא אשכח את המבט שלו.",
      "ברגע אחד כל העייפות נעלמה.",
      "הוא פשוט עמד והסתכל.",
      "באותו רגע הבנתי עוד פעם כמה ילדים מסוגלים להרבה יותר ממה שאנחנו חושבים.",
      "לפעמים הם רק צריכים סיבה מספיק טובה להמשיך.",
      "וזה ממש לא רלוונטי רק לגבי ילדים!",
      "אני באמת מאמינה שאנחנו יכולים לבחור איזה חיבור נעניק לילדים שלנו.",
      "לטבע.",
      "לאדמה.",
      "למים.",
      "לאתגרים.",
      "אם הם יכירו את המקומות האלה כבר בגיל צעיר - הם ייקחו אותם איתם לכל החיים.",
      "הבניאס הזכיר לי שכמעט תמיד, רגע לפני שאנחנו רוצים לוותר - מחכה לנו הדבר הכי יפה.",
      "מכירים את המשפט המפורסם?",
      "הרגע הכי חשוך ביום הוא רגע לפני עלות השחר?",
      "זה משפט שאני נאחזת בו כל הזמן!",
      "לפעמים צריך עוד כמה צעדים.",
      "עוד קצת סבלנות.",
      "עוד קצת אמונה בדרך.",
      "ואז הכול נפתח.",
    ],
    cost: [
      {
        label: "כניסה",
        value: "₪31 מבוגר, ₪16 ילד (parks.org.il)",
      },
      { label: "חניה", value: "יש חניה מסודרת" },
      { label: "משך בילוי", value: "2-3 שעות" },
    ],
    quickFacts: [
      { label: "עלות", value: "₪31 מבוגר / ₪16 ילד" },
      { label: "מתאים לילדים", value: "בהחלט" },
      { label: "נגיש לעגלות", value: "לא" },
      { label: "זמן ביקור", value: "2-3 שעות" },
    ],
    gettingThere: {
      parking: "יש חניה מסודרת בשמורה.",
      notes: [
        "משך הביקור המומלץ: 2-3 שעות.",
        "המסלול אינו מתאים לעגלות, אך בהחלט אפשרי עם מנשא.",
        "הרחצה בשמורה אסורה.",
        "חלק גדול מהמסלול מוצל.",
      ],
    },
    faq: [
      {
        question: "האם מתאים לעגלות?",
        answer: "לא. המסלול בבניאס אינו מתאים לעגלות.",
      },
      {
        question: "כמה עולה כניסה?",
        answer:
          "₪31 למבוגר, ₪16 לילד (parks.org.il). מנויי מטמון נכנסים ללא תשלום.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש חניה מסודרת בשמורה.",
      },
      {
        question: "כמה זמן לוקח המסלול?",
        answer: "2-3 שעות בקצב רגוע, כולל עצירות.",
      },
      {
        question: "האם אפשר להיכנס למים?",
        answer:
          "רחצה אסורה בתוך השמורה (parks.org.il). באזור יש מקומות נוספים שבהם ניתן להשתכשך במי הבניאס.",
      },
      {
        question: "מה שעות הפתיחה?",
        answer:
          "שעון קיץ: א'-ה' ושבת 08:00-17:00, שישי וערבי חג 08:00-16:00. שעון חורף: א'-ה' ושבת 08:00-16:00, שישי וערבי חג 08:00-15:00. הכניסה נסגרת שעה לפני השעות הרשומות (parks.org.il).",
      },
    ],
    tips: [
      "אם כבר הגעתם - שלבו ארוחה במסעדת דג על הדן.",
      "הביאו נשנושים לדרך.",
      "נעלי הליכה, מים ומנשא מומלצים.",
      "אל תוותרו על המסלול בגלל שאין עגלה.",
      "לפעמים דווקא המקומות שדורשים קצת יותר - הופכים לזיכרונות הכי יפים.",
    ],
    highlights: [
      "משפחות עם ילדים",
      "אוהבי מים",
      "טיול בטבע",
      "מפלים",
      "היסטוריה",
      "צפון",
    ],
    gallery: [
      { src: "/images/places/north/בניאס/IMG_7531.JPG" },
      { src: "/images/places/north/בניאס/IMG_7533.JPG" },
      { src: "/images/places/north/בניאס/IMG_7564.JPG" },
      { src: "/images/places/north/בניאס/IMG_7569.JPG" },
      { src: "/images/places/north/בניאס/IMG_7573.JPG" },
    ],
    gallerySubtitle: "",
    nearbyTripSlugs: ["nchl-dn"],
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "mpl-tnvr-gbvl-lbnvn",
    title: "מפל התנור",
    subtitle:
      "מסלול קצר, נגיש ומרהיב בלב שמורת נחל עיון, שמוביל אל אחד המפלים המרשימים בארץ - במרחק דקות מגבול לבנון.",
    region: "צפון",
    category: "טיול מים",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "viewpoint", "easy-trails", "nature-shade"],
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
        haifa: "1h-plus",
        modiin: "1h-plus",
        ramla: "1h-plus",
        lod: "1h-plus",
      },
    },
    location: {
      lat: 33.253611,
      lng: 35.578611,
      label: "מפל התנור",
      wazeUrl:
        "https://waze.com/ul?q=%D7%A9%D7%9E%D7%95%D7%A8%D7%AA%20%D7%98%D7%91%D7%A2%20%D7%A0%D7%97%D7%9C%20%D7%A2%D7%99%D7%95%D7%9F%20(%D7%94%D7%AA%D7%A0%D7%95%D7%A8)&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=33.253611%2C35.578611",
    },
    seoTitle:
      "מפל התנור - אחד המפלים הגבוהים בישראל, ממש על גבול לבנון | בשביל הלב",
    metaDescription:
      "מסלול קצר, נגיש ומרהיב בלב שמורת נחל עיון, שמוביל אל אחד המפלים המרשימים בארץ - במרחק דקות מגבול לבנון.",
    heroImage: "/images/places/north/מפל תנור גבול לבנון/hero.JPG",
    heroImageLabel: "תמונת רקע - מפל התנור",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/מפל תנור גבול לבנון/hero.JPG")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%A9%D7%9E%D7%95%D7%A8%D7%AA%20%D7%98%D7%91%D7%A2%20%D7%A0%D7%97%D7%9C%20%D7%A2%D7%99%D7%95%D7%9F%20(%D7%94%D7%AA%D7%A0%D7%95%D7%A8)&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=33.253611%2C35.578611",
    highlights: [
      "משפחות עם ילדים",
      "מפלים",
      "מסלול קצר",
      "גליל עליון",
      "שמורת טבע",
      "נגישות",
    ],
    about: [
      "יש מקומות שלא צריכים מסלול ארוך כדי להשאיר רושם גדול.",
      "מפל התנור הוא בדיוק כזה.",
      "בלב שמורת נחל עיון, סמוך למטולה, מחכה אחד המפלים הגבוהים והמרשימים בישראל.",
      "המסלול קצר, נוח ומונגש ברובו, ולכן מתאים גם למשפחות עם ילדים קטנים.",
      "לאורך הדרך עוברים בין פלגי מים, גשרוני עץ, צמחייה ירוקה והמון שקט, עד שמגיעים אל המפל.",
      "גם אם הגעתם בעונה שבה הזרימה פחות עוצמתית, הגובה של המפל והמצוק שמקיף אותו פשוט מרשימים.",
      "אני לא הייתי נוסעת עד לכאן רק בשביל המפל, אבל אם אתם כבר מטיילים בגליל העליון או באזור מטולה - זאת עצירה שאני ממליצה עליה מכל הלב.",
    ],
    personalStory: [
      "הגענו לשמורת נחל עיון עם שני הילדים, בני שנה ושלוש.",
      "כבר מתחילת המסלול הרגשנו שזה מקום אחר.",
      "הכול מסודר, נעים, נגיש ופשוט מזמין ללכת.",
      "עברנו בין פלגי מים קטנים, גשרונים מעץ והמון ירוק מסביב.",
      "דוד הלך כמעט את כל הדרך לבד, וזה תמיד אחד הדברים שהכי משמחים אותי.",
      "אני אוהבת לראות אותם מרגישים עצמאיים בתוך הטבע.",
      "רפאלי נהנה בעגלה ומהנגישות הנהדרת שהמסלול מציע.",
      "ככל שהתקרבנו, התחלנו לשמוע את רעש המים.",
      "ואז הוא התגלה מולנו.",
      "מפל התנור.",
      "גם אם ראיתי כבר מפלים בחיי, משהו בגובה שלו ובמיקום שלו מצליח לרגש אותי בכל פעם מחדש.",
      "אולי זה בגלל שאנחנו עומדים ממש בקצה הצפוני של המדינה, קרוב מאוד לגבול.",
      "יש משהו בגבולות שתמיד מרגש אותי.",
      "בין אם זה מבחינת התחושה שלי כישראלית שכולנו יודעים וכואבים את עניין הגבולות",
      "ובין אם זה גבולות החיים שמזכירים לי שלכל דבר בחיים יש מסגרת.",
      "ולפעמים דווקא הגבולות הם אלה שמאפשרים לנו לצמוח.",
      "הטיול הזה חידד לי שלגבולות יש כוח.",
      "לא רק גבולות של מדינות.",
      "גם הגבולות שאנחנו מציבים לעצמנו.",
      "הגבולות שאנחנו מלמדים את הילדים שלנו.",
      "והגבולות שעוזרים לנו לשמור על עצמנו.",
      "דווקא מתוך הגבול אפשר לצמוח.",
      "ודווקא מתוך מסגרת אפשר לגלות חופש.",
      "השילוב הזה בין גובה המפל, עוצמת היופי והמיקום הגראוגרפי שלו נתן לי ערך מיוחד למקום הזה.",
    ],
    cost: [
      {
        label: "כניסה",
        value: "₪31 מבוגר, ₪16 ילד (parks.org.il)",
      },
      { label: "חניה", value: "יש חניה מסודרת" },
      { label: "משך בילוי", value: "כשעה" },
    ],
    quickFacts: [
      { label: "עלות", value: "₪31 מבוגר / ₪16 ילד" },
      { label: "מתאים לילדים", value: "בהחלט" },
      { label: "נגיש לעגלות", value: "כן, במסלול הקצר למפל התנור" },
      { label: "זמן ביקור", value: "כשעה" },
    ],
    gettingThere: {
      parking: "יש חניה מסודרת בשמורה.",
      notes: [
        "המסלול קצר.",
        "הכניסה למים אסורה.",
      ],
    },
    faq: [
      {
        question: "האם מתאים לעגלות?",
        answer:
          "כן. במסלול הקצר הונגשו שביל הליכה מעגלי מאספלט ומרפסת תצפית על מפל התנור, המתאימים גם לעגלות ילדים (parks.org.il).",
      },
      {
        question: "כמה עולה כניסה?",
        answer:
          "₪31 למבוגר, ₪16 לילד (parks.org.il). מנויי מטמון נכנסים ללא תשלום.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש חניה מסודרת בשמורה.",
      },
      {
        question: "כמה זמן לוקח המסלול?",
        answer: "כשעה בקצב רגוע, כולל עצירות.",
      },
      {
        question: "האם אפשר להיכנס למים?",
        answer: "רחצה אסורה.",
      },
      {
        question: "מה שעות הפתיחה?",
        answer:
          "שעון קיץ: א'-ה' ושבת 08:00-17:00, שישי וערבי חג 08:00-16:00. שעון חורף: א'-ה' ושבת 08:00-16:00, שישי וערבי חג 08:00-15:00. הכניסה נסגרת שעה לפני השעות הרשומות (parks.org.il).",
      },
    ],
    tips: [
      "שלבו עוד אטרקציות באזור.",
    ],
    gallery: [
      { src: "/images/places/north/מפל תנור גבול לבנון/IMG_7673.jpg" },
      { src: "/images/places/north/מפל תנור גבול לבנון/IMG_7715.JPG" },
      { src: "/images/places/north/מפל תנור גבול לבנון/IMG_7723.JPG" },
    ],
    gallerySubtitle: "",
    nearbyTripSlugs: ["shmvrt-tb-bnys", "nchl-dn"],
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "nchl-nkrvt-yknm",
    title: "פארק נחל נקרות יקנעם",
    subtitle:
      "פארק ירוק ונעים בלב יקנעם, עם פלגי מים, מדשאות, שבילים נגישים והמון פינות מושלמות לעצירה קצרה עם הילדים.",
    region: "צפון",
    category: "טיול משפחתי",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "easy-trails", "picnic", "nature-shade"],
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
        haifa: "30m",
        modiin: "1h",
        ramla: "1h",
        lod: "1h",
      },
    },
    location: {
      lat: 32.653611,
      lng: 35.117222,
      label: "פארק נחל נקרות יקנעם",
      wazeUrl:
        "https://waze.com/ul?q=%D7%A4%D7%90%D7%A8%D7%A7%20%D7%A0%D7%97%D7%9C%20%D7%A0%D7%A7%D7%A8%D7%95%D7%AA%20%D7%99%D7%A7%D7%A0%D7%A2%D7%9D&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=32.653611%2C35.117222",
    },
    seoTitle: "פארק נחל נקרות ביקנעם - פארק מושלם למשפחות | בשביל הלב",
    metaDescription:
      "פארק נחל נקרות ביקנעם הוא מקום נהדר לעצירה בדרך לצפון - פלגי מים, שבילים נגישים, מדשאות ופינות פיקניק למשפחות עם ילדים.",
    heroImage: "/images/places/north/נחל נקרות יקנעם/hero.JPG",
    heroImageLabel: "תמונת רקע - פארק נחל נקרות",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/נחל נקרות יקנעם/hero.JPG")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%A4%D7%90%D7%A8%D7%A7%20%D7%A0%D7%97%D7%9C%20%D7%A0%D7%A7%D7%A8%D7%95%D7%AA%20%D7%99%D7%A7%D7%A0%D7%A2%D7%9D&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32.653611%2C35.117222",
    highlights: [
      "משפחות עם ילדים",
      "פיקניק",
      "פארק עירוני",
      "מים",
      "עצירה בדרך",
      "יקנעם",
    ],
    about: [
      "לפעמים לא צריך לנסוע שעות כדי להרגיש בטבע.",
      "פארק נחל נקרות ביקנעם הוא בדיוק מסוג המקומות שכיף לעצור בהם בדרך.",
      "זה פארק מטופח עם שבילי הליכה נוחים, מדשאות רחבות, פלגי מים זורמים ופינות ישיבה מוצלות.",
      "המים הזורמים בפארק הם חלק מערוץ נחל נקרות, שעבר שיקום ופיתוח כחלק מהפארק העירוני, והם מוסיפים למקום תחושת טבע נעימה בלב העיר.",
      "לא הייתי נוסעת במיוחד מכל קצה הארץ רק בשביל הפארק, אבל אם אתם מטיילים באזור יקנעם, רמות מנשה או בדרך לצפון - זאת עצירה מקסימה לפיקניק, להפסקת קפה או לשעה של טבע עם הילדים.",
    ],
    personalStory: [
      "עצרנו בפארק בדרך לטיול אחר.",
      "כמו שאני אוהבת.",
      "למצוא מקומות יפים בדרך, לפרוס מחצלת ולעשות פיקניק קטן.",
      "רפאל היה אז בן שנה ושלושה חודשים.",
      "ודוד היה בן שלוש.",
      "לא תכננתי שמשהו מיוחד יקרה באותו יום.",
      "אבל כנראה שלרפאל היו תוכניות אחרות.",
      "פתאום, באמצע הפארק, הוא פשוט החליט שזה הזמן.",
      "הוא התחיל ללכת.",
      "לא צעד אחד.",
      "לא שניים.",
      "אלא הליכה אמיתית, רצופה, בפעם הראשונה.",
      "עמדתי שם והסתכלתי עליו.",
      "בלב הטבע.",
      "ליד פלג המים.",
      "ופשוט לא האמנתי שזה קורה דווקא שם.",
      "אלה בדיוק הרגעים שאני הכי אוהבת בטיולים.",
      "לא המקומות שמתכננים.",
      "אלא הרגעים שהחיים פשוט מחליטים להעניק לנו תוך כדי הדרך.",
      "אני לא חושבת שאי פעם אזכור את הפארק הזה בלי לראות מול העיניים את הצעדים הראשונים של רפאל.",
      "לפעמים אנחנו יוצאים לטיול כדי לראות מקום חדש.",
      "ובסוף אנחנו חוזרים עם זיכרון שלא קשור בכלל למקום.",
      "הטיול הזה הזכיר לי שהרגעים הכי גדולים בחיים קורים דווקא כשלא מתכננים אותם.",
    ],
    cost: [
      { label: "כניסה", value: "חינם" },
      { label: "חניה", value: "חניה חינם סמוך לפארק" },
      { label: "משך בילוי", value: "כשעה" },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "בהחלט" },
      { label: "נגיש לעגלות", value: "כן, ברוב שבילי הפארק" },
      { label: "זמן ביקור", value: "כשעה" },
    ],
    gettingThere: {
      parking: "יש חניה חינם סמוך לפארק.",
      notes: [
        "הכניסה למים אסורה.",
      ],
    },
    faq: [
      {
        question: "האם מתאים לעגלות?",
        answer: "כן. ניתן לטייל ברוב שבילי הפארק עם עגלות.",
      },
      {
        question: "כמה עולה כניסה?",
        answer: "הכניסה חינמית, ללא תשלום.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש חניה חינם סמוך לפארק.",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer: "כשעה, או יותר אם עוצרים לפיקניק.",
      },
      {
        question: "האם אפשר להיכנס למים?",
        answer: "לא. הרחצה אינה מותרת.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "הפארק מתאים לעצירה בדרך לצפון, לפיקניק או לשעה של טבע עם ילדים. כמות המים משתנה לפי העונה.",
      },
    ],
    tips: [
      "יקנעם היא מקום נהדר לעצירה.",
      "בדקו מסעדות, אטרקציות ומקומות נוספים באזור.",
      "מקום נהדר להפסקת פיקניק בדרך לצפון או בחזרה.",
    ],
    gallery: [
      { src: "/images/places/north/נחל נקרות יקנעם/IMG_0613.JPG", label: "פארק נחל נקרות ביקנעם" },
      { src: "/images/places/north/נחל נקרות יקנעם/IMG_0622 2.JPG", label: "פלגי מים בפארק נחל נקרות" },
      { src: "/images/places/north/נחל נקרות יקנעם/IMG_0630.JPG", label: "מדשאות ושבילים בפארק נחל נקרות" },
      { src: "/images/places/north/נחל נקרות יקנעם/IMG_3700.jpg", label: "פארק נחל נקרות יקנעם" },
    ],
    gallerySubtitle: "",
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "rvb-rvy",
    title: "רוב רוי",
    subtitle:
      "פינת קסם על גדות הירדן עם שיט בקיאקים, פינות ישיבה, מים צלולים, מוזיקה טובה ואווירה שאי אפשר להסביר - רק להרגיש.",
    region: "צפון",
    category: "טיול מים",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "easy-trails", "picnic", "nature-shade"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: 85,
      weatherTraits: ["water-friendly", "shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        haifa: "1h",
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
      lat: 32.705278,
      lng: 35.575833,
      label: "רוב רוי - שייט קיאקים בירדן",
      wazeUrl:
        "https://waze.com/ul?q=%D7%A8%D7%95%D7%91%20%D7%A8%D7%95%D7%99%20%D7%A9%D7%99%D7%99%D7%98%20%D7%A7%D7%99%D7%90%D7%A7%D7%99%D7%9D%20%D7%91%D7%99%D7%A8%D7%93%D7%9F&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=32.705278%2C35.575833",
    },
    seoTitle:
      "רוב רוי - שיט קיאקים, טבע ואווירה קסומה על הירדן | בשביל הלב",
    metaDescription:
      "רוב רוי הוא אחד המקומות המיוחדים בצפון - שיט בקיאקים, מים צלולים, אווירה קסומה, קבלת שבת בטבע וחוויה מושלמת למשפחות עם ילדים.",
    heroImage: "/images/places/north/רוב רוי/hero.jpeg",
    heroImageLabel: "תמונת רקע - רוב רוי על גדות הירדן",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/רוב רוי/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%A8%D7%95%D7%91%20%D7%A8%D7%95%D7%99%20%D7%A9%D7%99%D7%99%D7%98%20%D7%A7%D7%99%D7%90%D7%A7%D7%99%D7%9D%20%D7%91%D7%99%D7%A8%D7%93%D7%9F&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32.705278%2C35.575833",
    highlights: [
      "משפחות עם ילדים",
      "קיאקים",
      "ירדן",
      "מים",
      "פיקניק",
      "אווירה מיוחדת",
    ],
    about: [
      "יש מקומות יפים.",
      "ויש מקומות שפשוט יש להם נשמה.",
      "רוב רוי הוא בדיוק מקום כזה.",
      "על גדות נהר הירדן, בין עצי האקליפטוס והמים הזורמים, מחכה מקום שלא מרגיש כמו עוד אטרקציה, אלא כמו בית קטן לאנשים שאוהבים טבע, חופש ופשטות.",
      "אפשר לשבת שעות על המחצלות והספות, להיכנס למים, לשכור קיאק, לשתות קפה טוב, ליהנות מהאוכל במקום ופשוט להאט את הקצב.",
      "אם תגיעו בימי שישי בעונה, לפעמים תזכו גם לקבלת שבת עם מוזיקה חיה, אנשים רוקדים יחפים, משפחות, מטיילים והמון אהבה באוויר.",
      "אני באמת לא מכירה עוד מקום בארץ עם האווירה הזאת.",
    ],
    personalStory: [
      "אני חושבת שכמעט אין ביקור שלי בצפון בלי לעצור ברוב רוי.",
      "הייתי שם עם הילדים, עם המשפחה ועם חברים.",
      "וכל פעם מחדש אני מרגישה שהגעתי הביתה.",
      "באחד הביקורים שכרנו קיאקים ושטנו בירדן.",
      "בפעם אחרת פשוט בילינו שעות במים.",
      "אבל דווקא רגע קטן אחר הוא זה שנשאר איתי.",
      "באחת מפינות הנהר היה גזע עץ גדול.",
      "מבחינת הילדים הוא לא היה סתם גזע.",
      "הוא היה מגדל.",
      "הר.",
      "אתגר.",
      "שוב ושוב הם טיפסו עליו, עזרו אחד לשני, המתינו בסבלנות שכל אחד יקפוץ, עודדו אחד את השני ולא ויתרו גם כשלא הצליחו בפעם הראשונה.",
      "עמדתי מהצד וחשבתי לעצמי כמה מדהים שטבע פשוט מלמד את כל מה שאי אפשר ללמד בשום שיעור.",
      "סבלנות.",
      "אומץ.",
      "שיתוף פעולה.",
      "התמודדות.",
      "ועצמאות.",
      "אבל הרגע שהכי נחרט לי קרה דווקא מחוץ למים.",
      "הילדים רצו גלידה.",
      "הבאתי להם כסף ואמרתי להם שהפעם הם הולכים לקנות לבד.",
      "בהתחלה הם קצת נבהלו.",
      "ואז ראיתי אותם עומדים בצד ומתכננים.",
      "דוד אמר:",
      "\"אני אדבר.\"",
      "רפאל אמר:",
      "\"אני אתן את הכסף.\"",
      "הם עמדו שם כמה דקות, עודדו אחד את השני, אספו אומץ וניגשו.",
      "אני לא התערבתי.",
      "רק הסתכלתי מהצד.",
      "כמה דקות אחר כך הם חזרו אליי בריצה.",
      "\"אמא! הצלחנו! קנינו לבד!\"",
      "אני לא חושבת שהם הבינו בכלל מה הם עשו באותו רגע.",
      "אבל אני הבנתי.",
      "הם ניצחו את הביישנות.",
      "הם למדו להאמין בעצמם.",
      "והם עשו את זה יחד.",
      "אלה בדיוק הרגעים שבשבילם אני כל כך אוהבת לטייל.",
      "רוב רוי תמיד מזכיר לי שלא צריך הרבה כדי להיות מאושרים.",
      "מים.",
      "עצים.",
      "אנשים טובים.",
      "וקצת אומץ לתת לילדים לעשות דברים לבד.",
      "לפעמים אנחנו כהורים רוצים לעזור מהר מדי.",
      "אבל דווקא כשאנחנו עושים צעד אחורה, הם עושים צעד קדימה.",
    ],
    cost: [
      { label: "כניסה למתחם", value: "חינם" },
      {
        label: "שייט קיאקים",
        value: "₪85 מבוגר, ₪65 ילד (robroy.co.il)",
      },
      { label: "חניה", value: "יש חניה מסודרת" },
      { label: "משך בילוי", value: "שעה עד יום שלם" },
    ],
    quickFacts: [
      { label: "כניסה", value: "חינם" },
      { label: "שייט קיאקים", value: "₪85 / ₪65" },
      { label: "מתאים לילדים", value: "מאוד" },
      { label: "נגיש לעגלות", value: "כן, ברוב שטח המתחם" },
      { label: "זמן ביקור", value: "שעה עד יום שלם" },
    ],
    gettingThere: {
      parking: "יש חניה מסודרת.",
      notes: [
        "ניתן לשכור קיאקים.",
        "ניתן להיכנס למים לרחצה.",
        "במקום פועל מזנון עם אוכל ושתייה.",
        "מומלץ להתעדכן באירועים מיוחדים.",
      ],
    },
    faq: [
      {
        question: "האם מתאים לעגלות?",
        answer: "כן. ניתן לטייל ברוב שטח המתחם עם עגלות.",
      },
      {
        question: "כמה עולה כניסה?",
        answer:
          "הכניסה למתחם חינמית. שייט הקיאקים בתשלום - ₪85 למבוגר ו-₪65 לילד (robroy.co.il).",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש חניה מסודרת.",
      },
      {
        question: "מאיזה גיל אפשר לשוט?",
        answer: "מגיל שנתיים ומעלה (robroy.co.il).",
      },
      {
        question: "כמה זמן נמשך השייט?",
        answer:
          "משך השייט כשעה וחצי, שייט עצמי הלוך וחזור (robroy.co.il).",
      },
      {
        question: "מה כדאי להביא?",
        answer:
          "מים, כובע, סנדלים או נעליים סגורות, וקרם הגנה בימי הקיץ (robroy.co.il).",
      },
    ],
    tips: [
      "בדקו אם מתקיימת קבלת שבת בימי שישי.",
      "זה המקום המושלם לסטלבט.",
      "הביאו מחצלת והתמקמו ליד הנהר.",
      "לילדים קטנים - אל תשכחו מצופים.",
    ],
    gallery: [
      { src: "/images/places/north/רוב רוי/IMG_1530.JPG", label: "רוב רוי על גדות הירדן" },
      { src: "/images/places/north/רוב רוי/IMG_2068.jpeg", label: "מים צלולים בירדן ברוב רוי" },
      { src: "/images/places/north/רוב רוי/IMG_2072.jpeg", label: "אווירה בפארק רוב רוי" },
      { src: "/images/places/north/רוב רוי/IMG_2077.jpeg", label: "פינות ישיבה בין העצים ברוב רוי" },
      { src: "/images/places/north/רוב רוי/IMG_2080.jpeg", label: "שייט ומים ברוב רוי" },
      { src: "/images/places/north/רוב רוי/IMG_2084.jpeg", label: "טבע ומים בירדן ברוב רוי" },
      { src: "/images/places/north/רוב רוי/IMG_2086.jpeg", label: "רוב רוי - חוויה משפחתית על הירדן" },
      { src: "/images/places/north/רוב רוי/IMG_8890.jpeg", label: "רוב רוי בצפון" },
    ],
    gallerySubtitle: "",
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "nchl-hkybvtzym",
    title: "נחל הקיבוצים",
    subtitle:
      "מים צלולים, בריכות טבעיות, פינות פיקניק והמגלשה הטבעית הכי כיפית בעמק המעיינות - מקום שפשוט לא רוצים לעזוב.",
    region: "צפון",
    category: "טיול מים",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "easy-trails", "picnic", "nature-shade"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["water-friendly", "shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        "kfar-saba": "1h-plus",
        raanana: "1h-plus",
        "hod-hasharon": "1h-plus",
        herzliya: "1h-plus",
        netanya: "1h-plus",
        haifa: "1h-plus",
        modiin: "1h-plus",
        ramla: "1h-plus",
        lod: "1h-plus",
      },
    },
    location: {
      lat: 32.497778,
      lng: 35.468333,
      label: "חניון בריכת הקיבוצים",
      wazeUrl:
        "https://waze.com/ul?q=%D7%97%D7%A0%D7%99%D7%95%D7%9F%20%D7%91%D7%A8%D7%99%D7%9B%D7%AA%20%D7%94%D7%A7%D7%99%D7%91%D7%95%D7%A6%D7%99%D7%9D&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=32.497778%2C35.468333",
    },
    seoTitle:
      "נחל הקיבוצים - המגלשה הטבעית בעמק המעיינות | בשביל הלב",
    metaDescription:
      "נחל הקיבוצים הוא אחד ממסלולי המים האהובים בישראל - מים צלולים, מגלשה טבעית, פינות פיקניק והמון כיף למשפחות עם ילדים.",
    heroImage: "/images/places/north/נחל הקיבוצים/hero.jpeg",
    heroImageLabel: "תמונת רקע - נחל הקיבוצים",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/נחל הקיבוצים/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%97%D7%A0%D7%99%D7%95%D7%9F%20%D7%91%D7%A8%D7%99%D7%9B%D7%AA%20%D7%94%D7%A7%D7%99%D7%91%D7%95%D7%A6%D7%99%D7%9D&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32.497778%2C35.468333",
    highlights: [
      "משפחות עם ילדים",
      "מגלשה טבעית",
      "מים",
      "עמק המעיינות",
      "פיקניק",
      "טיול קיץ",
    ],
    about: [
      "אם יש מקום אחד בעמק המעיינות שאני יכולה לחזור אליו שוב ושוב - זה נחל הקיבוצים.",
      "יש כאן כל מה שאני אוהבת בטבע.",
      "מים צלולים שאפשר להיכנס אליהם, פינות ישיבה מוצלות, מקום נהדר לפיקניק, והמון מרחב לילדים פשוט להיות ילדים.",
      "אבל גולת הכותרת היא ללא ספק המגלשה הטבעית.",
      "זרם המים עובר בתוך מעבר צר מתחת לגשר ויוצר מגלשת מים טבעית שהילדים פשוט לא מפסיקים להתגלש בה.",
      "וגם המבוגרים...",
      "בינינו?",
      "גם אני לא הצלחתי להפסיק.",
      "נחל הקיבוצים הוא אחד מיובליו של נחל חרוד, וניזון ממעיינות עמק המעיינות, מה שהופך את המים לקרירים ונעימים כמעט לאורך כל השנה.",
    ],
    personalStory: [
      "זה אחד המקומות שאני תמיד שמחה לחזור אליהם.",
      "באמת.",
      "לא משנה כמה פעמים כבר היינו שם - אף פעם לא נמאס לנו.",
      "מהחניה הולכים כמה דקות בלבד, וכבר מגיעים אל המים.",
      "בהתחלה עצרנו ליד בריכת המשולש.",
      "אבל הילדים ידעו בדיוק לאן הם רוצים להגיע.",
      "למגלשה.",
      "המגלשה נמצאת קצת בהמשך המסלול, פשוט תמשיכו ללכת עד שתגיעו ותראו אותה (5 דק בערך).",
      "ומאותו רגע... הם לא הפסיקו להתגלש.. ולי נשאר רק להנות מהאושר שלהם.",
      "הם התגלשו פעם אחת.",
      "ואז עוד אחת.",
      "ועוד אחת.",
      "ועוד אחת.",
      "אבל מה שהיה מדהים באמת לא היה המגלשה.",
      "אלא מה שקרה מסביבה.",
      "דוד חיכה לרפאל.",
      "רפאל בדק שדוד כבר יצא מהמים.",
      "הם עזרו אחד לשני לטפס חזרה.",
      "המתינו בסבלנות בתור.",
      "עודדו אחד את השני.",
      "שמרו אחד על השני.",
      "וכל זה בלי שביקשתי.",
      "פשוט מתוך האחווה שנבנתה ביניהם.",
      "אני ישבתי בצל, הסתכלתי עליהם ונהניתי לראות איך הטבע עושה את מה ששום מסך לא יכול לעשות.",
      "אני תמיד נותנת לילדים שלי עצמאות.",
      "אבל עם דבר אחד אני לא מתפשרת.",
      "העיניים שלי תמיד עליהם.",
      "אין כאן מציל.",
      "יש זרם מים.",
      "ויש אחריות.",
      "בעיניי, השילוב בין חופש לבין אחריות הוא אחת המתנות הכי גדולות שאנחנו יכולים לתת לילדים שלנו.",
      "זאת בדיוק הסיבה שאני כל כך אוהבת לטייל איתם.",
      "עצמאות לא נוצרת כשאנחנו עושים בשביל הילדים.",
      "היא נוצרת כשאנחנו סומכים עליהם, מלווים אותם ומאפשרים להם לנסות בעצמם.",
      "הטבע פשוט נותן לזה מקום לקרות.",
    ],
    cost: [
      { label: "כניסה", value: "חינם" },
      { label: "חניה", value: "חניה מסודרת סמוך לנחל, ללא תשלום (kkl.org.il)" },
      { label: "משך בילוי", value: "שעה עד כמה שעות" },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "מאוד" },
      { label: "נגיש לעגלות", value: "כן" },
      { label: "זמן ביקור", value: "שעה עד כמה שעות" },
    ],
    gettingThere: {
      parking:
        "יש חניה מסודרת. לעין מגדל ב-Waze: \"פארק המעיינות\".",
      walking: "5 דקות למים. עוד כ-2 דקות למגלשה.",
      notes: [
        "אפשר להגיע גם דרך פארק המעיינות וגם דרך חניון בריכת הקיבוצים.",
      ],
    },
    faq: [
      {
        question: "האם מתאים לעגלות?",
        answer: "כן. ניתן לטייל במתחם עם עגלות, ובפארק יש שבילים מונגשים (kkl.org.il).",
      },
      {
        question: "כמה עולה כניסה?",
        answer: "הכניסה והחניה ללא תשלום (kkl.org.il).",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש חניה מסודרת סמוך לנחל.",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer: "שעה עד כמה שעות, לפי הקצב והעונה.",
      },
      {
        question: "האם יש מציל?",
        answer: "לא. יש זרם מים ויש אחריות הורית - חשוב לפקח על הילדים.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "המקום אהוב מאוד ולכן כמעט תמיד תפגשו בו עוד משפחות. יש מספיק מקום לכולם, והאווירה בדרך כלל נעימה ומשפחתית.",
      },
    ],
    tips: [
      "המקום אהוב ולכן בדרך כלל יש משפחות נוספות.",
      "הביאו נעלי מים.",
      "יש מקום לכולם.",
      "הביאו ציוד ליום שלם.",
      "תנו לילדים עצמאות אך שמרו על קשר עין.",
      "אין מציל.",
    ],
    gallery: [
      { src: "/images/places/north/נחל הקיבוצים/IMG_3513.jpeg", label: "מים צלולים בנחל הקיבוצים" },
      { src: "/images/places/north/נחל הקיבוצים/IMG_3625.jpeg", label: "בריכות טבעיות בנחל הקיבוצים" },
      { src: "/images/places/north/נחל הקיבוצים/IMG_3639.jpeg", label: "המגלשה הטבעית בנחל הקיבוצים" },
      { src: "/images/places/north/נחל הקיבוצים/IMG_3643.jpeg", label: "נחל הקיבוצים בעמק המעיינות" },
    ],
    gallerySubtitle: "",
    nearbyTripSlugs: ["ein-moda"],
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "nchl-hsy",
    title: "נחל האסי",
    subtitle:
      "מים צלולים, קפיצות למים, אומץ קטן שהופך לעצמאות - ואחד המקומות האהובים עליי בכל הארץ.",
    region: "צפון",
    category: "טיול מים",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "easy-trails", "picnic", "nature-shade"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["water-friendly", "shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        "kfar-saba": "1h-plus",
        raanana: "1h-plus",
        "hod-hasharon": "1h-plus",
        herzliya: "1h-plus",
        netanya: "1h-plus",
        haifa: "1h-plus",
        modiin: "1h-plus",
        ramla: "1h-plus",
        lod: "1h-plus",
      },
    },
    location: {
      lat: 32.505265,
      lng: 35.452479,
      label: "החוף הירוק - חניה",
      wazeUrl:
        "https://waze.com/ul?q=%D7%94%D7%97%D7%95%D7%A3%20%D7%94%D7%99%D7%A8%D7%95%D7%A7%20-%20%D7%97%D7%A0%D7%99%D7%94&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=32.505265%2C35.452479",
    },
    seoTitle:
      "נחל האסי - אחד ממקומות הרחצה היפים בישראל | בשביל הלב",
    metaDescription:
      "נחל האסי הוא אחד ממקומות הרחצה האהובים בעמק המעיינות - מים צלולים, קפיצות למים, חוויה מושלמת למשפחות וסיפור אישי שהתחיל את המסע של \"בשביל הלב\".",
    heroImage: "/images/places/north/נחל האסי/hero.jpeg",
    heroImageLabel: "תמונת רקע - נחל האסי",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/נחל האסי/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%94%D7%97%D7%95%D7%A3%20%D7%94%D7%99%D7%A8%D7%95%D7%A7%20-%20%D7%97%D7%A0%D7%99%D7%94&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32.505265%2C35.452479",
    highlights: [
      "משפחות עם ילדים",
      "מים",
      "עמק המעיינות",
      "רחצה",
      "טיול קיץ",
      "פיקניק",
    ],
    about: [
      "יש מקומות שפשוט אי אפשר להפסיק לחזור אליהם.",
      "נחל האסי הוא בדיוק מקום כזה.",
      "מים צלולים בצבע טורקיז, מרחבים פתוחים, נקודות קפיצה למים, עצים שמספקים צל ואווירה שפשוט גורמת לרצות להישאר.",
      "האסי הוא חלק ממערכת המעיינות של עמק המעיינות, ומימיו נשארים קרירים ונעימים כמעט לאורך כל השנה. זאת אחת הסיבות שכל כך הרבה משפחות אוהבות להגיע לכאן שוב ושוב.",
      "המקום מתאים למי שרוצה להעביר כמה שעות של כיף במים, אבל גם למי שמחפש פשוט לשבת, לנשום ולהסתכל על מים צלולים ומרחב טבע מדהים.",
    ],
    personalStory: [
      "יש לי הרבה זיכרונות מנחל האסי.",
      "אבל אחד מהם שינה לי את החיים.",
      "זאת הייתה הפעם הראשונה שהחלטתי לצאת לטייל לגמרי לבד עם שני הילדים.",
      "בלי משפחה.",
      "בלי חברים.",
      "רק אני, הם והטבע.",
      "אני זוכרת את עצמי נוסעת לשם עם אינספור חששות.",
      "איך אסתדר?",
      "מה יקרה אם אחד יבכה?",
      "אם אצטרך להרים את שניהם?",
      "אם משהו ישתבש?",
      "אבל החלטתי פשוט לנסות.",
      "והיום אני יכולה להגיד לכם...",
      "שבדיעבד, כנראה ששם התחיל כל הסיפור של \"בשביל הלב\".",
      "אם לא הייתי עושה את הצעד הקטן הזה, אולי בכלל לא הייתי בונה את האתר הזה.",
      "באותו יום הבנתי שאני הרבה יותר מסוגלת ממה שחשבתי.",
      "והבנתי שגם הילדים שלי.",
      "באחת הפעמים שהגענו, הילדים עמדו על אחת מנקודות הקפיצה למים.",
      "בהתחלה הם רק הסתכלו.",
      "התלבטו.",
      "פחדו.",
      "אחד אמר לשני:",
      "\"אתה תקפוץ ראשון.\"",
      "והשני מיד ענה:",
      "\"לא... אתה.\"",
      "אחרי כמה דקות של מחשבות הם מצאו פתרון משלהם.",
      "הם פשוט החזיקו ידיים.",
      "הסתכלו אחד על השני.",
      "רצו יחד.",
      "וקפצו.",
      "באותו רגע כל הפחד נעלם.",
      "אחר כך הם רצו שוב.",
      "ושוב.",
      "ושוב.",
      "אני עמדתי מהצד והסתכלתי.",
      "אני תמיד נותנת להם עצמאות.",
      "אבל העיניים שלי תמיד עליהם.",
      "אין כאן מציל.",
      "יש מים.",
      "יש אחריות.",
      "ויש אמון.",
      "בעיניי, השילוב בין עצמאות לבין נוכחות הורית הוא אחת המתנות הכי גדולות שאנחנו יכולים לתת לילדים שלנו.",
      "אני לא גאה בזה שהם לא מפחדים.",
      "אני גאה בזה שהם למדו להקשיב לעצמם, להתמודד עם הפחד ולהחליט מתי הם מוכנים.",
      "לפעמים כל מה שצריך הוא אומץ לעשות את הפעם הראשונה.",
      "הפעם הראשונה לצאת לבד.",
      "הפעם הראשונה לקפוץ.",
      "הפעם הראשונה לסמוך על עצמנו.",
      "כי אחרי הפעם הראשונה...",
      "כל העולם פתאום נראה הרבה יותר אפשרי.",
    ],
    cost: [
      { label: "כניסה", value: "חינם, ללא רישום מראש (nir-david.co.il)" },
      { label: "חניה", value: "חניה חינמית (nir-david.co.il)" },
      { label: "משך בילוי", value: "שעתיים עד יום שלם" },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "בהחלט" },
      { label: "נגיש לעגלות", value: "כן" },
      { label: "זמן ביקור", value: "שעתיים עד יום שלם" },
    ],
    gettingThere: {
      parking: "יש חניה מסודרת.",
      walking: "כ-5 דקות מהחניה.",
      notes: [
        "יש רחבת צל אחת מרכזית.",
        "בסופי שבוע המקום עמוס.",
        "אסור מנגל.",
        "אסור רמקולים.",
        "אסור קמפינג.",
        "המקום סגור בשבת.",
        "הכניסה למים מסתיימת בשעה 16:30.",
        "האתר נסגר ב-17:00.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer:
          "כן. זה אחד ממקומות הרחצה המשפחתיים האהובים בעמק המעיינות.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer: "כן, הגישה לאזור הרחצה המרכזי נוחה יחסית.",
      },
      {
        question: "האם אפשר להיכנס למים?",
        answer: "כן. זאת אחת האטרקציות המרכזיות במקום.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן.",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer: "בין שעתיים ליום שלם.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "באביב, בקיץ ובתחילת הסתיו. בקיץ מומלץ להגיע מוקדם בבוקר.",
      },
    ],
    tips: [
      "בדקו מקומות נוספים באזור.",
      "בקיץ - הגיעו מוכנים לחום.",
      "הביאו הרבה מים, אוכל ונעלי מים.",
      "מומלץ להביא מתנפחים לילדים.",
      "יש גשרים לקפיצה למים - הכינו את הילדים מראש.",
    ],
    gallery: [
      { src: "/images/places/north/נחל האסי/IMG_1972.jpeg", label: "נחל האסי - החוף הירוק" },
      { src: "/images/places/north/נחל האסי/IMG_6233.JPG", label: "רחצה בנחל האסי" },
      { src: "/images/places/north/נחל האסי/IMG_6250 3.JPG", label: "נחל האסי בעמק המעיינות" },
    ],
    gallerySubtitle: "",
    nearbyTripSlugs: ["nchl-hkybvtzym", "ein-moda"],
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "chvrsht-gdvnh",
    title: "חורשת גדעונה",
    subtitle:
      "עצירת מים קטנה ומתוקה בדרך לצפון או בחזרה הביתה",
    region: "צפון",
    category: "טיול מים",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "easy-trails", "picnic", "nature-shade"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["water-friendly", "shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        haifa: "1h",
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
      lat: 32.457028,
      lng: 35.456389,
      label: "חורשת גדעון - בריכת גדעונה",
      wazeUrl:
        "https://waze.com/ul?q=%D7%91%D7%A8%D7%99%D7%9B%D7%AA%20%D7%92%D7%93%D7%A2%D7%95%D7%A0%D7%94&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=32.457028%2C35.456389",
    },
    seoTitle:
      "חורשת גדעונה - עצירת מים קסומה בדרך לצפון | בשביל הלב",
    metaDescription:
      "חורשת גדעונה היא פינת טבע קטנה בעמק יזרעאל עם מים רדודים, צל ועצירת התרעננות מושלמת למשפחות בדרך לצפון או בחזרה הביתה.",
    heroImage: "/images/places/north/חורשת גדעונה/hero.jpeg",
    heroImageLabel: "תמונת רקע - חורשת גדעונה",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/חורשת גדעונה/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%91%D7%A8%D7%99%D7%9B%D7%AA%20%D7%92%D7%93%D7%A2%D7%95%D7%A0%D7%94&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32.457028%2C35.456389",
    about: [
      "יש מקומות שלא חייבים לבלות בהם יום שלם כדי ליהנות מהם.",
      "חורשת גדעונה היא בדיוק מקום כזה.",
      "בפעם הראשונה שהגעתי לכאן זה היה בדרך חזרה מהצפון.",
      "רק רציתי לעצור לעוד נשימה אחת של טבע לפני שחוזרים לשגרה.",
      "בפעם השניה - בדרך ל-צפון. עצירה קטנה והתמלאות לפני שמגיעים אל היעד.",
      "המקום קטן, שקט ופשוט.",
      "יש בו פלג מים רדוד שאפשר לשכשך בו את הרגליים, עצים שמספקים צל ואווירה נעימה של טבע.",
      "זה לא המקום שהייתי נוסעת אליו במיוחד מקצה הארץ, אבל אם אתם כבר מטיילים באזור עמק יזרעאל או בדרך לצפון - זאת עצירה מקסימה להתרעננות.",
      "בחלק מהימים פועלת במקום גם עגלת קפה, מה שהופך את העצירה לעוד יותר כיפית.",
      "בסופי שבוע ובחגים המקום יכול להיות עמוס, ולכן אם אתם מחפשים שקט - כדאי להגיע מוקדם.",
    ],
    personalStory: [
      "אני מאוד אוהבת לעצור במקומות כאלה.",
      "לא כי הם גדולים.",
      "לא כי יש בהם אטרקציות.",
      "אלא דווקא בגלל הפשטות שלהם.",
      "כמה דקות של מים.",
      "קצת צל.",
      "נשימה עמוקה.",
      "והילדים כבר שוכחים כמה זמן הם היו באוטו.",
      "גם כאן הם מיד חלצו נעליים ונכנסו למים.",
      "לא צריך יותר מזה.",
      "לפעמים דווקא העצירות הקטנות באמצע הדרך הן אלה שנותנות לנו את הכוחות להמשיך לטייל.",
      "וזה בדיוק מה שחורשת גדעונה בשבילי.",
      "לא כל עצירה חייבת להיות יעד.",
      "לפעמים היא פשוט הפסקה טובה בדרך.",
      "וגם זה מספיק.",
    ],
    cost: [
      { label: "כניסה", value: "חינם" },
      { label: "חניה", value: "רחבת חניה סלולה (kkl.org.il)" },
      { label: "משך בילוי", value: "30 דקות עד שעה" },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "כן" },
      { label: "נגיש לעגלות", value: "חלקי" },
      { label: "זמן ביקור", value: "30 דקות עד שעה" },
    ],
    gettingThere: {
      parking: "יש רחבת חניה מסודרת ונגישה.",
      walking: "כ-5-10 דקות, בהתאם לשביל שבו בוחרים.",
      notes: [
        "המקום קטן יחסית ועלול להיות עמוס בסופי שבוע ובחגים.",
        "המים רדודים.",
        "יש עגלת קפה סמוכה - מומלץ לבדוק שעות פעילות.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer: "כן. המים רדודים ומתאימים לשכשוך ולהתרעננות.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer:
          "חלקי. יש חניה ושולחן פיקניק נגישים, אך הירידה אל המים דורשת מעט זהירות.",
      },
      {
        question: "כמה עולה כניסה?",
        answer: "הכניסה חינמית.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש שתי רחבות חניה סמוך למסלול (kkl.org.il).",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer: "בין 30 דקות לשעה.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "בימי חול ובשעות הבוקר המוקדמות לשקט. בסופי שבוע ובחגים המקום עלול להיות עמוס.",
      },
    ],
    tips: [
      "אם אתם בדרך לצפון או בדרך חזרה - שווה לעצור לחצי שעה.",
      "מקום נהדר לפיקניק קצר והתרעננות.",
    ],
    highlights: [
      "משפחות עם ילדים",
      "עצירה בדרך",
      "אוהבי מים",
      "פיקניק קצר",
      "טיול קל",
      "קיץ",
    ],
    gallery: [
      { src: "/images/places/north/חורשת גדעונה/IMG_0366.jpeg", label: "מים רדודים בחורשת גדעונה" },
      { src: "/images/places/north/חורשת גדעונה/IMG_0371.jpeg", label: "פלג מים בחורשת גדעונה" },
      { src: "/images/places/north/חורשת גדעונה/IMG_6405.jpeg", label: "חורשת גדעונה בעמק יזרעאל" },
      { src: "/images/places/north/חורשת גדעונה/IMG_6408.jpeg", label: "צל וטבע בחורשת גדעונה" },
    ],
    gallerySubtitle: "",
    nearbyTripSlugs: ["nchl-hsy", "nchl-hkybvtzym"],
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "shmvrt-tb-gml",
    title: "שמורת טבע גמלא",
    subtitle:
      "מצוקי בזלת אדירים, תצפיות עוצרות נשימה, מושבת הנשרים הגדולה בישראל ואחד המסלולים המרשימים בצפון.",
    region: "צפון",
    category: "תצפית",
    visitedByMilana: true,
    matcher: {
      activities: ["viewpoint", "easy-trails", "nature-shade"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: 31,
      weatherTraits: ["shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        "kfar-saba": "1h-plus",
        raanana: "1h-plus",
        "hod-hasharon": "1h-plus",
        herzliya: "1h-plus",
        netanya: "1h-plus",
        haifa: "1h-plus",
        modiin: "1h-plus",
        ramla: "1h-plus",
        lod: "1h-plus",
      },
    },
    location: {
      lat: 32.90428,
      lng: 35.74194,
      label: "שמורת טבע גמלא",
      wazeUrl:
        "https://waze.com/ul?q=%D7%A9%D7%9E%D7%95%D7%A8%D7%AA%20%D7%98%D7%91%D7%A2%20%D7%92%D7%9E%D7%9C%D7%90&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=32.90428%2C35.74194",
    },
    seoTitle:
      "שמורת הטבע גמלא - תצפית הנשרים ומסלול למשפחות | בשביל הלב",
    metaDescription:
      "שמורת הטבע גמלא היא אחת השמורות המרשימות בישראל - תצפיות עוצרות נשימה, מושבת נשרים, היסטוריה מרתקת ומסלול נגיש לכל המשפחה.",
    heroImage: "/images/places/north/שמורת טבע גמלא/hero.jpeg",
    heroImageLabel: "תמונת רקע - שמורת הטבע גמלא",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/שמורת טבע גמלא/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%A9%D7%9E%D7%95%D7%A8%D7%AA%20%D7%98%D7%91%D7%A2%20%D7%92%D7%9E%D7%9C%D7%90&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32.90428%2C35.74194",
    highlights: [
      "אתם אוהבים תצפיות עוצמתיות.",
      "אתם אוהבים טבע והיסטוריה.",
      "משפחות שמחפשות מסלול קצר עם נוף יוצא דופן.",
      "מטיילים באזור רמת הגולן.",
    ],
    about: [
      "אם הייתם שואלים אותי איפה נמצאת אחת התצפיות הכי מרשימות בארץ - כנראה שהייתי שולחת אתכם ישר לגמלא.",
      "יש כאן שילוב שקשה להסביר במילים.",
      "מצוקים עצומים.",
      "נוף אינסופי של רמת הגולן.",
      "אוויר הרים צלול.",
      "והאפשרות לראות נשרים דואים ממש מעל הראש.",
      "אבל גמלא היא לא רק טבע.",
      "זה גם אחד האתרים ההיסטוריים החשובים בישראל.",
      "כאן שכנה העיר היהודית העתיקה גמלא, שנחרבה במהלך המרד הגדול ברומאים במאה הראשונה לספירה. עד היום אפשר לראות את שרידי העיר, בית הכנסת העתיק ואת סיפור הגבורה של תושביה.",
      "השמורה משלבת טבע, היסטוריה ונוף בצורה פשוט נדירה.",
    ],
    personalStory: [
      "הגענו לשמורה והתחלנו את המסלול הנגיש.",
      "כבר מהצעדים הראשונים היה ברור שהגענו למקום מיוחד.",
      "הנוף פשוט עוצר את הנשימה.",
      "אבל אני רוצה לשתף אתכם דווקא במשהו אחר.",
      "לא הכול תמיד מושלם.",
      "דווקא באותו יום, דווקא במקום שכל כך חיכיתי להגיע אליו, היה לי ולדוד חוסר הסכמה.",
      "הוא כעס.",
      "בכה.",
      "צעק.",
      "וחצי מהמסלול עבר בתחושות לא פשוטות.",
      "לרגע הרגשתי תסכול.",
      "נסענו כל כך רחוק.",
      "השקענו.",
      "רציתי שכולנו נהנה.",
      "ופתאום... שום דבר לא הולך כמו שתכננתי.",
      "ואז הסתכלתי מסביב.",
      "על המצוקים.",
      "על השקט.",
      "על הטבע.",
      "ופתאום הבנתי משהו.",
      "לטבע לא אכפת אם אנחנו שמחים או עצובים.",
      "הוא מקבל אותנו בדיוק כמו שאנחנו.",
      "עם כל הרגשות.",
      "עם כל הקושי.",
      "עם כל מה שאנחנו מביאים איתנו באותו יום.",
      "וזאת אולי אחת המתנות הכי גדולות שהטבע נותן לנו.",
      "הוא לא דורש מאיתנו להיות מושלמים.",
      "הוא פשוט נותן מקום לכל מה שאנחנו מרגישים.",
      "בסוף גם דוד נרגע.",
      "חזר לחייך.",
      "המשיך ללכת.",
      "ואני חזרתי הביתה עם תזכורת חשובה.",
      "גם ימים מורכבים יכולים להפוך לזיכרונות יפים.",
      "ושדווקא הרגעים האלה הם הזדמנות מצוינות עבורינו לעבוד על סבלנות, חמלה ורגישות.",
      "לדעת לקחת נשימה עמוקה גם שלא הכל הולך חלק להיאחז במה שטוב וכן… גם להשבר זה חלק מהדרך.",
    ],
    cost: [
      { label: "כניסה", value: "₪31 מבוגר, ₪16 ילד (parks.org.il)" },
      { label: "חניה", value: "יש חניה מסודרת" },
      { label: "משך בילוי", value: "2-3 שעות" },
    ],
    quickFacts: [
      { label: "עלות", value: "₪31 מבוגר / ₪16 ילד" },
      { label: "מתאים לילדים", value: "בהחלט" },
      { label: "נגיש לעגלות", value: "במסלול הנגיש" },
      { label: "זמן ביקור", value: "2-3 שעות" },
    ],
    gettingThere: {
      parking: "יש חניה מסודרת.",
      routeLength:
        "שביל הנשרים הוא מסלול מעגלי נגיש באורך של כ-600 מטר, עשוי בטון ובשיפוע מתון.",
      notes: [
        "מומלץ להתעדכן באתר הרשמי בשעות הפעילות.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer: "כן. המסלול הנגיש מתאים למשפחות עם ילדים.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer:
          "כן, במסלול הנגיש בלבד. שביל הנשרים מונגש למשתמשים בכסאות גלגלים, באורך כ-600 מטר ובשיפוע מתון (parks.org.il).",
      },
      {
        question: "כמה עולה כניסה?",
        answer: "₪31 למבוגר ו-₪16 לילד (parks.org.il).",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש חניה מסודרת בשמורה (parks.org.il).",
      },
      {
        question: "מה שעות הפתיחה?",
        answer:
          "שעון קיץ: א'-ה' ושבת 08:00-17:00, שישי וערבי חג 08:00-16:00. שעון חורף: א'-ה' ושבת 08:00-16:00, שישי וערבי חג 08:00-15:00. הכניסה נסגרת שעה לפני הסגירה (parks.org.il).",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer: "בין שעתיים לשלוש שעות.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "בשעות הבוקר המוקדמות, במיוחד בקיץ. יש מעט צל בשמורה - מומלץ להגיע עם כובע והרבה מים.",
      },
    ],
    tips: [
      "האזינו להסבר הקולי על המקום.",
      "קחו את הזמן מול הנוף.",
      "חפשו נשרים - משקפת תשדרג את החוויה.",
      "המסלול קצר ואינו דורש התארגנות מיוחדת.",
    ],
    closingNote:
      "לא כל טיול חייב להיות מושלם כדי להיות משמעותי. לפעמים דווקא ההתמודדות היא זאת שנשארת איתנו. הטבע לימד אותי שגם לרגשות פחות נעימים יש מקום. וגם הם חלק מהדרך.",
    gallery: [
      { src: "/images/places/north/שמורת טבע גמלא/IMG_8814.jpeg", label: "מצוקי בזלת בשמורת גמלא" },
      { src: "/images/places/north/שמורת טבע גמלא/IMG_8823.jpeg", label: "שביל הנשרים בשמורת גמלא" },
      { src: "/images/places/north/שמורת טבע גמלא/IMG_8833.jpeg", label: "תצפית בשמורת הטבע גמלא" },
      { src: "/images/places/north/שמורת טבע גמלא/IMG_8843.jpeg", label: "נוף עוצר נשימה בגמלא" },
      { src: "/images/places/north/שמורת טבע גמלא/IMG_8844.jpeg", label: "שמורת גמלא - רמת הגולן" },
      { src: "/images/places/north/שמורת טבע גמלא/IMG_8847.jpeg", label: "מצוקים בשמורת הטבע גמלא" },
      { src: "/images/places/north/שמורת טבע גמלא/IMG_8848.jpeg", label: "תצפית הנשרים בגמלא" },
      { src: "/images/places/north/שמורת טבע גמלא/IMG_8850.jpeg", label: "שמורת הטבע גמלא עם הילדים" },
      { src: "/images/places/north/שמורת טבע גמלא/IMG_8854.jpeg", label: "נוף אינסופי משמורת גמלא" },
    ],
    gallerySubtitle: "",
    nearbyTripSlugs: ["shmvrt-tb-bnys", "mpl-tnvr-gbvl-lbnvn"],
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "myyn-chrvd",
    title: "עין חרוד",
    subtitle:
      "מעיין גדול וצלול למרגלות הרי הגלבוע, עם מים קרירים, מדשאות רחבות, צל טבעי ואחד המקומות הכי מושלמים למשפחות עם ילדים.",
    region: "צפון",
    category: "טיול מים",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "viewpoint", "camping", "easy-trails", "picnic", "nature-shade"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: 40,
      weatherTraits: ["water-friendly", "shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        "kfar-saba": "1h-plus",
        raanana: "1h-plus",
        "hod-hasharon": "1h-plus",
        herzliya: "1h-plus",
        netanya: "1h-plus",
        haifa: "1h",
        modiin: "1h-plus",
        ramla: "1h-plus",
        lod: "1h-plus",
      },
    },
    location: {
      lat: 32.443056,
      lng: 35.394722,
      label: "גן לאומי מעיין חרוד",
      wazeUrl:
        "https://waze.com/ul?q=%D7%92%D7%9F%20%D7%9C%D7%90%D7%95%D7%9E%D7%99%20%D7%9E%D7%A2%D7%99%D7%99%D7%9F%20%D7%97%D7%A8%D7%95%D7%93&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=32.443056%2C35.394722",
    },
    seoTitle: "עין חרוד - מעיין מושלם למשפחות עם ילדים | בשביל הלב",
    metaDescription:
      "עין חרוד הוא אחד ממקומות הרחצה היפים בצפון - מים צלולים, בריכות רדודות, צל טבעי ונוף מרהיב של הרי הגלבוע. מושלם למשפחות עם ילדים.",
    heroImage: "/images/places/north/מעיין חרוד/IMG_1868.jpeg",
    heroImageLabel: "תמונת רקע - עין חרוד",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/מעיין חרוד/IMG_1868.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%92%D7%9F%20%D7%9C%D7%90%D7%95%D7%9E%D7%99%20%D7%9E%D7%A2%D7%99%D7%99%D7%9F%20%D7%97%D7%A8%D7%95%D7%93&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32.443056%2C35.394722",
    highlights: [
      "משפחות עם ילדים קטנים.",
      "מי שמחפש יום מים רגוע.",
      "פיקניק בטבע.",
      "מטיילים באזור הגלבוע ועמק המעיינות.",
    ],
    about: [
      "אם יש מקום אחד שאני יכולה להמליץ עליו למשפחות עם ילדים קטנים - עין חרוד בהחלט נמצא ברשימה.",
      "המעיין נובע למרגלות הרי הגלבוע, והנוף מסביב פשוט מרהיב.",
      "מים צלולים בגווני טורקיז, בריכות רדודות שמתאימות לילדים, עצים גדולים שמספקים צל כמעט לאורך כל היום ומרחבים שפשוט כיף להיות בהם.",
      "זה מסוג המקומות שאפשר לעצור בהם לשעתיים...",
      "ובסוף למצוא את עצמכם נשארים כמעט יום שלם.",
      "וכן יש פה גם אפשרות לקאמפינג….",
      "יש כאן שילוב מושלם של טבע, מים ונוחות למשפחות.",
      "אפשר להגיע לפיקניק, ליום מים או אפילו לשלב את המקום כחלק מטיול ארוך יותר בצפון.",
    ],
    personalStory: [
      "בדרך לטיול של כמה ימים בצפון עצרנו בעין חרוד.",
      "הגענו באמצע השבוע, והמקום היה כמעט ריק.",
      "הכול עמד לרשותנו.",
      "המים.",
      "העצים.",
      "השקט.",
      "והנוף המדהים של הרי הגלבוע.",
      "הילדים ישר התחילו לדלג בין הבריכות, להיכנס למים ולגלות עוד ועוד פינות קטנות.",
      "זה בדיוק מסוג המקומות שנותנים לילדים המון עצמאות.",
      "המים רדודים יחסית, המעברים קצרים, והם פשוט הרגישו חופשיים.",
      "אבל דווקא שם קרה משהו שלא ציפיתי לו.",
      "למרות שהם כבר יודעים להסתדר לבד...",
      "הם ביקשו שאכנס איתם למים.",
      "לא כי הם היו חייבים.",
      "לא כי פחדו.",
      "פשוט כי הם רצו אותי לידם.",
      "נכנסתי.",
      "גם כשהמים היו קרים.",
      "גם כשכבר ממש רציתי לשבת רגע בצד.",
      "שיחקנו יחד.",
      "עברנו בין הבריכות.",
      "צחקנו.",
      "ורק אחרי שהם הרגישו בטוחים ומלאים, הם המשיכו לשחק לבד.",
      "ואני ישבתי בצד, הסתכלתי עליהם וחייכתי.",
      "באותו רגע הבנתי עוד משהו על ילדים.",
      "לפעמים הם לא צריכים שנפתור להם בעיות.",
      "לא צריכים שנכוון אותם.",
      "הם פשוט צריכים לדעת שאנחנו איתם.",
      "וכשהלב שלהם מתמלא...",
      "הם כבר יודעים להמשיך לבד.",
    ],
    cost: [
      { label: "כניסה", value: "₪40 מבוגר, ₪25 ילד (parks.org.il)" },
      { label: "חניה", value: "יש חניה מסודרת" },
      { label: "משך בילוי", value: "שעתיים עד יום שלם" },
    ],
    quickFacts: [
      { label: "עלות", value: "₪40 מבוגר / ₪25 ילד" },
      { label: "מתאים לילדים", value: "מאוד" },
      { label: "נגיש לעגלות", value: "כן" },
      { label: "זמן ביקור", value: "שעתיים עד יום שלם" },
    ],
    gettingThere: {
      parking: "יש חניה מסודרת.",
      walking: "שבילי בטון מונגשים.",
      notes: [
        "ניתן ללון בחניון הלילה.",
        "מומלץ לבדוק מראש מחירים באתר רשות הטבע והגנים.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer: "כן. זה אחד המקומות המושלמים למשפחות עם ילדים קטנים.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer:
          "כן. באזור הנופש הונגשו חניה, שבילי בטון, בריכות השכשוך, פינות פיקניק ושירותים (parks.org.il).",
      },
      {
        question: "כמה עולה כניסה?",
        answer: "₪40 למבוגר ו-₪25 לילד (parks.org.il).",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש חניה מסודרת בגן הלאומי (parks.org.il).",
      },
      {
        question: "מה שעות הפתיחה?",
        answer:
          "שעון קיץ: א'-ה' ושבת 08:00-17:00, שישי וערבי חג 08:00-16:00. שעון חורף: א'-ה' ושבת 08:00-16:00, שישי וערבי חג 08:00-15:00. הכניסה נסגרת שעה לפני הסגירה (parks.org.il).",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer: "בין שעתיים ליום שלם.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "באמצע השבוע לשקט. בקיץ מומלץ להגיע מוקדם בבוקר.",
      },
      {
        question: "האם אפשר לקמפ בגן?",
        answer:
          "כן. יש חניון לילה בגן הלאומי, בתיאום והזמנה מראש (parks.org.il).",
      },
    ],
    tips: [
      "אם אפשר - הגיעו באמצע השבוע.",
      "שלבו עוד טיולים באזור.",
    ],
    closingNote:
      "עצמאות לא מתחילה מזה שאנחנו מתרחקים. היא מתחילה מזה שאנחנו מספיק קרובים כדי לאפשר לזה לקרות. אנחנו הם הרשת ביטחון שלהם בכל סיטואציה ובכל זמן בחיים. ושהם מרגישים את הביטחון הזה - הם מצליחים לשחרר",
    gallery: [
      { src: "/images/places/north/מעיין חרוד/hero.jpeg", label: "עין חרוד - בריכות טבעיות" },
      { src: "/images/places/north/מעיין חרוד/IMG_1866.jpeg", label: "מים צלולים בעין חרוד" },
      { src: "/images/places/north/מעיין חרוד/IMG_1882.jpeg", label: "בריכות רדודות בעין חרוד" },
      { src: "/images/places/north/מעיין חרוד/IMG_1886.jpeg", label: "עין חרוד למרגלות הרי הגלבוע" },
      { src: "/images/places/north/מעיין חרוד/IMG_1891.jpeg", label: "צל טבעי בגן לאומי מעיין חרוד" },
      { src: "/images/places/north/מעיין חרוד/IMG_1901.jpeg", label: "יום מים משפחתי בעין חרוד" },
    ],
    gallerySubtitle: "",
    nearbyTripSlugs: ["chvrsht-gdvnh", "nchl-hsy", "ein-moda"],
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "gny-chvgh",
    title: "גני חוגה",
    subtitle:
      "בריכות טבעיות, מדשאות רחבות, אזורי פיקניק, קמפינג ואחד המקומות הכי כיפיים למשפחות בעמק המעיינות.",
    region: "צפון",
    category: "טיול מים",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "camping", "easy-trails", "picnic", "nature-shade"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: 52,
      weatherTraits: ["water-friendly", "shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        "kfar-saba": "1h-plus",
        raanana: "1h-plus",
        "hod-hasharon": "1h-plus",
        herzliya: "1h-plus",
        netanya: "1h-plus",
        haifa: "1h-plus",
        modiin: "1h-plus",
        ramla: "1h-plus",
        lod: "1h-plus",
      },
    },
    location: {
      lat: 32.445833,
      lng: 35.523611,
      label: "גני חוגה",
      wazeUrl:
        "https://waze.com/ul?q=%D7%92%D7%A0%D7%99%20%D7%97%D7%95%D7%92%D7%94&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=32.445833%2C35.523611",
    },
    seoTitle:
      "גני חוגה - פארק מים טבעי למשפחות בעמק המעיינות | בשביל הלב",
    metaDescription:
      "גני חוגה הוא פארק מים טבעי בעמק המעיינות עם בריכות צלולות, אזורי פיקניק, קמפינג ואווירה מושלמת למשפחות עם ילדים.",
    heroImage: "/images/places/north/גני חוגה/hero.jpeg",
    heroImageLabel: "תמונת רקע - גני חוגה",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/גני חוגה/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%92%D7%A0%D7%99%20%D7%97%D7%95%D7%92%D7%94&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32.445833%2C35.523611",
    highlights: [
      "משפחות עם ילדים.",
      "מי שמחפש יום מים רגוע.",
      "פיקניק בטבע.",
      "קמפינג משפחתי.",
      "מטיילים באזור עמק המעיינות.",
    ],
    about: [
      "יש מקומות שאפשר לקפוץ אליהם על הדרך, ויש מקומות שפשוט שווה להישאר בהם.",
      "גני חוגה הוא בדיוק מקום כזה.",
      "אם תשאלו אותי - לגמרי שווה לנסוע אליו במיוחד כדי להעביר בו כמה שעות טובות, ואפילו סוף שבוע שלם.",
      "המקום מסודר, מותאם למשפחות ולמטיילים, ותמצאו בו שולחנות פיקניק, מדשאות, שירותים ומקלחות מסודרים, אזור קמפינג, קיוסק וכל מה שצריך כדי להעביר יום שלם בכיף.",
      "גני חוגה הוא פארק טבעי עם מספר בריכות שמוזנות ממי מעיינות צלולים, מדשאות רחבות, עצים שמספקים צל ואווירה רגועה שפשוט גורמת לרצות להישאר.",
      "הבריכות בנויות בעומקים שונים, כך שגם ילדים קטנים וגם ילדים גדולים יכולים ליהנות מהמים בצורה שמתאימה להם.",
    ],
    personalStory: [
      "הגענו לגני חוגה כחלק מטיול של כמה ימים בצפון.",
      "מצאנו לנו פינה מוצלת תחת אחד העצים, פרשנו את הדברים ונכנסנו ישר למים.",
      "עברנו מבריכה לבריכה, ופשוט נהנינו.",
      "זה מסוג המקומות שאפשר, בהתאם לגיל הילדים, לתת להם קצת יותר עצמאות. כמובן תמיד עם עיניים פקוחות, הקשבה והשגחה, אבל בהחלט מקום שמאפשר להם לחקור, לשחק ולהרגיש חופשיים.",
      "אחת הבריכות מותאמת במיוחד לפעוטות, עם מים רדודים ומגלשת מים קטנה ופשוטה. נכון, היא לא פארק מים ענק... אבל מים הם מים, ומגלשה היא מגלשה - ובשביל ילדים זה כל מה שצריך כדי להיות מאושרים.",
      "אבל מעבר לכל זה, יש משהו במים טבעיים שפשוט אי אפשר להסביר.",
      "גם בריכה רגילה היא כיף... אבל מים שנובעים מהאדמה מרגישים אחרת.",
      "יש בהם משהו שמרגיע, מנקה ומחבר.",
      "אולי בגלל שהם חלק מהטבע.",
      "אולי בגלל שהם כאן הרבה לפנינו ויישארו גם אחרינו.",
      "מבחינתי, כל פעם שאני נכנסת למעיין טבעי אני מרגישה שאני מתחברת מחדש למקום הטבעי שלנו כבני אדם.",
      "וזאת תחושה שקשה מאוד להסביר במילים.",
      "חשוב לי לעצור כאן לרגע.",
      "אנחנו הגענו בסוף חודש יולי, והחום היה כבד מאוד.",
      "גם כשאנחנו מטיילים במקומות הכי יפים בארץ - אנחנו חייבים להקשיב לטבע.",
      "רוב הבריכות אינן מוצלות (מלבד בריכת הפעוטות), לכן חשוב להגיע מוכנים - הרבה מים, כובע, קרם הגנה, הפסקות בצל ושיקול דעת.",
      "נכון שהמים מרעננים ומקררים את הגוף, אבל שהייה ממושכת תחת השמש בעמק המעיינות דורשת אחריות ותשומת לב.",
    ],
    cost: [
      { label: "כניסה", value: "₪52 לאורח לבילוי יום (huga.co.il)" },
      { label: "חניה", value: "יש חניה מסודרת" },
      { label: "משך בילוי", value: "חצי יום עד יום שלם" },
    ],
    quickFacts: [
      { label: "עלות", value: "₪52 לאורח" },
      { label: "מתאים לילדים", value: "בהחלט" },
      { label: "נגיש לעגלות", value: "כן" },
      { label: "זמן ביקור", value: "חצי יום עד יום שלם" },
    ],
    gettingThere: {
      parking: "יש חניה מסודרת.",
      notes: [
        "ניתן ללון באתר.",
        "מומלץ לבדוק מראש את שעות הפעילות המעודכנות.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer:
          "כן. יש מספר בריכות בעומקים שונים, כולל אזור שמתאים במיוחד לפעוטות.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer: "כן.",
      },
      {
        question: "האם אפשר להיכנס למים?",
        answer: "כן. הרחצה מותרת בבריכות.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש חניה מסודרת למבקרים.",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer:
          "לפחות חצי יום, ורבים בוחרים להעביר כאן יום שלם ואף ללון בקמפינג.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "באביב, בקיץ ובתחילת הסתיו. בקיץ מומלץ להגיע מוקדם.",
      },
      {
        question: "כמה עולה כניסה?",
        answer: "₪52 לאורח לבילוי יום (huga.co.il).",
      },
      {
        question: "מה שעות הפתיחה?",
        answer:
          "בעונת האביב והסתיו: א'-ו' 09:00-17:00, שבת 08:00-17:00. בקיץ: א'-ו' 09:00-18:00, שבת 08:00-18:00. נובמבר-פברואר הפארק סגור. הרחצה מסתיימת שעה לפני הסגירה (huga.co.il).",
      },
      {
        question: "האם אפשר לקמפ בפארק?",
        answer:
          "כן. יש אזור קמפינג עם כניסה החל מהשעה 15:00 (huga.co.il). מומלץ לבדוק מראש ביומן הפארק.",
      },
    ],
    tips: [
      "הביאו נעלי מים שאפשר ללכת איתן גם מחוץ למים וגם בתוך הבריכות.",
    ],
    closingNote:
      "יש מקומות שמלמדים אותנו להספיק עוד. ויש מקומות שמלמדים אותנו פשוט להיות. בשבילי גני חוגה הוא בדיוק המקום הזה. הטבע מלמד אותנו קצב אחר. לא למהר. לא להספיק. פשוט להיות. להיות קשובים לעצמנו, לילדים שלנו ולטבע שסביבנו.",
    gallery: [
      { src: "/images/places/north/גני חוגה/IMG_2003.jpeg", label: "בריכות טבעיות בגני חוגה" },
      { src: "/images/places/north/גני חוגה/IMG_2020.jpeg", label: "גני חוגה - פארק מים בעמק המעיינות" },
      { src: "/images/places/north/גני חוגה/IMG_2021.jpeg", label: "יום מים משפחתי בגני חוגה" },
    ],
    gallerySubtitle: "",
    nearbyTripSlugs: ["myyn-chrvd", "nchl-hkybvtzym", "nchl-hsy"],
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "rsh-hnkrh",
    title: "ראש הנקרה",
    subtitle:
      "מפגש מרהיב בין מצוקי הגיר הלבנים של הגליל המערבי לבין הים התיכון - אחד מאתרי הטבע היפים והמיוחדים בישראל.",
    region: "צפון",
    category: "תצפית",
    visitedByMilana: true,
    matcher: {
      activities: ["viewpoint", "easy-trails", "nature-shade"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: 47,
      weatherTraits: ["shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        haifa: "1h",
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
      lat: 33.089167,
      lng: 35.104167,
      label: "ראש הנקרה",
      wazeUrl:
        "https://waze.com/ul?q=%D7%A8%D7%90%D7%A9%20%D7%94%D7%A0%D7%A7%D7%A8%D7%94&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=33.089167%2C35.104167",
    },
    seoTitle:
      "ראש הנקרה - המערות הימיות היפות בישראל | בשביל הלב",
    metaDescription:
      "ראש הנקרה הוא אחד מאתרי הטבע המרשימים בישראל - מערות ימיות, מצוקי גיר לבנים, נוף עוצר נשימה בגליל המערבי וחוויה מושלמת למשפחות.",
    heroImage: "/images/places/north/ראש הנקרה/hero.jpeg",
    heroImageLabel: "תמונת רקע - ראש הנקרה",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/ראש הנקרה/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%A8%D7%90%D7%A9%20%D7%94%D7%A0%D7%A7%D7%A8%D7%94&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=33.089167%2C35.104167",
    highlights: [
      "משפחות עם ילדים.",
      "מטיילים בגליל המערבי.",
      "מי שאוהב טבע ונופים.",
      "מי שמחפש מקום מיוחד שגם הילדים נהנים ממנו.",
    ],
    about: [
      "יש מקומות שמספיק להסתכל עליהם פעם אחת כדי להגיד \"וואו\".",
      "ראש הנקרה הוא אחד מהם.",
      "בקצה הצפון-מערבי של ישראל, ממש על גבול לבנון, נמצאים מצוקי גיר לבנים שנשחקו במשך אלפי שנים על ידי גלי הים ויצרו מערות ימיות מרהיבות.",
      "המפגש בין הסלע הלבן לבין מי הטורקיז של הים התיכון יוצר מראה שקשה להפסיק להסתכל עליו.",
      "אם אתם זוכרים את הרכבל המפורסם של ראש הנקרה, כדאי לדעת שכשהיינו במקום הוא לא היה פעיל. במקום זאת נסענו באוטובוס פתוח של האתר, שבדרך גם סיפק הסברים מעניינים על המקום ועל ההיסטוריה שלו.",
      "מומלץ לבדוק מראש באתר הרשמי האם הרכבל פעיל בזמן הביקור שלכם.",
      "לאחר מכן נכנסנו למסלול הקצר והמסודר בין הנקרות. העיניים פשוט לא מפסיקות להתפעל מהיופי, כשמסביב נשמעים ללא הפסקה גלי הים שמתנפצים על הסלעים.",
      "זה אחד מאותם מקומות שכל תמונה שלהם יפה - אבל שום תמונה לא באמת מצליחה להעביר את העוצמה של המקום.",
    ],
    personalStory: [
      "הגענו לראש הנקרה כחלק מטיול של כמה ימים בגליל המערבי.",
      "זאת הייתה אחת התחנות שכל כך חיכיתי להגיע אליהן.",
      "אני חושבת שכמעט כל ישראלי ביקר בראש הנקרה לפחות פעם אחת בחייו - בילדות או בבגרות.",
      "יש משהו במקום הזה שהוא כל כך ישראלי ומרגש.",
      "העובדה שהוא נמצא ממש על גבול לבנון מוסיפה לו בעיניי משמעות מיוחדת. יש משהו במקומות שנמצאים על גבולות המדינה שמרגש אותי מאוד.",
      "כבר מהרגע שעמדנו מעל המצוק והסתכלנו על הים, היה ברור שהגענו למקום מיוחד.",
      "אבל מה שהכי ריגש אותי היה לראות את הילדים.",
      "הם רצו בהתלהבות, עצרו כל כמה מטרים כדי להתבונן, שאלו שאלות ופשוט התפעלו מהיופי שסביבם.",
      "אני כל כך אוהבת לראות איך הטיולים מצליחים לעורר בהם סקרנות, תשוקה והתלהבות.",
      "כי מבחינתי טיול הוא הרבה יותר מלראות מקום יפה.",
      "הוא הזדמנות לגלות, לשאול, ללמוד, להתרגש ולהתפעל מהעולם.",
      "להטמיע בילדים סקרנות, אהבה לטבע, רצון לגלות מקומות חדשים ולהבין שהעולם מלא ביופי שמחכה רק שנצא לחפש אותו.",
      "ואולי זאת בדיוק אחת המתנות הכי גדולות שאנחנו יכולים לתת להם.",
      "שימו לב - אנחנו טיילנו באזור בחודש אוגוסט.",
      "המסלול אמנם קצר יחסית, אבל כולל הליכה, מדרגות ושהייה בחוץ.",
      "לדעתי האישית לא הייתי מוותרת עליו גם בקיץ, אבל חשוב מאוד להגיע מוכנים לחום - מים, כובעים, קרם הגנה וכל מה שיעזור לכם ליהנות מהטיול בבטחה.",
    ],
    cost: [
      { label: "כניסה", value: "₪47 מבוגר ברכישה מוקדמת (rosh-hanikra.com)" },
      { label: "חניה", value: "יש חניה מסודרת" },
      { label: "משך בילוי", value: "שעתיים-שלוש" },
    ],
    quickFacts: [
      { label: "עלות", value: "₪47 מבוגר" },
      { label: "מתאים לילדים", value: "בהחלט" },
      { label: "נגיש לעגלות", value: "כן" },
      { label: "זמן ביקור", value: "2-3 שעות" },
    ],
    gettingThere: {
      parking: "יש חניה מסודרת באתר.",
      notes: [
        "בקיץ חם מאוד באזור - הצטיידו בהתאם.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer:
          "כן. המסלול קצר, מסודר ומעניין מאוד גם לילדים.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer: "כן, רוב המסלול נגיש.",
      },
      {
        question: "האם אפשר להיכנס למים?",
        answer: "לא. הביקור הוא במערות בלבד ואין רחצה במקום.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש חניה מסודרת למבקרים.",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer: "כשעתיים עד שלוש שעות.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "לאורך כל השנה. מומלץ להגיע בשעות שבהן פחות עמוס וליהנות מהאור היפה על הים.",
      },
      {
        question: "כמה עולה כניסה?",
        answer:
          "כרטיס מבוגר לסיור עצמאי בנקרות וצפייה בסרטון: ₪47 ברכישה מוקדמת באתר (rosh-hanikra.com).",
      },
      {
        question: "מה שעות הפתיחה?",
        answer:
          "בקיץ: א'-ה' ושבת 09:00-18:00, כניסה אחרונה, ב-19:00 האתר נסגר. שישי 09:00-16:00, כניסה אחרונה, ב-17:00 האתר נסגר. בחורף: א'-שבת 09:00-16:00, כניסה אחרונה, ב-17:00 האתר נסגר. מומלץ לבדוק מראש באתר הרשמי (rosh-hanikra.com).",
      },
    ],
    tips: [
      "מומלץ להצטרף לסיור שהאתר מציע.",
      "עצרו במערות, הקשיבו לגלים ותנו לילדים זמן להתבונן ולשאול.",
      "שלבו את הביקור עם טיולים נוספים בגליל המערבי.",
    ],
    closingNote:
      "לראות את הילדים שלי מלאי תשוקה, סקרנות, התלהבות, חיוך מאוזן לאוזן והקשבה אמיתית להסברים - פשוט שווה הכול.",
    gallery: [
      { src: "/images/places/north/ראש הנקרה/IMG_2915.jpeg", label: "מערות ימיות בראש הנקרה" },
      { src: "/images/places/north/ראש הנקרה/IMG_2920.jpeg", label: "מצוקי הגיר והים בראש הנקרה" },
      { src: "/images/places/north/ראש הנקרה/IMG_2921.jpeg", label: "נוף עוצר נשימה בראש הנקרה" },
      { src: "/images/places/north/ראש הנקרה/IMG_2926.jpeg", label: "המסלול בין הנקרות בראש הנקרה" },
      { src: "/images/places/north/ראש הנקרה/IMG_2930.jpeg", label: "גליל מערבי - ראש הנקרה" },
      { src: "/images/places/north/ראש הנקרה/IMG_2945.jpeg", label: "חוויה משפחתית בראש הנקרה" },
    ],
    gallerySubtitle: "",
    nearbyTripSlugs: ["hchvf-shl-mvsh-kzyb", "yn-chrdlyt", "gmvn-hchvlh"],
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "yn-chrdlyt",
    title: "עין חרדלית",
    subtitle:
      "מסלול מים קסום בגליל המערבי, עם נחל צלול, מים רדודים ואחת החוויות המשפחתיות היפות ביותר בצפון.",
    region: "צפון",
    category: "טיול מים",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "easy-trails", "nature-shade"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["water-friendly", "shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        haifa: "1h",
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
      lat: 33.042563,
      lng: 35.176507,
      label: "חניון עין חרדלית",
      wazeUrl:
        "https://waze.com/ul?q=%D7%A2%D7%99%D7%9F%20%D7%97%D7%A8%D7%93%D7%9C%D7%99%D7%AA&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=33.042563%2C35.176507",
    },
    seoTitle:
      "עין חרדלית - מסלול מים קסום בגליל המערבי | בשביל הלב",
    metaDescription:
      "עין חרדלית הוא אחד ממסלולי המים היפים בצפון - הליכה בתוך נחל צלול, מים רדודים, טבע קסום וחוויה מושלמת למשפחות עם ילדים.",
    heroImage: "/images/places/north/עין חרדלית/hero.jpeg",
    heroImageLabel: "תמונת רקע - עין חרדלית",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/עין חרדלית/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%A2%D7%99%D7%9F%20%D7%97%D7%A8%D7%93%D7%9C%D7%99%D7%AA&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=33.042563%2C35.176507",
    highlights: [
      "משפחות עם ילדים.",
      "מי שמחפש מסלול מים קל.",
      "ימי קיץ חמים.",
      "אוהבי טבע ונחלים.",
    ],
    about: [
      "אם אתם מחפשים מסלול מים שמתאים באמת למשפחות עם ילדים - עין חרדלית הוא אחד המקומות הראשונים שהייתי ממליצה עליהם.",
      "מדובר במסלול הליכה בתוך נחל כזיב, שבו המים רדודים, צלולים ונעימים לאורך רוב השנה.",
      "ההליכה אל תחילת הנחל קצרה יחסית, ומשם פשוט מתחילים ללכת בתוך המים.",
      "אין כאן יעד שחייבים להגיע אליו.",
      "אין לחץ.",
      "פשוט הולכים בקצב שלכם, נהנים מהטבע, מהמים, מהעצים ומהשקט.",
      "לאורך הדרך תפגשו שפיריות, דגיגונים, עצים גדולים והמון פינות שפשוט מזמינות לעצור לרגע.",
      "זה מסוג המקומות שמזכירים כמה מעט צריך כדי ליהנות באמת.",
    ],
    personalStory: [
      "הגענו לעין חרדלית כחלק מטיול של כמה ימים בגליל המערבי.",
      "זה היה בחודש אוגוסט, והחום הורגש היטב.",
      "אחרי הליכה קצרה בשביל מסודר ירדנו אל הנחל והתחלנו ללכת בתוך המים.",
      "המים הגיעו בערך לגובה הרגליים, היו צלולים וקרירים, וכל רגע הרגיש כמו התרעננות אמיתית.",
      "אבל הרגע שאני הכי זוכרת בכלל לא קשור למים.",
      "באיזשהו שלב החלטתי לתת לדוד להוביל אותנו.",
      "אמרתי לו שמרגע זה הוא מדריך הטיולים שלנו.",
      "פתאום הוא הזדקף.",
      "לקח את התפקיד ברצינות גמורה.",
      "הוא התחיל להזהיר אותנו מסלעים בדרך, לעדכן איפה צריך להיזהר, להראות לנו דגים קטנים ושפיריות, ואפילו הסביר לנו בהתלהבות שאנחנו מטיילים בגליל המערבי, קרוב לגבול לבנון, ושאנחנו נמצאים בעין חרדלית.",
      "עמדתי מאחוריו ופשוט חייכתי.",
      "לראות ילד בן שש מדבר בהתלהבות על הארץ שלו, מסביר, מוביל, דואג לאחיו הקטן ומרגיש משמעותי - זה רגע שאין לו מחיר.",
      "זאת בדיוק אחת הסיבות שאני כל כך אוהבת לטייל.",
      "כי הטיולים לא מלמדים רק על מקומות.",
      "הם מלמדים ילדים להוביל, לקחת אחריות, להתבונן, לשים לב לאחרים ובעיקר להאמין בעצמם.",
    ],
    cost: [
      { label: "כניסה", value: "חינם" },
      { label: "חניה", value: "יש חניה מסודרת סמוך לתחילת המסלול" },
      { label: "משך בילוי", value: "שעתיים-שלוש" },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "בהחלט" },
      { label: "נגיש לעגלות", value: "לא" },
      { label: "זמן ביקור", value: "2-3 שעות" },
    ],
    gettingThere: {
      parking: "יש חניה מסודרת סמוך לתחילת המסלול.",
      walking:
        "מהחניה הליכה קצרה של כ-100 מ' עד בריכות השכשוך הראשונות.",
      notes: [
        "רוב המסלול מוצל.",
        "הכניסה חופשית.",
        "מומלץ לבדוק את מצב השמורה לפני ההגעה.",
        "בימים עמוסים מומלץ להגיע מוקדם.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer:
          "כן. זהו אחד ממסלולי המים המשפחתיים והאהובים בצפון.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer: "לא.",
      },
      {
        question: "האם אפשר להיכנס למים?",
        answer: "כן. כל המסלול מתבצע בתוך מי הנחל.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן.",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer: "בין שעתיים לשלוש שעות.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "באביב, בקיץ ובתחילת הסתיו. בקיץ מומלץ להגיע מוקדם.",
      },
    ],
    tips: [
      "תנו לילדים להוביל.",
      "מקום נהדר לעצמאות.",
      "השתמשו בתיק גב.",
      "עצרו בדרך בפינות החמד.",
      "נעלי מים - חובה.",
    ],
    closingNote:
      "לפעמים כל מה שילד צריך הוא שמישהו יאמין בו. ברגע שנתתי לדוד להוביל אותנו, הוא פשוט פרח. זה הזכיר לי כמה כוח יש באמון שאנחנו נותנים בילדים שלנו.",
    gallery: [
      { src: "/images/places/north/עין חרדלית/IMG_2983.jpeg", label: "עין חרדלית - מסלול מים בנחל כזיב" },
      { src: "/images/places/north/עין חרדלית/IMG_2984.jpeg", label: "מים רדודים וצלולים בעין חרדלית" },
      { src: "/images/places/north/עין חרדלית/IMG_2985.jpeg", label: "חוויה משפחתית בעין חרדלית" },
    ],
    gallerySubtitle: "",
    nearbyTripSlugs: ["rsh-hnkrh", "hchvf-shl-mvsh-kzyb", "gmvn-hchvlh"],
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "hchvf-shl-mvsh-kzyb",
    title: "החוף של מוש אכזיב",
    visitNote: "החוף של מוש סגור מ־1 בנובמבר ועד תחילת הקיץ.",
    subtitle:
      "חוף קסום בגליל המערבי עם אווירת שאנטי, שקיעות מרהיבות, ים כחול ואחד המקומות הכי מיוחדים לעצור בהם, ליהנות מהחיים ולהודות עליהם.",
    region: "צפון",
    category: "טיול משפחתי",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "viewpoint", "camping", "easy-trails", "picnic", "nature-shade"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["water-friendly", "shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        haifa: "1h",
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
      lat: 33.0441,
      lng: 35.100987,
      label: "החוף של מוש אכזיב",
      wazeUrl:
        "https://waze.com/ul?q=%D7%94%D7%97%D7%95%D7%A3%20%D7%A9%D7%9C%20%D7%9E%D7%95%D7%A9%20%D7%90%D7%9B%D7%96%D7%99%D7%91&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=33.0441%2C35.100987",
    },
    seoTitle:
      "החוף של מוש אכזיב - חוף שאנטי קסום בגליל המערבי | בשביל הלב",
    metaDescription:
      "החוף של מוש באכזיב הוא אחד החופים המיוחדים בישראל - אווירת שאנטי, שקיעות מרהיבות, ים כחול, אוכל טוב ומקום מושלם למשפחות וליום שלם של רוגע.",
    heroImage: "/images/places/north/החוף של מוש אכזיב/hero.jpeg",
    heroImageLabel: "תמונת רקע - החוף של מוש אכזיב",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/החוף של מוש אכזיב/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%94%D7%97%D7%95%D7%A3%20%D7%A9%D7%9C%20%D7%9E%D7%95%D7%A9%20%D7%90%D7%9B%D7%96%D7%99%D7%91&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=33.0441%2C35.100987",
    highlights: [
      "משפחות עם ילדים.",
      "זוגות.",
      "מי שאוהב חופי ים עם אווירה מיוחדת.",
      "מטיילים בגליל המערבי.",
      "מי שמחפש מקום שאפשר להעביר בו יום שלם.",
    ],
    about: [
      "יש הרבה חופים יפים בארץ.",
      "אבל החוף של מוש הוא חוף עם אופי.",
      "זה לא רק הים הצלול או השקיעות המטורפות.",
      "זאת בעיקר האווירה.",
      "מיטות רביצה, מוזיקה טובה, אנשים שמגיעים פשוט ליהנות מהרגע, מסעדה, בר משקאות, אזורי ישיבה נעימים ואפשרות אפילו ללינה ממש על קו המים.",
      "זה מסוג החופים שאפשר לרבוץ בהם שעות בלי להרגיש שהזמן עובר.",
      "יש בו אווירה של חופש, פשטות ואהבה אמיתית.",
      "שימו לב - הכניסה לחוף חופשית, אבל השירותים במקום (אוכל, שתייה והשכרת ציוד במידת הצורך) אינם זולים יחסית, לכן כדאי לקחת זאת בחשבון ולהיערך בהתאם.",
    ],
    personalStory: [
      "כחלק מהטיול שלנו בגליל המערבי הגענו לחוף של מוש.",
      "כבר מהרגע הראשון הרגשתי שהאווירה כאן אחרת.",
      "לקחנו שלושה שייקים - כל אחד בטעם שהוא אוהב.",
      "התיישבנו על מיטות הרביצה ופשוט... היינו.",
      "בלי למהר.",
      "בלי להספיק.",
      "פשוט ליהנות.",
      "אחר כך ירדנו אל הים.",
      "הילדים שיחקו במים, צחקו, ואני נשארתי לשבת על החוף מול אחת השקיעות הכי יפות שראיתי.",
      "זה היה אחד מאותם רגעים שלא מרגישים בהם צורך בשום דבר נוסף.",
      "רק לעצור.",
      "לנשום.",
      "ולהודות.",
      "להודות על הזכות להגיע למקומות כאלה.",
      "על הזכות לטייל עם הילדים שלי.",
      "על הזכות לחבר אותם לטבע.",
      "על הזכות לראות את היופי שיש בארץ שלנו.",
      "על הזכות לראות את הטוב והיופי שבאנשים.",
      "ואולי הכי מרגש - שגם העולם יראה את היופי שאנחנו מביאים איתנו.",
      "ועל הזכות להבין שאושר אמיתי נמצא ברגעים הכי פשוטים.",
      "רוח נעימה.",
      "ים.",
      "ילדים שמחים.",
      "ולב מלא בהודיה.",
    ],
    cost: [
      { label: "כניסה", value: "חינם - הכניסה לחוף חופשית" },
      { label: "חניה", value: "יש חניה מסודרת בסמוך" },
      { label: "משך בילוי", value: "כמה שעות ועד יום שלם" },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "בהחלט" },
      { label: "נגיש לעגלות", value: "כן" },
      { label: "זמן ביקור", value: "כמה שעות ועד יום שלם" },
    ],
    gettingThere: {
      parking: "יש חניה מסודרת.",
      walking: "גישה ישירה מהחניה אל החוף.",
      notes: [
        "ניתן ללון במקום - בדקו מראש את אפשרויות הלינה.",
        "הכניסה לחוף חופשית.",
        "אוכל, שתייה והשכרת ציוד בתשלום.",
        "מומלץ להתעדכן מראש באתר לגבי שעות פעילות ואירועים.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer: "כן. החוף מתאים מאוד למשפחות.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer: "כן.",
      },
      {
        question: "האם אפשר להיכנס למים?",
        answer: "כן.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש חניה מסודרת בסמוך לחוף.",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer: "לפחות כמה שעות. אם תשאלו אותי - עד השקיעה.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer: "בשעות אחר הצהריים ולהישאר עד השקיעה.",
      },
    ],
    tips: [
      "הישארו עד השקיעה.",
      "אם אתם אוהבים משחקי חוף - הביאו כדור.",
      "פשוט תהנו מהאווירה המיוחדת של המקום.",
    ],
    closingNote:
      "לא צריך אטרקציות גדולות או חוויות יוצאות דופן כדי להרגיש הודיה אמיתית. לפעמים היא תופסת אותנו דווקא ברגעים הכי פשוטים. אם מצליחים לעצור לרגע, לנצור את הרגע ולהגיד תודה - זכינו.",
    gallery: [
      { src: "/images/places/north/החוף של מוש אכזיב/IMG_2999.jpeg", label: "החוף של מוש אכזיב - אווירת שאנטי על הים" },
      { src: "/images/places/north/החוף של מוש אכזיב/IMG_3010.jpeg", label: "שקיעה מרהיבה בחוף של מוש אכזיב" },
      { src: "/images/places/north/החוף של מוש אכזיב/IMG_3013.jpeg", label: "יום שלם של רוגע בגליל המערבי" },
    ],
    gallerySubtitle: "",
    nearbyTripSlugs: ["rsh-hnkrh", "yn-chrdlyt", "gmvn-hchvlh"],
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "bt-shlmh",
    title: "בת שלמה",
    subtitle:
      "לינה בלב הטבע, נוף אינסופי, אנשים טובים ורגעים קטנים שהופכים לזיכרונות שילוו אותנו עוד שנים.",
    region: "צפון",
    category: "טיול משפחתי",
    visitedByMilana: true,
    matcher: {
      activities: ["viewpoint", "easy-trails", "nature-shade", "picnic"],
      companions: ["solo", "friends", "kids", "family"],
      weatherTraits: ["shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        haifa: "1h",
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
      lat: 32.599439,
      lng: 35.002952,
      label: "מושבה בת שלמה",
      wazeUrl:
        "https://waze.com/ul?q=%D7%91%D7%AA%20%D7%A9%D7%9C%D7%9E%D7%94&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=32.599439%2C35.002952",
    },
    seoTitle:
      "בת שלמה - לינה בטבע וחוויית קראוון משפחתית | בשביל הלב",
    metaDescription:
      "מחפשים חוויית לינה מיוחדת? בת שלמה מציעה קראוון מול נוף פתוח, טבע, שקט, אנשים טובים וחוויה משפחתית שלא שוכחים.",
    heroImage: "/images/places/north/בת שלמה/hero.jpeg",
    heroImageLabel: "תמונת רקע - בת שלמה",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/בת שלמה/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%91%D7%AA%20%D7%A9%D7%9C%D7%9E%D7%94&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32.599439%2C35.002952",
    highlights: [
      "משפחות עם ילדים.",
      "מי שמחפש חוויית לינה שונה.",
      "אוהבי טבע ושקט.",
      "מי שרוצה להתנתק מהשגרה.",
    ],
    about: [
      "אם בא לכם לעצור לרגע את המרוץ ולהרגיש איך החיים נראים בקצב אחר - בת שלמה היא בדיוק המקום.",
      "המושבה הקטנה מוקפת כרמים, יערות, שדות ונוף פתוח שמזכיר כמה יופי יש בפשטות.",
      "אנחנו בחרנו להתארח בקראוון שצופה אל הנוף, וזו הייתה אחת מחוויות הלינה הכי מיוחדות שחווינו.",
      "יש משהו בלינה בקראוון שמחבר אותך מחדש לאדמה, לטבע ולשקט.",
      "אתם לא רק ישנים במקום - אתם ממש חיים אותו.",
    ],
    personalStory: [
      "הגענו להתארח בקראוון קטן מול נוף עוצר נשימה.",
      "כבר בחמש הדקות הראשונות הילדים הורידו נעליים והתחילו לחקור את כל מה שמסביב.",
      "הם הכירו את הילדים של המשפחה המארחת, גילו את לול התרנגולות, התלהבו מהביצים הטריות ופשוט התערבבו בטבע כאילו גדלו שם.",
      "אני ישבתי מול הנוף ופשוט חייכתי.",
      "יש משהו כל כך יפה באנשים שמארחים מכל הלב.",
      "באיזשהו שלב בעל המקום הציע לנו לקחת טרקטורון ולעשות סיבוב בשטח.",
      "אם להיות כנה - קצת חששתי.",
      "לא כי היה מסוכן.",
      "אלא כי זה היה חדש עבורי.",
      "אבל דווקא שם הבנתי שהילדים שלי מסתכלים עליי.",
      "לא על מה שאני אומרת.",
      "אלא על מה שאני בוחרת לעשות.",
      "דווקא ברגעים האלה מתרחש החינוך האמיתי.",
      "כמו שאני תמיד אוהבת לומר - הדרך הטובה ביותר ללמד את הילדים שלנו ערכים וטוב לב היא פשוט להיות אנשים כאלה בעצמנו.",
      "אז לקחתי נשימה עמוקה.",
      "למדתי.",
      "שאלתי.",
      "בדקתי.",
      "ויצאנו לדרך.",
      "זאת הייתה אחת החוויות הכי יפות של אותו טיול.",
      "השקט.",
      "הרוח.",
      "השדות.",
      "השקיעה.",
      "עדר הפרות שפגשנו בדרך.",
      "התחושה שאנחנו מגלים יחד משהו חדש.",
      "והאמונה שהיקום מסדר את הדברים בדיוק כמו שהם צריכים להיות.",
      "בערב חזרנו לקראוון, אכלנו ארוחת ערב שהבאנו מהבית, ואז החלטנו לעשות משהו שמעולם לא עשיתי קודם.",
      "להדליק מדורה.",
      "דוד אסף עצים.",
      "רפאל הביא ניירות.",
      "אני בניתי את המדורה.",
      "וביחד, בפעם הראשונה בחיים, הצלחנו להדליק אותה.",
      "כמה דקות אחר כך ישבתי והסתכלתי על הילדים.",
      "הם ישבו אחד ליד השני מול האש.",
      "דיברו ביניהם.",
      "צחקו.",
      "ופשוט נהנו מהרגע.",
      "לא היה מסך.",
      "לא משחק.",
      "לא אטרקציה.",
      "רק שני אחים, מדורה, שקט ונוף אינסופי.",
      "זה היה רגע שריגש אותי עד דמעות.",
      "רגע כל כך פשוט, אבל מלא באינסוף של הכרת תודה.",
      "בלילה נכנסנו לקראוון.",
      "שמענו את קולות התנים מבחוץ, הפעלנו סרט במקרן, התחבקנו שלושתנו במיטה ונרדמנו אחרי יום שלא אשכח עוד הרבה מאוד שנים.",
    ],
    cost: [
      { label: "כניסה", value: "משתנה בהתאם למקום הלינה" },
      { label: "חניה", value: "יש" },
      { label: "משך בילוי", value: "לילה אחד לפחות" },
    ],
    quickFacts: [
      { label: "עלות", value: "משתנה לפי מקום הלינה" },
      { label: "מתאים לילדים", value: "בהחלט" },
      { label: "נגיש לעגלות", value: "כן" },
      { label: "זמן ביקור", value: "לילה אחד לפחות" },
    ],
    gettingThere: {
      parking: "יש חניה.",
      notes: [
        "מומלץ לבדוק מראש אטרקציות, מסעדות, עגלות קפה ומקומות לינה באזור.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer: "כן. הילדים נהנים מאוד מהמרחבים ומהטבע.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer: "כן.",
      },
      {
        question: "האם אפשר לעשות מדורה?",
        answer: "רק במקומות שמאושרים לכך ועל פי הנחיות המקום.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן.",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer: "לפחות לילה אחד.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer: "לאורך כל השנה. באביב ובסתיו מזג האוויר מושלם במיוחד.",
      },
    ],
    tips: [
      "אם כבר מגיעים - תישארו ללילה.",
      "דווקא השקט של הערב, המדורה והשינה בלב הטבע הם אלו שהופכים את כל החוויה למיוחדת באמת.",
    ],
    closingNote:
      "הילדים שלנו לומדים הרבה פחות ממה שאנחנו אומרים. והרבה יותר ממה שאנחנו עושים. כל פעם שאנחנו מתמודדים עם פחד, מנסים משהו חדש או מעיזים לצאת מאזור הנוחות - הם לומדים שגם הם יכולים.",
    gallery: [
      { src: "/images/places/north/בת שלמה/IMG_5614.jpeg", label: "בת שלמה - קראוון מול נוף פתוח" },
      { src: "/images/places/north/בת שלמה/IMG_5617.jpeg", label: "חוויית לינה בטבע בדרום הכרמל" },
      { src: "/images/places/north/בת שלמה/IMG_5618.jpeg", label: "נוף עוצר נשימה במושבה בת שלמה" },
      { src: "/images/places/north/בת שלמה/IMG_5637.jpeg", label: "טבע, שקט ואנשים טובים בבת שלמה" },
      { src: "/images/places/north/בת שלמה/IMG_5651.jpeg", label: "משפחה בקראוון בבת שלמה" },
      { src: "/images/places/north/בת שלמה/IMG_5676.jpeg", label: "שדות וכרמים סביב בת שלמה" },
      { src: "/images/places/north/בת שלמה/IMG_5680.jpeg", label: "סיבוב בשטח בדרום הכרמל" },
      { src: "/images/places/north/בת שלמה/IMG_5684.jpeg", label: "שקיעה מרהיבה בבת שלמה" },
      { src: "/images/places/north/בת שלמה/IMG_5689.jpeg", label: "ערב שקט בלב הטבע" },
      { src: "/images/places/north/בת שלמה/IMG_5710.jpeg", label: "מדורה ורגעים משפחתיים בבת שלמה" },
      { src: "/images/places/north/בת שלמה/IMG_5730.jpeg", label: "לינה בקראוון - חוויה שלא שוכחים" },
      { src: "/images/places/north/בת שלמה/IMG_5734.jpeg", label: "בת שלמה - זיכרונות לשנים" },
    ],
    gallerySubtitle: "",
    nearbyTripSlugs: ["chvrsht-gdvnh", "chrmvn", "nahal-hashofet"],
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "ein-ayub",
    title: "עין איוב",
    subtitle:
      "מעיין קסום שנשפך אל הכנרת, מים צלולים, מפל קטן ואחת מפינות החמד היפות באזור.",
    region: "צפון",
    category: "מעיין",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "easy-trails", "picnic", "nature-shade"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["water-friendly", "shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        haifa: "1h",
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
      lat: 32.87273,
      lng: 35.55227,
      label: "עין איוב",
      wazeUrl:
        "https://waze.com/ul?q=%D7%A2%D7%99%D7%9F%20%D7%90%D7%99%D7%95%D7%91&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=32.87273%2C35.55227",
    },
    seoTitle: "עין איוב - מעיין קסום שנשפך אל הכנרת | בשביל הלב",
    metaDescription:
      "עין איוב הוא מעיין קטן וצלול ליד הכנרת עם מפלון, בריכות שכשוך ומקום מושלם לעצירה, פיקניק והתרעננות למשפחות.",
    heroImage: "/images/places/north/עין איוב/hero.jpeg",
    heroImageLabel: "תמונת רקע - עין איוב, מפל המעיין בין הצמחייה ליד הכנרת",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/עין איוב/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%A2%D7%99%D7%9F%20%D7%90%D7%99%D7%95%D7%91&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32.87273%2C35.55227",
    highlights: [
      "משפחות עם ילדים.",
      "מטיילים באזור הכנרת.",
      "אוהבי מעיינות.",
      "מי שמחפש פינת טבע שקטה.",
    ],
    about: [
      "יש מקומות שמפתיעים אותך כבר מהרגע הראשון.",
      "עין איוב הוא בדיוק כזה.",
      "זהו מעיין קטן שנובע במדרון ונשפך במפלון קטן אל שפת הכנרת, שילוב נדיר של מים מתוקים הזורמים אל האגם.",
      "המים צלולים, קרירים ונעימים, ובסביבתם בריכות קטנות ורדודות שמתאימות במיוחד לשכשוך ולהתרעננות.",
      "אפשר להגיע לכאן לעצירה קצרה או לפתוח מחצלת, שולחן קטן וכיסאות, לשבת ממש ליד המים ופשוט ליהנות מהנוף המדהים של הכנרת.",
      "זה מקום פשוט, טבעי וקסום - בדיוק כמו שאני אוהבת.",
    ],
    personalStory: [
      "הגענו לעין איוב כחלק מהטיול שלנו באזור הכנרת.",
      "בחרנו לעצור כאן להתרעננות קצרה, אבל מהר מאוד הבנתי שזה מסוג המקומות שאפשר להישאר בהם הרבה יותר.",
      "פרשנו את הדברים, נכנסנו למים הקרירים ופשוט נהנינו מהרגע.",
      "יש משהו מיוחד בלשבת עם הרגליים במים, מול הכנרת, בלי למהר לשום מקום.",
      "שימו לב - החניה נמצאת לצד הכביש, ומשם יורדים במדרגות ובהליכה קצרה של כ-5 דקות עד למעיין.",
      "הירידה לא ארוכה, אבל כדאי להגיע עם ציוד נוח ולא להעמיס יותר מדי.",
      "לפעמים לא צריך הרבה כדי ליהנות.",
      "מים טובים.",
      "נוף יפה.",
      "והאנשים שאתם אוהבים לידכם.",
    ],
    cost: [
      { label: "כניסה", value: "חינם" },
      { label: "חניה", value: "יש חניה לצד הכביש" },
      { label: "משך בילוי", value: "שעה עד שלוש שעות" },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "בהחלט" },
      { label: "נגיש לעגלות", value: "לא" },
      { label: "זמן ביקור", value: "שעה עד שלוש שעות" },
    ],
    gettingThere: {
      parking: "יש חניה לצד הכביש.",
      walking:
        "משם יורדים במדרגות ובהליכה קצרה של כ-5 דקות עד למעיין.",
      notes: [
        "הירידה אינה סלולה אך אפשרית לרוב המטיילים.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer:
          "כן. הבריכות הרדודות מתאימות למשפחות, אך יש להשגיח על הילדים לאורך כל השהייה.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer: "לא. הגישה כוללת מדרגות.",
      },
      {
        question: "האם אפשר להיכנס למים?",
        answer: "כן.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. יש חניה לצד הכביש ומשם הליכה קצרה.",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer: "בין שעה לשלוש שעות.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "באביב, בקיץ ובתחילת הסתיו. בשעות הבוקר או אחר הצהריים מזג האוויר נעים יותר.",
      },
    ],
    tips: [
      "הביאו כיסאות, מחצלת או שולחן קטן.",
      "זה בדיוק מסוג המקומות שכיף פשוט לשבת בהם, לאכול משהו קטן ולהקשיב לרעש המים.",
    ],
    closingNote:
      "לפעמים המקומות הכי קטנים מצליחים להשאיר את הרושם הכי גדול. לא תמיד צריך אטרקציה ענקית. לפעמים מעיין קטן מול הכנרת הוא כל מה שצריך.",
    gallery: [
      {
        src: "/images/places/north/עין איוב/IMG_3498.jpeg",
        label: "עין איוב - מפל המעיין והבריכה הרדודה",
      },
      {
        src: "/images/places/north/עין איוב/IMG_3711.jpg",
        label: "עין איוב - מי המעיין זורמים אל הכנרת",
      },
      {
        src: "/images/places/north/עין איוב/IMG_3712.jpg",
        label: "עין איוב - שכשוך ופיקניק במי המעיין",
      },
    ],
    gallerySubtitle: "",
    nearbyTripSlugs: ["ein-nun", "rsh-hnkrh", "bt-shlmh"],
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "ein-migdal",
    title: "עין מגדל",
    subtitle:
      "מעיין צלול במיוחד בעמק המעיינות עם מים בצבע טורקיז, אינספור דגים וחוויית טבע שקשה לשכוח.",
    region: "צפון",
    category: "מעיין",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "easy-trails", "picnic", "nature-shade"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["water-friendly", "shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        haifa: "1h-plus",
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
      lat: 32.5025635,
      lng: 35.4510498,
      label: "עין מגדל - פארק המעיינות",
      wazeUrl:
        "https://waze.com/ul?q=%D7%A2%D7%99%D7%9F%20%D7%9E%D7%92%D7%93%D7%9C&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=32.5025635%2C35.4510498",
    },
    seoTitle:
      "עין מגדל - המעיין הצלול ביותר בעמק המעיינות | בשביל הלב",
    metaDescription:
      "עין מגדל הוא אחד המעיינות הצלולים ביותר בעמק המעיינות עם מים בצבע טורקיז, דגים, טבע קסום וחוויה מושלמת למשפחות עם ילדים.",
    heroImage: "/images/places/north/עין מגדל/hero.jpeg",
    heroImageLabel: "תמונת רקע - עין מגדל, מי המעיין הצלולים ונחל הקיבוצים",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/עין מגדל/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%A2%D7%99%D7%9F%20%D7%9E%D7%92%D7%93%D7%9C&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32.5025635%2C35.4510498",
    highlights: [
      "משפחות עם ילדים.",
      "אוהבי מים טבעיים.",
      "מטיילים בעמק המעיינות.",
      "מי שמחפש מעיין צלול במיוחד.",
      "עצירה מרעננת כחלק מטיול באזור.",
    ],
    about: [
      "אם תשאלו אותי איפה נמצאים המים הכי צלולים שראיתי בארץ - אין ספק שהייתי עונה עין מגדל.",
      "יש מקומות שהמים שלהם יפים.",
      "ויש מקומות שהמים שלהם כל כך צלולים, שאתם יכולים לראות כל אבן, כל דג וכל תנועה שמתרחשת מתחת לפני המים.",
      "המעיין הוא חלק מנחל הקיבוצים שבעמק המעיינות, והמים נשארים קרירים ונעימים לאורך רוב ימות השנה.",
      "זה מקום נהדר למי שאוהב מים טבעיים, שחייה רגועה וטבע במלוא הפשטות שלו.",
      "איך מגיעים אליו? נכנסים דרך פארק המעיינות, הולכים בשביל מסודר כ-3 דקות בלבד, וזה המעיין הראשון שפוגשים.",
    ],
    personalStory: [
      "הגענו לעין מגדל ושמתי לב לדגים ששוחים במים.",
      "מודה שעברה בי המחשבה...",
      "האם הילדים ייכנסו למים?",
      "אולי הפעם הם יחששו?",
      "אני יודעת שהם לא חוששים מדגים, או מחיות באופן כללי, אבל בכל פעם שאנחנו מגיעים למעיין עם הרבה דגים, המחשבה הזאת קופצת לי לרגע.",
      "תוך פחות מדקה הבנתי שאין לי ממה לחשוש.",
      "הם פשוט התלהבו.",
      "נכנסו למים בלי פחד, הסתקרנו, התבוננו בדגים ופשוט נהנו מכל רגע.",
      "מהמים.",
      "מהצלילות.",
      "מהיופי.",
      "ומהתחושה שאנחנו אורחים בעולם של הטבע.",
      "וזה היה כל כך יפה לראות.",
      "לפעמים אנחנו המבוגרים מלמדים את הילדים להיזהר.",
      "אבל לפעמים דווקא הם מזכירים לנו שהטבע הוא לא אויב.",
      "הוא הבית שלנו.",
      "אנחנו חלק מהבריאה.",
      "המים.",
      "הדגים.",
      "העצים.",
      "בני האדם.",
      "כולנו חיים יחד באותו מקום, וכל אחד הוא חלק קטן מהמערכת המופלאה הזאת.",
    ],
    cost: [
      { label: "כניסה", value: "חינם" },
      { label: "חניה", value: "יש חניה מסודרת בפארק המעיינות" },
      { label: "משך בילוי", value: "שעה עד שעתיים" },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "בהחלט" },
      { label: "נגיש לעגלות", value: "כן" },
      { label: "זמן ביקור", value: "שעה עד שעתיים" },
    ],
    gettingThere: {
      parking: "יש חניה מסודרת בפארק המעיינות.",
      walking:
        "נכנסים דרך פארק המעיינות, הולכים בשביל מסודר כ-3 דקות בלבד, וזה המעיין הראשון שפוגשים.",
      notes: [
        "אחד המעיינות הצלולים ביותר באזור.",
        "המקום עלול להיות עמוס בסופי שבוע ובחגים.",
        "אין שירותי הצלה.",
        "עומק המים כ-50 ס\"מ (משתנה מעט בהתאם לעונה).",
        "במים חיים דגים קטנים שאינם מזיקים.",
        "המעיין מתחבר לנחל הקיבוצים - ניתן להמשיך למסלול הרטוב, אך בהמשך המים עמוקים יותר. ילדים ומי שאינם שוחים היטב חייבים במצופים.",
        "ניתן לשכור אופניים או טוקטוק ולטייל בפארק המעיינות.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer:
          "כן. המים נעימים ומתאימים למשפחות עם ילדים. כמו בכל מקור מים טבעי, חשוב להשגיח על הילדים לאורך כל השהייה.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer: "כן. הגישה מהחניה נוחה וקצרה.",
      },
      {
        question: "האם אפשר להיכנס למים?",
        answer:
          "כן. הרחצה מותרת והמעיין מתאים במיוחד לשכשוך ולהתרעננות.",
      },
      {
        question: "האם יש חניה?",
        answer:
          "כן. יש חניה מסודרת בפארק המעיינות, ומשם הליכה קצרה של כ-3 דקות.",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer:
          "בין שעה לשעתיים, או כעצירת התרעננות קצרה במהלך טיול באזור.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "באביב, בקיץ ובתחילת הסתיו. בקיץ מומלץ להגיע בשעות הבוקר או אחר הצהריים.",
      },
    ],
    tips: [
      "בקיץ חם מאוד באזור - הצטיידו בהתאם.",
      "זה מקום נהדר להתבונן בעולם שמתחת למים.",
      "אם יש לכם מצלמה עמידה למים - זה המקום להשתמש בה.",
    ],
    closingNote:
      "כשאנחנו מפסיקים לפחד מהטבע ומתחילים להכיר אותו - הוא הופך ממקום זר לבית.",
    gallery: [
      {
        src: "/images/places/north/עין מגדל/IMG_3672.jpeg",
        label: "עין מגדל - הליכה במי נחל הקיבוצים הצלולים",
      },
      {
        src: "/images/places/north/עין מגדל/IMG_3673.jpeg",
        label: "מי המעיין הצלולים בין הקנים והדקלים בעמק המעיינות",
      },
      {
        src: "/images/places/north/עין מגדל/IMG_9118.jpeg",
        label: "עין מגדל - מים שקופים, דגיגונים וברוש גבוה",
      },
    ],
    gallerySubtitle: "",
    nearbyTripSlugs: ["nchl-hkybvtzym", "ein-moda", "nchl-hsy"],
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "ein-nun",
    title: "עין נון",
    subtitle:
      "מעיין מושקע ליד הכנרת, עם בריכות רדודות, שבילים מרוצפים, צל של דקלים ואקליפטוסים וחוויה משפחתית נוחה במיוחד.",
    region: "צפון",
    category: "מעיין",
    visitedByMilana: true,
    matcher: {
      activities: ["water", "easy-trails", "picnic", "nature-shade"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["water-friendly", "shade-rich", "heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        haifa: "1h",
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
      lat: 32.84147,
      lng: 35.5110925,
      label: "עין נון",
      wazeUrl:
        "https://waze.com/ul?q=%D7%A2%D7%99%D7%9F%20%D7%A0%D7%95%D7%9F&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=32.84147%2C35.5110925",
    },
    seoTitle:
      "עין נון - מעיין משפחתי ליד הכנרת עם בריכות רדודות | בשביל הלב",
    metaDescription:
      "עין נון ליד מגדל הוא פארק מעיין מושקע עם בריכות רדודות, שבילים מונגשים, שולחנות פיקניק, צל טבעי וכניסה חינמית - מושלם למשפחות עם ילדים.",
    heroImage: "/images/places/north/עין נון/hero.jpeg",
    heroImageLabel: "תמונת רקע - עין נון, בריכת המעיין והשביל המרוצף",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/עין נון/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%A2%D7%99%D7%9F%20%D7%A0%D7%95%D7%9F&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32.84147%2C35.5110925",
    highlights: [
      "משפחות עם ילדים.",
      "מי שמחפש מעיין רדוד ונגיש.",
      "ימי קיץ חמים ליד הכנרת.",
      "פיקניק בצל.",
    ],
    about: [
      "אם אתם מחפשים מעיין נוח, מוצל ומתאים באמת למשפחות - עין נון ליד הכנרת הוא מקום ששווה להכיר.",
      "המעיין נמצא בכניסה למושבה מגדל, בעמק גינוסר, ועבר בשנים האחרונות שיפוץ והנגשה שהפכו אותו לפארק מסודר ונעים.",
      "כאן תמצאו בריכות רדודות עם מי מעיין צלולים, שבילי הליכה מרוצפים, דשא, שולחנות פיקניק וצל של דקלים, תאנים ועצי אקליפטוס.",
      "הבריכה המרכזית נבנתה עוד בתקופה הרומית, והיום היא מתמלאת ממי המעיין שזורמים אליה לאורך כל השנה.",
      "עומק המים רדוד - בערך 50 ס\"מ - והמקום מתאים במיוחד לילדים, לפיקניק קצר ולעצירה נעימה בדרך לכנרת או ממנה.",
      "הכניסה חינמית, אין צורך בתיאום מראש, והגישה נוחה גם עם עגלת ילדים.",
    ],
    personalStory: [
      "הגענו לעין נון ביום שמשי וחם, בדיוק כשחיפשנו מקום שקט ליד הכנרת.",
      "כבר מהחניה ראינו שהמקום מסודר - שבילים מרוצפים, דשא ירוק ובריכה גדולה שמשקפת את השמיים.",
      "הילדים הלכו קדימה על השביל המרוצף, התקרבו לקצה המים והתחילו לשחק בזהירות ליד הבריכה.",
      "ישבנו על אבני הגבול, הורדנו נעליים והכניסו את הרגליים למים הקרירים.",
      "המים היו רדודים, נעימים, והרגשה של התרעננות אמיתית אחרי החום.",
      "מסביב היו שולחנות פיקניק בצל, דקלים גבוהים ואווירה שקטה.",
      "לא הרגשנו שצריך \"לעשות\" משהו מיוחד.",
      "פשוט לשבת, לנשום, לראות את הילדים נהנים מהמים ולהרגיש שעצרנו לרגע את המרוץ.",
      "זה בדיוק סוג המקום שמתאים לבילוי של שעה-שעתיים, עם קפה, פירות או ארוחת צהריים קלה.",
    ],
    cost: [
      { label: "כניסה", value: "חינם" },
      { label: "חניה", value: "יש חניה מסודרת ליד המעיין" },
      { label: "משך בילוי", value: "שעה עד שעתיים" },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "בהחלט" },
      { label: "נגיש לעגלות", value: "כן" },
      { label: "זמן ביקור", value: "1-2 שעות" },
    ],
    gettingThere: {
      parking: "יש חניה מסודרת סמוך למעיין.",
      walking: "כ-2 דקות הליכה בלבד.",
      notes: [
        "עומק המים כ-50 ס\"מ ומתאים בעיקר לשכשוך והתרעננות.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer:
          "כן. המים רדודים, השבילים מסודרים והמקום מתאים במיוחד למשפחות.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer: "כן. יש מסלול מונגש עם שבילים מרוצפים.",
      },
      {
        question: "האם אפשר להיכנס למים?",
        answer:
          "כן, המים רדודים ומתאימים להתרעננות. יש שלטים על אחריות המבקרים ואין מציל במקום.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן, יש חניה מסודרת ליד המעיין.",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer: "בין שעה לשעתיים, כולל פיקניק קצר.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "באביב, בקיץ ובתחילת הסתיו. בימים חמים מומלץ להגיע מוקדם או בשעות הבוקר.",
      },
    ],
    tips: [
      "שלבו את הביקור עם עצירה בכנרת.",
      "הביאו נעלי מים או סנדלים.",
      "מקום מושלם לעצירת התרעננות קצרה.",
    ],
    closingNote:
      "לפעמים מספיק מעיין קטן, שביל מרוצף ומים רדודים כדי להפוך יום רגיל לזיכרון משפחתי מתוק.",
    gallery: [
      {
        src: "/images/places/north/עין נון/IMG_3485.jpeg",
        label: "עין נון - בריכת המעיין, דקלים ושביל מרוצף",
      },
      {
        src: "/images/places/north/עין נון/IMG_3491.jpeg",
        label: "התרעננות במי המעיין הרדודים בצל האקליפטוסים",
      },
      {
        src: "/images/places/north/עין נון/IMG_3495.jpeg",
        label: "עין נון - נוף רחב של הבריכה, הדקלים והשביל המונגש",
      },
    ],
    gallerySubtitle: "",
    nearbyTripSlugs: ["ein-moda", "myyn-chrvd", "gmvn-hchvlh"],
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "har-hari-viewpoint",
    title: "מצפה הארי",
    subtitle:
      "אחת מנקודות התצפית המרשימות בגליל העליון - נוף אינסופי, אוויר הרים צלול ורגע של שקט ועוצמה.",
    region: "צפון",
    category: "תצפית",
    visitedByMilana: true,
    matcher: {
      activities: ["viewpoint", "easy-trails"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        haifa: "1h",
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
      lat: 32.9541245,
      lng: 35.3726807,
      label: "מצפה הארי - בית ג'ן",
      wazeUrl:
        "https://waze.com/ul?q=%D7%9E%D7%A6%D7%A4%D7%94%20%D7%94%D7%90%D7%A8%D7%99%20-%20%D7%91%D7%99%D7%AA%20%D7%92%27%D7%9F&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=32.9541245%2C35.3726807",
    },
    seoTitle:
      "מצפה הארי - תצפית עוצרת נשימה בגליל העליון | בשביל הלב",
    metaDescription:
      "מצפה הארי בבית ג'ן הוא אחת מנקודות התצפית היפות בגליל העליון עם נוף פנורמי מרהיב, אוויר הרים צלול וחוויה מושלמת לכל המשפחה.",
    heroImage: "/images/places/north/תצפית הר הארי/hero.jpeg",
    heroImageLabel:
      "תמונת רקע - מצפה הארי, נוף פנורמי על הרי הגליל, הכרמל והכנרת מסמוך לבית ג'ן",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/תצפית הר הארי/hero.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%9E%D7%A6%D7%A4%D7%94%20%D7%94%D7%90%D7%A8%D7%99%20-%20%D7%91%D7%99%D7%AA%20%D7%92%27%D7%9F&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32.9541245%2C35.3726807",
    highlights: [
      "אוהבי תצפיות ונופים.",
      "משפחות.",
      "זוגות.",
      "מטיילים בגליל העליון.",
      "מי שמחפש רגע של שקט.",
    ],
    about: [
      "יש מקומות שלא צריך לעשות בהם שום דבר.",
      "רק לעמוד.",
      "להסתכל.",
      "ולנשום.",
      "מצפה הארי, השוכן סמוך לבית ג'ן בגובה של כ-1,000 מטר מעל פני הים, מעניק תצפית פנורמית מרהיבה על הרי הגליל, הכרמל, הכנרת ובימים בהירים אפילו עד הים התיכון.",
      "אין פה אטרקציות.",
      "אין מסלול ארוך.",
      "רק טבע, שקט ונוף שנראה כאילו אין לו סוף.",
      "האמת? העיניים לא מאמינות למה שהן רואות. יש משהו בעמידה מול נוף כל כך פתוח ועוצמתי שפשוט ממלא את הגוף והלב באנרגיה שקשה להסביר במילים.",
    ],
    personalStory: [
      "התארחנו בבית ג'ן כחלק מטיול של כמה ימים בצפון.",
      "בית ג'ן הוא כפר דרוזי יפהפה השוכן בלב הרי הגליל העליון, ואי אפשר שלא להרגיש את הכנסת האורחים החמה של האנשים שפגשנו.",
      "אני כל כך אוהבת את זה שבמרחק נסיעה קצר אפשר להגיע לעולם אחר.",
      "תרבות אחרת.",
      "אנשים אחרים.",
      "נופים אחרים.",
      "ועדיין להרגיש בבית.",
      "לפני שעזבנו את הכפר היה ברור לי שאני חייבת לעצור במצפה הארי.",
      "כשהגענו... נעתקה נשימתי.",
      "היינו שם לבד.",
      "רק אנחנו.",
      "והנוף.",
      "עמדתי שם דקות ארוכות בלי לומר מילה.",
      "פשוט הסתכלתי.",
      "שהיתי.",
      "בהיתי.",
      "הייתי נוכחת ברגע.",
      "נשמתי.",
      "ונתתי לכל היופי הזה להיכנס פנימה.",
      "יש רגעים שהטבע מצליח להזכיר לנו כמה אנחנו קטנים, וכמה העולם גדול, יפה ומדויק.",
      "וזו בדיוק הייתה התחושה שלי שם.",
    ],
    cost: [
      { label: "כניסה", value: "חינם" },
      { label: "חניה", value: "יש חניה סמוכה" },
      { label: "משך בילוי", value: "20-40 דקות" },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "כן" },
      { label: "נגיש לעגלות", value: "כן" },
      { label: "זמן ביקור", value: "20-40 דקות" },
    ],
    gettingThere: {
      parking: "ניתן להגיע עם הרכב עד למצפה.",
      notes: [
        "מומלץ לבדוק את תקינות הרכב לפני נסיעה לאזור הררי.",
        "מומלץ לבדוק את מזג האוויר כדי ליהנות מראות טובה.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer:
          "כן. ההגעה קצרה והתצפית מתאימה גם למשפחות.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer: "כן.",
      },
      {
        question: "האם אפשר להיכנס למים?",
        answer: "לא.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן.",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer: "20-40 דקות.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "לאורך כל השנה. שעות הבוקר ואחר הצהריים מספקות את התאורה היפה ביותר.",
      },
    ],
    tips: [
      "אם כבר הגעתם לבית ג'ן - אל תוותרו על המצפה.",
      "הכבישים באזור הרריים ומפותלים - סעו בזהירות.",
    ],
    closingNote:
      "יש משהו בתצפיות שמרחיבות לי את הלב. כשאני עומדת מול אופק פתוח אני מרגישה שגם המחשבות נפתחות, התודעה מתרחבת, שהלב נרגע ושדברים מקבלים פרופורציות. כמה דקות מול נוף כזה ממלאות אותי באמת.",
    gallery: [
      {
        src: "/images/places/north/תצפית הר הארי/IMG_3456.jpeg",
        label: "מצפה הארי - נוף פנורמי על הרי הגליל העליון",
      },
      {
        src: "/images/places/north/תצפית הר הארי/IMG_3458.jpeg",
        label: "מצפה הארי - תצפית פתוחה מעל בית ג'ן",
      },
      {
        src: "/images/places/north/תצפית הר הארי/IMG_3469.jpeg",
        label: "מצפה הארי - אופק רחב מהר הארי",
      },
    ],
    gallerySubtitle: "",
    nearbyTripSlugs: ["chrmvn", "gmvn-hchvlh", "rsh-hnkrh"],
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "ben-shemen-forest",
    title: "יער בן שמן",
    subtitle:
      "יער גדול של קק\"ל בין בן שמן למודיעין. פיקניק, הליכה קצרה ודרכי נוף - בלי מסלול אחד לכל היער.",
    region: "מרכז",
    category: "טיול משפחתי",
    vehicleAccess: "soft-suv",
    visitedByMilana: true,
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
      label: "יער בן שמן - כניסת מצפה מודיעין, אחת מכמה כניסות",
      wazeUrl:
        "https://waze.com/ul?q=%D7%9E%D7%A6%D7%A4%D7%94%20%D7%9E%D7%95%D7%93%D7%99%D7%A2%D7%99%D7%9F%20%D7%99%D7%A2%D7%A8%20%D7%91%D7%9F%20%D7%A9%D7%9E%D7%9F&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=31.929%2C34.939",
    },
    seoTitle: "יער בן שמן - פיקניק, הליכה וכניסות ביער | בשביל הלב",
    metaDescription:
      "יער בן שמן הוא יער גדול של קק\"ל בין כביש 443 למודיעין. מדריך לביקור משפחתי: כניסות, חניוני פיקניק והליכה, בלי מרחק אחד לכל היער.",
    heroImage: "/images/places/center/יער בן שמן/hero.jpeg",
    heroImageLabel: "תמונת רקע - יער בן שמן",
    heroBackgroundImage: benShemenForestHeroBackground,
    wazeUrl:
      "https://waze.com/ul?q=%D7%9E%D7%A6%D7%A4%D7%94%20%D7%9E%D7%95%D7%93%D7%99%D7%A2%D7%99%D7%9F%20%D7%99%D7%A2%D7%A8%20%D7%91%D7%9F%20%D7%A9%D7%9E%D7%9F&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=31.929%2C34.939",
    highlights: [
      "משפחות עם ילדים",
      "פיקניק בצל",
      "הליכה קצרה מהחניון",
      "כמה שערי כניסה",
      "כניסה חינם",
      "דרכי נוף",
    ],
    about: [
      "יער בן שמן הוא יער של קק\"ל, כ-30,000 דונם, בין מחלף בן שמן למודיעין ומשני צדי כביש 443. זה אזור רחב, לא מסלול אחד: כמה שערי כניסה, חניונים, דרכי נוף ושבילי אופניים.",
      "ביקור משפחתי יכול להיות פיקניק בחניון, הליכה קצרה שיוצאת ממנו, או נסיעה בין החניונים בדרכי הנוף. אין כאן מרחק, זמן הליכה או חניה אחת שמתאימים לכל היער.",
      "לפי קק\"ל, ברוב החניונים יש שולחנות פיקניק נגישים. חניון הקהילות, עם גישה מכביש גמזו, כולל גם מתקני משחק, מים לשתייה ופינת ישיבה. חניון מצפה מודיעין ליד כביש 443, וחניון אנה נחום בין הכביש לתל חדיד, הם עוד נקודות עצירה עם שולחנות.",
      "הכניסה ליער ללא תשלום. יש גם דרכי נוף לרכב פרטי ודרכים לרכב 4x4. נוסעים רק בדרכים המותרות, ובמהירות נמוכה, כי ביער גם הולכים ברגל.",
    ],
    personalStory: [],
    cost: [
      { label: "כניסה", value: "חינם" },
      { label: "חניה", value: "בחניון של השער שנבחר" },
      { label: "משך בילוי", value: "לפי החניון והקצב" },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "כן" },
      { label: "נגיש לעגלות", value: "שולחנות נגישים ברוב החניונים" },
      { label: "זמן בילוי", value: "לפי הקצב, לא מסלול קבוע" },
    ],
    gettingThere: {
      parking:
        "אין חניה אחת לכל היער. בוחרים שער וחניון. הסיכה במפה היא כניסת מצפה מודיעין, לא כל היער.",
      notes: [
        "לפי קק\"ל, כניסה מוכרת היא מכביש 443 למצפה מודיעין, בין ק\"מ 6 ל-7. מכביש 1 פונים במחלף בן שמן מזרחה לכביש 443.",
        "שערים נוספים: תל חדיד בכביש 444, קדומים וקברות המכבים בכביש 443, מתתיהו ליד שילת, יער הרצל ליד גמזו, וגם כניסות ממודיעין.",
        "חניון הקהילות נגיש מכביש הגישה לגמזו. שם יש שולחנות נגישים, מים לשתייה ומתקני משחק.",
        "לפי הודעה באתר קק\"ל: החל מ-24.1.2024 ועד להודעה חדשה, מבני השירותים ביער סגורים. כדאי לבדוק עדכון ב-kkl.org.il לפני היציאה.",
        "בסופי שבוע החניונים מתמלאים. אחרי גשם דרכי העפר עלולות להיות בוציות.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer:
          "כן. אפשר לשבת בחניון, ללכת קצת מהשולחנות, ובחניון הקהילות יש גם מתקני משחק.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer:
          "ברוב החניונים יש שולחנות פיקניק נגישים. שבילי היער עצמם לא בהכרח מתאימים לעגלה.",
      },
      {
        question: "איפה חונים?",
        answer:
          "תלוי באיזה חלק של היער. מצפה מודיעין, חניון הקהילות, אנה נחום וקברות המכבים הם כמה מהחניונים, לא רשימה סגורה.",
      },
      {
        question: "כמה עולה כניסה?",
        answer: "לפי קק\"ל, הכניסה ליער ללא תשלום.",
      },
      {
        question: "האם זה מסלול 4x4?",
        answer:
          "לא מסלול אחד. יש דרכי נוף לרכב פרטי ודרכים לרכב 4x4. נוסעים רק בדרכים המסומנות.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "כל השנה. בקיץ מוקדם יותר נוח יותר. בסופי שבוע כדאי להגיע לפני שהחניונים מתמלאים.",
      },
    ],
    tips: [
      "בחרו מראש שער אחד וחניון אחד. היער גדול מכדי \"להספיק\" אותו.",
      "בדקו ב-kkl.org.il אם מבני השירותים עדיין סגורים.",
      "הביאו מים, כובע ומחצלת או אוכל לפיקניק.",
      "אחרי גשם, דרכי עפר עלולות להיות בוציות.",
      "נהיגה רק בדרכים המותרות, ובמהירות נמוכה.",
    ],
    closingNote:
      "בואו נשמור על היער נקי. קחו איתכם את האשפה.",
    gallery: [
      { src: "/images/places/center/יער בן שמן/IMG_0054.jpeg" },
      { src: "/images/places/center/יער בן שמן/IMG_0072.jpeg" },
      { src: "/images/places/center/יער בן שמן/IMG_0078.jpeg" },
      { src: "/images/places/center/יער בן שמן/IMG_0084.jpeg" },
      { src: "/images/places/center/יער בן שמן/IMG_5968.jpeg" },
      { src: "/images/places/center/יער בן שמן/IMG_9445.jpeg" },
      { src: "/images/places/center/יער בן שמן/IMG_9450.jpeg" },
      { src: "/images/places/center/יער בן שמן/IMG_9528.jpeg" },
    ],
    gallerySubtitle: "",
    nearbyPlaces: [
      {
        title: "שפך נחל שורק",
        description: "הליכה קלה בגן לאומי נחל רובין, ליד פלמחים",
        href: "/trips/nahal-sorek-estuary",
      },
    ],
    nearbySubtitle: "המשיכו לגלות את המרכז",
  },
  {
    slug: "nahal-sorek-estuary",
    title: "שפך נחל שורק",
    subtitle:
      "הליכה קלה בגן לאומי נחל רובין, מהנחל אל החולות. מתחילה בחורשת הצנחנים.",
    region: "מרכז",
    category: "תצפיות ונוף",
    visitedByMilana: true,
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
      lat: 31.9333,
      lng: 34.7233,
      label: "חורשת הצנחנים - תחילת ההליכה לשפך נחל שורק",
      wazeUrl:
        "https://waze.com/ul?q=%D7%97%D7%95%D7%A8%D7%A9%D7%AA%20%D7%94%D7%A6%D7%A0%D7%97%D7%A0%D7%99%D7%9D%20%D7%A4%D7%9C%D7%9E%D7%97%D7%99%D7%9D&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=31.9333%2C34.7233",
    },
    seoTitle: "שפך נחל שורק - הליכה בגן לאומי נחל רובין | בשביל הלב",
    metaDescription:
      "שפך נחל שורק הוא הליכה קלה בגן לאומי נחל רובין, ליד פלמחים. נקודת התחלה בחורשת הצנחנים, חניה, אופי המסלול והתאמה למשפחות.",
    heroImage: "/images/places/center/שפך נחל שורק/hero.jpeg",
    heroImageLabel: "תמונת רקע - שפך נחל שורק",
    heroBackgroundImage: nahalSorekEstuaryHeroBackground,
    wazeUrl:
      "https://waze.com/ul?q=%D7%97%D7%95%D7%A8%D7%A9%D7%AA%20%D7%94%D7%A6%D7%A0%D7%97%D7%A0%D7%99%D7%9D%20%D7%A4%D7%9C%D7%9E%D7%97%D7%99%D7%9D&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=31.9333%2C34.7233",
    highlights: [
      "משפחות עם ילדים",
      "הליכה קלה",
      "נחל וחולות",
      "תצפית לים",
      "נגיש בחלק הראשון",
      "ציפורים בעונה",
    ],
    about: [
      "שפך נחל שורק הוא גן לאומי נחל רובין, מדרום-מערב לראשון לציון וצפונית לקיבוץ פלמחים. כאן הנחל נפגש עם החולות והים.",
      "לפי רשות הטבע והגנים, ההליכה מתחילה ומסתיימת בחניון חורשת הצנחנים, ליד גשר הנחל על הכביש לפלמחים. המסלול המלא הוא כ-3.5 ק\"מ, ואפשר לקצר לכ-2 או 2.5 ק\"מ. זה מסלול קל, קווי או מעגלי, כשעתיים עד ארבע לפי האורך.",
      "300 המטרים הראשונים סלולים ומתאימים לעגלות ולכיסאות גלגלים, לאורך הגדה הדרומית ומתחת לגשר, עד סכר הסלעים. אחר כך השביל חולי ולא מתאים לעגלה.",
      "בדרך רואים את הנחל, עופות מים, ובעונה גם פריחה. בהמשך יש את אי הצבים, תצפית ודיונות. מי הנחל לא לשתייה ולא לרחצה, והכניסה לים מהמסלול אסורה.",
    ],
    personalStory: [],
    cost: [
      { label: "כניסה", value: "חינם" },
      { label: "חניה", value: "בחניון חורשת הצנחנים" },
      { label: "משך הליכה", value: "כשעתיים עד ארבע, לפי האורך" },
    ],
    quickFacts: [
      { label: "עלות", value: "חינם" },
      { label: "מתאים לילדים", value: "כן, מסלול קל" },
      { label: "נגיש לעגלות", value: "300 המטרים הראשונים" },
      { label: "אורך", value: "כ-3.5 ק\"מ, או קיצור" },
    ],
    gettingThere: {
      parking:
        "חניון חורשת הצנחנים, לצד כביש 4311 (כביש פלמחים), ליד גשר נחל שורק.",
      walking:
        "המסלול המלא כ-3.5 ק\"מ. אפשר לקצר לכ-2 או 2.5 ק\"מ. 300 המטרים הראשונים סלולים.",
      routeLength: "כ-3.5 ק\"מ במסלול המלא",
      notes: [
        "לפי רשות הטבע והגנים: מכביש 4 למחלף עין הקורא, ומשם מערבה בכביש 4311 כ-7 ק\"מ. בכיכר השנייה יוצאים ביציאה הרביעית מזרחה ופונים ימינה לחניון חורשת הצנחנים.",
        "ההליכה יוצאת מהחניון, עוברת מתחת לגשר, ומגיעה עד סכר הסלעים בקטע הסלול. המשך השביל חולי.",
        "האתר לא מופיע במחירון דמי הכניסה של רשות הטבע והגנים.",
        "מי הנחל אסורים בשתייה וברחצה. אין להיכנס למערת הגמדים, ואין לרדת במדרון התלול אל הים.",
        "רוב ההליכה חשופה לשמש. בקיץ רשות הטבע והגנים ממליצה על שעות אחר הצהריים. השהייה אחרי החשכה אסורה.",
        "פרטי המסלול: parks.org.il/trip/sorek",
      ],
    },
    faq: [
      {
        question: "איפה מתחילים?",
        answer:
          "בחניון חורשת הצנחנים, ליד גשר נחל שורק על הכביש לקיבוץ פלמחים. שם גם מסיימים במסלולים המעגליים.",
      },
      {
        question: "האם המקום מתאים לילדים?",
        answer:
          "כן. רשות הטבע והגנים מתארת את ההליכה כמסלול קל למשפחות. אפשר גם לקצר ולחזור.",
      },
      {
        question: "האם מתאים לעגלות?",
        answer:
          "רק 300 המטרים הראשונים, עד סכר הסלעים. אחר כך השביל חולי.",
      },
      {
        question: "כמה הולכים?",
        answer:
          "המסלול המלא כ-3.5 ק\"מ, כשעתיים עד ארבע. יש קיצורים של כ-2 ושל כ-2.5 ק\"מ.",
      },
      {
        question: "האם אפשר להיכנס למים?",
        answer:
          "לא. מי הנחל לא לשתייה ולא לרחצה, והכניסה לים מהמסלול אסורה.",
      },
      {
        question: "כמה עולה כניסה?",
        answer:
          "האתר לא מופיע במחירון דמי הכניסה של רשות הטבע והגנים, ואין במסלול שער תשלום.",
      },
    ],
    tips: [
      "התחילו מחורשת הצנחנים. בוויז: חורשת הצנחנים פלמחים.",
      "עם עגלה, עצרו בסכר הסלעים וחזרו באותה דרך.",
      "הביאו מים, כובע, קרם הגנה ונעלי הליכה. אחרי הקטע הסלול יש חול.",
      "אל תיכנסו למערת הגמדים ואל תרדו במדרון התלול לים.",
      "בקיץ עדיף אחר הצהריים. אל תישארו אחרי החשכה.",
    ],
    closingNote:
      "בואו נשמור על הגן הלאומי. לא נכנסים למים, לא משאירים אשפה, ולא מתקרבים לחיות הבר.",
    gallery: [
      { src: "/images/places/center/שפך נחל שורק/IMG_9156.jpeg" },
      { src: "/images/places/center/שפך נחל שורק/IMG_9166.jpeg" },
      { src: "/images/places/center/שפך נחל שורק/IMG_9432.jpeg" },
    ],
    gallerySubtitle: "",
    nearbyPlaces: [
      {
        title: "יער בן שמן",
        description: "יער גדול עם כמה חניונים וכניסות",
        href: "/trips/ben-shemen-forest",
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

function applyOfficialUrl(trip: Trip): Trip {
  if (trip.officialUrl) {
    return trip;
  }

  const officialUrl = tripOfficialUrlsBySlug[trip.slug];
  if (!officialUrl) {
    return trip;
  }

  const officialLinkKind = tripOfficialGuideSlugs.has(trip.slug) ? "guide" : "site";
  return { ...trip, officialUrl, officialLinkKind };
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
  if (trip.excludedFromSite === true || isHiddenFromPublic(trip.slug)) {
    return false;
  }

  return true;
}

export function getSiteVisibleTrips(): Trip[] {
  return trips.filter(isSiteVisibleTrip);
}

export const trips: Trip[] = [
  ...rawTrips.map(normalizeTripVehicleAccess),
  ...(visitedPlaceTrips as unknown as Trip[]),
]
  .map(applyVisitedPlaceFlags)
  .map(applyPlacesFilterSync)
  .map(applyOfficialUrl);

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
