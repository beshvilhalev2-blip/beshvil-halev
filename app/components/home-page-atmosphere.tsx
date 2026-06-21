import type { ReactNode } from "react";

/** Warm off-white base — shared with hero bottom fade. */
export const HOME_ATMOSPHERE_BASE = "#FAF8F5";

type HomePageAtmosphereProps = {
  children: ReactNode;
};

/**
 * Extends the hero's soft nature atmosphere through the homepage.
 * Sage / sky washes are strongest just below the hero and fade toward the footer.
 */
export default function HomePageAtmosphere({ children }: HomePageAtmosphereProps) {
  return (
    <div
      className="relative -mt-4 sm:-mt-6 dark:bg-stone-950"
      style={{ backgroundColor: HOME_ATMOSPHERE_BASE }}
    >
      {/* Base vertical wash — hero mid-tones dissolving into warm white */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F0EDE4]/88 via-[#FAF8F5]/96 to-[#FBFAF8] dark:from-stone-950 dark:via-stone-950 dark:to-stone-900"
        aria-hidden="true"
      />

      {/* Sky breath — continues hero cool layer */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(58vh,34rem)] bg-[radial-gradient(ellipse_115%_72%_at_50%_-8%,rgba(220,238,248,0.32),transparent_76%)] dark:opacity-20"
        aria-hidden="true"
      />

      {/* Sage drift — upper page, fades naturally with height */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(72vh,42rem)] bg-[radial-gradient(ellipse_85%_55%_at_68%_22%,rgba(186,200,174,0.16),transparent_72%)] dark:opacity-15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-[6%] h-[min(62vh,36rem)] bg-[radial-gradient(ellipse_75%_48%_at_22%_28%,rgba(178,196,168,0.12),transparent_70%)] dark:opacity-12"
        aria-hidden="true"
      />

      {/* Soft earth warmth — mid-page, very light */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[28%] h-[45%] bg-[radial-gradient(ellipse_90%_50%_at_50%_42%,rgba(232,220,196,0.09),transparent_78%)] dark:opacity-10"
        aria-hidden="true"
      />

      {/* Gentle top bridge from hero seam */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#EDE8DF]/45 to-transparent sm:h-40"
        aria-hidden="true"
      />

      {/* Long fade — atmosphere quiets toward the footer */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[48%] bottom-0 bg-gradient-to-b from-transparent via-transparent to-[#FAF8F5]/85 dark:to-stone-950/90"
        aria-hidden="true"
      />

      <div className="relative">{children}</div>
    </div>
  );
}
