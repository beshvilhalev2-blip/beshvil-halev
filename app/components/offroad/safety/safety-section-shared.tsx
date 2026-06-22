import type { OffroadSafetyRule } from "@/lib/offroad/content";
import { OFFROAD_SAFETY_RULES } from "@/lib/offroad/content";
import { OffroadIcon, offroadSectionInner } from "../offroad-shared";

export { OFFROAD_SAFETY_RULES };
export type { OffroadSafetyRule };

export const SAFETY_SECTION_TITLE = "כללי בטיחות בשטח";

export function SafetyTopographicBackdrop({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.045] dark:opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="safety-topo"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 60 Q30 40 60 60 T120 60 M0 90 Q30 70 60 90 T120 90 M0 30 Q30 10 60 30 T120 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              className="text-stone-600"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#safety-topo)" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-50/80 dark:to-stone-950/80" />
    </div>
  );
}

type SafetyTileProps = {
  rule: OffroadSafetyRule;
  index: number;
  className?: string;
};

export function SafetyTileIcon({
  rule,
  iconClassName = "size-4",
  wrapClassName = "",
}: {
  rule: OffroadSafetyRule;
  iconClassName?: string;
  wrapClassName?: string;
}) {
  return (
    <span className={wrapClassName}>
      <OffroadIcon id={rule.icon} className={iconClassName} />
    </span>
  );
}

export function SafetySectionHeading({ subtitle }: { subtitle?: string }) {
  return (
    <div className="relative mx-auto mb-8 max-w-2xl text-center sm:mb-10">
      <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
        {SAFETY_SECTION_TITLE}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export type SafetyVariantProps = {
  id?: string;
  showLabel?: boolean;
  label?: string;
};

export function SafetyPreviewLabel({ label }: { label: string }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
      {label}
    </p>
  );
}

export { offroadSectionInner };

export type SafetyTileContentProps = SafetyTileProps;

export function SafetyRuleCopy({ rule }: { rule: OffroadSafetyRule }) {
  return (
    <>
      <p className="text-[11px] font-semibold leading-snug text-stone-800 dark:text-stone-100 sm:text-xs">
        {rule.text}
      </p>
      {rule.description ? (
        <p className="mt-1 text-[10px] leading-snug text-stone-500 dark:text-stone-400 sm:text-[11px]">
          {rule.description}
        </p>
      ) : null}
    </>
  );
}
