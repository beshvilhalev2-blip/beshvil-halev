import {
  OFFROAD_FIRST_TIME_SUBTITLE,
} from "@/lib/offroad/content";
import OffroadFirstTimeTimeline from "@/app/components/offroad/offroad-first-time-timeline";
import {
  OffroadSectionHeader,
  offroadSectionInner,
  offroadSectionShell,
} from "./offroad-shared";

export default function OffroadFirstTimeSection() {
  return (
    <section id="first-time" className={`${offroadSectionShell} scroll-mt-24`}>
      <div className={offroadSectionInner}>
        <OffroadSectionHeader
          id="first-time-heading"
          title="פעם ראשונה בשטח?"
          subtitle={OFFROAD_FIRST_TIME_SUBTITLE}
        />

        <OffroadFirstTimeTimeline />
      </div>
    </section>
  );
}
