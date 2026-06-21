import Link from "next/link";
import type { Trip } from "@/data/trips";
import {
  isFilterTagActive,
  isFilterTagTrue,
} from "@/lib/trip-filter-tags";
import { getTripCardLayerStyle } from "@/lib/trip-media";

const HIDDEN_CATEGORY = "מקום שביקרנו";

function getMiniTripTag(trip: Trip): string | null {
  const tags = trip.filterTags;

  if (isFilterTagTrue(tags?.water) || isFilterTagActive(tags?.water)) return "מים";
  if (isFilterTagTrue(tags?.offroad) || isFilterTagActive(tags?.offroad)) return "4x4";
  if (isFilterTagTrue(tags?.viewpoint) || isFilterTagActive(tags?.viewpoint)) return "תצפית";
  if (isFilterTagTrue(tags?.camping)) return "קמפינג";

  if (!trip.category || trip.category === HIDDEN_CATEGORY) return null;

  if (trip.category.includes("מים") || trip.category.includes("מעיין")) return "מים";
  if (trip.category.includes("4x4") || trip.category.includes("שטח")) return "4x4";
  if (trip.category.includes("תצפ")) return "תצפית";

  return trip.category.length <= 10 ? trip.category : null;
}

export default function RegionTripMiniCard({ trip }: { trip: Trip }) {
  const tag = getMiniTripTag(trip);

  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="group flex min-w-0 flex-col transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-stone-200/70 bg-stone-200 shadow-sm dark:border-stone-700 dark:bg-stone-800">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.04]"
          style={getTripCardLayerStyle(trip)}
          role="img"
          aria-label={trip.heroImageLabel}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent" />
      </div>

      <div className="pt-2 text-right">
        {tag ? (
          <span className="mb-1 inline-block rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300">
            {tag}
          </span>
        ) : null}
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-stone-900 dark:text-stone-50">
          {trip.title}
        </h3>
      </div>
    </Link>
  );
}
