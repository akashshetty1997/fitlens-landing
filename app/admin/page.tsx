import type { Metadata } from "next";
import { AdminApp } from "@/components/admin/admin-app";

// Staff only. Not in the sitemap or llms.txt, and never indexed (see also the
// X-Robots-Tag header in next.config.ts)
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <main className="landing min-h-screen bg-paper antialiased">
      <AdminApp />
    </main>
  );
}
