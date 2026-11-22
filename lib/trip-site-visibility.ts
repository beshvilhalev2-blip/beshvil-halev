/**
 * Trips kept in data but hidden from public surfaces until their category launches.
 */
export const hiddenFromPublicSlugs = [
  "kybvtz-pykym",
  "kynrt",
  "msdt-dg-l-hdn",
  "ykb-rmt-hgvln",
  "skr-lvmvt",
  "beit-jan",
  "blgn-bygvr",
  "prk-ytbth",
  "lvnd",
  // Temporarily unpublished. Content and files stay so the page can return.
  "nvf-yylvn",
  // Removed from the public site. Content stays in data, not on public pages.
  "rmt-gn-spry",
  "prk-mym-shpyym",
] as const;

export type HiddenFromPublicSlug = (typeof hiddenFromPublicSlugs)[number];

const HIDDEN_FROM_PUBLIC = new Set<string>(hiddenFromPublicSlugs);

export function isHiddenFromPublic(slug: string): boolean {
  return HIDDEN_FROM_PUBLIC.has(slug);
}
