"use client";

import Link from "next/link";
import { useState } from "react";
import { getTripsByRegionSlug, regions } from "@/data/trips";

type MapRegion = {
  slug: string;
  href: string;
  title: string;
  path: string;
  labelX: number;
  labelY: number;
  gradientId: string;
  gradientFrom: string;
  gradientTo: string;
  shadow: string;
  borderHover: string;
};

const mapRegions: MapRegion[] = [
  {
    slug: "north",
    href: "/regions/north",
    title: "צפון",
    path: "M 86 10 C 118 6, 152 12, 170 34 C 176 52, 168 72, 148 82 C 128 88, 96 86, 72 76 C 56 66, 54 44, 62 26 C 70 16, 78 12, 86 10 Z",
    labelX: 118,
    labelY: 48,
    gradientId: "trailNorth",
    gradientFrom: "#34d399",
    gradientTo: "#047857",
    shadow: "rgba(5, 150, 105, 0.35)",
    borderHover: "hover:border-emerald-200 dark:hover:border-emerald-800",
  },
  {
    slug: "center",
    href: "/regions/center",
    title: "מרכז",
    path: "M 72 84 C 96 82, 132 84, 152 86 C 164 92, 168 108, 164 128 C 158 148, 138 156, 112 158 C 88 156, 72 144, 68 122 C 66 102, 68 88, 72 84 Z",
    labelX: 116,
    labelY: 122,
    gradientId: "trailCenter",
    gradientFrom: "#fbbf24",
    gradientTo: "#c2410c",
    shadow: "rgba(217, 119, 6, 0.35)",
    borderHover: "hover:border-amber-200 dark:hover:border-amber-800",
  },
  {
    slug: "jerusalem",
    href: "/regions/jerusalem",
    title: "ירושלים",
    path: "M 78 158 C 98 156, 138 158, 154 160 C 162 166, 164 178, 156 188 C 144 196, 118 198, 96 196 C 82 192, 76 180, 78 168 C 78 162, 78 158, 78 158 Z",
    labelX: 118,
    labelY: 178,
    gradientId: "trailJerusalem",
    gradientFrom: "#d6d3d1",
    gradientTo: "#57534e",
    shadow: "rgba(87, 83, 78, 0.35)",
    borderHover: "hover:border-stone-300 dark:hover:border-stone-600",
  },
  {
    slug: "south",
    href: "/regions/south",
    title: "דרום",
    path: "M 76 196 C 102 194, 142 198, 158 206 C 172 218, 174 248, 166 288 C 154 332, 128 358, 104 362 C 86 358, 74 330, 70 280 C 68 240, 70 210, 76 196 Z",
    labelX: 118,
    labelY: 278,
    gradientId: "trailSouth",
    gradientFrom: "#fb923c",
    gradientTo: "#9a3412",
    shadow: "rgba(234, 88, 12, 0.35)",
    borderHover: "hover:border-orange-200 dark:hover:border-orange-800",
  },
];

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

function formatTripCount(count: number): string {
  return count === 1 ? "מסלול אחד" : `${count} מסלולים`;
}

