"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type RefObject,
} from "react";
import {
  findHighlightRange,
  searchTripSuggestions,
  type TripSearchEntry,
  type TripSearchSuggestion,
} from "@/lib/search-trips";

let cachedIndexPromise: Promise<TripSearchEntry[]> | null = null;

function fetchTripSearchIndex(): Promise<TripSearchEntry[]> {
  if (!cachedIndexPromise) {
    cachedIndexPromise = fetch("/api/search/index").then(async (response) => {
      if (!response.ok) {
        throw new Error("Failed to load search index");
      }
      return response.json() as Promise<TripSearchEntry[]>;
    });
  }

  return cachedIndexPromise;
}

type SearchAutocompleteVariant = "header" | "hero" | "page";

type SearchAutocompleteProps = {
  variant?: SearchAutocompleteVariant;
  initialQuery?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  onQueryChange?: (query: string) => void;
  onNavigate?: () => void;
};

function SearchIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const range = findHighlightRange(text, query);

  if (!range) {
    return <>{text}</>;
  }

  return (
    <>
      {text.slice(0, range.start)}
      <mark className="rounded bg-emerald-100 px-0.5 text-inherit dark:bg-emerald-500/20">
        {text.slice(range.start, range.end)}
      </mark>
      {text.slice(range.end)}
    </>
  );
}

function getSuggestionMeta(suggestion: TripSearchSuggestion): string {
  if (suggestion.matchedField === "region") {
    return suggestion.region;
  }
  if (suggestion.matchedField === "category" || suggestion.matchedField === "tag") {
    return `${suggestion.region} · ${suggestion.matchedText}`;
  }
  if (suggestion.matchedField === "alias") {
    return `${suggestion.region} · ${suggestion.matchedText}`;
  }
  return `${suggestion.region} · ${suggestion.category}`;
}

function getVariantStyles(variant: SearchAutocompleteVariant) {
  if (variant === "hero") {
    return {
      form: "mt-5 flex w-full flex-col gap-2 rounded-2xl border border-white/25 bg-white/88 p-2 shadow-[0_8px_28px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 focus-within:border-white/40 focus-within:bg-white/95 focus-within:shadow-[0_12px_36px_rgba(0,0,0,0.16)] sm:mx-auto sm:mt-8 sm:max-w-xl sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:p-2 lg:mt-10 lg:max-w-[40rem]",
      inputWrap:
        "flex flex-1 items-center gap-3 rounded-xl px-3 sm:rounded-full sm:px-4",
      input:
        "w-full bg-transparent py-2.5 text-base text-stone-700 placeholder:text-stone-400 focus:outline-none",
      button:
        "min-h-10 w-full shrink-0 rounded-xl bg-stone-800/95 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 sm:w-auto sm:rounded-full sm:px-7",
      dropdown:
        "absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-stone-200/90 bg-white/98 shadow-[0_18px_50px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-stone-700 dark:bg-stone-950/98",
    };
  }

  if (variant === "page") {
    return {
      form: "mx-auto flex max-w-2xl flex-col items-stretch gap-3 rounded-2xl border border-stone-200 bg-white p-2 shadow-sm dark:border-stone-700 dark:bg-stone-900 sm:flex-row sm:items-center sm:rounded-full sm:p-2.5",
      inputWrap: "flex flex-1 items-center gap-3 px-4",
      input:
        "w-full bg-transparent py-3 text-base text-stone-800 placeholder:text-stone-400 focus:outline-none dark:text-stone-100 sm:text-lg",
      button:
        "shrink-0 rounded-xl bg-stone-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 sm:rounded-full sm:px-8 sm:text-base",
      dropdown:
        "absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.14)] dark:border-stone-700 dark:bg-stone-900",
    };
  }

  return {
    form: "mx-auto flex max-w-6xl items-start gap-2 px-4 py-3 sm:gap-3 sm:px-6",
    inputWrap:
      "relative flex flex-1 items-center gap-3 rounded-2xl border border-stone-200/80 bg-white px-4 py-2.5 shadow-sm dark:border-stone-700 dark:bg-stone-900",
    input:
      "w-full bg-transparent text-base text-stone-800 placeholder:text-stone-400 focus:outline-none dark:text-stone-100 dark:placeholder:text-stone-500",
    button:
      "shrink-0 rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 min-h-11 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200",
    dropdown:
      "absolute inset-x-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.14)] dark:border-stone-700 dark:bg-stone-900",
  };
}

