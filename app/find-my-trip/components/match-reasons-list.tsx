import { MATCH_REASONS_TITLE } from "@/lib/find-my-trip/constants";
import type { MatchReason } from "@/lib/find-my-trip/types";

function CheckBulletIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function MatchReasonsList({
  reasons,
  compact = false,
}: {
  reasons: MatchReason[];
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "rounded-xl border border-stone-200/80 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-950/60"
          : "rounded-2xl border border-stone-200/80 bg-stone-50 p-5 dark:border-stone-700 dark:bg-stone-950/60 sm:p-6"
      }
    >
      <h3
        className={
          compact
            ? "mb-3 text-sm font-bold text-stone-900 dark:text-stone-50"
            : "mb-4 text-base font-bold text-stone-900 dark:text-stone-50 sm:text-lg"
        }
      >
        {MATCH_REASONS_TITLE}
      </h3>
      <ul className="space-y-2.5">
        {reasons.map((reason) => (
          <li
            key={reason.id}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-stone-600 dark:text-stone-300 sm:text-base"
          >
            <CheckBulletIcon />
            <span>{reason.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
