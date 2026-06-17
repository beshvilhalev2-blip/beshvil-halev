import Image from "next/image";
import type { Trip } from "@/data/trips";

function isHeicSrc(src: string): boolean {
  return src.toLowerCase().endsWith(".heic");
}

export function getTripPhotoGalleryItems(trip: Trip) {
  return trip.gallery.filter((item) => item.src);
}

export default function TripPhotoGallery({ trip }: { trip: Trip }) {
  const items = getTripPhotoGalleryItems(trip);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-stone-200/80 bg-white px-4 py-12 dark:border-stone-800 dark:bg-stone-900 sm:px-6 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl">
            גלריית תמונות
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item.src}
              className={`group relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-200 dark:bg-stone-800 ${
                index === 0
                  ? "sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:aspect-[16/7]"
                  : ""
              }`}
            >
              {isHeicSrc(item.src!) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                />
              ) : (
                <Image
                  src={item.src!}
                  alt={item.label ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
              {item.label ? (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                  <p className="text-sm font-medium text-white">{item.label}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
