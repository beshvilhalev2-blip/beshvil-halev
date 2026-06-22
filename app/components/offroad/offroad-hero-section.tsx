import Link from "next/link";
import OffroadHeroVideo from "@/app/components/offroad-hero-video";

const OFFROAD_HERO_IMAGE =
  "/images/places/south/בתרונות רוחמה/44hero.jpeg";

export default function OffroadHeroSection() {
  return (
    <section className="relative min-h-[52vh] overflow-hidden pt-24 sm:min-h-[58vh] lg:min-h-[62vh]">
      <OffroadHeroVideo
        posterSrc={OFFROAD_HERO_IMAGE}
        posterAlt="תמונת רקע — משפחה בטיול שטח בישראל"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/45 to-stone-900/25"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(52vh-6rem)] max-w-6xl flex-col justify-center px-6 py-16 sm:min-h-[calc(58vh-6rem)] sm:py-20 lg:min-h-[calc(62vh-6rem)]">
        <p className="mb-4 inline-flex w-fit rounded-full border border-white/25 bg-white/12 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
          מדריך משפחות לשטח
        </p>

        <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.38)] sm:text-5xl md:text-6xl">
          טיולי שטח למשפחות בישראל
        </h1>

        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/88 sm:text-xl">
          גם אם זאת הפעם הראשונה שלכם שיורדים מהאספלט.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="#find-route"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-stone-900 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-stone-800"
          >
            מצא מסלול שטח
          </Link>
          <Link
            href="#first-time"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/35 bg-white/14 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/24"
          >
            טיפים למתחילים
          </Link>
        </div>
      </div>
    </section>
  );
}
