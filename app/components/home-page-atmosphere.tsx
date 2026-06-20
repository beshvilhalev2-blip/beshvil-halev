import type { ReactNode } from "react";

/** Shared warm off-white — matches hero bottom fade. */
export const HOME_ATMOSPHERE_BASE = "#FAF8F5";

type HomePageAtmosphereProps = {
  children: ReactNode;
};

/**
 * Soft site-wide atmosphere for homepage sections below the hero.
 * Subtle radial washes only — no images or heavy textures.
 */
export default function HomePageAtmosphere({ children }: HomePageAtmosphereProps) {
  return (
    <div
      className="relative -mt-4 bg-[#FAF8F5] sm:-mt-6 dark:bg-stone-950"
      style={{ backgroundColor: HOME_ATMOSPHERE_BASE }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F0EBE3]/95 via-[#FAF8F5] to-[#F4EFE8] dark:from-stone-950 dark:via-stone-950 dark:to-stone-900"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(42vh,26rem)] bg-[radial-gradient(ellipse_110%_80%_at_50%_0%,rgba(220,238,248,0.28),transparent_74%)] dark:opacity-25"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F0EBE3]/80 to-transparent sm:h-32"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-[18%] h-[50%] bg-[radial-gradient(ellipse_65%_45%_at_85%_35%,rgba(186,200,174,0.1),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-[radial-gradient(ellipse_85%_55%_at_15%_100%,rgba(232,212,176,0.12),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
