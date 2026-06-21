"use client";

import { useMemo, useState } from "react";
import TripCardWithSave from "@/app/components/trip-card-with-save";
import type { Trip } from "@/data/trips";
import { categoryCardAccent } from "@/lib/hero-landscape/category-mood-config";
import type { AdventureCategoryId } from "@/lib/hero-adventure-selector";
import {
  countActiveFilters,
  filterRecommendationsTrips,
  RECOMMENDATIONS_QUICK_FILTERS,
  RECOMMENDATIONS_REGION_FILTERS,
  type RecommendationsQuickFilterId,
  type RecommendationsRegionSlug,
} from "@/lib/recommendations-filtering";
import { DISCOVERY_MAP_REGIONS } from "@/lib/israel-discovery-map";

type RecommendationsDiscoveryProps = {
  trips: Trip[];
};

function toggleSetValue<T>(current: Set<T>, value: T): Set<T> {
  const next = new Set(current);
  if (next.has(value)) {
    next.delete(value);
  } else {
    next.add(value);
  }
  return next;
}

function FilterChip({
  active,
  emoji,
  label,
  onClick,
  accent,
}: {
  active: boolean;
  emoji: string;
  label: string;
  onClick: () => void;
  accent?: ReturnType<typeof categoryCardAccent>;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "inline-flex min-h-10 items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "scale-[1.02] shadow-md"
          : "border-stone-200/90 bg-white text-stone-700 shadow-sm hover:border-stone-300 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800",
      ].join(" ")}
      style={
        active && accent
          ? {
              borderColor: accent.panelGroupBorder,
              backgroundColor: accent.panelGroupBg,
              color: accent.titleColor,
              boxShadow: accent.activeShadow,
            }
          : active
            ? {
                borderColor: "rgba(79, 94, 72, 0.45)",
                backgroundColor: "rgba(79, 94, 72, 0.1)",
                color: "rgb(61, 74, 56)",
              }
            : undefined
      }
    >
      <span className="text-lg leading-none" aria-hidden="true">
        {emoji}
      </span>
      <span>{label}</span>
    </button>
  );
}

function RegionChip({
  active,
  label,
  fill,
  onClick,
}: {
  active: boolean;
  label: string;
  fill: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "scale-[1.02] text-stone-900 shadow-md dark:text-stone-50"
          : "border-stone-200/90 bg-white text-stone-700 shadow-sm hover:border-stone-300 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800",
      ].join(" ")}
      style={
        active
          ? {
              borderColor: fill,
              backgroundColor: `${fill}22`,
            }
          : undefined
      }
    >
      <span
        className="size-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: fill }}
        aria-hidden="true"
      />
      <span>{label}</span>
    </button>
  );
}

function quickFilterAccent(id: RecommendationsQuickFilterId) {
  if (id === "coffee" || id === "families") return undefined;
  return categoryCardAccent(id as AdventureCategoryId);
}

export default function RecommendationsDiscovery({ trips }: RecommendationsDiscoveryProps) {
  const [quickFilters, setQuickFilters] = useState<Set<RecommendationsQuickFilterId>>(
    () => new Set(),
  );
  const [regionFilters, setRegionFilters] = useState<Set<RecommendationsRegionSlug>>(
    () => new Set(),
  );

  const filteredTrips = useMemo(
    () => filterRecommendationsTrips(trips, quickFilters, regionFilters),
    [trips, quickFilters, regionFilters],
  );

  const activeFilterCount = countActiveFilters(quickFilters, regionFilters);
  const hasActiveFilters = activeFilterCount > 0;

  const clearAllFilters = () => {
    setQuickFilters(new Set());
    setRegionFilters(new Set());
  };

  return (
    <>
      <div className="mb-8 text-center sm:mb-10">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl md:text-5xl">
          המלצות לטיולים
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
          כל המקומות, המסלולים וההמלצות של בשביל הלב — סננו לפי מה שמתאים לכם היום.
        </p>
        <p
          className="mt-4 text-sm font-medium text-stone-700 transition-opacity duration-200 dark:text-stone-300 sm:text-base"
          aria-live="polite"
        >
          נמצאו {filteredTrips.length} מקומות
        </p>
      </div>

      <div className="mb-8 space-y-6 rounded-[1.75rem] border border-stone-200/80 bg-white/90 p-4 shadow-sm backdrop-blur-sm sm:mb-10 sm:p-6 dark:border-stone-700 dark:bg-stone-900/80">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-stone-800 dark:text-stone-100">
            סינון חכם
          </p>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={clearAllFilters}
              className="inline-flex min-h-9 items-center rounded-full border border-stone-300/80 bg-stone-50 px-4 py-1.5 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-100 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
            >
              נקה הכל{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
            </button>
          ) : null}
        </div>

        <div>
          <h2 className="mb-3 text-base font-bold text-stone-900 dark:text-stone-50 sm:text-lg">
            מה בא לכם היום?
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {RECOMMENDATIONS_QUICK_FILTERS.map((filter) => (
              <FilterChip
                key={filter.id}
                active={quickFilters.has(filter.id)}
                emoji={filter.emoji}
                label={filter.label}
                accent={quickFilterAccent(filter.id)}
                onClick={() =>
                  setQuickFilters((current) => toggleSetValue(current, filter.id))
                }
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-base font-bold text-stone-900 dark:text-stone-50 sm:text-lg">
            איפה בארץ?
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {RECOMMENDATIONS_REGION_FILTERS.map((filter) => {
              const region = DISCOVERY_MAP_REGIONS.find((entry) => entry.slug === filter.slug)!;
              return (
                <RegionChip
                  key={filter.slug}
                  active={regionFilters.has(filter.slug)}
                  label={filter.label}
                  fill={region.fillActive}
                  onClick={() =>
                    setRegionFilters((current) => toggleSetValue(current, filter.slug))
                  }
                />
              );
            })}
          </div>
        </div>
      </div>

      {filteredTrips.length > 0 ? (
        <div className="grid gap-6 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTrips.map((trip) => (
            <TripCardWithSave key={trip.slug} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="rounded-[1.75rem] border border-dashed border-stone-300/90 bg-white/70 px-6 py-14 text-center dark:border-stone-700 dark:bg-stone-900/50">
          <h2 className="mb-3 text-xl font-bold text-stone-900 dark:text-stone-50">
            לא מצאנו טיולים שמתאימים לסינון שבחרתם
          </h2>
          <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            נסו לשנות את הבחירה או לנקות את הסינון כדי לראות שוב את כל המקומות.
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="inline-flex min-h-11 items-center rounded-xl bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
          >
            נקה סינון
          </button>
        </div>
      )}
    </>
  );
}
