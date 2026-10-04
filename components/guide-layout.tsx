import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader, SiteFooter } from "@/components/site-chrome";
import { GUIDES, type Guide } from "@/lib/guides";
import { SITE_NAME, SITE_URL } from "@/lib/site";

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Shared page shell for guides: breadcrumbs, article schema, CTA and related guides */
export function GuideLayout({
  guide,
  children,
}: {
  guide: Guide;
  children: React.ReactNode;
}) {
  const url = `${SITE_URL}/guides/${guide.slug}`;
  const related = GUIDES.filter((g) => g.slug !== guide.slug);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        datePublished: guide.published,
        dateModified: guide.published,
        mainEntityOfPage: url,
        url,
        image: `${SITE_URL}/opengraph-image`,
        inLanguage: "en-US",
        author: {
          "@type": "Organization",
          name: `${SITE_NAME} team`,
          url: SITE_URL,
        },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guides",
            item: `${SITE_URL}/guides`,
          },
          { "@type": "ListItem", position: 3, name: guide.title, item: url },
        ],
      },
    ],
  };

  return (
    <main className="landing min-h-screen antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageHeader />

      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
        <nav
          aria-label="Breadcrumb"
          className="text-[11px] uppercase tracking-[0.18em] text-ink/55"
        >
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span className="mx-2 text-ink/30">/</span>
          <Link href="/guides" className="hover:text-accent">
            Guides
          </Link>
        </nav>

        <h1 className="font-display mt-6 text-4xl uppercase leading-[0.98] sm:text-5xl">
          {guide.title}
        </h1>
        <p className="mt-6 text-[15px] leading-relaxed text-ink/65">
          {guide.description}
        </p>
        <p className="mt-6 border-b border-line pb-8 text-[11px] uppercase tracking-[0.18em] text-ink/55">
          By the FitLens team <span className="text-ink/30">{"//"}</span>{" "}
          {formatDate(guide.published)}{" "}
          <span className="text-ink/30">{"//"}</span> {guide.readMinutes} min
          read
        </p>

        <div className="guide-prose mt-10">{children}</div>

        <aside className="mt-16 border border-line bg-card p-7">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {"// FitLens"}
          </p>
          <p className="font-display mt-3 text-2xl uppercase">
            See every client&apos;s meals in one place.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/65">
            Clients snap a photo of each meal, FitLens estimates the calories
            and macros, and you get a daily list of who needs you. Free for
            trainers during the pilot.
          </p>
          <Link
            href="/#pilot"
            className="mt-6 inline-flex items-center gap-2 bg-accent px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-paper hover:opacity-90"
          >
            Join the pilot <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>

        <section className="mt-16">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-ink/55">
            Related guides
          </h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {related.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="group flex items-center justify-between gap-6 py-4"
                >
                  <span className="text-sm font-medium group-hover:text-accent">
                    {g.title}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-ink/40 group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
