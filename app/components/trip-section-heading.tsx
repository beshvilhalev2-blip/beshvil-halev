import { tripSectionHeadingClass } from "@/lib/trip-page-ui";

export default function TripSectionHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return <h2 className={tripSectionHeadingClass}>{children}</h2>;
}
