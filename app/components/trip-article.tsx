import Link from "next/link";
import Image from "next/image";
import type { Trip } from "@/data/trips";
import SiteHeader from "@/app/components/site-header";
import SiteFooter from "@/app/components/site-footer";
import { getTripHeroBackground } from "@/lib/trip-media";

function WazeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function MapsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M9 18 3 20V6l6-2 6 2 6-2v14l-6 2-6-2Z" />
      <path d="M9 4v14" />
      <path d="M15 6v14" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
      {children}
    </h2>
  );
}

export default function TripArticle({ trip }: { trip: Trip }) {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: getTripHeroBackground(trip) }}
          role="img"
          aria-label={trip.heroImageLabel}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-16 pt-12">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/20 bg-emerald-500/20 px-4 py-1.5 text-sm font-medium text-emerald-100 backdrop-blur-sm">
              {trip.region}
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
              {trip.category}
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
            {trip.title}
          </h1>

          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            {trip.subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={trip.wazeUrl}
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-[#33ccff]/90 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#33ccff] hover:shadow-xl"
            >
              <WazeIcon />
              ניווט ב-Waze
            </a>
            <a
              href={trip.mapsUrl}
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/95 px-5 py-3 text-sm font-semibold text-stone-800 shadow-lg transition-all hover:bg-white hover:shadow-xl"
            >
              <MapsIcon />
              Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="bg-stone-50 dark:bg-stone-950">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          {/* על המקום */}
          <section className="mb-16">
            <SectionHeading>על המקום</SectionHeading>
            <div className="space-y-4 text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
              {trip.about.map((paragraph) => (
                <p
                  key={paragraph}
                  className={
                    paragraph.startsWith("[")
                      ? "text-stone-500 dark:text-stone-500"
                      : undefined
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {trip.highlights && trip.highlights.length > 0 && (
            <section className="mb-16">
              <SectionHeading>למה לבקר?</SectionHeading>
              <ul className="grid gap-3 sm:grid-cols-2">
                {trip.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-emerald-200/80 bg-emerald-50/60 px-5 py-4 dark:border-emerald-900 dark:bg-emerald-950/40"
                  >
                    <span className="mt-0.5 text-emerald-600 dark:text-emerald-400">✓</span>
                    <span className="text-base leading-relaxed text-stone-700 dark:text-stone-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* הסיפור האישי שלי */}
          <section className="mb-16">
            <SectionHeading>הסיפור האישי שלי</SectionHeading>
            <div className="rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
                {trip.personalStory.map((paragraph) => (
                  <p
                    key={paragraph}
                    className={
                      paragraph.startsWith("[")
                        ? "text-stone-500 italic dark:text-stone-500"
                        : undefined
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* עלות */}
          <section className="mb-16">
            <SectionHeading>עלות</SectionHeading>
            <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
              <div className="grid divide-y divide-stone-100 dark:divide-stone-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:divide-x-reverse">
                {trip.cost.map((item) => (
                  <div key={item.label} className="p-6 text-center sm:p-8">
                    <p className="mb-1 text-sm font-medium text-stone-500 dark:text-stone-400">
                      {item.label}
                    </p>
                    <p className="text-2xl font-bold text-stone-900 dark:text-stone-50">
                      {item.value}
                    </p>
                    {item.note && (
                      <p className="mt-1 text-sm text-stone-400">{item.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* טיפים מיוחדים */}
          <section className="mb-16">
            <SectionHeading>טיפים מיוחדים</SectionHeading>
            <ul className="space-y-3">
              {trip.tips.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-4 rounded-xl border border-stone-200/80 bg-white px-5 py-4 shadow-sm dark:border-stone-800 dark:bg-stone-900"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    ✓
                  </span>
                  <span className="text-base leading-relaxed text-stone-600 dark:text-stone-400">
                    {tip}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* גלריית תמונות */}
        <section className="border-t border-stone-200/80 bg-white px-6 py-16 dark:border-stone-800 dark:bg-stone-900 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
                גלריית תמונות
              </h2>
              <p className="text-stone-500 dark:text-stone-400">
                {trip.gallerySubtitle}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trip.gallery.map((item, index) => (
                <div
                  key={item.label}
                  className={`group relative aspect-[4/3] overflow-hidden rounded-2xl ${
                    item.src ? "bg-stone-200 dark:bg-stone-800" : `bg-gradient-to-br ${item.gradient ?? "from-stone-400/40 to-stone-600/30"}`
                  } ${
                    index === 0 ? "sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:aspect-[16/7]" : ""
                  }`}
                >
                  {item.src ? (
                    <Image
                      src={item.src}
                      alt={item.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-stone-900/10 transition-colors group-hover:bg-stone-900/5">
                      <div className="text-center">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-2 size-10 text-stone-600/60 dark:text-stone-300/60" aria-hidden="true">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="m21 15-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-sm font-medium text-stone-700/70 dark:text-stone-200/70">
                          {item.label}
                        </p>
                      </div>
                    </div>
                  )}
                  {item.src && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                      <p className="text-sm font-medium text-white">{item.label}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* מקומות נוספים באזור */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
                מקומות נוספים באזור
              </h2>
              <p className="text-stone-500 dark:text-stone-400">
                {trip.nearbySubtitle}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {trip.nearbyPlaces.map((place) => (
                <Link
                  key={place.title}
                  href={place.href}
                  className="group flex flex-col rounded-2xl border border-stone-200/80 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900 dark:hover:border-emerald-800"
                >
                  <h3 className="mb-2 text-xl font-bold text-stone-900 dark:text-stone-50">
                    {place.title}
                  </h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                    {place.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition-colors group-hover:text-emerald-900 dark:text-emerald-400 dark:group-hover:text-emerald-300">
                    קראו עוד
                    <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      <SiteFooter />
    </div>
  );
}
