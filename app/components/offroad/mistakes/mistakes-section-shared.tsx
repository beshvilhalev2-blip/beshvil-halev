"use client";

import { useCallback, useState } from "react";
import type { OffroadMistake } from "@/lib/offroad/content";
import { OFFROAD_BEGINNER_MISTAKES } from "@/lib/offroad/content";
import { OffroadIcon, offroadSectionInner } from "../offroad-shared";

export { OFFROAD_BEGINNER_MISTAKES };
export type { OffroadMistake };

export const MISTAKES_SECTION_TITLE = "טעויות של מתחילים";
export const MISTAKES_SECTION_SUBTITLE =
  "עשרה דברים שכדאי להימנע מהם לפני שיוצאים לשטח";

export const mistakesSectionShell =
  "relative scroll-mt-24 px-4 py-6 sm:px-6 sm:py-8";

export type MistakesVariantProps = {
  id?: string;
  showLabel?: boolean;
  label?: string;
};

export function MistakesPreviewLabel({ label }: { label: string }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
      {label}
    </p>
  );
}

export function MistakesSectionHeading() {
  return (
    <div className="relative mx-auto mb-5 max-w-xl text-center sm:mb-6">
      <h2 className="text-xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-2xl">
        {MISTAKES_SECTION_TITLE}
      </h2>
      <p className="mt-1.5 text-xs leading-relaxed text-stone-500 dark:text-stone-400 sm:text-sm">
        {MISTAKES_SECTION_SUBTITLE}
      </p>
    </div>
  );
}

export function MistakeIcon({
  mistake,
  className = "size-3.5",
}: {
  mistake: OffroadMistake;
  className?: string;
}) {
  return <OffroadIcon id={mistake.icon} className={className} aria-hidden="true" />;
}

export function useMistakeFocus(initialId?: string) {
  const [activeId, setActiveId] = useState<string | null>(initialId ?? null);

  const activate = useCallback((id: string) => {
    setActiveId((current) => (current === id ? null : id));
  }, []);

  const hover = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const clear = useCallback(() => {
    setActiveId(null);
  }, []);

  const activeMistake =
    OFFROAD_BEGINNER_MISTAKES.find((item) => item.id === activeId) ?? null;

  return { activeId, activeMistake, activate, hover, clear };
}

export function MistakeHintPanel({
  mistake,
  className = "",
}: {
  mistake: OffroadMistake | null;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto max-w-lg text-center transition-all duration-300 ${className}`}
      aria-live="polite"
    >
      {mistake ? (
        <p className="text-sm leading-relaxed text-stone-500 animate-in fade-in duration-200 dark:text-stone-400">
          <span className="font-medium text-stone-700 dark:text-stone-200">
            {mistake.text}
          </span>
          <span className="mx-1.5 text-stone-300 dark:text-stone-600">·</span>
          {mistake.hint}
        </p>
      ) : (
        <p className="text-xs text-stone-400 dark:text-stone-500">
          רחפו או הקישו על טיפ כדי לראות הסבר קצר
        </p>
      )}
    </div>
  );
}

export { offroadSectionInner };
