/**
 * חנוכה 2026 בשביל הלב - תוכן המדריך.
 * מועדים וקישורים נבדקו מול עמודי המארגנים ב-23.11.2026.
 */

export const HANUKKAH_VERIFIED_ON = "23.11.2026";

export type HanukkahLinkKind = "register" | "info" | "updates" | "availability";

export const HANUKKAH_LINK_LABELS: Record<HanukkahLinkKind, string> = {
  register: "לפרטים ולהרשמה",
  info: "לפרטי הפעילות",
  updates: "לבדיקת עדכונים",
  availability: "לבדיקת זמינות",
};

export type HanukkahLink = {
  href: string;
  kind: HanukkahLinkKind;
  /** טקסט מותאם לכפתור במקום התווית לפי סוג */
  label?: string;
};

export type HanukkahEventRow = {
  date: string;
  /** סבבים או טווחי שעות שמוצגים מתחת לתאריך */
  times?: string[];
  place: string;
  title?: string;
  description: string;
  note?: string;
  link?: HanukkahLink;
};

export type HanukkahSectionNavItem = {
  id: string;
  label: string;
  icon: string;
};

export const HANUKKAH_SECTIONS: HanukkahSectionNavItem[] = [
  { id: "activities", label: "פעילויות בטבע", icon: "🕎" },
  { id: "after-dark", label: "אחרי החשכה", icon: "🌙" },
  { id: "maccabees", label: "בעקבות המכבים", icon: "🏺" },
  { id: "december-lights", label: "אורות בדצמבר", icon: "🎄" },
  { id: "offroad", label: "4×4 למשפחות", icon: "🚙" },
  { id: "go-out", label: "המלצות בטבע", icon: "🌿" },
];

/* 2. פעילויות חנוכה בטבע */
export const NATURE_ACTIVITIES: HanukkahEventRow[] = [
  {
    date: "5.12 ב־10:00",
    place: "בית גוברין",
    title: "דרישת שלום מתקופות אחרות",
    description:
      "סיור במערות ובעקבות כתובת הליודורוס והקשר שלה לסיפור חנוכה. במועד הזה הסיור מתורגם לשפת הסימנים.",
    link: {
      href: "https://www.parks.org.il/activity/beit-govrin-3/",
      kind: "info",
    },
  },
  {
    date: "5.12 ב־11:00 וב־13:00",
    place: "הקסטל",
    title: "הולכים בשביל הערכים",
    description:
      "תחנות משימה, תעלות קשר ותצפית מעל הדרך לירושלים. ההדרכה עוסקת במלחמת העצמאות ומותאמת מגיל 9.",
    link: {
      href: "https://www.parks.org.il/activity/castel-4/",
      kind: "register",
    },
  },
  {
    date: "6–8.12",
    times: ["10:00–12:00", "12:00–14:00"],
    place: "הגן הבוטני אילנות",
    title: "אוצר חנוכה",
    description:
      "טיול קצר, מרכז מבקרים ומשחק ניווט משפחתי. לפי קק״ל הכניסה חינם וללא הרשמה.",
    link: { href: "https://www.kkl.org.il/ilanotevent2026/", kind: "info" },
  },
  {
    date: "8.12",
    place: "מודיעין ויער בן שמן",
    title: "סיורי חנוכה בארץ החשמונאים",
    description:
      "סיורים של קק״ל במסלולים ברמות קושי שונות, מסיור משפחתי קצר ועד הליכה ארוכה בשביל ישראל.",
    link: {
      href: "https://www.kkl.org.il/education/field_active/field_stories/events_and_trips/menorah-tours/land-of-the-hasmoneans/",
      kind: "register",
    },
  },
  {
    date: "לפי לוח ההזמנות",
    place: "נאות קדומים",
    title: "בחזרה לארץ החשמונאים",
    description:
      "משחק מכבים בשטח, מלאכות קדומות והכנת נר שמן. המועדים העדכניים מופיעים בעמוד השמורה.",
    link: { href: "https://www.n-k.org.il/hanukkah/", kind: "register" },
  },
  {
    date: "9–10.12, 11:00–14:00",
    place: "תל לכיש",
    title: "חנוכה בלכיש",
    description: "מיצג, סיור משפחתי ותצפית רחבה על נופי השפלה.",
    link: {
      href: "https://www.ogo.co.il/he/event/il/lachish/2026/12/09/tel-lachish-national-park-hanukkah-t-lachish-iuGmVecC4bTws5Jd1ZerJK",
      kind: "info",
    },
  },
  {
    date: "11.12, 10:00–14:00",
    place: "תל לכיש",
    title: "שישי מורשת",
    description: "קבלת שבת חגיגית עם הדרכות על התל ומוזיקה.",
    link: {
      href: "https://www.ogo.co.il/he/event/il/lachish/2026/12/11/tel-lachish-national-park-heritage-friday-vSfHNvMrYhPgDj8XMEbsYC",
      kind: "info",
    },
  },
];

