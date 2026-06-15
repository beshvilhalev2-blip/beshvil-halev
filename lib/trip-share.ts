export function buildTripShareMessage(title: string, tripUrl: string): string {
  return `מצאתי טיול ממש יפה באתר בשביל הלב 🌿🚙

${title}

${tripUrl}`;
}

export function buildWhatsAppShareUrl(title: string, tripUrl: string): string {
  const text = buildTripShareMessage(title, tripUrl);
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
