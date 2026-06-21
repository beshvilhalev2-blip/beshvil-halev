export const WANT_TO_TRAVEL_UPDATED_EVENT = "beshvil-halev-want-to-travel-updated";

export function notifyWantToTravelUpdated(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(WANT_TO_TRAVEL_UPDATED_EVENT));
}
