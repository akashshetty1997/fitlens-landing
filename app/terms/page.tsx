import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | FitLens",
  description: "The terms that apply when you use FitLens.",
};

const sections = [
  { id: "eligibility", label: "Eligibility" },
  { id: "account", label: "Your account" },
  { id: "service", label: "The FitLens service" },
  { id: "content", label: "Your content" },
  { id: "acceptable-use", label: "Acceptable use" },
  { id: "ownership", label: "Ownership" },
  { id: "termination", label: "Suspension and termination" },
  { id: "disclaimers", label: "Disclaimers and liability" },
  { id: "changes", label: "Changes" },
];

export default function TermsPage() {
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

      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-[220px_1fr] lg:py-24">
        <aside className="hidden lg:block">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            On this page
          </p>
          <nav className="space-y-3 text-sm">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block text-muted-foreground transition-colors hover:text-foreground"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="min-w-0 max-w-3xl">
          <div className="mb-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-500">
              <FileText className="h-4 w-4" />
              Simple, clear terms
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: October 1, 2026</p>
          </div>

          <div className="space-y-10 text-[15px] leading-7 text-muted-foreground">
            <section>
              <p>
                These Terms of Service (&quot;Terms&quot;) are an agreement between you and FitLens
                (&quot;FitLens,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). They apply to your use of the FitLens
                mobile application, website, and related services (collectively, the
                &quot;Services&quot;).
              </p>
              <p className="mt-4">
                By creating an account, joining the waitlist, or using the Services, you agree
                to these Terms and our <Link className="text-emerald-500 hover:underline" href="/privacy">Privacy Policy</Link>.
                If you do not agree, do not use the Services.
              </p>
            </section>

            <section id="eligibility" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-foreground">1. Eligibility</h2>
              <p>
                You must be at least 13 years old, or the minimum age required in your country,
                to use FitLens. If you are under 18, you confirm that a parent or legal guardian
                has reviewed these Terms and agrees to your use where required by law. You may
                not use FitLens if applicable law prohibits you from doing so.
              </p>
            </section>

            <section id="account" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-foreground">2. Your account</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>You must provide accurate information and keep your account information current.</li>
                <li>You are responsible for protecting your password and sign-in methods.</li>
                <li>You are responsible for activity that occurs through your account.</li>
                <li>Do not share your account, impersonate another person, or create an account for deceptive purposes.</li>
                <li>Tell us promptly if you believe your account has been accessed without permission.</li>
              </ul>
            </section>

            <section id="service" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-foreground">3. The FitLens service</h2>
              <p>
                FitLens provides tools for meal logging, nutrition estimates, hydration tracking,
                progress tracking, trainer-client coaching, squad accountability, meal plans,
                messaging, and notifications. Features may change, be improved, or be removed as
                we develop the Services.
              </p>
              <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5 text-amber-100/80">
                FitLens is a tracking and coaching tool, not a medical provider or medical
                device. AI-generated nutrition estimates and other information may be incomplete
                or inaccurate and are not medical, dietary, or professional advice. Consult a
                qualified professional before making decisions about your health, diet, exercise,
                or treatment.
              </div>
              <p className="mt-4">
                The Services may be available at no charge during the current pilot or waitlist
                period. If we introduce paid features, we will show applicable prices and terms
                before you purchase. App Store purchases may also be subject to Apple&apos;s or
                Google&apos;s terms and billing rules.
              </p>
            </section>

            <section id="content" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-foreground">4. Your content</h2>
              <p>
                You keep ownership of the photos, meal descriptions, voice input, messages,
                notes, posts, comments, and other material you submit to FitLens (&quot;Your
                Content&quot;). You give FitLens a worldwide, non-exclusive, royalty-free license to
                host, store, process, display, and transmit Your Content only as needed to operate,
                secure, and improve the Services and to show it to the audiences you choose.
              </p>
              <p className="mt-4">
                This license ends when you delete Your Content or your account, except for limited
                copies retained in backups, records required by law, or content that other users
                copied or saved before deletion. You are responsible for having the rights and
                permissions needed to submit Your Content.
              </p>
              <p className="mt-4">
                Content shared with a trainer, squad, or other user may be viewed, copied, or
                reshared by people who have access to it. Choose your audience carefully.
              </p>
            </section>

            <section id="acceptable-use" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-foreground">5. Acceptable use</h2>
              <p>You agree not to use the Services to:</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>break the law, harm others, or upload content that exploits or endangers minors;</li>
                <li>harass, threaten, stalk, defraud, or impersonate another person or organization;</li>
                <li>upload malware, spam, deceptive content, or content that violates another person&apos;s rights;</li>
                <li>access accounts, systems, data, or trainer/client information without authorization;</li>
                <li>scrape, crawl, reverse engineer, or interfere with the Services except where law expressly allows it;</li>
                <li>attempt to defeat usage limits, security controls, or AI safeguards; or</li>
                <li>use FitLens to provide medical care or make high-risk health decisions without qualified professional oversight.</li>
              </ul>
            </section>

            <section id="ownership" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-foreground">6. FitLens ownership</h2>
              <p>
                FitLens, including its name, logo, software, design, documentation, and the
                technology used to provide the Services, belongs to FitLens or its licensors.
                These Terms give you a limited, personal, non-transferable right to use the
                Services while you comply with these Terms. They do not transfer ownership of
                FitLens intellectual property to you.
              </p>
            </section>

            <section id="termination" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-foreground">7. Suspension and termination</h2>
              <p>
                You may stop using FitLens at any time and request deletion of your account by
                emailing <a className="text-emerald-500 hover:underline" href="mailto:akashshetty022.as@gmail.com">akashshetty022.as@gmail.com</a>.
                We may suspend or terminate access if you violate these Terms, create risk for
                users or FitLens, are required to do so by law, or if we discontinue the Services.
                Where practical, we will provide notice before a permanent suspension or shutdown.
              </p>
            </section>

            <section id="disclaimers" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-foreground">8. Disclaimers and liability</h2>
              <p>
                The Services are provided &quot;as is&quot; and &quot;as available.&quot; To the fullest extent
                permitted by law, FitLens disclaims warranties of availability, accuracy, fitness
                for a particular purpose, and non-infringement. We do not promise that the
                Services will be uninterrupted, error-free, secure, or always available.
              </p>
              <p className="mt-4">
                To the fullest extent permitted by law, FitLens and its affiliates, officers,
                employees, and service providers will not be liable for indirect, incidental,
                special, consequential, exemplary, or punitive damages, or for loss of data,
                profits, goodwill, or other intangible losses arising from your use of the Services.
                Our total liability for claims related to the Services will not exceed the greater
                of the amount you paid FitLens in the prior 12 months or US $100. Some laws do not
                allow these limits, so some of them may not apply to you.
              </p>
              <p className="mt-4">
                You agree to defend and indemnify FitLens from claims, losses, and expenses,
                including reasonable legal fees, arising from Your Content, your misuse of the
                Services, or your violation of these Terms or applicable law, to the extent allowed
                by law.
              </p>
            </section>

            <section id="changes" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-foreground">9. Changes to these Terms</h2>
              <p>
                We may update these Terms as FitLens or applicable requirements change. We will
                post the revised Terms here and update the “Last updated” date. For material
                changes, we may also notify you in the app or by email when practical. If you
                continue using FitLens after the revised Terms take effect, you accept them. If
                you do not agree, stop using the Services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-foreground">10. General terms</h2>
              <p>
                These Terms and the Privacy Policy are the entire agreement between you and
                FitLens about the Services. If any provision is found unenforceable, the remaining
                provisions remain in effect. Our failure to enforce a provision is not a waiver.
                These Terms are governed by the laws applicable in the jurisdiction where FitLens
                is based, except where mandatory consumer-protection law requires otherwise.
              </p>
            </section>

            <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-500" />
                <div>
                  <h2 className="mb-2 text-lg font-semibold text-foreground">Questions about these Terms?</h2>
                  <p>
                    Contact FitLens at{" "}
                    <a className="text-emerald-500 hover:underline" href="mailto:akashshetty022.as@gmail.com">
                      akashshetty022.as@gmail.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            </section>
          </div>
        </article>
      </div>

      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} FitLens. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-emerald-500 hover:underline">Privacy</Link>
            <Link href="/" className="text-emerald-500 hover:underline">FitLens home</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
