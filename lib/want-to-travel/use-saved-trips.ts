"use client";

import { useCallback, useEffect, useState } from "react";
import { getSavedWantToTravelTrips } from "@/lib/want-to-travel/storage";
import { WANT_TO_TRAVEL_UPDATED_EVENT } from "@/lib/want-to-travel/events";

export function useSavedTripSlugs(): string[] {
  const [slugs, setSlugs] = useState<string[]>([]);

  const refresh = useCallback(() => {
    setSlugs(getSavedWantToTravelTrips());
  }, []);

  useEffect(() => {
    refresh();

    window.addEventListener(WANT_TO_TRAVEL_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(WANT_TO_TRAVEL_UPDATED_EVENT, refresh);
  }, [refresh]);

  return slugs;
}

export function useIsTripSaved(tripSlug: string): boolean {
  const slugs = useSavedTripSlugs();
  return slugs.includes(tripSlug);
}