/* 3. טיול בעקבות המכבים */
export type MaccabeesStop = {
  place: string;
  kindLabel: string;
  wazeQuery: string;
  details: string;
  /** מיקום האתר במפה (OpenStreetMap). בלי נקודה מדויקת התחנה לא מוצגת במפה. */
  position?: { lat: number; lng: number };
};

export const MACCABEES_STOPS: MaccabeesStop[] = [
  {
    place: "קברות המכבים",
    kindLabel: "מסורת",
    wazeQuery: "קברות המכבים, מודיעין",
    position: { lat: 31.9297583, lng: 34.9941904 },
    details:
      "חונים ליד שער המכבים מכביש 443, וקברי הסלע נמצאים ממש ליד הרחבה. המסורת קושרת אותם למשפחת המכבים, אבל הזיהוי הארכאולוגי אינו ודאי.",
  },
  {
    place: "חורבת אום אל־עומדאן",
    kindLabel: "זיהוי ארכאולוגי מוצע",
    wazeQuery: "חורבת אום אל עומדאן, מודיעין",
    position: { lat: 31.8833754, lng: 34.9975449 },
    details:
      "שרידים של יישוב יהודי ובית כנסת קדום. יש חוקרים שמציעים לזהות כאן את מודיעין של החשמונאים.",
  },
  {
    place: "הכפר החשמונאי",
    kindLabel: "שחזור מודרני",
    wazeQuery: "הכפר החשמונאי, שילת",
    details:
      "ליד שער שילת מכביש 4466. שחזור של כפר מימי בית שני, עם מלאכות וסדנאות לפי לוח הפעילות של המקום.",
  },
  {
    place: "בקעת הנזירים",
    kindLabel: "טבע ומורשת",
    wazeQuery: "בקעת הנזירים, מודיעין",
    position: { lat: 31.9272342, lng: 34.9730954 },
    details:
      "עצירה ירוקה בדרום יער בן שמן, דרך שער בקעת הנזירים מכביש 443. המערות כאן מהתקופה הביזנטית, מאות שנים אחרי המכבים.",
  },
];

export const MACCABEES_SOURCE = {
  href: "https://www.tiuli.com/tracks/46",
  label: "לקריאה נוספת על המסלול בטיולי",
};

