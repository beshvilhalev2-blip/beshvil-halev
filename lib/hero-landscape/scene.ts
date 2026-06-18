export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phase: number;
  depth: number;
  warmth: number;
};

export type HillLayer = {
  baseY: number;
  amplitude: number;
  frequency: number;
  phase: number;
  color: string;
  opacity: number;
  parallax: number;
};

export type MistBand = {
  yRatio: number;
  heightRatio: number;
  opacity: number;
  parallax: number;
};

export type LightBeam = {
  originX: number;
  originY: number;
  angle: number;
  length: number;
  width: number;
  speed: number;
  phase: number;
  opacity: number;
};

export type DestinationPoint = {
  t: number;
  phase: number;
  depth: number;
};

export type HeroJourney = {
  pathPoints: { x: number; y: number }[];
  destinations: DestinationPoint[];
};

export type JourneyPathPalette = {
  glow: string;
  mid: string;
  core: string;
  strength: number;
};

export const DEFAULT_JOURNEY_PATH: JourneyPathPalette = {
  glow: "rgba(228, 210, 178, 0.38)",
  mid: "rgba(212, 188, 146, 0.52)",
  core: "rgba(196, 172, 130, 0.72)",
  strength: 1,
};

export type ParallaxState = {
  pointerX: number;
  pointerY: number;
  scroll: number;
};

export type SceneTiming = {
  elapsed: number;
  entrance: number;
  breathe: number;
};

export const LANDSCAPE = {
  skyTop: "#EAF4FC",
  skyMid: "#DCEEF8",
  skyHorizon: "#F2E8D6",
  skyLow: "#E8D9C0",
  daylightCore: "#FFFDF8",
  daylightGlow: "#F5EBD8",
  hillSkyline: "#C9D6AD",
  hillDistant: "#B8C89A",
  hillFar: "#9FB07E",
  hillMid: "#8FA06E",
  hillNear: "#A8926E",
  hillForeground: "#8B7658",
  pathGlow: "#F2E8D4",
  pathMid: "#E2D0AD",
  pathCore: "#D4BC92",
  particleGold: "#F2E8D4",
  particlePeach: "#E2D0AD",
  particleAmber: "#D4BC92",
  destinationCore: "#F2E8D4",
  destinationHalo: "#E2D0AD",
} as const;

/** @deprecated Use LANDSCAPE — kept for internal references during transition. */
export const SUNRISE = LANDSCAPE;

const POINTER_STrength = 52;
const SCROLL_STrength = 48;
export const HERO_ENTRANCE_MS = 2800;
const ENTRANCE_MS = HERO_ENTRANCE_MS;

import { easeOutCubic, easeOutQuart } from "./scene-utils";

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

function pointAlongPath(
  points: { x: number; y: number }[],
  t: number,
): { x: number; y: number } {
  if (points.length === 0) return { x: 0, y: 0 };
  if (points.length === 1) return points[0]!;
  const clamped = Math.max(0, Math.min(1, t));
  const index = clamped * (points.length - 1);
  const i = Math.floor(index);
  const frac = index - i;
  const a = points[i]!;
  const b = points[Math.min(i + 1, points.length - 1)]!;
  return { x: a.x + (b.x - a.x) * frac, y: a.y + (b.y - a.y) * frac };
}

export function computeSceneTiming(elapsed: number): SceneTiming {
  const entrance = easeOutCubic(Math.min(1, elapsed / ENTRANCE_MS));
  return { elapsed, entrance, breathe: elapsed };
}

export function buildHillLayers(): HillLayer[] {
  return [
    {
      baseY: 0.4,
      amplitude: 0.022,
      frequency: 0.75,
      phase: 0.4,
      color: LANDSCAPE.hillSkyline,
      opacity: 0.14,
      parallax: 0.05,
    },
    {
      baseY: 0.48,
      amplitude: 0.03,
      frequency: 1.0,
      phase: 0.15,
      color: LANDSCAPE.hillDistant,
      opacity: 0.2,
      parallax: 0.09,
    },
    {
      baseY: 0.58,
      amplitude: 0.042,
      frequency: 1.5,
      phase: 0.9,
      color: LANDSCAPE.hillFar,
      opacity: 0.3,
      parallax: 0.16,
    },
    {
      baseY: 0.68,
      amplitude: 0.05,
      frequency: 2.0,
      phase: 1.8,
      color: LANDSCAPE.hillMid,
      opacity: 0.4,
      parallax: 0.28,
    },
    {
      baseY: 0.78,
      amplitude: 0.048,
      frequency: 2.6,
      phase: 2.6,
      color: LANDSCAPE.hillNear,
      opacity: 0.52,
      parallax: 0.4,
    },
    {
      baseY: 0.88,
      amplitude: 0.038,
      frequency: 3.2,
      phase: 3.8,
      color: LANDSCAPE.hillForeground,
      opacity: 0.62,
      parallax: 0.55,
    },
  ];
}

