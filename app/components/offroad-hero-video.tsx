"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { TRIP_HERO_IMAGE_SIZES } from "@/lib/trip-image-sizes";

const OFFROAD_HERO_VIDEO = "/videos/offroad-hero.mp4";

type OffroadHeroVideoProps = {
  posterSrc: string;
  posterAlt: string;
};

export default function OffroadHeroVideo({
  posterSrc,
  posterAlt,
}: OffroadHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPoster, setShowPoster] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      setShowPoster(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    void video.play().catch(() => {
      setShowPoster(true);
    });
  }, []);

  if (showPoster) {
    return (
      <Image
        src={posterSrc}
        alt={posterAlt}
        fill
        sizes={TRIP_HERO_IMAGE_SIZES}
        priority
        className="object-cover object-[center_35%]"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={posterSrc}
      className="absolute inset-0 size-full object-cover object-[center_35%]"
      aria-hidden="true"
    >
      <source src={OFFROAD_HERO_VIDEO} type="video/mp4" />
    </video>
  );
}
