// Guides shown on /guides, in the sitemap and in "related guides".
export type Guide = {
  slug: string;
  title: string;
  description: string;
  published: string; // ISO date
  readMinutes: number;
};

export const GUIDES: Guide[] = [
  {
    slug: "track-client-nutrition",
    title: "How to Track Your Clients' Nutrition as a Personal Trainer",
    description:
      "A practical system for tracking client nutrition: which method to use, what to measure, how to review it weekly without burning out, and how to give feedback that sticks.",
    published: "2026-10-04",
    readMinutes: 7,
  },
  {
    slug: "ai-calorie-counter-accuracy",
    title: "How Accurate Are AI Calorie Counters From Photos?",
    description:
      "How photo-based calorie estimation works, where it is reliable, where it struggles (oils, sauces, portions), and simple habits that make estimates much better.",
    published: "2026-10-04",
    readMinutes: 6,
  },
  {
    slug: "food-diary-vs-photo-logging",
    title: "Food Diaries vs. Photo Logging: What Works Better for Clients?",
    description:
      "Written food diaries, calorie-counting apps and photo logging compared on effort, detail and trainer workload, plus when to use each.",
    published: "2026-10-04",
    readMinutes: 5,
  },
];

export function getGuide(slug: string) {
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) throw new Error(`Unknown guide: ${slug}`);
  return guide;
}
