import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  Check,
  ClipboardList,
  FileText,
  Images,
  LineChart,
  MessageCircle,
  Sheet,
  UserPlus,
} from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-chrome";
import { StructuredData } from "@/components/structured-data";
import { PilotForm } from "@/components/pilot-form";
import { MealExample } from "@/components/meal-example";
import { Phone, type Screen } from "@/components/phone";

// Server-rendered home page. The only client code is the navigation's mobile
// menu and the two pilot signup forms.

const screens = {
  dashboard: {
    src: "/screens/hd/trainer-dashboard.webp",
    alt: "FitLens trainer dashboard showing active clients, clients at risk and a list of who needs attention today",
  },
  clientDetail: {
    src: "/screens/client-detail.webp",
    alt: "Client overview with weight, goal and today's nutrition",
  },
  mealReview: {
    src: "/screens/hd/meal-review.webp",
    alt: "Trainer reviewing a client's logged meal with its photo, calories and macros",
  },
  builder: {
    src: "/screens/hd/workout-builder.webp",
    alt: "Workout plan builder with sets, reps, weight and a demo video on each exercise",
  },
  player: {
    src: "/screens/hd/workout-player.webp",
    alt: "Client workout player showing the exercise, weight, reps and a tick for every set",
  },
  mealResult: {
    src: "/screens/hd/meal-result.webp",
    alt: "AI meal breakdown with calories, macros and ingredients",
  },
  mealPlans: {
    src: "/screens/hd/meal-plans.webp",
    alt: "Meal plan library with plans shared with clients",
  },
  clientHome: {
    src: "/screens/hd/client-home.webp",
    alt: "Client home with calorie ring, protein and water for the day",
  },
  today: {
    src: "/screens/hd/workout-today.webp",
    alt: "Client home with today's workout, tasks from the coach and logged meals",
  },
  describe: {
    src: "/screens/hd/describe-meal.webp",
    alt: "Client describing a meal in one sentence to log it",
  },
} satisfies Record<string, Screen>;

const scattered = [
  { icon: MessageCircle, label: "Food photos in WhatsApp" },
  { icon: Sheet, label: "Check-in spreadsheets" },
  { icon: FileText, label: "Workout plans in PDFs nobody fills in" },
  { icon: Images, label: "Screenshots of food diaries" },
  { icon: BellRing, label: "Reminders to log, again" },
];

const withoutFitLens = [
  "Hours a week chasing check-ins and screenshots",
  "A roster capped by how many clients you can chase",
  "Finding out a client fell off weeks later",
  "Rewriting the same meal plan for every client",
];

const withFitLens = [
  "Check-ins replaced by one dashboard that updates itself",
  "Room for more clients without more admin",
  "Spot a slipping client the day it happens",
  "Write a plan once, share it with anyone",
  "Every meal and every set your clients do, logged in the app",
];

const signals = [
  { level: "Critical", color: "var(--color-red)", body: "No meals logged in 2 days. Reach out today." },
  { level: "Nutrition", color: "var(--color-amber)", body: "Protein under target 5 of the last 7 days." },
  { level: "To review", color: "var(--color-blue)", body: "3 meals awaiting your verification." },
  { level: "On track", color: "var(--color-green)", body: "Logging consistently and hitting targets." },
];

const steps = [
  {
    icon: UserPlus,
    title: "Invite your clients",
    body: "Share your trainer code. Clients download FitLens for free and land in your roster and your squad.",
  },
  {
    icon: ClipboardList,
    title: "Build and assign their plans",
    body: "Write a meal plan or a workout plan once and give it to as many clients as you like.",
  },
  {
    icon: LineChart,
    title: "Track progress and coach",
    body: "Meals and workouts land on your dashboard, with a daily list of who needs you. Step in before anyone drifts.",
  },
];