/* 4. חנוכה אחרי החשכה */
export const AFTER_DARK: HanukkahEventRow[] = [
  {
    date: "6, 8 ו־10.12 ב־16:00",
    place: "נאות קדומים",
    title: "מחושך לאור",
    description:
      "סיור עששיות בעקבות המכבים שמסתיים בהכנת נר שמן.",
    link: { href: "https://www.n-k.org.il/hanukkah/", kind: "register" },
  },
  {
    date: "6–10.12",
    place: "עיר דוד, ירושלים",
    title: "הללויה",
    description:
      "מופע אור, אש ומים בין שרידי העיר הקדומה. לפני המופע מדליקים נרות חנוכה בגן המלך.",
    link: {
      href: "https://www.parks.org.il/activity/jerusalem-2-2/",
      kind: "register",
    },
  },
  {
    date: "6–11.12",
    place: "צריף בן־גוריון, שדה בוקר",
    description: "סיורי עששיות בצריף ובסביבתו במסגרת תוכנית החג.",
    link: { href: "https://shimur.org/events/5655489/", kind: "info" },
  },
  {
    date: "7.12 ב־16:45",
    place: "נחל השופט",
    description:
      "סיור עששיות של קק״ל בשביל הנגיש לאורך הנחל, להורים וילדים מגיל 5.",
    link: { href: "https://www.kkl.org.il/ashashiot2026/", kind: "register" },
  },
  {
    date: "7–10.12",
    place: "ירושלים",
    title: "סיורי חנוכיות",
    description:
      "מסתובבים בין חלונות עם חנוכיות דולקות. בשערי חסד ובנחלאות או בעיר העתיקה, לפי הערב. חינם בהרשמה מראש.",
    link: {
      href: "https://www.kkl.org.il/education/field_active/field_stories/events_and_trips/menorah-tours/jerusalem/",
      kind: "register",
    },
  },
  {
    date: "9–11.12",
    place: "מצוק הצינים",
    title: "אור, רוח ונשרים",
    description:
      "מתחילים במרכז הצפרות, הולכים לאורך מצוק הצינים ומדליקים נרות באור האחרון של היום.",
    link: {
      href: "https://www.parks.org.il/activity/en-ovdat-3/",
      kind: "info",
    },
  },
  {
    date: "10.12, 15:00–16:45",
    place: "תל לכיש",
    title: "לכיש לאור שקיעה",
    description: "סיור שקיעה על התל שמסתיים בהדלקת נרות מול נופי השפלה.",
    link: {
      href: "https://www.ogo.co.il/he/event/il/lachish/2026/12/10/tel-lachish-national-park-lachish-in-sunset-light-nR4SihFfaPT5gonYUmDojY",
      kind: "info",
    },
  },
  {
    date: "10.12 ב־16:45",
    place: "הגן הבוטני אילנות",
    description: "סיור עששיות של קק״ל במסלול המעגלי הנגיש של הגן.",
    link: {
      href: "https://www.kkl.org.il/ashashiot2026/",
      kind: "availability",
    },
  },
];

/* 5. כריסמס ואורות בדצמבר */
export type DecemberLightsRow = HanukkahEventRow & { overlapsHanukkah?: boolean };

