"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { SocialLinksMobileList, SocialLinksRow } from "@/app/components/social-links";

const navItems = [
  { label: "ראשי", href: "/" },
  { label: "המלצות לטיולים", href: "/recommendations" },
  { label: "בא לי לטייל", href: "/want-to-travel" },
  { label: "אזורים בארץ", href: "/#regions" },
  { label: "שטח 4x4", href: "/offroad" },
  { label: "רשימת ציוד", href: "/gear" },
  { label: "אודות", href: "/about" },
  { label: "צור קשר", href: "/contact" },
] as const;

const SOLID_HEADER_PATHS = new Set([
  "/recommendations",
  "/search",
  "/gear",
  "/want-to-travel",
]);

function isNavItemActive(
  href: string,
  pathname: string,
  hash: string,
): boolean {
  const currentHash = hash || "";

  if (href === "/") {
    if (pathname !== "/") return false;
    return currentHash !== "#regions";
  }

  if (href.startsWith("/#")) {
    const linkHash = href.slice(href.indexOf("#"));
    return pathname === "/" && currentHash === linkHash;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function desktopNavLinkClass(headerSolid: boolean, isActive: boolean): string {
  const base =
    "inline-flex rounded-full border px-4 py-2 text-sm font-medium outline-none transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-offset-1";

  if (headerSolid) {
    if (isActive) {
      return [
        base,
        "border-stone-200/90 bg-stone-900/[0.07] text-stone-900 shadow-[0_4px_14px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-md",
        "focus-visible:ring-stone-400/50 focus-visible:ring-offset-white",
        "dark:border-stone-600/70 dark:bg-white/10 dark:text-stone-50 dark:shadow-[0_4px_16px_rgba(0,0,0,0.22)] dark:focus-visible:ring-stone-500/50 dark:focus-visible:ring-offset-stone-950",
      ].join(" ");
    }

    return [
      base,
      "border-transparent bg-transparent text-stone-600",
      "hover:-translate-y-0.5 hover:border-stone-200/70 hover:bg-stone-100/85 hover:text-stone-900 hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)] hover:backdrop-blur-md",
      "focus-visible:ring-stone-400/50 focus-visible:ring-offset-white",
      "dark:text-stone-300 dark:hover:border-stone-600/60 dark:hover:bg-stone-800/85 dark:hover:text-white dark:focus-visible:ring-stone-500/50 dark:focus-visible:ring-offset-stone-950",
    ].join(" ");
  }

  if (isActive) {
    return [
      base,
      "-translate-y-0.5 border-white/45 bg-white/32 text-white",
      "shadow-[0_8px_24px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-md",
      "drop-shadow-[0_1px_12px_rgba(0,0,0,0.45)]",
      "focus-visible:ring-white/50 focus-visible:ring-offset-stone-900/20",
    ].join(" ");
  }

  return [
    base,
    "border-transparent bg-transparent text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.42)]",
    "hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/26 hover:text-white",
    "hover:shadow-[0_8px_24px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.22)] hover:backdrop-blur-md",
    "focus-visible:ring-white/45 focus-visible:ring-offset-stone-900/20",
  ].join(" ");
}

function mobileNavLinkClass(headerSolid: boolean, isActive: boolean): string {
  const base =
    "block min-h-12 rounded-xl border px-4 py-3.5 text-base font-medium outline-none transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-offset-1";

  if (headerSolid) {
    if (isActive) {
      return [
        base,
        "border-stone-200/90 bg-stone-900/[0.07] text-stone-900 shadow-sm backdrop-blur-md",
        "focus-visible:ring-stone-400/50 focus-visible:ring-offset-white",
        "dark:border-stone-600/70 dark:bg-white/10 dark:text-stone-50 dark:focus-visible:ring-stone-500/50 dark:focus-visible:ring-offset-stone-950",
      ].join(" ");
    }

    return [
      base,
      "border-transparent bg-transparent text-stone-700 hover:border-stone-200/60 hover:bg-stone-100/90 hover:shadow-sm hover:backdrop-blur-md",
      "focus-visible:ring-stone-400/50 focus-visible:ring-offset-white",
      "dark:text-stone-200 dark:hover:border-stone-600/50 dark:hover:bg-stone-800/90 dark:focus-visible:ring-stone-500/50 dark:focus-visible:ring-offset-stone-950",
    ].join(" ");
  }

  if (isActive) {
    return [
      base,
      "border-white/40 bg-white/30 text-white shadow-[0_6px_20px_rgba(0,0,0,0.2)] backdrop-blur-md",
      "drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)]",
      "focus-visible:ring-white/50 focus-visible:ring-offset-stone-900/30",
    ].join(" ");
  }

  return [
    base,
    "border-transparent bg-transparent text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.38)]",
    "hover:border-white/30 hover:bg-white/20 hover:backdrop-blur-md",
    "focus-visible:ring-white/45 focus-visible:ring-offset-stone-900/30",
  ].join(" ");
}

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
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-transparent transition-all duration-300 ease-out ${
        isSolid
          ? "text-stone-600 hover:-translate-y-0.5 hover:border-stone-200/70 hover:bg-stone-100/85 hover:text-stone-900 hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)] hover:backdrop-blur-md dark:text-stone-300 dark:hover:border-stone-600/60 dark:hover:bg-stone-800/85 dark:hover:text-white"
          : "text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.38)] hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/24 hover:text-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.2)] hover:backdrop-blur-md"
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
  const [hash, setHash] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const readHash = () => setHash(window.location.hash);
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);

  useEffect(() => {
    setHash(window.location.hash);
  }, [pathname]);

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
          : "border-b border-stone-900/12 bg-stone-900/[0.10] shadow-[0_4px_28px_rgba(0,0,0,0.14),inset_0_-1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl dark:border-stone-700/30 dark:bg-stone-950/50"
      }`}
    >
      <div ref={searchPanelRef}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:gap-6">
        <Link
          href="/"
          className={`text-xl font-bold tracking-tight transition-colors ${
            headerSolid
              ? "text-stone-900 dark:text-stone-50"
              : "text-white drop-shadow-[0_1px_14px_rgba(0,0,0,0.48)]"
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
          {navItems.map((item) => {
            const isActive = isNavItemActive(item.href, pathname, hash);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={desktopNavLinkClass(headerSolid, isActive)}
              >
                {item.label}
              </Link>
            );
          })}
          <SocialLinksRow
            className="me-1 ms-3 border-s border-stone-200/60 ps-3 dark:border-stone-700/60"
            linkClassName={`inline-flex items-center justify-center rounded-full border border-transparent p-2 transition-all duration-300 ease-out ${
              headerSolid
                ? "text-stone-600 hover:-translate-y-0.5 hover:border-stone-200/70 hover:bg-stone-100/85 hover:text-stone-900 hover:shadow-[0_6px_18px_rgba(0,0,0,0.08)] hover:backdrop-blur-md dark:text-stone-300 dark:hover:border-stone-600/60 dark:hover:bg-stone-800/85 dark:hover:text-white"
                : "text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.38)] hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/24 hover:shadow-[0_8px_24px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.2)] hover:backdrop-blur-md"
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
            linkClassName={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl transition-colors ${
              headerSolid
                ? "text-stone-800 hover:bg-stone-100 dark:text-stone-100 dark:hover:bg-stone-800"
                : "text-white hover:bg-white/15"
            }`}
          />
          <button
            type="button"
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl transition-colors ${
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
          className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6"
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
            className="shrink-0 rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-800 min-h-11 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
          >
            חיפוש
          </button>
        </form>
      </div>
      </div>

      <nav
        id="mobile-nav"
        className={`overflow-hidden border-t transition-all duration-500 lg:hidden ${
          menuOpen ? "max-h-[min(80dvh,640px)] opacity-100" : "max-h-0 opacity-0"
        } ${
          headerSolid
            ? "border-stone-200/60 bg-white/95 dark:border-stone-700/60 dark:bg-stone-950/95"
            : "border-white/10 bg-stone-900/90 backdrop-blur-xl"
        }`}
        aria-label="ניווט נייד"
        aria-hidden={!menuOpen}
      >
        <ul className="mx-auto flex max-h-[min(80dvh,640px)] max-w-6xl flex-col gap-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
          {navItems.map((item) => {
            const isActive = isNavItemActive(item.href, pathname, hash);

            return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={mobileNavLinkClass(headerSolid, isActive)}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
            );
          })}
          <li className="mt-2 border-t border-stone-200/60 pt-3 dark:border-stone-700/60">
            <p className="mb-2 px-4 text-xs font-semibold text-stone-500 dark:text-stone-400">
              רשתות חברתיות
            </p>
            <SocialLinksMobileList
              className="flex flex-col gap-1"
              linkClassName={`flex min-h-12 items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
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
