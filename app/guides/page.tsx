import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader, SiteFooter } from "@/components/site-chrome";
import { GUIDES } from "@/lib/guides";

const description =
  "Practical guides for personal trainers on tracking client nutrition, photo-based calorie counting and building habits that stick.";

export const metadata: Metadata = {
  title: "Nutrition Coaching Guides for Personal Trainers",
  description,
  alternates: { canonical: "/guides" },
  openGraph: {
    url: "/guides",
    title: "Nutrition Coaching Guides for Personal Trainers | FitLens",
    description,
  },
};

export default function GuidesPage() {
  return (
    <main className="landing min-h-screen antialiased">
      <PageHeader />
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-accent">
          {"// Guides"}
        </p>
        <h1 className="font-display text-4xl uppercase leading-[0.98] sm:text-6xl">
          Nutrition coaching,{" "}
          <em className="not-italic text-accent">explained.</em>
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink/65">
          {description}
        </p>

        <ul className="mt-14 border-t border-line">
          {GUIDES.map((guide, i) => (
            <li key={guide.slug} className="border-b border-line">
              <Link
                href={`/guides/${guide.slug}`}
                className="group grid gap-3 py-7 sm:grid-cols-[3rem_1fr_auto] sm:gap-6"
              >
                <span className="text-xs text-accent">0{i + 1}</span>
                <span>
                  <span className="block text-lg font-medium leading-snug group-hover:text-accent">
                    {guide.title}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-ink/60">
                    {guide.description}
                  </span>
                  <span className="mt-3 block text-[11px] uppercase tracking-[0.18em] text-ink/55">
                    {guide.readMinutes} min read
                  </span>
                </span>
                <ArrowRight className="hidden h-5 w-5 text-ink/40 group-hover:text-accent sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <SiteFooter />
    </main>
  );
}
