import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import { SocialLinkCards } from "@/app/components/social-links";
import ContactForm from "@/app/contact/contact-form";

export const metadata: Metadata = {
  title: "צור קשר | בשביל הלב",
  description:
    "צרו קשר עם שביל הלב — המלצות לטיול, שאלות ורעיונות לשיתוף פעולה",
};

const heroBackground = `
  linear-gradient(
    160deg,
    rgba(6, 78, 59, 0.75) 0%,
    rgba(14, 116, 144, 0.55) 40%,
    rgba(120, 53, 15, 0.45) 75%,
    rgba(28, 25, 23, 0.85) 100%
  ),
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='sky' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230d9488'/%3E%3Cstop offset='50%25' stop-color='%230284c7'/%3E%3Cstop offset='100%25' stop-color='%23145332'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23sky)' width='1920' height='1080'/%3E%3Cpath fill='%23059669' opacity='0.3' d='M0 680 Q640 560 1280 640 T1920 600 L1920 1080 L0 1080 Z'/%3E%3C/svg%3E")
`;

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-6 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
      {children}
    </h2>
  );
}

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden pt-24 sm:min-h-[60vh]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: heroBackground }}
          role="img"
          aria-label="תמונת רקע — נוף טבעי"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/35 to-stone-900/10" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-14 pt-12 sm:pb-16">
          <p className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            נשמח לשמוע ממך
          </p>
          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
            צור קשר
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl md:text-2xl">
            יש לך המלצה לטיול, שאלה או רעיון לשיתוף פעולה? אשמח לשמוע ממך.
          </p>
        </div>
      </section>

      <article className="relative">
        {/* Contact Form */}
        <section className="border-b border-stone-200/80 px-6 py-16 dark:border-stone-800 sm:py-20">
          <div className="mx-auto max-w-xl">
            <SectionHeading>שלחי הודעה</SectionHeading>
            <p className="mb-8 text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
              מלאי את הפרטים ונחזור אליך בהקדם. כל פנייה חשובה לנו.
            </p>
            <ContactForm />
          </div>
        </section>

        {/* Social Links */}
        <section className="border-b border-stone-200/80 bg-white/88 px-6 py-16 backdrop-blur-[2px] dark:border-stone-800 dark:bg-stone-900/88 sm:py-20">
          <div className="mx-auto max-w-xl text-center">
            <SectionHeading>עקבו אחרינו</SectionHeading>
            <p className="mb-10 text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
              הצטרפו אלינו ברשתות החברתיות לעדכונים, תמונות מהשטח והמלצות חדשות.
            </p>
            <SocialLinkCards />
          </div>
        </section>

        {/* Closing */}
        <section className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading>נשמח להתחבר</SectionHeading>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
              בין אם יש לך מסלול מומלץ, טיפ מהשטח או סתם רצון לומר שלום — כאן
              בשביל הלב, אנחנו תמיד שמחים לשמוע, ללמוד ולשתף.
            </p>
            <Link
              href="/recommendations"
              className="group inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              גלי מסלולים מומלצים
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
            </Link>
          </div>
        </section>
      </article>

      <SiteFooter />
    </div>
  );
}
