"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { HomeFieldMoment } from "@/lib/home-field-moments";

type HomeFieldMomentFeatureProps = {
  moments: HomeFieldMoment[];
};

export default function HomeFieldMomentFeature({
  moments,
}: HomeFieldMomentFeatureProps) {
  const [featured, setFeatured] = useState<HomeFieldMoment | null>(null);

  useEffect(() => {
    if (moments.length === 0) return;
    const index = Math.floor(Math.random() * moments.length);
    setFeatured(moments[index] ?? null);
  }, [moments]);

  if (moments.length === 0) return null;

  const moment = featured ?? moments[0];

  return (
    <div
      className="text-right"
      aria-labelledby="home-field-moments-heading"
    >
      <h3
        id="home-field-moments-heading"
        className="text-center text-[0.6875rem] font-semibold tracking-wide text-[#4F5E48] dark:text-emerald-400/90 lg:text-right"
      >
        רגעים מהשטח
      </h3>

      <Link href={moment.href} className="group mt-2.5 block">
        <div className="relative mx-auto aspect-square size-[13.75rem] overflow-hidden rounded-2xl bg-stone-100 shadow-[0_8px_24px_rgba(79,94,72,0.1)] transition-shadow duration-300 group-hover:shadow-[0_10px_28px_rgba(79,94,72,0.13)] dark:bg-stone-800 sm:size-[15rem] lg:mx-0 lg:size-[16.25rem] xl:size-[17.5rem]">
          <Image
            src={moment.imageSrc}
            alt={moment.title}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
            sizes="(max-width: 640px) 220px, (max-width: 1280px) 260px, 280px"
          />
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 lg:justify-end">
          <p className="text-[0.8125rem] font-semibold text-stone-900 transition-colors group-hover:text-[#4F5E48] dark:text-stone-50 dark:group-hover:text-emerald-300 sm:text-sm">
            {moment.title}
          </p>
          {moment.category ? (
            <span className="rounded-full bg-stone-100 px-2 py-px text-[0.625rem] font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-400">
              {moment.category}
            </span>
          ) : null}
          {moment.recentlyUpdated ? (
            <span className="text-[0.625rem] text-stone-400 dark:text-stone-500">
              עודכן לאחרונה
            </span>
          ) : null}
        </div>
      </Link>
    </div>
  );
}
