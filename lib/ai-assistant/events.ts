export const OPEN_AI_ASSISTANT_EVENT = "beshvil:open-ai-assistant" as const;

export function openAiAssistant(): void {
  window.dispatchEvent(new CustomEvent(OPEN_AI_ASSISTANT_EVENT));
}
