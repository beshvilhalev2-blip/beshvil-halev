export function getOffroadLearningMomentAlt(src: string): string {
  const filename = decodeURIComponent(src.split("/").pop() ?? "");
  const baseName = filename.replace(/\.[^.]+$/, "");
  return baseName ? `רגע מהשטח - ${baseName}` : "רגע מהשטח";
}
