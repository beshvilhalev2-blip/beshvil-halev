import type { FilterableRegionSlug } from "@/lib/israel-discovery-map";

export type AiAssistantMessageRole = "user" | "assistant";

export type AiAssistantTripRecommendation = {
  slug: string;
  title: string;
  region: string;
  tags: string[];
  href: string;
};

export type AiAssistantSearchFilter = {
  regionSlug?: FilterableRegionSlug;
  water?: boolean;
  viewpoint?: boolean;
  camping?: boolean;
  offroad?: boolean;
  stroller?: boolean;
  free?: boolean;
  kids?: boolean;
};

export type AiAssistantSearchResult = {
  intro: string;
  recommendations: AiAssistantTripRecommendation[];
  isFallback: boolean;
  parsedFilters: AiAssistantSearchFilter;
};

export type AiAssistantMessage = {
  id: string;
  role: AiAssistantMessageRole;
  content: string;
  createdAt: string;
  recommendations?: AiAssistantTripRecommendation[];
};

export type AiAssistantSuggestion = {
  id: string;
  label: string;
  prompt: string;
  filters?: AiAssistantSearchFilter;
};

export type AiAssistantSendOptions = {
  /** When true, skip adding a user bubble (e.g. welcome-only flows). */
  skipUserMessage?: boolean;
};
