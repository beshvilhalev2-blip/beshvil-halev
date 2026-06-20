import Image from "next/image";
import Link from "next/link";
import HomeFieldMomentFeature from "./home-field-moment-feature";
import type { HomeFieldMoment } from "@/lib/home-field-moments";

/** Swap `src` and `alt` when the dedicated intro photo is ready. */
export const HOME_INTRO_PHOTO = {
  src: "/images/about/mommy-4x4-correct.png",
  alt: "מילאנה עם הילדים בטיול",
} as const;

type HomePersonalIntroProps = {
  placeCount: number;
  regionCount?: number;
  fieldMomentPool: HomeFieldMoment[];
};

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function IntroPhotoFrame() {
  return (
    <div className="relative size-[11.25rem] shrink-0 overflow-hidden rounded-2xl border border-stone-200/70 bg-stone-200 shadow-[0_8px_24px_rgba(79,94,72,0.1)] dark:border-stone-700 dark:bg-stone-800 sm:size-[12.5rem] lg:size-[13.75rem]">
      <Image
        src={HOME_INTRO_PHOTO.src}
        alt={HOME_INTRO_PHOTO.alt}
        fill
        className="object-cover object-center"
        sizes="(max-width: 1024px) 200px, 220px"
      />
    </div>
  );
}

/**
 * Editorial 3-column welcome: photo · story · field moment.
 */
export default function HomePersonalIntro({
  placeCount,
  regionCount = 5,
  fieldMomentPool,
}: HomePersonalIntroProps) {
  return (
    <section
      className="relative overflow-hidden px-4 py-5 sm:px-6 sm:py-6"
      aria-labelledby="home-personal-intro-heading"
    >
      <div className="relative mx-auto max-w-6xl">
        <div
          className="flex flex-col items-stretch gap-6 sm:gap-7 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center lg:gap-8 xl:gap-10"
          dir="rtl"
        >
          <div className="flex justify-center lg:justify-end">
            <IntroPhotoFrame />
          </div>

          <div className="mx-auto w-full max-w-[22rem] text-right sm:max-w-[24rem] lg:max-w-[26rem]">
            <p className="text-[0.6875rem] font-semibold tracking-wide text-[#4F5E48] dark:text-emerald-400/90">
              נעים להכיר
            </p>

            <h2
              id="home-personal-intro-heading"
              className="ms-auto mt-1 max-w-[18rem] text-base font-bold leading-snug tracking-tight text-stone-900 dark:text-stone-50 sm:max-w-[20rem] sm:text-[1.0625rem]"
            >
              אני מילאנה, אמא לשני ילדים ומטיילת בכל רחבי הארץ
            </h2>

            <p className="mt-2 text-[0.8125rem] leading-relaxed text-stone-600 dark:text-stone-400 sm:text-sm">
              הקמתי את בשביל הלב מתוך אהבה לטבע — כדי שמשפחות כמוכם ימצאו מקומות יפים
              ונגישים, בלי שעות של חיפוש ברשת.
            </p>

            <ul className="mt-3 flex flex-wrap items-center justify-end gap-x-2 gap-y-1 text-xs text-stone-500 dark:text-stone-400 sm:text-[0.8125rem]">
              <li>{placeCount}+ מקומות באתר</li>
              <li aria-hidden="true" className="text-stone-300 dark:text-stone-600">
                ·
              </li>
              <li>{regionCount} אזורים בארץ</li>
              <li aria-hidden="true" className="text-stone-300 dark:text-stone-600">
                ·
              </li>
              <li>טיולים למשפחות</li>
            </ul>

            <Link
              href="/about"
              className="group mt-3 inline-flex items-center gap-1 text-[0.8125rem] font-semibold text-[#4F5E48] underline-offset-4 transition-colors hover:text-[#3d4a38] hover:underline dark:text-emerald-400 dark:hover:text-emerald-300 sm:text-sm"
            >
              הסיפור שלי
              <ArrowIcon />
            </Link>
          </div>

          <div className="flex justify-center lg:justify-start">
            <HomeFieldMomentFeature moments={fieldMomentPool} />
          </div>
        </div>
      </div>
    </section>
  );
}
