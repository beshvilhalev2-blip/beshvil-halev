"use client";

import { useCallback, useEffect, useState, type MouseEvent } from "react";
import { saveTripToWantToTravel } from "@/lib/want-to-travel";
import { useIsTripSaved } from "@/lib/want-to-travel/use-saved-trips";

type WantToTravelSaveButtonProps = {
  tripSlug: string;
  variant?: "hero" | "inline" | "card";
};

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.75"
      className="size-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export default function WantToTravelSaveButton({
  tripSlug,
  variant = "hero",
}: WantToTravelSaveButtonProps) {
  const [hydrated, setHydrated] = useState(false);
  const saved = useIsTripSaved(tripSlug);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!showConfirmation) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowConfirmation(false);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [showConfirmation]);

  const handleSave = useCallback(
    (event?: MouseEvent<HTMLButtonElement>) => {
      event?.preventDefault();
      event?.stopPropagation();

      if (saved) {
        return;
      }

      saveTripToWantToTravel(tripSlug);
      setShowConfirmation(true);
    },
    [saved, tripSlug],
  );

  const isHero = variant === "hero";
  const isCard = variant === "card";

  if (isCard) {
    return (
      <button
        type="button"
        onClick={handleSave}
        disabled={!hydrated || saved}
        aria-pressed={saved}
        aria-label={saved ? "שמור לטיול הבא — נשמר" : "שמור לטיול הבא"}
        title={saved ? "נשמר לטיול הבא" : "שמור לטיול הבא"}
        className={[
          "inline-flex size-10 items-center justify-center rounded-full border shadow-sm backdrop-blur-sm transition-all duration-200",
          saved
            ? "border-rose-200/90 bg-white/95 text-rose-500"
            : "border-white/70 bg-white/90 text-stone-600 hover:scale-105 hover:border-rose-200 hover:text-rose-500",
          !hydrated ? "cursor-wait opacity-80" : "",
        ].join(" ")}
      >
        <HeartIcon filled={saved} />
      </button>
    );
  }

  return (
    <div className={isHero ? "mb-4" : ""}>
      <button
        type="button"
        onClick={handleSave}
        disabled={!hydrated || saved}
        aria-pressed={saved}
        className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors sm:w-auto ${
          saved
            ? isHero
              ? "border border-white/30 bg-white/15 text-white backdrop-blur-sm"
              : "border border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200"
            : isHero
              ? "bg-white/15 text-white backdrop-blur-sm hover:bg-white/22"
              : "border border-stone-200 bg-white text-stone-800 hover:border-rose-200 hover:text-rose-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
        } ${!hydrated ? "cursor-wait opacity-80" : ""}`}
      >
        <HeartIcon filled={saved} />
        {saved ? "שמרתי לפעם הבאה" : "שמור לטיול הבא"}
      </button>

      {showConfirmation && (
        <p
          className={`mt-2 text-sm ${
            isHero ? "text-white/85" : "text-stone-600 dark:text-stone-400"
          }`}
          role="status"
          aria-live="polite"
        >
          נשמר לרשימת בא לי לטייל
        </p>
      )}
    </div>
  );
}
