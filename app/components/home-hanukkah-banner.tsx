import Image from "next/image";
import Link from "next/link";
import { HANUKKAH_HERO_IMAGE } from "@/app/components/hanukkah/hanukkah-hero";

/**
 * Festive home-page banner linking to the Hanukkah 2026 guide.
 * The whole card is one internal link; the "button" is a styled span inside it.
 */
export default function HomeHanukkahBanner() {
  return (
    <Link
      href="/hanukkah-2026"
      className="group relative isolate mx-auto mb-4 block w-full max-w-4xl overflow-hidden rounded-2xl border border-amber-200/40 bg-[#1f3b2d] text-right shadow-[0_18px_44px_-22px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-200/70 hover:shadow-[0_22px_52px_-22px_rgba(0,0,0,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:mb-5 sm:rounded-3xl"
    >
      <Image
        src={HANUKKAH_HERO_IMAGE}
        alt=""
        fill
        sizes="(min-width: 640px) 896px, 100vw"
        className="-z-20 object-cover object-[68%_62%] transition-transform duration-500 group-hover:scale-[1.03] sm:object-[50%_72%]"
      />

      {/* Mobile: shade the top for the title and the bottom-right for the button, keep the flames clear. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#132a1f]/85 via-[#132a1f]/25 via-45% to-transparent sm:hidden"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_38%_at_100%_100%,rgba(19,42,31,0.75),transparent_75%)] sm:hidden"
        aria-hidden="true"
      />
      {/* Desktop: shade the right side behind the text, menorah stays bright on the left. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden bg-gradient-to-l from-[#132a1f]/90 via-[#132a1f]/55 via-45% to-transparent to-75% sm:block"
        aria-hidden="true"
      />

      <div className="flex min-h-[18.5rem] flex-col justify-between p-5 sm:min-h-[11.5rem] sm:justify-center sm:gap-4 sm:px-8 sm:py-6">
        <div className="max-w-[17rem] sm:max-w-md">
          <p className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-amber-200 sm:text-sm">
            <span
              className="size-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_3px_rgba(252,211,77,0.6)]"
              aria-hidden="true"
            />
            מדריך החג
          </p>
          <p className="text-[1.375rem] font-extrabold leading-tight text-[#fdf6e7] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] sm:text-[1.75rem]">
            כל ההמלצות בשביל הלב לחנוכה 2026/7
          </p>
        </div>

        <span className="inline-flex min-h-11 w-fit items-center justify-center self-start rounded-xl bg-amber-300 px-5 py-2.5 text-base font-bold text-[#1f3b2d] shadow-lg shadow-black/25 transition-colors duration-300 group-hover:bg-amber-200">
          לכל ההמלצות ←
        </span>
      </div>
    </Link>
  );
}
