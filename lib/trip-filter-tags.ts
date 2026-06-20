export type TripFilterValue = boolean | "partial";

export type TripFilterTags = {
  water?: TripFilterValue;
  viewpoint?: TripFilterValue;
  camping?: TripFilterValue;
  offroad?: TripFilterValue;
  strollerAccessible?: TripFilterValue;
  free?: TripFilterValue;
};

export function isFilterTagActive(value: TripFilterValue | undefined): boolean {
  return value === true || value === "partial";
}

export function isFilterTagTrue(value: TripFilterValue | undefined): boolean {
  return value === true;
}

export function isStrollerAccessibleFilterMatch(value: TripFilterValue | undefined): boolean {
  return value === true || value === "partial";
}
