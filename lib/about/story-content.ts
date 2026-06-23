export const ABOUT_STORY_NATURE_LINES = [
  "הוא שייך לכולם.",
  "הוא בחינם.",
  "והוא תמיד יקבל אותנו בדיוק כמו שאנחנו.",
] as const;

export const ABOUT_STORY_QUOTE_LINES = [
  "אני לא עושה משהו מיוחד.",
  "אני פשוט יוצאת.",
] as const;

export const ABOUT_STORY_SIGNATURE = {
  prelude: "בין מסלולי החיים ושבילי הלב",
  origin: 'קם הרעיון של "בשביל הלב"',
} as const;

export type TextSegment = {
  text: string;
  emphasis?: boolean;
};

export type StoryContentBlock =
  | { type: "paragraph"; segments: TextSegment[]; lead?: boolean }
  | { type: "pull-quote"; lines: readonly string[]; featured?: boolean }
  | { type: "moment"; text: string }
  | { type: "beat" }
  | { type: "nature" }
  | { type: "signature" };

export type StoryChapter = {
  journeyStep?: number;
  blocks: StoryContentBlock[];
};

export const ABOUT_STORY_CHAPTERS: StoryChapter[] = [
  {
    journeyStep: 0,
    blocks: [
      {
        type: "paragraph",
        lead: true,
        segments: [
          {
            text: "אני מילאנה, אמא לשני בנים, ואנחנו אוהבים לטייל, לגלות מקומות חדשים ולחוות את ארץ ישראל היפה והטובה.",
          },
        ],
      },
    ],
  },
  {
    journeyStep: 1,
    blocks: [
      {
        type: "paragraph",
        segments: [
          { text: "בשבילנו טיולים הם הרבה מעבר למסלול או ליעד. הם " },
          { text: "רגעים של חיבור", emphasis: true },
          {
            text: " - לעצמנו, אחד לשני, לאדמה, לטבע, לאנשים ולארץ שלנו.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            text: "דרך הטיולים אנחנו לומדים המון על עצמאות, התמודדות, סבלנות, אומץ, חיבור ואהבה. הם ",
          },
          { text: "מרחיבים לנו את הלב", emphasis: true },
          {
            text: ", את המחשבה, את האופקים ואת היכולת לראות את היופי שבדברים הפשוטים.",
          },
        ],
      },
      { type: "beat" },
      {
        type: "paragraph",
        segments: [
          {
            text: "אנחנו אוהבים לשלב בטיולים שלנו גם בישולי שטח, צילום, נסיעות בשבילי עפר, מפגשים עם אנשים טובים והרבה רגעים קטנים שהופכים לזיכרונות גדולים.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            text: "לאורך השנים גיליתי שהטבע הוא הרבה יותר ממקום לטייל בו. הנופים, השקט, המרחבים, האנשים והדרך עצמה עזרו ועוזרים לנו לרפא את הלב, לצמוח, להתחזק ולהתחבר מחדש למה שבאמת חשוב.",
          },
        ],
      },
    ],
  },
  {
    journeyStep: 3,
    blocks: [
      {
        type: "paragraph",
        segments: [
          {
            text: "במשך השנים קיבלתי אינספור תגובות מאנשים - בשטח, ברשתות ובחיים עצמם. הרבה מהם שאלו אותי איך אני עושה את זה לבד עם שני ילדים קטנים.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [{ text: "והתשובה שלי תמיד פשוטה:" }],
      },
    ],
  },
  {
    journeyStep: 1,
    blocks: [
      {
        type: "pull-quote",
        lines: ABOUT_STORY_QUOTE_LINES,
        featured: true,
      },
      {
        type: "paragraph",
        segments: [
          {
            text: "לא משנה מה המצב הכלכלי, מה מצב הרוח, מה הסטטוס המשפחתי או איזה רכב יש לי. ",
          },
          { text: "היציאה לטבע לא דורשת שלמות", emphasis: true },
          {
            text: ", לא דורשת ציוד יקר ולא דורשת ניסיון מיוחד. היא דורשת רק רצון, פתיחות, זרימה ואנרגיות טובות.",
          },
        ],
      },
    ],
  },
  {
    journeyStep: 4,
    blocks: [
      {
        type: "moment",
        text: "'בשביל הלב' נולד מתוך הרצון להראות שכל אחד ואחת יכולים לצאת לטייל, ליהנות מהטבע וליצור זיכרונות מדהימים - בלי ציוד יקר, בלי ניסיון קודם ובלי לתכנן חודשים מראש.",
      },
    ],
  },
  {
    journeyStep: 2,
    blocks: [
      {
        type: "pull-quote",
        lines: ["אני באמת מאמינה שהטבע הוא תרופה."],
      },
      { type: "nature" },
      {
        type: "paragraph",
        segments: [
          {
            text: "הטבע מזכיר לנו להיות בתנועה, לקבל את חוסר השלמות, להתקרקע, לנשום עמוק ולראות את הדברים בפרופורציה הנכונה.",
          },
        ],
      },
      {
        type: "paragraph",
        segments: [
          {
            text: "אם האתר הזה יגרום לעוד משפחה אחת לצאת לטיול, לעוד אמא אחת להעז, או לעוד אדם אחד להתחבר לעצמו - מבחינתי עשיתי את שלי.",
          },
        ],
      },
    ],
  },
  {
    journeyStep: 4,
    blocks: [{ type: "signature" }],
  },
];
