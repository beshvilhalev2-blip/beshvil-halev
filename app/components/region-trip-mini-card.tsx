import type { Trip } from "@/data/trips";
import TripCard from "@/app/components/trip-card";

/** Compact density wrapper - same design system as TripCard. */
export default function RegionTripMiniCard({ trip }: { trip: Trip }) {
  return <TripCard trip={trip} density="compact" />;
}
