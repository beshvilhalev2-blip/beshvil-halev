"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ABOUT_HERO_COLLAGE_ROTATE_MS,
  ABOUT_HERO_IMAGE_POOL,
  ABOUT_HERO_INITIAL_SLOTS,
  type AboutHeroImage,
} from "@/lib/about/hero-images";

type CollageSlot = {
  current: AboutHeroImage;
  incoming: AboutHeroImage | null;
};

function buildInitialSlots(): CollageSlot[] {
  return ABOUT_HERO_INITIAL_SLOTS.map((image) => ({
    current: image,
    incoming: null,
  }));
}

function nextImageForSlot(
  slots: CollageSlot[],
  slotIndex: number,
  poolCursor: number,
): { image: AboutHeroImage; nextCursor: number } {
  const visibleIds = new Set(
    slots.flatMap((slot, index) => {
      if (index === slotIndex) return [];
      return [slot.current.id, slot.incoming?.id].filter(Boolean) as string[];
    }),
  );

  for (let offset = 0; offset < ABOUT_HERO_IMAGE_POOL.length; offset += 1) {
    const candidate =
      ABOUT_HERO_IMAGE_POOL[(poolCursor + offset) % ABOUT_HERO_IMAGE_POOL.length];
    if (!visibleIds.has(candidate.id)) {
      return {
        image: candidate,
        nextCursor: (poolCursor + offset + 1) % ABOUT_HERO_IMAGE_POOL.length,
      };
    }
  }

  const fallback = ABOUT_HERO_IMAGE_POOL[poolCursor];
  return {
    image: fallback,
    nextCursor: (poolCursor + 1) % ABOUT_HERO_IMAGE_POOL.length,
  };
}

export default function AboutHeroLivingCollage() {
  const [slots, setSlots] = useState<CollageSlot[]>(buildInitialSlots);
  const slotIndexRef = useRef(0);
  const poolCursorRef = useRef(ABOUT_HERO_INITIAL_SLOTS.length);
  const fadeTimeoutRef = useRef<number | null>(null);

  const commitIncoming = useCallback((slotIndex: number) => {
    setSlots((current) =>
      current.map((slot, index) => {
        if (index !== slotIndex || !slot.incoming) return slot;
        return { current: slot.incoming, incoming: null };
      }),
    );
  }, []);

  const rotateOneSlot = useCallback(() => {
    setSlots((current) => {
      const slotIndex = slotIndexRef.current;
      const { image, nextCursor } = nextImageForSlot(
        current,
        slotIndex,
        poolCursorRef.current,
      );
      poolCursorRef.current = nextCursor;
      slotIndexRef.current = (slotIndex + 1) % 4;

      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }

      fadeTimeoutRef.current = window.setTimeout(() => {
        commitIncoming(slotIndex);
      }, 900);

      return current.map((slot, index) =>
        index === slotIndex ? { ...slot, incoming: image } : slot,
      );
    });
  }, [commitIncoming]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const intervalId = window.setInterval(rotateOneSlot, ABOUT_HERO_COLLAGE_ROTATE_MS);

    return () => {
      window.clearInterval(intervalId);
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [rotateOneSlot]);

  return (
    <div
      className="grid grid-cols-2 gap-3 sm:gap-3.5"
      aria-label="רגעים מהטיולים של מילאנה והמשפחה בטבע"
    >
      {slots.map((slot, index) => (
        <div
          key={index}
          className={`group relative aspect-square overflow-hidden rounded-2xl bg-stone-200 shadow-[0_10px_32px_-14px_rgba(28,25,23,0.22)] ring-1 ring-stone-900/5 dark:bg-stone-800 dark:ring-white/10 ${index % 2 === 1 ? "sm:translate-y-2.5" : ""}`}
        >
          <div
            className={`relative size-full ${index % 2 === 0 ? "about-collage-float" : "about-collage-float about-collage-float-delayed"}`}
          >
          <div className="relative size-full transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none">
            <Image
              src={slot.current.src}
              alt={slot.incoming ? "" : slot.current.alt}
              fill
              priority={index < 2}
              aria-hidden={Boolean(slot.incoming)}
              className={`object-cover transition-opacity duration-[900ms] ease-in-out motion-reduce:transition-none ${
                slot.incoming ? "opacity-0" : "opacity-100"
              }`}
              sizes="(max-width: 1024px) 45vw, 280px"
            />
            {slot.incoming ? (
              <Image
                src={slot.incoming.src}
                alt={slot.incoming.alt}
                fill
                className="object-cover opacity-100 transition-opacity duration-[900ms] ease-in-out motion-reduce:transition-none"
                sizes="(max-width: 1024px) 45vw, 280px"
              />
            ) : null}
          </div>
          </div>
        </div>
      ))}
    </div>
  );
}
