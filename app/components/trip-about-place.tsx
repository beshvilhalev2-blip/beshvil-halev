import {
  tripSectionBodyClass,
  tripSectionHeadingClass,
  tripSurfaceMutedClass,
  tripSurfacePaddingClass,
} from "@/lib/trip-page-ui";

type TripAboutPlaceProps = {
  paragraphs: string[];
};

export default function TripAboutPlace({ paragraphs }: TripAboutPlaceProps) {
  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="trip-about-heading">
      <h2 id="trip-about-heading" className={tripSectionHeadingClass}>
        על המקום
      </h2>

      <div className={`${tripSurfaceMutedClass} ${tripSurfacePaddingClass}`}>
        <div className={`space-y-4 ${tripSectionBodyClass}`}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
