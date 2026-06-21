import type { FilterableRegionSlug } from "@/lib/israel-discovery-map";
import type { AiAssistantSearchFilter } from "@/lib/ai-assistant/types";

const REGION_KEYWORDS: Record<FilterableRegionSlug, string[]> = {
  north: ["צפון", "גליל", "גולן", "חיפה", "כרמל"],
  hasharon: ["השרון", "שרון", "נתניה", "הרצליה"],
  center: ["מרכז", "שפלה", "תל אביב", "רמת גן", "פתח תקווה"],
  jerusalem: ["ירושלים", "הרי ירושלים", "מודיעין"],
  south: ["דרום", "נגב", "מדבר", "אילת", "ים המלח", "באר שבע"],
};

const FILTER_KEYWORDS: Record<
  Exclude<keyof AiAssistantSearchFilter, "regionSlug">,
  string[]
> = {
  water: ["מים", "מעיין", "מעיינות", "נחל", "בריכ", "חוף", "ים", "להתרענן"],
  free: ["חינם", "בחינם", "בלי עלות", "ללא תשלום", "בלי כסף"],
  stroller: ["עגלה", "עגלות", "נגיש לעגלות", "עגלת"],
  offroad: ["4x4", "4×4", "שטח", "ג'יפ", "jeep"],
  camping: ["קמפינג", "לינה", "אוהל", "ללון"],
  viewpoint: ["תצפית", "תצפיות", "נוף", "שקיעה", "מצפה"],
  kids: ["ילדים", "משפחה", "משפחות", "קטנים", "תינוק"],
};

function includesKeyword(text: string, keyword: string): boolean {
  return text.includes(keyword);
}

function detectRegion(text: string): FilterableRegionSlug | undefined {
  for (const [slug, keywords] of Object.entries(REGION_KEYWORDS) as Array<
    [FilterableRegionSlug, string[]]
  >) {
    if (keywords.some((keyword) => includesKeyword(text, keyword))) {
      return slug;
    }
  }
  return undefined;
}

function detectFilters(text: string): Omit<AiAssistantSearchFilter, "regionSlug"> {
  const filters: Omit<AiAssistantSearchFilter, "regionSlug"> = {};

  for (const [key, keywords] of Object.entries(FILTER_KEYWORDS) as Array<
    [Exclude<keyof AiAssistantSearchFilter, "regionSlug">, string[]]
  >) {
    if (keywords.some((keyword) => includesKeyword(text, keyword))) {
      filters[key] = true;
    }
  }

  return filters;
}

export function parseAssistantSearchQuery(text: string): AiAssistantSearchFilter {
  const normalized = text.trim();

  return {
    regionSlug: detectRegion(normalized),
    ...detectFilters(normalized),
  };
}

export function mergeAssistantSearchFilters(
  ...filters: Array<AiAssistantSearchFilter | undefined>
): AiAssistantSearchFilter {
  return filters.reduce<AiAssistantSearchFilter>((merged, current) => {
    if (!current) {
      return merged;
    }

    return {
      regionSlug: current.regionSlug ?? merged.regionSlug,
      water: current.water ?? merged.water,
      viewpoint: current.viewpoint ?? merged.viewpoint,
      camping: current.camping ?? merged.camping,
      offroad: current.offroad ?? merged.offroad,
      stroller: current.stroller ?? merged.stroller,
      free: current.free ?? merged.free,
      kids: current.kids ?? merged.kids,
    };
  }, {});
}

export function hasActiveAssistantFilters(
  filters: AiAssistantSearchFilter,
): boolean {
  return Boolean(
    filters.regionSlug ||
      filters.water ||
      filters.viewpoint ||
      filters.camping ||
      filters.offroad ||
      filters.stroller ||
      filters.free ||
      filters.kids,
  );
}
