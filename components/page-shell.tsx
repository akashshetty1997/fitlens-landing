import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader, SiteFooter } from "@/components/site-chrome";
import { SITE_URL } from "@/lib/site";

type Crumb = { name: string; path: string };

/**
 * Shell for marketing pages (use cases, comparisons): breadcrumbs,
 * WebPage + BreadcrumbList schema, a closing call to action and the footer.
 */
export function PageShell({
  path,
  title,
  description,
  crumbs,
  eyebrow,
  heading,
  intro,
  updated,
  children,
}: {
  path: string;
  title: string;
  description: string;
  crumbs: Crumb[];
  eyebrow: string;
  heading: React.ReactNode;
  intro: React.ReactNode;
  updated?: string;
  children: React.ReactNode;
}) {
  const url = `${SITE_URL}${path}`;
  const trail = [{ name: "Home", path: "/" }, ...crumbs];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#app` },
        ...(updated ? { dateModified: updated } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: trail.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: `${SITE_URL}${c.path === "/" ? "" : c.path}`,
        })),
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

      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-24">
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-ink-2"
        >
          {trail.slice(0, -1).map((c) => (
            <span key={c.path}>
              <Link href={c.path} className="hover:text-accent">
                {c.name}
              </Link>
              <span className="mx-2 text-ink-2">/</span>
            </span>
          ))}
          <span aria-current="page">{trail[trail.length - 1].name}</span>
        </nav>

        <p className="mt-8 text-sm font-semibold text-ink">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          {heading}
        </h1>
        <div className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink/70">
          {intro}
        </div>

        <div className="guide-prose mt-12">{children}</div>

        <aside className="mt-16 rounded-[20px] bg-card p-7">
          <p className="text-sm font-semibold text-ink">
            Join the pilot
          </p>
          <p className="mt-3 text-2xl font-bold tracking-tight">
            Coach with proof, not guesswork.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/65">
            FitLens is free for trainers with up to 10 clients, and always free
            for clients. Leave your email and we&apos;ll set you up.
          </p>
          <Link
            href="/#pilot"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[15px] font-semibold text-on-accent hover:opacity-90"
          >
            Join the pilot <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>

        {updated && (
          <p className="mt-8 text-sm text-ink-2">
            Last updated{" "}
            {new Date(`${updated}T12:00:00Z`).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}
