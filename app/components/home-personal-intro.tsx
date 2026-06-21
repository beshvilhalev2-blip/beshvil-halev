import Image from "next/image";
import Link from "next/link";
import { socialLinks } from "@/lib/social-links";

export const HOME_INTRO_PHOTO = {
  src: "/images/home/welcom/welcom.jpeg",
  alt: "מילאנה עם הילדים בטיול",
} as const;

const introSocialLinks = [
  socialLinks.find((link) => link.id === "instagram")!,
  socialLinks.find((link) => link.id === "facebook")!,
];

function HeartAccent() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-3 text-rose-400/80 dark:text-rose-400/70"
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function InstagramOutlineIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookOutlineIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14.5 8.5h2.5V5.5h-2.5c-2.5 0-4 1.5-4 4.2V12H8v3h2.5v7.5H14V15h2.8l.7-3H14v-1.8c0-.9.2-1.7 1.5-1.7z" />
    </svg>
  );
}

function IntroSocialIcon({ id, className }: { id: "instagram" | "facebook"; className?: string }) {
  if (id === "instagram") return <InstagramOutlineIcon className={className} />;
  return <FacebookOutlineIcon className={className} />;
}

const socialIconLinkClassName: Record<"instagram" | "facebook", string> = {
  instagram:
    "bg-gradient-to-br from-[#f9ce34]/12 via-[#ee2a7b]/14 to-[#6228d7]/12 text-[#c13584] ring-1 ring-[#ee2a7b]/28 shadow-[0_2px_10px_rgba(238,42,123,0.12)] hover:from-[#f9ce34]/20 hover:via-[#ee2a7b]/22 hover:to-[#6228d7]/18 hover:ring-[#ee2a7b]/40 hover:shadow-[0_4px_16px_rgba(238,42,123,0.18)]",
  facebook:
    "bg-[#1877F2]/10 text-[#1877F2] ring-1 ring-[#1877F2]/30 shadow-[0_2px_10px_rgba(24,119,242,0.12)] hover:bg-[#1877F2]/16 hover:ring-[#1877F2]/45 hover:shadow-[0_4px_16px_rgba(24,119,242,0.18)]",
};

function IntroSocialBlock({ className }: { className?: string }) {
  return (
    <aside className={className} aria-label="רשתות חברתיות">
      <p className="text-sm font-bold tracking-wide text-stone-800 dark:text-stone-100">
        בואו לטייל איתנו
      </p>

      <p className="mt-1.5 max-w-[12.5rem] text-[0.6875rem] leading-relaxed text-stone-500 dark:text-stone-400">
        השראות, טיפים ורגעים מהשטח בכל שבוע
      </p>

      <div className="mt-3 flex items-center justify-center gap-2.5 sm:flex-col sm:gap-3">
        {introSocialLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={[
              "inline-flex size-11 items-center justify-center rounded-full transition-all duration-200 hover:scale-105",
              socialIconLinkClassName[link.id],
            ].join(" ")}
          >
            <IntroSocialIcon id={link.id} className="size-[1.375rem]" />
          </a>
        ))}
      </div>

      <p className="mt-3 text-[0.625rem] text-stone-400 dark:text-stone-500">
        קהילת משפחות בטבע
      </p>
    </aside>
  );
}

/**
 * Personal signature card between Hero and Region Discovery.
 */
export default function HomePersonalIntro() {
  return (
    <section
      className="relative px-4 py-8 sm:px-6 sm:py-10"
      aria-labelledby="home-personal-intro-heading"
    >
      <div className="mx-auto max-w-[62rem]">
        <div
          className="rounded-[1.75rem] border border-stone-200/70 bg-white/88 px-4 py-3.5 shadow-[0_10px_36px_rgba(79,94,72,0.08)] backdrop-blur-sm sm:rounded-[2rem] sm:px-5 sm:py-4"
          dir="rtl"
        >
          <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex shrink-0 flex-col items-center gap-1.5 self-center sm:self-auto">
              <div className="relative size-[5.625rem] overflow-hidden rounded-full bg-stone-200 sm:size-28">
                <Image
                  src={HOME_INTRO_PHOTO.src}
                  alt={HOME_INTRO_PHOTO.alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 90px, 112px"
                />
              </div>
              <div className="flex items-center gap-1">
                <p className="text-[0.625rem] font-semibold tracking-wide text-[#4F5E48] dark:text-emerald-400/90 sm:text-[0.6875rem]">
                  נעים להכיר
                </p>
                <HeartAccent />
              </div>
            </div>

            <div className="min-w-0 flex-1 text-right sm:px-1">
              <h2
                id="home-personal-intro-heading"
                className="text-sm font-bold leading-snug text-stone-900 dark:text-stone-50 sm:text-base"
              >
                אני מילאנה, אמא לשני ילדים ומטיילת בכל רחבי הארץ
              </h2>

              <p className="mt-1 text-xs leading-relaxed text-stone-600 dark:text-stone-400 sm:text-[0.8125rem]">
                הקמתי את בשביל הלב כדי לעזור למשפחות למצוא מקומות יפים, נגישים ופשוטים
                לטיול.
              </p>

              <Link
                href="/about"
                className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#4F5E48] underline-offset-2 transition-colors hover:text-[#3d4a38] hover:underline dark:text-emerald-400 dark:hover:text-emerald-300 sm:text-sm"
              >
                הסיפור שלי ←
              </Link>
            </div>

            <IntroSocialBlock className="border-t border-stone-200/60 pt-3 text-center sm:w-[9.5rem] sm:shrink-0 sm:border-t-0 sm:border-s sm:border-stone-200/55 sm:ps-5 sm:pe-1 sm:pt-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
