export const VISITED_STAMP_ALT = "טיילנו כאן בשביל הלב";

/** Bust browser cache when public/images/brand/visited-stamp.png is replaced. */
const STAMP_ASSET_VERSION = "1781711483";

const STAMP_SRC = `/images/brand/visited-stamp.png?v=${STAMP_ASSET_VERSION}`;

const sizeClasses = {
  card: "h-12 w-12 sm:h-[4.5rem] sm:w-[4.5rem] md:h-20 md:w-20",
  hero: "h-14 w-14 sm:h-20 sm:w-20",
} as const;

type VisitedStampProps = {
  className?: string;
  size?: keyof typeof sizeClasses;
};

export default function VisitedStamp({
  className = "",
  size = "card",
}: VisitedStampProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- native img preserves PNG alpha
    <img
      src={STAMP_SRC}
      alt={VISITED_STAMP_ALT}
      width={320}
      height={320}
      decoding="async"
      draggable={false}
      style={{ transform: "rotate(-10deg)" }}
      className={`pointer-events-none block object-contain ${sizeClasses[size]} ${className}`}
    />
  );
}
