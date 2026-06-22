import {
  DEFAULT_TRIP_VEHICLE_ACCESS,
  type Trip,
  type TripVehicleAccess,
} from "@/data/trips";
import type { VehicleCategoryId } from "@/lib/vehicle-trip-match";

export { DEFAULT_TRIP_VEHICLE_ACCESS };

const ACCESS_LEVEL: Record<TripVehicleAccess, number> = {
  "private-car": 0,
  "soft-suv": 1,
  "real-4x4": 2,
  "hard-4x4": 3,
};

const VEHICLE_MAX_ACCESS: Record<VehicleCategoryId, TripVehicleAccess> = {
  private_car: "private-car",
  soft_suv: "soft-suv",
  real_4x4: "real-4x4",
  serious_jeep: "hard-4x4",
};

/** Resolve trip access from data only - never infer from slug, title, or category. */
export function getTripVehicleAccess(trip: Trip): TripVehicleAccess {
  return trip.vehicleAccess ?? DEFAULT_TRIP_VEHICLE_ACCESS;
}

export function normalizeTripVehicleAccess(trip: Trip): Trip {
  return {
    ...trip,
    vehicleAccess: trip.vehicleAccess ?? DEFAULT_TRIP_VEHICLE_ACCESS,
  };
}

export function getVehicleMaxAccess(
  categoryId: VehicleCategoryId,
): TripVehicleAccess {
  return VEHICLE_MAX_ACCESS[categoryId];
}

export function isTripAccessibleForVehicle(
  trip: Trip,
  categoryId: VehicleCategoryId,
): boolean {
  const tripLevel = ACCESS_LEVEL[getTripVehicleAccess(trip)];
  const vehicleLevel = ACCESS_LEVEL[getVehicleMaxAccess(categoryId)];
  return tripLevel <= vehicleLevel;
}

export function getTripsForVehicleCategory(
  allTrips: Trip[],
  categoryId: VehicleCategoryId,
): Trip[] {
  return allTrips.filter((trip) => isTripAccessibleForVehicle(trip, categoryId));
}
