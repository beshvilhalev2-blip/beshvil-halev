export const socialLinks = [
  {
    id: "facebook",
    label: "פייסבוק",
    href: "https://www.facebook.com/",
  },
  {
    id: "instagram",
    label: "אינסטגרם",
    href: "https://www.instagram.com/",
  },
] as const;

export type SocialLinkId = (typeof socialLinks)[number]["id"];
