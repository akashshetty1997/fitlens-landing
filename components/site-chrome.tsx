import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Header, footer and wordmark shared by the home page and the content pages.

export function Wordmark() {
  return (
    <Link
      href="/"
      aria-label="FitLens home"
      className="flex items-center gap-2.5"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/fitlens-mark.png"
        alt=""
        width={30}
        height={30}
        className="h-[30px] w-[30px]"
      />
      <span className="font-display text-[15px] uppercase leading-none tracking-[0.12em]">
        FitLens
      </span>
    </Link>
  );
}

/** Simple header for content pages (privacy, terms, support) */
export function PageHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Wordmark />
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-ink/50 transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to FitLens
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
      <Wordmark />
      <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-ink/60">
        <Link
          href="/for-trainers"
          className="transition-colors hover:text-accent"
        >
          For trainers
        </Link>
        <Link
          href="/compare/trainerize-alternative"
          className="transition-colors hover:text-accent"
        >
          Trainerize alternative
        </Link>
        <Link href="/guides" className="transition-colors hover:text-accent">
          Guides
        </Link>
        <Link
          href="/privacy-policy"
          className="transition-colors hover:text-accent"
        >
          Privacy
        </Link>
        <Link href="/terms" className="transition-colors hover:text-accent">
          Terms
        </Link>
        <Link href="/support" className="transition-colors hover:text-accent">
          Support
        </Link>
        <span>© {new Date().getFullYear()} FitLens</span>
      </div>
    </footer>
  );
}
