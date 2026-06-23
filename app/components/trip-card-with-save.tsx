"use client";

import TripCard from "@/app/components/trip-card";
import WantToTravelSaveButton from "@/app/components/want-to-travel-save-button";
import type { Trip } from "@/data/trips";

type TripCardWithSaveProps = {
  trip: Trip;
};

export default function TripCardWithSave({ trip }: TripCardWithSaveProps) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-3 z-20">
        <WantToTravelSaveButton tripSlug={trip.slug} variant="card" />
      </div>
      <TripCard trip={trip} />
    </div>
  );
}
