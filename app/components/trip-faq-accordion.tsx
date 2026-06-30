import type { TripFaqItem } from "@/data/trips";

type TripFaqAccordionProps = {
  items: TripFaqItem[];
};

export default function TripFaqAccordion({ items }: TripFaqAccordionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="mb-10 sm:mb-12"
      aria-labelledby="trip-faq-heading"
    >
      <h2
        id="trip-faq-heading"
        className="mb-4 text-center text-xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:mb-5 sm:text-2xl"
      >
        שאלות נפוצות
      </h2>

      <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900">
        {items.map((item, index) => (
          <details
            key={item.question}
            className={`group ${index > 0 ? "border-t border-stone-100 dark:border-stone-800" : ""}`}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-start marker:content-none sm:px-5 [&::-webkit-details-marker]:hidden">
              <span className="text-[0.9375rem] font-semibold leading-snug text-stone-900 dark:text-stone-50 sm:text-base">
                {item.question}
              </span>
              <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition-transform group-open:rotate-180 dark:bg-stone-800 dark:text-stone-400"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
                  <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </summary>
            <div className="px-4 pb-4 text-sm leading-relaxed text-stone-600 sm:px-5 sm:pb-5 sm:text-[0.9375rem] dark:text-stone-400">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
