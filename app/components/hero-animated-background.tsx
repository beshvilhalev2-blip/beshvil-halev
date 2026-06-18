"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import HeroBackgroundStatic from "./hero-background-static";
import type { AdventureCategoryId } from "@/lib/hero-adventure-selector";
import {
  categoryMoodPresentation,
  HERO_MOOD_LERP,
} from "@/lib/hero-landscape/category-mood-config";
import {
  atmosphereStyleForMood,
  drawCategoryMoodOverlays,
  hillContrastBoost,
  journeyPathPaletteForMood,
  legibilityEase,
  lerpMood,
  moodFromCategory,
  moodIntensity,
  type MoodState,
  ZERO_MOOD,
} from "@/lib/hero-landscape/category-mood";
import {
  buildHeroJourney,
  buildHillLayers,
  buildMistBands,
  computeSceneTiming,
  drawDaylightHaze,
  drawHeroJourneyPath,
  drawHillSilhouettes,
  drawLandscapeSky,
  drawLayerMists,
  HERO_ENTRANCE_MS,
  lerpParallax,
  type HeroJourney,
  type HillLayer,
  type MistBand,
  type ParallaxState,
} from "@/lib/hero-landscape/scene";

const ATMOSPHERE_LAYERS = [
  {
    className:
      "absolute left-[10%] top-[6%] h-[44%] w-[52%] rounded-full bg-[#DCEEF8]/38 blur-[100px]",
    depth: 0.2,
    kind: "cool" as const,
  },
  {
    className:
      "absolute bottom-[10%] right-[6%] h-[40%] w-[68%] rounded-full bg-[#E8DCC4]/42 blur-[110px]",
    depth: 0.48,
    kind: "warm" as const,
  },
] as const;

function readPrefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(readPrefersReducedMotion);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useIsCoarsePointer() {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return coarse;
}

type HeroAnimatedBackgroundProps = {
  activeCategory?: AdventureCategoryId | null;
  introPaused?: boolean;
  handoffEntrance?: number;
  handoffSync?: boolean;
};

