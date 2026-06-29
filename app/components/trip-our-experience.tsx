import {
  tripSectionBodyClass,
  tripSectionHeadingClass,
  tripSurfaceGlassClass,
  tripSurfacePaddingClass,
} from "@/lib/trip-page-ui";

type TripOurExperienceProps = {
  paragraphs: string[];
};

export default function TripOurExperience({ paragraphs }: TripOurExperienceProps) {
  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="trip-experience-heading">
      <h2 id="trip-experience-heading" className={tripSectionHeadingClass}>
        החוויה שלנו ❤️
      </h2>

      <div className={`${tripSurfaceGlassClass} ${tripSurfacePaddingClass}`}>
        <div className={`space-y-4 ${tripSectionBodyClass}`}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
