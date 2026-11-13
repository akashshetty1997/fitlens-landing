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
  { id: "health-data", label: "Apple Health and Health Connect" },
  { id: "google-calendar", label: "Google Calendar" },
  { id: "fitlens-ai", label: "FitLens AI assistant" },
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
          <p className="mb-4 text-sm font-semibold text-ink">
            On this page
          </p>
          <nav className="space-y-3 text-sm">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block text-ink-2 transition-colors hover:text-ink"
              >
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="min-w-0 max-w-3xl">
          <div className="mb-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-ink">
              <ShieldCheck className="h-4 w-4" />
              Your privacy matters
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-ink-2">Last updated: November 13, 2026</p>
          </div>

          <div className="space-y-10 text-[15px] leading-7 text-ink-2">
            <section>
              <p>
                FitLens (&quot;FitLens,&quot; &quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;) provides nutrition tracking, workout and
                coaching tools for clients and personal trainers. This Privacy Policy explains
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
                  information; workout plans you create or are given, and the
                  workouts you log (exercises, any exercise you swap in, sets,
                  repetitions, weights, rest, and how long each set took); and
                  shared tasks and habits and when they are completed.
                </li>
                <li>
                  <strong className="text-ink">
                    Steps and sleep from Apple Health or Health Connect:
                  </strong>{" "}
                  if you turn on Health sync, FitLens reads your daily step
                  count and your sleep (time asleep, naps, and when you fell
                  asleep and woke up). FitLens only reads this data; it never
                  writes to or changes your health data. See{" "}
                  <a
                    className="text-ink underline decoration-accent decoration-2 underline-offset-2 hover:opacity-80"
                    href="#health-data"
                  >
                    Apple Health and Health Connect
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-ink">Calendar information:</strong>{" "}
                  for trainers, the events you add to the FitLens calendar
                  (title, notes, start and end time, reminder, and the clients
                  a session is for); for clients, the sessions your trainer
                  adds you to. If you connect Google Calendar, we also
                  receive the information described under{" "}
                  <a
                    className="text-ink underline decoration-accent decoration-2 underline-offset-2 hover:opacity-80"
                    href="#google-calendar"
                  >
                    Google Calendar
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-ink">Coaching profile:</strong> for
                  each client, the notes their trainer keeps in FitLens:
                  allergies, food preferences, injuries and limitations,
                  available equipment, training experience, and training days
                  per week.
                </li>
                <li>
                  <strong className="text-ink">
                    FitLens AI conversations (trainers):
                  </strong>{" "}
                  the questions trainers ask the FitLens AI assistant, its
                  answers, the workout and meal plans it drafts, the sessions
                  it proposes, and the feedback trainers give on answers. See{" "}
                  <a
                    className="text-ink underline decoration-accent decoration-2 underline-offset-2 hover:opacity-80"
                    href="#fitlens-ai"
                  >
                    FitLens AI assistant
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-ink">Content you provide:</strong>{" "}
                  meal photos, text descriptions, barcode data, voice-based meal
                  input or its transcription, trainer notes, messages, squad
                  posts, comments, and reactions; and, for trainers, exercise
                  demo videos (including their sound) that you record or
                  choose, video links you add, and custom exercises with their
                  names, instructions, and photos.
                </li>
                <li>
                  <strong className="text-ink">
                    Camera, microphone, and photos:
                  </strong>{" "}
                  used only when you take or choose a photo, scan a barcode, or
                  record or choose an exercise demo video. FitLens does not
                  access them in the background.
                </li>
                <li>
                  <strong className="text-ink">Problem reports:</strong> when
                  you shake your device or use Report a problem and choose to
                  send a report, we receive your note, a screenshot of the
                  screen you were on if you keep it attached (it may show any
                  information that was on that screen), the app&apos;s recent
                  activity log with passwords and sign-in tokens removed, the
                  screen you were on, the app version, and your device model and
                  operating system version. If you are signed out, we also
                  receive the email address you enter so we can reply.
                </li>
                <li>
                  <strong className="text-ink">Safety reports and blocks:</strong>{" "}
                  when you report a post, comment, message, or person, we
                  receive the reason and any details you add, together with a
                  copy of the reported text; when you block someone, we keep a
                  record of that block so their content stays hidden from you.
                </li>
                <li>
                  <strong className="text-ink">
                    Device and usage information:
                  </strong>{" "}
                  device identifiers or push-notification tokens, app activity,
                  logs, approximate technical information, and information
                  needed to keep the Services secure and reliable. The app reads
                  your device&apos;s motion sensor on the device only to notice
                  a shake for problem reports; motion data is not stored or
                  sent to us.
                </li>
                <li>
                  <strong className="text-ink">
                    Product analytics and error reports:
                  </strong>{" "}
                  we use PostHog to understand how the app is used and to find and
                  fix errors. It receives the screens you open; actions such as
                  logging a meal, finishing a workout, or sending a message (never
                  the meal, photo, food description, body measurements, or message
                  itself); error and crash reports; a random identifier created by
                  the app; your FitLens user ID and role (trainer or client); for
                  trainers, how many clients they have; and technical details such
                  as device model, operating system, app version, language, and
                  time zone. We do not record your screen or app sessions, we have
                  set PostHog not to keep your IP address or work out your location
                  from it, and we do not use this information for advertising or to
                  track you across other companies&apos; apps or websites. PostHog
                  stores this data in the United States. You can ask us to delete
                  the analytics data linked to your account at any time.
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
                  provide meal logging, nutrition analysis, workout plans and
                  workout logging, shared tasks, hydration, progress, and
                  coaching features;
                </li>
                <li>
                  use automated tools to analyze meal inputs and generate
                  nutrition estimates;
                </li>
                <li>
                  for trainers who use the FitLens AI assistant, answer their
                  questions about clients who have turned it on, draft
                  workout and meal plans, and propose sessions for the trainer
                  to review;
                </li>
                <li>
                  show your daily steps and sleep, and, if you choose, share
                  them with your trainer;
                </li>
                <li>
                  run the trainer calendar: send session reminders to trainers
                  and the clients a session is for, and, for trainers who
                  connect it, keep FitLens and Google Calendar in step;
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
                  respond to support requests and problem reports (using the
                  screenshot and logs you choose to send to find and fix the
                  problem), communicate with waitlist members, and improve the
                  Services;
                </li>
                <li>
                  understand which features are used and fix crashes and errors
                  (product analytics);
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
                  members of a squad when you use those features. Your trainer
                  can see the meals and workouts you log and the tasks you
                  share. If you turn on sharing in Health settings, your
                  trainer can also see your daily steps and sleep. A
                  trainer&apos;s demo videos and custom exercises are visible to
                  the clients they share plans with, and clients see the
                  calendar sessions their trainer adds them to (title, notes,
                  and time). Content you post to a squad should be treated as
                  shared with that squad.
                </li>
                <li>
                  <strong className="text-ink">For meal analysis:</strong> when
                  you use photo or text meal logging, and only after you agree
                  in the app, we send the meal photo or description you add to
                  OpenAI to estimate calories and nutrients. Nothing else from
                  your account is sent with it, and OpenAI does not use it to
                  train its models. You can turn AI meal analysis off at any
                  time in your Profile. We then stop sending your meal photos
                  and descriptions, and the app asks again before you next log
                  a meal with a photo or description. Meals you already logged
                  stay in your account.
                </li>
                <li>
                  <strong className="text-ink">For the FitLens AI assistant:</strong>{" "}
                  when a trainer uses it, we send their question and the data
                  needed to answer it, only from clients who have turned it on,
                  to Anthropic, the company that makes the Claude AI model. See{" "}
                  <a
                    className="text-ink underline decoration-accent decoration-2 underline-offset-2 hover:opacity-80"
                    href="#fitlens-ai"
                  >
                    FitLens AI assistant
                  </a>
                  .
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
                  <strong className="text-ink">Video links:</strong> if a
                  trainer adds a YouTube or Vimeo link to an exercise, opening
                  it takes you to that service, and its own privacy policy
                  applies there.
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

            <section id="health-data" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-ink">
                Apple Health and Health Connect
              </h2>
              <p>
                Health sync is optional and off until you turn it on. With your
                permission, FitLens reads your daily step count and sleep from
                Apple Health on iPhone or Health Connect on Android. It does not
                read any other health data, and it never writes to or changes
                your health data.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>
                  We use this data only to show you your activity and
                  recovery in FitLens and, if you turn on sharing, to show it
                  to your trainer. Your trainer sees nothing from Apple Health
                  or Health Connect unless you choose to share.
                </li>
                <li>
                  We do not use it for advertising or marketing, we do not
                  sell it, we do not send it to our analytics provider, and we
                  do not use it to train AI models. We do not share it with
                  anyone else except as required by law.
                </li>
                <li>
                  You can stop syncing, stop sharing with your trainer, or
                  delete every synced day in the app&apos;s Health settings,
                  and you can remove FitLens&apos;s access at any time in the
                  Health app on iPhone or in Health Connect on Android. When
                  you stop syncing, days already synced stay until you delete
                  them or your account.
                </li>
              </ul>
            </section>

            <section id="google-calendar" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-ink">
                Google Calendar
              </h2>
              <p>
                Trainers can choose to connect their Google account to keep the
                FitLens calendar and their primary Google calendar in step.
                When you connect, we receive your Google account email address
                and permission to see and edit events on your calendars, and
                we store an encrypted access token so syncing can continue.
                FitLens uses this access only on your primary calendar, to:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>
                  add the events and client sessions you create in FitLens to
                  your Google calendar, and keep them updated;
                </li>
                <li>
                  follow changes you make in Google to those events (a moved
                  or deleted session is moved or cancelled in FitLens, and the
                  clients it is for are told); and
                </li>
                <li>
                  find Google events whose title or notes mention one of your
                  import keywords or a client&apos;s name, and offer them to
                  you. We keep the title, notes, and times of an offered event
                  so you can review it; it is added to FitLens only if you
                  choose. Other Google events are not stored.
                </li>
              </ul>
              <p className="mt-4">
                Clients can choose to add their plan to Google Calendar. FitLens
                then creates a separate calendar named &quot;FitLens&quot; in
                their Google account and adds all-day entries for the next two
                weeks: the name of each day&apos;s workout and its number of
                exercises, and the names and calories of that day&apos;s planned
                meals. We receive their Google account email address and
                permission to manage only calendars FitLens creates; we cannot
                see their other calendars or events, and we read nothing back
                from Google. Removing the connection in the app deletes the
                FitLens calendar from their Google account and revokes
                FitLens&apos;s access.
              </p>
              <p className="mt-4">
                FitLens&apos;s use and transfer to any other app of information
                received from Google APIs will adhere to the{" "}
                <a
                  className="text-ink underline decoration-accent decoration-2 underline-offset-2 hover:opacity-80"
                  href="https://developers.google.com/terms/api-services-user-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google API Services User Data Policy
                </a>
                , including the Limited Use requirements. We use Google
                Calendar data only to provide the sync features above. We do not
                sell it, use it for advertising, or use it to train AI models,
                and we do not send it to our analytics provider. People at
                FitLens do not read it unless you ask us to (for example in a
                support request), it is needed for security or to comply with
                law, or it has been aggregated and de-identified.
              </p>
              <p className="mt-4">
                You can disconnect Google Calendar at any time in the app. When
                you disconnect, we revoke FitLens&apos;s access to your Google
                account, delete the stored token and any events still waiting
                for your review, and stop syncing; events already copied stay
                in both calendars. You can also remove FitLens&apos;s access in
                your{" "}
                <a
                  className="text-ink underline decoration-accent decoration-2 underline-offset-2 hover:opacity-80"
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Account settings
                </a>
                .
              </p>
            </section>

            <section id="fitlens-ai" className="scroll-mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-ink">
                FitLens AI assistant
              </h2>
              <p>
                FitLens AI is an assistant for trainers. A trainer can ask it
                about their clients (for example, how a client&apos;s week went
                or who needs attention), ask it to draft a workout or meal
                plan, and ask it to book a session. Clients do not chat with
                it. It cannot message clients or change their data on its
                own: a plan is only assigned, and a session only booked, when
                the trainer confirms it in the app, and the client is then
                notified the same way as when the trainer does it by hand.
              </p>
              <p className="mt-4">
                FitLens AI uses Claude, an AI model made by Anthropic, through
                Anthropic&apos;s API. Anthropic processes these requests for us
                as a service provider. Under its commercial terms, Anthropic
                does not use them to train its models, and it deletes them
                within 30 days, except when a request is flagged for breaking
                Anthropic&apos;s usage policy (kept for up to 2 years) or the
                law requires it to keep them longer.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-ink">Clients choose.</strong> FitLens
                  AI uses a client&apos;s data only after the client turns it
                  on in the app, and only for their current trainer. It is off
                  until they do, and it ends if they change trainers. Data from
                  clients who haven&apos;t turned it on is never sent, including
                  in summaries of all of a trainer&apos;s clients.
                </li>
                <li>
                  <strong className="text-ink">What is sent.</strong> The
                  trainer&apos;s question and, for clients who have turned it
                  on, the data needed to answer it: their profile and goals,
                  the coaching profile their trainer keeps, the meals they log
                  with their nutrition, their workouts, weight and progress,
                  and their messages with their trainer, past and future.
                  Steps and sleep are included only if the client shares them
                  with their trainer in Health settings. Email addresses, phone
                  numbers, passwords and photos are not sent.
                </li>
                <li>
                  <strong className="text-ink">Turning it off.</strong> A
                  client can turn FitLens AI off at any time in Settings. We
                  then stop using their data straight away, stop any answer
                  being prepared that uses it, and delete every FitLens AI
                  message, answer, draft and proposal that used it. A request
                  already sent to Anthropic before then can&apos;t be recalled;
                  Anthropic deletes it as described above.
                </li>
                <li>
                  <strong className="text-ink">How long we keep it.</strong>{" "}
                  FitLens deletes FitLens AI conversations, drafts and
                  proposals 90 days after they were created, and sooner when a
                  trainer deletes a chat, a client turns FitLens AI off or an
                  account is deleted. Deleting a chat removes its messages,
                  answers, drafts and proposals; plans and sessions the trainer
                  already confirmed stay.
                </li>
                <li>
                  <strong className="text-ink">What we don&apos;t do.</strong>{" "}
                  We do not use FitLens AI conversations for advertising, we do
                  not sell them, and we do not use them to train AI models. Our
                  analytics provider only learns events such as a message being
                  sent, a proposal being confirmed or an answer being rated,
                  never what was said.
                </li>
                <li>
                  <strong className="text-ink">Not medical advice.</strong>{" "}
                  Answers can be wrong. FitLens AI does not diagnose or treat
                  anything, and trainers review its suggestions before acting
                  on them.
                </li>
              </ul>
              <p className="mt-4">
                FitLens AI is separate from meal analysis, which uses OpenAI as
                described above.
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
                  You can turn Health sync and sharing with your trainer on or
                  off, or delete your synced health data, in the app&apos;s
                  Health settings. You can disconnect Google Calendar in the
                  app at any time.
                </li>
                <li>
                  Clients can turn the FitLens AI assistant on or off for their
                  trainer in Settings at any time.
                </li>
                <li>
                  You can turn AI meal analysis off, or back on, in your Profile
                  at any time. Trainers can delete a FitLens AI chat at any
                  time.
                </li>
                <li>
                  You can stop receiving waitlist communications by using the
                  unsubscribe option when available or contacting us.
                </li>
                <li>
                  You may request access to, correction of, or deletion of your
                  personal information by emailing us at{" "}
                  <a
                    className="text-ink underline decoration-accent decoration-2 underline-offset-2 hover:opacity-80"
                    href="mailto:contact@usefitlens.com"
                  >
                    contact@usefitlens.com
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
                Problem reports are kept only as long as we need them to
                investigate and fix the problem. FitLens AI conversations are
                deleted after 90 days. When you delete your account,
                we delete your account data, including your logged workouts,
                shared tasks, demo videos, synced steps and sleep, calendar
                events, your Google Calendar connection, FitLens AI
                conversations and coaching profiles, and problem reports,
                as described on
                our{" "}
                <Link className="text-ink underline decoration-accent decoration-2 underline-offset-2 hover:opacity-80" href="/delete-account">
                  account deletion page
                </Link>
                .
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
                      className="text-ink underline decoration-accent decoration-2 underline-offset-2 hover:opacity-80"
                      href="mailto:contact@usefitlens.com"
                    >
                      contact@usefitlens.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            </section>
          </div>
        </article>
      </div>
      <SiteFooter />
    </main>
  );
}
