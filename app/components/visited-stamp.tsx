type VisitedStampProps = {
  className?: string;
  size?: "sm" | "md";
};

export default function VisitedStamp({
  className = "",
  size = "sm",
}: VisitedStampProps) {
  const sizeClasses =
    size === "sm"
      ? "size-14 text-[7px] leading-tight"
      : "size-16 text-[8px] leading-tight";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-dashed border-emerald-600/50 bg-emerald-50/80 text-center font-bold tracking-wide text-emerald-800/80 opacity-[0.85] dark:border-emerald-500/40 dark:bg-emerald-950/50 dark:text-emerald-200/80 ${sizeClasses} -rotate-12 ${className}`}
      aria-label="טיילנו כאן בשביל הלב"
      title="טיילנו כאן בשביל הלב"
    >
      <span className="max-w-[3.25rem] px-1">
        טיילנו כאן
        <br />
        בשביל הלב
      </span>
    </span>
  );
}
