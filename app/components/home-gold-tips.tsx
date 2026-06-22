import Link from "next/link";

const TIP_PLACEHOLDERS = [
  "5 המעיינות הכי קרובים לרכב",
  "7 מסלולים מושלמים לקיץ",
  "המקומות הכי יפים לזריחה",
  "איך עוברים נסיעה ארוכה עם ילדים",
  "טיפים לבישול בשטח",
  "פינות חמד שפחות מכירים",
] as const;

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

export default function HomeGoldTips() {
  return (
    <section
      id="gold-tips"
      className="relative px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10"
      aria-labelledby="home-gold-tips-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center sm:mb-12">
          <h2
            id="home-gold-tips-heading"
            className="mb-3 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl"
          >
            💚 טיפים של זהב בשביל הלב
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-stone-600 dark:text-stone-400 sm:text-lg">
            טיפים, המלצות, נקודות סודיות ורעיונות שיעזרו לכם להפוך כל טיול לחוויה בלתי
            נשכחת.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TIP_PLACEHOLDERS.map((title) => (
            <li key={title}>
              <Link
                href="#"
                className="group flex h-full min-h-[7.5rem] flex-col justify-between rounded-2xl border border-stone-200/70 bg-white/85 p-5 text-right shadow-sm backdrop-blur-[2px] transition-shadow hover:bg-white/95 hover:shadow-md dark:border-stone-700 dark:bg-stone-900/80"
                aria-label={`${title} - בקרוב`}
              >
                <span className="mb-3 inline-flex w-fit rounded-full bg-stone-200/80 px-2.5 py-0.5 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-400">
                  בקרוב
                </span>
                <span className="text-base font-semibold leading-snug text-stone-900 dark:text-stone-50 sm:text-lg">
                  {title}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="#"
            className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-800 transition-colors hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
          >
            לכל הטיפים והכתבות
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
