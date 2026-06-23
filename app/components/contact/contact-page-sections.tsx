"use client";

import Link from "next/link";
import AboutScrollReveal from "@/app/components/about/about-scroll-reveal";
import {
  CONTACT_ACTION_CARDS,
  CONTACT_CLOSING_QUOTE,
  CONTACT_COLLABORATION,
  CONTACT_HERO,
  CONTACT_PERSONAL_NOTE,
} from "@/lib/contact/content";
import {
  EmailIcon,
  HandshakeIcon,
  MapPinIcon,
  WhatsAppIcon,
} from "./contact-icons";

function ActionCardIcon({ id }: { id: (typeof CONTACT_ACTION_CARDS)[number]["id"] }) {
  const className = "size-5";
  switch (id) {
    case "whatsapp":
      return <WhatsAppIcon className={className} />;
    case "email":
      return <EmailIcon className={className} />;
    case "recommend":
      return <MapPinIcon className={className} />;
  }
}

function ContactHeroSection() {
  return (
    <section
      className="scroll-mt-24 px-4 pb-2 pt-28 sm:px-6 sm:pb-3 sm:pt-32"
      dir="rtl"
      aria-labelledby="contact-hero-heading"
    >
      <AboutScrollReveal className="mx-auto max-w-xl text-center">
        <h1
          id="contact-hero-heading"
          className="text-[1.625rem] font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-[1.875rem]"
        >
          <span className="block leading-[1.32] sm:leading-[1.3]">
            {CONTACT_HERO.titleLines[0]}
          </span>
          <span className="mt-1.5 block leading-[1.32] sm:mt-2 sm:leading-[1.3]">
            {CONTACT_HERO.titleLines[1]}
          </span>
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-[1.68] text-stone-600 dark:text-stone-400 sm:mt-5 sm:text-base">
          {CONTACT_HERO.subtitle}
        </p>
      </AboutScrollReveal>
    </section>
  );
}

