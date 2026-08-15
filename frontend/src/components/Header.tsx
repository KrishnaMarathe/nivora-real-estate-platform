"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSavedProperties } from "@/hooks/useSavedProperties";

export default function Header() {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const lastScrollPosition = useRef(0);

  const { savedCount } = useSavedProperties();

  const {
    user,
    isAuthenticated,
    isAuthLoading,
    isAdmin,
    signOut,
  } = useAuth();

  const userName =
    typeof user?.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : user?.email ?? "Account";

  useEffect(() => {
    function updateHeaderVisibility() {
      const currentScrollPosition = window.scrollY;
      const isScrollingDown =
        currentScrollPosition > lastScrollPosition.current;

      if (currentScrollPosition < 80) {
        setIsHeaderHidden(false);
      } else if (!isMenuOpen && isScrollingDown) {
        setIsHeaderHidden(true);
      } else if (!isScrollingDown) {
        setIsHeaderHidden(false);
      }

      lastScrollPosition.current = currentScrollPosition;
    }

    window.addEventListener("scroll", updateHeaderVisibility, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", updateHeaderVisibility);
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  async function handleSignOut() {
    setIsSigningOut(true);

    try {
      await signOut();
      closeMenu();
      router.push("/");
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(251,249,244,0.96)] backdrop-blur-md transition-transform duration-300 ease-out ${
        isHeaderHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="page-container flex min-h-16 items-center justify-between gap-2 sm:min-h-20 sm:gap-5">
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2 sm:gap-3"
          aria-label="Nivora homepage"
        >
          <span className="grid h-10 w-9 place-items-center rounded-t-full rounded-b-md bg-[var(--primary)] font-[var(--font-heading)] text-xl italic text-white sm:h-11 sm:w-10">
            N
          </span>

          <span>
            <strong className="block font-[var(--font-heading)] text-xl leading-none font-normal text-[var(--primary)] sm:text-2xl">
              Nivora
            </strong>

            <small className="mt-1 hidden text-[0.55rem] font-bold uppercase tracking-[0.13rem] text-[var(--text-muted)] sm:block">
              South Bombay Property Advisors
            </small>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Main navigation"
        >
          <Link
            href="/properties?purpose=buy"
            className="text-sm font-medium transition hover:text-[var(--accent)]"
          >
            Buy
          </Link>

          <Link
            href="/properties?purpose=rent"
            className="text-sm font-medium transition hover:text-[var(--accent)]"
          >
            Rent
          </Link>

          <Link
            href="/localities"
            className="text-sm font-medium transition hover:text-[var(--accent)]"
          >
            Localities
          </Link>

          <Link
            href="/list-property"
            className="text-sm font-medium transition hover:text-[var(--accent)]"
          >
            List a property
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {isAdmin && (
            <Link
              href="/admin"
              className="hidden min-h-11 items-center rounded-md bg-[var(--accent)] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[var(--accent-dark)] lg:inline-flex"
            >
              Admin dashboard
            </Link>
          )}

          <Link
            href="/saved"
            className="relative inline-flex min-h-11 items-center rounded-md border border-[var(--border)] px-3 text-sm font-semibold transition hover:border-[var(--primary)] sm:px-4"
          >
            <span aria-hidden="true" className="mr-2 text-lg">
              ♡
            </span>

            <span className="hidden sm:inline">Saved</span>

            {savedCount > 0 && (
              <span className="ml-2 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--accent)] px-1 text-[0.65rem] text-white">
                {savedCount}
              </span>
            )}
          </Link>

          {!isAuthLoading && !isAuthenticated && (
            <Link
              href="/login"
              className="primary-button hidden whitespace-nowrap sm:inline-flex"
            >
              Sign in
            </Link>
          )}

          {!isAuthLoading && isAuthenticated && (
            <div className="hidden items-center gap-2 sm:flex">
              <div className="max-w-32">
                <span
                  className="block truncate text-sm font-semibold text-[var(--primary)]"
                  title={userName}
                >
                  {userName}
                </span>

                {isAdmin && (
                  <span className="block text-[0.6rem] font-bold uppercase tracking-wider text-[var(--accent)]">
                    Administrator
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-[var(--primary)] px-4 text-sm font-bold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSigningOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
          )}

          {isAuthLoading && (
            <span
              className="hidden h-11 w-24 animate-pulse rounded-md bg-[var(--cream)] sm:block"
              aria-label="Checking account"
            />
          )}

          <button
            type="button"
            onClick={() =>
              setIsMenuOpen((currentValue) => !currentValue)
            }
            aria-label={
              isMenuOpen ? "Close navigation" : "Open navigation"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="grid h-10 w-10 place-items-center rounded-md border border-[var(--border)] text-xl text-[var(--primary)] sm:h-11 sm:w-11 lg:hidden"
          >
            <span aria-hidden="true">
              {isMenuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-[var(--border)] bg-[var(--background)] transition-all duration-300 lg:hidden ${
          isMenuOpen
            ? "max-h-[34rem] opacity-100"
            : "max-h-0 border-t-transparent opacity-0"
        }`}
      >
        <nav
          className="page-container flex flex-col py-4"
          aria-label="Mobile navigation"
        >
          <Link
            href="/properties?purpose=buy"
            onClick={closeMenu}
            className="border-b border-[var(--border)] py-4 font-semibold"
          >
            Buy properties
          </Link>

          <Link
            href="/properties?purpose=rent"
            onClick={closeMenu}
            className="border-b border-[var(--border)] py-4 font-semibold"
          >
            Rent properties
          </Link>

          <Link
            href="/localities"
            onClick={closeMenu}
            className="border-b border-[var(--border)] py-4 font-semibold"
          >
            Explore localities
          </Link>

          <Link
            href="/list-property"
            onClick={closeMenu}
            className="border-b border-[var(--border)] py-4 font-semibold"
          >
            List a property
          </Link>

          {isAdmin && (
            <Link
              href="/admin"
              onClick={closeMenu}
              className="border-b border-[var(--border)] py-4 font-bold text-[var(--accent)]"
            >
              Open admin dashboard
            </Link>
          )}

          {!isAuthLoading && !isAuthenticated && (
            <Link
              href="/login"
              onClick={closeMenu}
              className="primary-button mt-4"
            >
              Sign in
            </Link>
          )}

          {!isAuthLoading && isAuthenticated && (
            <div className="mt-4">
              <p className="truncate text-sm font-semibold text-[var(--primary)]">
                Signed in as {userName}
              </p>

              {isAdmin && (
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
                  Administrator account
                </p>
              )}

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-md border border-[var(--primary)] px-5 py-3 font-bold text-[var(--primary)] disabled:opacity-60"
              >
                {isSigningOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
