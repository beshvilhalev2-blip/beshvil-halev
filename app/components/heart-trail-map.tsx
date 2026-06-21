"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  getMapRegionTripCounts,
  getSiteVisibleTripsForMapFilter,
  type Trip,
} from "@/data/trips";
import {
  DISCOVERY_MAP_REGIONS,
  FILTERABLE_REGION_SLUGS,
  ISRAEL_SILHOUETTE,
  REGION_SELECTOR_MARKERS,
  type DiscoveryRegionSlug,
} from "@/lib/israel-discovery-map";
import { getTripCardLayerStyle } from "@/lib/trip-media";

type RegionSlug = DiscoveryRegionSlug;
type FilterSlug = "all" | RegionSlug;

const mapRegions = DISCOVERY_MAP_REGIONS;
const regionBySlug = Object.fromEntries(mapRegions.map((region) => [region.slug, region]));

const FILTER_OPTIONS: { slug: FilterSlug; label: string }[] = [
  { slug: "all", label: "הכל" },
  ...FILTERABLE_REGION_SLUGS.map((slug) => {
    const region = mapRegions.find((entry) => entry.slug === slug)!;
    return { slug, label: region.title };
  }),
];

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
    <div className="flex flex-wrap justify-end gap-1.5 sm:gap-2" dir="rtl" role="tablist" aria-label="סינון לפי אזור">
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

