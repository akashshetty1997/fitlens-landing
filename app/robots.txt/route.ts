import { SITE_URL } from "@/lib/site";

// robots.txt as plain text: Next's robots.ts format can't express Content-Signal.
// Content-Signal states how the content may be used (a preference, not a block):
// search and AI answers may use and cite it; it may not be used to train AI models.
export const dynamic = "force-static";

export function GET() {
  const body = [
    "User-Agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=no",
    "Allow: /",
    "",
    `Host: ${SITE_URL}`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
