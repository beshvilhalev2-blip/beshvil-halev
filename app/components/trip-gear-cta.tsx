import Link from "next/link";
import { GEAR_HOMEPAGE_CTA } from "@/lib/gear-checklist/constants";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function BackpackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8"
      aria-hidden="true"
    >
      <path d="M8 7V5a4 4 0 0 1 8 0v2" />
      <path d="M6 7h12l1 14H5L6 7Z" />
      <path d="M9 11h6" />
    </svg>
  );
}

export default function TripGearCta() {
  return (
    <Link
      href={GEAR_HOMEPAGE_CTA.href}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:border-emerald-900/50 dark:from-emerald-950/40 dark:via-stone-900 dark:to-teal-950/30 sm:flex-row sm:items-center sm:gap-8 sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative mb-6 inline-flex size-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 transition-transform duration-500 group-hover:scale-110 dark:bg-emerald-950 dark:text-emerald-200 sm:mb-0">
        <BackpackIcon />
      </div>

      <div className="relative flex-1">
        <h2 className="mb-2 text-2xl font-bold text-stone-900 dark:text-stone-50 sm:text-3xl">
          {GEAR_HOMEPAGE_CTA.title}
        </h2>
        <p className="mb-5 max-w-2xl text-sm leading-relaxed text-stone-600 dark:text-stone-400 sm:text-base">
          {GEAR_HOMEPAGE_CTA.description}
        </p>
        <span className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:group-hover:bg-stone-200">
          {GEAR_HOMEPAGE_CTA.button}
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}
