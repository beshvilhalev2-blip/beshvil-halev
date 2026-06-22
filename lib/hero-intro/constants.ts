export const HOME_INTRO_SESSION_KEY = "bhl-home-intro-seen";

/** Brand movement phrase - shown only at the horizon pause */
export const INTRO_MOVEMENT_PHRASE = "להיות בתנועה זאת התרופה";

/** Path draws - beginning of movement */
export const INTRO_DRAW_MS = 2600;
/** Path complete; breath before the world opens */
export const INTRO_REVEAL_MS = 960;
/** Light emerges; world becomes visible; hero awakens */
export const INTRO_MORPH_MS = 2050;

export const INTRO_TOTAL_MS = INTRO_DRAW_MS + INTRO_REVEAL_MS + INTRO_MORPH_MS;

export const HANDOFF_HERO_ENTRANCE = 0.32;

export const INTRO_SKIP_MORPH_MS = 880;
export const INTRO_SKIP_HOLD_MS = 80;

export const INTRO_PATH_MILESTONES = [0.28, 0.52, 0.76] as const;

export type HandoffSignals = {
  morphProgress: number;
  heroReveal: number;
  contentReveal: number;
  overlayOpacity: number;
};
