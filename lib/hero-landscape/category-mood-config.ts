import type { AdventureCategoryId } from "@/lib/hero-adventure-selector";

/** ~400ms to full mood at 60fps. */
export const HERO_MOOD_LERP = 0.17;

export type CategoryCardAccent = {
  activeBorder: string;
  activeBg: string;
  activeRing: string;
  activeShadow: string;
  hoverShadow: string;
  titleColor: string;
  titleTextShadow: string;
  panelGroupBg: string;
  panelGroupBorder: string;
};

export const CATEGORY_CARD_ACCENTS: Record<AdventureCategoryId, CategoryCardAccent> = {
  water: {
    activeBorder: "rgba(110, 210, 225, 0.72)",
    activeBg: "rgba(80, 190, 215, 0.16)",
    activeRing: "rgba(110, 210, 225, 0.38)",
    activeShadow: "0 14px 44px rgba(40, 150, 190, 0.28)",
    hoverShadow: "0 10px 32px rgba(40, 150, 190, 0.18)",
    titleColor: "rgb(92, 186, 208)",
    titleTextShadow: "0 0 18px rgba(70, 175, 200, 0.22)",
    panelGroupBg: "rgba(72, 165, 190, 0.2)",
    panelGroupBorder: "rgba(110, 210, 225, 0.42)",
  },
  camping: {
    activeBorder: "rgba(235, 155, 75, 0.75)",
    activeBg: "rgba(210, 110, 45, 0.18)",
    activeRing: "rgba(255, 170, 90, 0.4)",
    activeShadow: "0 14px 44px rgba(180, 80, 30, 0.3)",
    hoverShadow: "0 10px 32px rgba(180, 80, 30, 0.2)",
    titleColor: "rgb(218, 138, 58)",
    titleTextShadow: "0 0 18px rgba(210, 120, 50, 0.2)",
    panelGroupBg: "rgba(200, 115, 45, 0.18)",
    panelGroupBorder: "rgba(235, 155, 75, 0.4)",
  },
  offroad: {
    activeBorder: "rgba(180, 155, 105, 0.72)",
    activeBg: "rgba(140, 120, 75, 0.16)",
    activeRing: "rgba(160, 140, 90, 0.38)",
    activeShadow: "0 14px 44px rgba(100, 85, 55, 0.28)",
    hoverShadow: "0 10px 32px rgba(100, 85, 55, 0.18)",
    titleColor: "rgb(168, 142, 96)",
    titleTextShadow: "0 0 16px rgba(150, 125, 80, 0.18)",
    panelGroupBg: "rgba(145, 120, 78, 0.17)",
    panelGroupBorder: "rgba(180, 155, 105, 0.38)",
  },
  stroller: {
    activeBorder: "rgba(190, 225, 175, 0.72)",
    activeBg: "rgba(220, 240, 210, 0.14)",
    activeRing: "rgba(190, 225, 175, 0.38)",
    activeShadow: "0 14px 44px rgba(140, 180, 130, 0.22)",
    hoverShadow: "0 10px 32px rgba(140, 180, 130, 0.14)",
    titleColor: "rgb(128, 178, 108)",
    titleTextShadow: "0 0 16px rgba(120, 170, 100, 0.2)",
    panelGroupBg: "rgba(155, 195, 135, 0.16)",
    panelGroupBorder: "rgba(190, 225, 175, 0.38)",
  },
  viewpoints: {
    activeBorder: "rgba(255, 185, 120, 0.75)",
    activeBg: "rgba(255, 170, 100, 0.14)",
    activeRing: "rgba(255, 190, 130, 0.4)",
    activeShadow: "0 14px 44px rgba(220, 120, 60, 0.26)",
    hoverShadow: "0 10px 32px rgba(220, 120, 60, 0.16)",
    titleColor: "rgb(222, 148, 62)",
    titleTextShadow: "0 0 18px rgba(215, 135, 55, 0.2)",
    panelGroupBg: "rgba(215, 130, 55, 0.16)",
    panelGroupBorder: "rgba(255, 185, 120, 0.4)",
  },
  free: {
    activeBorder: "rgba(235, 190, 115, 0.75)",
    activeBg: "rgba(220, 170, 90, 0.16)",
    activeRing: "rgba(245, 200, 130, 0.4)",
    activeShadow: "0 14px 44px rgba(190, 130, 60, 0.28)",
    hoverShadow: "0 10px 32px rgba(190, 130, 60, 0.18)",
    titleColor: "rgb(204, 152, 78)",
    titleTextShadow: "0 0 16px rgba(190, 140, 70, 0.18)",
    panelGroupBg: "rgba(195, 145, 75, 0.17)",
    panelGroupBorder: "rgba(235, 190, 115, 0.38)",
  },
};

