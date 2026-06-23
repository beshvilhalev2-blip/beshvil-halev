"use client";

import { ABOUT_JOURNEY_STEPS } from "@/lib/about/journey-timeline";
import AboutScrollReveal from "./about-scroll-reveal";

function JourneyIcon({ id }: { id: (typeof ABOUT_JOURNEY_STEPS)[number]["id"] }) {
  const className = "size-[1.125rem] sm:size-5";

  switch (id) {
    case "mother":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" strokeLinecap="round" />
          <circle cx="17.5" cy="11" r="2" />
          <path d="M19.5 20c0-2-1.2-3.5-2.5-4" strokeLinecap="round" />
        </svg>
      );
    case "travel":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M4 17h16M6 17l2-8h8l2 8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8" cy="17" r="1.5" />
          <circle cx="16" cy="17" r="1.5" />
          <path d="M10 9V6l2-2 2 2v3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "nature":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M12 21V11" strokeLinecap="round" />
          <path d="M12 11c-3-4-8-3-8 2 0 3 3.5 5 6 1.5-2 3-4 3-6 0-5-5-6-8-2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "community":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <circle cx="9" cy="8" r="2.5" />
          <circle cx="16" cy="9" r="2" />
          <path d="M4 19c0-2.5 2.2-4.5 5-4.5M15 19c0-2 1.5-3.5 3.5-3.5" strokeLinecap="round" />
          <path d="M12 19c0-2.5 2-4.5 4.5-4.5" strokeLinecap="round" />
        </svg>
      );
    case "brand":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
          <path d="M12 20.5s-6.5-4.5-6.5-9a4.5 4.5 0 0 1 8.2-2.6A4.5 4.5 0 0 1 18.5 11.5c0 4.5-6.5 9-6.5 9z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

export default function AboutJourneyTimeline() {
  return (
    <section className="px-4 pb-1 pt-10 sm:px-6 sm:pt-14" dir="rtl" aria-label="המסע שלי">
      <AboutScrollReveal className="mx-auto max-w-3xl">
        <ol className="flex items-start justify-between gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2">
          {ABOUT_JOURNEY_STEPS.map((step, index) => (
            <li
              key={step.id}
              className="flex min-w-[4.25rem] flex-1 flex-col items-center text-center sm:min-w-0"
            >
              <div className="flex w-full items-center">
                {index > 0 ? (
                  <span
                    className="h-px flex-1 bg-gradient-to-l from-[#4F5E48]/20 to-stone-200/30 dark:from-emerald-400/15 dark:to-stone-700/30"
                    aria-hidden="true"
                  />
                ) : (
                  <span className="flex-1" aria-hidden="true" />
                )}
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F3F0E8]/95 text-[#4F5E48] shadow-[0_2px_10px_-4px_rgba(79,94,72,0.25)] ring-1 ring-stone-200/70 transition-transform duration-300 hover:scale-105 dark:bg-stone-800/85 dark:text-emerald-400/90 dark:ring-stone-700/75 sm:size-9">
                  <JourneyIcon id={step.id} />
                </span>
                {index < ABOUT_JOURNEY_STEPS.length - 1 ? (
                  <span
                    className="h-px flex-1 bg-gradient-to-r from-[#4F5E48]/20 to-stone-200/30 dark:from-emerald-400/15 dark:to-stone-700/30"
                    aria-hidden="true"
                  />
                ) : (
                  <span className="flex-1" aria-hidden="true" />
                )}
              </div>
              <span className="mt-1.5 text-[0.6875rem] font-semibold leading-tight text-stone-600 dark:text-stone-400 sm:text-xs">
                {step.label}
              </span>
            </li>
          ))}
        </ol>
      </AboutScrollReveal>
    </section>
  );
}
