"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHeroCategory } from "./hero-category-context";
import { categoryCardAccent } from "@/lib/hero-landscape/category-mood-config";
import type {
  AdventureCategoryData,
  AdventureCategoryId,
  AdventureDestination,
} from "@/lib/hero-adventure-selector";
import {
  buildCategoryRecommendationDisplay,
  HERO_RECOMMENDATION_COUNT,
  pickRotatedDestinations,
  type CategoryRecommendationDisplay,
} from "@/lib/hero-recommendation-rotation";

type HeroAdventureSelectorProps = {
  categories: AdventureCategoryData[];
};

const RECOMMENDATION_FADE_MS = 220;

function CategoryArrow({ borderColor }: { borderColor: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-2 left-1/2 z-10 h-0 w-0 -translate-x-1/2 border-x-[7px] border-t-[8px] border-x-transparent"
      style={{ borderTopColor: borderColor }}
    />
  );
}

function FeaturedImage({
  destination,
  emoji,
  label,
}: {
  destination: AdventureDestination | null;
  emoji: string;
  label: string;
}) {
  return (
    <div className="relative mx-auto aspect-[16/10] max-h-[11rem] w-full overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/15 sm:max-h-[12rem] lg:mx-0 lg:aspect-auto lg:h-full lg:min-h-[12.5rem] lg:max-h-[13.5rem]">
      {destination?.image ? (
        <Image
          src={destination.image}
          alt={destination.title}
          fill
          sizes="(max-width: 1024px) 100vw, 520px"
          className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full min-h-[7rem] w-full flex-col items-center justify-center gap-1.5 bg-white/8 text-white/70">
          <span className="text-3xl" aria-hidden="true">
            {emoji}
          </span>
          <span className="text-xs font-medium">{label}</span>
        </div>
      )}
    </div>
  );
}

function RecommendationThumb({
  destination,
  emoji,
}: {
  destination: AdventureDestination;
  emoji: string;
}) {
  return (
    <Link
      href={`/trips/${destination.slug}`}
      className="group/rec flex min-w-0 flex-1 flex-col items-center gap-1.5 text-center transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div className="relative size-[3.75rem] overflow-hidden rounded-full border border-white/25 bg-white/10 shadow-sm shadow-black/10 transition-all duration-300 group-hover/rec:border-white/40 group-hover/rec:shadow-md sm:size-16 lg:size-[4.5rem]">
        {destination.image ? (
          <Image
            src={destination.image}
            alt=""
            fill
            sizes="60px"
            className="object-cover transition-transform duration-500 group-hover/rec:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg opacity-80">{emoji}</div>
        )}
      </div>
      <span className="max-w-[5.5rem] text-xs font-medium leading-snug text-white/90 sm:max-w-[6.5rem] sm:text-sm">
        {destination.title}
      </span>
    </Link>
  );
}

function buildInitialDisplay(
  categories: AdventureCategoryData[],
): Record<AdventureCategoryId, CategoryRecommendationDisplay> {
  return Object.fromEntries(
    categories.map((category) => [
      category.id,
      buildCategoryRecommendationDisplay(category.destinations),
    ]),
  ) as Record<AdventureCategoryId, CategoryRecommendationDisplay>;
}

