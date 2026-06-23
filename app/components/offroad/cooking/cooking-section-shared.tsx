import type { OffroadCookingTip } from "@/lib/offroad/content";
import {
  OFFROAD_COOKING_SECTION_SUBTITLE,
  OFFROAD_COOKING_SECTION_TITLE,
  OFFROAD_COOKING_TIPS,
} from "@/lib/offroad/content";
import { OffroadIcon, offroadSectionInner } from "../offroad-shared";

export { OFFROAD_COOKING_TIPS };
export type { OffroadCookingTip };

export const cookingSectionShell =
  "relative scroll-mt-24 px-4 py-6 sm:px-6 sm:py-8";

export type CookingVariantProps = {
  id?: string;
  showLabel?: boolean;
  label?: string;
};

export function CookingPreviewLabel({ label }: { label: string }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
      {label}
    </p>
  );
}

export function CookingSectionHeading() {
  return (
    <div className="relative mx-auto mb-5 max-w-xl text-center sm:mb-6">
      <h2 className="text-xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-2xl">
        {OFFROAD_COOKING_SECTION_TITLE}
      </h2>
      <p className="mt-1.5 text-xs leading-relaxed text-stone-500 dark:text-stone-400 sm:text-sm">
        {OFFROAD_COOKING_SECTION_SUBTITLE}
      </p>
    </div>
  );
}

export function CookingTipIcon({
  tip,
  className = "size-4",
}: {
  tip: OffroadCookingTip;
  className?: string;
}) {
  return <OffroadIcon id={tip.icon} className={className} aria-hidden="true" />;
}

export { offroadSectionInner };
