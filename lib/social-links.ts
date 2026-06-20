export const socialLinks = [
  {
    id: "facebook",
    label: "פייסבוק",
    href: "https://www.facebook.com/milana.polishuk.5/?locale=he_IL",
  },
  {
    id: "instagram",
    label: "אינסטגרם",
    href: "https://www.instagram.com/milana__rose/",
  },
] as const;

/** Placeholder until community WhatsApp group invite URL is confirmed. */
export const communityWhatsAppGroupHref = "#";

export type SocialLinkId = (typeof socialLinks)[number]["id"];