export default function HeroAdventureSelector({ categories }: HeroAdventureSelectorProps) {
  const { setActiveCategory } = useHeroCategory();
  const defaultId = categories[0]?.id ?? "water";
  const [selectedId, setSelectedId] = useState<AdventureCategoryId | null>(null);
  const [activeId, setActiveId] = useState<AdventureCategoryId>(defaultId);
  const [panelVisible, setPanelVisible] = useState(false);
  const [displayByCategory, setDisplayByCategory] = useState<
    Record<AdventureCategoryId, CategoryRecommendationDisplay>
  >(() => buildInitialDisplay(categories));
  const [recommendationsVisible, setRecommendationsVisible] = useState(true);
  const fadeTimeoutRef = useRef<number | null>(null);
  useEffect(() => {
    setDisplayByCategory((current) => {
      const next = { ...current };
      for (const category of categories) {
        if (category.allDestinations.length <= HERO_RECOMMENDATION_COUNT) {
          next[category.id] = buildCategoryRecommendationDisplay(category.destinations);
          continue;
        }
        next[category.id] = buildCategoryRecommendationDisplay(
          pickRotatedDestinations(
            category.allDestinations,
            HERO_RECOMMENDATION_COUNT,
            category.destinations,
          ),
        );
      }
      return next;
    });
  }, [categories]);

  const preview = categories.find((category) => category.id === activeId) ?? categories[0];
  const previewDisplay = displayByCategory[activeId] ?? buildCategoryRecommendationDisplay(preview.destinations);

  const categoryById = useMemo(
    () => Object.fromEntries(categories.map((category) => [category.id, category])),
    [categories],
  );

  const clearFadeTimeout = useCallback(() => {
    if (fadeTimeoutRef.current !== null) {
      window.clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
  }, []);

  const applyRotatedDisplay = useCallback(
    (id: AdventureCategoryId, previous: AdventureDestination[]) => {
      const category = categoryById[id];
      if (!category || category.allDestinations.length <= HERO_RECOMMENDATION_COUNT) {
        return;
      }

      const destinations = pickRotatedDestinations(
        category.allDestinations,
        HERO_RECOMMENDATION_COUNT,
        previous,
      );

      setDisplayByCategory((current) => ({
        ...current,
        [id]: buildCategoryRecommendationDisplay(destinations),
      }));
    },
    [categoryById],
  );

  const rotateCategory = useCallback(
    (id: AdventureCategoryId) => {
      const category = categoryById[id];
      if (!category || category.allDestinations.length <= HERO_RECOMMENDATION_COUNT) {
        return;
      }

      const previous = displayByCategory[id]?.destinations ?? category.destinations;
      clearFadeTimeout();
      setRecommendationsVisible(false);

      fadeTimeoutRef.current = window.setTimeout(() => {
        applyRotatedDisplay(id, previous);
        setRecommendationsVisible(true);
        fadeTimeoutRef.current = null;
      }, RECOMMENDATION_FADE_MS);
    },
    [applyRotatedDisplay, categoryById, clearFadeTimeout, displayByCategory],
  );

  const updateCategory = useCallback(
    (id: AdventureCategoryId) => {
      setActiveCategory(id);
    },
    [setActiveCategory],
  );

  useEffect(() => {
    updateCategory(defaultId);
    const frame = requestAnimationFrame(() => setPanelVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [defaultId, updateCategory]);

  useEffect(() => clearFadeTimeout, [clearFadeTimeout]);

  useEffect(() => {
    clearFadeTimeout();
    setRecommendationsVisible(true);
  }, [activeId, clearFadeTimeout]);

  const handleActivate = useCallback(
    (id: AdventureCategoryId) => {
      if (selectedId === id) {
        rotateCategory(id);
      } else {
        setSelectedId(id);
      }
      setActiveId(id);
      updateCategory(id);
    },
    [rotateCategory, selectedId, updateCategory],
  );

  const handleHover = useCallback(
    (id: AdventureCategoryId) => {
      setActiveId(id);
      updateCategory(id);
    },
    [updateCategory],
  );

  const handleLeave = useCallback(() => {
    const nextId = selectedId ?? defaultId;
    setActiveId(nextId);
    updateCategory(nextId);
  }, [defaultId, selectedId, updateCategory]);

  if (!preview || categories.length === 0) return null;

  const featured = previewDisplay.featured ?? previewDisplay.destinations[0] ?? null;

  return (
    <section
      className="relative z-20 w-full text-center"
      aria-label="בחירת סוג חוויה"
      data-hero-experiment="adventure-selector"
      style={{ pointerEvents: "auto" }}
    >
      <h2 className="mb-4 text-lg font-semibold tracking-tight text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.32)] sm:text-xl">
        מה בא לכם היום?
      </h2>

      <div
        className="relative mb-3 grid w-full grid-cols-3 gap-2 sm:gap-2.5 lg:mb-3.5 lg:grid-cols-6 lg:gap-3"
        onMouseLeave={handleLeave}
      >
        {categories.map((category) => {
          const isActive = activeId === category.id;
          const isSelected = selectedId === category.id;
          const isHighlighted = isActive || isSelected;
          const cardAccent = categoryCardAccent(category.id);

          return (
            <div key={category.id} className="relative pb-2">
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleActivate(category.id)}
                onMouseEnter={() => handleHover(category.id)}
                onFocus={() => handleHover(category.id)}
                className={[
                  "group inline-flex min-h-[4.25rem] w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border px-2 py-2.5 backdrop-blur-md transition-all duration-[350ms] ease-out sm:min-h-[4.6rem] sm:gap-2 sm:px-2.5 lg:min-h-[4.85rem]",
                  isHighlighted
                    ? "-translate-y-1 scale-[1.02] text-white"
                    : "border-white/22 bg-white/12 text-white shadow-[0_4px_18px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:scale-[1.015] hover:border-white/38 hover:bg-white/18 hover:shadow-[0_10px_32px_rgba(0,0,0,0.16)]",
                ].join(" ")}
                style={
                  isHighlighted
                    ? {
                        borderColor: cardAccent.activeBorder,
                        backgroundColor: cardAccent.activeBg,
                        boxShadow: cardAccent.activeShadow,
                        outline: `1px solid ${cardAccent.activeRing}`,
                        outlineOffset: "1px",
                      }
                    : undefined
                }
                onMouseOver={(event) => {
                  if (isHighlighted) return;
                  event.currentTarget.style.boxShadow = cardAccent.hoverShadow;
                }}
                onMouseOut={(event) => {
                  if (isHighlighted) return;
                  event.currentTarget.style.boxShadow = "";
                }}
              >
                <span className="text-[1.65rem] leading-none sm:text-[1.85rem]" aria-hidden="true">
                  {category.emoji}
                </span>
                <span className="text-xs font-medium leading-tight sm:text-sm">{category.label}</span>
              </button>
              {isActive ? <CategoryArrow borderColor={cardAccent.activeBorder} /> : null}
            </div>
          );
        })}
      </div>

      <div
        className={[
          "w-full overflow-hidden rounded-[1.15rem] border border-white/22 bg-white/14 shadow-[0_20px_52px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-all duration-500 ease-out",
          panelVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        ].join(" ")}
        aria-live="polite"
      >
        <div key={activeId} className="hero-panel-enter p-4 lg:p-6">
          <div
            className={[
              "flex flex-col items-center gap-4 transition-opacity duration-300 ease-out lg:grid lg:w-full lg:grid-cols-[minmax(0,2fr)_minmax(0,1.25fr)_minmax(0,1.75fr)] lg:items-stretch lg:gap-8",
              recommendationsVisible ? "opacity-100" : "opacity-0",
            ].join(" ")}
            dir="ltr"
          >
            <div className="w-full min-w-0 max-w-md lg:max-w-none" dir="rtl">
              <FeaturedImage destination={featured} emoji={preview.emoji} label={preview.label} />
            </div>

            <div
              className="flex min-w-0 flex-col justify-center px-1 text-center lg:border-x lg:border-white/14 lg:px-5 xl:px-6"
              dir="rtl"
            >
              <div
                className="relative mx-auto w-full max-w-[15.5rem] overflow-hidden rounded-2xl border border-white/[0.11] bg-[rgba(34,36,40,0.58)] px-4 py-3.5 shadow-[0_14px_40px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl transition-all duration-500 ease-out sm:max-w-[16.5rem] sm:px-5 sm:py-4 lg:mx-0"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-4 start-0 w-px bg-white/10"
                />
                <div className="flex items-center justify-center gap-2.5">
                  <span className="text-[1.35rem] leading-none sm:text-2xl" aria-hidden="true">
                    {preview.emoji}
                  </span>
                  <h3 className="text-[1.35rem] font-bold tracking-tight text-white sm:text-2xl">
                    {preview.label}
                  </h3>
                </div>
                <div
                  className="mx-auto my-2.5 h-px w-10 rounded-full bg-white/20 sm:my-3"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-white/78 sm:text-[0.9375rem]">
                  {preview.tagline}
                </p>
              </div>
            </div>

            <div className="flex w-full min-w-0 flex-col justify-center text-center" dir="rtl">
              <p className="mb-3 text-sm font-semibold text-white/92 lg:mb-4 lg:text-base">
                המלצות בשבילך:
              </p>
              {previewDisplay.destinations.length > 0 ? (
                <ul className="flex justify-center gap-4 sm:gap-5 lg:justify-evenly lg:gap-6">
                  {previewDisplay.destinations.map((destination) => (
                    <li key={destination.slug} className="min-w-0 max-w-[7rem] flex-1">
                      <RecommendationThumb destination={destination} emoji={preview.emoji} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-white/70 sm:text-sm">בקרוב — המלצות חדשות בקטגוריה זו</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
