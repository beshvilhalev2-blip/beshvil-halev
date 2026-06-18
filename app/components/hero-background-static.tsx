const HERO_DESKTOP_SRC = "/images/hero/living-landscape-desktop-light.svg";
const HERO_MOBILE_SRC = "/images/hero/living-landscape-mobile-light.svg";

export default function HeroBackgroundStatic() {
  return (
    <picture className="pointer-events-none absolute inset-0" aria-hidden="true">
      <source media="(min-width: 768px)" srcSet={HERO_DESKTOP_SRC} />
      <img
        src={HERO_MOBILE_SRC}
        alt=""
        className="h-full w-full object-cover object-center"
        decoding="async"
        fetchPriority="high"
      />
    </picture>
  );
}
