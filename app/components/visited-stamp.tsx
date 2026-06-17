export const VISITED_STAMP_ALT = "טיילנו כאן בשביל הלב";

/** Bust browser cache when public/images/brand/visited-stamp.png is replaced. */
const STAMP_ASSET_VERSION = "1781711483";

const STAMP_SRC = `/images/brand/visited-stamp.png?v=${STAMP_ASSET_VERSION}`;

const sizeClasses = {
  // Mobile ~58% larger; sm+ unchanged from prior desktop sizing
  card: "h-[4.75rem] w-[4.75rem] sm:h-[4.5rem] sm:w-[4.5rem] md:h-20 md:w-20",
  hero: "h-[5.25rem] w-[5.25rem] sm:h-20 sm:w-20",
} as const;

const placementClasses = {
  card:
    "absolute right-4 top-3 z-20 translate-y-[52%] sm:right-3 sm:top-3 sm:translate-y-[45%]",
  hero: "absolute right-5 top-[4.5rem] z-20 sm:right-6 sm:top-28",
} as const;

type VisitedStampProps = {
  className?: string;
  size?: keyof typeof sizeClasses;
  placement?: keyof typeof placementClasses;
};

export default function VisitedStamp({
  className = "",
  size = "card",
  placement,
}: VisitedStampProps) {
  const stamp = (
    // eslint-disable-next-line @next/next/no-img-element -- native img preserves PNG alpha
    <img
      src={STAMP_SRC}
      alt={VISITED_STAMP_ALT}
      width={320}
      height={320}
      decoding="async"
      draggable={false}
      style={{ transform: "rotate(-10deg)" }}
      className={`pointer-events-none block object-contain drop-shadow-sm ${sizeClasses[size]}`}
    />
  );

  if (placement) {
    return (
      <div className={`pointer-events-none ${placementClasses[placement]} ${className}`}>
        {stamp}
      </div>
    );
  }

  return (
    <div className={`pointer-events-none inline-block ${className}`}>{stamp}</div>
  );
}
