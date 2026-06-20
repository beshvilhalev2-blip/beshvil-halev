"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import HeroAnimatedBackground from "./hero-animated-background";
import HeroIntroOverlay from "./hero-intro-overlay";
import { HeroCategoryProvider } from "./hero-category-context";
import {
  HANDOFF_HERO_ENTRANCE,
  HOME_INTRO_SESSION_KEY,
  type HandoffSignals,
} from "@/lib/hero-intro/constants";
import type { AdventureCategoryId } from "@/lib/hero-adventure-selector";

function readPrefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type HomeHeroSectionProps = {
  children: ReactNode;
};

export default function HomeHeroSection({ children }: HomeHeroSectionProps) {
  const [introDone, setIntroDone] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [ready, setReady] = useState(false);
  const [morphStarted, setMorphStarted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<AdventureCategoryId | null>("water");
  const [handoff, setHandoff] = useState<HandoffSignals>({
    morphProgress: 0,
    heroReveal: 0,
    contentReveal: 0,
    overlayOpacity: 1,
  });
  const contentRef = useRef<HTMLDivElement>(null);
  const heroLayerRef = useRef<HTMLDivElement>(null);

  const handleSetActiveCategory = useCallback((category: AdventureCategoryId | null) => {
    setActiveCategory(category);
  }, []);

  useEffect(() => {
    const reducedMotion = readPrefersReducedMotion();
    if (reducedMotion) {
      setIntroDone(true);
      setMorphStarted(true);
      setReady(true);
      return;
    }

    try {
      const seen = sessionStorage.getItem(HOME_INTRO_SESSION_KEY);
      if (seen === "1") {
        setIntroDone(true);
        setMorphStarted(true);
        setHandoff({
          morphProgress: 1,
          heroReveal: 1,
          contentReveal: 1,
          overlayOpacity: 0,
        });
      } else {
        setShowIntro(true);
      }
    } catch {
      setIntroDone(true);
      setMorphStarted(true);
      setHandoff({
        morphProgress: 1,
        heroReveal: 1,
        contentReveal: 1,
        overlayOpacity: 0,
      });
    }
    setReady(true);
  }, []);

  const handleMorphStart = useCallback(() => {
    setMorphStarted(true);
  }, []);

  const handleHandoffUpdate = useCallback((signals: HandoffSignals) => {
    setHandoff(signals);
    if (heroLayerRef.current) {
      heroLayerRef.current.style.opacity = `${signals.heroReveal}`;
    }
    if (contentRef.current) {
      const y = (1 - signals.contentReveal) * 16;
      contentRef.current.style.opacity = `${signals.contentReveal}`;
      contentRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    try {
      sessionStorage.setItem(HOME_INTRO_SESSION_KEY, "1");
    } catch {
      /* ignore storage errors */
    }
    setShowIntro(false);
    setIntroDone(true);
    setHandoff({
      morphProgress: 1,
      heroReveal: 1,
      contentReveal: 1,
      overlayOpacity: 0,
    });
    if (heroLayerRef.current) heroLayerRef.current.style.opacity = "1";
    if (contentRef.current) {
      contentRef.current.style.opacity = "1";
      contentRef.current.style.transform = "translate3d(0, 0, 0)";
    }
  }, []);

  const heroActive = morphStarted || introDone;
  const contentVisible = introDone || handoff.contentReveal > 0;

  if (!ready) {
    return (
      <section className="relative flex justify-center overflow-hidden pb-5 pt-[4rem] sm:pb-6 sm:pt-[4.5rem] lg:pb-7 lg:pt-[4.75rem]">
        <HeroAnimatedBackground activeCategory={null} introPaused handoffSync={false} />
        <HeroCategoryProvider setActiveCategory={handleSetActiveCategory}>
          <div className="relative z-10 mx-auto w-full px-4 py-6 text-center opacity-0 sm:px-6 sm:py-7 lg:px-10 lg:py-8">
            {children}
          </div>
        </HeroCategoryProvider>
      </section>
    );
  }

  return (
    <section className="relative flex justify-center overflow-hidden pb-5 pt-[4rem] sm:pb-6 sm:pt-[4.5rem] lg:pb-7 lg:pt-[4.75rem]">
      <div
        ref={heroLayerRef}
        className="absolute inset-0"
        style={{ opacity: introDone ? 1 : handoff.heroReveal }}
      >
        <HeroAnimatedBackground
          activeCategory={activeCategory}
          introPaused={!heroActive}
          handoffEntrance={morphStarted && !introDone ? HANDOFF_HERO_ENTRANCE : undefined}
          handoffSync={morphStarted && !introDone}
        />
      </div>

      <HeroCategoryProvider setActiveCategory={handleSetActiveCategory}>
        <div
          ref={contentRef}
          className="relative z-20 mx-auto w-full px-4 py-6 text-center sm:px-6 sm:py-7 lg:px-10 lg:py-8"
          style={{
            opacity: contentVisible ? (introDone ? 1 : handoff.contentReveal) : 0,
            transform: introDone
              ? undefined
              : `translate3d(0, ${(1 - handoff.contentReveal) * 16}px, 0)`,
            pointerEvents:
              contentVisible && (introDone || handoff.contentReveal > 0.3) ? "auto" : "none",
          }}
        >
          {children}
        </div>
      </HeroCategoryProvider>

      {showIntro && (
        <HeroIntroOverlay
          onComplete={handleIntroComplete}
          onMorphStart={handleMorphStart}
          onHandoffUpdate={handleHandoffUpdate}
        />
      )}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-32 bg-gradient-to-b from-transparent via-[#EDE8DF]/70 to-[#FAF8F5] sm:h-40 lg:h-44"
        aria-hidden="true"
      />
    </section>
  );
}
