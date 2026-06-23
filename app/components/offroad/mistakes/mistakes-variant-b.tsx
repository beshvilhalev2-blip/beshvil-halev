"use client";

import {
  MistakeIcon,
  MistakesPreviewLabel,
  MistakesSectionHeading,
  mistakesSectionShell,
  OFFROAD_BEGINNER_MISTAKES,
  offroadSectionInner,
  useMistakeFocus,
  type MistakesVariantProps,
} from "./mistakes-section-shared";

/** B - Compact Grid: 5×2 scan grid, inline hint on focus/hover */
export default function OffroadMistakesVariantB({
  id = "beginner-mistakes-b",
  showLabel = false,
  label = "Approach B - Compact Grid",
}: MistakesVariantProps) {
  const { activeId, activate, hover, clear } = useMistakeFocus();

  return (
    <section id={id} className={`${mistakesSectionShell} scroll-mt-24`}>
      <div className={offroadSectionInner}>
        {showLabel ? <MistakesPreviewLabel label={label} /> : null}
        <MistakesSectionHeading />

        <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-1 lg:grid-cols-5">
          {OFFROAD_BEGINNER_MISTAKES.map((mistake, index) => {
            const isActive = activeId === mistake.id;

            return (
              <li key={mistake.id}>
                <button
                  type="button"
                  onClick={() => activate(mistake.id)}
                  onMouseEnter={() => hover(mistake.id)}
                  onMouseLeave={clear}
                  onFocus={() => hover(mistake.id)}
                  onBlur={clear}
                  aria-pressed={isActive}
                  className={`group flex w-full items-start gap-2 rounded-xl px-2 py-2 text-start transition-all duration-200 sm:px-2.5 sm:py-2.5 ${
                    isActive
                      ? "bg-amber-50/90 dark:bg-amber-950/30"
                      : "hover:bg-stone-100/80 dark:hover:bg-stone-900/50"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold tabular-nums transition-colors duration-200 ${
                      isActive
                        ? "bg-amber-200/80 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200"
                        : "bg-stone-100 text-stone-400 group-hover:bg-amber-100/80 group-hover:text-amber-800 dark:bg-stone-800 dark:text-stone-500 dark:group-hover:bg-amber-950/50 dark:group-hover:text-amber-300"
                    }`}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-start gap-1.5">
                      <MistakeIcon
                        mistake={mistake}
                        className={`mt-0.5 size-3.5 shrink-0 transition-colors duration-200 ${
                          isActive
                            ? "text-amber-700 dark:text-amber-300"
                            : "text-stone-400 group-hover:text-amber-600 dark:text-stone-500"
                        }`}
                      />
                      <span
                        className={`text-[13px] leading-snug transition-colors duration-200 sm:text-sm ${
                          isActive
                            ? "font-medium text-stone-900 dark:text-stone-50"
                            : "text-stone-600 group-hover:text-stone-800 dark:text-stone-300"
                        }`}
                      >
                        {mistake.text}
                      </span>
                    </span>

                    <span
                      className={`mt-1 block text-xs leading-relaxed text-stone-500 transition-all duration-200 dark:text-stone-400 ${
                        isActive
                          ? "max-h-16 opacity-100"
                          : "max-h-0 overflow-hidden opacity-0 group-hover:max-h-16 group-hover:opacity-100"
                      }`}
                    >
                      {mistake.hint}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