export default function SearchAutocomplete({
  variant = "header",
  initialQuery = "",
  inputRef,
  onQueryChange,
  onNavigate,
}: SearchAutocompleteProps) {
  const listboxId = useId();
  const localInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [entries, setEntries] = useState<TripSearchEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoadingIndex, setIsLoadingIndex] = useState(false);
  const styles = getVariantStyles(variant);

  const suggestions = useMemo(
    () => searchTripSuggestions(query, entries, 8),
    [entries, query],
  );

  const showDropdown = isOpen && query.trim().length > 0;

  const loadSearchIndex = useCallback(async () => {
    if (entries.length > 0 || isLoadingIndex) {
      return;
    }

    setIsLoadingIndex(true);
    try {
      const data = await fetchTripSearchIndex();
      setEntries(data);
    } catch {
      cachedIndexPromise = null;
    } finally {
      setIsLoadingIndex(false);
    }
  }, [entries.length, isLoadingIndex]);

  useEffect(() => {
    let cancelled = false;

    void fetchTripSearchIndex()
      .then((data) => {
        if (!cancelled) {
          setEntries(data);
        }
      })
      .catch(() => {
        cachedIndexPromise = null;
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (!showDropdown) {
      setActiveIndex(-1);
      return;
    }

    setActiveIndex(suggestions.length > 0 ? 0 : -1);
  }, [showDropdown, suggestions]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, []);

  function navigateToSearchResults(searchQuery: string) {
    const target = searchQuery.trim()
      ? `/search?q=${encodeURIComponent(searchQuery.trim())}`
      : "/search";
    onNavigate?.();
    window.location.href = target;
  }

  function navigateToTrip(slug: string) {
    onNavigate?.();
    window.location.href = `/trips/${slug}`;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      navigateToTrip(suggestions[activeIndex].slug);
      return;
    }
    navigateToSearchResults(query);
  }

  function handleInputChange(value: string) {
    setQuery(value);
    onQueryChange?.(value);
    setIsOpen(true);
    void loadSearchIndex();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      return;
    }

    if (!showDropdown || suggestions.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % suggestions.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) =>
        current <= 0 ? suggestions.length - 1 : current - 1,
      );
    }
  }

  const resolvedInputRef = inputRef ?? localInputRef;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div ref={containerRef} className={`${styles.inputWrap} relative flex-1`}>
        <SearchIcon className={variant === "hero" ? "size-5 shrink-0 text-stone-400" : "size-5 shrink-0 text-stone-400"} />
        <input
          ref={resolvedInputRef}
          type="search"
          name="q"
          value={query}
          placeholder="חפשו מסלול, אזור או חוויה..."
          className={styles.input}
          aria-label="חיפוש מסלולים"
          aria-expanded={showDropdown}
          aria-controls={showDropdown ? listboxId : undefined}
          aria-autocomplete="list"
          role="combobox"
          autoComplete="off"
          onFocus={() => {
            setIsOpen(true);
            void loadSearchIndex();
          }}
          onChange={(event) => handleInputChange(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        {showDropdown ? (
          <div
            id={listboxId}
            role="listbox"
            aria-label="הצעות חיפוש"
            className={styles.dropdown}
          >
            {suggestions.length > 0 ? (
              <ul className="max-h-[min(24rem,60vh)] overflow-y-auto py-2">
                {suggestions.map((suggestion, index) => {
                  const optionId = `${listboxId}-option-${index}`;
                  const isActive = index === activeIndex;

                  return (
                    <li key={suggestion.slug} role="presentation">
                      <Link
                        id={optionId}
                        role="option"
                        aria-selected={isActive}
                        href={`/trips/${suggestion.slug}`}
                        className={`block px-4 py-3 transition-colors ${
                          isActive
                            ? "bg-emerald-50/90 dark:bg-emerald-500/10"
                            : "hover:bg-stone-50 dark:hover:bg-stone-800/70"
                        }`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={(event) => {
                          event.preventDefault();
                          navigateToTrip(suggestion.slug);
                        }}
                      >
                        <p className="text-base font-semibold text-stone-900 dark:text-stone-50">
                          <HighlightMatch
                            text={suggestion.placeName}
                            query={query}
                          />
                        </p>
                        <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">
                          <HighlightMatch
                            text={getSuggestionMeta(suggestion)}
                            query={query}
                          />
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="px-4 py-4 text-sm text-stone-500 dark:text-stone-400">
                {isLoadingIndex ? "טוען הצעות..." : "לא נמצאו הצעות - Enter לחיפוש מלא"}
              </div>
            )}
          </div>
        ) : null}
      </div>

      <button type="submit" className={styles.button}>
        חיפוש
      </button>
    </form>
  );
}
