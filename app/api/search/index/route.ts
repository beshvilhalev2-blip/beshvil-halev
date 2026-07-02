import { NextResponse } from "next/server";
import { getSiteVisibleTrips } from "@/data/trips";
import { buildTripSearchEntries } from "@/lib/search-trips";

let cachedEntries: ReturnType<typeof buildTripSearchEntries> | null = null;

export async function GET() {
  if (!cachedEntries) {
    cachedEntries = buildTripSearchEntries(getSiteVisibleTrips());
  }

  return NextResponse.json(cachedEntries, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
