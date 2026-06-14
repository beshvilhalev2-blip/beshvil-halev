import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "אודות | בשביל הלב",
  description:
    "הסיפור מאחורי שביל הלב — בלוג טיולים משפחתי על אהבה לטבע, ילדים ומסלולים בישראל",
};

const heroBackground = `
  linear-gradient(
    160deg,
    rgba(120, 53, 15, 0.75) 0%,
    rgba(180, 83, 9, 0.55) 35%,
    rgba(6, 78, 59, 0.5) 70%,
    rgba(28, 25, 23, 0.8) 100%
  ),
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='hills' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23fde68a'/%3E%3Cstop offset='45%25' stop-color='%23d97706'/%3E%3Cstop offset='100%25' stop-color='%23145332'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23hills)' width='1920' height='1080'/%3E%3Cpath fill='%23166534' opacity='0.35' d='M0 620 Q480 500 960 580 T1920 540 L1920 1080 L0 1080 Z'/%3E%3C/svg%3E")
`;

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-6 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
      {children}
    </h2>
  );
}

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: heroBackground }}
          role="img"
          aria-label="תמונת רקע — נוף טבעי חם"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/35 to-stone-900/10" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-16 pt-12 sm:pb-20">
          <p className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            הסיפור שלנו
          </p>
          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
            הסיפור מאחורי שביל הלב
          </h1>
          <p className="max-w-2xl text-xl leading-relaxed text-white/90 sm:text-2xl">
            אמא, שני ילדים והמון אהבה לטבע.
          </p>
        </div>
      </section>

      <article className="bg-stone-50 dark:bg-stone-950">
        {/* My Story */}
        <section className="border-b border-stone-200/80 px-6 py-16 dark:border-stone-800 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>הסיפור שלי</SectionHeading>
            <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-100 shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <Image
                src="/images/about/mommy-4x4.jpg"
                alt="אמא מטיילת 4x4 — אמא עם שני ילדים ליד רכב טיולים"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <div className="space-y-5 text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
              <p>
                שלום, אני יוצרת התוכן של &quot;שביל הלב&quot; — אמא לשניים, שאוהבת לצאת
                מהבית, לגלות פינות חדשות ולחלוק את הרגעים הקטנים שעושים יום טיול
                למשהו גדול.
              </p>
              <p>
                [טקסט אישי — יוחלף בתוכן אמיתי] כמו הרבה הורים, חיפשתי מקומות
                שבהם הילדים יכולים להרגיש חופשיים, לשחק, לצחוק ולהתחבר לטבע — בלי
                לנסוע שעות ובלי להרגיש מוצפת.
              </p>
              <p>
                [טקסט אישי — יוחלף בתוכן אמיתי] כל טיול, כל מעיין וכל שביל הפכו
                לזיכרון משפחתי, ולפעמים גם לשיעור קטן על סבלנות, על פשטות ועל
                הנוכחות של הרגע.
              </p>
            </div>
          </div>
        </section>

        {/* Why I Started */}
        <section className="border-b border-stone-200/80 bg-white px-6 py-16 dark:border-stone-800 dark:bg-stone-900 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>למה הקמתי את הבלוג</SectionHeading>
            <div className="space-y-5 text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
              <p>
                &quot;שביל הלב&quot; נולד מתוך רצון פשוט: לעזור למשפחות בישראל
                למצוא מקומות טובים, נגישים ומלאי אווירה — מסלולים שבאמת עובדים
                עם ילדים.
              </p>
              <p>
                [טקסט משימה — יוחלף בתוכן אמיתי] רציתי מקום אחד שמרכז המלצות
                אמיתיות מהשטח: איפה כדאי לעצור, מה לקחת, כמה זמן להיערך, ואיך
                להפוך יום בטבע לחוויה רגועה ומשמחת.
              </p>
              <p>
                [טקסט משימה — יוחלף בתוכן אמיתי] המטרה שלי היא לחבר בין משפחות
                לטבע — בצפון, במרכז, בירושלים ובדרום — ולהראות שאפשר למצוא קסם
                גם קרוב לבית.
              </p>
            </div>
          </div>
        </section>

        {/* Our Adventures */}
        <section className="border-b border-stone-200/80 px-6 py-16 dark:border-stone-800 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>ההרפתקאות שלנו</SectionHeading>
            <div className="space-y-5 text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
              <p>
                [טקסט הרפתקאות — יוחלף בתוכן אמיתי] יחד עם הילדים, אנחנו
                מטיילים ברחבי הארץ — ממעיינות בגליל ועד חופים בדרום, מיערות
                ירוקים ועד מדבר מרהיב.
              </p>
              <p>
                [טקסט הרפתקאות — יוחלף בתוכן אמיתי] לא תמיד הכל מושלם: לפעמים
                יש עייפות, לפעמים גשם, ולפעמים פיקניק שנגמר מהר מדי. אבל תמיד
                יש רגע אחד — קפיצה למים, צחוק, נוף — שגורם לנו לחזור שוב.
              </p>
              <p>
                [טקסט הרפתקאות — יוחלף בתוכן אמיתי] כאן בבלוג אני משתפת את
                המסלולים שבדקנו, את הטיפים שלמדנו בדרך, ואת הסיפורים הקטנים
                שהפכו את הטיולים שלנו לזיכרונות שמחים.
              </p>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {[
                "מעיינות ומסלולי מים",
                "חופים ופיקניקים",
                "יערות ושמורות טבע",
                "טיולים משפחתיים בכל הארץ",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-stone-200/80 bg-white px-4 py-3 text-sm font-medium text-stone-700 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing */}
        <section className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading>בואי לגלות איתנו</SectionHeading>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
              [טקסט סיום — יוחלף בתוכן אמיתי] אשמח שתצטרפי אלינו למסע — גלי
              מסלולים, אזורים והמלצות שבדקנו בעצמנו, ובחרי את הטיול הבא של
              המשפחה שלך.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/recommendations"
                className="group inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
              >
                לכל המסלולים
                <ArrowIcon />
              </Link>
              <Link
                href="/#regions"
                className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-6 py-3.5 text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
              >
                גלי לפי אזור
              </Link>
            </div>
          </div>
        </section>
      </article>

      <footer className="border-t border-stone-200 bg-white px-6 py-10 dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <Link
            href="/"
            className="text-lg font-semibold text-stone-800 transition-colors hover:text-stone-600 dark:text-stone-100 dark:hover:text-stone-300"
          >
            בשביל הלב
          </Link>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            © {new Date().getFullYear()} · כל הזכויות שמורות
          </p>
        </div>
      </footer>
    </div>
  );
}