export const DECEMBER_LIGHTS: DecemberLightsRow[] = [
  {
    date: "6.12–1.1",
    place: "חיפה, המושבה הגרמנית",
    title: "החג של החגים",
    description: "תאורת חג וקישוטים לאורך שדרות המושבה הגרמנית.",
    overlapsHanukkah: true,
    link: {
      href: "https://www.haifahag.com/AllEvents.aspx?lang=1",
      kind: "info",
    },
  },
  {
    date: "מועדי 2026 יתעדכנו",
    place: "יפו",
    description:
      "סיבוב חגיגי ביפו, עם שוק הפשפשים והאזור שבו מתקיימות פעילויות ‘מאירים את יפו’.",
    link: {
      href: "https://familytrips.co.il/%D7%9B%D7%A8%D7%99%D7%A1%D7%9E%D7%A1-%D7%91%D7%99%D7%A4%D7%95-%D7%95%D7%91%D7%9E%D7%A8%D7%9B%D7%96/",
      kind: "updates",
      label: "לעדכוני האירועים",
    },
  },
  {
    date: "מועדי 2026 יתעדכנו",
    place: "נצרת",
    description:
      "סמטאות מקושטות ואווירת חג מולד, עם שווקים והדלקת עץ חג שהתקיימו בשנים קודמות.",
    link: {
      href: "https://familytrips.co.il/%d7%9b%d7%a8%d7%99%d7%a1%d7%9e%d7%a1-%d7%91%d7%a0%d7%a6%d7%a8%d7%aa-%d7%97%d7%92-%d7%94%d7%9e%d7%95%d7%9c%d7%93-%d7%9b%d7%9e%d7%95-%d7%91%d7%97%d7%95%d7%9c/",
      kind: "updates",
      label: "לעדכוני האירועים",
    },
  },
  {
    date: "17–19.12",
    place: "מעיליא ופסוטה",
    title: "פסטיבל החורף בגליל המערבי",
    description:
      "סיורי חג בכפרים הנוצריים של הגליל המערבי. הסיורים בלוח הפסטיבל מתקיימים ב־17 וב־18.12.",
    note: "חלק מהסיורים כבר מלאים.",
    link: {
      href: "https://winterfestival.westgalil.org.il/list?category=tour-event",
      kind: "register",
    },
  },
  {
    date: "22–24.12",
    place: "אמפי פארק תמנע",
    title: "כריסמס מרקט",
    description:
      "שוק חג ומיצגי אור באמפי של פארק תמנע. שני סבבים בכל ערב, 17:30–19:30 ו־19:30–21:30.",
    link: {
      href: "https://parktimna.co.il/events/christmas-market/",
      kind: "register",
    },
  },
];

/* 6. מסלולי 4×4 קלילים */
export const OFFROAD_INTRO =
  "ברוב ההמלצות תמצאו קטעים סלולים שמתאימים גם לרכבי SUV, ולצידם אפשרות להמשיך לדרכי שטח ברכב 4×4 מתאים. בתרונות רוחמה הוא מסלול שטח נפרד.";

export type OffroadRow = {
  place: string;
  details: string;
  link: { href: string; label: string; external: boolean };
};

export const OFFROAD_ROUTES: OffroadRow[] = [
  {
    place: "בתרונות רוחמה",
    details:
      "גבעות לס פתוחות, ערוצים רכים והרבה עצירות לנוף. מתאים לכניסה ראשונה לעולם השטח.",
    link: {
      href: "/trips/btrvnvt-rvchmh",
      label: "לבתרונות רוחמה בשביל הלב",
      external: false,
    },
  },
  {
    place: "יער בן שמן",
    details:
      "קטע השטח אל השיזף הגדול ובאזור תל חדיד, קצר ונוח לשילוב עם פיקניק ביער.",
    link: {
      href: "https://www.kkl.org.il/travel/trips/2704/",
      label: "למסלול באתר קק״ל",
      external: true,
    },
  },
  {
    place: "יער המגינים",
    details:
      "דרכי יער בין פינות נוף ואתרי הנצחה. לפי קק״ל הדרכים המתוארות עבירות גם לרכב פרטי.",
    link: {
      href: "https://www.kkl.org.il/travel/kkl_hamegenim_forest/",
      label: "למפת היער באתר קק״ל",
      external: true,
    },
  },
  {
    place: "יער צרעה",
    details:
      "דרכי נוף ביער הנשיא מעל עמק שורק. סעו רק בקטעים שמסומנים ל־4×4 במפת קק״ל. קטע מהשביל האדום סגור כרגע.",
    link: {
      href: "https://www.kkl.org.il/travel/trips/hanasi_forest/",
      label: "למפת המסלול באתר קק״ל",
      external: true,
    },
  },
  {
    place: "דרך הנוף בפארק בריטניה",
    details:
      "דרך נוף ארוכה בין גבעות וחורש של השפלה. לפי קק״ל מתאימה גם לרכב פרטי.",
    link: {
      href: "https://www.kkl.org.il/travel/trips/227/",
      label: "למסלול באתר קק״ל",
      external: true,
    },
  },
];

