"use client";

import {
  MistakeHintPanel,
  MistakeIcon,
  MistakesPreviewLabel,
  MistakesSectionHeading,
  mistakesSectionShell,
  OFFROAD_BEGINNER_MISTAKES,
  offroadSectionInner,
  useMistakeFocus,
  type MistakesVariantProps,
} from "./mistakes-section-shared";

/** A - Wisdom Chips: wrapped pills, all visible, hint ticker below */
export default function OffroadMistakesVariantA({
  id = "beginner-mistakes-a",
  showLabel = false,
  label = "Approach A - Wisdom Chips",
}: MistakesVariantProps) {
  const { activeId, activeMistake, activate, hover, clear } = useMistakeFocus();

  return (
    <section id={id} className={`${mistakesSectionShell} scroll-mt-24`}>
      <div className={offroadSectionInner}>
        {showLabel ? <MistakesPreviewLabel label={label} /> : null}
        <MistakesSectionHeading />

        <div className="mx-auto max-w-3xl">
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
            {OFFROAD_BEGINNER_MISTAKES.map((mistake) => {
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
                    aria-describedby={
                      isActive ? `${id}-hint` : undefined
                    }
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium leading-snug transition-all duration-200 ease-out sm:px-3.5 sm:py-2 sm:text-sm ${
                      isActive
                        ? "-translate-y-px border-amber-300/90 bg-amber-50 text-stone-900 shadow-[0_6px_18px_-10px_rgba(180,83,9,0.35)] dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-stone-50"
                        : "border-stone-200/80 bg-white/75 text-stone-700 hover:-translate-y-px hover:border-amber-200/80 hover:bg-amber-50/70 hover:text-stone-900 hover:shadow-sm dark:border-stone-700/70 dark:bg-stone-900/50 dark:text-stone-300 dark:hover:border-amber-800/50 dark:hover:bg-amber-950/25"
                    }`}
                  >
                    <MistakeIcon
                      mistake={mistake}
                      className={`size-3.5 shrink-0 transition-colors duration-200 ${
                        isActive
                          ? "text-amber-700 dark:text-amber-300"
                          : "text-amber-600/70 dark:text-amber-400/70"
                      }`}
                    />
                    <span>{mistake.text}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div id={`${id}-hint`} className="mt-4 min-h-[3.25rem] sm:mt-5">
            <MistakeHintPanel mistake={activeMistake} />
          </div>
        </div>
      </div>
    </section>
  );
}
