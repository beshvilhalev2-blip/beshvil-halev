import type { OffroadIconId } from "@/lib/offroad/content";

/** Unified surface card - use across safety, routes intro, cooking, gear, mistakes */
export const offroadCard =
  "group relative overflow-hidden rounded-2xl border border-stone-200/45 bg-white/70 shadow-[0_10px_36px_-22px_rgba(28,25,23,0.18)] backdrop-blur-md transition-all duration-300 ease-out dark:border-stone-700/45 dark:bg-stone-900/55 dark:shadow-[0_10px_36px_-22px_rgba(0,0,0,0.45)]";

export const offroadCardHover =
  "hover:-translate-y-0.5 hover:border-emerald-200/55 hover:bg-white/82 hover:shadow-[0_18px_44px_-24px_rgba(28,25,23,0.22)] dark:hover:border-emerald-800/40 dark:hover:bg-stone-900/72";

/** @deprecated use offroadCard */
export const offroadGlassCard = `${offroadCard} ${offroadCardHover}`;

export const offroadSectionShell =
  "relative scroll-mt-24 px-4 py-11 sm:px-6 sm:py-14 lg:py-16";

export const offroadSectionInner = "relative z-10 mx-auto max-w-6xl";

export function OffroadSectionHeader({
  title,
  subtitle,
  id,
  centered = true,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div
      className={`mb-8 sm:mb-10 ${centered ? "mx-auto max-w-2xl text-center" : ""}`}
    >
      <h2
        id={id}
        className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function OffroadIcon({
  id,
  className = "size-6",
}: {
  id: OffroadIconId;
  className?: string;
}) {
  switch (id) {
    case "route":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M4 17l4-8 4 4 4-6 4 10" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="4" cy="17" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="20" cy="17" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "pack":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" />
          <path d="M6 7h12l1 12H5L6 7Z" strokeLinejoin="round" />
        </svg>
      );
    case "kids":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <circle cx="12" cy="7" r="3" />
          <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" strokeLinecap="round" />
        </svg>
      );
    case "water":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M12 3c3 4 6 7 6 10a6 6 0 1 1-12 0c0-3 3-6 6-10Z" strokeLinejoin="round" />
        </svg>
      );
    case "sun":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
        </svg>
      );
    case "warning":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M12 3 2 20h20L12 3Z" strokeLinejoin="round" />
          <path d="M12 10v4M12 16h.01" strokeLinecap="round" />
        </svg>
      );
    case "coffee":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z" />
          <path d="M16 10h2a2 2 0 0 1 0 4h-2" strokeLinecap="round" />
          <path d="M7 4c0 1 .5 2 2 2" strokeLinecap="round" />
        </svg>
      );
    case "gear":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "trail":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M4 17c2-4 4-6 8-6s6 2 8 6" strokeLinecap="round" />
          <path d="M8 7h8M10 11h4" strokeLinecap="round" />
        </svg>
      );
    case "convoy":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <rect x="3" y="8" width="7" height="5" rx="1" />
          <rect x="14" y="8" width="7" height="5" rx="1" />
          <path d="M5.5 13v2M18.5 13v2M10 10.5h4" strokeLinecap="round" />
        </svg>
      );
    case "sunset":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M4 18h16" strokeLinecap="round" />
          <path d="M12 4v4M7 7l2.5 2.5M17 7l-2.5 2.5" strokeLinecap="round" />
          <path d="M8 14a4 4 0 0 1 8 0" strokeLinecap="round" />
        </svg>
      );
    case "nature":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M12 21V11" strokeLinecap="round" />
          <path d="M8 14c-2-4 0-8 4-10 4 2 6 6 4 10" strokeLinejoin="round" />
          <path d="M16 14c2-4 0-8-4-10" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
        </svg>
      );
  }
}
