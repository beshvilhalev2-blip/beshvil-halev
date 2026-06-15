"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-emerald-200/80 bg-emerald-50 px-6 py-8 text-center dark:border-emerald-900/50 dark:bg-emerald-950/40"
        role="status"
      >
        <p className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
          תודה על הפנייה!
        </p>
        <p className="mt-2 text-base text-emerald-800/80 dark:text-emerald-200/80">
          קיבלנו את ההודעה. נחזור אליך בהקדם האפשרי.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="contact-name"
          className="mb-2 block text-sm font-semibold text-stone-800 dark:text-stone-200"
        >
          שם
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-base text-stone-800 placeholder:text-stone-400 transition-shadow focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-stone-500 dark:focus:ring-stone-100/10"
          placeholder="איך קוראים לך?"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-2 block text-sm font-semibold text-stone-800 dark:text-stone-200"
        >
          אימייל
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          dir="ltr"
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-base text-stone-800 placeholder:text-stone-400 transition-shadow focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-stone-500 dark:focus:ring-stone-100/10"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="contact-phone"
          className="mb-2 block text-sm font-semibold text-stone-800 dark:text-stone-200"
        >
          טלפון
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          dir="ltr"
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-base text-stone-800 placeholder:text-stone-400 transition-shadow focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-stone-500 dark:focus:ring-stone-100/10"
          placeholder="לא חובה"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block text-sm font-semibold text-stone-800 dark:text-stone-200"
        >
          הודעה
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          className="w-full resize-y rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-base text-stone-800 placeholder:text-stone-400 transition-shadow focus:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-stone-500 dark:focus:ring-stone-100/10"
          placeholder="ספרי לי על ההמלצה, השאלה או הרעיון שלך..."
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-xl bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 sm:w-auto dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
      >
        שליחת הודעה
      </button>
    </form>
  );
}
