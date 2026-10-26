"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/wordmark";

// One navigation bar for every page. The only client code is the mobile menu.

export const NAV_LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/workout-plans", label: "Workouts" },
  { href: "/for-trainers", label: "Nutrition" },
  { href: "/guides", label: "Guides" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and returns focus to its button
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-xl backdrop-saturate-150">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8"
      >
        <Wordmark />

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-3 py-2 text-sm text-ink-2 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/#pilot"
            className="hidden h-10 items-center rounded-full bg-accent px-5 text-sm font-semibold text-on-accent transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Join the pilot
          </Link>
          <button
            ref={button}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-card md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-paper md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center text-base text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <Link
                href="/#pilot"
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center rounded-full bg-accent text-base font-semibold text-on-accent"
              >
                Join the free trainer pilot
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
