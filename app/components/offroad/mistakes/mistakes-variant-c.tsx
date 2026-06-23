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

/** C - Trail Cards: horizontal snap scroll, swipe-friendly */
export default function OffroadMistakesVariantC({
  id = "beginner-mistakes-c",
  showLabel = false,
  label = "Approach C - Trail Scroll",
}: MistakesVariantProps) {
  const { activeId, activeMistake, activate, hover, clear } = useMistakeFocus();

  return (
    <section id={id} className={`${mistakesSectionShell} scroll-mt-24`}>
      <div className={offroadSectionInner}>
        {showLabel ? <MistakesPreviewLabel label={label} /> : null}
        <MistakesSectionHeading />

        <div className="mx-auto max-w-4xl">
          <ul className="-mx-1 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-1 pb-1 sm:gap-3">
            {OFFROAD_BEGINNER_MISTAKES.map((mistake, index) => {
              const isActive = activeId === mistake.id;

              return (
                <li
                  key={mistake.id}
                  className="w-[10.5rem] shrink-0 snap-start sm:w-[11.5rem]"
                >
                  <button
                    type="button"
                    onClick={() => activate(mistake.id)}
                    onMouseEnter={() => hover(mistake.id)}
                    onMouseLeave={clear}
                    onFocus={() => hover(mistake.id)}
                    onBlur={clear}
                    aria-pressed={isActive}
                    className={`flex h-full w-full flex-col rounded-2xl border px-3 py-3 text-start transition-all duration-200 sm:px-3.5 sm:py-3.5 ${
                      isActive
                        ? "-translate-y-0.5 border-amber-300/80 bg-amber-50/90 shadow-[0_10px_24px_-16px_rgba(180,83,9,0.35)] dark:border-amber-700/50 dark:bg-amber-950/35"
                        : "border-stone-200/70 bg-white/70 hover:-translate-y-0.5 hover:border-stone-300/80 hover:bg-white hover:shadow-sm dark:border-stone-700/60 dark:bg-stone-900/45 dark:hover:border-stone-600"
                    }`}
                  >
                    <span className="mb-2 flex items-center justify-between">
                      <span
                        className={`flex size-7 items-center justify-center rounded-lg transition-colors duration-200 ${
                          isActive
                            ? "bg-amber-200/70 text-amber-900 dark:bg-amber-900/50 dark:text-amber-200"
                            : "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400"
                        }`}
                      >
                        <MistakeIcon mistake={mistake} className="size-3.5" />
                      </span>
                      <span className="text-[10px] font-medium tabular-nums text-stone-300 dark:text-stone-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>

                    <span
                      className={`text-[13px] leading-snug transition-colors duration-200 ${
                        isActive
                          ? "font-medium text-stone-900 dark:text-stone-50"
                          : "text-stone-700 dark:text-stone-200"
                      }`}
                    >
                      {mistake.text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 min-h-[3.25rem] sm:mt-5">
            <MistakeHintPanel mistake={activeMistake} />
          </div>
        </div>
      </div>
    </section>
  );
}