export default function HeroAnimatedBackground({
  activeCategory = null,
  introPaused = false,
  handoffEntrance,
  handoffSync = false,
}: HeroAnimatedBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseGradientRef = useRef<HTMLDivElement>(null);
  const atmosphereRefs = useRef<(HTMLDivElement | null)[]>([]);
  const moodWarmRef = useRef<HTMLDivElement>(null);
  const moodCoolRef = useRef<HTMLDivElement>(null);
  const moodEarthRef = useRef<HTMLDivElement>(null);
  const moodBrightRef = useRef<HTMLDivElement>(null);
  const moodTintRef = useRef<HTMLDivElement>(null);
  const legibilityRef = useRef<HTMLDivElement>(null);
  const legibilityGradRef = useRef<HTMLDivElement>(null);
  const sectionFadeRef = useRef<HTMLDivElement>(null);
  const hillsRef = useRef<HillLayer[]>(buildHillLayers());
  const mistBandsRef = useRef<MistBand[]>(buildMistBands());
  const journeyRef = useRef<HeroJourney | null>(null);
  const journeyPaletteRef = useRef(journeyPathPaletteForMood(ZERO_MOOD));
  const moodRef = useRef<MoodState>({ ...ZERO_MOOD });
  const activeCategoryRef = useRef(activeCategory);
  const targetParallaxRef = useRef<ParallaxState>({ pointerX: 0, pointerY: 0, scroll: 0 });
  const smoothParallaxRef = useRef<ParallaxState>({ pointerX: 0, pointerY: 0, scroll: 0 });
  const startTimeRef = useRef<number | null>(null);
  const handoffEntranceRef = useRef(handoffEntrance);
  const handoffSyncRef = useRef(handoffSync);
  const frameRef = useRef<number | null>(null);
  const visibleRef = useRef(true);
  const reducedMotion = usePrefersReducedMotion();
  const coarsePointer = useIsCoarsePointer();

  useEffect(() => {
    activeCategoryRef.current = activeCategory;
  }, [activeCategory]);

  useEffect(() => {
    handoffEntranceRef.current = handoffEntrance;
    handoffSyncRef.current = handoffSync;
  }, [handoffEntrance, handoffSync]);

  useEffect(() => {
    if (reducedMotion || introPaused) return;

    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const context = ctx;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = root.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      journeyRef.current = buildHeroJourney(width, height);
    };

    function render(time: number) {
      if (!visibleRef.current) {
        frameRef.current = null;
        return;
      }

      if (startTimeRef.current === null) {
        const seed = handoffEntranceRef.current ?? 0;
        startTimeRef.current = time - seed * HERO_ENTRANCE_MS;
      }
      const timing = computeSceneTiming(time - startTimeRef.current);

      smoothParallaxRef.current = lerpParallax(
        smoothParallaxRef.current,
        targetParallaxRef.current,
        coarsePointer ? 0.14 : 0.07,
      );
      const parallax = smoothParallaxRef.current;
      const { pointerX: px, pointerY: py, scroll } = parallax;

      const targetMood = moodFromCategory(activeCategoryRef.current);
      moodRef.current = lerpMood(moodRef.current, targetMood, HERO_MOOD_LERP);
      const mood = moodRef.current;
      journeyPaletteRef.current = journeyPathPaletteForMood(mood);
      const atmosphere = atmosphereStyleForMood(mood);
      const moodLevel = moodIntensity(mood);

      context.save();
      context.globalAlpha = 1 - scroll * 0.28;
      context.translate(0, scroll * 28);
      context.scale(1 + scroll * 0.035, 1 + scroll * 0.035);

      drawLandscapeSky(context, width, height, parallax, timing);
      drawDaylightHaze(context, width, height, time, parallax, timing);

      const hillBoost = hillContrastBoost(mood);
      drawHillSilhouettes(
        context,
        hillsRef.current.slice(0, 2),
        width,
        height,
        time,
        parallax,
        timing,
        hillBoost,
      );
      drawLayerMists(context, mistBandsRef.current.slice(0, 1), width, height, time, parallax);

      drawHillSilhouettes(
        context,
        hillsRef.current.slice(2, 4),
        width,
        height,
        time,
        parallax,
        timing,
        hillBoost,
      );
      drawLayerMists(context, mistBandsRef.current.slice(1, 3), width, height, time, parallax);

      const journey = journeyRef.current;
      if (journey) {
        drawHeroJourneyPath(
          context,
          journey,
          width,
          height,
          time,
          parallax,
          timing,
          journeyPaletteRef.current,
        );
      }

      drawHillSilhouettes(
        context,
        hillsRef.current.slice(4),
        width,
        height,
        time,
        parallax,
        timing,
        hillBoost,
      );

      drawCategoryMoodOverlays(context, width, height, time, mood, parallax, timing);

      context.restore();

      const entrance = timing.entrance;
      if (baseGradientRef.current) {
        baseGradientRef.current.style.transform = `translate3d(${px * 10}px, ${scroll * 18 + (1 - entrance) * 10}px, 0) scale(${0.98 + entrance * 0.02 + scroll * 0.018})`;
        baseGradientRef.current.style.opacity = `${entrance * (1 - scroll * 0.18)}`;
      }
      if (canvasRef.current) {
        canvasRef.current.style.transform = `translate3d(${px * 8}px, ${scroll * 12}px, 0)`;
        canvasRef.current.style.opacity = `${0.92 + entrance * 0.08}`;
      }
      atmosphereRefs.current.forEach((layerEl, index) => {
        if (!layerEl) return;
        const depth = ATMOSPHERE_LAYERS[index]?.depth ?? 0.3;
        layerEl.style.transform = `translate3d(${px * depth * 42}px, ${py * depth * 28 + scroll * depth * 42}px, 0)`;
        layerEl.style.opacity = `${entrance * (1 - scroll * 0.28)}`;
      });
      if (moodWarmRef.current) {
        moodWarmRef.current.style.opacity = `${entrance * atmosphere.warmOpacity}`;
      }
      if (moodCoolRef.current) {
        moodCoolRef.current.style.opacity = `${Math.min(1, entrance * atmosphere.coolOpacity)}`;
      }
      if (moodEarthRef.current) {
        moodEarthRef.current.style.opacity = `${entrance * atmosphere.earthOpacity}`;
      }
      if (moodBrightRef.current) {
        moodBrightRef.current.style.opacity = `${entrance * atmosphere.brightOpacity}`;
      }
      if (moodTintRef.current) {
        const presentation = categoryMoodPresentation(activeCategoryRef.current, moodLevel);
        if (presentation) {
          moodTintRef.current.style.opacity = `${entrance * presentation.opacity}`;
          moodTintRef.current.style.background = presentation.background;
          moodTintRef.current.style.backgroundColor = "transparent";
          moodTintRef.current.style.mixBlendMode = presentation.blendMode;
        } else {
          moodTintRef.current.style.opacity = "0";
          moodTintRef.current.style.background = "none";
        }
      }
      const legibilityAdjust = legibilityEase(mood);
      if (legibilityRef.current) {
        legibilityRef.current.style.opacity = `${0.7 + entrance * 0.3 - scroll * 0.15 - moodLevel * 0.05 + legibilityAdjust}`;
      }
      if (legibilityGradRef.current) {
        legibilityGradRef.current.style.opacity = `${0.75 + entrance * 0.25 - scroll * 0.2 - moodLevel * 0.04 + legibilityAdjust * 0.8}`;
      }
      if (sectionFadeRef.current) {
        sectionFadeRef.current.style.opacity = `${Math.min(1, 0.55 + entrance * 0.35 + scroll * 0.55)}`;
      }

      frameRef.current = window.requestAnimationFrame(render);
    }

    resize();
    startTimeRef.current = null;
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);

    const updateScroll = () => {
      const rect = root.getBoundingClientRect();
      const heroHeight = rect.height || 1;
      const progress = Math.max(0, Math.min(1, -rect.top / heroHeight));
      targetParallaxRef.current.scroll = progress;
    };

    const onScroll = () => updateScroll();
    const onPointerMove = (event: PointerEvent) => {
      if (coarsePointer) return;
      const rect = root.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      targetParallaxRef.current.pointerX = nx;
      targetParallaxRef.current.pointerY = ny;
    };

    const onVisibility = () => {
      visibleRef.current = document.visibilityState === "visible";
      if (visibleRef.current && frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(render);
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const inView = entry?.isIntersecting ?? true;
        if (!inView) {
          visibleRef.current = false;
          if (frameRef.current !== null) {
            window.cancelAnimationFrame(frameRef.current);
            frameRef.current = null;
          }
          return;
        }
        visibleRef.current = document.visibilityState === "visible";
        if (visibleRef.current && frameRef.current === null) {
          frameRef.current = window.requestAnimationFrame(render);
        }
      },
      { threshold: 0.01 },
    );
    intersectionObserver.observe(root);

    visibleRef.current = true;
    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    frameRef.current = window.requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      intersectionObserver.disconnect();
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [coarsePointer, introPaused, reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <HeroBackgroundStatic />
        <LegibilityOverlay legibilityRef={legibilityRef} legibilityGradRef={legibilityGradRef} />
        <SectionFade sectionFadeRef={sectionFadeRef} />
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      data-hero-background="category-mood"
    >
      <div
        ref={baseGradientRef}
        className="absolute inset-0 bg-gradient-to-b from-[#EAF4FC] via-[#F0EDE4] to-[#E8D9C0]"
        style={{ opacity: 0 }}
      />

      {ATMOSPHERE_LAYERS.map((layer, index) => (
        <div
          key={index}
          ref={(el) => {
            atmosphereRefs.current[index] = el;
          }}
          className={layer.className}
          style={{ opacity: 0 }}
        />
      ))}

      <div
        ref={moodWarmRef}
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_28%_72%,rgba(245,210,160,0.18),transparent_70%)] transition-opacity duration-[400ms] ease-out"
        style={{ opacity: 0 }}
      />
      <div
        ref={moodCoolRef}
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_68%_34%,rgba(180,220,240,0.16),transparent_72%)] transition-opacity duration-[400ms] ease-out"
        style={{ opacity: 0 }}
      />

      <div
        ref={moodEarthRef}
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_58%_68%,rgba(190,175,135,0.16),transparent_68%)] transition-opacity duration-[400ms] ease-out"
        style={{ opacity: 0 }}
      />
      <div
        ref={moodBrightRef}
        className="absolute inset-0 bg-[radial-gradient(ellipse_85%_60%_at_50%_26%,rgba(255,253,248,0.32),transparent_70%)] transition-opacity duration-[400ms] ease-out"
        style={{ opacity: 0 }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] h-full w-full"
        style={{ opacity: 0.85 }}
      />

      <LegibilityOverlay legibilityRef={legibilityRef} legibilityGradRef={legibilityGradRef} />

      <div
        ref={moodTintRef}
        className="pointer-events-none absolute inset-0 z-[3] transition-[opacity,background] duration-[400ms] ease-out"
        style={{ opacity: 0, background: "none" }}
        aria-hidden="true"
      />

      <SectionFade sectionFadeRef={sectionFadeRef} />
    </div>
  );
}

function LegibilityOverlay({
  legibilityRef,
  legibilityGradRef,
}: {
  legibilityRef: RefObject<HTMLDivElement | null>;
  legibilityGradRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <>
      <div
        ref={legibilityRef}
        className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_88%_58%_at_50%_34%,rgba(55,65,80,0.2),transparent_74%)]"
      />
      <div
        ref={legibilityGradRef}
        className="absolute inset-0 z-[2] bg-gradient-to-b from-stone-900/16 via-stone-800/6 to-stone-900/22"
      />
    </>
  );
}

function SectionFade({
  sectionFadeRef,
}: {
  sectionFadeRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={sectionFadeRef}
      className="absolute inset-x-0 bottom-0 z-[3] h-52 bg-gradient-to-t from-stone-50 via-stone-50/88 to-transparent dark:from-stone-950 dark:via-stone-950/88"
      aria-hidden="true"
    />
  );
}