const pilotFacts = [
  ["Free for up to 10 clients", "Trainers coaching more than 10 can email us and we'll add room."],
  ["Clients always free", "Your clients never pay to use FitLens."],
  ["iPhone first", "FitLens is on iPhone now, with Android in testing."],
  ["Private by default", "No ads. Data is never sold, and clients can delete their account any time."],
];

const alsoIncluded = [
  "Meal plans for single meals or full days",
  "Shared tasks and habits, ticked off in chat",
  "Private squads with a group feed",
  "Direct messages with every client",
  "Water and weight trends",
  "Calorie and macro targets per client",
  "Rest timer and set timer for workouts",
  "Exercise swaps and your own demo videos",
  "Report and block built in",
];

const faqs = [
  {
    q: "How does FitLens help me coach more clients?",
    a: "It takes over the admin that limits how many clients one trainer can handle: chasing food diaries, rewriting the same plans, and working out who is slipping. Clients log meals and workouts themselves, you write each plan once, and a daily list tells you who needs you. That time goes back into coaching, or into taking on more clients.",
  },
  {
    q: "How much does FitLens cost?",
    a: "FitLens is free for trainers coaching up to 10 clients, and clients always use the app for free. Coaching more than 10? Email contact@usefitlens.com and we'll add room for more.",
  },
  {
    q: "How accurate is the AI?",
    a: "FitLens estimates each meal ingredient by ingredient and shows a confidence score, so clients can check what it found. It's built for coaching decisions, not medical advice, and you can review every meal from your dashboard.",
  },
  {
    q: "Can I build workout plans too?",
    a: "Yes. Pick from more than 650 exercises (or add your own), set sets, reps, weight and rest, and share the plan with any client. Clients follow it set by set with a rest timer, and you see every session they log.",
  },
  {
    q: "What do my clients need?",
    a: "Just the FitLens iPhone app. They sign up, enter your trainer code, and they're in your roster and your squad straight away.",
  },
  {
    q: "Is there an Android app?",
    a: "FitLens is launching on iPhone first. Leave your email and we'll let you know when more platforms arrive.",
  },
  {
    q: "What happens to my clients' data?",
    a: "It's stored securely, never sold, and never used for advertising. Clients can delete their account and data at any time from the app.",
  },
];

/* ---------- shared pieces ---------- */

const container = "mx-auto max-w-6xl px-5 sm:px-8";
const section = "scroll-mt-16 py-20 sm:py-28";

// Small section label. Dark text with an orange bar: small orange text on
// white would fail contrast, so the brand colour stays decorative here.
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
      <span className="h-1.5 w-5 rounded-full bg-accent" aria-hidden />
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  center = false,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-[2rem] font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
        {title}
        {accent && (
          <>
            {" "}
            <em>{accent}</em>
          </>
        )}
      </h2>
      {intro && <p className="mt-5 text-lg leading-8 text-ink-2">{intro}</p>}
    </div>
  );
}

function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group mt-6 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-ink"
    >
      <span className="underline decoration-accent decoration-2 underline-offset-4">
        {children}
      </span>
      <ArrowRight
        className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5"
        aria-hidden
      />
    </Link>
  );
}

function CheckList({ items }: { items: string[][] }) {
  return (
    <ul className="mt-8 space-y-4">
      {items.map(([title, body]) => (
        <li key={title} className="flex gap-3">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
          <p className="text-[15px] leading-6 text-ink-2">
            <span className="font-semibold text-ink">{title}.</span> {body}
          </p>
        </li>
      ))}
    </ul>
  );
}

/* ---------- page ---------- */

