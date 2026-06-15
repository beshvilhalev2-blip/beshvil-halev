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

const DRAFT_ARTICLE = "כתבה מלאה תעלה בקרוב";

const regionHeroBackgrounds: Record<string, string> = {
  צפון: nahalHashofetHeroBackground,
  מרכז: nahalSorekEstuaryHeroBackground,
  ירושלים: satafHeroBackground,
  דרום: nitzanimLakeHeroBackground,
};

function createDraftTrip(input: {
  slug: string;
  title: string;
  subtitle: string;
  region: string;
  category: string;
  description: string;
  nearbySubtitle: string;
}): Trip {
  return {
    slug: input.slug,
    title: input.title,
    subtitle: input.subtitle,
    region: input.region,
    category: input.category,
    featured: false,
    metaDescription: input.description,
    heroImageLabel: `תמונת רקע — ${input.title}`,
    heroBackgroundImage: regionHeroBackgrounds[input.region],
    about: [input.description, DRAFT_ARTICLE],
    personalStory: [DRAFT_ARTICLE],
    cost: [
      { label: "כניסה", value: "—", note: "[placeholder]" },
      { label: "חניה", value: "—", note: "[placeholder]" },
      { label: "משך בילוי", value: "—", note: "[placeholder]" },
    ],
    tips: [DRAFT_ARTICLE],
    gallery: [
      { label: input.title, gradient: "from-stone-400/40 to-stone-600/30" },
    ],
    gallerySubtitle: "תמונות — יוחלפו בתוכן אמיתי",
    nearbyPlaces: [],
    nearbySubtitle: input.nearbySubtitle,
  };
}

