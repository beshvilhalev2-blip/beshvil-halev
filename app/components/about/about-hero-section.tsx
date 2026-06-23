"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AboutHeroLivingCollage from "./about-hero-living-collage";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

export default function AboutHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 pb-6 pt-28 sm:px-6 sm:pb-7 sm:pt-32 lg:pb-9 lg:pt-36"
      aria-labelledby="about-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_80%_0%,rgba(186,200,174,0.18),transparent_70%)] dark:opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_10%_100%,rgba(232,220,196,0.22),transparent_72%)] dark:opacity-30"
        aria-hidden="true"
      />

      <div
        className={`about-hero-reveal relative z-10 mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-11 xl:gap-14 ${visible ? "is-visible" : ""}`}
        dir="rtl"
      >
        {/* Text — right column in RTL */}
        <div className="about-hero-reveal-item text-right lg:py-4">
          <h1
            id="about-hero-heading"
            className="text-[2rem] font-bold leading-[1.12] tracking-tight text-stone-900 dark:text-stone-50 sm:text-[2.5rem] lg:text-[2.75rem]"
          >
            נעים מאוד, אני מילאנה
          </h1>

          <div className="mt-5 max-w-xl space-y-3 text-[1.0625rem] leading-[1.72] text-stone-600 dark:text-stone-400 sm:text-lg">
            <p>
              אמא לשני בנים שאוהבת להעמיס את הרכב, לבחור נקודה על המפה ולצאת
              להרפתקה חדשה.
            </p>
            <p>
              בשביל הלב נולד מתוך הרצון להראות שגם משפחות רגילות יכולות לטייל,
              ליהנות מהטבע וליצור זיכרונות מדהימים - בלי ציוד יקר, בלי ניסיון
              קודם ובלי לתכנן חודשים מראש.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              href="#my-story"
              className="group inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(28,25,23,0.35)] transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              הסיפור שלי
              <ArrowIcon />
            </Link>
            <Link
              href="/recommendations"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-200/90 bg-white/80 px-6 py-3.5 text-sm font-semibold text-stone-800 shadow-sm backdrop-blur-sm transition-colors hover:border-stone-300 hover:bg-white dark:border-stone-700 dark:bg-stone-900/70 dark:text-stone-100 dark:hover:bg-stone-900"
            >
              טיולים מומלצים
            </Link>
          </div>
        </div>

        {/* Living collage — left column in RTL */}
        <div className="about-hero-reveal-item about-hero-reveal-item-delayed mx-auto w-full max-w-md lg:max-w-none">
          <AboutHeroLivingCollage />
        </div>
      </div>
    </section>
  );
}
