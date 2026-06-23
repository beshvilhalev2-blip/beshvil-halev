import { HOME_ATMOSPHERE_BASE } from "@/app/components/home-page-atmosphere";

/**
 * About-page atmosphere: breathing organic gradients (Concept A) plus whisper
 * topographic contours (Concept B). Fixed, pointer-events-none, z-0.
 */
const CONTOUR_PATTERN = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="480" viewBox="0 0 480 480">
  <g fill="none" stroke="#4F5E48" stroke-width="0.65" opacity="0.55">
    <ellipse cx="240" cy="240" rx="210" ry="148"/>
    <ellipse cx="240" cy="240" rx="178" ry="124"/>
    <ellipse cx="240" cy="240" rx="146" ry="100"/>
    <ellipse cx="240" cy="240" rx="114" ry="76"/>
    <ellipse cx="240" cy="240" rx="82" ry="54"/>
    <path d="M0 120 Q120 80 240 120 T480 120"/>
    <path d="M0 200 Q160 160 320 200 T480 200"/>
    <path d="M0 280 Q100 320 240 280 T480 280"/>
    <path d="M0 360 Q140 330 280 360 T480 360"/>
  </g>
</svg>`);

export default function AboutAtmosphereBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden dark:bg-stone-950"
      style={{ backgroundColor: HOME_ATMOSPHERE_BASE }}
      aria-hidden="true"
    >
      {/* Base vertical wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0EDE4]/50 via-[#FAF8F5]/96 to-[#FBFAF8] dark:from-stone-950 dark:via-stone-950 dark:to-stone-900" />

      {/* Concept B — topographic contours (edges only via mask) */}
      <div
        className="about-atmosphere-contours absolute inset-[-8%] opacity-[0.028] dark:opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${CONTOUR_PATTERN}")`,
          backgroundSize: "520px 520px",
          WebkitMaskImage:
            "radial-gradient(ellipse 48% 72% at 50% 42%, transparent 22%, black 88%)",
          maskImage:
            "radial-gradient(ellipse 48% 72% at 50% 42%, transparent 22%, black 88%)",
        }}
      />

      {/* Concept A — breathing organic fields */}
      <div className="about-atmosphere-breathe-a absolute -left-[12%] top-[2%] h-[min(48vh,26rem)] w-[min(58vw,28rem)] rounded-full bg-[#BAC8AE]/[0.055] blur-[100px] dark:bg-emerald-900/20" />
      <div className="about-atmosphere-breathe-b absolute -right-[8%] top-[18%] h-[min(42vh,24rem)] w-[min(52vw,26rem)] rounded-full bg-[#E8DCC4]/[0.06] blur-[110px] dark:bg-amber-950/15" />
      <div className="about-atmosphere-breathe-c absolute bottom-[12%] left-[10%] h-[min(38vh,22rem)] w-[min(48vw,24rem)] rounded-full bg-[#DCEEF8]/[0.045] blur-[95px] dark:bg-teal-950/12" />
      <div className="about-atmosphere-breathe-d absolute right-[14%] top-[48%] h-[min(32vh,18rem)] w-[min(40vw,20rem)] rounded-full bg-[#B2C4A8]/[0.04] blur-[90px] dark:bg-emerald-950/10" />

      {/* Reading column clarity — soft center lift */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_42%_75%_at_50%_44%,rgba(250,248,245,0.72),transparent_68%)] dark:bg-[radial-gradient(ellipse_42%_75%_at_50%_44%,rgba(12,10,9,0.55),transparent_68%)]" />

      {/* Cool sky breath — static accent */}
      <div className="absolute inset-x-0 top-0 h-[min(48vh,28rem)] bg-[radial-gradient(ellipse_120%_65%_at_50%_-8%,rgba(220,238,248,0.1),transparent_76%)] dark:opacity-15" />

      {/* Gentle top glow */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#EDE8DF]/18 to-transparent sm:h-32 dark:from-stone-900/35" />

      {/* Footer quiet fade */}
      <div className="absolute inset-x-0 top-[50%] bottom-0 bg-gradient-to-b from-transparent to-[#FAF8F5]/80 dark:to-stone-950/88" />
    </div>
  );
}
