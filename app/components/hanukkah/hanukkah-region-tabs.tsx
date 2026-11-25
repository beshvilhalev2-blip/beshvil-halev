"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ResponsiveTable, WazeButton } from "./hanukkah-ui";

export type ResolvedGoOutPlace = {
  place: string;
  description: string;
  image?: string;
  imagePosition?: string;
  tripHref?: string;
  wazeUrl?: string;
  wazeLabel?: string;
};

export type ResolvedGoOutRegion = {
  id: string;
  label: string;
  places: ResolvedGoOutPlace[];
};

export default function HanukkahRegionTabs({
  regions,
}: {
  regions: ResolvedGoOutRegion[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  function focusTab(index: number) {
    const next = (index + regions.length) % regions.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    // RTL: חץ שמאלה מתקדם ללשונית הבאה
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusTab(index + 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focusTab(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTab(regions.length - 1);
    }
  }

  const active = regions[activeIndex];

  return (
    <div>
      <div
        role="tablist"
        aria-label="אזורים בארץ"
        className="mb-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
      >
        {regions.map((region, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={region.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${region.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`min-h-11 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 sm:text-base ${
                selected
                  ? "border-[#1f3b2d] bg-[#1f3b2d] text-[#fdf6e7] shadow-md shadow-[#1f3b2d]/20 dark:border-emerald-200 dark:bg-emerald-200 dark:text-stone-900"
                  : "border-[#1f3b2d]/20 bg-white/70 text-[#1f3b2d] hover:border-amber-400 hover:bg-amber-50 dark:border-stone-600 dark:bg-stone-800/60 dark:text-stone-200"
              }`}
            >
              {region.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active.id}`}
        tabIndex={0}
        className="focus-visible:outline-none"
      >
        <ResponsiveTable
          caption={`מקומות מומלצים - ${active.label}`}
          columns={[
            { header: "מקום", className: "w-[30%]" },
            { header: "תיאור קצר" },
            { header: "Waze", className: "w-[28%]" },
          ]}
          rows={active.places.map((place) => {
            const name = place.tripHref ? (
              <Link
                href={place.tripHref}
                className="font-semibold text-[#1f3b2d] underline decoration-amber-400/60 decoration-2 underline-offset-4 hover:text-amber-800 dark:text-stone-100"
              >
                {place.place}
              </Link>
            ) : (
              <span className="font-semibold text-[#1f3b2d] dark:text-stone-100">
                {place.place}
              </span>
            );
            const thumb = (size: string) =>
              place.image ? (
                <span className={`relative block shrink-0 overflow-hidden rounded-xl bg-stone-200 ring-1 ring-black/5 dark:bg-stone-800 ${size}`}>
                  <Image
                    src={place.image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                    style={place.imagePosition ? { objectPosition: place.imagePosition } : undefined}
                  />
                </span>
              ) : (
                <span
                  className={`flex shrink-0 items-center justify-center rounded-xl bg-[#1f3b2d]/[0.07] text-[#1f3b2d]/50 dark:bg-stone-800 dark:text-stone-500 ${size}`}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                    <path d="M3 18l5-7 4 5 3-4 6 6" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="16" cy="7" r="2" />
                  </svg>
                </span>
              );
            const thumbLinked = (size: string) =>
              place.tripHref ? (
                <Link href={place.tripHref} tabIndex={-1} aria-hidden="true" className="block shrink-0">
                  {thumb(size)}
                </Link>
              ) : (
                thumb(size)
              );
            const waze = (
              <WazeButton
                url={place.wazeUrl}
                placeName={place.place}
                label={place.wazeLabel}
              />
            );
            return {
              key: place.place,
              cells: [
                <span key="n" className="flex items-center gap-3">
                  {thumbLinked("size-16")}
                  {name}
                </span>,
                place.description,
                waze,
              ],
              mobileTitle: name,
              mobileThumb: thumbLinked("size-14"),
              mobileSkip: [0],
              mobileActionIndex: 2,
            };
          })}
        />
      </div>
    </div>
  );
}
