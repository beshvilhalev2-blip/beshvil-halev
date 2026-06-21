"use client";

import TripCard from "@/app/components/trip-card";
import WantToTravelSaveButton from "@/app/components/want-to-travel-save-button";
import type { Trip } from "@/data/trips";
import { getWantToTravelDisplayTags } from "@/lib/want-to-travel";

type TripCardWithSaveProps = {
  trip: Trip;
};

export default function TripCardWithSave({ trip }: TripCardWithSaveProps) {
  const tags = getWantToTravelDisplayTags(trip);

  return (
    <div className="relative">
      <div className="absolute left-3 top-3 z-20">
        <WantToTravelSaveButton tripSlug={trip.slug} variant="card" />
      </div>
      <TripCard trip={trip} />
      <div className="mt-2 flex flex-wrap items-center gap-2 px-1">
        <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300">
          {trip.region}
        </span>
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
