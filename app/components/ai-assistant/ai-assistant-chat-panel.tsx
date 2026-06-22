"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  AI_ASSISTANT_AVATAR_ALT,
  AI_ASSISTANT_AVATAR_SRC,
  AI_ASSISTANT_SUGGESTIONS,
} from "@/lib/ai-assistant/constants";
import type {
  AiAssistantMessage,
  AiAssistantTripRecommendation,
} from "@/lib/ai-assistant/types";

type AiAssistantChatPanelProps = {
  open: boolean;
  messages: AiAssistantMessage[];
  inputValue: string;
  isTyping: boolean;
  onClose: () => void;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onSuggestionClick: (prompt: string, suggestionId: string) => void;
};

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 -scale-x-100"
      aria-hidden="true"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function RecommendationCard({
  recommendation,
}: {
  recommendation: AiAssistantTripRecommendation;
}) {
  return (
    <Link
      href={recommendation.href}
      className="block rounded-xl border border-emerald-100/90 bg-emerald-50/50 px-3.5 py-3 transition-colors hover:border-emerald-200 hover:bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/35"
    >
      <p className="text-sm font-bold text-stone-900 dark:text-stone-50">
        {recommendation.title}
      </p>
      <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
        {recommendation.region}
      </p>
      {recommendation.tags.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {recommendation.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-emerald-800 dark:bg-stone-900 dark:text-emerald-200"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <span className="mt-2 inline-flex text-xs font-semibold text-emerald-700 dark:text-emerald-300">
        לעמוד הטיול ←
      </span>
    </Link>
  );
}

function MessageBubble({ message }: { message: AiAssistantMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[88%] sm:max-w-[85%] ${
          isUser
            ? "rounded-2xl rounded-br-md bg-emerald-700 px-4 py-3 text-sm leading-relaxed text-white shadow-sm"
            : "space-y-3"
        }`}
      >
        <div
          className={
            isUser
              ? "whitespace-pre-wrap"
              : "whitespace-pre-wrap rounded-2xl rounded-bl-md border border-emerald-100/80 bg-white px-4 py-3 text-sm leading-relaxed text-stone-700 shadow-sm dark:border-emerald-900/50 dark:bg-stone-900 dark:text-stone-200"
          }
        >
          {message.content}
        </div>

        {!isUser && message.recommendations && message.recommendations.length > 0 ? (
          <div className="space-y-2">
            {message.recommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.slug}
                recommendation={recommendation}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function AiAssistantChatPanel({
  open,
  messages,
  inputValue,
  isTyping,
  onClose,
  onInputChange,
  onSend,
  onSuggestionClick,
}: AiAssistantChatPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    return () => window.clearTimeout(timer);
  }, [open]);

  if (!open) {
    return null;
  }

  const canSend = inputValue.trim().length > 0 && !isTyping;

  return (
    <>
      <button
        type="button"
        aria-label="סגירת צ'אט מילאנה AI"
        className="fixed inset-0 z-[65] bg-stone-950/25 backdrop-blur-[1px] sm:bg-stone-950/15"
        onClick={onClose}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-assistant-title"
        className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[min(92dvh,720px)] flex-col overflow-hidden rounded-t-[1.75rem] border border-emerald-100/80 bg-gradient-to-b from-emerald-50/95 via-white to-white shadow-[0_-20px_60px_-20px_rgba(6,78,59,0.35)] dark:border-emerald-900/60 dark:from-stone-950 dark:via-stone-950 dark:to-stone-950 sm:inset-x-auto sm:bottom-24 sm:left-6 sm:w-[min(420px,calc(100vw-3rem))] sm:rounded-[1.75rem] sm:border sm:shadow-[0_24px_60px_-20px_rgba(6,78,59,0.4)]"
      >
        <header className="flex items-start gap-3 border-b border-emerald-100/80 bg-white/70 px-4 py-4 backdrop-blur-sm dark:border-emerald-900/50 dark:bg-stone-950/80 sm:px-5">
          <span className="relative size-11 shrink-0 overflow-hidden rounded-full ring-2 ring-emerald-200/90 dark:ring-emerald-800">
            <Image
              src={AI_ASSISTANT_AVATAR_SRC}
              alt={AI_ASSISTANT_AVATAR_ALT}
              fill
              sizes="44px"
              className="object-cover"
            />
          </span>

          <div className="min-w-0 flex-1 pt-0.5">
            <h2
              id="ai-assistant-title"
              className="text-base font-bold text-emerald-950 dark:text-emerald-50"
            >
              מילאנה AI
            </h2>
            <p className="text-xs leading-snug text-emerald-800/85 dark:text-emerald-200/75">
              העוזרת הטיולית האישית שלך
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="סגור"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-800 dark:hover:bg-stone-800 dark:hover:text-stone-100"
          >
            <CloseIcon />
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {isTyping ? (
              <div className="flex justify-end">
                <div className="inline-flex items-center gap-1 rounded-2xl rounded-bl-md border border-emerald-100/80 bg-white px-4 py-3 dark:border-emerald-900/50 dark:bg-stone-900">
                  <span className="size-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:0ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:120ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-emerald-500 [animation-delay:240ms]" />
                </div>
              </div>
            ) : null}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-emerald-100/80 bg-white/85 px-4 py-3 backdrop-blur-sm dark:border-emerald-900/50 dark:bg-stone-950/90 sm:px-5 sm:py-4">
            <div className="mb-3 flex flex-wrap gap-2">
              {AI_ASSISTANT_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion.id}
                  type="button"
                  onClick={() => onSuggestionClick(suggestion.prompt, suggestion.id)}
                  disabled={isTyping}
                  className="rounded-full border border-emerald-200/90 bg-emerald-50/80 px-3 py-1.5 text-xs font-medium text-emerald-900 transition-colors hover:border-emerald-300 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100 dark:hover:bg-emerald-950/70"
                >
                  {suggestion.label}
                </button>
              ))}
            </div>

            <form
              className="flex items-end gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                if (canSend) {
                  onSend();
                }
              }}
            >
              <label htmlFor="ai-assistant-input" className="sr-only">
                הודעה למילאנה AI
              </label>
              <textarea
                id="ai-assistant-input"
                ref={inputRef}
                rows={1}
                value={inputValue}
                onChange={(event) => onInputChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    if (canSend) {
                      onSend();
                    }
                  }
                }}
                placeholder="ספרו לי מה בא לכם לעשות..."
                className="max-h-28 min-h-11 flex-1 resize-none rounded-2xl border border-stone-200 bg-white px-4 py-2.5 text-sm leading-relaxed text-stone-800 outline-none transition-colors placeholder:text-stone-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200/70 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-emerald-700 dark:focus:ring-emerald-900/40"
              />

              <button
                type="submit"
                disabled={!canSend}
                aria-label="שליחת הודעה"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-stone-300 dark:disabled:bg-stone-700"
              >
                <SendIcon />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
