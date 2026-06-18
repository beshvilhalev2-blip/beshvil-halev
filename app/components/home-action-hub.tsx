import Link from "next/link";
import { HOMEPAGE_CTA } from "@/lib/find-my-trip/constants";
import { GEAR_HOMEPAGE_CTA } from "@/lib/gear-checklist/constants";

const ACTION_BLOCKS = [
  {
    emoji: "🎯",
    title: "מצאו לי טיול",
    description:
      "ענו על כמה שאלות קצרות ונמצא עבורכם את הטיול המתאים ביותר.",
    cta: "מצאו לי טיול",
    href: HOMEPAGE_CTA.href,
  },
  {
    emoji: "🎒",
    title: "רשימת ציוד",
    description: "בדקו מה חסר לכם לפני היציאה לדרך.",
    cta: "בדקו ציוד",
    href: GEAR_HOMEPAGE_CTA.href,
  },
  {
    emoji: "🚙",
    title: "מסלולי שטח",
    description: "מצאו מסלולים שמתאימים לסוג הרכב שלכם.",
    cta: "למסלולי שטח",
    href: "/offroad",
  },
] as const;

const TOPO_TEXTURE = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'>
    <g fill='none' stroke='%23a8957a' stroke-width='0.6' opacity='0.55'>
      <ellipse cx='160' cy='160' rx='120' ry='72'/>
      <ellipse cx='120' cy='200' rx='90' ry='54'/>
      <ellipse cx='210' cy='110' rx='70' ry='42'/>
    </g>
  </svg>`,
)}")`;

function ActionArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3 transition-transform duration-300 group-hover:-translate-x-0.5"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

type ActionBlockProps = (typeof ACTION_BLOCKS)[number];

function ActionBlock({ emoji, title, description, cta, href }: ActionBlockProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col items-center rounded-2xl border border-stone-200/55 bg-white/45 px-3.5 py-4 text-center shadow-[0_6px_22px_rgba(28,25,23,0.05)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-stone-300/70 hover:bg-white/62 hover:shadow-[0_14px_34px_rgba(28,25,23,0.1),0_0_0_1px_rgba(184,168,146,0.15)] dark:border-stone-700/50 dark:bg-stone-900/35 dark:shadow-black/20 dark:hover:border-stone-600/60 dark:hover:bg-stone-900/50 dark:hover:shadow-[0_14px_34px_rgba(0,0,0,0.35),0_0_0_1px_rgba(168,149,122,0.12)] sm:px-4 sm:py-4.5"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(232,217,192,0.22),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(120,113,108,0.18),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mb-2 flex size-10 items-center justify-center rounded-full border border-stone-200/80 bg-white/70 text-lg shadow-[0_5px_14px_rgba(28,25,23,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-sm ring-1 ring-white/50 transition-shadow duration-300 group-hover:shadow-[0_8px_20px_rgba(28,25,23,0.1)] dark:border-stone-600/60 dark:bg-stone-800/55 dark:ring-white/10 sm:size-11 sm:text-xl">
        <span aria-hidden="true">{emoji}</span>
      </div>

      <h3 className="relative mb-1 text-[0.95rem] font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-base">
        {title}
      </h3>

      <p className="relative mb-3 max-w-[14rem] flex-1 text-xs leading-snug text-stone-600 dark:text-stone-400 sm:max-w-[15rem]">
        {description}
      </p>

      <span className="relative inline-flex min-h-8 items-center gap-1.5 rounded-full border border-stone-300/60 bg-stone-800/92 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-300 group-hover:border-stone-400/70 group-hover:bg-stone-800 group-hover:shadow-md dark:border-stone-600/50 dark:bg-stone-100/92 dark:text-stone-900 dark:group-hover:bg-white sm:px-4">
        {cta}
        <ActionArrowIcon />
      </span>
    </Link>
  );
}

export default function HomeActionHub() {
  return (
    <section
      className="relative -mt-10 overflow-hidden px-4 pb-6 pt-10 sm:-mt-12 sm:px-6 sm:pb-7 sm:pt-11"
      aria-label="פעולות ראשיות"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#E8D9C0]/65 via-[#F0EBE3]/95 to-[#EBE4DA]/85 dark:from-stone-900 dark:via-stone-900/98 dark:to-stone-950"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_55%_at_50%_0%,rgba(232,217,192,0.38),transparent_70%)] dark:bg-[radial-gradient(ellipse_100%_55%_at_50%_0%,rgba(68,64,60,0.28),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_80%_90%,rgba(190,175,135,0.1),transparent_60%)] dark:opacity-40"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply dark:opacity-[0.05] dark:mix-blend-soft-light"
        style={{ backgroundImage: TOPO_TEXTURE, backgroundSize: "320px 320px" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-stone-50/75 to-transparent dark:from-stone-950/75"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="grid gap-2.5 sm:grid-cols-3 sm:gap-3.5 md:gap-4">
          {ACTION_BLOCKS.map((block) => (
            <ActionBlock key={block.href} {...block} />
          ))}
        </div>
      </div>
    </section>
  );
}
