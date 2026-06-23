export const CONTACT_LINKS = {
  whatsappHref: "https://wa.me/972524310234",
  whatsappDisplay: "+972 52-431-0234",
  email: "beshvilhalev2@gmail.com",
  emailHref: "mailto:beshvilhalev2@gmail.com",
} as const;

const recommendPlaceMessage =
  "היי מילאנה! יש לי מקום מיוחד שכדאי להכיר — ";

export const CONTACT_HERO = {
  titleLines: [
    "יש לכם שאלה? רעיון?",
    "מקום מיוחד להמליץ עליו?",
  ] as const,
  subtitle:
    "אני תמיד שמחה לשמוע מאנשים שאוהבים לטייל, לגלות מקומות חדשים ולשתף חוויות מהשטח.",
} as const;

export const CONTACT_ACTION_CARDS = [
  {
    id: "whatsapp",
    title: "💬 וואטסאפ",
    description: "הדרך המהירה ביותר ליצור קשר.",
    cta: "שלחו הודעה",
    href: CONTACT_LINKS.whatsappHref,
    external: true,
    primary: true,
    ariaLabel: `וואטסאפ, ${CONTACT_LINKS.whatsappDisplay}`,
  },
  {
    id: "email",
    title: "📧 מייל",
    description: "לשיתופי פעולה, שאלות ורעיונות.",
    cta: "שלחו מייל",
    href: CONTACT_LINKS.emailHref,
    external: false,
    primary: false,
    ariaLabel: `מייל, ${CONTACT_LINKS.email}`,
  },
  {
    id: "recommend",
    title: "📍 המליצו על מקום",
    description: "מכירים מקום מיוחד שכדאי להכיר? אשמח לשמוע.",
    cta: "ספרו לי עליו",
    href: `${CONTACT_LINKS.whatsappHref}?text=${encodeURIComponent(recommendPlaceMessage)}`,
    external: true,
    primary: false,
    ariaLabel: "המליצו על מקום בוואטסאפ",
  },
] as const;

export const CONTACT_PERSONAL_NOTE = {
  heading: "מילה אישית ממני",
  text: "האתר הזה נבנה מתוך אהבה אמיתית לטבע, לאנשים ולארץ שלנו. אם יש לכם שאלה, רעיון, תיקון, המלצה או סתם בא לכם להגיד שלום - אני כאן.",
} as const;

export const CONTACT_COLLABORATION = {
  heading: "רוצים לעבוד יחד?",
  text: "אני פתוחה לשיתופי פעולה בתחומי הטיולים, השטח, הקמפינג, התיירות, ציוד למשפחות, יצירת תוכן ופרויקטים מיוחדים.",
  cta: "בואו נדבר",
  ctaHref: CONTACT_LINKS.emailHref,
} as const;

export const CONTACT_CLOSING_QUOTE =
  "בין המסלולים, הנופים והאנשים שפוגשים בדרך - נוצר שביל אל הלב." as const;