function ContactActionCards() {
  return (
    <section className="px-4 py-6 sm:px-6 sm:py-7" dir="rtl" aria-label="דרכי יצירת קשר">
      <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-3 sm:gap-3.5">
        {CONTACT_ACTION_CARDS.map((card, index) => (
          <AboutScrollReveal key={card.id} delayMs={index * 50}>
            <article
              className={
                card.primary
                  ? "relative flex h-full flex-col rounded-2xl bg-gradient-to-b from-[#F3F0E8]/95 to-white/80 p-4 shadow-[0_8px_28px_-14px_rgba(37,211,102,0.28)] ring-1 ring-[#25D366]/25 dark:from-stone-900/70 dark:to-stone-900/45 dark:ring-emerald-500/20 sm:p-5"
                  : "relative flex h-full flex-col rounded-2xl bg-white/75 p-4 ring-1 ring-stone-200/70 backdrop-blur-sm dark:bg-stone-900/55 dark:ring-stone-700/70 sm:p-5"
              }
            >
              {card.primary ? (
                <div
                  className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#25D366]/35 to-transparent"
                  aria-hidden="true"
                />
              ) : null}
              <div
                className={
                  card.primary
                    ? "inline-flex size-10 items-center justify-center rounded-full bg-[#25D366]/12 text-[#25D366] ring-1 ring-[#25D366]/20"
                    : "inline-flex size-10 items-center justify-center rounded-full bg-[#F3F0E8] text-[#4F5E48] ring-1 ring-stone-200/70 dark:bg-stone-800/80 dark:text-emerald-400/90 dark:ring-stone-700/70"
                }
              >
                <ActionCardIcon id={card.id} />
              </div>
              <h2 className="mt-3 text-base font-semibold tracking-tight text-stone-900 dark:text-stone-50">
                {card.title}
              </h2>
              <p className="mt-2 flex-1 text-[0.8125rem] leading-[1.62] text-stone-600 dark:text-stone-400 sm:text-sm">
                {card.description}
              </p>
              <Link
                href={card.href}
                {...(card.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={card.ariaLabel}
                className={
                  card.primary
                    ? "mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_-8px_rgba(37,211,102,0.55)] transition-all hover:-translate-y-px hover:bg-[#20BD5A] active:translate-y-0"
                    : "mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-stone-200/90 bg-white/85 px-4 py-2.5 text-sm font-semibold text-stone-800 transition-all hover:-translate-y-px hover:border-stone-300 hover:bg-white active:translate-y-0 dark:border-stone-700 dark:bg-stone-900/75 dark:text-stone-100 dark:hover:bg-stone-900"
                }
              >
                {card.primary ? <WhatsAppIcon className="size-4 shrink-0" /> : null}
                {card.cta}
              </Link>
            </article>
          </AboutScrollReveal>
        ))}
      </div>
    </section>
  );
}

function ContactPersonalNote() {
  return (
    <section
      className="border-t border-stone-200/35 px-4 py-7 dark:border-stone-700/35 sm:px-6 sm:py-8"
      dir="rtl"
      aria-labelledby="contact-personal-heading"
    >
      <AboutScrollReveal className="mx-auto max-w-lg text-center">
        <h2
          id="contact-personal-heading"
          className="text-lg font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-xl"
        >
          {CONTACT_PERSONAL_NOTE.heading}
        </h2>
        <p className="mt-4 text-[0.9375rem] leading-[1.68] text-stone-600 dark:text-stone-400 sm:text-base">
          {CONTACT_PERSONAL_NOTE.text}
        </p>
      </AboutScrollReveal>
    </section>
  );
}

function ContactCollaborationSection() {
  return (
    <section
      className="border-t border-stone-200/35 px-4 py-7 dark:border-stone-700/35 sm:px-6 sm:py-8"
      dir="rtl"
      aria-labelledby="contact-collab-heading"
    >
      <AboutScrollReveal className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-4 inline-flex size-10 items-center justify-center rounded-full bg-[#F3F0E8] text-[#4F5E48] ring-1 ring-stone-200/70 dark:bg-stone-800/80 dark:text-emerald-400/90 dark:ring-stone-700/70">
          <HandshakeIcon className="size-5" />
        </div>
        <h2
          id="contact-collab-heading"
          className="text-lg font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-xl"
        >
          {CONTACT_COLLABORATION.heading}
        </h2>
        <p className="mt-4 text-[0.9375rem] leading-[1.68] text-stone-600 dark:text-stone-400 sm:text-base">
          {CONTACT_COLLABORATION.text}
        </p>
        <Link
          href={CONTACT_COLLABORATION.ctaHref}
          className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-stone-200/90 bg-white/85 px-5 py-2.5 text-sm font-semibold text-stone-800 transition-all hover:-translate-y-px hover:border-stone-300 hover:bg-white dark:border-stone-700 dark:bg-stone-900/75 dark:text-stone-100 dark:hover:bg-stone-900"
        >
          <EmailIcon className="size-4 shrink-0" />
          {CONTACT_COLLABORATION.cta}
        </Link>
      </AboutScrollReveal>
    </section>
  );
}

function ContactClosingQuote() {
  return (
    <footer
      className="border-t border-stone-200/35 px-4 py-12 dark:border-stone-700/35 sm:px-6 sm:py-14"
      dir="rtl"
    >
      <AboutScrollReveal delayMs={40}>
        <figure className="relative mx-auto max-w-lg text-center">
          <div
            className="pointer-events-none absolute inset-x-[-0.75rem] inset-y-0 rounded-3xl bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,rgba(186,200,174,0.12),transparent_80%)] dark:bg-[radial-gradient(ellipse_90%_80%_at_50%_50%,rgba(52,211,153,0.05),transparent_80%)]"
            aria-hidden="true"
          />
          <blockquote className="relative">
            <div
              className="mx-auto mb-6 h-px w-8 bg-gradient-to-r from-transparent via-stone-300/70 to-transparent dark:via-stone-600/60"
              aria-hidden="true"
            />
            <p className="text-[1.0625rem] font-medium leading-[1.72] tracking-tight text-stone-700 dark:text-stone-300 sm:text-lg">
              {CONTACT_CLOSING_QUOTE}
            </p>
          </blockquote>
        </figure>
      </AboutScrollReveal>
    </footer>
  );
}

export default function ContactPageSections() {
  return (
    <article className="relative z-10">
      <ContactHeroSection />
      <ContactActionCards />
      <ContactPersonalNote />
      <ContactCollaborationSection />
      <ContactClosingQuote />
    </article>
  );
}
