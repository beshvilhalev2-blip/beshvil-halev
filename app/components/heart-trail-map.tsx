"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  getMapRegionTripCounts,
  getPublishedTripsForMapFilter,
  type Trip,
} from "@/data/trips";
import {
  DEAD_SEA,
  DISCOVERY_MAP_REGIONS,
  FILTERABLE_REGION_SLUGS,
  ISRAEL_OUTLINE,
  MAP_VIEWBOX,
  MEDITERRANEAN_WIDTH,
  SEA_OF_GALILEE,
  type DiscoveryRegionSlug,
} from "@/lib/israel-discovery-map";
import { getTripCardLayerStyle } from "@/lib/trip-media";

type RegionSlug = DiscoveryRegionSlug;
type FilterSlug = "all" | RegionSlug;

const mapRegions = DISCOVERY_MAP_REGIONS;

const FILTER_OPTIONS: { slug: FilterSlug; label: string }[] = [
  { slug: "all", label: "הכל" },
  ...FILTERABLE_REGION_SLUGS.map((slug) => {
    const region = mapRegions.find((entry) => entry.slug === slug)!;
    return { slug, label: region.title };
  }),
];

const TOPO_TEXTURE = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'>
    <g fill='none' stroke='%23a8957a' stroke-width='0.55' opacity='0.45'>
      <ellipse cx='160' cy='160' rx='120' ry='72'/>
      <ellipse cx='120' cy='200' rx='90' ry='54'/>
      <ellipse cx='210' cy='110' rx='70' ry='42'/>
    </g>
  </svg>`,
)}")`;

const MAP_TOPO_PATTERN = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'>
    <g fill='none' stroke='%23b8a892' stroke-width='0.5' opacity='0.32'>
      <path d='M 8 70 Q 35 48 62 70 T 116 70'/>
      <path d='M 18 105 Q 45 85 72 105 T 126 105'/>
      <path d='M 0 35 Q 25 22 50 35'/>
    </g>
  </svg>`,
)}")`;

const HIDDEN_CATEGORY = "מקום שביקרנו";

function formatTripCount(count: number): string {
  return count === 1 ? "מסלול אחד" : `${count} מסלולים`;
}

function regionLabelForFilter(filter: FilterSlug): string {
  if (filter === "all") return "כל האזורים";
  return mapRegions.find((region) => region.slug === filter)?.title ?? filter;
}