export default function Home() {
  return (
    <main className="landing min-h-screen overflow-x-clip">
      <StructuredData faqs={faqs} />
      <SiteNav />
      <Hero />
      <Problem />
      <Dashboard />
      <Workouts />
      <Nutrition />
      <Clients />
      <HowItWorks />
      <Pilot />
      <AlsoIncluded />
      <Faq />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}

function Hero() {
  return (
    <section className="pt-14 sm:pt-20">
      <div className={`${container} text-center`}>
        <h1 className="mx-auto max-w-4xl">
          <span className="block text-base font-semibold text-ink-2 sm:text-lg">
            Personal trainer app
          </span>{" "}
          {/* the space keeps "app" and "More" separate words for search engines */}
          <span className="mt-3 block text-[2.9rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-7xl lg:text-[5.5rem]">
            <span className="block">More clients.</span>{" "}
            <em className="block">Less admin.</em>
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink-2 sm:text-xl">
          FitLens is the personal trainer app for coaching nutrition and
          training in one place. Clients log meals with a photo and follow your
          workouts set by set; you get one dashboard that shows who needs you
          today. Less chasing, more coaching, room to grow your client list.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4">
          <PilotForm id="hero-email" />
          <Link
            href="#how"
            className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-ink-2 transition-colors hover:text-ink"
          >
            See how it works <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <p className="text-sm text-ink-2">
            Free for up to 10 clients · Clients always free · iPhone
          </p>
        </div>
      </div>

      {/* The real trainer dashboard, with the builder and a client's day either side */}
      <div className={`${container} mt-14 sm:mt-20`}>
        <div className="flex items-end justify-center gap-6 lg:gap-10">
          <Phone
            screen={screens.builder}
            sizes="260px"
            className="hidden w-[240px] translate-y-10 md:block lg:w-[260px]"
          />
          <Phone
            screen={screens.dashboard}
            priority
            sizes="(min-width: 1024px) 330px, (min-width: 640px) 300px, 72vw"
            className="w-[72vw] max-w-[300px] lg:max-w-[330px]"
          />
          <Phone
            screen={screens.clientHome}
            sizes="260px"
            className="hidden w-[240px] translate-y-10 md:block lg:w-[260px]"
          />
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section id="problem" className={`${section} mt-10 bg-card`}>
      <div className={container}>
        <SectionHeading
          eyebrow="The problem"
          title="Coaching shouldn't live in"
          accent="five apps."
          intro="Most trainers juggle WhatsApp, spreadsheets, PDFs and screenshots to keep track of clients. It works for a few clients, then the admin decides how many more you can take on."
        />

        <div className="reveal mt-12 grid gap-4 lg:grid-cols-2">
          <div className="rounded-[var(--radius-card)] bg-paper p-6 sm:p-8">
            <p className="text-sm font-semibold text-ink-2">Without FitLens</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {scattered.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm text-ink-2"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-3">
              {withoutFitLens.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-6 text-ink-2">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-2/50" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--radius-card)] bg-paper p-6 ring-2 ring-accent/60 sm:p-8">
            <p className="text-sm font-semibold text-ink">With FitLens</p>
            <p className="mt-5 text-2xl font-bold tracking-tight text-ink">
              One app for your clients&apos; meals, workouts and check-ins.
            </p>
            <ul className="mt-6 space-y-3">
              {withFitLens.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-6 text-ink">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-green" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <section id="dashboard" className={section}>
      <div className={`${container} grid items-center gap-14 lg:grid-cols-2`}>
        {/* On phones the hero already shows the dashboard just above */}
        <div className="reveal order-2 hidden justify-center lg:order-1 lg:flex">
          <Phone
            screen={screens.dashboard}
            sizes="(min-width: 1024px) 340px, 78vw"
            className="w-[78vw] max-w-[340px]"
          />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="The trainer dashboard"
            title="Your whole roster."
            accent="At a glance."
            intro="Stop chasing screenshots and food diaries. See what every client ate, how they're trending, and who needs you today, ranked by urgency."
          />
          <div className="mt-8 space-y-2.5">
            <p className="text-sm text-ink-2">Example attention queue</p>
            {signals.map((signal) => (
              <div key={signal.level} className="flex items-start gap-3 rounded-2xl bg-card px-4 py-3.5">
                <span
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: signal.color }}
                  aria-hidden
                />
                <p className="text-[15px] leading-6 text-ink">
                  <span className="font-semibold">{signal.level}.</span>{" "}
                  <span className="text-ink-2">{signal.body}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${container} mt-20 grid gap-6 sm:grid-cols-2`}>
        {[
          {
            screen: screens.clientDetail,
            title: "Client snapshots",
            body: "Adherence, weight trend, targets, notes and meals awaiting review on one screen.",
          },
          {
            screen: screens.mealReview,
            title: "Meal review",
            body: "See each logged meal with its photo and AI breakdown, add a note, and mark it as verified.",
          },
        ].map(({ screen, title, body }) => (
          <article
            key={title}
            className="reveal flex flex-col items-center overflow-hidden rounded-[var(--radius-card)] bg-card px-6 pt-8 text-center"
          >
            <h3 className="text-xl font-bold tracking-tight text-ink">{title}</h3>
            <p className="mt-2 max-w-sm text-[15px] leading-6 text-ink-2">{body}</p>
            <div className="mt-8 h-[300px] w-full max-w-[260px] overflow-hidden sm:h-[360px]">
              <Phone screen={screen} sizes="260px" className="w-full" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Workouts() {
  return (
    <section id="workouts" className={`${section} bg-card`}>
      <div className={`${container} grid items-center gap-14 lg:grid-cols-2`}>
        <div>
          <SectionHeading
            eyebrow="Workout plans"
            title="Training plans,"
            accent="logged set by set."
            intro="Build the plan once from more than 650 exercises and share it. Your clients follow it one set at a time, and every set lands in FitLens next to their meals."
          />
          <CheckList
            items={[
              ["Sets, reps and weight in place", "Type the targets right on each exercise, plus rest, notes and timed holds."],
              ["Your own demo videos", "Record a quick demo or paste a link, and it shows on that exercise."],
              ["Every session, logged", "See each set your client did against your targets, and how long it took."],
            ]}
          />
          <TextLink href="/workout-plans">How workout plans work in FitLens</TextLink>
        </div>
        <div className="reveal flex items-end justify-center gap-5 pt-8">
          <Phone
            screen={screens.builder}
            sizes="(min-width: 1024px) 260px, 42vw"
            className="w-[42vw] max-w-[260px]"
          />
          <Phone
            screen={screens.player}
            sizes="(min-width: 1024px) 260px, 42vw"
            className="w-[42vw] max-w-[260px] -translate-y-8"
          />
        </div>
      </div>
    </section>
  );
}

function Nutrition() {
  return (
    <section id="nutrition" className={section}>
      <div className={`${container} grid items-center gap-14 lg:grid-cols-2`}>
        <div className="reveal order-2 flex items-end justify-center gap-5 pt-8 lg:order-1">
          <Phone
            screen={screens.mealResult}
            sizes="(min-width: 1024px) 260px, 42vw"
            className="w-[42vw] max-w-[260px] -translate-y-8"
          />
          <Phone
            screen={screens.mealPlans}
            sizes="(min-width: 1024px) 260px, 42vw"
            className="w-[42vw] max-w-[260px]"
          />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Nutrition tracking"
            title="See what clients"
            accent="actually eat."
            intro="Clients snap a photo of their plate or type what they ate. FitLens estimates calories, protein, carbs and fat ingredient by ingredient, and the meal lands on your dashboard for review."
          />
          <CheckList
            items={[
              ["Photo in, macros out", "A full breakdown of every meal, with ingredients you can check."],
              ["Meal plans, written once", "Build a single meal or a full day and share it with as many clients as you like."],
              ["Trainer review", "Verify meals, leave notes, and spot patterns across the week."],
            ]}
          />
          <TextLink href="/for-trainers">Nutrition tracking for personal trainers</TextLink>
        </div>
      </div>

      <div className={`${container} reveal mt-16`}>
        <MealExample />
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section id="clients" className={`${section} bg-card`}>
      <div className={container}>
        <SectionHeading
          center
          eyebrow="For your clients"
          title="Logging a meal takes"
          accent="five seconds."
          intro="The easier it is for clients to log, the more of their week you actually see. FitLens makes it a photo, not a chore, and today's workout is waiting on their home screen."
        />
        {/* Three screens on larger displays; on phones just today's workout, at a readable size */}
        <div className="reveal mt-14 grid items-end gap-8 sm:grid-cols-3">
          {[
            { screen: screens.describe, caption: "Log a meal", phoneOnly: false },
            { screen: screens.today, caption: "Today's workout", phoneOnly: true },
            { screen: screens.clientHome, caption: "Progress at a glance", phoneOnly: false },
          ].map(({ screen, caption, phoneOnly }) => (
            <figure key={caption} className={`m-0 ${phoneOnly ? "" : "hidden sm:block"}`}>
              <Phone
                screen={screen}
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 30vw, 70vw"
                className="mx-auto w-[70vw] max-w-[280px] sm:w-full"
              />
              <figcaption className="mt-4 text-center text-sm font-medium text-ink-2">
                {caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Photo in, macros out", "A full breakdown of every meal, with ingredients they can check."],
            ["Today at a glance", "Calories, protein, carbs, fat and water in one ring."],
            ["Plans from your coach", "Meals and workouts their trainer shares, ready to follow."],
            ["A squad that keeps them honest", "Share meals, cheer each other on, message their coach."],
          ].map(([title, body]) => (
            <li key={title} className="rounded-[var(--radius-card)] bg-paper p-5">
              <p className="text-[15px] font-semibold text-ink">{title}</p>
              <p className="mt-1.5 text-sm leading-6 text-ink-2">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className={section}>
      <div className={container}>
        <SectionHeading center eyebrow="How it works" title="Invite. Plan." accent="Coach." />
        <ol className="mt-14 grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="reveal rounded-[var(--radius-card)] bg-card p-7">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-on-accent">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-sm font-semibold text-ink-2">Step {i + 1}</span>
              </div>
              <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">{title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-ink-2">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Pilot() {
  return (
    <section id="pilot-details" className={`${section} bg-card`}>
      <div className={container}>
        <SectionHeading
          eyebrow="The pilot"
          title="Straightforward terms."
          intro="We're onboarding a small group of personal trainers first. Here is exactly what that means."
        />
        <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pilotFacts.map(([term, detail]) => (
            <div key={term} className="reveal rounded-[var(--radius-card)] bg-paper p-6">
              <dt className="text-lg font-bold tracking-tight text-ink">{term}</dt>
              <dd className="m-0 mt-2 text-[15px] leading-6 text-ink-2">{detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function AlsoIncluded() {
  return (
    <section id="features" className={section}>
      <div className={container}>
        <SectionHeading
          eyebrow="Also included"
          title="Everything a coach needs."
          accent="Nothing they don't."
        />
        <ul className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {alsoIncluded.map((item) => (
            <li key={item} className="flex gap-3 border-b border-line py-3.5 text-[15px] text-ink">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className={`${section} bg-card`}>
      <div className={`${container} grid gap-10 lg:grid-cols-[0.8fr_1.2fr]`}>
        <SectionHeading eyebrow="FAQ" title="Questions trainers ask." />
        <div className="divide-y divide-line rounded-[var(--radius-card)] bg-paper px-6">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group py-4">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {q}
                <span
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card text-lg text-ink-2 transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="mt-2 pb-2 text-[15px] leading-7 text-ink-2">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="pilot" className={section}>
      <div className={`${container} text-center`}>
        <Eyebrow>Join the pilot</Eyebrow>
        <h2 className="mx-auto mt-3 max-w-3xl text-[2.5rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Grow your <em>client list.</em>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-ink-2">
          We&apos;re onboarding a small group of personal trainers first. Leave
          your email and we&apos;ll set you up, free for up to 10 clients.
          FitLens is on iPhone, and your clients always use it for free.
        </p>
        <div className="mt-9 flex justify-center">
          <PilotForm id="pilot-email" />
        </div>
      </div>
    </section>
  );
}
