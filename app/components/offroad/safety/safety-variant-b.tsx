import {
  OFFROAD_SAFETY_RULES,
  SafetyPreviewLabel,
  SafetyRuleCopy,
  SafetySectionHeading,
  SafetyTileIcon,
  offroadSectionInner,
  type SafetyVariantProps,
} from "./safety-section-shared";
import { offroadCard, offroadCardHover, offroadSectionShell } from "../offroad-shared";

/** B — Soft Elevate: warm stone surfaces, emerald accent, clean lift */
export default function OffroadSafetyVariantB({
  id = "safety-rules-b",
  showLabel = false,
  label = "Approach B — Soft Elevate",
}: SafetyVariantProps) {
  return (
    <section id={id} className={`${offroadSectionShell} scroll-mt-24`}>
      <div className={offroadSectionInner}>
        {showLabel ? <SafetyPreviewLabel label={label} /> : null}
        <SafetySectionHeading subtitle="לפני שיוצאים להרפתקה" />

        <ul className="grid grid-cols-2 gap-3 sm:gap-3.5 lg:grid-cols-3">
          {OFFROAD_SAFETY_RULES.map((rule, index) => (
            <li key={rule.id}>
              <div
                className={`${offroadCard} ${offroadCardHover} flex min-h-[5.25rem] cursor-default flex-col p-3.5 sm:min-h-[5.5rem] sm:p-4`}
              >
                <span
                  className="absolute inset-x-0 top-0 h-px scale-x-0 rounded-t-2xl bg-gradient-to-l from-transparent via-emerald-400/70 to-transparent transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden="true"
                />

                <div className="flex items-center justify-between gap-2">
                  <span className="flex size-8 items-center justify-center rounded-xl bg-stone-100/90 text-stone-600 transition-all duration-300 group-hover:bg-emerald-50 group-hover:text-emerald-700 dark:bg-stone-800 dark:text-stone-300 dark:group-hover:bg-emerald-950/50 dark:group-hover:text-emerald-300">
                    <SafetyTileIcon
                      rule={rule}
                      iconClassName="size-4 transition-transform duration-300 group-hover:scale-110"
                    />
                  </span>
                  <span className="text-[10px] font-bold tabular-nums text-stone-300 dark:text-stone-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-2.5">
                  <SafetyRuleCopy rule={rule} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
