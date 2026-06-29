import {
  tripSectionHeadingClass,
  tripSectionSubtextClass,
  tripSurfaceClass,
  tripSurfacePaddingClass,
} from "@/lib/trip-page-ui";

const STAY_OPTIONS = [
  {
    id: "booking",
    name: "Booking.com",
    description: "מלונות ודירות ללילה באזור",
  },
  {
    id: "airbnb",
    name: "Airbnb",
    description: "דירות וחוויות אירוח מקומיות",
  },
] as const;

export default function TripStayNearby() {
  return (
    <section aria-labelledby="trip-stay-nearby-heading">
      <h2 id="trip-stay-nearby-heading" className={tripSectionHeadingClass}>
        לינה באזור 🏕️
      </h2>
      <p className={tripSectionSubtextClass}>בקרוב — אפשרויות לינה באזור</p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
        {STAY_OPTIONS.map((option) => (
          <article
            key={option.id}
            className={`flex flex-col ${tripSurfaceClass} ${tripSurfacePaddingClass}`}
          >
            <span className="mb-3 inline-flex w-fit rounded-full border border-stone-200/70 bg-stone-50/80 px-2 py-0.5 text-[0.625rem] font-medium text-stone-500 dark:border-stone-700 dark:bg-stone-900/60 dark:text-stone-400">
              בקרוב
            </span>
            <h3 className="text-base font-semibold text-stone-900 dark:text-stone-50">
              {option.name}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-stone-500 dark:text-stone-400 sm:text-sm">
              {option.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
