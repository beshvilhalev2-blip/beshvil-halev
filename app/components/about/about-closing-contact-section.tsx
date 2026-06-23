"use client";

import Link from "next/link";
import {
  ABOUT_CLOSING_CONTACT,
  ABOUT_CLOSING_CONTACT_PARAGRAPHS,
} from "@/lib/about/closing-contact-content";
import { socialLinks } from "@/lib/social-links";
import AboutScrollReveal from "./about-scroll-reveal";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.882 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14.5 8.5h2.5V5.5h-2.5c-2.5 0-4 1.5-4 4.2V12H8v3h2.5v7.5H14V15h2.8l.7-3H14v-1.8c0-.9.2-1.7 1.5-1.7z" />
    </svg>
  );
}

const socialButtonClassName: Record<"instagram" | "facebook", string> = {
  instagram:
    "bg-gradient-to-br from-[#f9ce34]/12 via-[#ee2a7b]/14 to-[#6228d7]/12 text-[#c13584] ring-1 ring-[#ee2a7b]/25 hover:ring-[#ee2a7b]/45 hover:shadow-[0_4px_14px_-4px_rgba(238,42,123,0.25)]",
  facebook:
    "bg-[#1877F2]/10 text-[#1877F2] ring-1 ring-[#1877F2]/25 hover:ring-[#1877F2]/45 hover:shadow-[0_4px_14px_-4px_rgba(24,119,242,0.2)]",
};

export default function AboutClosingContactSection() {
  const introSocialLinks = [
    socialLinks.find((link) => link.id === "instagram")!,
    socialLinks.find((link) => link.id === "facebook")!,
  ];

  return (
    <section
      className="relative border-b border-stone-200/80 px-4 pb-16 pt-6 dark:border-stone-800 sm:px-6 sm:pb-20 sm:pt-7"
      dir="rtl"
      aria-labelledby="about-closing-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-transparent to-stone-100/40 dark:to-stone-950/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[520px] text-center">
        <AboutScrollReveal>
          <div
            className="mx-auto mb-5 h-px w-10 bg-gradient-to-r from-transparent via-stone-300/70 to-transparent dark:via-stone-600/60 sm:mb-6"
            aria-hidden="true"
          />
          <h2
            id="about-closing-heading"
            className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-[1.375rem]"
          >
            💚 נשארים בקשר?
          </h2>
        </AboutScrollReveal>

        <AboutScrollReveal delayMs={60}>
          <div className="mt-4 space-y-2.5 text-[0.9375rem] leading-[1.66] text-stone-600 dark:text-stone-400 sm:mt-5 sm:text-base">
            <p>{ABOUT_CLOSING_CONTACT_PARAGRAPHS[0]}</p>
            <p>{ABOUT_CLOSING_CONTACT_PARAGRAPHS[1]}</p>
            <p>
              {ABOUT_CLOSING_CONTACT_PARAGRAPHS[2]}{" "}
              {ABOUT_CLOSING_CONTACT_PARAGRAPHS[3]}
            </p>
          </div>
        </AboutScrollReveal>

        <AboutScrollReveal delayMs={100}>
          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:mt-6 sm:grid-cols-2">
            <Link
              href={ABOUT_CLOSING_CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`וואטסאפ, ${ABOUT_CLOSING_CONTACT.whatsappDisplay}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_6px_18px_-8px_rgba(37,211,102,0.55)] transition-all hover:-translate-y-px hover:bg-[#20BD5A] hover:shadow-[0_8px_22px_-8px_rgba(37,211,102,0.6)] active:translate-y-0"
            >
              <WhatsAppIcon className="size-[1.125rem] shrink-0" />
              וואטסאפ
            </Link>
            <Link
              href={`mailto:${ABOUT_CLOSING_CONTACT.email}`}
              aria-label={`מייל, ${ABOUT_CLOSING_CONTACT.email}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-stone-200/90 bg-white/85 px-4 py-2.5 text-sm font-semibold text-stone-800 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-px hover:border-stone-300 hover:bg-white hover:shadow-md active:translate-y-0 dark:border-stone-700 dark:bg-stone-900/75 dark:text-stone-100 dark:hover:bg-stone-900"
            >
              <EmailIcon className="size-[1.125rem] shrink-0" />
              מייל
            </Link>
          </div>
        </AboutScrollReveal>

        <AboutScrollReveal delayMs={140}>
          <nav
            className="mt-4 flex items-center justify-center gap-2"
            aria-label="רשתות חברתיות"
          >
            {introSocialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={[
                  "inline-flex size-9 items-center justify-center rounded-full transition-all hover:-translate-y-px active:translate-y-0",
                  socialButtonClassName[link.id],
                ].join(" ")}
              >
                {link.id === "instagram" ? (
                  <InstagramIcon className="size-4" />
                ) : (
                  <FacebookIcon className="size-4" />
                )}
              </a>
            ))}
          </nav>
        </AboutScrollReveal>
      </div>
    </section>
  );
}
