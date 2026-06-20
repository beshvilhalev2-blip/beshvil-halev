import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { getPublicTripDataAudit } from "../lib/trip-public-audit";

const report = getPublicTripDataAudit();
const outputPath = resolve(process.cwd(), "data/public-trip-data-qa.json");

writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log("Public trip data QA report written to data/public-trip-data-qa.json");
console.log(JSON.stringify(report, null, 2));
