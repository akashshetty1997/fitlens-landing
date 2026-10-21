import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/site-chrome";
import { Mail, Smartphone, Trash2 } from "lucide-react";
import { SUPPORT_EMAIL } from "@/lib/site";

// Google Play requires a web page where people can ask for their account to be deleted
export const metadata: Metadata = {
  title: "Delete your FitLens account",
  description:
    "How to delete your FitLens AI account and data, in the app or by email, and what is removed.",
  alternates: { canonical: "/delete-account" },
  openGraph: {
    url: "/delete-account",
    title: "Delete your FitLens account | FitLens",
    description:
      "How to delete your FitLens AI account and data, in the app or by email, and what is removed.",
  },
};

const deleted = [
  "Your account, profile and profile photo",
  "Every meal you logged, including meal photos and nutrition details",
  "Weight, water and progress entries, and progress photos",
  "Chat messages, squad posts, comments and reactions",
  "Meal plans you created or that were assigned to you",
  "Your notification settings and device push tokens",
];

export default function DeleteAccountPage() {
  return (
    <main className="landing min-h-screen antialiased">
      <PageHeader />

      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent">
          <Trash2 className="h-4 w-4" />
          FitLens AI account deletion
        </div>
        <h1 className="text-4xl font-display md:text-5xl">Delete your account</h1>
        <p className="mt-6 text-lg leading-8 text-ink/60">
          You can delete your FitLens AI account and its data at any time, from
          the app or by email. Deletion is permanent and can&apos;t be undone.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-accent/20 bg-accent/5 p-6">
            <Smartphone className="mb-5 h-6 w-6 text-accent" />
            <h2 className="mb-3 text-lg font-semibold">In the app</h2>
            <ol className="list-decimal space-y-1.5 pl-5 text-sm leading-6 text-ink/70">
              <li>Open FitLens AI and sign in.</li>
              <li>Go to the Profile tab.</li>
              <li>Scroll down and tap Delete account.</li>
              <li>Confirm. Your account is deleted straight away.</li>
            </ol>
          </div>

          <div className="rounded-3xl border border-ink/10 bg-ink/[0.03] p-6">
            <Mail className="mb-5 h-6 w-6 text-accent" />
            <h2 className="mb-3 text-lg font-semibold">By email</h2>
            <p className="text-sm leading-6 text-ink/70">
              Can&apos;t open the app? Email{" "}
              <a
                className="text-accent hover:underline"
                href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Delete my FitLens account")}`}
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              from the email address on your account, with the subject
              &ldquo;Delete my FitLens account&rdquo;. We confirm and delete it
              within 7 days.
            </p>
          </div>
        </div>

        <h2 className="mt-14 text-2xl font-display">What gets deleted</h2>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-ink/70">
          {deleted.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2 className="mt-12 text-2xl font-display">What we keep</h2>
        <p className="mt-4 leading-7 text-ink/70">
          Your account and the data above are removed from the live service.
          If another user reported something you posted, that safety report is
          kept for moderation records, no longer linked to your account. Copies
          may remain in encrypted backups for up to 30 days before those
          backups are deleted.
          If you were a trainer&apos;s client, your trainer loses access to your
          data as soon as your account is deleted.
        </p>

        <p className="mt-12 text-sm text-ink/50">
          Questions? Read our{" "}
          <Link href="/privacy-policy" className="text-accent hover:underline">
            privacy policy
          </Link>{" "}
          or email {SUPPORT_EMAIL}.
        </p>
      </section>
    </main>
  );
}
