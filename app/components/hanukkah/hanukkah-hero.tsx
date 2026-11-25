import Image from "next/image";
import { HANUKKAH_SECTIONS } from "@/lib/hanukkah-2026/content";

export const HANUKKAH_HERO_IMAGE = "/images/hanukkah-2026/hero.jpg";

export default function HanukkahHero() {
  return (
    <>
      <section
        aria-labelledby="hanukkah-title"
        className="relative isolate min-h-[88svh] overflow-hidden bg-stone-900 sm:min-h-[80vh] lg:min-h-[86vh]"
      >
        <Image
          src={HANUKKAH_HERO_IMAGE}
          alt="חנוכייה עם כל הנרות דולקים על סלע מול גבעות עם עצי זית בשקיעה"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[27%_55%] sm:object-[35%_55%] lg:object-center"
        />
        {/* הצללה מקומית עדינה בצד הכותרת בלבד, כדי לא להחשיך את החנוכייה */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[58%] bg-gradient-to-b from-stone-950/70 via-stone-950/35 to-transparent sm:hidden"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10 hidden bg-[radial-gradient(ellipse_48%_42%_at_50%_24%,rgba(20,18,16,0.55),transparent_72%)] sm:block"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-[#faf8f5] to-transparent dark:from-stone-950"
          aria-hidden="true"
        />

        <div className="mx-auto flex min-h-[88svh] max-w-6xl flex-col items-center px-5 pb-16 pt-24 sm:min-h-[80vh] sm:px-6 sm:pt-28 lg:min-h-[86vh] lg:pt-32">
          <div className="flex max-w-3xl flex-col items-center text-center">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-stone-950/25 px-3 py-1 text-xs font-semibold text-amber-100 backdrop-blur-sm sm:text-sm">
              <span
                className="size-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_3px_rgba(252,211,77,0.6)]"
                aria-hidden="true"
              />
              מדריך החג
            </p>
            <h1
              id="hanukkah-title"
              className="text-[3rem] font-extrabold leading-[1.02] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] min-[400px]:text-[3.4rem] sm:text-7xl lg:text-[5.5rem]"
            >
              חנוכה 2026
              <span className="block text-amber-200">בשביל הלב</span>
            </h1>
            <p className="mt-2 text-base font-medium text-white/90 drop-shadow-[0_1px_12px_rgba(0,0,0,0.6)] sm:mt-3 sm:text-xl">
              מערב שישי 4.12 עד מוצאי שבת 12.12.2026
            </p>
          </div>
        </div>
      </section>

      <section
        aria-label="פתיחה"
        className="relative px-4 pb-4 sm:px-6"
      >
        <div className="relative mx-auto -mt-10 max-w-4xl rounded-3xl border border-[#e7dcc6] bg-[#fffaf1] p-6 shadow-[0_24px_60px_-34px_rgba(31,59,45,0.45)] dark:border-stone-700 dark:bg-stone-900 sm:-mt-14 sm:p-10">
          <div className="space-y-4 text-lg leading-relaxed text-stone-700 dark:text-stone-300 sm:text-xl">
            <p>
              חנוכה זאת הזדמנות נהדרת לצאת לטייל בארץ היפה שלנו, להרגיש את
              הטבע בראש ובלב וליהנות מזמן איכות עם האנשים האהובים עלינו.
            </p>
            <p className="font-semibold text-[#1f3b2d] dark:text-stone-100">
              ריכזתי כאן את ההמלצות האישיות שלי! מכל הלב שלי בשביל הלב שלכם.
            </p>
          </div>

          <div className="mt-7 flex justify-center">
            <a
              href="#activities"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1f3b2d] px-7 py-3.5 text-base font-semibold text-[#fdf6e7] shadow-lg shadow-[#1f3b2d]/20 transition-all hover:-translate-y-0.5 hover:bg-[#2a4d3b] dark:bg-emerald-200 dark:text-stone-900"
            >
              לפעילויות חנוכה
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4"
                aria-hidden="true"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </a>
          </div>

          <nav
            aria-label="קיצורי דרך במדריך"
            className="mt-8 border-t border-[#e7dcc6] pt-6 dark:border-stone-700"
          >
            <p className="mb-3 text-sm font-semibold text-stone-500 dark:text-stone-400">
              קפיצה מהירה
            </p>
            <ul className="grid grid-cols-3 gap-2 sm:-mx-1 sm:flex sm:snap-x sm:overflow-x-auto sm:px-1 sm:pb-2 sm:[scrollbar-width:thin]">
              {HANUKKAH_SECTIONS.map((section) => (
                <li key={section.id} className="flex sm:shrink-0 sm:snap-start">
                  <a
                    href={`#${section.id}`}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-1 rounded-2xl border border-[#1f3b2d]/15 bg-white/70 px-1.5 py-1.5 text-center text-[0.8rem] font-medium leading-tight text-balance sm:min-h-10 sm:w-auto sm:whitespace-nowrap sm:rounded-full sm:px-4 sm:py-2 sm:text-sm text-[#1f3b2d] transition-colors hover:border-amber-400 hover:bg-amber-50 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-700"
                  >
                    <span
                      className="inline-flex size-5 shrink-0 items-center justify-center text-[1.05rem] leading-none"
                      aria-hidden="true"
                    >
                      {section.icon}
                    </span>
                    <span>{section.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
