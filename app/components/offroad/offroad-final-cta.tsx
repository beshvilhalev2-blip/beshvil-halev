"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AI_ASSISTANT_AVATAR_ALT,
  AI_ASSISTANT_AVATAR_SRC,
} from "@/lib/ai-assistant/constants";
import { openAiAssistant } from "@/lib/ai-assistant/events";
import {
  OffroadSectionHeader,
  offroadCard,
  offroadCardHover,
  offroadSectionInner,
  offroadSectionShell,
} from "./offroad-shared";

export default function OffroadFinalCta() {
  return (
    <section
      id="find-route"
      className={`${offroadSectionShell} scroll-mt-24 pb-16 sm:pb-20`}
    >
      <div className={offroadSectionInner}>
        <OffroadSectionHeader title="לא יודעים לאן לנסוע?" />

        <div
          className={`${offroadCard} ${offroadCardHover} mx-auto max-w-3xl overflow-hidden border-emerald-200/40 bg-gradient-to-br from-emerald-50/75 via-white/72 to-white/65 p-6 dark:border-emerald-900/30 dark:from-emerald-950/25 dark:via-stone-900/60 dark:to-stone-900/55 sm:p-8`}
        >
          <div className="flex flex-col items-center text-center">
            <span className="relative mb-4 size-16 shrink-0 overflow-hidden rounded-full ring-2 ring-emerald-200 ring-offset-2 ring-offset-white dark:ring-emerald-800 dark:ring-offset-stone-900">
              <Image
                src={AI_ASSISTANT_AVATAR_SRC}
                alt={AI_ASSISTANT_AVATAR_ALT}
                fill
                sizes="64px"
                className="object-cover"
              />
            </span>

            <p className="mb-5 max-w-md text-base leading-relaxed text-stone-700 dark:text-stone-300 sm:text-lg">
              ספרו למילאנה AI מה בא לכם והיא תמצא לכם מסלול
            </p>

            <div className="flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={openAiAssistant}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
              >
                דברו עם מילאנה AI
              </button>
              <Link
                href="/find-my-trip"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-stone-200/80 bg-white/50 px-6 py-3.5 text-sm font-semibold text-stone-700 backdrop-blur-sm transition-colors hover:bg-white/80 dark:border-stone-700 dark:bg-stone-800/40 dark:text-stone-200 dark:hover:bg-stone-800/70"
              >
                מסנן טיולים
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
