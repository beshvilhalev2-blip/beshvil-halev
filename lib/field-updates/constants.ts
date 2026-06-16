export const PARKS_NEWSFLASH_FEED_URL =
  "https://www.parks.org.il/category/newsflash/feed/";

export const PARKS_NEWSFLASH_CATEGORY_URL =
  "https://www.parks.org.il/category/newsflash/";

export const FIELD_UPDATES_DISCLAIMER =
  "המידע לנוחות בלבד. לפני יציאה לשטח יש לבדוק באתר הרשמי.";

/** Revalidate cached feed every 2 hours. */
export const FIELD_UPDATES_REVALIDATE_SECONDS = 2 * 60 * 60;

export const FIELD_UPDATES_MAX_ITEMS = 5;

export const FIELD_UPDATES_FETCH_TIMEOUT_MS = 12_000;

export const FIELD_UPDATES_USER_AGENT =
  "Mozilla/5.0 (compatible; BeshvilHaLev/1.0; field-updates-experiment)";
