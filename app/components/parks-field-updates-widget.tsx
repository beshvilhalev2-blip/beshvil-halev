import {
  FIELD_UPDATES_DISCLAIMER,
  PARKS_NEWSFLASH_CATEGORY_URL,
  type FieldUpdatesData,
} from "@/lib/field-updates";

type ParksFieldUpdatesWidgetProps = {
  data: FieldUpdatesData;
  className?: string;
};

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

export default function ParksFieldUpdatesWidget({
  data,
  className = "",
}: ParksFieldUpdatesWidgetProps) {
  return (
    <aside
      className={`rounded-2xl border border-stone-200/90 bg-white/95 p-5 shadow-sm backdrop-blur-sm dark:border-stone-700/80 dark:bg-stone-900/95 ${className}`}
      aria-labelledby="field-updates-title"
    >
      <div className="mb-4">
        <p className="mb-1 text-xs font-medium text-stone-500 dark:text-stone-400">
          ניסוי · מקור רשמי
        </p>
        <h2
          id="field-updates-title"
          className="text-lg font-bold text-stone-900 dark:text-stone-50"
        >
          עדכוני שטח
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          עדכונים אחרונים מרשות הטבע והגנים
        </p>
      </div>

      {data.status === "ok" ? (
        <ul className="space-y-4">
          {data.items.map((item) => (
            <li
              key={item.url}
              className="border-b border-stone-100 pb-4 last:border-b-0 last:pb-0 dark:border-stone-800"
            >
              <p className="mb-1 text-xs text-stone-500 dark:text-stone-400">
                {item.dateLabel}
              </p>
              <h3 className="mb-1 text-sm font-semibold leading-snug text-stone-900 dark:text-stone-100">
                {item.title}
              </h3>
              {item.excerpt && (
                <p className="mb-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                  {item.excerpt}
                </p>
              )}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                לקריאה באתר הרשמי
                <ExternalLinkIcon />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          עדכוני השטח לא זמינים כרגע
        </p>
      )}

      <div className="mt-4 space-y-3 border-t border-stone-100 pt-4 dark:border-stone-800">
        <p className="text-xs leading-relaxed text-stone-500 dark:text-stone-400">
          {FIELD_UPDATES_DISCLAIMER}
        </p>
        <a
          href={PARKS_NEWSFLASH_CATEGORY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 transition-colors hover:text-stone-900 dark:text-stone-300 dark:hover:text-stone-100"
        >
          לכל העדכונים באתר רשות הטבע והגנים
          <ExternalLinkIcon />
        </a>
        <p className="text-[11px] leading-relaxed text-stone-400 dark:text-stone-500">
          בשביל הלב אינו מקור רשמי. המידע עשוי להיות מיושן ואינו בזמן אמת.
        </p>
      </div>
    </aside>
  );
}
