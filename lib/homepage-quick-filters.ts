export type HomepageQuickFilter = {
  label: string;
  href: string;
  ariaLabel: string;
};

/** Homepage hero quick filters — queries verified against lib/search-trips haystack. */
export const HOMEPAGE_QUICK_FILTERS: HomepageQuickFilter[] = [
  {
    label: "מים",
    href: "/search?q=מים",
    ariaLabel: "חיפוש מסלולי מים",
  },
  {
    label: "תצפיות",
    href: "/search?q=תצפית",
    ariaLabel: "חיפוש תצפיות ונוף",
  },
  {
    label: "עגלת קפה",
    href: "/search?q=קפה",
    ariaLabel: "חיפוש מקומות עם עגלת קפה",
  },
  {
    label: "4×4",
    href: "/offroad",
    ariaLabel: "מסלולי שטח 4x4",
  },
  {
    label: "פיקניק",
    href: "/search?q=פיקניק",
    ariaLabel: "חיפוש מקומות לפיקניק",
  },
  {
    label: "קמפינג",
    href: "/search?q=קמפינג",
    ariaLabel: "חיפוש מקומות לקמפינג",
  },
  {
    label: "חינם",
    href: "/search?q=חינם",
    ariaLabel: "חיפוש מקומות בכניסה חינם",
  },
  {
    label: "משפחות",
    href: "/search?q=משפחות",
    ariaLabel: "חיפוש מסלולים למשפחות",
  },
];