type CategoryMoodPresentation = {
  background: string;
  opacity: number;
  blendMode: "soft-light" | "screen" | "multiply" | "overlay";
};

const CATEGORY_MOOD_BACKGROUNDS: Record<AdventureCategoryId, string> = {
  water: [
    "linear-gradient(180deg, rgba(170, 235, 245, 0.32) 0%, rgba(90, 190, 215, 0.14) 55%, rgba(60, 165, 195, 0.1) 100%)",
    "radial-gradient(ellipse 90% 50% at 50% 88%, rgba(70, 200, 220, 0.28) 0%, transparent 68%)",
  ].join(", "),
  camping: [
    "radial-gradient(ellipse 55% 42% at 18% 82%, rgba(255, 185, 110, 0.28) 0%, transparent 72%)",
    "linear-gradient(180deg, rgba(255, 240, 220, 0.1) 0%, rgba(235, 205, 165, 0.14) 100%)",
  ].join(", "),
  offroad: [
    "linear-gradient(180deg, rgba(210, 195, 160, 0.12) 0%, rgba(120, 100, 70, 0.22) 100%)",
    "radial-gradient(ellipse 80% 60% at 70% 60%, rgba(160, 140, 95, 0.18) 0%, transparent 70%)",
  ].join(", "),
  stroller: [
    "radial-gradient(ellipse 85% 70% at 50% 35%, rgba(255, 252, 245, 0.45) 0%, transparent 72%)",
    "linear-gradient(180deg, rgba(220, 240, 215, 0.22) 0%, rgba(245, 250, 240, 0.1) 100%)",
  ].join(", "),
  viewpoints: [
    "linear-gradient(180deg, rgba(255, 210, 170, 0.2) 0%, transparent 38%)",
    "linear-gradient(0deg, rgba(255, 190, 140, 0) 42%, rgba(255, 175, 115, 0.38) 48%, rgba(255, 200, 155, 0.22) 54%, transparent 62%)",
    "radial-gradient(ellipse 100% 40% at 50% 44%, rgba(255, 180, 120, 0.25) 0%, transparent 70%)",
  ].join(", "),
  free: [
    "radial-gradient(ellipse 70% 55% at 50% 88%, rgba(235, 185, 100, 0.38) 0%, transparent 72%)",
    "linear-gradient(180deg, rgba(255, 225, 180, 0.18) 0%, rgba(210, 160, 90, 0.12) 100%)",
    "radial-gradient(ellipse 50% 35% at 72% 22%, rgba(255, 230, 190, 0.22) 0%, transparent 70%)",
  ].join(", "),
};

const CATEGORY_MOOD_BLEND: Record<AdventureCategoryId, CategoryMoodPresentation["blendMode"]> = {
  water: "soft-light",
  camping: "soft-light",
  offroad: "multiply",
  stroller: "soft-light",
  viewpoints: "screen",
  free: "soft-light",
};

export function categoryMoodPresentation(
  category: AdventureCategoryId | null,
  intensity: number,
): CategoryMoodPresentation | null {
  if (!category || intensity <= 0.01) return null;
  return {
    background: CATEGORY_MOOD_BACKGROUNDS[category],
    opacity: intensity * 0.92,
    blendMode: CATEGORY_MOOD_BLEND[category],
  };
}

/** Legacy flat tint fallback - unused when presentation gradients active. */
export function categoryMoodTint(
  category: AdventureCategoryId | null,
  intensity: number,
): { color: string; opacity: number } {
  const presentation = categoryMoodPresentation(category, intensity);
  if (!presentation) return { color: "transparent", opacity: 0 };
  return { color: "transparent", opacity: presentation.opacity };
}

export function categoryCardAccent(id: AdventureCategoryId): CategoryCardAccent {
  return CATEGORY_CARD_ACCENTS[id];
}
