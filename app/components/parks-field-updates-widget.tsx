import {
  FIELD_UPDATES_DISCLAIMER,
  PARKS_NEWSFLASH_CATEGORY_URL,
  type FieldUpdateItem,
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
      className="size-3 shrink-0"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

function TickerSeparator() {
  return (
    <span
      className="shrink-0 text-stone-300 dark:text-stone-600"
      aria-hidden="true"
    >
      •
    </span>
  );
}

function MarqueeGroup({
  items,
  keyPrefix,
  ariaHidden = false,
}: {
  items: FieldUpdateItem[];
  keyPrefix: string;
  ariaHidden?: boolean;
}) {
  return (
    <div
      className="field-updates-marquee-group flex shrink-0 items-center gap-2"
      aria-hidden={ariaHidden || undefined}
    >
      {items.map((item, index) => (
        <span
          key={`${keyPrefix}-${item.url}`}
          className="inline-flex shrink-0 items-center gap-2"
        >
          {index > 0 && <TickerSeparator />}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block max-w-[14rem] truncate py-1.5 text-stone-700 transition-colors hover:text-emerald-800 sm:max-w-xs dark:text-stone-300 dark:hover:text-emerald-300"
            title={item.title}
            tabIndex={ariaHidden ? -1 : undefined}
          >
            {item.title}
          </a>
        </span>
      ))}
      <TickerSeparator />
    </div>
  );
}

function TickerUpdates({ items }: { items: FieldUpdateItem[] }) {
  return (
    <div className="min-w-0 flex-1 overflow-hidden" dir="ltr">
      <div className="field-updates-marquee-track flex items-center gap-0">
        <MarqueeGroup items={items} keyPrefix="a" />
        <MarqueeGroup items={items} keyPrefix="b" ariaHidden />
      </div>
    </div>
  );
}

export default function ParksFieldUpdatesWidget({
  data,
  className = "",
}: ParksFieldUpdatesWidgetProps) {
  return (
    <aside
      className={`overflow-hidden rounded-2xl border border-stone-200/70 bg-stone-50/80 px-3 py-2.5 dark:border-stone-800/80 dark:bg-stone-900/40 sm:rounded-full sm:px-4 ${className}`}
      aria-labelledby="field-updates-title"
    >
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
        <div className="flex min-w-0 items-center gap-2 sm:shrink-0">
          <span
            id="field-updates-title"
            className="shrink-0 rounded-full bg-emerald-100/80 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
          >
            עדכוני שטח
          </span>
          <span className="sr-only">מקור: רשות הטבע והגנים</span>
        </div>

        <div className="min-w-0 flex-1 text-xs leading-none text-stone-600 dark:text-stone-400">
          {data.status === "ok" ? (
            <TickerUpdates items={data.items} />
          ) : (
            <p className="truncate px-0.5 text-stone-500 dark:text-stone-400">
              עדכוני השטח לא זמינים כרגע
            </p>
          )}
        </div>

        <a
          href={PARKS_NEWSFLASH_CATEGORY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 shrink-0 items-center gap-1 self-start rounded-full px-3 py-2 text-[11px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 hover:text-emerald-900 sm:self-auto dark:text-emerald-400 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
        >
          לאתר הרשמי
          <ExternalLinkIcon />
        </a>
      </div>

      <p className="mt-1.5 px-1 text-[10px] leading-relaxed text-stone-400 dark:text-stone-500 sm:mt-1 sm:text-center">
        {FIELD_UPDATES_DISCLAIMER}
      </p>
    </aside>
  );
}
