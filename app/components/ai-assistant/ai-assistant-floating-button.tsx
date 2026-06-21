"use client";

import Image from "next/image";
import {
  AI_ASSISTANT_AVATAR_ALT,
  AI_ASSISTANT_AVATAR_SRC,
} from "@/lib/ai-assistant";

type AiAssistantFloatingButtonProps = {
  onOpen: () => void;
  hidden?: boolean;
};

export default function AiAssistantFloatingButton({
  onOpen,
  hidden = false,
}: AiAssistantFloatingButtonProps) {
  if (hidden) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="פתיחת מילאנה AI — עוזרת הטיולים האישית"
      className="group fixed bottom-5 left-4 z-[60] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-white via-emerald-50/70 to-emerald-100/50 px-3.5 py-3 text-start shadow-[0_12px_40px_-12px_rgba(6,78,59,0.35)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_16px_44px_-10px_rgba(6,78,59,0.42)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:bottom-6 sm:left-6 sm:px-4 sm:py-3.5 dark:border-emerald-800/70 dark:from-stone-900 dark:via-emerald-950/40 dark:to-emerald-950/20 dark:hover:border-emerald-700"
    >
      <span className="relative size-11 shrink-0 overflow-hidden rounded-full ring-2 ring-emerald-200/90 ring-offset-2 ring-offset-white transition-transform duration-300 group-hover:scale-105 dark:ring-emerald-800 dark:ring-offset-stone-900 sm:size-12">
        <Image
          src={AI_ASSISTANT_AVATAR_SRC}
          alt={AI_ASSISTANT_AVATAR_ALT}
          fill
          sizes="48px"
          className="object-cover"
        />
      </span>

      <span className="min-w-0 pe-1">
        <span className="block text-sm font-bold leading-tight text-emerald-950 dark:text-emerald-50 sm:text-[0.95rem]">
          מילאנה AI
        </span>
        <span className="mt-0.5 block text-[11px] leading-snug text-emerald-800/85 dark:text-emerald-200/80 sm:text-xs">
          עוזרת הטיולים האישית שלך
        </span>
      </span>
    </button>
  );
}