export default function HeartTrailMap() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const tripCounts = Object.fromEntries(
    regions.map((region) => [region.slug, getTripsByRegionSlug(region.slug).length]),
  ) as Record<string, number>;

  return (
    <section
      id="heart-trail-map"
      className="border-t border-stone-200/80 bg-gradient-to-b from-stone-50 to-white px-6 py-20 dark:border-stone-800 dark:from-stone-950 dark:to-stone-900"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-4 inline-block rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
            גלו את הארץ
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
            מפת שביל הלב
          </h2>
          <p className="mx-auto max-w-xl text-lg text-stone-600 dark:text-stone-400">
            בחרי אזור על המפה וגלי את הטיול הבא שלך
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Cards — right in RTL (first in DOM) */}
          <div className="order-2 flex flex-col gap-3 lg:order-1">
            {mapRegions.map((region) => {
              const count = tripCounts[region.slug] ?? 0;
              const meta = regions.find((item) => item.slug === region.slug);
              const isHovered = hoveredSlug === region.slug;

              return (
                <Link
                  key={region.slug}
                  href={region.href}
                  onMouseEnter={() => setHoveredSlug(region.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  className={`group rounded-2xl border bg-white p-4 shadow-sm transition-all duration-500 dark:bg-stone-900 sm:p-5 ${
                    isHovered
                      ? `-translate-y-0.5 border-stone-300 shadow-md dark:border-stone-600 ${region.borderHover}`
                      : "border-stone-200/80 dark:border-stone-800"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="mb-1 flex items-center gap-2.5">
                        <span
                          className="size-2.5 shrink-0 rounded-full"
                          style={{
                            background: `linear-gradient(135deg, ${region.gradientFrom}, ${region.gradientTo})`,
                          }}
                          aria-hidden="true"
                        />
                        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50">
                          {region.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                        {meta?.description}
                      </p>
                    </div>
                    <div className="shrink-0 text-left">
                      <p className="text-2xl font-bold tabular-nums text-stone-900 dark:text-stone-50">
                        {count}
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">
                        {formatTripCount(count)}
                      </p>
                    </div>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-stone-700 transition-colors group-hover:text-stone-900 dark:text-stone-300 dark:group-hover:text-white">
                    גלי מסלולים
                    <ArrowIcon />
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Map — left in RTL (second in DOM) */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-start">
            <div className="relative w-full max-w-[260px] sm:max-w-[280px]">
              <div
                className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-emerald-200/20 via-amber-100/10 to-orange-200/20 blur-xl dark:from-emerald-900/15 dark:to-orange-900/10"
                aria-hidden="true"
              />

              <div className="relative rounded-[1.75rem] border border-stone-200/80 bg-[#fffdf9] p-4 shadow-[0_18px_45px_-18px_rgba(28,25,23,0.18)] dark:border-stone-700 dark:bg-stone-950 dark:shadow-black/30 sm:p-5">
                <svg
                  viewBox="0 0 236 372"
                  className="h-auto w-full touch-manipulation"
                  role="img"
                  aria-label="מפת אזורים stylized — צפון, מרכז, ירושלים ודרום"
                >
                  <defs>
                    {mapRegions.map((region) => (
                      <linearGradient
                        key={region.gradientId}
                        id={region.gradientId}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor={region.gradientFrom} />
                        <stop offset="100%" stopColor={region.gradientTo} />
                      </linearGradient>
                    ))}
                    <linearGradient id="trailSheen" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.24" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {mapRegions.map((region) => {
                    const count = tripCounts[region.slug] ?? 0;
                    const isHovered = hoveredSlug === region.slug;
                    const isDimmed = hoveredSlug !== null && !isHovered;

                    return (
                      <a
                        key={region.slug}
                        href={region.href}
                        className="outline-none"
                        aria-label={`${region.title} — ${formatTripCount(count)}`}
                        onMouseEnter={() => setHoveredSlug(region.slug)}
                        onMouseLeave={() => setHoveredSlug(null)}
                        onFocus={() => setHoveredSlug(region.slug)}
                        onBlur={() => setHoveredSlug(null)}
                      >
                        <g
                          style={{
                            opacity: isDimmed ? 0.5 : 1,
                            transform: isHovered
                              ? "translateY(-2px) scale(1.015)"
                              : "translateY(0) scale(1)",
                            transformOrigin: `${region.labelX}px ${region.labelY}px`,
                            transition: "opacity 0.4s ease, transform 0.4s ease",
                          }}
                        >
                          {isHovered && (
                            <path
                              d={region.path}
                              fill="none"
                              stroke={region.shadow}
                              strokeWidth="5"
                              strokeLinejoin="round"
                              opacity="0.8"
                            />
                          )}
                          <path
                            d={region.path}
                            fill={`url(#${region.gradientId})`}
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                            strokeOpacity="0.35"
                          />
                          <path
                            d={region.path}
                            fill="url(#trailSheen)"
                            className="pointer-events-none"
                          />
                          <text
                            x={region.labelX}
                            y={region.labelY - 6}
                            textAnchor="middle"
                            className="pointer-events-none fill-white text-[13px] font-bold"
                            style={{ fontFamily: "inherit" }}
                          >
                            {region.title}
                          </text>
                          <text
                            x={region.labelX}
                            y={region.labelY + 10}
                            textAnchor="middle"
                            className="pointer-events-none fill-white/90 text-[10px] font-medium"
                            style={{ fontFamily: "inherit" }}
                          >
                            {formatTripCount(count)}
                          </text>
                        </g>
                      </a>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
