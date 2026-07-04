import {
  tripSectionHeadingClass,
  tripSurfaceClass,
} from "@/lib/trip-page-ui";

type TripHighlightsProps = {
  highlights: string[];
};

export default function TripHighlights({ highlights }: TripHighlightsProps) {
  const items = highlights.map((item) => item.trim()).filter(Boolean);

  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="trip-highlights-heading">
      <h2 id="trip-highlights-heading" className={tripSectionHeadingClass}>
        מתאים במיוחד אם...
      </h2>

      <ul className={`divide-y divide-stone-200/60 ${tripSurfaceClass}`}>
        {items.map((item) => (
          <li
            key={item}
            className="px-5 py-3.5 text-sm leading-relaxed text-stone-600 dark:text-stone-400 sm:px-6 sm:text-[0.9375rem]"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
