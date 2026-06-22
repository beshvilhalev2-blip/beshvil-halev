import { HOME_ATMOSPHERE_BASE } from "@/app/components/home-page-atmosphere";

/**
 * Site-wide atmosphere for non-home routes - same language as the homepage hero
 * at ~12% intensity: soft greens, warm cream, subtle teal, blurred organic shapes.
 */
export default function SiteAtmosphereBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden dark:bg-stone-950"
      style={{ backgroundColor: HOME_ATMOSPHERE_BASE }}
      aria-hidden="true"
    >
      {/* Base vertical wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0EDE4]/55 via-[#FAF8F5]/94 to-[#FBFAF8] dark:from-stone-950 dark:via-stone-950 dark:to-stone-900" />

      {/* Cool sky breath - hero teal/sky layer */}
      <div className="absolute inset-x-0 top-0 h-[min(52vh,30rem)] bg-[radial-gradient(ellipse_120%_70%_at_50%_-10%,rgba(220,238,248,0.14),transparent_78%)] dark:opacity-20" />

      {/* Sage greens - upper field */}
      <div className="absolute inset-x-0 top-0 h-[min(68vh,40rem)] bg-[radial-gradient(ellipse_88%_58%_at_72%_18%,rgba(186,200,174,0.07),transparent_74%)] dark:opacity-15" />
      <div className="absolute inset-x-0 top-[4%] h-[min(58vh,34rem)] bg-[radial-gradient(ellipse_78%_50%_at_18%_24%,rgba(178,196,168,0.055),transparent_72%)] dark:opacity-12" />

      {/* Warm cream earth - mid page */}
      <div className="absolute inset-x-0 top-[22%] h-[48%] bg-[radial-gradient(ellipse_92%_52%_at_50%_40%,rgba(232,220,196,0.045),transparent_80%)] dark:opacity-10" />

      {/* Subtle teal accent - hero water mood */}
      <div className="absolute inset-x-0 top-[8%] h-[min(44vh,26rem)] bg-[radial-gradient(ellipse_70%_45%_at_82%_32%,rgba(13,148,136,0.055),transparent_70%)] dark:opacity-12" />

      {/* Large blurred organic shapes - hero atmosphere at ~12% intensity */}
      <div className="absolute left-[8%] top-[5%] h-[42%] w-[48%] rounded-full bg-[#DCEEF8]/[0.12] blur-[120px] dark:opacity-30" />
      <div className="absolute bottom-[8%] right-[4%] h-[38%] w-[62%] rounded-full bg-[#E8DCC4]/[0.14] blur-[130px] dark:opacity-25" />
      <div className="absolute bottom-[18%] left-[6%] h-[34%] w-[44%] rounded-full bg-[#B2C4A8]/[0.10] blur-[110px] dark:opacity-20" />
      <div className="absolute right-[22%] top-[38%] h-[28%] w-[36%] rounded-full bg-[#0d9488]/[0.07] blur-[100px] dark:opacity-15" />

      {/* Gentle top glow - continuity from header area */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#EDE8DF]/22 to-transparent sm:h-36 dark:from-stone-900/40" />

      {/* Long fade toward footer - atmosphere quiets */}
      <div className="absolute inset-x-0 top-[45%] bottom-0 bg-gradient-to-b from-transparent via-transparent to-[#FAF8F5]/75 dark:to-stone-950/85" />
    </div>
  );
}
