"use client";

import {
  ABOUT_STORY_CHAPTERS,
  ABOUT_STORY_NATURE_LINES,
  ABOUT_STORY_SIGNATURE,
  type StoryChapter,
  type StoryContentBlock,
  type TextSegment,
} from "@/lib/about/story-content";
import AboutScrollReveal from "./about-scroll-reveal";

function StoryParagraph({
  segments,
  lead = false,
}: {
  segments: TextSegment[];
  lead?: boolean;
}) {
  return (
    <p
      className={
        lead
          ? "text-[1.0625rem] font-medium leading-[1.68] tracking-tight text-stone-800 dark:text-stone-100 sm:text-lg"
          : "text-[0.9375rem] leading-[1.68] text-stone-600 dark:text-stone-400 sm:text-base"
      }
    >
      {segments.map((segment, index) =>
        segment.emphasis ? (
          <em
            key={`${segment.text}-${index}`}
            className="font-semibold not-italic text-[#4F5E48] dark:text-emerald-400/90"
          >
            {segment.text}
          </em>
        ) : (
          <span key={`${segment.text}-${index}`}>{segment.text}</span>
        ),
      )}
    </p>
  );
}

function StoryPullQuote({
  lines,
  featured = false,
}: {
  lines: readonly string[];
  featured?: boolean;
}) {
  return (
    <figure className={featured ? "py-3 sm:py-4" : "py-2.5 sm:py-3"}>
      <blockquote className="relative mx-auto max-w-xl border-0 text-center">
        <div
          className="pointer-events-none absolute inset-x-4 top-1/2 h-16 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(186,200,174,0.28),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.12),transparent_70%)] sm:inset-x-8 sm:h-20"
          aria-hidden="true"
        />
        <div
          className={
            featured
              ? "relative border-y border-stone-200/55 py-5 dark:border-stone-700/50 sm:py-6"
              : "relative py-3 sm:py-4"
          }
        >
          <div className={featured ? "space-y-0.5 sm:space-y-1" : "space-y-0.5"}>
            {lines.map((line, index) => (
              <p
                key={line}
                className={
                  featured
                    ? index === lines.length - 1
                      ? "text-[1.75rem] font-semibold leading-[1.26] tracking-tight text-stone-900 sm:text-[2.125rem] dark:text-stone-50"
                      : "text-[1.375rem] font-medium leading-[1.32] tracking-tight text-stone-700 sm:text-[1.625rem] dark:text-stone-200"
                    : "text-[1.3125rem] font-medium leading-[1.36] tracking-tight text-stone-800 sm:text-[1.5rem] dark:text-stone-100"
                }
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </blockquote>
    </figure>
  );
}

function StoryMoment({ text }: { text: string }) {
  return (
    <aside className="relative py-1 sm:py-1.5">
      <div
        className="pointer-events-none absolute inset-x-0 inset-y-0 rounded-2xl bg-gradient-to-b from-[#F3F0E8]/95 via-white/40 to-[#F3F0E8]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:from-stone-900/75 dark:via-stone-900/35 dark:to-stone-900/70"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#4F5E48]/25 to-transparent dark:via-emerald-400/20"
        aria-hidden="true"
      />
      <p className="relative px-4 py-5 text-[1.0625rem] font-medium leading-[1.68] tracking-tight text-stone-800 sm:px-5 sm:py-5 sm:text-lg dark:text-stone-100">
        {text}
      </p>
    </aside>
  );
}

function StoryRhythmBeat() {
  return (
    <div className="flex items-center justify-center py-0.5" aria-hidden="true">
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-stone-300/70 dark:to-stone-600/60" />
      <span className="mx-2 size-1 rounded-full bg-[#4F5E48]/35 dark:bg-emerald-400/35" />
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-stone-300/70 dark:to-stone-600/60" />
    </div>
  );
}

function StoryNaturePause() {
  return (
    <aside
      className="relative py-6 text-center sm:py-7"
      aria-label="הטבע שייך לכולם"
    >
      <div
        className="pointer-events-none absolute inset-x-0 inset-y-0 rounded-2xl bg-gradient-to-b from-[#F3F0E8]/95 via-[#F7F4ED]/65 to-[#F3F0E8]/95 dark:from-stone-900/65 dark:via-stone-900/40 dark:to-stone-900/65"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-stone-300/50 to-transparent dark:via-stone-600/40"
        aria-hidden="true"
      />
      <div className="relative space-y-1.5 px-3 sm:space-y-2">
        {ABOUT_STORY_NATURE_LINES.map((line, index) => (
          <p
            key={line}
            className={
              index === 0
                ? "text-base font-semibold leading-[1.6] text-stone-800 sm:text-lg dark:text-stone-100"
                : "text-[0.9375rem] font-medium leading-[1.6] text-stone-700 sm:text-base dark:text-stone-200"
            }
          >
            {line}
          </p>
        ))}
      </div>
    </aside>
  );
}

function StorySignatureClosing() {
  return (
    <footer className="relative px-2 py-7 text-center sm:py-8">
      <div
        className="pointer-events-none absolute inset-x-[-0.75rem] inset-y-0 rounded-3xl bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,rgba(186,200,174,0.16),transparent_80%)] dark:bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,rgba(52,211,153,0.07),transparent_80%)] sm:inset-x-[-1rem]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-md">
        <div
          className="mx-auto h-px w-8 bg-gradient-to-r from-transparent via-stone-300/80 to-transparent dark:via-stone-600/70"
          aria-hidden="true"
        />
        <div className="space-y-2 pt-5 sm:space-y-2.5 sm:pt-6">
          <p className="text-[0.8125rem] leading-[1.65] tracking-wide text-stone-500 dark:text-stone-500 sm:text-sm">
            {ABOUT_STORY_SIGNATURE.prelude}
          </p>
          <p className="text-base font-semibold leading-[1.65] tracking-tight text-[#4F5E48] sm:text-[1.0625rem] dark:text-emerald-400/95">
            {ABOUT_STORY_SIGNATURE.origin}
          </p>
        </div>
      </div>
    </footer>
  );
}

function StoryBlock({
  block,
  index,
}: {
  block: StoryContentBlock;
  index: number;
}) {
  const delayMs = Math.min(index * 40, 120);

  const content = (() => {
    switch (block.type) {
      case "paragraph":
        return (
          <StoryParagraph segments={block.segments} lead={block.lead} />
        );
      case "pull-quote":
        return (
          <StoryPullQuote lines={block.lines} featured={block.featured} />
        );
      case "moment":
        return <StoryMoment text={block.text} />;
      case "beat":
        return <StoryRhythmBeat />;
      case "nature":
        return <StoryNaturePause />;
      case "signature":
        return <StorySignatureClosing />;
      default:
        return null;
    }
  })();

  if (block.type === "beat") {
    return content;
  }

  const isWow =
    block.type === "pull-quote" ||
    block.type === "moment" ||
    block.type === "signature" ||
    block.type === "nature";

  return (
    <AboutScrollReveal delayMs={isWow ? delayMs + 40 : delayMs}>
      {content}
    </AboutScrollReveal>
  );
}

function StoryChapterSection({
  chapter,
  chapterIndex,
  isFirst,
  isLast,
}: {
  chapter: StoryChapter;
  chapterIndex: number;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <AboutScrollReveal
      as="div"
      delayMs={chapterIndex * 30}
      className={
        isFirst
          ? "space-y-3 sm:space-y-3.5"
          : isLast
            ? "border-t border-stone-200/30 pt-6 sm:pt-7 dark:border-stone-700/30"
            : "space-y-3 border-t border-stone-200/30 pt-6 sm:space-y-3.5 sm:pt-7 dark:border-stone-700/30"
      }
    >
      {chapter.blocks.map((block, index) => (
        <StoryBlock key={`${block.type}-${index}`} block={block} index={index} />
      ))}
    </AboutScrollReveal>
  );
}

export default function AboutStorySection() {
  return (
    <section
      id="my-story"
      className="scroll-mt-24 px-4 pt-6 pb-0 sm:px-6 sm:pt-7"
      dir="rtl"
      aria-labelledby="about-story-heading"
    >
      <div className="mx-auto max-w-[600px] text-center">
        <AboutScrollReveal>
          <h2
            id="about-story-heading"
            className="mb-5 text-[1.625rem] font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:mb-6 sm:text-[1.875rem]"
          >
            הסיפור שלי
          </h2>
        </AboutScrollReveal>

        <div className="space-y-5 sm:space-y-6">
          {ABOUT_STORY_CHAPTERS.map((chapter, index) => (
            <StoryChapterSection
              key={`chapter-${index}`}
              chapter={chapter}
              chapterIndex={index}
              isFirst={index === 0}
              isLast={index === ABOUT_STORY_CHAPTERS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
