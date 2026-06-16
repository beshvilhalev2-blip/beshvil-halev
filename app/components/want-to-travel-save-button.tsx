"use client";

import { useCallback, useEffect, useState } from "react";
import {
  isTripSaved,
  saveTripToWantToTravel,
} from "@/lib/want-to-travel";

type WantToTravelSaveButtonProps = {
  tripSlug: string;
  variant?: "hero" | "inline";
};

export default function WantToTravelSaveButton({
  tripSlug,
  variant = "hero",
}: WantToTravelSaveButtonProps) {
  const [hydrated, setHydrated] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    setSaved(isTripSaved(tripSlug));
    setHydrated(true);
  }, [tripSlug]);

  useEffect(() => {
    if (!showConfirmation) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowConfirmation(false);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [showConfirmation]);

  const handleSave = useCallback(() => {
    if (saved) {
      return;
    }

    saveTripToWantToTravel(tripSlug);
    setSaved(true);
    setShowConfirmation(true);
  }, [saved, tripSlug]);

  const isHero = variant === "hero";

  return (
    <div className={isHero ? "mb-4" : ""}>
      <button
        type="button"
        onClick={handleSave}
        disabled={!hydrated || saved}
        aria-pressed={saved}
        className={`inline-flex min-h-11 w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors sm:w-auto ${
          saved
            ? isHero
              ? "border border-white/30 bg-white/15 text-white backdrop-blur-sm"
              : "border border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
            : isHero
              ? "bg-emerald-500 text-white hover:bg-emerald-400"
              : "bg-emerald-600 text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400"
        } ${!hydrated ? "cursor-wait opacity-80" : ""}`}
      >
        {saved ? "נשמר לרשימה" : "🌿 בא לי לטייל פה"}
      </button>

      {showConfirmation && (
        <p
          className={`mt-2 text-sm ${
            isHero ? "text-emerald-100" : "text-emerald-700 dark:text-emerald-300"
          }`}
          role="status"
          aria-live="polite"
        >
          הטיול נשמר לרשימת בא לי לטייל
        </p>
      )}
    </div>
  );
}
