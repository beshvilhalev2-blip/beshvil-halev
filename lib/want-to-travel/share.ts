import type { Trip } from "@/data/trips";

import { SITE_URL } from "@/lib/site-url";

export function buildWantToTravelWhatsAppUrl(trips: Trip[]): string {
  const lines = [
    "רשימת הטיולים שלי מבשביל הלב 🌿",
    "",
    ...trips.map((trip) => `• ${trip.title} (${trip.region})\n${SITE_URL}/trips/${trip.slug}`),
  ];

  return `https://wa.me/?text=${encodeURIComponent(lines.join("\n"))}`;
}
