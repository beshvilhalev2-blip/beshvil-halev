import { LANDSCAPE } from "@/lib/hero-landscape/scene";
import {
  INTRO_DRAW_MS,
  INTRO_MORPH_MS,
  INTRO_MOVEMENT_PHRASE,
  INTRO_REVEAL_MS,
  INTRO_SKIP_HOLD_MS,
  INTRO_SKIP_MORPH_MS,
  INTRO_TOTAL_MS,
  type HandoffSignals,
} from "./constants";

export type IntroParticle = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  phase: number;
  vy: number;
};

export type IntroPhase = "draw" | "reveal" | "morph" | "done";

export type IntroFrameState = {
  phase: IntroPhase;
  drawProgress: number;
  morphProgress: number;
  brighten: number;
  pathOpen: number;
  lightEmergence: number;
  cameraScale: number;
  cameraY: number;
  overlayOpacity: number;
  glow: number;
  taglineOpacity: number;
  pathOpacity: number;
  movement: number;
  handoff: HandoffSignals;
};

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function sampleCubicBezier(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
  steps: number,
): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const u = 1 - t;
    points.push({
      x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
      y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
    });
  }
  return points;
}

export function buildIntroPath(width: number, height: number): { x: number; y: number }[] {
  const mobile = width < 768;
  return sampleCubicBezier(
    { x: width * 0.5, y: height * 0.92 },
    { x: width * (mobile ? 0.47 : 0.45), y: height * 0.74 },
    { x: width * (mobile ? 0.53 : 0.55), y: height * 0.54 },
    { x: width * 0.5, y: height * (mobile ? 0.33 : 0.31) },
    mobile ? 32 : 44,
  );
}

export function buildIntroParticles(width: number, height: number, count: number): IntroParticle[] {
  const particles: IntroParticle[] = [];
  for (let i = 0; i < count; i += 1) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height * 0.85,
      radius: 0.4 + Math.random() * 1.4,
      alpha: 0.12 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      vy: -0.008 - Math.random() * 0.018,
    });
  }
  return particles;
}

function buildMorphState(morphProgress: number): IntroFrameState {
  const mp = morphProgress;
  const pathOpen = easeOutCubic(Math.min(1, mp / 0.42));
  const lightEmergence = easeOutCubic(Math.max(0, (mp - 0.24) / 0.52));
  const brighten = easeInOutSine(Math.max(0, (mp - 0.12) / 0.88));

  const heroReveal = easeOutCubic(Math.max(0, (mp - 0.4) / 0.6));
  const contentReveal = easeOutCubic(Math.max(0, (mp - 0.58) / 0.42));
  const overlayOpacity =
    mp < 0.72 ? 1 : 1 - easeOutCubic((mp - 0.72) / 0.28) * 0.96;

  return {
    phase: mp >= 1 ? "done" : "morph",
    drawProgress: 1,
    morphProgress: mp,
    brighten,
    pathOpen,
    lightEmergence,
    cameraScale: lerp(1.018, 1, easeOutCubic(Math.max(0, (mp - 0.2) / 0.8))),
    cameraY: lerp(4, -6, easeOutCubic(Math.max(0, (mp - 0.25) / 0.75))),
    overlayOpacity,
    glow: lerp(1, 1.18, lightEmergence),
    taglineOpacity: Math.max(0, 0.88 - mp * 2.8),
    pathOpacity: lerp(1, 0.72, Math.max(0, (mp - 0.82) / 0.18)),
    movement: lerp(0.88, 1, mp),
    handoff: { morphProgress: mp, heroReveal, contentReveal, overlayOpacity },
  };
}

