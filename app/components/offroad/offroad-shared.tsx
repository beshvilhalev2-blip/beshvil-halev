import type { OffroadIconId } from "@/lib/offroad/content";

export const offroadGlassCard =
  "rounded-2xl border border-stone-200/70 bg-white/85 shadow-sm backdrop-blur-[2px] dark:border-stone-700/80 dark:bg-stone-900/80";

export const offroadSectionShell =
  "relative px-4 py-14 sm:px-6 sm:py-20";

export const offroadSectionInner = "mx-auto max-w-6xl";

export function OffroadSectionHeader({
  title,
  description,
  id,
}: {
  id?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 text-center sm:mb-10">
      <h2
        id={id}
        className="mb-3 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function OffroadIcon({ id, className = "size-6" }: { id: OffroadIconId; className?: string }) {
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
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
        </svg>
      );
  }
}