/* 7. המלצות לפי מה שבא לכם לעשות */

/**
 * תיקיות התמונות למקומות שאין להם עמוד טיול באתר.
 * מספיק להעלות קובץ בשם hero (jpeg / jpg / png / webp) לתיקייה,
 * והתמונה תופיע אוטומטית בכל מקום שבו המקום מופיע במדריך.
 */
export const HANUKKAH_PLACE_IMAGES = {
  ilanot: "/images/places/hasharon/יער האילנות",
} as const;
export type RecommendationCard = {
  name: string;
  /** תיקיית תמונה, למקומות בלי עמוד טיול */
  imageFolder?: string;
  area: string;
  why: string;
  /** slug של עמוד טיול קיים - מקור התמונה, ויעד הקישור כשאין href */
  tripSlug?: string;
  href?: string;
  note?: string;
  extraLink?: { href: string; label: string };
};

export type RecommendationGroup = {
  id: string;
  title: string;
  /** row: שורה אחת (גלילה אופקית בנייד). grid: רשת רגילה. */
  layout: "row" | "grid";
  intro?: string;
  cards: RecommendationCard[];
};

export const RECOMMENDATION_GROUPS: RecommendationGroup[] = [
  {
    id: "animals",
    layout: "row",
    title: "חיות",
    cards: [
      {
        name: "עיזה פזיזה",
        area: "טל שחר, שפלה",
        why: "דיר עיזים ומחלבה קטנה שבה הילדים פוגשים את העיזים מקרוב.",
        tripSlug: "yzh-pzyzh",
      },
      {
        name: "לגעת בחיות",
        area: "גבעת חיים, עמק חפר",
        why: "פינות ליטוף והאכלה שמתאימות במיוחד לילדים קטנים.",
        tripSlug: "lgt-bchyvt",
      },
      {
        name: "פארק אוטופיה",
        area: "קיבוץ בחן, עמק חפר",
        why: "גן טרופי עם חיות, מבוכים וסחלבים, נעים גם ביום חורפי.",
        tripSlug: "prk-vtvpyh",
        href: "https://www.utopiapark.co.il/",
      },
      {
        name: "מדבריום",
        area: "באר שבע",
        why: "פארק חיות מדבר רחב, עם מינים שקשה לפגוש בטבע.",
        tripSlug: "mdbryvm",
      },
      {
        name: "אקווריום ישראל",
        area: "ירושלים",
        why: "מסע בין ים סוף, הים התיכון, הכנרת וים המלח, מתחת לגג אחד.",
        tripSlug: "kvvryvm-yshrl",
        href: "https://israel-aquarium.org.il/",
      },
    ],
  },
  {
    id: "water",
    layout: "row",
    title: "ליד המים",
    intro:
      "כניסה למים רק במקומות ובזמנים שבהם ההנחיות הרשמיות של המקום מאפשרות זאת.",
    cards: [
      {
        name: "עין לבן",
        area: "ירושלים",
        why: "מעיין ובריכה בעמק רפאים, קרוב לעיר ומרגיש רחוק ממנה.",
        tripSlug: "yn-lbn",
      },
      {
        name: "האסי דרך החוף הירוק",
        area: "עמק המעיינות",
        why: "נחל צלול וחמים שאפשר לפגוש דרך החוף הירוק.",
        tripSlug: "nchl-hsy",
      },
      {
        name: "עין חמד",
        area: "הרי ירושלים",
        why: "נחל קטן, עצים גבוהים ומדשאות. פיקניק ומים במקום אחד.",
        tripSlug: "yn-chmd",
      },
      {
        name: "פארק המעיינות",
        area: "עין מגדל ונחל הקיבוצים",
        why: "שתי נקודות מים בפארק אחד, עם מים צלולים ושבילי הליכה קצרים.",
        tripSlug: "ein-migdal",
        extraLink: {
          href: "/trips/nchl-hkybvtzym",
          label: "לנחל הקיבוצים",
        },
      },
      {
        name: "עיינות צוקים",
        area: "ים המלח",
        why: "שמורת מעיינות וצמחייה ירוקה על חוף ים המלח.",
        tripSlug: "yn-pshchh-yynvt-tzvkym",
      },
    ],
  },
  {
    id: "picnic",
    layout: "row",
    title: "פיקניק",
    cards: [
      {
        name: "גן לאומי ירקון – מתחם תל אפק",
        area: "ראש העין",
        why: "מדשאות רחבות, מים ומבצר עתיק. הכל במרחק הליכה מהחניה.",
        tripSlug: "tl-pk",
      },
      {
        name: "בית לאה בירקון",
        area: "נחל הירקון",
        why: "פינה שקטה על גדת הירקון לפיקניק רגוע.",
        tripSlug: "byt-lh",
      },
      {
        name: "יער בן שמן",
        area: "ליד מודיעין",
        why: "חניוני יער מוצלים ושבילים שמתאימים לכל גיל.",
        tripSlug: "ben-shemen-forest",
      },
      {
        name: "יער צרעה",
        area: "הרי ירושלים",
        why: "חניוני פיקניק ביער הנשיא, ליד דרך הפסלים ושביל שמשון.",
        tripSlug: "yr-tzrh",
      },
      {
        name: "יער המגינים",
        area: "שפלת יהודה",
        why: "יער גדול עם חניונים, תצפיות ושבילי הליכה. כניסה חופשית.",
        tripSlug: "yr-hmgynym",
      },
    ],
  },
  {
    id: "views",
    layout: "row",
    title: "תצפיות",
    cards: [
      {
        name: "יער צרעה",
        area: "הרי ירושלים",
        why: "מבט רחב על עמק שורק ועל השפלה מתוך היער.",
        tripSlug: "yr-tzrh",
      },
      {
        name: "הסטף",
        area: "הרי ירושלים",
        why: "טרסות, מעיינות ומבט רחב על נחל שורק והרי ירושלים.",
        tripSlug: "sataf",
      },
      {
        name: "מצפה הארי",
        area: "גליל עליון",
        why: "תצפית גבוהה על הגליל, עד הכנרת ביום צלול.",
        tripSlug: "har-hari-viewpoint",
      },
      {
        name: "קומראן",
        area: "ים המלח",
        why: "המערות של המגילות הגנוזות מעל ים המלח.",
        tripSlug: "kvmrn",
      },
      {
        name: "תל לכיש",
        area: "חבל לכיש",
        why: "תל מקראי עם נוף פתוח לכל השפלה.",
        tripSlug: "tel-lachish",
      },
    ],
  },
  {
    id: "kids",
    layout: "grid",
    title: "מסלולים לילדים",
    cards: [
      {
        name: "נחל דוד",
        area: "עין גדי",
        why: "מפלים ובריכות בלב המדבר, בשביל שילדים אוהבים.",
        tripSlug: "nchl-dvd",
      },
      {
        name: "תל לכיש",
        area: "חבל לכיש",
        why: "טיפוס קצר לראש התל, עם סיפורים שמתאימים לילדים.",
        tripSlug: "tel-lachish",
      },
      {
        name: "תל דן",
        area: "אצבע הגליל",
        why: "שביל מוצל לאורך מים זורמים, נעים בכל עונה.",
        tripSlug: "nchl-dn",
      },
      {
        name: "בשביל הנפש ברמת הנדיב",
        area: "זכרון יעקב",
        why: "מסלול מעגלי עם שמונה תחנות. מגיל 8 ובלי עגלות לפי האתר.",
        tripSlug: "bishvil-hanefesh",
      },
      {
        name: "עין בוקק – המסלול הקצר",
        area: "ים המלח",
        why: "הליכה במים עד מפל קטן בין צוקי המדבר.",
        note: "לפני היציאה בדקו עדכוני פתיחה והתראות שיטפונות.",
        tripSlug: "ein-bokek",
      },
      {
        name: "מעיינות גיבתון",
        area: "רחובות",
        why: "הליכה קצרה לצד המים ועל טיילת צפה מעל הביצה.",
        tripSlug: "myynvt-gybtvn",
      },
    ],
  },
  {
    id: "lodging",
    layout: "row",
    title: "לינה",
    cards: [
      {
        name: "כפר הנוקדים",
        area: "ליד ערד",
        why: "לינה מדברית עם תוכנית חג מיוחדת.",
        note: "תוכנית חנוכה ב־4–9.12.",
        href: "https://www.kfarhanokdim.co.il/HANUKKAH2026/",
      },
      {
        name: "חוות הדקלים",
        area: "הנגב",
        why: "חווה ירוקה בלב הנגב עם דיר, בריכות ומגוון סוגי לינה.",
      },
      {
        name: "חניון לילה פארק הבשור",
        area: "גן לאומי הבשור (אשכול)",
        why: "קמפינג באוהלים ליד נחל הבשור, עם מסלולי הליכה לאורך הנחל.",
        href: "https://www.parks.org.il/camping/%D7%97%D7%A0%D7%99%D7%95%D7%9F-%D7%9C%D7%99%D7%9C%D7%94-%D7%92%D7%9F-%D7%9C%D7%90%D7%95%D7%9E%D7%99-%D7%94%D7%91%D7%A9%D7%95%D7%A8-%D7%90%D7%A9%D7%9B%D7%95%D7%9C/",
      },
      {
        name: "אירוח כפרי עין חרוד",
        area: "עמק חרוד",
        why: "לינה בקיבוץ, קרוב לגלבוע ולמעיין חרוד.",
        href: "https://www.ein-harod.co.il/",
      },
      {
        name: "ממשית",
        area: "הנגב",
        why: "לינה מדברית בחוות הגמלים ליד ממשית.",
        note: "הלינה נפרדת מפעילות החג.",
        href: "https://www.cameland.co.il/",
      },
    ],
  },
];

