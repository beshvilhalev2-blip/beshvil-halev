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
] as const;

export type HiddenFromPublicSlug = (typeof hiddenFromPublicSlugs)[number];

const HIDDEN_FROM_PUBLIC = new Set<string>(hiddenFromPublicSlugs);

export function isHiddenFromPublic(slug: string): boolean {
  return HIDDEN_FROM_PUBLIC.has(slug);
}
