import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { Wordmark } from "@/components/wordmark";
import { SUPPORT_EMAIL } from "@/lib/site";

// Header and footer shared by the home page and the content pages.

export { Wordmark };

/** Header for content pages: the same navigation as the home page */
export function PageHeader() {
  return <SiteNav />;
}

const FOOTER_GROUPS = [
  {
    title: "Product",
    links: [
      { href: "/workout-plans", label: "Workout plans" },
      { href: "/for-trainers", label: "Nutrition tracking" },
      { href: "/#how", label: "How it works" },
      { href: "/#pilot", label: "Join the pilot" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/guides", label: "Guides" },
      { href: "/#faq", label: "FAQ" },
      { href: "/support", label: "Support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/delete-account", label: "Delete account" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm leading-6 text-ink-2">
            The personal trainer app for coaching nutrition and training in one
            place.
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="mt-4 inline-block text-sm text-ink underline decoration-accent decoration-2 underline-offset-4"
          >
            {SUPPORT_EMAIL}
          </a>
        </div>
        {FOOTER_GROUPS.map((group) => (
          <div key={group.title}>
            <p className="text-sm font-semibold text-ink">{group.title}</p>
            <ul className="mt-3 space-y-1">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-9 items-center text-sm text-ink-2 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-ink-2 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© {new Date().getFullYear()} FitLens</span>
          <a
            href="https://repdb.co"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            Exercise data by RepDB
          </a>
        </div>
      </div>
    </footer>
  );
}