export function computeIntroFrameState(
  elapsed: number,
  skipElapsed: number | null,
): IntroFrameState {
  if (skipElapsed !== null) {
    if (skipElapsed < INTRO_SKIP_HOLD_MS) {
      return {
        phase: "reveal",
        drawProgress: 1,
        morphProgress: 0,
        brighten: 0,
        pathOpen: 0,
        lightEmergence: 0,
        cameraScale: 1.022,
        cameraY: 5,
        overlayOpacity: 1,
        glow: 1.05,
        taglineOpacity: 0.75,
        pathOpacity: 1,
        movement: 1,
        handoff: { morphProgress: 0, heroReveal: 0, contentReveal: 0, overlayOpacity: 1 },
      };
    }
    const morphT = Math.min(1, (skipElapsed - INTRO_SKIP_HOLD_MS) / INTRO_SKIP_MORPH_MS);
    return buildMorphState(morphT);
  }

  if (elapsed < INTRO_DRAW_MS) {
    const raw = elapsed / INTRO_DRAW_MS;
    const drawProgress = easeInOutQuad(raw);
    const movement = easeInOutSine(raw);
    return {
      phase: "draw",
      drawProgress,
      morphProgress: 0,
      brighten: 0,
      pathOpen: 0,
      lightEmergence: 0,
      cameraScale: lerp(1.028, 1.022, movement),
      cameraY: lerp(22, 6, movement),
      overlayOpacity: 1,
      glow: 0.3 + drawProgress * 0.68,
      taglineOpacity: 0,
      pathOpacity: drawProgress,
      movement,
      handoff: { morphProgress: 0, heroReveal: 0, contentReveal: 0, overlayOpacity: 1 },
    };
  }

  if (elapsed < INTRO_DRAW_MS + INTRO_REVEAL_MS) {
    const hold = (elapsed - INTRO_DRAW_MS) / INTRO_REVEAL_MS;
    const breathe = 1 + Math.sin(hold * Math.PI) * 0.06;
    const tagIn = easeOutCubic(Math.min(1, hold * 2.2));
    const tagOut = hold > 0.65 ? 1 - (hold - 0.65) / 0.35 : 1;
    return {
      phase: "reveal",
      drawProgress: 1,
      morphProgress: 0,
      brighten: 0,
      pathOpen: 0,
      lightEmergence: 0,
      cameraScale: 1.022,
      cameraY: lerp(6, 4, hold),
      overlayOpacity: 1,
      glow: breathe,
      taglineOpacity: tagIn * tagOut * 0.88,
      pathOpacity: 1,
      movement: 1,
      handoff: { morphProgress: 0, heroReveal: 0, contentReveal: 0, overlayOpacity: 1 },
    };
  }

  const morphStart = INTRO_DRAW_MS + INTRO_REVEAL_MS;
  const morphT = Math.min(1, (elapsed - morphStart) / INTRO_MORPH_MS);
  return buildMorphState(morphT);
}

function pointAlongPath(
  points: { x: number; y: number }[],
  t: number,
): { x: number; y: number } {
  const clamped = Math.max(0, Math.min(1, t));
  const index = clamped * (points.length - 1);
  const i = Math.floor(index);
  const frac = index - i;
  const a = points[i]!;
  const b = points[Math.min(i + 1, points.length - 1)]!;
  return { x: a.x + (b.x - a.x) * frac, y: a.y + (b.y - a.y) * frac };
}

function drawFullTrail(ctx: CanvasRenderingContext2D, points: { x: number; y: number }[]) {
  ctx.beginPath();
  ctx.moveTo(points[0]!.x, points[0]!.y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i]!.x, points[i]!.y);
  }
}

function drawPartialTrail(
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number }[],
  progress: number,
) {
  const total = points.length - 1;
  const drawTo = progress * total;
  const lastIndex = Math.floor(drawTo);
  const frac = drawTo - lastIndex;

  ctx.beginPath();
  ctx.moveTo(points[0]!.x, points[0]!.y);
  for (let i = 1; i <= lastIndex; i += 1) {
    ctx.lineTo(points[i]!.x, points[i]!.y);
  }
  if (frac > 0 && lastIndex < total) {
    const a = points[lastIndex]!;
    const b = points[lastIndex + 1]!;
    ctx.lineTo(a.x + (b.x - a.x) * frac, a.y + (b.y - a.y) * frac);
  }
}

function offsetPathPoints(
  points: { x: number; y: number }[],
  width: number,
  height: number,
  offset: number,
): { x: number; y: number }[] {
  return points.map((point) => {
    const depth = 1 - point.y / height;
    const shift = offset * (0.35 + depth * 0.65);
    return { x: point.x + shift, y: point.y };
  });
}