const draftTrips: Trip[] = [
  createDraftTrip({ slug: "mitzpe-arbel", title: "מצפה ארבל", subtitle: "נקודת תצפית מרהיבה על הכנרת והגליל", region: "צפון", category: "תצפית ונוף", description: "מצפה ארבל מציע נוף פנורמי על הכנרת, הגליל והרי הגליל העליון.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "nahal-dan", title: "נחל דן", subtitle: "אחד הנחלים היפים בישראל — מים צלולים וצמחייה עשירה", region: "צפון", category: "טיול מים", description: "נחל דן הוא מסלול מים קסום בלב שמורת הבניאס, עם מים קרירים וצמחייה ירוקה.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "brechat-ram", title: "בריכת רם", subtitle: "ברכה וולקנית יפהפיה בלב רמת הגולן", region: "צפון", category: "שמורת טבע", description: "בריכת רם היא ברכה טבעית עמוקה ומרהיבה, מוקפת בנוף גולני פתוח.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "hermon", title: "חרמון", subtitle: "פסגת החרמון — שלג, טבע ונוף מרהיב", region: "צפון", category: "טבע והרים", description: "החרמון הוא יעד לטיולים בעונות השנה, עם מסלולים, שלג בחורף ונוף מדהים.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "agamon-hahula", title: "אגמון החולה", subtitle: "שמורת ציפורים ונוף ביצותי קסום", region: "צפון", category: "שמורת טבע", description: "אגמון החולה הוא שמורת טבע ייחודית עם ציפורים, שבילי תצפית ונוף ביצותי מרהיב.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "kibbutz-afikim", title: "קיבוץ אפיקים", subtitle: "קיבוץ על שפת הכנרת בגליל התחתון", region: "צפון", category: "טיול משפחתי", description: "קיבוץ אפיקים ממוקם על שפת הכנרת ומתאים לבילוי משפחתי באזור הגליל.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "yavneel", title: "יבניאל", subtitle: "עיירה שקטה על שפת הכנרת", region: "צפון", category: "טיול משפחתי", description: "יבניאל היא עיירה יפה בגליל התחתון, עם נוף לכנרת ואווירה כפרית נעימה.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "kfar-kama", title: "כפר כמא", subtitle: "כפר צ'רקסי עם אירוח וטבע בגליל", region: "צפון", category: "טיול משפחתי", description: "כפר כמא הוא כפר צ'רקסי בגליל התחתון, עם אווירה מיוחדת וחוויות תרבותיות.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "park-hamaayanot", title: "פארק המעיינות", subtitle: "פארק ירוק ליד עמק המעיינות", region: "צפון", category: "פארק", description: "פארק המעיינות הוא פארק משפחתי ירוק באזור עמק המעיינות, מתאים לבילוי רגוע בטבע.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "maayan-hasusim", title: "מעיין הסוסים", subtitle: "מעיין קסום בלב הגולן", region: "צפון", category: "מעיין", description: "מעיין הסוסים הוא מעיין טבעי בגולן עם מים צלולים ואווירה שקטה.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "shmorat-habanyas", title: "שמורת הבניאס", subtitle: "מקור הירדן — מים, צמחייה ושבילים", region: "צפון", category: "שמורת טבע", description: "שמורת הבניאס היא שמורת טבע עם מקורות הירדן, שבילי הליכה ומסלולי מים.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "dag-al-hadan", title: "דג על הדן", subtitle: "חוויה ומסעדה על גדות נחל דן", region: "צפון", category: "מסעדה וטבע", description: "דג על הדן הוא מקום לאוכל וחוויה על גדות נחל דן, בסמוך לשמורת הבניאס.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "maapal-tanur", title: "מפל תנור", subtitle: "מפל מרהיב בגליל העליון", region: "צפון", category: "טיול מים", description: "מפל תנור הוא מפל יפהפה בגליל העליון, מתאים לטיול קצר וחוויה בטבע.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "nahal-nakrot-yokneam", title: "נחל נקרות יקנעם", subtitle: "מסלול נחל בסמוך ליקנעם", region: "צפון", category: "טיול מים", description: "נחל נקרות יקנעם מציע מסלול נחל עם מים וצמחייה באזור יקנעם.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "rob-roy", title: "רוב רוי", subtitle: "מסלול בשמורת הציפורים באגמון החולה", region: "צפון", category: "שמורת טבע", description: "רוב רוי הוא מסלול ידוע באגמון החולה, עם תצפיות על ציפורים ונוף ביצותי.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "nahal-hakibbutzim", title: "נחל הקיבוצים", subtitle: "נחל זורם בגליל התחתון", region: "צפון", category: "טיול מים", description: "נחל הקיבוצים הוא מסלול נחל נעים בגליל התחתון, מתאים למשפחות.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "nahal-hasi", title: "נחל האסי", subtitle: "נחל ומפלים באזור כרמיאל", region: "צפון", category: "טיול מים", description: "נחל האסי מציע מסלול עם מים, מפלים וצמחייה ירוקה באזור כרמיאל.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "horeshat-gidonah", title: "חורשת גדעונה", subtitle: "יער ייחודי ליד המישור החופי", region: "צפון", category: "יער", description: "חורשת גדעונה היא יער מיוחד עם צמחייה ים-תיכונית, שבילי הליכה ופינות צל.", nearbySubtitle: "המשיכו לגלות את הצפון" }),
  createDraftTrip({ slug: "safari-ramat-gan", title: "ספארי רמת גן", subtitle: "ספארי וגן חיות במרכז הארץ", region: "מרכז", category: "חיות וטבע", description: "ספארי רמת גן הוא גן חיות וספארי מוכר, עם חוויה משפחתית קרובה לבית.", nearbySubtitle: "המשיכו לגלות את המרכז" }),
  createDraftTrip({ slug: "park-ariel-sharon", title: "פארק אריאל שרון", subtitle: "פארק גדול עם שבילים ואזורי בילוי", region: "מרכז", category: "פארק", description: "פארק אריאל שרון הוא פארק נרחב עם שבילי הליכה, אופניים ואזורי פיקניק.", nearbySubtitle: "המשיכו לגלות את המרכז" }),
  createDraftTrip({ slug: "park-mayim-shefayim", title: "פארק מים שפיים", subtitle: "פארק מים משפחתי באזור השרון", region: "מרכז", category: "פארק", description: "פארק מים שפיים הוא יעד קיץ משפחתי עם מתקני מים ואזורי בילוי.", nearbySubtitle: "המשיכו לגלות את המרכז" }),
  createDraftTrip({ slug: "park-raanana", title: "פארק רעננה", subtitle: "פארק עירוני ירוק ונעים", region: "מרכז", category: "פארק", description: "פארק רעננה הוא פארק עירוני גדול עם דשא, שבילים ומתקנים למשפחות.", nearbySubtitle: "המשיכו לגלות את המרכז" }),
  createDraftTrip({ slug: "nahal-alexander", title: "נחל אלכסנדר", subtitle: "נחל ארוך עם שבילים וטבע במישור החוף", region: "מרכז", category: "טיול מים", description: "נחל אלכסנדר הוא נחל משמעותי במישור החוף, עם שבילים ונקודות טבע לאורך הדרך.", nearbySubtitle: "המשיכו לגלות את המרכז" }),
  createDraftTrip({ slug: "laget-bachayot", title: "לגעת בחיות", subtitle: "חוויה חווייתית עם חיות במרכז", region: "מרכז", category: "חיות וטבע", description: "לגעת בחיות הוא מקום לחוויה משפחתית עם חיות, מתאים במיוחד לילדים.", nearbySubtitle: "המשיכו לגלות את המרכז" }),
  createDraftTrip({ slug: "hof-atlit", title: "חוף עתלית", subtitle: "חוף ים נעים על המישור החופי", region: "מרכז", category: "חוף", description: "חוף עתלית הוא חוף ים פופולרי עם מים רדודים, מתאים לבילוי משפחתי.", nearbySubtitle: "המשיכו לגלות את המרכז" }),
  createDraftTrip({ slug: "hof-olga", title: "חוף אולגה", subtitle: "חוף רחב עם דשא ומים רדודים", region: "מרכז", category: "חוף", description: "חוף אולגה הוא אחד החופים האהובים במישור החופי, עם שטחים ירוקים וים.", nearbySubtitle: "המשיכו לגלות את המרכז" }),
  createDraftTrip({ slug: "matzpor-viker", title: "מצפור ויקר", subtitle: "מבצר עתיק עם נוף על החוף", region: "מרכז", category: "תצפית ונוף", description: "מצפור ויקר הוא אתר היסטורי עם תצפית על הים והסביבה.", nearbySubtitle: "המשיכו לגלות את המרכז" }),
  createDraftTrip({ slug: "nahal-taninim", title: "נחל תנינים", subtitle: "שמורת טבע עם נחל, גשרים ותצפיות", region: "מרכז", category: "שמורת טבע", description: "נחל תנינים הוא שמורת טבע עם שבילים, גשר תצפית ונוף ייחודי.", nearbySubtitle: "המשיכו לגלות את המרכז" }),
  createDraftTrip({ slug: "maagan-michael", title: "מעגן מיכאל", subtitle: "חוף, מים רדודים ופינת צד של הים", region: "מרכז", category: "חוף", description: "מעגן מיכאל הוא חוף ים שקט עם מים רדודים, מתאים למשפחות.", nearbySubtitle: "המשיכו לגלות את המרכז" }),
  createDraftTrip({ slug: "shmorat-palmachim", title: "שמורת פלמחים", subtitle: "שמורת חוף עם דיונות וטבע", region: "מרכז", category: "שמורת טבע", description: "שמורת פלמחים משלבת חוף ים, דיונות ושבילי טבע — חוויה ייחודית במרכז.", nearbySubtitle: "המשיכו לגלות את המרכז" }),
  createDraftTrip({ slug: "tel-afek", title: "תל אפק", subtitle: "אתר ארכיאולוגי ונוף מרהיב", region: "מרכז", category: "אתר ארכיאולוגי", description: "תל אפק הוא אתר ארכיאולוגי עם שרידים היסטוריים, בריכות מים ונוף פתוח.", nearbySubtitle: "המשיכו לגלות את המרכז" }),
  createDraftTrip({ slug: "yekev-kerem-barak", title: "יקב כרם ברק", subtitle: "יקב וביקור יין באזור המרכז", region: "מרכז", category: "יקב", description: "יקב כרם ברק מציע חוויית יין באזור המרכז, עם סיורים וטעימות.", nearbySubtitle: "המשיכו לגלות את המרכז" }),
  createDraftTrip({ slug: "gan-hachayot-hatanachi", title: "גן החיות התנ״כי", subtitle: "גן חיות עם חיות מהתנ״ך — חוויה משפחתית", region: "ירושלים", category: "חיות וטבע", description: "גן החיות התנ״כי בירושלים מציג חיות מהתנ״ך בסביבה ירוקה ונעימה.", nearbySubtitle: "המשיכו לגלות את ירושלים והסביבה" }),
  createDraftTrip({ slug: "aquarium-israel", title: "אקווריום ישראל", subtitle: "אקווריום גדול עם עולם ימי מרהיב", region: "ירושלים", category: "חיות וטבע", description: "אקווריום ישראל בירושלים מציע חוויה משפחתית עם דגים, ים וטבע.", nearbySubtitle: "המשיכו לגלות את ירושלים והסביבה" }),
  createDraftTrip({ slug: "park-yotvata", title: "פארק יטבתה", subtitle: "פארק משפחתי בדרום עם מתקנים וירוק", region: "דרום", category: "פארק", description: "פארק יטבתה הוא פארק משפחתי בדרום, עם מתקני משחק ואזורי בילוי.", nearbySubtitle: "המשיכו לגלות את הדרום" }),
  createDraftTrip({ slug: "hof-biankini", title: "חוף ביאנקיני", subtitle: "חוף ים יפהפה בדרום", region: "דרום", category: "חוף", description: "חוף ביאנקיני הוא חוף ים נעים בדרום, מתאים ליום משפחתי על החול.", nearbySubtitle: "המשיכו לגלות את הדרום" }),
  createDraftTrip({ slug: "eilat", title: "אילת", subtitle: "עיר הנופש — ים, שמש וחוויות", region: "דרום", category: "עיר", description: "אילת היא יעד חופשה מוביל בדרום, עם חופים, שוניות ואטרקציות למשפחות.", nearbySubtitle: "המשיכו לגלות את הדרום" }),
  createDraftTrip({ slug: "marina-ashkelon", title: "מרינה אשקלון", subtitle: "מרינה, חוף ואווירה ים-תיכונית", region: "דרום", category: "חוף", description: "מרינה אשקלון מציעה חוף, מסעדות ואווירה נעימה ליד הים.", nearbySubtitle: "המשיכו לגלות את הדרום" }),
  createDraftTrip({ slug: "lunada", title: "לונדע", subtitle: "פארק משחקים וחוויות בדרום", region: "דרום", category: "בילוי משפחתי", description: "לונדע הוא פארק משחקים וחוויות משפחתיות בדרום, מתאים לילדים.", nearbySubtitle: "המשיכו לגלות את הדרום" }),
];

export const trips: Trip[] = [
  {
    slug: "nahal-hashofet",
    title: "נחל השופט",
    subtitle: "מסלול מים קסום וקליל למשפחות בצפון",
    region: "צפון",
    category: "טיול מים",
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
  ...draftTrips,
];

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
