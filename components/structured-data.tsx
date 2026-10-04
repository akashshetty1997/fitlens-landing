import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
} from "@/lib/site";

type Faq = { q: string; a: string };

/**
 * JSON-LD for search engines: who makes FitLens, the site itself, the iPhone
 * app, and the FAQ shown on the page.
 */
export function StructuredData({ faqs }: { faqs: Faq[] }) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        email: SUPPORT_EMAIL,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: SUPPORT_EMAIL,
          url: `${SITE_URL}/support`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "MobileApplication",
        "@id": `${SITE_URL}/#app`,
        name: "FitLens AI",
        operatingSystem: "iOS",
        applicationCategory: "HealthApplication",
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        screenshot: [
          `${SITE_URL}/screens/trainer-dashboard.webp`,
          `${SITE_URL}/screens/meal-result.webp`,
          `${SITE_URL}/screens/client-home.webp`,
        ],
        featureList: [
          "AI meal analysis from a photo or text",
          "Calories, protein, carbs and fat for every meal",
          "Trainer dashboard with a daily attention queue",
          "Meal plans shared with clients",
          "Private squads and coach chat",
        ],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: the data is static and contains no "</script>"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
