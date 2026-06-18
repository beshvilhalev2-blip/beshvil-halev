"use client";

import { useCallback, useEffect, useRef } from "react";
import type { HandoffSignals } from "@/lib/hero-intro/constants";
import { INTRO_MOVEMENT_PHRASE } from "@/lib/hero-intro/constants";
import {
  buildIntroPath,
  computeIntroFrameState,
  drawIntroFrame,
  isIntroComplete,
  shouldStartHandoff,
  type IntroParticle,
} from "@/lib/hero-intro/scene";

type HeroIntroOverlayProps = {
  onComplete: () => void;
  onMorphStart: () => void;
  onHandoffUpdate: (signals: HandoffSignals) => void;
};

export default function HeroIntroOverlay({
  onComplete,
  onMorphStart,
  onHandoffUpdate,
}: HeroIntroOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const skipStartRef = useRef<number | null>(null);
  const morphStartedRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const pathRef = useRef<{ x: number; y: number }[]>([]);
  const particlesRef = useRef<IntroParticle[]>([]);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    onComplete();
  }, [onComplete]);

  const skip = useCallback(() => {
    if (completedRef.current) return;
    if (skipStartRef.current === null) {
      skipStartRef.current = performance.now();
      if (!morphStartedRef.current) {
        morphStartedRef.current = true;
        onMorphStart();
      }
    }
  }, [onMorphStart]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      pathRef.current = buildIntroPath(w, h);
      particlesRef.current = [];
    };

    const render = (time: number) => {
      if (completedRef.current) return;

      if (startTimeRef.current === null) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;
      const skipElapsed = skipStartRef.current !== null ? time - skipStartRef.current : null;

      const state = computeIntroFrameState(elapsed, skipElapsed);
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (shouldStartHandoff(state) && !morphStartedRef.current) {
        morphStartedRef.current = true;
        onMorphStart();
      }

      if (state.phase === "morph" || state.phase === "done") {
        onHandoffUpdate(state.handoff);
      }

      drawIntroFrame(context, w, h, pathRef.current, particlesRef.current, state, time);

      if (canvasWrapRef.current) {
        canvasWrapRef.current.style.transform = `translate3d(0, ${state.cameraY}px, 0) scale(${state.cameraScale})`;
      }
      if (rootRef.current) {
        rootRef.current.style.opacity = `${state.overlayOpacity}`;
        rootRef.current.style.pointerEvents = state.overlayOpacity > 0.15 ? "auto" : "none";
      }

      if (isIntroComplete(state, elapsed, skipElapsed)) {
        finish();
        return;
      }

      frameRef.current = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    startTimeRef.current = null;
    morphStartedRef.current = false;
    frameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [finish, onHandoffUpdate, onMorphStart]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] touch-none select-none"
      role="dialog"
      aria-modal="true"
      aria-label={INTRO_MOVEMENT_PHRASE}
      tabIndex={-1}
      onClick={skip}
      onKeyDown={(event) => {
        if (event.key === "Escape") skip();
      }}
    >
      <div
        ref={canvasWrapRef}
        className="absolute inset-0 origin-center will-change-transform"
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          skip();
        }}
        className="absolute left-4 top-4 z-10 rounded-full border border-white/35 bg-white/55 px-3.5 py-1.5 text-xs font-medium tracking-wide text-stone-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/75 hover:shadow-md sm:left-6 sm:top-6 sm:px-4 sm:py-2 sm:text-sm"
      >
        המשך
      </button>
    </div>
  );
}
