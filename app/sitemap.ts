import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { GUIDES } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-04");
  // Pages updated when workout plans were added
  const workoutsLaunch = new Date("2026-10-26");
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: workoutsLaunch,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/workout-plans`,
      lastModified: workoutsLaunch,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/support`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/delete-account`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/for-trainers`,
      lastModified: workoutsLaunch,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...GUIDES.map((g) => ({
      url: `${SITE_URL}/guides/${g.slug}`,
      lastModified: new Date(g.published),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