function RegionFilters({
  activeFilter,
  onSelect,
}: {
  activeFilter: FilterSlug | null;
  onSelect: (slug: FilterSlug) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2" role="tablist" aria-label="סינון לפי אזור">
      {FILTER_OPTIONS.map((option) => {
        const isActive = activeFilter !== null && activeFilter === option.slug;
        return (
          <button
            key={option.slug}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(option.slug)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm ${
              isActive
                ? "border-[#4F5E48] bg-[#4F5E48] text-white shadow-sm"
                : "border-stone-300/80 bg-white/90 text-stone-700 hover:border-stone-400 hover:bg-stone-50"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function MapTripCard({ trip }: { trip: Trip }) {
  const showCategory = trip.category !== HIDDEN_CATEGORY;
  const tagItems = [
    ...(showCategory ? [trip.category] : []),
    ...(trip.tags?.slice(0, 2) ?? []),
  ];

  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-stone-200/80 bg-white shadow-[0_4px_16px_rgba(28,25,23,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(28,25,23,0.08)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
          style={getTripCardLayerStyle(trip)}
          role="img"
          aria-label={trip.heroImageLabel}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/25 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-3.5">
        <h3 className="mb-1 line-clamp-1 text-sm font-bold text-stone-900 sm:text-[0.9375rem]">
          {trip.title}
        </h3>
        {tagItems.length > 0 ? (
          <div className="mb-1.5 flex flex-wrap gap-1">
            {tagItems.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
        <p className="mb-2.5 line-clamp-2 flex-1 text-xs leading-relaxed text-stone-600">
          {trip.subtitle}
        </p>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#A8895C] transition-colors group-hover:text-[#8F7348]">
          גלה המסלול
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5" aria-hidden="true">
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function CompassRose() {
  return (
    <g transform="translate(36 568)" aria-hidden="true">
      <circle cx="0" cy="0" r="15" fill="#F7F3EC" stroke="#8DA889" strokeWidth="1" opacity="0.92" />
      <path d="M 0 -9 L 2.5 0 L 0 9 L -2.5 0 Z" fill="#4F5E48" />
      <text x="0" y="-16" textAnchor="middle" fill="#4F5E48" className="text-[7px] font-bold">
        N
      </text>
    </g>
  );
}

function IsraelMap({
  activeSlug,
  hoveredSlug,
  tripCounts,
  onHover,
  onSelect,
}: {
  activeSlug: RegionSlug | null;
  hoveredSlug: RegionSlug | null;
  tripCounts: Record<string, number>;
  onHover: (slug: RegionSlug | null) => void;
  onSelect: (slug: RegionSlug) => void;
}) {
  const highlightSlug = hoveredSlug ?? activeSlug;

  return (
    <div
      className="relative flex h-full min-h-[18rem] items-center justify-center overflow-hidden rounded-2xl border border-stone-200/60 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:min-h-[20rem] lg:min-h-0 lg:h-full lg:max-h-[26rem]"
      style={{
        backgroundImage: `${MAP_TOPO_PATTERN}, linear-gradient(160deg, #F5EFE4 0%, #EBE3D6 48%, #E4DACE 100%)`,
        backgroundSize: "140px 140px, 100% 100%",
      }}
    >
      <div className="pointer-events-none absolute start-2 top-2 z-10 flex max-w-[9.5rem] items-start gap-1.5 rounded-lg border border-white/70 bg-white/88 px-2 py-1.5 shadow-sm">
        <svg viewBox="0 0 24 24" className="mt-0.5 size-3.5 shrink-0 text-[#C4A574]" aria-hidden="true">
          <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.85" />
          <path d="M12 2v2M12 20v2M4 12H2M22 12h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p className="text-[9px] leading-snug text-stone-600">
          רחפו מעל אזור לצפייה במסלולים ותמונות
        </p>
      </div>

      <svg
        viewBox={MAP_VIEWBOX}
        className="relative z-[1] h-full max-h-[24rem] w-auto touch-manipulation lg:max-h-none lg:w-full"
        role="img"
        aria-label="מפת ישראל — אזורי טיול"
      >
        <defs>
          <clipPath id="israelLandClip">
            <path id="israel-outline" d={ISRAEL_OUTLINE} />
          </clipPath>
          <linearGradient id="medSea" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DCE8EE" />
            <stop offset="100%" stopColor="#C5D6E0" />
          </linearGradient>
          <linearGradient id="inlandWater" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8AADBE" />
            <stop offset="100%" stopColor="#6E95A8" />
          </linearGradient>
          <filter id="regionLabelShadow">
            <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#FFFFFF" floodOpacity="0.85" />
          </filter>
        </defs>

        <rect x="0" y="0" width={MEDITERRANEAN_WIDTH} height="620" fill="url(#medSea)" />

        <path id="israel-outline-base" d={ISRAEL_OUTLINE} fill="#E9E1D5" stroke="#C8BAA8" strokeWidth="1.5" />

        <g clipPath="url(#israelLandClip)">
          {mapRegions.map((region) => {
            const isHighlighted = highlightSlug === region.slug;
            const isDimmed = highlightSlug !== null && !isHighlighted;
            const count = tripCounts[region.slug] ?? 0;
            const strokeDasharray = region.dashedBorder
              ? "4 3"
              : isHighlighted
                ? undefined
                : "5 4";

            return (
              <g key={region.slug} style={{ opacity: isDimmed ? 0.45 : 1, transition: "opacity 0.25s ease" }}>
                <path
                  id={region.slug}
                  d={region.path}
                  fill={isHighlighted ? region.fillActive : region.fill}
                  stroke="#FFFFFF"
                  strokeWidth={isHighlighted ? 2.25 : 1.5}
                  strokeDasharray={strokeDasharray}
                  strokeLinejoin="round"
                  className="cursor-pointer transition-[fill,stroke-width] duration-300"
                  onMouseEnter={() => onHover(region.slug)}
                  onMouseLeave={() => onHover(null)}
                  onFocus={() => onHover(region.slug)}
                  onBlur={() => onHover(null)}
                  onClick={() => onSelect(region.slug)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelect(region.slug);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${region.title} — ${formatTripCount(count)}`}
                />
                <text
                  x={region.labelX}
                  y={region.labelY}
                  textAnchor="middle"
                  fill="#2F4530"
                  className="pointer-events-none select-none text-[11px] font-bold"
                  style={{ fontFamily: "inherit", filter: "url(#regionLabelShadow)" }}
                >
                  {region.title}
                </text>
                <text
                  x={region.labelX}
                  y={region.countY}
                  textAnchor="middle"
                  fill="#4F5E48"
                  className="pointer-events-none select-none text-[8px] font-medium"
                  style={{ fontFamily: "inherit", opacity: 0.92 }}
                >
                  {formatTripCount(count)}
                </text>
              </g>
            );
          })}
        </g>

        <path id="sea-of-galilee" d={SEA_OF_GALILEE} fill="url(#inlandWater)" stroke="#FFFFFF" strokeWidth="1" opacity="0.95" />
        <path id="dead-sea" d={DEAD_SEA} fill="url(#inlandWater)" stroke="#FFFFFF" strokeWidth="1" opacity="0.95" />
        <path id="israel-outline-stroke" d={ISRAEL_OUTLINE} fill="none" stroke="#C8BAA8" strokeWidth="1.75" opacity="0.85" />

        <CompassRose />
      </svg>
    </div>
  );
}

export default function HeartTrailMap() {
  const [selectedFilter, setSelectedFilter] = useState<FilterSlug>("all");
  const [hoveredSlug, setHoveredSlug] = useState<RegionSlug | null>(null);

  const tripCounts = useMemo(() => getMapRegionTripCounts(), []);

  const activeFilter: FilterSlug = hoveredSlug ?? selectedFilter;
  const activeMapSlug: RegionSlug | null = activeFilter === "all" ? null : activeFilter;

  const visibleTrips = useMemo(
    () => getPublishedTripsForMapFilter(activeFilter),
    [activeFilter],
  );

  const handleSelectFilter = useCallback((slug: FilterSlug) => {
    setSelectedFilter(slug);
    setHoveredSlug(null);
  }, []);

  const handleMapSelect = useCallback((slug: RegionSlug) => {
    setSelectedFilter(slug);
    setHoveredSlug(null);
  }, []);

  const pillActiveFilter: FilterSlug | null = (() => {
    const slug = hoveredSlug ?? selectedFilter;
    if (slug === "judea-samaria") return null;
    return slug;
  })();

  return (
    <section
      id="heart-trail-map"
      className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-12"
      aria-label="מפת גילוי אזורים"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#EBE4DA]/88 via-[#F0EBE3]/95 to-[#E8E0D4]/90" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_0%,rgba(232,217,192,0.34),transparent_68%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.11] mix-blend-multiply" style={{ backgroundImage: TOPO_TEXTURE, backgroundSize: "320px 320px" }} aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-6 text-center sm:mb-7">
          <p className="mb-2 inline-block rounded-full border border-stone-300/55 bg-white/50 px-4 py-1 text-sm font-medium text-stone-600">
            גלו את הארץ
          </p>
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">מפת השבילים</h2>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-stone-600 sm:text-base">
            רחפו מעל אזור, גלו כמה מסלולים מחכים — ובחרו את היעד הבא
          </p>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-stone-200/70 bg-[#FAF7F1]/92 p-3 shadow-[0_14px_40px_rgba(28,25,23,0.06)] sm:p-5 lg:p-6">
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,40%)_minmax(0,60%)] lg:items-stretch lg:gap-5 lg:[direction:ltr]">
            <div className="order-2 lg:order-none">
              <IsraelMap
                activeSlug={activeMapSlug}
                hoveredSlug={hoveredSlug}
                tripCounts={tripCounts}
                onHover={setHoveredSlug}
                onSelect={handleMapSelect}
              />
            </div>

            <div className="order-1 flex min-h-0 flex-col gap-3 lg:order-none lg:gap-3.5">
              <RegionFilters activeFilter={pillActiveFilter} onSelect={handleSelectFilter} />

              <div className="flex min-h-0 flex-1 flex-col">
                <div className="mb-2.5 flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-bold text-stone-900 sm:text-base">מסלולים באזור הנבחר</h3>
                  <span className="text-xs text-stone-500">
                    {regionLabelForFilter(activeFilter)} · {formatTripCount(visibleTrips.length)}
                  </span>
                </div>

                {visibleTrips.length > 0 ? (
                  <div className="max-h-[26rem] overflow-y-auto overscroll-contain pe-1 [scrollbar-gutter:stable]">
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                      {visibleTrips.map((trip) => (
                        <MapTripCard key={trip.slug} trip={trip} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-stone-300/70 bg-white/50 px-4 py-10 text-center">
                    <p className="text-sm text-stone-600">
                      אין עדיין מסלולים מפורסמים ב{regionLabelForFilter(activeFilter)}.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex shrink-0 justify-center border-t border-stone-200/60 pt-3">
                <Link
                  href={
                    activeFilter === "all"
                      ? "/recommendations"
                      : mapRegions.find((region) => region.slug === activeFilter)?.href ?? "/recommendations"
                  }
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-stone-300/80 bg-white/85 px-5 py-2 text-sm font-semibold text-stone-800 shadow-sm transition-all hover:border-stone-400 hover:bg-white hover:shadow-md"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4 text-[#7A8B68]" aria-hidden="true">
                    <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" />
                    <path d="M9 4v14M15 6v14" />
                  </svg>
                  לכל המסלולים במפה
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
