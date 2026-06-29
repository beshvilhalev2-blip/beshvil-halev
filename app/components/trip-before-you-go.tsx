const DEFAULT_CLOSING_NOTE =
  "בואו נשמור על הטבע יפה. קחו איתכם את האשפה והשאירו את המקום בדיוק כמו שמצאתם אותו 💚";

type TripBeforeYouGoProps = {
  note?: string;
};

export default function TripBeforeYouGo({ note }: TripBeforeYouGoProps) {
  return (
    <section aria-labelledby="trip-before-you-go-heading">
      <div className="rounded-2xl border border-emerald-200/50 bg-emerald-50/45 px-5 py-5 text-center backdrop-blur-sm dark:border-emerald-900/40 dark:bg-emerald-950/25 sm:px-6 sm:py-6">
        <p
          id="trip-before-you-go-heading"
          className="mb-2 text-sm font-semibold text-emerald-800 dark:text-emerald-300"
        >
          לפני שיוצאים 🌿
        </p>
        <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400 sm:text-[0.9375rem]">
          {note?.trim() || DEFAULT_CLOSING_NOTE}
        </p>
      </div>
    </section>
  );
}
