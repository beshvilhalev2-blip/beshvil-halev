import fs from "fs";

const path = "data/visited-place-trips.ts";
let content = fs.readFileSync(path, "utf8");

const southSvg = `linear-gradient(160deg, rgba(154, 52, 18, 0.8) 0%, rgba(194, 65, 12, 0.55) 50%, rgba(28, 25, 23, 0.7) 100%),
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='480' viewBox='0 0 1920 480'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23f97316'/%3E%3Cstop offset='100%25' stop-color='%237c2d12'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='1920' height='480'/%3E%3C/svg%3E")`;

function heroBg(imagePath) {
  return `linear-gradient(160deg, rgba(154, 52, 18, 0.8) 0%, rgba(194, 65, 12, 0.55) 50%, rgba(28, 25, 23, 0.7) 100%), url("${imagePath}")`;
}

const replacements = [
  {
    slug: "prk-ytbth",
    body: `  {
    slug: "prk-ytbth",
    title: "פארק יטבתה",
    subtitle:
      "ספארי מדברי בדרך לאילת - ראמים, פראים, יענים וחוויית שימור בלב הערבה.",
    region: "דרום",
    category: "טיול משפחתי",
    visitedByMilana: true,
    matcher: {
      activities: ["easy-trails", "nature-shade"],
      companions: ["solo", "friends", "kids", "family"],
      estimatedCostNis: 30,
      weatherTraits: ["heat-tolerant"],
      weatherAvoid: ["rainy"],
      travelTimeFrom: {
        eilat: "30m",
        "beer-sheva": "2h",
        arad: "1h-plus",
        dimona: "1h-plus",
        jerusalem: "2h",
        "tel-aviv": "1h-plus",
      },
    },
    location: {
      lat: 29.8822,
      lng: 35.0661,
      label: "שמורת טבע חי-בר יוטבתה",
      wazeUrl:
        "https://waze.com/ul?q=%D7%A9%D7%9E%D7%95%D7%A8%D7%AA%20%D7%98%D7%91%D7%A2%20%D7%97%D7%99-%D7%91%D7%A8%20%D7%99%D7%95%D7%98%D7%91%D7%AA%D7%94&navigate=yes",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=29.8822%2C35.0661",
    },
    seoTitle: "חי-בר יוטבתה - ספארי מדברי לכל המשפחה | בשביל הלב",
    metaDescription:
      "שמורת טבע חי-בר יוטבתה מציעה ספארי מדברי, מרכז מבקרים וחניון לילה על כביש 90 בדרך לאילת. כל המידע לביקור משפחתי.",
    heroImageLabel: "תמונת רקע - פארק יטבתה",
    heroBackgroundImage: \`
${southSvg}
    \`,
    wazeUrl:
      "https://waze.com/ul?q=%D7%A9%D7%9E%D7%95%D7%A8%D7%AA%20%D7%98%D7%91%D7%A2%20%D7%97%D7%99-%D7%91%D7%A8%20%D7%99%D7%95%D7%98%D7%91%D7%AA%D7%94&navigate=yes",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=29.8822%2C35.0661",
    highlights: [
      "משפחות עם ילדים",
      "עצירה בדרך לאילת",
      "אוהבי חיות",
      "חינוך לשימור",
      "מדבר וערבה",
      "חניון לילה",
    ],
    about: [
      "פארק יטבתה מזוהה בעיקר עם שמורת טבע חי-בר יוטבתה של רשות הטבע והגנים - אתר שימור ייחודי על כביש 90, כ-35 ק\\"מ צפונית לאילת, בין הקיבוצים יטבתה וסמר.",
      "השמורה הוקמה כדי לאקלם ולהחזיר לטבע בעלי חיים שנכחדו מנופי הארץ או נמצאים בסכנת הכחדה. בין המינים שניתן לראות במסלול: ראמים, צבאים, פראים, יענים ועוד.",
      "הביקור כולל מרכז מבקרים עם סרט מבוא, ולאחריו מסלול ספארי מדברי ברכב פרטי - נסיעה בשטח הפתוח עם צפייה בבעלי החיים בסביבתם הטבעית, מבלי לצאת מהרכב.",
      "לפי רשות הטבע והגנים, ניתן גם להזמין לינה בחניון הלילה של השמורה - חוויה מדברית לילית ליד האתר.",
      "זו עצירה פופולרית למשפחות בדרך ל或 מאילת, שמשלבת חינוך, נוף מדברי וחוויה קצרה יחסית.",
    ],
    personalStory: [
      "ספארי מדברי כזה מתאים במיוחד למשפחות שרוצות עצירה קצרה ומרתקת בדרך - בלי לרדת מהרכב, ובלי לתכנן יום ארוך.",
      "הילדים יכולים לזהות בעלי חיים אחד אחרי השני, לעצור לצילום ולשאול שאלות - והכול קורה בתוך נוף מדברי פתוח.",
      "מרכז המבקרים והסרט המקדים נותנים הקשר לפני הנסיעה בשטח, ומסבירים את פרויקט השימור.",
      "המקום בנוי כך שאפשר לשלב ביקור קצר עם המשך נסיעה, או להאריך עם לינה בחניון הלילה.",
      "זה סוג של בילוי שעובד טוב גם בימים חמים, כי רוב החוויה מתרחשת מתוך הרכב.",
    ],
    cost: [
      { label: "כניסה", value: "בתשלום" },
      { label: "חניה", value: "במסגרת הכניסה לשמורה" },
      { label: "משך בילוי", value: "שעה עד כמה שעות" },
    ],
    quickFacts: [
      { label: "עלות", value: "בתשלום" },
      { label: "מתאים לילדים", value: "כן" },
      { label: "נגיש לעגלות", value: "חלקית - במרכז המבקרים" },
      { label: "זמן ביקור", value: "שעה עד כמה שעות" },
    ],
    gettingThere: {
      parking: "חניה במרכז המבקרים של חי-בר יוטבתה, על כביש 90.",
      notes: [
        "הגעה: על כביש 90 בין יטבתה לסמר. בוויז: שמורת טבע חי-בר יוטבתה.",
        "לפי רשות הטבע והגנים, נדרש רישום מראש לביקור - מומלץ לתאם באתר parks.org.il.",
        "שעות הפתיחה, מחירי הכניסה וחניון הלילה משתנים - יש לבדוק באתר הרשמי לפני יציאה.",
        "הכניסה לשמורה נסגרת שעה לפני שעת הסגירה הרשומה.",
        "כניסת כלבים אסורה בשמורה.",
        "בחלק מימות השנה ניתן לצפות בבעלי חיים במסגרת סיור מודרך - בתיאום מראש.",
      ],
    },
    faq: [
      {
        question: "האם המקום מתאים לילדים?",
        answer:
          "כן. חי-בר יוטבתה מתוכנן כחוויה משפחתית, עם סרט מבוא ומסלול ספארי ברכב.",
      },
      {
        question: "האם צריך לרדת מהרכב?",
        answer:
          "במסלול הספארי העיקרי הצפייה מתבצעת מהרכב. סיורים מודרכים למכלאות דורשים הליכה ותיאום.",
      },
      {
        question: "האם יש חניה?",
        answer: "כן. חניה במרכז המבקרים.",
      },
      {
        question: "האם אפשר ללון במקום?",
        answer:
          "כן. לפי רשות הטבע והגנים יש חניון לילה מסודר - יש להזמין בנפרד באתר הרשמי.",
      },
      {
        question: "מתי הכי כדאי להגיע?",
        answer:
          "אפשר לבקר לאורך השנה. בקיץ מומלץ להגיע בשעות הבוקר המוקדמות.",
      },
      {
        question: "כמה זמן מומלץ להישאר?",
        answer:
          "רוב המשפחות מקדישות שעה עד כמה שעות, בהתאם לקצב ולתכנון הלינה.",
      },
    ],
    tips: [
      "לפני יציאה - בדקו באתר parks.org.il את שעות הפתיחה, המחירים והרישום המראשי.",
      "הגיעו מוקדם בימים חמים - הספארי נעים יותר לפני שהחום מתגבר.",
      "הביאו מים, כובע ומצלמה - הצילום מהרכב הוא חלק מהכיף.",
      "אם מתכננים לינה, כדאי להזמין חניון לילה מראש באתר הרשמי.",
      "אל תנסו להאכיל או להתקרב לחיות - יש לשמור מרחק בטיחותי.",
    ],
    closingNote:
      "בואו נשמור על השקט בשמורה ועל בעלי החיים. קחו איתכם את האשפה.",
    gallery: [],
    gallerySubtitle: "",
    nearbyTripSlugs: ["ym-hmlch-chvf-bynykny", "chn-yn-gdy", "kvmrn"],
    nearbyPlaces: [],
    nearbySubtitle: "",
  }`,
  },
];

// Fix typo
replacements[0].body = replacements[0].body.replace("ל或 מאילת", "לאילת");

function replaceStub(slug, newBody) {
  const re = new RegExp(
    `\\{[\\s\\S]*?slug: "${slug}"[\\s\\S]*?nearbySubtitle: "",\\n  \\}`,
    "m",
  );
  if (!re.test(content)) {
    throw new Error(`Stub not found for ${slug}`);
  }
  content = content.replace(re, newBody);
}

for (const { slug, body } of replacements) {
  replaceStub(slug, body);
  console.log(`Patched ${slug}`);
}

fs.writeFileSync(path, content);
console.log("Done");