export function buildMistBands(): MistBand[] {
  return [
    { yRatio: 0.42, heightRatio: 0.1, opacity: 0.12, parallax: 0.07 },
    { yRatio: 0.54, heightRatio: 0.09, opacity: 0.14, parallax: 0.14 },
    { yRatio: 0.64, heightRatio: 0.08, opacity: 0.16, parallax: 0.22 },
    { yRatio: 0.74, heightRatio: 0.07, opacity: 0.18, parallax: 0.32 },
  ];
}

/** Main hero journey — rises from search area into distant hills. */
export function buildHeroJourney(width: number, height: number): HeroJourney {
  const isMobile = width < 768;
  const start = { x: width * (isMobile ? 0.5 : 0.48), y: height * 0.91 };
  const cp1 = { x: width * (isMobile ? 0.44 : 0.42), y: height * 0.74 };
  const cp2 = { x: width * (isMobile ? 0.62 : 0.68), y: height * 0.52 };
  const end = { x: width * (isMobile ? 0.7 : 0.76), y: height * 0.34 };

  const pathPoints = sampleCubicBezier(start, cp1, cp2, end, isMobile ? 28 : 40);

  return {
    pathPoints,
    destinations: [
      { t: 0.18, phase: 0, depth: 0.75 },
      { t: 0.38, phase: 1.3, depth: 0.55 },
      { t: 0.55, phase: 2.4, depth: 0.38 },
      { t: 0.72, phase: 3.5, depth: 0.22 },
      { t: 0.86, phase: 4.8, depth: 0.1 },
    ],
  };
}

export function buildLightBeams(width: number, height: number): LightBeam[] {
  return [
    {
      originX: width * 0.84,
      originY: height * 0.1,
      angle: -0.52,
      length: height * 1.15,
      width: width * 0.24,
      speed: 0.00004,
      phase: 0,
      opacity: 0.16,
    },
    {
      originX: width * 0.78,
      originY: height * 0.06,
      angle: -0.35,
      length: height * 1.0,
      width: width * 0.18,
      speed: 0.000032,
      phase: 1.6,
      opacity: 0.11,
    },
    {
      originX: width * 0.9,
      originY: height * 0.16,
      angle: -0.6,
      length: height * 0.9,
      width: width * 0.13,
      speed: 0.000048,
      phase: 3.1,
      opacity: 0.09,
    },
  ];
}

export function createSunriseParticles(
  width: number,
  height: number,
  count: number,
): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < count; i += 1) {
    const depth = Math.random();
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height * (0.3 + depth * 0.5),
      vx: (Math.random() - 0.5) * (0.04 + depth * 0.05),
      vy: (Math.random() - 0.5) * 0.03 - 0.012,
      radius: 0.6 + Math.random() * (1.2 + depth * 1.6),
      alpha: 0.2 + Math.random() * 0.35 + depth * 0.14,
      phase: Math.random() * Math.PI * 2,
      depth,
      warmth: Math.random(),
    });
  }

  return particles;
}

function hillPath(
  width: number,
  height: number,
  layer: HillLayer,
  time: number,
  parallax: ParallaxState,
): Path2D {
  const path = new Path2D();
  const shiftX =
    parallax.pointerX * POINTER_STrength * layer.parallax +
    parallax.scroll * SCROLL_STrength * layer.parallax;
  const shiftY = parallax.pointerY * 12 * layer.parallax + parallax.scroll * 20 * layer.parallax;
  const drift = Math.sin(time * 0.00007 + layer.phase) * (3 + layer.parallax * 4);
  const baseY = height * layer.baseY + drift + shiftY;

  path.moveTo(-30 + shiftX, height + 30);
  path.lineTo(-30 + shiftX, baseY);

  const segments = Math.max(12, Math.floor(width / 60));
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const x = t * (width + 60) - 30 + shiftX;
    const wave =
      Math.sin(t * Math.PI * layer.frequency + layer.phase + time * 0.00005) *
      height *
      layer.amplitude;
    const ripple =
      Math.sin(t * Math.PI * 4.5 + layer.phase * 2) * height * (layer.amplitude * 0.22);
    path.lineTo(x, baseY + wave + ripple);
  }

  path.lineTo(width + 30 + shiftX, height + 30);
  path.closePath();
  return path;
}

