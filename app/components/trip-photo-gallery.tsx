"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Trip } from "@/data/trips";
import {
  resolveGalleryImageLabel,
  resolveHeroImageLabel,
} from "@/lib/trip-image-labels";
import { tripSectionHeadingClass } from "@/lib/trip-page-ui";

const PREVIEW_COUNT = 6;

function isHeicSrc(src: string): boolean {
  return src.toLowerCase().endsWith(".heic");
}

export function getTripPhotoGalleryItems(trip: Trip) {
  const galleryItems = trip.gallery
    .filter((item) => item.src)
    .map((item) => ({
      src: item.src!,
      label: resolveGalleryImageLabel(trip, item.src!, item.label),
    }));

  if (!trip.heroImage) {
    return galleryItems;
  }

  if (galleryItems.some((item) => item.src === trip.heroImage)) {
    return galleryItems;
  }

  return [
    {
      src: trip.heroImage,
      label: resolveHeroImageLabel(trip),
    },
    ...galleryItems,
  ];
}

type GalleryImage = {
  src: string;
  label?: string;
};

function GalleryImageTile({
  item,
  onOpen,
  priority = false,
  className = "",
}: {
  item: GalleryImage;
  onOpen: () => void;
  priority?: boolean;
  className?: string;
}) {
  const caption = item.label?.trim() ?? "";

  return (
    <figure className={`flex flex-col gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={onOpen}
        className="group relative aspect-[5/4] overflow-hidden rounded-xl bg-stone-200/80 dark:bg-stone-800"
        aria-label={caption ? `פתיחת תמונה: ${caption}` : "פתיחת תמונה בגלריה"}
      >
        {isHeicSrc(item.src) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt={caption}
            className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <Image
            src={item.src}
            alt={caption}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
      </button>
      {caption ? (
        <figcaption className="text-xs leading-snug text-stone-600 dark:text-stone-400 sm:text-sm">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function TripPhotoGallery({ trip }: { trip: Trip }) {
  const items = getTripPhotoGalleryItems(trip);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) {
        return current;
      }
      return (current - 1 + items.length) % items.length;
    });
  }, [items.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) {
        return current;
      }
      return (current + 1) % items.length;
    });
  }, [items.length]);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        showNext();
      } else if (event.key === "ArrowRight") {
        showPrevious();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLightbox, lightboxIndex, showNext, showPrevious]);

  if (items.length === 0) {
    return null;
  }

  const previewItems = items.slice(0, PREVIEW_COUNT);
  const activeItem = lightboxIndex === null ? null : items[lightboxIndex];

  return (
    <section aria-labelledby="trip-gallery-heading">
      <h2 id="trip-gallery-heading" className={tripSectionHeadingClass}>
        גלריה 📸
      </h2>

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
        {previewItems.map((item, index) => (
          <GalleryImageTile
            key={item.src}
            item={{ src: item.src!, label: item.label }}
            priority={index < 2}
            onOpen={() => setLightboxIndex(index)}
          />
        ))}
      </div>

      {items.length > 0 ? (
        <div className="mt-4 text-center sm:mt-5">
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200"
          >
            {items.length > 1
              ? `צפייה בכל התמונות (${items.length})`
              : "צפייה בתמונה"}
          </button>
        </div>
      ) : null}

      {activeItem ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="גלריית תמונות"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute end-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="סגירת הגלריה"
          >
            ✕
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            className="absolute start-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:start-6 sm:size-11"
            aria-label="תמונה קודמת"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute end-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:end-6 sm:size-11"
            aria-label="תמונה הבאה"
          >
            ›
          </button>

          <div
            className="relative max-h-[85vh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-900">
              {isHeicSrc(activeItem.src!) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={activeItem.src}
                  alt={activeItem.label ?? ""}
                  className="absolute inset-0 size-full object-contain"
                />
              ) : (
                <Image
                  src={activeItem.src!}
                  alt={activeItem.label ?? ""}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              )}
            </div>
            {activeItem.label ? (
              <p className="mt-3 text-center text-sm text-white/85">{activeItem.label}</p>
            ) : null}
            <p className="mt-1 text-center text-xs text-white/60">
              {(lightboxIndex ?? 0) + 1} / {items.length}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
