export default function OffroadJourneyBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Hero-to-content bridge */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-stone-950/25 via-stone-900/5 to-transparent sm:h-64" />

      {/* Warm journey base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ebe6dc] via-[#f3efe8] to-[#ebe6dc] dark:from-stone-950 dark:via-stone-900 dark:to-stone-950" />

      {/* Soft emerald atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-5%,rgba(16,185,129,0.09),transparent_55%)]" />

      {/* Amber warmth mid-page (cooking / mistakes zone) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_55%,rgba(245,158,11,0.06),transparent_60%)]" />

      {/* Subtle topo texture */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.035] dark:opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="offroad-journey-topo"
            width="140"
            height="140"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 70 Q35 50 70 70 T140 70 M0 105 Q35 85 70 105 T140 105 M0 35 Q35 15 70 35 T140 35"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              className="text-stone-700"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#offroad-journey-topo)" />
      </svg>
    </div>
  );
}
