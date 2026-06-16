import type { TripMatcherProfile } from "@/lib/find-my-trip/trip-profile";

export type TripCostItem = {
  label: string;
  value: string;
  note?: string;
};

export type TripGalleryItem = {
  label: string;
  gradient?: string;
  src?: string;
};

export type TripNearbyPlace = {
  title: string;
  description: string;
  href: string;
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
  heroImage?: string;
  heroImageLabel: string;
  heroBackgroundImage: string;
  location?: TripLocation;
  wazeUrl?: string;
  googleMapsUrl?: string;
  highlights?: string[];
  about: string[];
  personalStory: string[];
  cost: TripCostItem[];
  tips: string[];
  gallery: TripGalleryItem[];
  gallerySubtitle: string;
  nearbyPlaces: TripNearbyPlace[];
  nearbySubtitle: string;
  vehicleAccess?: TripVehicleAccess;
  matcher?: TripMatcherProfile;
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

const einYorkeamHeroBackground = `
  linear-gradient(
    160deg,
    rgba(154, 52, 18, 0.75) 0%,
    rgba(194, 65, 12, 0.55) 40%,
    rgba(28, 25, 23, 0.7) 100%
  ),
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='desert' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23f97316'/%3E%3Cstop offset='50%25' stop-color='%23ea580c'/%3E%3Cstop offset='100%25' stop-color='%237c2d12'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23desert)' width='1920' height='1080'/%3E%3Cpath fill='%23c2410c' opacity='0.35' d='M0 650 Q400 550 800 630 T1600 600 T1920 640 L1920 1080 L0 1080 Z'/%3E%3Cpath fill='%23fb923c' opacity='0.2' d='M0 750 Q500 680 1000 740 T1920 720 L1920 1080 L0 1080 Z'/%3E%3C/svg%3E")
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

function normalizeTripVehicleAccess(trip: Trip): Trip {
  return {
    ...trip,
    vehicleAccess: trip.vehicleAccess ?? DEFAULT_TRIP_VEHICLE_ACCESS,
  };
}

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
      "מסלול מים קסום וקליל למשפחות בצפון — מדריך מלא לנחל השופט עם טיפים, עלויות ומקומות נוספים באזור",
    heroImageLabel: "תמונת רקע — נחל השופט",
    heroBackgroundImage: nahalHashofetHeroBackground,
    about: [
      "נחל השופט הוא אחד ממסלולי המים האהובים ביותר בגליל העליון — שביל מוצל לאורך נחל זורם, עם בריכות טבעיות, צמחייה עשירה ואווירה קסומה שמתאימה לכל המשפחה.",
      "המסלול עובר בין עצי אורן ושיטה, עם נקודות עצירה לאורך הדרך שבהן אפשר להתרענן, לשכשך וליהנות מהטבע. זהו מקום מושלם ליום טיול רגוע, במיוחד בחודשי הקיץ החמים.",
      "[טקסט מקום — יוחלף בתוכן אמיתי]",
    ],
    personalStory: [
      "בפעם הראשונה שהגענו לנחל השופט, הילדים רצו ישר למים — ואנחנו עמדנו רגע והתבוננו בירוק שמקיף את הנחל. היה שקט, רק קול המים וציוץ הציפורים.",
      "מאז חזרנו לכאן כמה פעמים, בכל פעם מגלה משהו חדש: פינה שקטה, בריכה עמוקה יותר, או פשוט רגע של חיבור למשפחה ולטבע.",
      "[סיפור אישי — יוחלף בתוכן אמיתי]",
    ],
    cost: [
      { label: "כניסה", value: "חינם", note: "[placeholder]" },
      { label: "חניה", value: "₪—", note: "[placeholder]" },
      { label: "משך טיול", value: "2–3 שעות", note: "[placeholder]" },
    ],
    tips: [
      "הגיעו מוקדם בבוקר — במיוחד בסופי שבוע וחגים",
      "הביאו נעלי מים נוחות ומגבת לכל המשפחה",
      "שמרו על ניקיון המקום והשאירו רק טביעות אצבעות",
      "בדקו מראש את מצב המים ורמת הקושי של המסלול",
      "חנו בחניון המסודר ולכו ברגל עד לנקודת הכניסה",
    ],
    gallery: [
      { label: "בריכות טבעיות", gradient: "from-emerald-400/40 to-teal-600/30" },
      { label: "שביל לאורך הנחל", gradient: "from-teal-400/40 to-cyan-600/30" },
      { label: "צמחייה ירוקה", gradient: "from-green-400/40 to-emerald-700/30" },
      { label: "משפחה בטיול", gradient: "from-sky-400/40 to-blue-600/30" },
      { label: "מפל קטן", gradient: "from-cyan-400/40 to-teal-700/30" },
      { label: "נוף מהשביל", gradient: "from-emerald-500/40 to-stone-600/30" },
    ],
    gallerySubtitle: "תמונות מהמסלול — יוחלפו בתוכן אמיתי",
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
    slug: "ein-yorkeam",
    title: "עין ירקעם",
    subtitle: "נווה מדבר מרהיב עם מפל ובריכות טבעיות בדרום",
    region: "דרום",
    category: "טיול מים",
    matcher: {
      activities: ["water", "easy-trails", "viewpoint"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: "free",
      weatherTraits: ["water-friendly", "heat-sensitive"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        "beer-sheva": "1h",
        arad: "1h",
        dimona: "1h",
        jerusalem: "1h-plus",
        modiin: "1h-plus",
      },
    },
    location: {
      lat: 31.378,
      lng: 35.179,
      label: "חניון עין ירקעם",
    },
    metaDescription:
      "עין ירקעם — מסלול מים בדרום עם מפל מרהיב ובריכות טבעיות. מדריך עם טיפים, עלויות ומקומות נוספים באזור",
    heroImageLabel: "תמונת רקע — עין ירקעם",
    heroBackgroundImage: einYorkeamHeroBackground,
    about: [
      "עין ירקעם הוא אחד המקומות המרהיבים ביותר במדבר יהודה — מפל טבעי זורם לבריכות קרירות בלב נוף מדברי עוצר נשימה.",
      "המסלול מתאים לטיולים משפחתיים ולחובבי צילום, עם שביל מסודר שמוביל אל המעיין והמפל. בחודשי הקיץ זהו יעד מבוקש, ולכן מומלץ להגיע מוקדם.",
      "[טקסט מקום — יוחלף בתוכן אמיתי]",
    ],
    personalStory: [
      "הגענו לעין ירקעם בשעות הבוקר המוקדמות, כשהשמש עדיין נמוכה והצללים על הסלעים יצרו ציורים מדהימים. הרגשתי שהגענו לפינה נסתרת של המדבר.",
      "הילדים שיחקו במים והמפל שרגע לבדו את כל המקום. זה היה אחד הימים שבהם הבנתי למה שווה לצאת מהבית ולגלות את הארץ מקרוב.",
      "[סיפור אישי — יוחלף בתוכן אמיתי]",
    ],
    cost: [
      { label: "כניסה", value: "חינם", note: "[placeholder]" },
      { label: "חניה", value: "₪—", note: "[placeholder]" },
      { label: "משך טיול", value: "1.5–2 שעות", note: "[placeholder]" },
    ],
    tips: [
      "הגיעו מוקדם — במיוחד בקיץ, המקום מתמלא במהירות",
      "הביאו הרבה מים, כובע וקרם הגנה — אין צל לאורך כל המסלול",
      "נעלי הליכה עם אחיזה טובה — השביל סלעי וחלק",
      "אין שירותים בנקודת החניה — תכננו מראש",
      "בדקו מראש אם המפל זורם — תלוי בעונת השנה",
    ],
    gallery: [
      { label: "המפל בירקעם", gradient: "from-orange-400/40 to-rose-600/30" },
      { label: "בריכות טבעיות", gradient: "from-amber-400/40 to-orange-700/30" },
      { label: "נוף מדברי", gradient: "from-rose-400/40 to-red-700/30" },
      { label: "שביל הסלעים", gradient: "from-yellow-400/40 to-amber-600/30" },
      { label: "שקיעה במדבר", gradient: "from-orange-500/40 to-stone-700/30" },
      { label: "משפחה בטיול", gradient: "from-red-400/40 to-orange-600/30" },
    ],
    gallerySubtitle: "תמונות מהמסלול — יוחלפו בתוכן אמיתי",
    nearbyPlaces: [
      {
        title: "מכתש רמון",
        description: "המכתש הגדול בעולם — נוף גיאולוגי מרהיב",
        href: "#",
      },
      {
        title: "עין עבדת",
        description: "מעיין מדברי עם היסטוריה עשירה ונוף פנורמי",
        href: "#",
      },
      {
        title: "הסטף",
        description: "מעיינות וטרסות עתיקות בהרי ירושלים",
        href: "/trips/sataf",
      },
    ],
    nearbySubtitle: "המשיכו לגלות את הדרום",
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
      "הסטף — מעיינות וטרסות עתיקות בהרי ירושלים. מדריך מלא עם טיפים, עלויות ומקומות נוספים באזור",
    heroImageLabel: "תמונת רקע — הסטף",
    heroBackgroundImage: satafHeroBackground,
    about: [
      "הסטף הוא אחד האתרים היפים ביותר בהרי ירושלים — שילוב של מעיינות טבעיים, טרסות חקלאיות עתיקות ושבילי הליכה מוצלים בין עצי זית ואלון.",
      "האתר מנוהל על ידי קק״ל ומציע מספר מסלולים בדרגות קושי שונות, עם נקודות עצירה לאורך הדרך ונוף מרהיב על עמק האלה וירושלים.",
      "[טקסט מקום — יוחלף בתוכן אמיתי]",
    ],
    personalStory: [
      "ביקרנו בהסטף ביום אביבי נעים, כשהכל ירוק ופרח. הלכנו בשביל שעובר בין הטרסות ולמדנו על חקלאות עתיקה — חוויה שמשלבת טבע והיסטוריה.",
      "עצרנו ליד אחד המעיינות, שתינו מים קרירים ופשוט נהנינו מהשקט. זה מקום שמאלץ אותך להאט ולהתבונן.",
      "[סיפור אישי — יוחלף בתוכן אמיתי]",
    ],
    cost: [
      { label: "כניסה", value: "חינם", note: "[placeholder]" },
      { label: "חניה", value: "₪—", note: "[placeholder]" },
      { label: "משך טיול", value: "2–4 שעות", note: "[placeholder]" },
    ],
    tips: [
      "בחרו מסלול מתאים לרמת הכושר — יש מסלולים קלים ומאתגרים",
      "הביאו נעלי הליכה נוחות — השבילים סלעיים בחלקם",
      "הגיעו בשעות הבוקר המוקדמות לחוויה שקטה יותר",
      "שמרו על הטרסות — אל תיכנסו לשטחי החקלאות",
      "בדקו באתר קק״ל לגבי שעות פתיחה ואירועים מיוחדים",
    ],
    gallery: [
      { label: "טרסות עתיקות", gradient: "from-stone-400/40 to-amber-700/30" },
      { label: "מעיין הסטף", gradient: "from-amber-400/40 to-stone-600/30" },
      { label: "שביל בין הכרמים", gradient: "from-green-400/40 to-stone-700/30" },
      { label: "נוף על העמק", gradient: "from-sky-400/40 to-stone-600/30" },
      { label: "עצי זית עתיקים", gradient: "from-lime-400/40 to-amber-700/30" },
      { label: "שקיעה בהרים", gradient: "from-orange-400/40 to-stone-700/30" },
    ],
    gallerySubtitle: "תמונות מהמסלול — יוחלפו בתוכן אמיתי",
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
        title: "עין ירקעם",
        description: "נווה מדבר מרהיב עם מפל ובריכות טבעיות",
        href: "/trips/ein-yorkeam",
      },
    ],
    nearbySubtitle: "המשיכו לגלות את ירושלים והסביבה",
  },
  {
    slug: "ein-bokek",
    title: "עין בוקק",
    subtitle: "נחל מים ומפלים בלב מדבר יהודה — חוויה משפחתית בדרום",
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
      "עין בוקק — נחל מים ומפלים במדבר יהודה. מדריך מלא עם טיפים, עלויות ומקומות נוספים באזור",
    heroImageLabel: "תמונת רקע — עין בוקק",
    heroBackgroundImage: einBokekHeroBackground,
    about: [
      "עין בוקק הוא נחל זורם בצפון מדבר יהודה, עם מפלים, בריכות טבעיות ושביל מסודר שמתאים למשפחות.",
      "האזור משלב נוף מדברי מרהיב עם פינות ירוקות לאורך הנחל — מקום מושלם ליום טיול בחודשי הקיץ.",
      "[טקסט מקום — יוחלף בתוכן אמיתי]",
    ],
    personalStory: [
      "הליכה לאורך הנחל עם רוח קלה וקול המים ברקע — כך נזכור את הבוקר הראשון בעין בוקק.",
      "הילדים קפצו בין הבריכות ואנחנו מצאנו פינה שקטה לקפה ולשקט. יום פשוט שהפך לזיכרון מושלם.",
      "[סיפור אישי — יוחלף בתוכן אמיתי]",
    ],
    cost: [
      { label: "כניסה", value: "חינם", note: "[placeholder]" },
      { label: "חניה", value: "₪—", note: "[placeholder]" },
      { label: "משך טיול", value: "2–3 שעות", note: "[placeholder]" },
    ],
    tips: [
      "הגיעו מוקדם — המקום פופולרי מאוד בסופי שבוע",
      "הביאו נעלי מים, מגבות ומים לשתייה",
      "שימו לב לשילוט — חלק מהמסלולים סגורים בעונות מסוימות",
      "אין צל לאורך כל השביל — כובע וקרם הגנה חובה",
      "בדקו מראש את זרימת המים בעונה",
    ],
    gallery: [
      { label: "מפלי עין בוקק", gradient: "from-amber-400/40 to-orange-700/30" },
      { label: "בריכות בנחל", gradient: "from-yellow-400/40 to-amber-600/30" },
      { label: "שביל לאורך המים", gradient: "from-orange-400/40 to-rose-600/30" },
      { label: "נוף מדברי", gradient: "from-red-400/40 to-orange-700/30" },
      { label: "משפחה בטיול", gradient: "from-amber-500/40 to-stone-600/30" },
      { label: "שקיעה בדרום", gradient: "from-orange-500/40 to-rose-700/30" },
    ],
    gallerySubtitle: "תמונות מהמסלול — יוחלפו בתוכן אמיתי",
    nearbyPlaces: [
      {
        title: "עין ירקעם",
        description: "נווה מדבר מרהיב עם מפל ובריכות טבעיות",
        href: "/trips/ein-yorkeam",
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
    subtitle: "אגם, חול ושקיעות — יום כיף משפחתי על חוף הדרום",
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
      "אגם ניצנים — אגם מלאכותי עם חוף ים בדרום. מדריך עם טיפים, עלויות ומקומות נוספים באזור",
    heroImageLabel: "תמונת רקע — אגם ניצנים",
    heroBackgroundImage: nitzanimLakeHeroBackground,
    about: [
      "אגם ניצנים הוא אגם מלאכותי יפהפה בחוף הדרומי, עם חוף מדורג, דשא, שבילי הליכה ואזורי פיקניק.",
      "המקום מתאים למשפחות שמחפשות יום שלם של טבע, מים ושקט — בלי לנסוע רחוק מהמרכז.",
      "[טקסט מקום — יוחלף בתוכן אמיתי]",
    ],
    personalStory: [
      "פשטנו שמיכה על הדשא, הילדים רצו למים ואנחנו נשארנו לצפות בשקיעה. לא ציפינו שמקום כל כך קרוב לבית ירגיש כמו חופשה.",
      "חזרנו לכאן כמה פעמים — בכל פעם עם פיקניק אחר, אבל תמיד עם אותה תחושה של רוגע.",
      "[סיפור אישי — יוחלף בתוכן אמיתי]",
    ],
    cost: [
      { label: "כניסה", value: "₪—", note: "[placeholder]" },
      { label: "חניה", value: "₪—", note: "[placeholder]" },
      { label: "משך בילוי", value: "חצי יום", note: "[placeholder]" },
    ],
    tips: [
      "הגיעו לפני השקיעה — הנוף מדהים בשעות הערב",
      "הביאו ציוד פיקניק, מגבות וקרם הגנה",
      "בדקו שעות פתיחה וכללי בטיחות במים",
      "בסופי שבוע חנו מוקדם — המקום מתמלא",
      "שמרו על ניקיון האגם והחוף",
    ],
    gallery: [
      { label: "האגם", gradient: "from-cyan-400/40 to-blue-700/30" },
      { label: "חוף הים", gradient: "from-sky-400/40 to-cyan-600/30" },
      { label: "שבילי הליכה", gradient: "from-teal-400/40 to-emerald-700/30" },
      { label: "פיקניק על הדשא", gradient: "from-green-400/40 to-cyan-600/30" },
      { label: "שקיעה על האגם", gradient: "from-orange-400/40 to-cyan-700/30" },
      { label: "משפחה בטיול", gradient: "from-blue-400/40 to-sky-600/30" },
    ],
    gallerySubtitle: "תמונות מהמקום — יוחלפו בתוכן אמיתי",
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
        title: "עין ירקעם",
        description: "מפל ובריכות טבעיות במדבר יהודה",
        href: "/trips/ein-yorkeam",
      },
    ],
    nearbySubtitle: "המשיכו לגלות את הדרום",
  },
  {
    slug: "ein-moda",
    title: "עין מודע",
    subtitle: "מים צלולים, צל טבעי והמון מקום לילדים להשתולל",
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
    heroImage: einModaImages[0],
    heroImageLabel: "תמונת רקע — עין מודע",
    heroBackgroundImage: `linear-gradient(160deg, rgba(6, 78, 59, 0.75) 0%, rgba(28, 25, 23, 0.7) 100%), url("${einModaImages[0]}")`,
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
    tips: [
      "להגיע מוקדם בבוקר",
      "להביא מחצלת או שמיכה לפיקניק",
      "להביא נעלי מים לילדים",
      "בסופי שבוע וחגים המקום יכול להיות עמוס",
      "לשלב עם טיולים נוספים באזור עמק המעיינות",
    ],
    gallery: [
      { label: "בריכת המעיין", src: einModaImages[0] },
      { label: "מים צלולים", src: einModaImages[1] },
      { label: "צל טבעי ועצים", src: einModaImages[2] },
      { label: "שולחנות פיקניק", src: einModaImages[3] },
    ],
    gallerySubtitle: "תמונות מעין מודע — בריכה, צל ופיקניק בטבע",
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
    slug: "ben-shemen-forest",
    title: "יער בן שמן",
    subtitle: "מסלולי שטח קלים בלב השפלה — הרפתקה משפחתית במרכז",
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
      "יער בן שמן — מסלולי שטח קלים במרכז. מדריך עם טיפים, עלויות ומקומות נוספים באזור",
    heroImageLabel: "תמונת רקע — יער בן שמן",
    heroBackgroundImage: benShemenForestHeroBackground,
    about: [
      "יער בן שמן הוא יער אורנים גדול בשפלה, עם שבילי שטח קלים שמתאימים למשפחות ולמתחילים בנהיגת שטח.",
      "האזור מציע שילוב של יער מוצל, נקודות תצפית ודרכי עפר נוחות — מושלם ליום טיול קצר מהמרכז.",
      "[טקסט מקום — יוחלף בתוכן אמיתי]",
    ],
    personalStory: [
      "נסענו ב-4x4 לראשונה ביער בן שמן — מסלול קל, ילדים מתרגשים ואנחנו נהנים מהיער הירוק ממש ליד הבית.",
      "עצרנו לפיקניק בין האורנים, והבנו שאין צורך לנסוע רחוק כדי להרגיש בשטח.",
      "[סיפור אישי — יוחלף בתוכן אמיתי]",
    ],
    cost: [
      { label: "כניסה", value: "חינם", note: "[placeholder]" },
      { label: "חניה", value: "חינם", note: "[placeholder]" },
      { label: "משך טיול", value: "2–4 שעות", note: "[placeholder]" },
    ],
    tips: [
      "מתאים למתחילים — התחילו במסלול הקל ביותר",
      "בדקו מראש את מצב הדרך — אחרי גשם הדרכים עלולות להיות בוציות",
      "הביאו מים, פיקניק ורפטיה",
      "שמרו על מהירות נמוכה — היער פופולרי עם הולכי רגל",
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
    gallerySubtitle: "תמונות מהמסלול — יוחלפו בתוכן אמיתי",
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
      "שפך נחל שורק — שמורת טבע עם תצפיות ונוף במרכז. מדריך מלא עם טיפים, עלויות ומקומות נוספים באזור",
    heroImageLabel: "תמונת רקע — שפך נחל שורק",
    heroBackgroundImage: nahalSorekEstuaryHeroBackground,
    about: [
      "שפך נחל שורק הוא שמורת טבע ייחודית במרכז, שבה נחל שורק פוגש את הים — עם שבילי תצפית, צמחייה מגוונת ועולם של ציפורים.",
      "המקום מתאים לטיול רגוע, צילום נוף ולמידה על אקוסיסטם של שפך — חוויה שונה מכל מסלול מים רגיל.",
      "[טקסט מקום — יוחלף בתוכן אמיתי]",
    ],
    personalStory: [
      "עמדנו על גשר התצפית וצפינו בציפורים שעפות מעל המים — הילדים היו מרותקים.",
      "הליכה שקטה, נשימה של אוויר ים ונחל יחד. מקום שלא שמענו עליו מספיק לפני שביקרנו.",
      "[סיפור אישי — יוחלף בתוכן אמיתי]",
    ],
    cost: [
      { label: "כניסה", value: "חינם", note: "[placeholder]" },
      { label: "חניה", value: "₪—", note: "[placeholder]" },
      { label: "משך טיול", value: "1.5–2.5 שעות", note: "[placeholder]" },
    ],
    tips: [
      "הביאו משקפת לצפייה בציפורים",
      "הגיעו בשעות הבוקר המוקדמות — שקט וציפורים פעילות",
      "נעלי הליכה נוחות — השבילים חוליים בחלקם",
      "שמרו על שקט — זו שמורת טבע",
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
    gallerySubtitle: "תמונות מהמקום — יוחלפו בתוכן אמיתי",
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

export const trips: Trip[] = rawTrips.map(normalizeTripVehicleAccess);

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((trip) => trip.slug === slug);
}

export function getAllTripSlugs(): string[] {
  return trips.map((trip) => trip.slug);
}

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find((region) => region.slug === slug);
}

export function getAllRegionSlugs(): string[] {
  return regions.map((region) => region.slug);
}

export function getTripsByRegionSlug(slug: string): Trip[] {
  const region = getRegionBySlug(slug);
  if (!region) return [];
  return trips.filter((trip) => trip.region === region.title);
}

export function getTripsByCategory(category: string): Trip[] {
  return trips.filter((trip) => trip.category === category);
}

export function getFeaturedTrips(): Trip[] {
  return trips.filter((trip) => trip.featured);
}

export function getHomepageTrips(limit = 6): Trip[] {
  const featured = getFeaturedTrips();
  const featuredSlugs = new Set(featured.map((trip) => trip.slug));
  const remaining = trips.filter((trip) => !featuredSlugs.has(trip.slug));

  return [...featured, ...remaining].slice(0, limit);
}
