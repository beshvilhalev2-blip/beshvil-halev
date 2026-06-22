"use client";

import {
  OFFROAD_FIRST_TIME_TIPS,
  type OffroadFirstTimeTip,
} from "@/lib/offroad/content";
import { useEffect, useRef, useState } from "react";

type StepPhase = "upcoming" | "active" | "past";

type StepState = {
  revealed: boolean;
  phase: StepPhase;
};

function getStepPhase(element: HTMLElement): StepPhase {
  const rect = element.getBoundingClientRect();
  const viewportMid = window.innerHeight * 0.5;

  if (rect.bottom < viewportMid) return "past";
  if (rect.top > viewportMid) return "upcoming";
  return "active";
}

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function FirstTimeStep({
  tip,
  index,
  isLast,
  reducedMotion,
  revealed,
  phase,
}: {
  tip: OffroadFirstTimeTip;
  index: number;
  isLast: boolean;
  reducedMotion: boolean;
  revealed: boolean;
  phase: StepPhase;
}) {
  const isActive = phase === "active";
  const isPast = phase === "past";

  const articleClassName = (() => {
    if (!revealed) {
      return reducedMotion
        ? "translate-y-0 opacity-100"
        : "translate-y-5 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100";
    }
    if (isActive) return "translate-y-0 opacity-100";
    if (isPast) return "translate-y-0 opacity-70";
    return "translate-y-0 opacity-[0.38]";
  })();

  return (
    <li
      data-first-time-step
      className="relative flex w-full flex-col items-center"
    >
      <article
        className={`flex w-full max-w-sm flex-col items-center text-center transition-all duration-700 ease-out ${articleClassName}`}
        style={
          revealed && !reducedMotion
            ? { transitionDelay: `${index * 90}ms` }
            : undefined
        }
        aria-current={isActive ? "step" : undefined}
      >
        <span
          className={[
            "flex size-10 items-center justify-center rounded-full text-sm font-bold tabular-nums transition-all duration-500 ease-out sm:size-11 sm:text-base",
            isActive
              ? "scale-110 bg-emerald-600 text-white shadow-[0_8px_24px_-8px_rgba(5,150,105,0.55)] ring-4 ring-emerald-100/80 dark:ring-emerald-900/40"
              : isPast
                ? "bg-emerald-100/90 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                : "bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-500",
          ].join(" ")}
          aria-hidden="true"
        >
          {index + 1}
        </span>

        <h3
          className={[
            "mt-3 text-sm font-semibold leading-snug transition-all duration-500 sm:text-base",
            isActive
              ? "text-stone-900 dark:text-stone-50"
              : "text-stone-500 dark:text-stone-400",
          ].join(" ")}
        >
          {tip.title}
        </h3>

        <p
          className={[
            "mt-2 max-w-xs text-xs leading-relaxed transition-all duration-500 sm:text-[13px]",
            isActive
              ? "translate-y-0 opacity-100 text-stone-600 dark:text-stone-300"
              : isPast
                ? "opacity-60 text-stone-500 dark:text-stone-400"
                : "max-h-0 translate-y-1 overflow-hidden opacity-0 text-stone-500",
          ].join(" ")}
        >
          {tip.body}
        </p>
      </article>

      {!isLast ? (
        <div
          className="flex flex-col items-center py-4 sm:py-5"
          aria-hidden="true"
        >
          <div
            className={[
              "h-6 w-px transition-colors duration-500 sm:h-7",
              isActive || isPast
                ? "bg-emerald-300/80 dark:bg-emerald-700/60"
                : "bg-stone-200 dark:bg-stone-700",
            ].join(" ")}
          />
          <span
            className={[
              "mt-0.5 text-[11px] leading-none transition-colors duration-500",
              isActive || isPast
                ? "text-emerald-500/80 dark:text-emerald-400/80"
                : "text-stone-300 dark:text-stone-600",
            ].join(" ")}
          >
            ↓
          </span>
        </div>
      ) : null}
    </li>
  );
}

const INITIAL_STEP_STATES: StepState[] = OFFROAD_FIRST_TIME_TIPS.map(() => ({
  revealed: false,
  phase: "upcoming",
}));

export default function OffroadFirstTimeTimeline() {
  const reducedMotion = usePrefersReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const [stepStates, setStepStates] = useState<StepState[]>(INITIAL_STEP_STATES);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    if (reducedMotion) {
      setStepStates(
        OFFROAD_FIRST_TIME_TIPS.map(() => ({
          revealed: true,
          phase: "active",
        })),
      );
      return;
    }

    const stepElements = Array.from(
      list.querySelectorAll<HTMLElement>("[data-first-time-step]"),
    );

    const updateSteps = () => {
      setStepStates((current) => {
        let changed = false;
        const next = stepElements.map((element, index) => {
          const rect = element.getBoundingClientRect();
          const revealed =
            current[index]?.revealed ||
            rect.top < window.innerHeight * 0.92;
          const phase = getStepPhase(element);
          const previous = current[index];

          if (
            previous?.revealed === revealed &&
            previous?.phase === phase
          ) {
            return previous;
          }

          changed = true;
          return { revealed, phase };
        });

        return changed ? next : current;
      });
    };

    const revealObserver = new IntersectionObserver(
      () => updateSteps(),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    stepElements.forEach((element) => {
      revealObserver.observe(element);
    });

    window.addEventListener("scroll", updateSteps, { passive: true });
    window.addEventListener("resize", updateSteps, { passive: true });
    updateSteps();

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", updateSteps);
      window.removeEventListener("resize", updateSteps);
    };
  }, [reducedMotion]);

  const activeIndex = stepStates.reduce<number>((latest, state, index) => {
    if (state.phase === "active" || state.phase === "past") return index;
    return latest;
  }, 0);

  const progressPercent =
    OFFROAD_FIRST_TIME_TIPS.length <= 1
      ? 100
      : (activeIndex / (OFFROAD_FIRST_TIME_TIPS.length - 1)) * 100;

  return (
    <div className="relative mx-auto max-w-md px-2 sm:max-w-lg">
      <div
        className="pointer-events-none absolute inset-y-3 left-1/2 w-px -translate-x-1/2 bg-stone-200/90 dark:bg-stone-700/80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-3 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-emerald-400/80 to-emerald-500/40 transition-[height] duration-700 ease-out dark:from-emerald-600/70 dark:to-emerald-700/30"
        style={{ height: `${progressPercent}%` }}
        aria-hidden="true"
      />

      <ol ref={listRef} className="relative flex flex-col items-center">
        {OFFROAD_FIRST_TIME_TIPS.map((tip, index) => (
          <FirstTimeStep
            key={tip.id}
            tip={tip}
            index={index}
            isLast={index === OFFROAD_FIRST_TIME_TIPS.length - 1}
            reducedMotion={reducedMotion}
            revealed={stepStates[index]?.revealed ?? false}
            phase={stepStates[index]?.phase ?? "upcoming"}
          />
        ))}
      </ol>
    </div>
  );
}
