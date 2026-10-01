import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail, MessageCircle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Support | FitLens",
  description: "Get help with FitLens and contact the FitLens support team.",
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold tracking-tight" aria-label="FitLens home">
            <span className="text-emerald-500">Fit</span>Lens
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to FitLens
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-500">
          <MessageCircle className="h-4 w-4" />
          We&apos;re here to help
        </div>
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">How can we help?</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Whether you need help with your account, meal tracking, trainer tools, or privacy,
          send us a note and we&apos;ll get back to you.
        </p>

        <div className="mx-auto mt-12 grid max-w-3xl gap-5 text-left md:grid-cols-3">
          <a
            href="mailto:akashshetty022.as@gmail.com"
            className="group rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6 transition-colors hover:bg-emerald-500/10"
          >
            <Mail className="mb-5 h-6 w-6 text-emerald-500" />
            <h2 className="mb-2 text-lg font-semibold">Email support</h2>
            <p className="text-sm leading-6 text-muted-foreground">Reach the FitLens team directly.</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-emerald-500">
              Contact us <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>

          <Link
            href="/privacy"
            className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-emerald-500/30"
          >
            <ShieldCheck className="mb-5 h-6 w-6 text-emerald-500" />
            <h2 className="mb-2 text-lg font-semibold">Privacy requests</h2>
            <p className="text-sm leading-6 text-muted-foreground">Learn how we handle your information.</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-emerald-500">
              Read privacy policy <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href="/terms"
            className="group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-emerald-500/30"
          >
            <MessageCircle className="mb-5 h-6 w-6 text-emerald-500" />
            <h2 className="mb-2 text-lg font-semibold">Terms of service</h2>
            <p className="text-sm leading-6 text-muted-foreground">Review the rules for using FitLens.</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-emerald-500">
              Read the terms <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-border bg-card/60 p-6 text-left text-sm leading-6 text-muted-foreground">
          <p>
            For account deletion, data access, or privacy questions, email{" "}
            <a className="text-emerald-500 hover:underline" href="mailto:akashshetty022.as@gmail.com">
              akashshetty022.as@gmail.com
            </a>
            . Please include the email address associated with your FitLens account so we can verify your request.
          </p>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} FitLens. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-emerald-500 hover:underline">Privacy</Link>
            <Link href="/terms" className="text-emerald-500 hover:underline">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
