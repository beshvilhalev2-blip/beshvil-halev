import type { AdventureCategoryId } from "@/lib/hero-adventure-selector";
import type { ParallaxState, SceneTiming, JourneyPathPalette } from "./scene";
import { DEFAULT_JOURNEY_PATH as BASE_JOURNEY_PATH } from "./scene";

export type MoodState = Record<AdventureCategoryId, number>;

export const ZERO_MOOD: MoodState = {
  water: 0,
  camping: 0,
  offroad: 0,
  stroller: 0,
  viewpoints: 0,
  coffee: 0,
};

export function moodFromCategory(category: AdventureCategoryId | null): MoodState {
  if (!category) return { ...ZERO_MOOD };
  return { ...ZERO_MOOD, [category]: 1 };
}

export function lerpMood(current: MoodState, target: MoodState, factor: number): MoodState {
  return {
    water: current.water + (target.water - current.water) * factor,
    camping: current.camping + (target.camping - current.camping) * factor,
    offroad: current.offroad + (target.offroad - current.offroad) * factor,
    stroller: current.stroller + (target.stroller - current.stroller) * factor,
    viewpoints: current.viewpoints + (target.viewpoints - current.viewpoints) * factor,
    coffee: current.coffee + (target.coffee - current.coffee) * factor,
  };
}

export function moodIntensity(mood: MoodState): number {
  return Math.max(
    mood.water,
    mood.camping,
    mood.offroad,
    mood.stroller,
    mood.viewpoints,
    mood.coffee,
  );
}

const CATEGORY_JOURNEY_PATH: Record<AdventureCategoryId, JourneyPathPalette> = {
  water: {
    glow: "rgba(190, 228, 238, 0.42)",
    mid: "rgba(150, 210, 225, 0.58)",
    core: "rgba(120, 190, 210, 0.78)",
    strength: 1.05,
  },
  camping: {
    glow: "rgba(235, 205, 165, 0.4)",
    mid: "rgba(220, 175, 120, 0.55)",
    core: "rgba(200, 150, 90, 0.75)",
    strength: 1.08,
  },
  offroad: {
    glow: "rgba(220, 200, 165, 0.42)",
    mid: "rgba(195, 170, 130, 0.56)",
    core: "rgba(170, 145, 105, 0.76)",
    strength: 1.06,
  },
  stroller: {
    glow: "rgba(215, 232, 195, 0.4)",
    mid: "rgba(185, 210, 165, 0.54)",
    core: "rgba(155, 185, 135, 0.72)",
    strength: 1.04,
  },
  viewpoints: {
    glow: "rgba(240, 215, 175, 0.44)",
    mid: "rgba(230, 195, 145, 0.58)",
    core: "rgba(210, 175, 120, 0.78)",
    strength: 1.07,
  },
  coffee: {
    glow: "rgba(238, 215, 175, 0.42)",
    mid: "rgba(225, 190, 140, 0.56)",
    core: "rgba(205, 165, 105, 0.76)",
    strength: 1.05,
  },
};

