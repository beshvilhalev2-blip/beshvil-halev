import { getRegionBySlug, regions, type Region } from "@/data/trips";

export type TripCardDensity = "default" | "compact";

export const TRIP_CARD_SHELL =
  "group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-stone-800 dark:bg-stone-900";

export const TRIP_CARD_IMAGE_ASPECT = "aspect-[16/10]";

export function getRegionTheme(trip: { region: string }, region?: Region) {
  if (region) {
    return {
      borderHover: region.borderHover,
      accent: region.accent,
    };
  }

  const matched = regions.find((item) => item.title === trip.region);
  return {
    borderHover:
      matched?.borderHover ??
      "hover:border-stone-300 dark:hover:border-stone-600",
    accent: matched?.accent ?? "from-stone-500/20 to-stone-600/10",
  };
}

export function TripCardArrowIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-300 group-hover:-translate-x-1 ${className}`}
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

export function TripCardTagOverlay({
  tags,
  density = "default",
}: {
  tags: string[];
  density?: TripCardDensity;
}) {
  if (tags.length === 0) {
    return null;
  }

  const tagClassName =
    density === "compact"
      ? "rounded-full border border-white/25 bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-stone-800 shadow-sm backdrop-blur-sm dark:bg-stone-900/85 dark:text-stone-100"
      : "rounded-full border border-white/25 bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-stone-800 shadow-sm backdrop-blur-sm dark:bg-stone-900/85 dark:text-stone-100 sm:text-xs";

  return (
    <div className="absolute inset-x-3 bottom-3 flex flex-wrap justify-start gap-1.5">
      {tags.map((tag) => (
        <span key={tag} className={tagClassName}>
          {tag}
        </span>
      ))}
    </div>
  );
}

export function getTripCardContentClasses(density: TripCardDensity) {
  if (density === "compact") {
    return {
      body: "relative flex flex-1 flex-col p-3.5 sm:p-4",
      title:
        "mb-1.5 line-clamp-2 text-base font-bold leading-snug text-stone-900 dark:text-stone-50 sm:text-[1.05rem]",
      subtitle:
        "mb-3 line-clamp-2 flex-1 text-xs leading-relaxed text-stone-500 dark:text-stone-400 sm:text-sm",
      cta: "inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 transition-colors group-hover:text-stone-900 dark:text-stone-300 dark:group-hover:text-white sm:text-sm",
      arrow: "size-3.5",
    };
  }

  return {
    body: "relative flex flex-1 flex-col p-5 sm:p-6",
    title:
      "mb-2 line-clamp-2 text-xl font-bold text-stone-900 dark:text-stone-50 sm:text-2xl",
    subtitle:
      "mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-stone-500 dark:text-stone-400 sm:text-base",
    cta: "inline-flex items-center gap-2 text-sm font-semibold text-stone-700 transition-colors group-hover:text-stone-900 dark:text-stone-300 dark:group-hover:text-white",
    arrow: "size-4",
  };
}

export function getRegionForTrip(trip: { region: string }): Region | undefined {
  const slugByTitle: Record<string, string> = {
    צפון: "north",
    השרון: "hasharon",
    מרכז: "center",
    ירושלים: "jerusalem",
    דרום: "south",
  };
  const slug = slugByTitle[trip.region] ?? trip.region;
  return getRegionBySlug(slug);
}
