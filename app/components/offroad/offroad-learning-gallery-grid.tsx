"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getOffroadLearningMomentAlt } from "@/lib/offroad/learning-moments-utils";

type OffroadLearningGalleryGridProps = {
  images: string[];
};

export default function OffroadLearningGalleryGrid({
  images,
}: OffroadLearningGalleryGridProps) {
  const [activeSrc, setActiveSrc] = useState<string | null>(null);

  const closeLightbox = useCallback(() => {
    setActiveSrc(null);
  }, []);

  useEffect(() => {
    if (!activeSrc) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeSrc, closeLightbox]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:grid-cols-4">
        {images.map((src, index) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setActiveSrc(src)}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-200 ring-1 ring-stone-200/70 transition-all duration-300 hover:ring-stone-300/80 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:bg-stone-800 dark:ring-stone-700/70 dark:hover:ring-stone-600"
              aria-label={`הגדלת תמונה: ${getOffroadLearningMomentAlt(src)}`}
            >
              <Image
                src={src}
                alt={getOffroadLearningMomentAlt(src)}
                fill
                loading={index < 4 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </button>
          </li>
        ))}
      </ul>

      {activeSrc ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="תצוגת תמונה מוגדלת"
        >
          <button
            type="button"
            className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
            onClick={closeLightbox}
            aria-label="סגירה"
          />

          <div className="relative z-10 w-full max-w-3xl">
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute -top-10 end-0 flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="סגירה"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-5"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-900 shadow-2xl ring-1 ring-white/10">
              <Image
                src={activeSrc}
                alt={getOffroadLearningMomentAlt(activeSrc)}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
