import {
  OFFROAD_LEARNING_GALLERY_STORY,
  OFFROAD_LEARNING_GALLERY_TITLE,
} from "@/lib/offroad/content";
import { getOffroadLearningMomentImages } from "@/lib/offroad/learning-moments";
import OffroadLearningGalleryGrid from "@/app/components/offroad/offroad-learning-gallery-grid";
import { offroadCard, offroadSectionInner } from "./offroad-shared";

export default function OffroadPersonalLearningGallery() {
  const images = getOffroadLearningMomentImages();

  if (images.length === 0) {
    return null;
  }

  return (
    <section
      id="learning-moments"
      className="relative scroll-mt-24 px-4 pb-8 pt-0 sm:px-6 sm:pb-10"
      aria-labelledby="learning-moments-heading"
    >
      <div className={`${offroadSectionInner} max-w-4xl`}>
        <div className={`${offroadCard} px-4 py-5 sm:px-6 sm:py-6`}>
          <header className="mx-auto max-w-lg text-center">
            <h2
              id="learning-moments-heading"
              className="text-lg font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-xl"
            >
              {OFFROAD_LEARNING_GALLERY_TITLE}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-300 sm:text-[15px]">
              {OFFROAD_LEARNING_GALLERY_STORY}
            </p>
          </header>

          <div className="mt-4 sm:mt-5">
            <OffroadLearningGalleryGrid images={images} />
          </div>
        </div>
      </div>
    </section>
  );
}