function drawSky(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  brighten: number,
) {
  const b = brighten;
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, lerpColor("#EAF4FC", LANDSCAPE.skyTop, b * 0.35));
  sky.addColorStop(0.34, lerpColor("#DCEEF8", LANDSCAPE.skyMid, b * 0.28));
  sky.addColorStop(0.58, lerpColor("#F2E8D6", LANDSCAPE.skyHorizon, b * 0.22));
  sky.addColorStop(0.78, lerpColor("#D4E0B8", LANDSCAPE.hillFar, b * 0.18));
  sky.addColorStop(0.9, lerpColor("#C8B896", LANDSCAPE.hillNear, b * 0.12));
  sky.addColorStop(1, lerpColor("#E8D9C0", LANDSCAPE.skyLow, b * 0.08));
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);
}

function lerpColor(from: string, to: string, t: number): string {
  const f = hexToRgb(from);
  const tt = hexToRgb(to);
  const r = Math.round(lerp(f.r, tt.r, t));
  const g = Math.round(lerp(f.g, tt.g, t));
  const bl = Math.round(lerp(f.b, tt.b, t));
  return `rgb(${r}, ${g}, ${bl})`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function drawIntroFrame(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  pathPoints: { x: number; y: number }[],
  _particles: IntroParticle[],
  state: IntroFrameState,
  time: number,
) {
  drawSky(ctx, width, height, state.brighten);

  const daylightStrength = 0.22 + state.brighten * 0.18;
  const daylight = ctx.createRadialGradient(
    width * 0.7,
    height * 0.18,
    0,
    width * 0.7,
    height * 0.18,
    Math.min(width, height) * (0.36 + state.brighten * 0.06),
  );
  daylight.addColorStop(0, `rgba(255, 253, 248, ${daylightStrength * state.glow})`);
  daylight.addColorStop(0.4, `rgba(245, 235, 215, ${daylightStrength * 0.42 * state.glow})`);
  daylight.addColorStop(1, "rgba(234, 244, 252, 0)");
  ctx.fillStyle = daylight;
  ctx.fillRect(0, 0, width, height);

  const hillAlpha = lerp(0.16, 0.28, state.brighten);
  ctx.fillStyle = LANDSCAPE.hillFar;
  ctx.globalAlpha = hillAlpha;
  ctx.beginPath();
  ctx.moveTo(0, height);
  for (let i = 0; i <= 8; i += 1) {
    const t = i / 8;
    ctx.lineTo(t * width, height * 0.66 + Math.sin(t * Math.PI * 2.1) * height * 0.035);
  }
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = LANDSCAPE.hillNear;
  ctx.globalAlpha = hillAlpha * 1.15;
  ctx.beginPath();
  ctx.moveTo(0, height);
  for (let i = 0; i <= 10; i += 1) {
    const t = i / 10;
    ctx.lineTo(t * width, height * 0.76 + Math.sin(t * Math.PI * 2.8 + 0.5) * height * 0.03);
  }
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;

  for (let m = 0; m < 2; m += 1) {
    const y = height * (0.52 + m * 0.11) + Math.sin(time * 0.0005 + m) * 4;
    const mist = ctx.createLinearGradient(0, y, 0, y + height * 0.12);
    mist.addColorStop(0, "rgba(234, 244, 252, 0)");
    mist.addColorStop(0.5, `rgba(240, 232, 215, ${0.12 + state.brighten * 0.08 - m * 0.03})`);
    mist.addColorStop(1, "rgba(234, 244, 252, 0)");
    ctx.fillStyle = mist;
    ctx.fillRect(0, y, width, height * 0.12);
  }

  const trailProgress = state.phase === "draw" ? state.drawProgress : 1;
  const pathAlpha = state.pathOpacity;

  if (state.phase === "draw") {
    drawFullTrail(ctx, pathPoints);
    ctx.strokeStyle = "rgba(212, 188, 146, 0.14)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 9]);
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.setLineDash([]);
  }

  if (trailProgress > 0.008) {
    ctx.save();
    ctx.globalAlpha = pathAlpha;
    drawPartialTrail(ctx, pathPoints, trailProgress);
    ctx.strokeStyle = "rgba(228, 210, 178, 0.38)";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    drawPartialTrail(ctx, pathPoints, trailProgress);
    ctx.strokeStyle = "rgba(212, 188, 146, 0.62)";
    ctx.lineWidth = 3;
    ctx.stroke();

    drawPartialTrail(ctx, pathPoints, trailProgress);
    ctx.strokeStyle = "rgba(196, 172, 130, 0.88)";
    ctx.lineWidth = 1.1;
    ctx.stroke();
    ctx.restore();
  }

  if (state.pathOpen > 0.02) {
    const split = easeOutCubic(state.pathOpen) * width * 0.055;
    const leftPath = offsetPathPoints(pathPoints, width, height, -split);
    const rightPath = offsetPathPoints(pathPoints, width, height, split);

    ctx.save();
    ctx.globalAlpha = pathAlpha * state.pathOpen * 0.55;
    drawFullTrail(ctx, leftPath);
    ctx.strokeStyle = "rgba(228, 210, 178, 0.42)";
    ctx.lineWidth = 5 + state.pathOpen * 4;
    ctx.lineCap = "round";
    ctx.stroke();
    drawFullTrail(ctx, rightPath);
    ctx.stroke();
    ctx.restore();

    const horizon = pointAlongPath(pathPoints, 1);
    const reveal = ctx.createRadialGradient(
      horizon.x,
      horizon.y,
      0,
      horizon.x,
      horizon.y,
      Math.min(width, height) * (0.22 + state.pathOpen * 0.38),
    );
    reveal.addColorStop(0, `rgba(255, 253, 248, ${state.pathOpen * 0.55})`);
    reveal.addColorStop(0.45, `rgba(234, 244, 252, ${state.pathOpen * 0.32})`);
    reveal.addColorStop(1, "rgba(234, 244, 252, 0)");
    ctx.fillStyle = reveal;
    ctx.fillRect(0, 0, width, height);
  }

  if (state.lightEmergence > 0.03) {
    const horizon = pointAlongPath(pathPoints, 1);
    const dawn = ctx.createRadialGradient(
      horizon.x,
      horizon.y,
      0,
      horizon.x,
      horizon.y,
      Math.min(width, height) * (0.4 + state.lightEmergence * 0.32),
    );
    dawn.addColorStop(0, `rgba(255, 253, 248, ${state.lightEmergence * 0.42})`);
    dawn.addColorStop(0.45, `rgba(234, 244, 252, ${state.lightEmergence * 0.24})`);
    dawn.addColorStop(1, "rgba(234, 244, 252, 0)");
    ctx.fillStyle = dawn;
    ctx.fillRect(0, 0, width, height);
  }

  if (state.taglineOpacity > 0.02) {
    const anchor = pointAlongPath(pathPoints, 1);
    const fontSize = Math.max(14, Math.min(width * 0.028, 26));
    ctx.save();
    ctx.font = `500 ${fontSize}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = `rgba(42, 52, 58, ${state.taglineOpacity * 0.92})`;
    ctx.shadowColor = "rgba(255, 255, 255, 0.75)";
    ctx.shadowBlur = 16;
    ctx.fillText(INTRO_MOVEMENT_PHRASE, anchor.x, anchor.y - 40);
    ctx.restore();
  }

  if (state.brighten > 0.05) {
    const lift = ctx.createRadialGradient(
      width * 0.5,
      height * 0.42,
      0,
      width * 0.5,
      height * 0.42,
      Math.min(width, height) * 0.68,
    );
    lift.addColorStop(0, `rgba(255, 253, 248, ${state.brighten * 0.14})`);
    lift.addColorStop(1, "rgba(234, 244, 252, 0)");
    ctx.fillStyle = lift;
    ctx.fillRect(0, 0, width, height);
  }
}

export function isIntroComplete(
  _state: IntroFrameState,
  elapsed: number,
  skipElapsed: number | null,
): boolean {
  if (skipElapsed !== null) {
    return skipElapsed >= INTRO_SKIP_HOLD_MS + INTRO_SKIP_MORPH_MS;
  }
  return elapsed >= INTRO_TOTAL_MS;
}

export function shouldStartHandoff(state: IntroFrameState): boolean {
  return state.phase === "morph" && state.morphProgress > 0.02;
}

export type { HandoffSignals };
