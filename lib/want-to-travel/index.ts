export {
  clearAllWantToTravelTrips,
  getSavedWantToTravelTrips,
  isTripSaved,
  removeTripFromWantToTravel,
  saveTripToWantToTravel,
  WANT_TO_TRAVEL_STORAGE_KEY,
  WANT_TO_TRAVEL_STORAGE_VERSION,
  type WantToTravelStorageState,
} from "@/lib/want-to-travel/storage";
export { WANT_TO_TRAVEL_UPDATED_EVENT } from "@/lib/want-to-travel/events";
export { buildWantToTravelWhatsAppUrl } from "@/lib/want-to-travel/share";
export { useIsTripSaved, useSavedTripSlugs } from "@/lib/want-to-travel/use-saved-trips";
export {
  getWantToTravelDisplayTags,
  type WantToTravelDisplayTag,
} from "@/lib/want-to-travel/display-tags";
export {
  WANT_TO_TRAVEL_PAGE_METADATA_TITLE,
  WANT_TO_TRAVEL_PAGE_TITLE,
} from "@/lib/want-to-travel/labels";
