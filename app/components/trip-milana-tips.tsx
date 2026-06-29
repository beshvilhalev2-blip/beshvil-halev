import {
  tripSectionHeadingClass,
  tripSurfaceClass,
} from "@/lib/trip-page-ui";

type TripMilanaTipsProps = {
  tips: string[];
};

export default function TripMilanaTips({ tips }: TripMilanaTipsProps) {
  if (tips.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="trip-tips-heading">
      <h2 id="trip-tips-heading" className={tripSectionHeadingClass}>
        טיפים של מילאנה ✨
      </h2>

      <ul className={`divide-y divide-stone-200/60 ${tripSurfaceClass}`}>
        {tips.map((tip, index) => (
          <li
            key={tip}
            className="flex items-start gap-3 px-5 py-3.5 sm:px-6"
          >
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-stone-100 text-[0.6875rem] font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300">
              {index + 1}
            </span>
            <span className="text-sm leading-relaxed text-stone-600 dark:text-stone-400 sm:text-[0.9375rem]">
              {tip}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
