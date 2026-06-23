export type AboutHeroImage = {
  id: string;
  src: string;
  alt: string;
};

/** Curated outdoor / travel moments — no indoor or car-interior shots. */
export const ABOUT_HERO_IMAGE_POOL: AboutHeroImage[] = [
  {
    id: "stream",
    src: "/images/about/hero/IMG_2586.jpeg",
    alt: "מילאנה והילדים בנחל בטבע",
  },
  {
    id: "rav4",
    src: "/images/about/hero/IMG_7857.jpeg",
    alt: "הילדים על גג הרכב בדרך לטיול",
  },
  {
    id: "forest-picnic",
    src: "/images/about/hero/IMG_9442.jpeg",
    alt: "ארוחת בוקר משפחתית ביער",
  },
  {
    id: "atv-nature",
    src: "/images/about/hero/IMG_5667.jpeg",
    alt: "מילאנה והילדים בהרפתקת שטח",
  },
  {
    id: "outdoor-grill",
    src: "/images/about/hero/IMG_7508.jpeg",
    alt: "מילאנה מבשלת בטבע",
  },
  {
    id: "field-picnic",
    src: "/images/about/hero/IMG_9498.jpeg",
    alt: "ארוחה בשטח עם הילדים",
  },
  {
    id: "forest-cooking",
    src: "/images/about/hero/IMG_9657.jpeg",
    alt: "בישול משפחתי ביער",
  },
  {
    id: "desert-stop",
    src: "/images/about/hero/IMG_6949.jpeg",
    alt: "עצירה בדרך בנוף מדברי",
  },
];

/** First four pool images shown on load. */
export const ABOUT_HERO_INITIAL_SLOTS: AboutHeroImage[] =
  ABOUT_HERO_IMAGE_POOL.slice(0, 4);

export const ABOUT_HERO_COLLAGE_ROTATE_MS = 9000;
