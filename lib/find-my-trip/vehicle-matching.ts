import type { VehicleCategoryId } from "@/lib/vehicle-trip-match";
import { isTripAccessibleForVehicle } from "@/lib/trip-vehicle-access";
import type { TripRef } from "@/lib/find-my-trip/types";

export function tripMatchesVehicle(
  trip: TripRef,
  vehicle: VehicleCategoryId | null,
): boolean {
  if (!vehicle) {
    return true;
  }

  return isTripAccessibleForVehicle(
    trip as Parameters<typeof isTripAccessibleForVehicle>[0],
    vehicle,
  );
}

export function getVehicleMatchScore(
  trip: TripRef,
  vehicle: VehicleCategoryId | null,
): number {
  if (!vehicle) {
    return 0;
  }

  return tripMatchesVehicle(trip, vehicle) ? 5 : 0;
}

export function getVehicleReasonLabel(vehicle: VehicleCategoryId): string {
  const labels: Record<VehicleCategoryId, string> = {
    private_car: "מתאים לרכב פרטי רגיל",
    soft_suv: "מתאים ל-SUV רך",
    real_4x4: "מתאים ל-4x4",
    serious_jeep: "מתאים לג׳יפ גבוה",
  };

  return labels[vehicle];
}