function lerpChannel(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function parseRgba(color: string): [number, number, number, number] | null {
  const match = color.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;
  const parts = match[1]!.split(",").map((part) => Number.parseFloat(part.trim()));
  if (parts.length < 3) return null;
  return [parts[0]!, parts[1]!, parts[2]!, parts[3] ?? 1];
}

function mixRgba(a: string, b: string, t: number): string {
  const ca = parseRgba(a);
  const cb = parseRgba(b);
  if (!ca || !cb) return t < 0.5 ? a : b;
  return `rgba(${lerpChannel(ca[0], cb[0], t).toFixed(0)}, ${lerpChannel(ca[1], cb[1], t).toFixed(0)}, ${lerpChannel(ca[2], cb[2], t).toFixed(0)}, ${lerpChannel(ca[3], cb[3], t).toFixed(3)})`;
}

function lerpPathPalette(current: JourneyPathPalette, target: JourneyPathPalette, t: number): JourneyPathPalette {
  return {
    glow: mixRgba(current.glow, target.glow, t),
    mid: mixRgba(current.mid, target.mid, t),
    core: mixRgba(current.core, target.core, t),
    strength: lerpChannel(current.strength, target.strength, t),
  };
}

export function journeyPathPaletteForMood(mood: MoodState): JourneyPathPalette {
  let palette = BASE_JOURNEY_PATH;
  const ids: AdventureCategoryId[] = [
    "water",
    "camping",
    "offroad",
    "stroller",
    "viewpoints",
    "coffee",
  ];

  for (const id of ids) {
    const weight = mood[id];
    if (weight <= 0.01) continue;
    palette = lerpPathPalette(palette, CATEGORY_JOURNEY_PATH[id], weight);
  }

  return palette;
}

function drawWaterMood(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  strength: number,
  parallax: ParallaxState,
) {
  if (strength <= 0.01) return;

  ctx.save();
  ctx.globalCompositeOperation = "soft-light";
  ctx.globalAlpha = strength * 0.48;

  const sky = ctx.createLinearGradient(0, 0, 0, height * 0.65);
  sky.addColorStop(0, "rgba(185, 240, 250, 0.45)");
  sky.addColorStop(0.5, "rgba(120, 210, 230, 0.28)");
  sky.addColorStop(1, "rgba(80, 180, 210, 0.08)");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = strength * 0.32;
  const pool = ctx.createRadialGradient(
    width * 0.5,
    height * 0.78,
    0,
    width * 0.5,
    height * 0.78,
    width * 0.55,
  );
  pool.addColorStop(0, "rgba(90, 210, 225, 0.35)");
  pool.addColorStop(0.55, "rgba(70, 190, 215, 0.12)");
  pool.addColorStop(1, "rgba(60, 180, 210, 0)");
  ctx.fillStyle = pool;
  ctx.fillRect(0, 0, width, height);

  ctx.globalAlpha = strength * 0.34;
  for (let i = 0; i < 4; i += 1) {
    const y =
      height * (0.54 + i * 0.055) +
      Math.sin(time * 0.0014 + i * 1.6) * 5 +
      parallax.scroll * 10;
    const ripple = ctx.createLinearGradient(0, y - 10, 0, y + 10);
    ripple.addColorStop(0, "rgba(120, 220, 240, 0)");
    ripple.addColorStop(0.45, "rgba(100, 215, 235, 0.55)");
    ripple.addColorStop(0.55, "rgba(80, 200, 225, 0.45)");
    ripple.addColorStop(1, "rgba(120, 220, 240, 0)");
    ctx.fillStyle = ripple;
    ctx.fillRect(-20, y - 10, width + 40, 20);
  }

  ctx.restore();
}

function drawCampingMood(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  strength: number,
) {
  if (strength <= 0.01) return;

  ctx.save();
  ctx.globalCompositeOperation = "soft-light";
  ctx.globalAlpha = strength * 0.34;

  const warmLight = ctx.createRadialGradient(
    width * 0.22,
    height * 0.78 + Math.sin(time * 0.0008) * 2,
    0,
    width * 0.22,
    height * 0.78,
    width * 0.22,
  );
  warmLight.addColorStop(0, `rgba(255, 195, 120, ${0.32 * strength})`);
  warmLight.addColorStop(0.45, `rgba(240, 165, 85, ${0.16 * strength})`);
  warmLight.addColorStop(1, "rgba(220, 140, 70, 0)");
  ctx.fillStyle = warmLight;
  ctx.fillRect(0, 0, width, height);

  const evening = ctx.createLinearGradient(0, height * 0.45, 0, height);
  evening.addColorStop(0, "rgba(255, 252, 245, 0)");
  evening.addColorStop(0.65, "rgba(225, 190, 150, 0.12)");
  evening.addColorStop(1, "rgba(210, 175, 135, 0.18)");
  ctx.globalAlpha = strength * 0.28;
  ctx.fillStyle = evening;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawOffroadMood(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  strength: number,
  _parallax: ParallaxState,
) {
  if (strength <= 0.01) return;

  ctx.save();
  ctx.globalCompositeOperation = "soft-light";
  ctx.globalAlpha = strength * 0.42;
  const earth = ctx.createLinearGradient(0, height * 0.25, 0, height);
  earth.addColorStop(0, "rgba(215, 200, 165, 0.15)");
  earth.addColorStop(0.45, "rgba(175, 155, 110, 0.28)");
  earth.addColorStop(1, "rgba(110, 95, 65, 0.32)");
  ctx.fillStyle = earth;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawStrollerMood(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  strength: number,
) {
  if (strength <= 0.01) return;

  ctx.save();
  ctx.globalCompositeOperation = "soft-light";
  ctx.globalAlpha = strength * 0.52;
  const daylight = ctx.createRadialGradient(
    width * 0.5,
    height * 0.32,
    0,
    width * 0.5,
    height * 0.32,
    width * 0.72,
  );
  daylight.addColorStop(0, "rgba(255, 253, 248, 0.65)");
  daylight.addColorStop(0.55, "rgba(245, 250, 240, 0.28)");
  daylight.addColorStop(1, "rgba(255, 245, 238, 0)");
  ctx.fillStyle = daylight;
  ctx.fillRect(0, 0, width, height);

  ctx.globalAlpha = strength * 0.28;
  const green = ctx.createLinearGradient(0, height * 0.5, 0, height);
  green.addColorStop(0, "rgba(210, 235, 200, 0)");
  green.addColorStop(0.5, "rgba(195, 225, 185, 0.22)");
  green.addColorStop(1, "rgba(220, 240, 210, 0.12)");
  ctx.fillStyle = green;
  ctx.fillRect(0, 0, width, height);

  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = strength * 0.18;
  ctx.fillStyle = "rgba(255, 252, 245, 0.35)";
  ctx.fillRect(0, 0, width, height * 0.55);
  ctx.restore();
}

function drawViewpointsMood(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  strength: number,
  parallax: ParallaxState,
) {
  if (strength <= 0.01) return;

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  const horizonY = height * 0.41 + parallax.scroll * 10;

  ctx.globalAlpha = strength * 0.35;
  const sky = ctx.createLinearGradient(0, 0, 0, horizonY);
  sky.addColorStop(0, "rgba(255, 220, 185, 0.28)");
  sky.addColorStop(0.7, "rgba(255, 200, 160, 0.1)");
  sky.addColorStop(1, "rgba(255, 190, 150, 0)");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, horizonY + 20);

  ctx.globalAlpha = strength * 0.65;
  const horizon = ctx.createLinearGradient(0, horizonY - 36, 0, horizonY + 48);
  horizon.addColorStop(0, "rgba(255, 200, 150, 0)");
  horizon.addColorStop(0.42, "rgba(255, 175, 110, 0.55)");
  horizon.addColorStop(0.5, "rgba(255, 195, 140, 0.62)");
  horizon.addColorStop(0.58, "rgba(255, 210, 165, 0.45)");
  horizon.addColorStop(1, "rgba(255, 245, 238, 0)");
  ctx.fillStyle = horizon;
  ctx.fillRect(0, horizonY - 36, width, 84);

  ctx.globalAlpha = strength * 0.28;
  const depth = ctx.createLinearGradient(0, height * 0.22, 0, height * 0.7);
  depth.addColorStop(0, "rgba(190, 160, 130, 0.32)");
  depth.addColorStop(0.45, "rgba(170, 145, 115, 0.18)");
  depth.addColorStop(1, "rgba(255, 245, 238, 0)");
  ctx.fillStyle = depth;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawCoffeeMood(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  strength: number,
) {
  if (strength <= 0.01) return;

  ctx.save();
  ctx.globalCompositeOperation = "soft-light";
  ctx.globalAlpha = strength * 0.48;

  const morning = ctx.createRadialGradient(
    width * 0.68,
    height * 0.18,
    0,
    width * 0.68,
    height * 0.18,
    width * 0.45,
  );
  const breathe = 0.9 + Math.sin(time * 0.00085) * 0.1;
  morning.addColorStop(0, `rgba(255, 235, 195, ${0.42 * breathe})`);
  morning.addColorStop(0.55, "rgba(255, 210, 160, 0.18)");
  morning.addColorStop(1, "rgba(255, 245, 238, 0)");
  ctx.fillStyle = morning;
  ctx.fillRect(0, 0, width, height);

  const lower = ctx.createRadialGradient(
    width * 0.48,
    height * 0.88,
    0,
    width * 0.48,
    height * 0.88,
    width * 0.5,
  );
  lower.addColorStop(0, "rgba(235, 185, 105, 0.42)");
  lower.addColorStop(0.5, "rgba(220, 165, 85, 0.18)");
  lower.addColorStop(1, "rgba(210, 150, 75, 0)");
  ctx.fillStyle = lower;
  ctx.fillRect(0, 0, width, height);

  ctx.globalCompositeOperation = "screen";
  ctx.globalAlpha = strength * 0.28;
  const honey = ctx.createLinearGradient(0, height * 0.45, 0, height);
  honey.addColorStop(0, "rgba(255, 230, 190, 0)");
  honey.addColorStop(0.35, "rgba(255, 215, 165, 0.35)");
  honey.addColorStop(1, "rgba(230, 175, 100, 0.22)");
  ctx.fillStyle = honey;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

export function drawCategoryMoodOverlays(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  mood: MoodState,
  parallax: ParallaxState,
  _timing: SceneTiming,
) {
  drawWaterMood(ctx, width, height, time, mood.water, parallax);
  drawCampingMood(ctx, width, height, time, mood.camping);
  drawOffroadMood(ctx, width, height, mood.offroad, parallax);
  drawStrollerMood(ctx, width, height, mood.stroller);
  drawViewpointsMood(ctx, width, height, mood.viewpoints, parallax);
  drawCoffeeMood(ctx, width, height, time, mood.coffee);
}

export type AtmosphereMoodStyle = {
  warmOpacity: number;
  coolOpacity: number;
  earthOpacity: number;
  brightOpacity: number;
};

export function atmosphereStyleForMood(mood: MoodState): AtmosphereMoodStyle {
  return {
    warmOpacity: mood.camping * 0.38 + mood.coffee * 0.42,
    coolOpacity: mood.water * 0.52,
    earthOpacity: mood.offroad * 0.32,
    brightOpacity: mood.stroller * 0.48 + mood.viewpoints * 0.36,
  };
}

export function hillContrastBoost(mood: MoodState): number {
  return 1 + mood.offroad * 0.32 + mood.viewpoints * 0.18;
}

export function legibilityEase(mood: MoodState): number {
  return mood.stroller * 0.1 - mood.camping * 0.04;
}
