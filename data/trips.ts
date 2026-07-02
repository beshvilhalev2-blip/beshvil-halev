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
      walking:
        "מסלול מעגלי מונגש יוצא מחניון חרובים - נוח גם לעגלות ולכיסאות גלגלים.",
      notes: [
        "משך הביקור המומלץ: 2-3 שעות.",
        "כמות המים משתנה בין העונות. בחורף ובאביב הזרימה בדרך כלל מרשימה יותר, ובחלק מימי הקיץ ייתכן שהמים יהיו דלים יותר.",
        "מומלץ לטייל בשעות האור. בסופי שבוע ובחגים כדאי להגיע מוקדם.",
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
      "אל תמהרו.",
      "תביאו מחצלת, אוכל טוב ותכננו לעצמכם פיקניק קטן.",
      "זה בדיוק מסוג המקומות שכיף פשוט לעצור בהם, לשבת בצל, להקשיב למים ולתת לילדים ליהנות מהטבע בלי למהר לשום מקום.",
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
    nearbyPlaces: [],
    nearbySubtitle: "",
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
    gallery: [
      {
        src: "/images/places/north/בריכת רם - מסעדה/IMG_2379.jpeg",
        label: "בריכת רם - תמונה 1",
      },
      {
        src: "/images/places/north/בריכת רם - מסעדה/IMG_2383%202.jpeg",
        label: "בריכת רם - תמונה 2",
      },
    ],
    gallerySubtitle: "",
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "chrmvn",
    title: "הר החרמון",
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
      walking:
        "ההליכה בשלג ובין המתקנים תלויה בכרטיס שנרכש ובתנאי השטח.",
      notes: [
        "שעות פתיחה: 08:00-16:00. כניסת רכבים עד 15:00 (אתר החרמון, skihermon.co.il).",
        "הכניסה לאתר בהזמנה מראש בלבד.",
        "כל הפעילויות מתקיימות בהתאם לתנאי מזג האוויר.",
        "עליה אחרונה ברכבל: 15:20. באטרקציות: 15:30.",
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
      "אם אתם מתכננים להגיע לחרמון, אני ממליצה מאוד ללון באזור לילה לפני.",
      "כך תוכלו להגיע רגועים, בלי נסיעה ארוכה על הבוקר, וליהנות הרבה יותר מהחוויה.",
      "ואם אתם מגיעים עם פעוטות - תגיעו עם ציפיות מותאמות.",
      "גם אם הם לא יזכרו את השלג, הם בהחלט ייהנו מהחוויה בדרך שלהם.",
    ],
    gallery: [
      {
        src: "/images/places/north/חרמון/IMG_2349%202.jpeg",
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
        src: "/images/places/north/חרמון/IMG_2362%202.jpeg",
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
      walking:
        "מסלולי הליכה, אופניים ורכב גולף/טוקטוק זמינים להשכרה באתר (agamon-hula.co.il).",
      notes: [
        "שעות פעילות (agamon-hula.co.il): א'-ה' כניסה 09:00-16:30, יציאה עד 18:00; שישי כניסה 08:00-16:00, יציאה עד 17:30; שבת כניסה 08:00-16:30, יציאה עד 18:00.",
        "מומלץ להתעדכן לפני ההגעה בשעות הפעילות העדכניות.",
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
      walking:
        "הגישה למעיין אינה סלולה לכל אורכה. מומלץ לאמת את תנאי השטח לפני ההגעה.",
      notes: [
        "משך הביקור המומלץ: שעה עד 3 שעות.",
        "רמת קושי: קלה.",
        "ניתן לרחצה במים.",
        "צל חלקי - חלק מהמקום חשוף לשמש.",
        "בסופי שבוע ובחגים המקום עשוי להיות עמוס.",
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
      "אם יש לכם אפשרות - תגיעו באמצע השבוע.",
      "המקום בדרך כלל שקט יותר ותוכלו ליהנות מהמים בקצב שלכם.",
      "ואל תשכחו להביא אוכל טוב.",
      "אין כמו פיקניק קטן ליד מעיין טבעי.",
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
      walking:
        "בשמורה שני מתחמים: מתחם המעיינות ומתחם המפל והשביל התלוי. כרטיס כניסה אחד מקנה כניסה לשניהם (parks.org.il).",
      notes: [
        "משך הביקור המומלץ: 2-3 שעות.",
        "רמת קושי: קלה עד בינונית.",
        "רחצה אסורה בתוך השמורה.",
        "חלק גדול מהמסלול מוצל.",
        "מומלץ לבדוק מראש את המחיר המעודכן באתר parks.org.il.",
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
      "אם אתם כבר מגיעים לבניאס, אני ממליצה לשלב אחר כך ארוחה במסעדת \"דג על הדן\".",
      "זאת אחת המסעדות הוותיקות והמוכרות באזור.",
      "המחירים אינם זולים, אבל החוויה מיוחדת מאוד.",
      "וכמובן - תגיעו עם נעלי הליכה טובות, מים ומנשא אם אתם מגיעים עם תינוק.",
      "אל תוותרו על המסלול רק בגלל שאין עגלה.",
      "לפעמים דווקא המקומות שדורשים מאיתנו קצת יותר - הופכים לזיכרונות הכי יפים.",
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
      walking:
        "מסלול קצר ומונגש מחניון המפל עד למרפסת התצפית על מפל התנור (parks.org.il).",
      notes: [
        "משך הביקור המומלץ: כשעה.",
        "רמת קושי: קלה.",
        "רחצה אסורה.",
        "צל חלקי - חלק גדול מהמסלול מוצל.",
        "מומלץ לתאם ביקור מראש באתר parks.org.il.",
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
      "אם אתם כבר מגיעים למטולה, אל תסתפקו רק במפל.",
      "שלבו את הטיול עם עוד נקודות באזור, וכך תהפכו את הנסיעה לצפון ליום מלא של טבע.",
      "ולפעמים...",
      "גם אם המסלול קצר, אל תמהרו.",
      "שבו כמה דקות מול המפל.",
      "תקשיבו לרעש המים.",
      "אלה בדיוק הרגעים שנשארים איתנו.",
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
    title: "פארק נחל נקרות - המקום שבו רפאל בחר לעשות את צעדיו הראשונים",
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
      walking:
        "שבילי הליכה נוחים בפארק, מונגשים ברובם לעגלות (kkl.org.il).",
      notes: [
        "משך הביקור המומלץ: כשעה.",
        "רמת קושי: קלה.",
        "רחצה: לא.",
        "יש אזורים מוצלים לצד אזורים פתוחים.",
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
      "אם אתם כבר נוסעים צפונה - אל תמהרו להגיע ליעד.",
      "לפעמים דווקא העצירות הקטנות בדרך הופכות לרגעים שהכי זוכרים.",
      "תביאו מחצלת, משהו טעים לאכול ופשוט תנו לילדים לרוץ.",
      "אף פעם אי אפשר לדעת איזה זיכרון מחכה לכם מעבר לפינה.",
    ],
    gallery: [
      { src: "/images/places/north/נחל נקרות יקנעם/IMG_0613.JPG", label: "פארק נחל נקרות ביקנעם" },
      { src: "/images/places/north/נחל נקרות יקנעם/IMG_0622%202.JPG", label: "פלגי מים בפארק נחל נקרות" },
      { src: "/images/places/north/נחל נקרות יקנעם/IMG_0630.JPG", label: "מדשאות ושבילים בפארק נחל נקרות" },
      { src: "/images/places/north/נחל נקרות יקנעם/IMG_3700.jpg", label: "פארק נחל נקרות יקנעם" },
    ],
    gallerySubtitle: "",
    nearbyPlaces: [],
    nearbySubtitle: "",
  },
  {
    slug: "rvb-rvy",
    title: "רוב רוי - המקום שבו הטבע, האנשים והפשטות נפגשים",
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
      walking: "ברוב שטח המתחם ניתן לטייל עם עגלות.",
      notes: [
        "משך הביקור המומלץ: שעה עד יום שלם.",
        "רמת קושי: קלה.",
        "רחצה: כן, באזורים המותרים.",
        "יש הרבה אזורים מוצלים.",
        "שעות פתיחה: 9:00-17:00, ירידה אחרונה למים ב-17:00 (robroy.co.il).",
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
      "אם אתם יכולים - תגיעו ביום שישי כשמתקיימת קבלת שבת.",
      "זאת אחת החוויות הכי מיוחדות שחוויתי בארץ.",
      "ואל תמהרו.",
      "זה בדיוק מסוג המקומות שלא באים אליהם כדי להספיק.",
      "באים כדי להיות.",
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
    title: "נחל הקיבוצים - המגלשה הטבעית שכל ילד חייב לחוות לפחות פעם אחת",
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
      label: "נחל הקיבוצים - פארק המעיינות",
      wazeUrl:
        "https://waze.com/ul?q=%D7%A0%D7%97%D7%9C%20%D7%94%D7%A7%D7%99%D7%91%D7%95%D7%A6%D7%99%D7%9D%20%D7%97%D7%A0%D7%99%D7%95%D7%9F&navigate=yes",
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
      "https://waze.com/ul?q=%D7%A0%D7%97%D7%9C%20%D7%94%D7%A7%D7%99%D7%91%D7%95%D7%A6%D7%99%D7%9D%20%D7%97%D7%A0%D7%99%D7%95%D7%9F&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32.497778%2C35.468333",
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
      parking: "יש חניה מסודרת סמוך לנחל. החניה והכניסה לפארק ללא תשלום (kkl.org.il).",
      walking:
        "מהחניה הולכים כמה דקות בלבד עד המים. בפארק יש שבילים מונגשים (kkl.org.il, parks.org.il).",
      notes: [
        "משך הביקור המומלץ: שעה עד כמה שעות.",
        "רמת קושי: קלה.",
        "רחצה: כן, באזורים המותרים.",
        "יש אזורים מוצלים, אך מומלץ להגיע עם כובע.",
        "אין כניסה לרכבים פרטיים לתוך שטח הפארק (kkl.org.il).",
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
      "המקום אהוב מאוד, ולכן כמעט תמיד תפגשו בו עוד משפחות.",
      "ואל תתנו לזה להרתיע אתכם.",
      "יש מספיק מקום לכולם, והאווירה בדרך כלל נעימה, משפחתית ומלאת שמחת חיים.",
      "תביאו את כל מה שאתם צריכים ליום של מים - אוכל, שתייה, מגבות, נעלי מים ומצופים לילדים שזקוקים להם.",
      "ואם הילדים מתאהבים במגלשה...",
      "פשוט תנו להם ליהנות.",
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
    title: "נחל האסי - המקום שבו הכול התחיל בשבילי",
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
      label: "נחל האסי - החוף הירוק",
      wazeUrl:
        "https://waze.com/ul?q=%D7%A0%D7%97%D7%9C%20%D7%94%D7%90%D7%A1%D7%99%20-%20%D7%94%D7%97%D7%95%D7%A3%20%D7%94%D7%99%D7%A8%D7%95%D7%A7&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=32.505265%2C35.452479",
    },
    seoTitle:
      "נחל האסי - אחד ממקומות הרחצה היפים בישראל | בשביל הלב",
    metaDescription:
      "נחל האסי הוא אחד ממקומות הרחצה האהובים בעמק המעיינות - מים צלולים, קפיצות למים, חוויה מושלמת למשפחות וסיפור אישי שהתחיל את המסע של \"בשביל הלב\".",
    heroImage: "/images/places/north/נחל האסי/IMG_1974.jpeg",
    heroImageLabel: "תמונת רקע - נחל האסי",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/נחל האסי/IMG_1974.jpeg")`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%A0%D7%97%D7%9C%20%D7%94%D7%90%D7%A1%D7%99%20-%20%D7%94%D7%97%D7%95%D7%A3%20%D7%94%D7%99%D7%A8%D7%95%D7%A7&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32.505265%2C35.452479",
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
      parking: "יש חניה מסודרת. לחניון החינמי ב-Waze: \"החוף הירוק - חניה\" (nir-david.co.il).",
      walking: "מהחניה יוצא שביל קצר אל שער הכניסה לחוף הירוק.",
      notes: [
        "משך הביקור המומלץ: שעתיים עד יום שלם.",
        "רמת קושי: קלה.",
        "רחצה: כן.",
        "יש אזורים מוצלים, אך מומלץ להגיע עם כובע.",
        "החוף הירוק פתוח לרחצה בימים א'-ו' בין 9:00-17:00, ללא תשלום (nir-david.co.il).",
        "סגור בשבתות, ימי חג וימי זיכרון (nir-david.co.il).",
        "אסור: מנגל, מוזיקה מוגברת, אוהלים, כלי זכוכית (nir-david.co.il).",
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
      "אם אתם מגיעים בקיץ - תגיעו מוקדם.",
      "עמק המעיינות חם מאוד בשעות הצהריים.",
      "תביאו הרבה מים, כובעים, אוכל, נעלי מים וכל מה שאתם צריכים ליום שלם.",
      "ואל תפחדו לתת לילדים להתנסות.",
      "לפעמים כל מה שהם צריכים זה לדעת שאתם שם בשבילם אם יצטרכו.",
    ],
    gallery: [
      { src: "/images/places/north/נחל האסי/IMG_1964.jpeg", label: "מים צלולים בנחל האסי" },
      { src: "/images/places/north/נחל האסי/IMG_1972.jpeg", label: "נחל האסי - החוף הירוק" },
      { src: "/images/places/north/נחל האסי/IMG_6233.JPG", label: "רחצה בנחל האסי" },
      { src: "/images/places/north/נחל האסי/IMG_6250%203.JPG", label: "נחל האסי בעמק המעיינות" },
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
      parking:
        "יש רחבת חניה סלולה ונגישה. מומלץ לחנות ברחבה השנייה, קרוב יותר לנקודת ההתחלה (kkl.org.il).",
      walking:
        "שביל מעגלי של כ-500 מ' סביב הפלג. יש שולחן פיקניק נגיש ליד החניה (kkl.org.il).",
      notes: [
        "משך הביקור המומלץ: 30 דקות עד שעה.",
        "רמת קושי: קלה.",
        "רחצה: אפשר לשכשך במים.",
        "יש צל.",
        "מכביש 71 פונים לכיוון גדעונה, כ-600 מ' מהגשר ו-200 מ' עד רחבת החניה (kkl.org.il).",
        "בסופי שבוע ובחגים המקום עלול להיות עמוס.",
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
      "אם אתם בדרך לצפון או בדרך חזרה הביתה - תשאירו לעצמכם עוד חצי שעה.",
      "תעצרו.",
      "תשתו קפה אם עגלת הקפה פתוחה.",
      "תנו לילדים להיכנס למים.",
      "ותמשיכו את הדרך עם חיוך.",
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
    title: "שמורת הטבע גמלא - הנוף הכי עוצמתי שפגשתי בישראל",
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
    heroImage: "/images/places/north/שמורת טבע גמלא/IMG_8812.jpeg",
    heroImageLabel: "תמונת רקע - שמורת הטבע גמלא",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("/images/places/north/שמורת טבע גמלא/IMG_8812.jpeg")`,
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
      parking: "יש חניה מסודרת בשמורה (parks.org.il).",
      walking:
        "שביל הנשרים הוא מסלול מעגלי נגיש באורך כ-600 מטר, עשוי בטון ובשיפוע מתון (parks.org.il).",
      notes: [
        "משך הביקור המומלץ: 2-3 שעות.",
        "רמת קושי: קלה במסלול הנגיש.",
        "מתאים לעגלות: המסלול הנגיש בלבד.",
        "רחצה: לא.",
        "צל: מעט מאוד - מומלץ להגיע עם כובע והרבה מים.",
        "שעון קיץ: א'-ה' ושבת 08:00-17:00, שישי וערבי חג 08:00-16:00. שעון חורף: א'-ה' ושבת 08:00-16:00, שישי וערבי חג 08:00-15:00 (parks.org.il).",
        "הכניסה לשמורה נסגרת שעה לפני שעות הסגירה הרשומות (parks.org.il).",
        "מומלץ לבדוק מראש את המחיר המעודכן באתר parks.org.il.",
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
      "אל תמהרו.",
      "תעצרו כמה דקות מול המצוקים.",
      "תסתכלו על הנשרים.",
      "ותזכרו שלא חייבים שהכול יהיה מושלם כדי שהטיול יהיה מושלם.",
    ],
    closingNote:
      "לא כל טיול חייב להיות מושלם כדי להיות משמעותי. לפעמים דווקא ההתמודדות היא זאת שנשארת איתנו. הטבע לימד אותי שגם לרגשות פחות נעימים יש מקום. וגם הם חלק מהדרך.",
    gallery: [
      { src: "/images/places/north/שמורת טבע גמלא/hero.jpeg", label: "שמורת הטבע גמלא" },
      { src: "/images/places/north/שמורת טבע גמלא/IMG_8814.jpeg", label: "מצוקי בזלת בשמורת גמלא" },
      { src: "/images/places/north/שמורת טבע גמלא/IMG_8821%202.jpeg", label: "נוף רמת הגולן משמורת גמלא" },
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
    title: "עין חרוד - בריכות טבעיות בצבע טורקיז עם נוף שפשוט עוצר את הנשימה",
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
      parking: "יש חניה מסודרת בגן הלאומי (parks.org.il).",
      walking:
        "שבילי בטון מונגשים מובילים לבריכות השכשוך, פינות פיקניק ואזורי הצל (parks.org.il).",
      notes: [
        "משך הביקור המומלץ: שעתיים עד יום שלם.",
        "רמת קושי: קלה.",
        "מתאים לעגלות: כן.",
        "רחצה: כן.",
        "צל: יש הרבה אזורים מוצלים.",
        "שעון קיץ: א'-ה' ושבת 08:00-17:00, שישי וערבי חג 08:00-16:00. שעון חורף: א'-ה' ושבת 08:00-16:00, שישי וערבי חג 08:00-15:00 (parks.org.il).",
        "הכניסה לגן נסגרת שעה לפני שעות הסגירה הרשומות (parks.org.il).",
        "יש אפשרות לחניון לילה בתיאום מראש (parks.org.il).",
        "מומלץ לבדוק מראש את המחיר המעודכן באתר parks.org.il.",
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
      "אם אתם יכולים - תגיעו באמצע השבוע.",
      "אנחנו הגענו כשהמקום היה כמעט ריק, וזאת הייתה אחת החוויות הכי נעימות שהיו לנו.",
      "קחו את הזמן.",
      "אל תמהרו.",
      "זה בדיוק מסוג המקומות שכיף פשוט להיות בהם.",
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
    title: "גני חוגה - יום שלם של מים טבעיים, מנוחה תחת העצים והרבה שלווה",
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
      parking: "יש חניה מסודרת למבקרים, כולל חניות נכים (huga.co.il).",
      walking:
        "שבילי גישה מהחניה למדשאות ולאגמים. הפארק שוכן באפיק נחל חמדיה (huga.co.il).",
      notes: [
        "משך הביקור המומלץ: חצי יום עד יום שלם - ואפשר גם להישאר ללינת קמפינג.",
        "רמת קושי: קלה.",
        "מתאים לעגלות: כן.",
        "רחצה: כן, בשעות פעילות המציל.",
        "צל: יש אזורי צל רבים מחוץ לבריכות, אך רוב הבריכות עצמן חשופות לשמש.",
        "אפריל-מאי וספטמבר-אוקטובר: א'-ו' 09:00-17:00, שבת 08:00-17:00. יוני: א'-ו' 09:00-17:00, שבת 08:00-18:00. יולי-אוגוסט: א'-ו' 09:00-18:00, שבת 08:00-18:00 (huga.co.il).",
        "נובמבר-פברואר: הפארק סגור (huga.co.il).",
        "הרחצה מסתיימת שעה לפני סגירת הפארק (huga.co.il).",
        "מומלץ לבדוק מראש ביומן הפארק שהוא פתוח בתאריך המבוקש (huga.co.il).",
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
      "אם אתם מגיעים בקיץ - תגיעו מוקדם והצטיידו בכל מה שצריך כדי להתמודד עם החום.",
      "אל תמהרו לעבור ממקום למקום.",
      "זה בדיוק מסוג המקומות שכדאי פשוט לפרוש מחצלת, להיכנס למים וליהנות מהיום.",
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
      parking: "יש חניה מסודרת למבקרים (rosh-hanikra.com).",
      walking:
        "בקצה הצפוני של כביש 4, כ-10 דקות צפונית לנהרייה. המסלול בין הנקרות אורך כ-200 מ' (rosh-hanikra.com).",
      notes: [
        "משך הביקור המומלץ: שעתיים-שלוש.",
        "רמת קושי: קלה.",
        "מתאים לעגלות: כן, רוב המסלול נגיש.",
        "רחצה: לא.",
        "צל: חלקי.",
        "בקיץ: א'-ה' ושבת 09:00-18:00, כניסה אחרונה, ב-19:00 האתר נסגר. שישי 09:00-16:00, כניסה אחרונה, ב-17:00 האתר נסגר (rosh-hanikra.com).",
        "בחורף: א'-שבת 09:00-16:00, כניסה אחרונה, ב-17:00 האתר נסגר (rosh-hanikra.com).",
        "מומלץ לבדוק מראש באתר הרשמי את מצב הפתיחה, פעילות הרכבל והמחירים (rosh-hanikra.com).",
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
      "אל תמהרו.",
      "תעצרו בתוך המערות, תקשיבו לרעש של הגלים ותנו לילדים לשאול שאלות.",
      "לפעמים כמה דקות של התבוננות שוות יותר מכל הסבר.",
      "אם אפשר - הגיעו בשעות הבוקר או אחר הצהריים, כשהאור מחמיא במיוחד לצבעי הים והסלעים.",
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
      parking: "יש חניה מסודרת סמוך לתחילת המסלול (westgalil.org.il).",
      walking:
        "מהחניה הליכה קצרה של כ-100 מ' עד בריכות השכשוך הראשונות (teva.org.il).",
      notes: [
        "משך הביקור המומלץ: שעתיים-שלוש.",
        "רמת קושי: קלה.",
        "מתאים לעגלות: לא - ההליכה בתוך הנחל אינה מתאימה לעגלות.",
        "רחצה: כן.",
        "צל: חלקי - רוב המסלול מוצל על ידי עצי הנחל, אך יש גם קטעים חשופים.",
        "הכניסה חינמית וללא הגבלת שעות (teva.org.il).",
        "המקום נמצא באזור שמורת טבע נחל כזיב - מומלץ לבדוק מראש את מצב הגישה והפתיחה (parks.org.il).",
        "בימים עמוסים מומלץ להגיע מוקדם (teva.org.il).",
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
      "אם אתם מטיילים עם ילדים - תנו להם להוביל.",
      "גם אם זה רק לכמה דקות.",
      "תנו להם להרגיש שהם מגלים את הדרך בשבילכם.",
      "תופתעו כמה ביטחון ואחריות זה מוציא מהם.",
      "וכמובן - אל תשכחו נעלי מים.",
      "הן יהפכו את ההליכה להרבה יותר נעימה.",
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
    title: "החוף של מוש - אכזיב",
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
      parking: "יש חניה חופשית במקומות הייעודיים (moshachziv.com).",
      walking: "גישה ישירה מהחניה אל החוף.",
      notes: [
        "משך הביקור המומלץ: כמה שעות ועד יום שלם. ניתן גם ללון במקום.",
        "רמת קושי: קלה.",
        "מתאים לעגלות: כן.",
        "רחצה: כן.",
        "צל: יש אזורי ישיבה מוצלים לצד אזורים חשופים לשמש.",
        "הכניסה לחוף חופשית. השירותים במקום (אוכל, שתייה והשכרת ציוד) בתשלום לפי הצריכה.",
        "החוף פתוח לקהל הרחב ללא דמי כניסה (moshachziv.com).",
        "מומלץ לבדוק מראש באתר moshachziv.com את שעות הפעילות והאירועים.",
        "בימים עמוסים ובסופי שבוע החניה עלולה להתמלא (moshachziv.com).",
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
      "אם יש מקום אחד שלא כדאי למהר ממנו - זה כאן.",
      "תכננו את היום כך שתישארו עד השקיעה.",
      "תזמינו משהו טעים, תשבו מול הים ופשוט תהיו.",
      "זה חופש אמיתי.",
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
      walking: "גישה מהחניה אל מקומות האירוח והנוף במושבה.",
      notes: [
        "משך הביקור המומלץ: לילה אחד לפחות.",
        "רמת קושי: קלה.",
        "מתאים לעגלות: כן.",
        "רחצה: לא.",
        "צל: חלקי.",
        "אזור: דרום הכרמל - מושבת בת שלמה.",
        "עלות: משתנה בהתאם למקום הלינה.",
        "מדורה: רק במקומות שמאושרים לכך ועל פי הנחיות המקום.",
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
      "אל תמהרו לחזור.",
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
