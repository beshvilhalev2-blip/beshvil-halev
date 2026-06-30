import type { TripQuickFact } from "@/data/trips";
import { Fragment } from "react";

type TripQuickFactsProps = {
  facts: TripQuickFact[];
};

type QuickFactTone = "neutral" | "positive" | "water";

function getQuickFactTone(label: string, value: string): QuickFactTone {
  if (label.includes("מים")) {
    return "water";
  }

  if (
    label.includes("ילדים") ||
    label.includes("עגלות") ||
    label.includes("שירותים") ||
    label.includes("קיוסק")
  ) {
    if (/^(לא|אין)\b/i.test(value.trim()) && !/יש/i.test(value)) {
      return "neutral";
    }
    return "positive";
  }

  if (label.includes("עלות") && /חינם/i.test(value)) {
    return "positive";
  }

  return "neutral";
}

const toneIconClass: Record<QuickFactTone, string> = {
  neutral: "text-stone-400 dark:text-stone-500",
  positive: "text-emerald-600/80 dark:text-emerald-400/80",
  water: "text-sky-600/75 dark:text-sky-400/75",
};

function QuickFactIcon({ label, tone }: { label: string; tone: QuickFactTone }) {
  const className = `size-5 shrink-0 sm:size-[1.375rem] ${toneIconClass[tone]}`;

  if (label.includes("מים")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
        <path d="M12 3c3 4.5 6 8.2 6 11.5a6 6 0 1 1-12 0C6 11.2 9 7.5 12 3Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label.includes("זמן ביקור")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label.includes("עלות") || label.includes("חניה")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
        <path d="M12 2v20M7 7h8a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label.includes("ילדים")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
        <circle cx="12" cy="7" r="3" />
        <path d="M8 20v-1.5a4 4 0 0 1 8 0V20" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label.includes("עגלות")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
        <circle cx="8" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
        <path d="M6 18h2l2.5-7h5l1.5 4H9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label.includes("שירותים") || label.includes("קיוסק")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
        <path d="M4 10h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label.includes("4x4") || label.includes("עבירות")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
        <path d="M5 17h2l1.5-5h9L19 17h2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7.5" cy="17.5" r="1.5" />
        <circle cx="16.5" cy="17.5" r="1.5" />
        <path d="M9 12h6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 10v4" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function QuickFactItem({ fact }: { fact: TripQuickFact }) {
  const tone = getQuickFactTone(fact.label, fact.value);

  return (
    <div className="group flex min-w-0 flex-col items-center gap-1 px-1.5 py-1.5 text-center transition-colors duration-200 hover:bg-stone-900/[0.03] dark:hover:bg-white/[0.04] sm:gap-1.5 sm:px-2 sm:py-2 lg:flex-1 lg:px-3">
      <QuickFactIcon label={fact.label} tone={tone} />
      <dt className="sr-only">{fact.label}</dt>
      <dd className="w-full text-[0.8125rem] font-semibold leading-tight text-stone-900 dark:text-stone-50 sm:text-sm lg:text-[0.9375rem]">
        {fact.value}
      </dd>
      <span
        aria-hidden="true"
        className="w-full text-[0.625rem] font-medium leading-tight text-stone-500 dark:text-stone-400 sm:text-[0.6875rem]"
      >
        {fact.label}
      </span>
    </div>
  );
}

function QuickFactSeparator() {
  return (
    <div
      className="hidden shrink-0 self-stretch bg-stone-200/60 dark:bg-stone-700/50 lg:block lg:w-px"
      aria-hidden="true"
    />
  );
}

export default function TripQuickFacts({ facts }: TripQuickFactsProps) {
  if (facts.length === 0) {
    return null;
  }

  return (
    <section
      className="border-b border-stone-200/60 bg-stone-50/35 px-4 py-4 dark:border-stone-800/60 dark:bg-stone-950/20 sm:px-6 sm:py-5"
      aria-labelledby="trip-quick-facts-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="trip-quick-facts-heading"
          className="mb-3 text-center text-base font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:mb-3.5 sm:text-lg"
        >
          במבט מהיר
        </h2>

        <dl className="grid grid-cols-2 gap-x-2 gap-y-3 sm:grid-cols-3 sm:gap-x-3 sm:gap-y-4 lg:hidden">
          {facts.map((fact) => (
            <QuickFactItem key={fact.label} fact={fact} />
          ))}
        </dl>

        <dl className="hidden lg:flex lg:items-stretch lg:justify-between">
          {facts.map((fact, index) => (
            <Fragment key={fact.label}>
              {index > 0 ? <QuickFactSeparator /> : null}
              <QuickFactItem fact={fact} />
            </Fragment>
          ))}
        </dl>
      </div>
    </section>
  );
}
