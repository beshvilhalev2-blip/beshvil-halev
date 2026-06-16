import Link from "next/link";
import { HOMEPAGE_CTA } from "@/lib/find-my-trip/constants";

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

function CompassIcon() {
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
      <circle cx="12" cy="12" r="10" />
      <polygon points="16 8 14 14 8 16 10 10 16 8" />
    </svg>
  );
}

export default function FindMyTripCta() {
  return (
    <Link
      href={HOMEPAGE_CTA.href}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-7 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-amber-900/50 dark:from-amber-950/40 dark:via-stone-900 dark:to-orange-950/30 sm:flex-row sm:items-center sm:gap-8 sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative mb-6 inline-flex size-16 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200 sm:mb-0">
        <CompassIcon />
      </div>

      <div className="relative flex-1">
        <h2 className="mb-2 text-2xl font-bold text-stone-900 dark:text-stone-50 sm:text-3xl">
          {HOMEPAGE_CTA.title}
        </h2>
        <p className="mb-5 max-w-2xl text-sm leading-relaxed text-stone-600 dark:text-stone-400 sm:text-base">
          {HOMEPAGE_CTA.description}
        </p>
        <span className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:group-hover:bg-stone-200">
          {HOMEPAGE_CTA.button}
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}
