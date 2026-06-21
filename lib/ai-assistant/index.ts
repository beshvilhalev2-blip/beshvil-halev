export {
  AI_ASSISTANT_AVATAR_ALT,
  AI_ASSISTANT_AVATAR_SRC,
  AI_ASSISTANT_SUGGESTIONS,
  AI_ASSISTANT_WELCOME_MESSAGE,
  createWelcomeMessage,
} from "@/lib/ai-assistant/constants";
export { getAiAssistantDisplayTags } from "@/lib/ai-assistant/display-tags";
export {
  hasActiveAssistantFilters,
  mergeAssistantSearchFilters,
  parseAssistantSearchQuery,
} from "@/lib/ai-assistant/parse-query";
export { searchAssistantTrips } from "@/lib/ai-assistant/search-trips";
export type {
  AiAssistantMessage,
  AiAssistantMessageRole,
  AiAssistantSearchFilter,
  AiAssistantSearchResult,
  AiAssistantSendOptions,
  AiAssistantSuggestion,
  AiAssistantTripRecommendation,
} from "@/lib/ai-assistant/types";