function particleColor(warmth: number): [string, string] {
  if (warmth < 0.33) return [LANDSCAPE.pathGlow, LANDSCAPE.pathMid];
  if (warmth < 0.66) return [LANDSCAPE.pathMid, LANDSCAPE.pathCore];
  return [LANDSCAPE.pathCore, "#C4AA82"];
}

export function drawLandscapeSky(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  parallax: ParallaxState,
  timing: SceneTiming,
) {
  const shiftY = parallax.scroll * 22 - timing.entrance * 6;
  const shiftX = parallax.pointerX * 8;
  const sky = ctx.createLinearGradient(shiftX, -shiftY, shiftX, height - shiftY * 0.4);
  sky.addColorStop(0, LANDSCAPE.skyTop);
  sky.addColorStop(0.38, LANDSCAPE.skyMid);
  sky.addColorStop(0.62, LANDSCAPE.skyHorizon);
  sky.addColorStop(1, LANDSCAPE.skyLow);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);
}

/** @deprecated Use drawLandscapeSky */
export function drawSunriseSky(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  parallax: ParallaxState,
  timing: SceneTiming,
) {
  drawLandscapeSky(ctx, width, height, parallax, timing);
}

export function drawDaylightHaze(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  parallax: ParallaxState,
  timing: SceneTiming,
) {
  const cx = width * 0.72 + parallax.pointerX * 18 + parallax.scroll * 8;
  const cy = height * 0.16 + parallax.pointerY * 10 + parallax.scroll * 6;
  const breathe = 1 + Math.sin(time * 0.00006) * 0.025;
  const entranceScale = 0.7 + timing.entrance * 0.3;
  const radius = Math.min(width, height) * 0.38 * breathe * entranceScale;

  const haze = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  haze.addColorStop(0, `rgba(255, 253, 248, ${0.55 * timing.entrance})`);
  haze.addColorStop(0.35, `rgba(245, 235, 215, ${0.28 * timing.entrance})`);
  haze.addColorStop(0.65, `rgba(230, 240, 248, ${0.12 * timing.entrance})`);
  haze.addColorStop(1, "rgba(234, 244, 252, 0)");

  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, width, height);

  const horizon = ctx.createLinearGradient(0, height * 0.28, 0, height * 0.58);
  horizon.addColorStop(0, `rgba(255, 252, 245, ${0.18 * timing.entrance})`);
  horizon.addColorStop(1, "rgba(234, 244, 252, 0)");
  ctx.fillStyle = horizon;
  ctx.fillRect(0, 0, width, height);
}

/** @deprecated Use drawDaylightHaze */
export function drawSunBloom(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  parallax: ParallaxState,
  timing: SceneTiming,
) {
  drawDaylightHaze(ctx, width, height, time, parallax, timing);
}

