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
      ? "size-[4.25rem] text-[8px] leading-[1.15]"
      : "size-20 text-[9px] leading-[1.15]";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-dashed border-emerald-600 bg-emerald-50 text-center font-bold text-emerald-800 shadow-sm ring-2 ring-white/80 dark:border-emerald-400 dark:bg-emerald-950 dark:text-emerald-100 dark:ring-stone-900/80 ${sizeClasses} -rotate-12 ${className}`}
      aria-label="טיילנו כאן בשביל הלב"
      title="טיילנו כאן בשביל הלב"
    >
      <span className="max-w-[3.5rem] px-1">
        טיילנו כאן
        <br />
        בשביל הלב
      </span>
    </span>
  );
}
