import Link from "next/link";
import type { Trip } from "@/data/trips";
import TripCard, { getRegionForTrip } from "@/app/components/trip-card";
import MatchReasonsList from "@/app/find-my-trip/components/match-reasons-list";
import type { MatchReason } from "@/lib/find-my-trip/types";

export default function MatchedTripCard({
  trip,
  reasons,
}: {
  trip: Trip;
  reasons: MatchReason[];
}) {
  const region = getRegionForTrip(trip);

  return (
    <article className="flex flex-col gap-4">
      <TripCard trip={trip} region={region} />
      <MatchReasonsList reasons={reasons} compact />
    </article>
  );
}
