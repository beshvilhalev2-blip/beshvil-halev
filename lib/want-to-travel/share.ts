import type { Trip } from "@/data/trips";

export function buildWantToTravelWhatsAppUrl(trips: Trip[]): string {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://beshvil-halev.vercel.app";

  const lines = [
    "רשימת הטיולים שלי מבשביל הלב 🌿",
    "",
    ...trips.map((trip) => `• ${trip.title} (${trip.region})\n${origin}/trips/${trip.slug}`),
  ];

  return `https://wa.me/?text=${encodeURIComponent(lines.join("\n"))}`;
}
