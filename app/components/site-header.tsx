"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { SocialLinksMobileList, SocialLinksRow } from "@/app/components/social-links";

const navItems = [
  { label: "ראשי", href: "/" },
  { label: "המלצות לטיולים", href: "/recommendations" },
  { label: "אזורים בארץ", href: "/#regions" },
  { label: "שטח 4x4", href: "/offroad" },
  { label: "אודות", href: "/about" },
  { label: "צור קשר", href: "/contact" },
] as const;

const SOLID_HEADER_PATHS = new Set(["/recommendations", "/search"]);

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      ) : (
        <>
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </>
      )}
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function HeaderSearchToggle({
  scrolled,
  menuOpen,
  searchOpen,
  onToggle,
}: {
  scrolled: boolean;
  menuOpen: boolean;
  searchOpen: boolean;
  onToggle: () => void;
}) {
  const isSolid = scrolled || menuOpen || searchOpen;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={searchOpen}
      aria-controls="header-search-panel"
      aria-label={searchOpen ? "סגור חיפוש" : "פתח חיפוש"}
      className={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${
        isSolid
          ? "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
          : "text-white/90 hover:bg-white/15 hover:text-white"
      }`}
    >
      <SearchIcon />
    </button>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!searchOpen) return;

    searchInputRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    }

    function handlePointerDown(event: MouseEvent) {
      if (
        searchPanelRef.current &&
        !searchPanelRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handlePointerDown);
    };
  }, [searchOpen]);

  function handleSearchToggle() {
    setSearchOpen((prev) => {
      const next = !prev;
      if (next) setMenuOpen(false);
      return next;
    });
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("q") ?? "").trim();
    const target = query
      ? `/search?q=${encodeURIComponent(query)}`
      : "/search";
    window.location.href = target;
  }

  const headerSolid =
    SOLID_HEADER_PATHS.has(pathname) ||
    scrolled ||
    menuOpen ||
    searchOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        headerSolid
          ? "border-b border-stone-200/60 bg-white/90 shadow-lg shadow-stone-900/5 backdrop-blur-xl dark:border-stone-700/60 dark:bg-stone-950/90"
          : "border-b border-white/15 bg-white/20 shadow-sm shadow-stone-900/5 backdrop-blur-xl dark:border-stone-700/30 dark:bg-stone-950/50"
      }`}
    >
      <div ref={searchPanelRef}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:gap-6">
        <Link
          href="/"
          className={`text-xl font-bold tracking-tight transition-colors ${
            headerSolid
              ? "text-stone-900 dark:text-stone-50"
              : "text-white drop-shadow-sm"
          }`}
          onClick={() => {
            setMenuOpen(false);
            setSearchOpen(false);
          }}
        >
          בשביל הלב
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="ניווט ראשי"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                headerSolid
                  ? "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
                  : "text-white/90 hover:bg-white/15 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <SocialLinksRow
            className="me-1 ms-3 border-s border-stone-200/60 ps-3 dark:border-stone-700/60"
            linkClassName={`inline-flex items-center justify-center rounded-full p-2 transition-colors ${
              headerSolid
                ? "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
                : "text-white/90 hover:bg-white/15 hover:text-white"
            }`}
          />
          <HeaderSearchToggle
            scrolled={headerSolid}
            menuOpen={menuOpen}
            searchOpen={searchOpen}
            onToggle={handleSearchToggle}
          />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <HeaderSearchToggle
            scrolled={headerSolid}
            menuOpen={menuOpen}
            searchOpen={searchOpen}
            onToggle={handleSearchToggle}
          />
          <SocialLinksRow
            linkClassName={`inline-flex items-center justify-center rounded-xl p-2 transition-colors ${
              headerSolid
                ? "text-stone-800 hover:bg-stone-100 dark:text-stone-100 dark:hover:bg-stone-800"
                : "text-white hover:bg-white/15"
            }`}
          />
          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-xl p-2.5 transition-colors ${
              headerSolid
                ? "text-stone-800 hover:bg-stone-100 dark:text-stone-100 dark:hover:bg-stone-800"
                : "text-white hover:bg-white/15"
            }`}
            onClick={() => {
              setMenuOpen((prev) => !prev);
              setSearchOpen(false);
            }}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <div
        id="header-search-panel"
        className={`overflow-hidden border-t transition-all duration-300 ${
          searchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
        } ${
          headerSolid
            ? "border-stone-200/60 bg-white/95 dark:border-stone-700/60 dark:bg-stone-950/95"
            : "border-white/10 bg-stone-900/75 backdrop-blur-xl"
        }`}
        aria-hidden={!searchOpen}
      >
        <form
          onSubmit={handleSearchSubmit}
          className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3"
        >
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-stone-200/80 bg-white px-4 py-2.5 shadow-sm dark:border-stone-700 dark:bg-stone-900">
            <SearchIcon />
            <input
              ref={searchInputRef}
              type="search"
              name="q"
              placeholder="חפשו מסלול, אזור או חוויה..."
              className="w-full bg-transparent text-base text-stone-800 placeholder:text-stone-400 focus:outline-none dark:text-stone-100 dark:placeholder:text-stone-500"
              aria-label="חיפוש מסלולים"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
          >
            חיפוש
          </button>
        </form>
      </div>
      </div>

      <nav
        id="mobile-nav"
        className={`overflow-hidden border-t transition-all duration-500 lg:hidden ${
          menuOpen ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
        } ${
          headerSolid
            ? "border-stone-200/60 bg-white/95 dark:border-stone-700/60 dark:bg-stone-950/95"
            : "border-white/10 bg-stone-900/90 backdrop-blur-xl"
        }`}
        aria-label="ניווט נייד"
        aria-hidden={!menuOpen}
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                  headerSolid
                    ? "text-stone-700 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-800"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 border-t border-stone-200/60 pt-3 dark:border-stone-700/60">
            <p className="mb-2 px-4 text-xs font-semibold text-stone-500 dark:text-stone-400">
              רשתות חברתיות
            </p>
            <SocialLinksMobileList
              className="flex flex-col gap-1"
              linkClassName={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                headerSolid
                  ? "text-stone-700 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-800"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
              onLinkClick={() => setMenuOpen(false)}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}
