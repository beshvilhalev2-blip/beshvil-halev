import type { TripGettingThere } from "@/data/trips";
import {
  tripLabelClass,
  tripSectionHeadingClass,
  tripSurfaceClass,
} from "@/lib/trip-page-ui";

type TripGettingThereProps = {
  gettingThere: TripGettingThere;
  wazeDestination: string;
};

export default function TripGettingThereSection({
  gettingThere,
  wazeDestination,
}: TripGettingThereProps) {
  const notes = gettingThere.notes?.filter((note) => note.trim()) ?? [];

  return (
    <section aria-labelledby="trip-getting-there-heading">
      <h2 id="trip-getting-there-heading" className={tripSectionHeadingClass}>
        איך מגיעים 📍
      </h2>

      <div className={`overflow-hidden ${tripSurfaceClass}`}>
        <div className="border-b border-stone-200/60 bg-stone-50/60 px-5 py-4 dark:border-stone-800/60 dark:bg-stone-950/30 sm:px-6">
          <p className="mb-1 text-xs font-medium text-stone-500 dark:text-stone-400">
            מה להקליד ב-Waze?
          </p>
          <p className="text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            {wazeDestination}
          </p>
        </div>

        <div className="space-y-4 px-5 py-5 sm:space-y-5 sm:px-6">
          {gettingThere.parking ? (
            <div>
              <h3 className={`mb-1 ${tripLabelClass}`}>איפה חונים</h3>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400 sm:text-[0.9375rem]">
                {gettingThere.parking}
              </p>
            </div>
          ) : null}

          {gettingThere.walking ? (
            <div>
              <h3 className={`mb-1 ${tripLabelClass}`}>ההליכה למקום</h3>
              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400 sm:text-[0.9375rem]">
                {gettingThere.walking}
              </p>
            </div>
          ) : null}

          {notes.length > 0 ? (
            <div className="border-t border-stone-200/60 pt-4 dark:border-stone-800/60">
              <h3 className={`mb-2 ${tripLabelClass}`}>כדאי לדעת לפני שיוצאים</h3>
              <ul className="space-y-1.5">
                {notes.map((note) => (
                  <li
                    key={note}
                    className="text-sm leading-relaxed text-stone-600 dark:text-stone-400 sm:text-[0.9375rem]"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
