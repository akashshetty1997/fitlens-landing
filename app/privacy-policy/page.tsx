import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, SiteFooter } from "@/components/site-chrome";
import { Mail, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how FitLens collects, uses, shares, and protects your information.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    url: "/privacy-policy",
    title: "Privacy Policy | FitLens",
    description:
      "Learn how FitLens collects, uses, shares, and protects your information.",
  },
};

const sections = [
  { id: "information-we-collect", label: "Information we collect" },
  { id: "how-we-use-information", label: "How we use information" },
  { id: "how-we-share-information", label: "How we share information" },
  { id: "your-choices", label: "Your choices and rights" },
  { id: "retention-and-security", label: "Retention and security" },
  { id: "children", label: "Children's privacy" },
  { id: "changes", label: "Changes to this policy" },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="landing min-h-screen antialiased">
      <PageHeader />

      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-[220px_1fr] lg:py-24">
        <aside className="hidden lg:block">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink/60">
            On this page
          </p>
          <nav className="space-y-3 text-sm">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block text-ink/60 transition-colors hover:text-ink"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="min-w-0 max-w-3xl">
          <div className="mb-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
              <ShieldCheck className="h-4 w-4" />
              Your privacy matters
            </div>
            <h1 className="mb-4 text-4xl font-display md:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-ink/60">Last updated: October 1, 2026</p>
          </div>

          <div className="space-y-10 text-[15px] leading-7 text-ink/60">
            <section>
              <p>
                FitLens (&quot;FitLens,&quot; &quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;) provides nutrition tracking and coaching tools
                for clients and personal trainers. This Privacy Policy explains
                how we collect, use, disclose, and protect information when you
                use the FitLens mobile application, website, and related
                services (collectively, the &quot;Services&quot;).
              </p>
              <p className="mt-4">
                By using the Services, you acknowledge the practices described
                here. If you do not agree with this policy, please do not use
                the Services.
              </p>
            </section>

            <section id="information-we-collect" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-ink">
                Information we collect
              </h2>
              <p>Depending on how you use FitLens, we may collect:</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-ink">
                    Account and profile information:
                  </strong>{" "}
                  name, email address, phone number, password credentials, role,
                  profile photo, and sign-in identifiers from Google or Apple
                  when you choose social sign-in.
                </li>
                <li>
                  <strong className="text-ink">
                    Nutrition and fitness information:
                  </strong>{" "}
                  age, gender, height, weight, target weight, activity level,
                  nutrition goals, meals, ingredients, portions, calories,
                  macronutrients, hydration, weight history, and progress
                  information.
                </li>
                <li>
                  <strong className="text-ink">Content you provide:</strong>{" "}
                  meal photos, text descriptions, barcode data, voice-based meal
                  input or its transcription, trainer notes, messages, squad
                  posts, comments, and reactions.
                </li>
                <li>
                  <strong className="text-ink">
                    Device and usage information:
                  </strong>{" "}
                  device identifiers or push-notification tokens, app activity,
                  logs, approximate technical information, and information
                  needed to keep the Services secure and reliable.
                </li>
                <li>
                  <strong className="text-ink">Waitlist information:</strong> if
                  you join our website waitlist, we collect your email address
                  and any information you include with that submission.
                </li>
              </ul>
            </section>

            <section id="how-we-use-information" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-ink">
                How we use information
              </h2>
              <p>We use information to:</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>
                  create and maintain your account and authenticate sign-ins;
                </li>
                <li>
                  provide meal logging, nutrition analysis, hydration, progress,
                  and coaching features;
                </li>
                <li>
                  use automated tools to analyze meal inputs and generate
                  nutrition estimates;
                </li>
                <li>
                  connect trainers and clients, including sharing information
                  within an assigned trainer relationship or squad;
                </li>
                <li>
                  send service messages, reminders, and push notifications you
                  enable;
                </li>
                <li>
                  respond to support requests, communicate with waitlist
                  members, and improve the Services;
                </li>
                <li>
                  detect abuse, prevent fraud, protect users, and comply with
                  legal obligations; and
                </li>
                <li>
                  create aggregated or de-identified insights that do not
                  reasonably identify you.
                </li>
              </ul>
            </section>

            <section id="how-we-share-information" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-ink">
                How we share information
              </h2>
              <p>We may share information in these limited situations:</p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-ink">With people you choose:</strong>{" "}
                  information may be visible to your assigned trainer or to
                  members of a squad when you use those features. Content you
                  post to a squad should be treated as shared with that squad.
                </li>
                <li>
                  <strong className="text-ink">With service providers:</strong>{" "}
                  trusted providers help us with hosting, cloud storage, image
                  delivery, authentication, email or form delivery, AI
                  processing, analytics, security, and push notifications. They
                  may access information only to perform services for us and
                  under appropriate confidentiality and security obligations.
                </li>
                <li>
                  <strong className="text-ink">
                    For legal and safety reasons:
                  </strong>{" "}
                  when reasonably necessary to comply with law, respond to legal
                  process, protect the rights and safety of users or FitLens, or
                  investigate fraud or abuse.
                </li>
                <li>
                  <strong className="text-ink">
                    As part of a business change:
                  </strong>{" "}
                  in a merger, acquisition, financing, reorganization, or sale
                  of assets, subject to applicable confidentiality requirements.
                </li>
              </ul>
              <p className="mt-4">
                We do not sell your personal information. We do not use your
                meal photos or nutrition information for targeted advertising.
              </p>
            </section>

            <section id="your-choices" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-ink">
                Your choices and rights
              </h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  You can review and update certain account, profile, and
                  nutrition information in the app.
                </li>
                <li>
                  You can manage push-notification permissions through the app
                  and your device settings.
                </li>
                <li>
                  You can stop receiving waitlist communications by using the
                  unsubscribe option when available or contacting us.
                </li>
                <li>
                  You may request access to, correction of, or deletion of your
                  personal information by emailing us at{" "}
                  <a
                    className="text-accent hover:underline"
                    href="mailto:akashshetty022.as@gmail.com"
                  >
                    akashshetty022.as@gmail.com
                  </a>
                  . We may need to verify your identity before completing a
                  request.
                </li>
              </ul>
              <p className="mt-4">
                Depending on where you live, you may have additional privacy
                rights. We will handle verified requests in accordance with
                applicable law.
              </p>
            </section>

            <section id="retention-and-security" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-ink">
                Retention and security
              </h2>
              <p>
                We retain information for as long as needed to provide the
                Services, maintain legitimate business and security records,
                resolve disputes, enforce agreements, and comply with legal
                obligations. When information is no longer needed, we take
                reasonable steps to delete it or de-identify it.
              </p>
              <p className="mt-4">
                We use administrative, technical, and organizational safeguards
                designed to protect information. No method of transmission or
                storage is completely secure, so we cannot guarantee absolute
                security.
              </p>
            </section>

            <section id="children" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-ink">
                Children&apos;s privacy
              </h2>
              <p>
                FitLens is not directed to children under 13, and we do not
                knowingly collect personal information from children under 13.
                If you believe a child has provided us with personal
                information, please contact us so we can take appropriate
                action.
              </p>
            </section>

            <section id="changes" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-ink">
                Changes to this policy
              </h2>
              <p>
                We may update this Privacy Policy as the Services or applicable
                requirements change. We will post the updated policy here and
                revise the “Last updated” date. Your continued use of the
                Services after an update means the revised policy applies to
                your use of the Services.
              </p>
            </section>

            <section className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <h2 className="mb-2 text-lg font-semibold text-ink">
                    Questions or requests?
                  </h2>
                  <p>
                    Contact FitLens at{" "}
                    <a
                      className="text-accent hover:underline"
                      href="mailto:akashshetty022.as@gmail.com"
                    >
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

      <footer className="border-t border-ink/10 px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 text-sm text-ink/60">
          <span>
            © {new Date().getFullYear()} FitLens. All rights reserved.
          </span>
          <Link href="/" className="text-accent hover:underline">
            FitLens home
          </Link>
          <Link href="/terms" className="text-accent hover:underline">
            Terms of Service
          </Link>
        </div>
      </footer>
      <SiteFooter />
    </main>
  );
}
