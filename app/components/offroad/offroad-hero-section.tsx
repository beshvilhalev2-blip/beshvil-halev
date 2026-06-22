import Link from "next/link";
import OffroadHeroVideo from "@/app/components/offroad-hero-video";

const OFFROAD_HERO_IMAGE =
  "/images/places/south/בתרונות רוחמה/44hero.jpeg";

export default function OffroadHeroSection() {
  return (
    <section className="relative min-h-[68vh] overflow-hidden pt-24 sm:min-h-[72vh] lg:min-h-[78vh]">
      <OffroadHeroVideo
        posterSrc={OFFROAD_HERO_IMAGE}
        posterAlt="תמונת רקע - משפחה בטיול שטח בישראל"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/50 to-stone-900/20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.08),transparent_45%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(68vh-6rem)] max-w-6xl flex-col justify-end px-6 pb-14 pt-16 sm:min-h-[calc(72vh-6rem)] sm:pb-16 lg:min-h-[calc(78vh-6rem)] lg:pb-20">
        <h1 className="mb-4 max-w-3xl text-[2rem] font-bold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.42)] sm:text-[2.75rem] lg:text-5xl">
          שטח 4x4 למתחילים
        </h1>

        <p className="mb-8 max-w-2xl text-base leading-relaxed text-white/88 sm:text-lg">
          מסלולי שטח קלים, שבילי נוף וטיפים שיעזרו לכם לצאת בביטחון לטיול
          השטח הראשון.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="#recommended-routes"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-stone-900 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-black/25 transition-all hover:-translate-y-0.5 hover:bg-stone-800"
          >
            מצאו מסלול מתאים
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
