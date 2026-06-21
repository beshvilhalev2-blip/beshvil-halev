import type { AiAssistantMessage, AiAssistantSuggestion } from "@/lib/ai-assistant/types";

export const AI_ASSISTANT_AVATAR_SRC =
  "/images/ai-assistant/milana-ai-avatar/milana-ai-avatar.png";

export const AI_ASSISTANT_AVATAR_ALT = "מילאנה AI — עוזרת הטיולים";

export const AI_ASSISTANT_WELCOME_MESSAGE =
  "היי 🌿\nאני מילאנה AI, העוזרת הטיולית האישית שלך.\nספרו לי מה בא לכם לעשות, ואני אעזור לכם למצוא טיול שמתאים בדיוק בשבילכם.";

export const AI_ASSISTANT_SUGGESTIONS: AiAssistantSuggestion[] = [
  {
    id: "water",
    label: "💧 טיול עם מים",
    prompt: "מחפשים טיול עם מים",
    filters: { water: true },
  },
  {
    id: "kids",
    label: "👶 טיול עם ילדים",
    prompt: "טיול מתאים לילדים",
    filters: { kids: true },
  },
  {
    id: "offroad",
    label: "🚙 שטח 4x4",
    prompt: "טיול בשטח עם 4x4",
    filters: { offroad: true },
  },
  {
    id: "viewpoint",
    label: "🌅 תצפית יפה",
    prompt: "תצפית יפה לשקיעה או נוף",
    filters: { viewpoint: true },
  },
  {
    id: "camping",
    label: "🏕️ קמפינג",
    prompt: "מקום לקמפינג",
    filters: { camping: true },
  },
  {
    id: "free",
    label: "💸 חינם",
    prompt: "טיול חינמי",
    filters: { free: true },
  },
  {
    id: "stroller",
    label: "♿ נגיש לעגלות",
    prompt: "מקום נגיש לעגלות",
    filters: { stroller: true },
  },
];

export function createWelcomeMessage(): AiAssistantMessage {
  return {
    id: "welcome",
    role: "assistant",
    content: AI_ASSISTANT_WELCOME_MESSAGE,
    createdAt: new Date().toISOString(),
  };
}
