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
      ? "size-[4.75rem] text-[9px] leading-[1.2]"
      : "size-[5.5rem] text-[10px] leading-[1.2]";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-dashed border-emerald-700 bg-emerald-100 text-center font-bold text-emerald-900 shadow-md ring-2 ring-emerald-200/80 dark:border-emerald-400 dark:bg-emerald-900 dark:text-emerald-50 dark:ring-emerald-800/60 ${sizeClasses} -rotate-12 ${className}`}
      aria-label="טיילנו כאן בשביל הלב"
      title="טיילנו כאן בשביל הלב"
    >
      <span className="max-w-[3.75rem] px-1">
        טיילנו כאן
        <br />
        בשביל הלב
      </span>
    </span>
  );
}
