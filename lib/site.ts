// Public site details used for metadata, sitemap and structured data.
// Set NEXT_PUBLIC_SITE_URL when the site moves to a custom domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://usefitlens.com"
).replace(/\/$/, "");

export const SITE_NAME = "FitLens";

export const SITE_TITLE =
  "FitLens: Personal Trainer App to Coach More Clients";

export const SITE_DESCRIPTION =
  "Take on more clients without more admin: AI meal tracking, workout plans clients follow set by set, and a daily list of who needs you, in one app.";

export const SUPPORT_EMAIL = "contact@usefitlens.com";