/* 8. פשוט לצאת לטייל */
export type GoOutPlace = {
  place: string;
  description: string;
  /** מקור נקודת הניווט: עמוד טיול קיים באתר */
  tripSlug?: string;
  /** חלופה: שם יעד חד־משמעי לחיפוש ב־Waze */
  wazeQuery?: string;
  /** שם החניון או השער שמוצג ליד כפתור הניווט */
  wazeLabel?: string;
  /** תיקיית תמונה, למקומות בלי עמוד טיול */
  imageFolder?: string;
};

export type GoOutRegion = {
  id: string;
  label: string;
  places: GoOutPlace[];
};

export const GO_OUT_REGIONS: GoOutRegion[] = [
  {
    id: "center",
    label: "מרכז",
    places: [
      {
        place: "יער בן שמן",
        description: "יער גדול עם חניונים מוצלים ושבילים קצרים לכל המשפחה.",
        tripSlug: "ben-shemen-forest",
        wazeLabel: "כניסת מצפה מודיעין",
      },
      {
        place: "פארק בריטניה",
        description: "גבעות, חורש ומערות. מתאים ליום שלם ברכב וברגל.",
        tripSlug: "prk-brytnyh",
      },
      {
        place: "עמק האלה",
        description: "עמק פתוח עם סיפור דוד וגוליית ונוף רחב לשפלה.",
        tripSlug: "mk-hlh",
      },
      {
        place: "יער האילנות",
        description: "גן בוטני עם מסלול מעגלי נגיש ועצים מכל העולם.",
        wazeQuery: "הגן הבוטני אילנות",
        imageFolder: HANUKKAH_PLACE_IMAGES.ilanot,
      },
      {
        place: "תל גזר",
        description: "תל עתיק עם תצפית פתוחה מעל השפלה.",
        tripSlug: "tl-gzr",
      },
    ],
  },
  {
    id: "north",
    label: "צפון",
    places: [
      {
        place: "פארק המעיינות",
        description: "מעיינות צלולים ושבילים קצרים בין עין מגדל לנחל הקיבוצים.",
        tripSlug: "ein-migdal",
        wazeLabel: "עין מגדל",
      },
      {
        place: "נחל השופט",
        description: "הליכה לצד הנחל בשביל מוצל ונגיש בלב רמות מנשה.",
        tripSlug: "nahal-hashofet",
        wazeLabel: "חניון חרובים",
      },
      {
        place: "גמלא",
        description: "מפל גבוה, נשרים ועיר עתיקה על רכס בגולן.",
        tripSlug: "shmvrt-tb-gml",
      },
      {
        place: "בשביל הנפש ברמת הנדיב",
        description: "מסלול מעגלי עם תחנות, מגיל 8 ובלי עגלות.",
        tripSlug: "bishvil-hanefesh",
        wazeLabel: "רמת הנדיב",
      },
      {
        place: "תל דן",
        description: "שביל מוצל בין מים זורמים ועצים גבוהים.",
        tripSlug: "nchl-dn",
      },
    ],
  },
  {
    id: "south",
    label: "דרום וים המלח",
    places: [
      {
        place: "עיינות צוקים",
        description: "מעיינות וצמחייה ירוקה על שפת ים המלח.",
        tripSlug: "yn-pshchh-yynvt-tzvkym",
      },
      {
        place: "נחל דוד",
        description: "מפלים ובריכות בשמורת עין גדי.",
        tripSlug: "nchl-dvd",
      },
      {
        place: "קומראן",
        description: "מערות המגילות ותצפית על ים המלח.",
        tripSlug: "kvmrn",
      },
      {
        place: "יער המלאכים",
        description: "יער שקט עם חניונים ופריחה בחורף.",
        tripSlug: "yr-hmlkym",
      },
      {
        place: "בתרונות רוחמה",
        description: "גבעות לס ונופים פתוחים, ברגל או ברכב שטח.",
        tripSlug: "btrvnvt-rvchmh",
      },
      {
        place: "אגם ניצנים",
        description: "אגם, דשא ופינות פיקניק קרוב לחוף.",
        tripSlug: "nitzanim-lake",
      },
    ],
  },
  {
    id: "jerusalem",
    label: "ירושלים והסביבה",
    places: [
      {
        place: "עין חמד",
        description: "נחל קטן, מדשאות וצל של עצים גבוהים.",
        tripSlug: "yn-chmd",
      },
      {
        place: "הסטף",
        description: "מעיינות, טרסות וחלקות חקלאיות בהרי ירושלים.",
        tripSlug: "sataf",
        wazeLabel: "החניה העליונה",
      },
      {
        place: "מאגר בית זית",
        description: "מאגר מים בעמק ירוק, עם הליכה קצרה סביבו.",
        tripSlug: "mgr-byt-zyt",
      },
      {
        place: "עין לבן",
        description: "מעיין ובריכה בעמק רפאים, קרוב לגן החיות התנכי.",
        tripSlug: "yn-lbn",
      },
    ],
  },
];

/* 9. התנדבות */
export const VOLUNTEER = {
  title: "רוצים לעשות משהו טוב?",
  text: [
    "רשות הטבע והגנים מזמינה קבוצות לנקות יחד את חוף פלמחים. הפעילות מתאימה לכל הגילים, נמשכת כשעתיים וחצי, ומתואמת מראש לקבוצות של 10 משתתפים ומעלה.",
    "לא מצאנו מועד פתוח מאומת לחנוכה 2026, אז הדרך להצטרף היא לתאם הגעה קבוצתית מראש.",
  ],
  button: {
    label: "לתיאום התנדבות קבוצתית",
    href: "https://www.parks.org.il/article/vol-palmachim/",
  },
};