export function drawLightSweep(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  parallax: ParallaxState,
  timing: SceneTiming,
) {
  const sweepPhase = (time * 0.000045 + timing.entrance * 0.25) % 1;
  const x = -width * 0.35 + sweepPhase * width * 1.7 + parallax.pointerX * 10;
  const grad = ctx.createLinearGradient(x, 0, x + width * 0.5, height);
  const strength = 0.14 * timing.entrance;

  grad.addColorStop(0, "rgba(255, 245, 238, 0)");
  grad.addColorStop(0.3, `rgba(255, 225, 190, ${strength * 0.5})`);
  grad.addColorStop(0.48, `rgba(255, 205, 165, ${strength})`);
  grad.addColorStop(0.62, `rgba(255, 220, 185, ${strength * 0.55})`);
  grad.addColorStop(1, "rgba(255, 245, 238, 0)");

  ctx.save();
  ctx.globalCompositeOperation = "soft-light";
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

export function drawHazeDrift(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  parallax: ParallaxState,
  timing: SceneTiming,
) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";

  for (let i = 0; i < 2; i += 1) {
    const phase = time * 0.00006 + i * 2.4;
    const cx =
      width * (0.3 + i * 0.35) +
      Math.sin(phase) * width * 0.1 +
      parallax.pointerX * (8 + i * 4);
    const cy = height * (0.35 + i * 0.08) + Math.cos(phase * 0.7) * height * 0.03;
    const radius = Math.min(width, height) * (0.35 + i * 0.08);

    const haze = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    haze.addColorStop(0, `rgba(255, 210, 175, ${(0.08 - i * 0.02) * timing.entrance})`);
    haze.addColorStop(0.55, `rgba(255, 185, 155, ${(0.04 - i * 0.01) * timing.entrance})`);
    haze.addColorStop(1, "rgba(255, 245, 238, 0)");

    ctx.fillStyle = haze;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.restore();
}

export function drawLightBeams(
  ctx: CanvasRenderingContext2D,
  beams: LightBeam[],
  width: number,
  height: number,
  time: number,
  parallax: ParallaxState,
  timing: SceneTiming,
) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = timing.entrance;

  for (const beam of beams) {
    const travel = Math.sin(time * beam.speed + beam.phase) * width * 0.07;
    const sway = Math.sin(time * beam.speed * 0.65 + beam.phase * 1.2) * 0.045;
    const ox = beam.originX + travel + parallax.pointerX * 18 + parallax.scroll * 22;
    const oy = beam.originY + parallax.pointerY * 10 + parallax.scroll * 14;

    ctx.save();
    ctx.translate(ox, oy);
    ctx.rotate(beam.angle + sway);

    const beamGrad = ctx.createLinearGradient(0, 0, 0, beam.length);
    beamGrad.addColorStop(0, `rgba(255, 228, 181, ${beam.opacity * 1.3})`);
    beamGrad.addColorStop(0.35, `rgba(255, 200, 150, ${beam.opacity * 0.65})`);
    beamGrad.addColorStop(0.72, `rgba(255, 180, 140, ${beam.opacity * 0.22})`);
    beamGrad.addColorStop(1, "rgba(255, 245, 238, 0)");

    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.ellipse(
      beam.width * 0.5,
      beam.length * 0.45,
      beam.width * 0.5,
      beam.length * 0.55,
      0,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    ctx.restore();
  }

  ctx.restore();
}

export function drawGlowWaves(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  parallax: ParallaxState,
  timing: SceneTiming,
) {
  ctx.save();
  ctx.globalCompositeOperation = "soft-light";

  for (let i = 0; i < 3; i += 1) {
    const phase = time * 0.00007 + i * 1.9;
    const cx =
      width * (0.52 + i * 0.1) +
      Math.sin(phase) * width * 0.09 +
      parallax.pointerX * 14;
    const cy =
      height * (0.22 + i * 0.07) +
      Math.cos(phase * 0.75) * height * 0.045 +
      parallax.pointerY * 8;
    const radius = Math.min(width, height) * (0.26 + i * 0.07);

    const wave = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    wave.addColorStop(0, `rgba(255, 210, 170, ${(0.14 - i * 0.028) * timing.entrance})`);
    wave.addColorStop(0.5, `rgba(255, 180, 150, ${(0.07 - i * 0.014) * timing.entrance})`);
    wave.addColorStop(1, "rgba(255, 245, 238, 0)");

    ctx.fillStyle = wave;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.restore();
}

export function drawLayerMists(
  ctx: CanvasRenderingContext2D,
  bands: MistBand[],
  width: number,
  height: number,
  time: number,
  parallax: ParallaxState,
) {
  for (const band of bands) {
    const drift = Math.sin(time * 0.0001 + band.yRatio * 5) * 10;
    const shiftX = parallax.pointerX * 22 * band.parallax + parallax.scroll * 26 * band.parallax;
    const y = height * band.yRatio + drift + parallax.scroll * 16 * band.parallax;
    const bandHeight = height * band.heightRatio;

    const mist = ctx.createLinearGradient(0, y, 0, y + bandHeight);
    mist.addColorStop(0, "rgba(234, 244, 252, 0)");
    mist.addColorStop(0.35, `rgba(240, 232, 215, ${band.opacity})`);
    mist.addColorStop(0.75, `rgba(232, 225, 208, ${band.opacity * 0.55})`);
    mist.addColorStop(1, "rgba(234, 244, 252, 0)");

    ctx.fillStyle = mist;
    ctx.fillRect(-30 + shiftX, y - bandHeight * 0.35, width + 60, bandHeight * 1.7);
  }
}

export function drawHillSilhouettes(
  ctx: CanvasRenderingContext2D,
  layers: HillLayer[],
  width: number,
  height: number,
  time: number,
  parallax: ParallaxState,
  timing: SceneTiming,
  opacityBoost = 1,
) {
  const scrollFade = 1 - parallax.scroll * 0.28;
  const entranceFade = 0.4 + timing.entrance * 0.6;

  for (const layer of layers) {
    const path = hillPath(width, height, layer, time, parallax);
    ctx.fillStyle = layer.color;
    ctx.globalAlpha = layer.opacity * scrollFade * entranceFade * opacityBoost;
    ctx.fill(path);
  }
  ctx.globalAlpha = 1;
}

export function drawValleyMist(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  parallax: ParallaxState,
) {
  const mistY = height * 0.58 + parallax.scroll * 32;
  const drift = Math.sin(time * 0.00009) * 12;
  const shiftX = parallax.pointerX * 16 + parallax.scroll * 22;
  const mist = ctx.createLinearGradient(0, mistY + drift, 0, height);
  mist.addColorStop(0, "rgba(232, 213, 188, 0)");
  mist.addColorStop(0.28, "rgba(240, 220, 200, 0.48)");
  mist.addColorStop(1, "rgba(250, 245, 238, 0.92)");
  ctx.fillStyle = mist;
  ctx.fillRect(-shiftX, mistY + drift - 55, width + Math.abs(shiftX) * 2, height - mistY + 90);
}

function drawPartialPath(
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number }[],
  progress: number,
  shiftX: number,
  shiftY: number,
  time: number,
) {
  const total = points.length - 1;
  const drawTo = progress * total;
  const lastIndex = Math.floor(drawTo);
  const frac = drawTo - lastIndex;

  ctx.beginPath();
  const start = points[0]!;
  ctx.moveTo(start.x + shiftX, start.y + shiftY);

  for (let i = 1; i <= lastIndex; i += 1) {
    const p = points[i]!;
    const wobble = Math.sin(time * 0.0002 + i * 0.3) * 0.6;
    ctx.lineTo(p.x + shiftX + wobble, p.y + shiftY);
  }

  if (frac > 0 && lastIndex < total) {
    const a = points[lastIndex]!;
    const b = points[lastIndex + 1]!;
    ctx.lineTo(a.x + (b.x - a.x) * frac + shiftX, a.y + (b.y - a.y) * frac + shiftY);
  }
}

export function drawHeroJourneyPath(
  ctx: CanvasRenderingContext2D,
  journey: HeroJourney,
  width: number,
  height: number,
  time: number,
  parallax: ParallaxState,
  timing: SceneTiming,
  palette: JourneyPathPalette = DEFAULT_JOURNEY_PATH,
) {
  const pathProgress = 0.35 + easeOutQuart(Math.min(1, timing.entrance * 1.05)) * 0.65;
  const shiftX = parallax.pointerX * 16 + parallax.scroll * 14;
  const shiftY = parallax.pointerY * 9 + parallax.scroll * 12;
  const scrollFade = 1 - parallax.scroll * 0.35;
  const strength = palette.strength;

  ctx.save();
  ctx.globalAlpha = scrollFade * timing.entrance * strength;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  drawPartialPath(ctx, journey.pathPoints, pathProgress, shiftX, shiftY, time);
  ctx.strokeStyle = palette.glow;
  ctx.lineWidth = 5.5;
  ctx.stroke();

  drawPartialPath(ctx, journey.pathPoints, pathProgress, shiftX, shiftY, time);
  const endPoint = pointAlongPath(journey.pathPoints, pathProgress);
  const startPoint = journey.pathPoints[0]!;
  const trailGrad = ctx.createLinearGradient(
    startPoint.x + shiftX,
    startPoint.y + shiftY,
    endPoint.x + shiftX,
    endPoint.y + shiftY,
  );
  trailGrad.addColorStop(0, palette.mid);
  trailGrad.addColorStop(0.55, palette.mid);
  trailGrad.addColorStop(1, palette.glow);
  ctx.strokeStyle = trailGrad;
  ctx.lineWidth = 2.2;
  ctx.stroke();

  drawPartialPath(ctx, journey.pathPoints, pathProgress, shiftX, shiftY, time);
  ctx.strokeStyle = palette.core;
  ctx.lineWidth = 0.85;
  ctx.stroke();

  ctx.restore();
}

export function drawDestinationPoints(
  ctx: CanvasRenderingContext2D,
  journey: HeroJourney,
  time: number,
  parallax: ParallaxState,
  timing: SceneTiming,
) {
  const pathProgress = easeOutQuart(Math.min(1, timing.entrance * 1.05));
  const shiftX = parallax.pointerX * 14 + parallax.scroll * 16;
  const shiftY = parallax.pointerY * 8 + parallax.scroll * 10;
  const scrollFade = 1 - parallax.scroll * 0.5;

  for (const dest of journey.destinations) {
    if (pathProgress < dest.t - 0.04) continue;

    const reveal = easeOutCubic(Math.min(1, (pathProgress - dest.t + 0.06) / 0.12));
    const point = pointAlongPath(journey.pathPoints, dest.t);
    const depthShift = 6 + dest.depth * 16;
    const x = point.x + shiftX + parallax.pointerX * depthShift * 0.3;
    const y = point.y + shiftY + parallax.pointerY * depthShift * 0.2;
    const pulse = 0.75 + Math.sin(time * 0.0018 + dest.phase) * 0.25;
    const size = (2.2 + dest.depth * 1.8) * pulse;

    ctx.save();
    ctx.globalAlpha = reveal * scrollFade * 0.85;

    const halo = ctx.createRadialGradient(x, y, 0, x, y, size * 5);
    halo.addColorStop(0, "rgba(255, 228, 190, 0.5)");
    halo.addColorStop(0.4, "rgba(255, 200, 160, 0.18)");
    halo.addColorStop(1, "rgba(255, 180, 140, 0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(x, y, size * 5, 0, Math.PI * 2);
    ctx.fill();

    const core = ctx.createRadialGradient(x, y, 0, x, y, size * 1.6);
    core.addColorStop(0, LANDSCAPE.pathCore);
    core.addColorStop(0.6, LANDSCAPE.pathMid);
    core.addColorStop(1, "rgba(255, 184, 138, 0)");
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(x, y, size * 1.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

export function drawSunriseParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  width: number,
  height: number,
  time: number,
  parallax: ParallaxState,
  timing: SceneTiming,
) {
  const particleEntrance = easeOutCubic(Math.max(0, (timing.entrance - 0.15) / 0.85));

  for (const particle of particles) {
    const twinkle = 0.68 + Math.sin(time * 0.001 + particle.phase) * 0.32;
    const depthShift = 10 + particle.depth * 28;
    const x =
      particle.x +
      parallax.pointerX * depthShift +
      Math.sin(time * 0.00022 + particle.phase) * (2 + particle.depth * 2.5);
    const y =
      particle.y +
      parallax.pointerY * depthShift * 0.65 +
      parallax.scroll * particle.depth * 22 +
      Math.cos(time * 0.00028 + particle.phase) * (1.5 + particle.depth);

    const [inner, outer] = particleColor(particle.warmth);
    const glowRadius = particle.radius * (4.5 + particle.depth * 3.5);

    const glow = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
    glow.addColorStop(0, inner);
    glow.addColorStop(0.35, outer);
    glow.addColorStop(1, "rgba(255, 180, 140, 0)");

    ctx.beginPath();
    ctx.fillStyle = glow;
    ctx.globalAlpha =
      particle.alpha * twinkle * particleEntrance * (1 - parallax.scroll * 0.38);
    ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

export function tickParticles(
  particles: Particle[],
  width: number,
  height: number,
) {
  for (const particle of particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;

    const maxY = height * (0.52 + particle.depth * 0.38);
    if (particle.x < -16) particle.x = width + 16;
    if (particle.x > width + 16) particle.x = -16;
    if (particle.y < -16) particle.y = maxY;
    if (particle.y > maxY) particle.y = -16;
  }
}

export function lerpParallax(
  current: ParallaxState,
  target: ParallaxState,
  factor: number,
): ParallaxState {
  return {
    pointerX: current.pointerX + (target.pointerX - current.pointerX) * factor,
    pointerY: current.pointerY + (target.pointerY - current.pointerY) * factor,
    scroll: current.scroll + (target.scroll - current.scroll) * factor,
  };
}
