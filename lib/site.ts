// Public site details used for metadata, sitemap and structured data.
// Set NEXT_PUBLIC_SITE_URL when the site moves to a custom domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://usefitlens.com"
).replace(/\/$/, "");

export const SITE_NAME = "FitLens";

export const SITE_TITLE =
  "FitLens: AI Nutrition Tracking App for Personal Trainers";

export const SITE_DESCRIPTION =
  "Clients snap a photo of every meal and FitLens AI turns it into calories and macros. Trainers see every client's nutrition, compliance and who needs attention today.";

export const SUPPORT_EMAIL = "support@usefitlens.com";