function RegionMapMarker({
  region,
  count,
  top,
  left,
  scale = 1,
  isSelected,
  isHovered,
  isDimmed,
  onHover,
  onSelect,
}: {
  region: (typeof mapRegions)[number];
  count: number;
  top: number;
  left: number;
  scale?: number;
  isSelected: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: (slug: RegionSlug | null) => void;
  onSelect: (slug: RegionSlug) => void;
}) {
  const label = region.shortTitle ?? region.title;
  const active = isSelected || isHovered;

  return (
    <button
      type="button"
      onMouseEnter={() => onHover(region.slug)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(region.slug)}
      onBlur={() => onHover(null)}
      onClick={() => onSelect(region.slug)}
      aria-pressed={isSelected}
      aria-label={`${region.title} — ${formatTripCount(count)}`}
      className="absolute z-[3] touch-manipulation text-start transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F5E48] focus-visible:ring-offset-2"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-50%, -50%) scale(${isSelected ? scale * 1.07 : isHovered ? scale * 1.04 : scale})`,
        opacity: isDimmed ? 0.45 : 1,
      }}
    >
      <span
        className={`flex min-w-[5.25rem] flex-col gap-0.5 rounded-xl border px-2.5 py-2 shadow-[0_6px_20px_rgba(28,25,23,0.1)] backdrop-blur-md sm:min-w-[5.75rem] sm:px-3 sm:py-2.5 ${
          isSelected
            ? "border-[#4F5E48]/40 ring-2 ring-[#4F5E48]/25"
            : active
              ? "border-white/85"
              : "border-white/70"
        }`}
        style={{
          backgroundColor: active ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.88)",
          ...(isHovered && !isSelected ? { backgroundColor: region.hoverFill } : {}),
          boxShadow: isSelected
            ? `0 10px 28px rgba(28,25,23,0.14), inset 4px 0 0 ${region.fillActive}`
            : active
              ? `0 8px 22px rgba(28,25,23,0.11), inset 3px 0 0 ${region.fill}`
              : `0 6px 18px rgba(28,25,23,0.08), inset 3px 0 0 ${region.fill}`,
        }}
      >
        <span className="text-[11px] font-bold leading-tight text-stone-900 sm:text-xs">{label}</span>
        <span className="text-[10px] font-semibold text-stone-500">{formatTripCount(count)}</span>
      </span>
    </button>
  );
}

function RegionListRow({
  region,
  count,
  isSelected,
  isHovered,
  onHover,
  onSelect,
}: {
  region: (typeof mapRegions)[number];
  count: number;
  isSelected: boolean;
  isHovered: boolean;
  onHover: (slug: RegionSlug | null) => void;
  onSelect: (slug: RegionSlug) => void;
}) {
  const active = isSelected || isHovered;

  return (
    <button
      type="button"
      onMouseEnter={() => onHover(region.slug)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(region.slug)}
      onBlur={() => onHover(null)}
      onClick={() => onSelect(region.slug)}
      aria-pressed={isSelected}
      className={`flex w-full items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-end transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F5E48] ${
        isSelected
          ? "border-[#4F5E48]/35 bg-white shadow-sm"
          : isHovered
            ? "border-stone-200/80"
            : "border-transparent bg-white/60 hover:bg-white/90"
      }`}
      style={
        isHovered && !isSelected
          ? { backgroundColor: region.hoverFill }
          : undefined
      }
    >
      <span className="flex items-center gap-2">
        <span className="text-sm font-semibold text-stone-800">{region.title}</span>
        <span
          className="size-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: active ? region.fillActive : region.fill }}
          aria-hidden="true"
        />
      </span>
      <span className="shrink-0 text-xs font-medium text-stone-500">{formatTripCount(count)}</span>
    </button>
  );
}

function RegionDiscoveryPanel({
  activeSlug,
  hoveredSlug,
  tripCounts,
  onHover,
  onSelect,
  onSelectAll,
}: {
  activeSlug: RegionSlug | null;
  hoveredSlug: RegionSlug | null;
  tripCounts: Record<string, number>;
  onHover: (slug: RegionSlug | null) => void;
  onSelect: (slug: RegionSlug) => void;
  onSelectAll: () => void;
}) {
  const highlightSlug = hoveredSlug ?? activeSlug;
  const activeRegion = activeSlug ? regionBySlug[activeSlug] : null;

  return (
    <div className="flex h-full min-h-[24rem] flex-col overflow-hidden rounded-2xl border border-stone-200/55 bg-[#FAF7F1] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:min-h-[26rem] lg:min-h-[28rem]">
      <div className="border-b border-stone-200/45 px-4 py-3.5 text-end sm:px-5">
        <h3 className="text-base font-bold text-stone-900 sm:text-lg">איפה תרצו לטייל?</h3>
        <p className="mt-0.5 text-xs text-stone-500 sm:text-sm">בחרו אזור — המסלולים יתעדכנו מיד</p>
      </div>

      <div
        className="relative mx-3 mt-3 min-h-[13rem] flex-1 overflow-hidden rounded-xl border border-stone-200/40 sm:mx-4 sm:min-h-[14rem]"
        style={{
          backgroundImage: `linear-gradient(118deg, rgba(220,238,248,0.55) 0%, rgba(232,220,196,0.35) 22%, rgba(240,235,227,0.9) 55%, rgba(235,227,214,0.95) 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_18%_22%,rgba(184,206,214,0.45),transparent_65%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 start-0 w-[28%] bg-gradient-to-r from-[#C8D8DE]/50 to-transparent"
          aria-hidden="true"
        />

        <svg
          viewBox="0 0 220 560"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.16]"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <path d={ISRAEL_SILHOUETTE} fill="#6B7A62" stroke="#8B9A82" strokeWidth="1.5" />
        </svg>

        {activeRegion ? (
          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${REGION_SELECTOR_MARKERS.find((m) => m.slug === activeRegion.slug)?.left ?? 50}% ${REGION_SELECTOR_MARKERS.find((m) => m.slug === activeRegion.slug)?.top ?? 50}%, ${activeRegion.fillActive}55 0%, transparent 55%)`,
            }}
            aria-hidden="true"
          />
        ) : null}

        {REGION_SELECTOR_MARKERS.map((marker) => (
          <RegionMapMarker
            key={marker.slug}
            region={regionBySlug[marker.slug]}
            count={tripCounts[marker.slug] ?? 0}
            top={marker.top}
            left={marker.left}
            scale={marker.scale}
            isSelected={activeSlug === marker.slug}
            isHovered={hoveredSlug === marker.slug}
            isDimmed={highlightSlug !== null && highlightSlug !== marker.slug}
            onHover={onHover}
            onSelect={onSelect}
          />
        ))}

        <button
          type="button"
          onClick={onSelectAll}
          className="absolute bottom-2 start-2 z-[2] rounded-full border border-white/70 bg-white/80 px-2.5 py-1 text-[10px] font-medium text-stone-600 backdrop-blur-sm transition-colors hover:bg-white"
        >
          הצג את כל הארץ
        </button>
      </div>

      <div className="flex flex-col gap-1 px-3 py-3 sm:px-4 sm:py-3.5" dir="rtl" role="list" aria-label="רשימת אזורים">
        {mapRegions.map((region) => (
          <RegionListRow
            key={region.slug}
            region={region}
            count={tripCounts[region.slug] ?? 0}
            isSelected={activeSlug === region.slug}
            isHovered={hoveredSlug === region.slug}
            onHover={onHover}
            onSelect={onSelect}
          />
        ))}
      </div>
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
    () => getSiteVisibleTripsForMapFilter(activeFilter),
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

  const handleSelectAll = useCallback(() => {
    setSelectedFilter("all");
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
      className="relative overflow-hidden px-4 pt-2 pb-8 sm:px-6 sm:pt-3 sm:pb-9"
      aria-label="מפת גילוי אזורים"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-4 text-center sm:mb-5">
          <p className="mb-2 inline-block rounded-full border border-stone-300/55 bg-white/50 px-4 py-1 text-sm font-medium text-stone-600">
            גלו את הארץ
          </p>
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">מפת השבילים</h2>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-stone-600 sm:text-base">
            בחרו אזור בארץ וגלו מסלולים — המפה והכרטיסיות מתעדכנות יחד
          </p>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-stone-200/70 bg-[#FAF7F1]/92 p-3 shadow-[0_14px_40px_rgba(28,25,23,0.06)] sm:p-5 lg:p-6">
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,42%)_minmax(0,58%)] lg:items-stretch lg:gap-5 lg:[direction:ltr]">
            <div className="order-2 lg:order-none">
              <RegionDiscoveryPanel
                activeSlug={activeMapSlug}
                hoveredSlug={hoveredSlug}
                tripCounts={tripCounts}
                onHover={setHoveredSlug}
                onSelect={handleMapSelect}
                onSelectAll={handleSelectAll}
              />
            </div>

            <div className="order-1 flex min-h-0 flex-col gap-3 lg:order-none lg:gap-3.5" dir="rtl">
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
