"use client";

import { useEffect, useRef, useState } from "react";
import {
  MotionConfig,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Check, Plus, X } from "lucide-react";
import { ScreenDeck, type Screen } from "@/components/screen-deck";
import { FeatureTabs, type FeatureTab } from "@/components/feature-tabs";
import { FanSpread } from "@/components/fan-spread";
import { AiDemo } from "@/components/ai-demo";
import { TrackingStory } from "@/components/tracking-story";
import { SiteFooter, Wordmark } from "@/components/site-chrome";
import { StructuredData } from "@/components/structured-data";

// FitLens app palette (fitness-app/constants/theme.js + macro colours)
const ORANGE = "#F97316";
const AMBER = "#F59E0B";
const GREEN = "#10B981";
const BLUE = "#3B82F6";
const RED = "#EF4444";

const screens: Record<string, Screen> = {
  dashboard: {
    src: "/screens/trainer-dashboard.webp",
    alt: "Trainer dashboard with a prioritised attention queue",
    caption: "Trainer dashboard",
  },
  plans: {
    src: "/screens/meal-plans.webp",
    alt: "Meal plan library with plans shared with clients",
    caption: "Meal plans",
  },
  client: {
    src: "/screens/client-detail.webp",
    alt: "Client snapshot with adherence and weight trend",
    caption: "Client snapshot",
  },
  meal: {
    src: "/screens/meal-result.webp",
    alt: "AI meal breakdown with calories, macros and ingredients",
    caption: "AI meal breakdown",
  },
  home: {
    src: "/screens/client-home.webp",
    alt: "Client home with calorie ring, macros and water",
    caption: "Client home",
  },
  squad: {
    src: "/screens/squad.webp",
    alt: "Squad feed with a coach post and a shared meal",
    caption: "Squad feed",
  },
  chat: {
    src: "/screens/chat.webp",
    alt: "Chat between a client and their coach",
    caption: "Coach chat",
  },
};

const heroScreens = [
  screens.dashboard,
  screens.meal,
  screens.plans,
  screens.home,
  screens.squad,
  screens.client,
  screens.chat,
];
const clientScreens = [screens.meal, screens.home, screens.squad, screens.chat];

const tickerMeals = [
  ["Greek yogurt, blueberries & granola", 319],
  ["Grilled chicken salad", 381],
  ["High-protein chicken power bowl", 520],
  ["Avocado toast & poached eggs", 395],
  ["Overnight protein oats", 410],
  ["Baked salmon & sweet potato", 536],
  ["Salmon & quinoa plate", 610],
  ["Turkey avocado wrap", 520],
] as const;

const steps = [
  {
    n: "01",
    title: "Snap",
    cmd: "photo → meal",
    body: "Your client photographs their plate or types what they ate. No scales, no barcode hunting.",
  },
  {
    n: "02",
    title: "Analyse",
    cmd: "meal → macros",
    body: "FitLens estimates calories, protein, carbs and fat ingredient by ingredient, in seconds.",
  },
  {
    n: "03",
    title: "Coach",
    cmd: "macros → dashboard",
    body: "It lands on your dashboard. You see who's on track and who needs a nudge, before they drift.",
  },
];

const stats = [
  ["5s", "To log a meal"],
  ["4", "Numbers per meal"],
  ["1", "Dashboard per roster"],
  ["$0", "During the pilot"],
];

const trainerFeatures: FeatureTab[] = [
  {
    title: "Daily attention queue",
    body: "Clients who are slipping, prioritised, so you step in before they quit.",
    screen: screens.dashboard,
  },
  {
    title: "Meal plans, written once",
    body: "Build a meal or a full day and share it with as many clients as you like.",
    screen: screens.plans,
  },
  {
    title: "Client snapshots",
    body: "Adherence, weight trend and meals awaiting your review on one screen.",
    screen: screens.client,
  },
  {
    title: "Your own squad",
    body: "A private group feed and direct chat. Invite clients with your trainer code.",
    screen: screens.squad,
  },
];

const features = [
  {
    title: "AI meal analysis",
    tag: "Photo + text",
    body: "Snap or describe a meal. Calories, protein, carbs and fat, ingredient by ingredient, with a confidence score.",
  },
  {
    title: "Attention queue",
    tag: "Auto-prioritised",
    body: "Clients who stop logging or miss targets rise to the top of your day, ranked by urgency.",
  },
  {
    title: "Meal plans",
    tag: "Write once",
    body: "Single meals or full days with macros, shared with as many clients as you like.",
  },
  {
    title: "Client snapshots",
    tag: "Per client",
    body: "Adherence, weight trend, targets, notes and meals awaiting review in one place.",
  },
  {
    title: "Squads & chat",
    tag: "Private groups",
    body: "A feed for your clients plus direct messages, with report and block built in.",
  },
  {
    title: "Private by default",
    tag: "No ads",
    body: "Data is never sold or used for advertising. Clients can delete their account any time.",
  },
];

const extras = [
  "Water tracking",
  "Weight trends",
  "Calorie targets",
  "Trainer code",
  "Leaderboard",
  "Meal favourites",
  "Reminders",
  "Dark mode",
];

const roster = [
  { name: "Sam Rivera", score: 96, color: GREEN },
  { name: "Maya Chen", score: 88, color: GREEN },
  { name: "Jordan Lee", score: 81, color: GREEN },
  { name: "Marcus Brown", score: 54, color: AMBER },
  { name: "Priya Patel", score: 12, color: RED },
];

const signals = [
  {
    level: "Critical",
    color: RED,
    body: "No meals logged in 2 days. Reach out today.",
  },
  {
    level: "Nutrition",
    color: AMBER,
    body: "Protein under target 5 of the last 7 days.",
  },
  {
    level: "To review",
    color: BLUE,
    body: "3 meals awaiting your verification.",
  },
  {
    level: "On track",
    color: GREEN,
    body: "Logging consistently and hitting targets.",
  },
];

const clientPoints = [
  [
    "Photo in, macros out",
    "A full breakdown of every meal, with ingredients you can check.",
  ],
  ["Today at a glance", "Calories, protein, carbs, fat and water in one ring."],
  ["Plans from your coach", "Meals your trainer shares, ready to follow."],
  [
    "A squad that keeps you honest",
    "Share meals, cheer each other on, message your coach.",
  ],
] as const;

const withoutFitLens = [
  "Food diaries over WhatsApp, if clients remember",
  "Guessing portions from blurry screenshots",
  "Finding out a client fell off weeks later",
  "Rewriting the same meal plan for every client",
];

const withFitLens = [
  "Every meal logged with calories and macros",
  "A daily queue of who needs you, prioritised",
  "Spot a slipping client the day it happens",
  "Write a plan once, share it with anyone",
];

const faqs = [
  {
    q: "How much does FitLens cost?",
    a: "FitLens is free for trainers during the pilot, and clients always use the app for free. We'll share pricing with pilot trainers well before anything changes.",
  },
  {
    q: "How accurate is the AI?",
    a: "FitLens estimates each meal ingredient by ingredient and shows a confidence score, so clients can check what it found. It's built for coaching decisions, not medical advice, and you can review every meal from your dashboard.",
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

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="landing min-h-screen overflow-x-clip antialiased">
        <StructuredData faqs={faqs} />
        <Nav />
        <Hero />
        <Ticker />
        <HowItWorks />
        <StorySection />
        <DemoSection />
        <TrainerSection />
        <FeatureGrid />
        <RosterSection />
        <ClientSection />
        <BeforeAfter />
        <Faq />
        <FinalCta />
        <SiteFooter />
      </main>
    </MotionConfig>
  );
}

/* ---------- shared bits ---------- */

function SectionLabel({
  children,
  color = ORANGE,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <p
      className="mb-5 text-xs font-medium uppercase tracking-[0.2em]"
      style={{ color }}
    >
      {"// "}
      {children}
    </p>
  );
}

/** Uppercase headline that types itself in when scrolled into view */
function TypeHeading({
  text,
  highlight,
  className = "",
}: {
  text: string;
  highlight?: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const full = highlight ? `${text} ${highlight}` : text;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduceMotion) return setCount(full.length);
    if (!inView) return;
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= full.length) clearInterval(timer);
    }, 32);
    return () => clearInterval(timer);
  }, [inView, reduceMotion, full.length]);

  const typed = full.slice(0, count);
  const plain = typed.slice(0, text.length);
  const accent = typed.length > text.length ? typed.slice(text.length + 1) : "";

  return (
    <h2 ref={ref} className={`font-display uppercase ${className}`}>
      <span className="sr-only">{full}</span>
      <span aria-hidden>
        {plain}
        {accent && (
          <>
            {" "}
            <em>{accent}</em>
          </>
        )}
        <span className="cursor-blink ml-1 inline-block h-[0.8em] w-[0.08em] translate-y-[0.08em] bg-accent" />
      </span>
    </h2>
  );
}

function PilotForm({ id }: { id: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xzddzwjj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <p className="inline-flex items-center gap-2 border border-green/40 bg-green/10 px-4 py-3 text-sm text-green">
        <Check className="h-4 w-4" /> You&apos;re on the list. We&apos;ll be in
        touch soon.
      </p>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xl flex-col border border-line bg-card sm:flex-row"
      >
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <span
          className="hidden items-center pl-4 text-accent sm:flex"
          aria-hidden
        >
          $
        </span>
        <input
          id={id}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourgym.com"
          className="h-12 w-full bg-transparent px-4 text-sm text-ink placeholder:text-ink/30 outline-none sm:px-3"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 bg-accent px-6 text-xs font-semibold uppercase tracking-[0.15em] text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending" ? "Joining…" : "Join pilot"}
          {status !== "sending" && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-xs text-red">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}

/* ---------- sections ---------- */

function Nav() {
  const links = [
    ["#how", "How it works"],
    ["#demo", "Demo"],
    ["#trainers", "Trainers"],
    ["#features", "Features"],
    ["#faq", "FAQ"],
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Wordmark />
        <div className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.18em] text-ink/50 md:flex">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="transition-colors hover:text-accent"
            >
              {label}
            </a>
          ))}
        </div>
        <a
          href="#pilot"
          className="inline-flex items-center gap-1.5 bg-accent px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-paper transition-opacity hover:opacity-90"
        >
          Join pilot
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </nav>
    </header>
  );
}

function FloatTag({
  label,
  color,
  className,
  delay = 0,
}: {
  label: string;
  color: string;
  className: string;
  delay?: number;
}) {
  return (
    <motion.span
      aria-hidden
      className={`absolute hidden items-center gap-1.5 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-paper md:inline-flex ${className}`}
      style={{ background: color }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.4, delay: 0.6 + delay },
        scale: { duration: 0.4, delay: 0.6 + delay },
        y: { duration: 4 + delay, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <span className="h-1.5 w-1.5 bg-paper/80" />
      {label}
    </motion.span>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div
        aria-hidden
        className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 text-center sm:px-8 lg:pt-24">
        <motion.p
          {...reveal}
          className="mx-auto mb-10 inline-flex flex-wrap justify-center gap-x-2 border border-line bg-card px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-ink/50"
        >
          <span className="text-accent">v1.0.1</span>
          <span>{"// iPhone"}</span>
          <span>{"// free pilot"}</span>
          <span>{"// for trainers"}</span>
        </motion.p>

        <div className="relative mx-auto max-w-4xl">
          <FloatTag
            label="381 kcal"
            color={GREEN}
            className="-left-4 top-2 lg:-left-16"
          />
          <FloatTag
            label="34g protein"
            color={ORANGE}
            className="-right-2 top-0 lg:-right-14"
            delay={0.4}
          />
          <FloatTag
            label="At risk"
            color={AMBER}
            className="-left-8 bottom-6 lg:-left-24"
            delay={0.8}
          />
          <FloatTag
            label="Logged"
            color={BLUE}
            className="-right-6 bottom-2 lg:-right-20"
            delay={1.2}
          />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[3.1rem] uppercase leading-[0.92] sm:text-7xl lg:text-[6.4rem]"
          >
            Coach what they <br />
            <em>actually eat.</em>
          </motion.h1>
        </div>

        <motion.p
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.15 }}
          className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-ink/60 sm:text-[15px]"
        >
          FitLens is AI nutrition tracking for personal trainers. Clients snap a
          photo of every meal; you get calories, macros and a daily list of who
          needs you.
        </motion.p>

        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.25 }}
          className="mt-9 flex flex-col items-center gap-4"
        >
          <PilotForm id="hero-email" />
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink/40">
            Free during the pilot <span className="text-ink/20">{"//"}</span>{" "}
            clients always free
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-20 max-w-sm"
        >
          <div
            aria-hidden
            className="absolute left-1/2 top-[40%] h-[70%] w-[120%] -translate-x-1/2 -translate-y-1/2 blur-3xl"
            style={{
              background: `radial-gradient(circle, ${ORANGE}33, transparent 65%)`,
            }}
          />
          <ScreenDeck screens={heroScreens} className="relative" />
        </motion.div>
      </div>
    </section>
  );
}

function Ticker() {
  const colors = [ORANGE, GREEN, BLUE, AMBER];
  const items = [...tickerMeals, ...tickerMeals];
  return (
    <div
      className="overflow-hidden border-y border-line bg-card py-3.5"
      aria-hidden
    >
      <div className="ticker-track flex w-max gap-10 whitespace-nowrap text-xs uppercase tracking-[0.12em]">
        {items.map(([meal, kcal], i) => (
          <span key={i} className="flex items-center gap-3">
            <span
              className="h-1.5 w-1.5"
              style={{ background: colors[i % colors.length] }}
            />
            <span className="text-ink/50">{meal}</span>
            <span className="text-ink">{kcal} kcal</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-16 border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-28">
        <SectionLabel>How it works</SectionLabel>
        <TypeHeading
          text="Plate to dashboard."
          highlight="Three steps."
          className="text-4xl leading-[0.95] sm:text-6xl"
        />
        <div className="mt-14 grid border-l border-t border-line md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.08 }}
              className="border-b border-r border-line p-7"
            >
              <span className="font-display text-5xl text-accent">
                {step.n}
              </span>
              <h3 className="mt-6 text-sm font-semibold uppercase tracking-[0.15em]">
                {step.title}
              </h3>
              <p className="mt-2 text-xs text-accent/80">{`$ ${step.cmd}`}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink/55">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Stats bar */}
      <div className="grid grid-cols-2 bg-accent text-paper md:grid-cols-4">
        {stats.map(([value, label], i) => (
          <motion.div
            key={label}
            {...reveal}
            transition={{ ...reveal.transition, delay: i * 0.06 }}
            className="border-paper/20 px-6 py-8 sm:px-10 [&:not(:last-child)]:border-r"
          >
            <p className="font-display text-5xl leading-none">{value}</p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em]">
              {label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section id="story" className="scroll-mt-16 border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-28">
        <SectionLabel>How it feels</SectionLabel>
        <TypeHeading
          text="Point. Snap."
          highlight="Tracked."
          className="text-4xl leading-[0.95] sm:text-6xl"
        />
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-ink/55">
          No food scales, no searching a database. Your client points their
          phone at the plate and the meal is in their day.
        </p>
        <motion.div {...reveal} className="mt-12">
          <TrackingStory />
        </motion.div>
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section id="demo" className="scroll-mt-16 border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-28">
        <SectionLabel>See it in action</SectionLabel>
        <TypeHeading
          text="Type it or snap it."
          highlight="Macros in seconds."
          className="text-4xl leading-[0.95] sm:text-6xl"
        />
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-ink/55">
          A real analysis from the app: the meal, the macros and every
          ingredient it found.
        </p>
        <motion.div {...reveal} className="mt-12">
          <AiDemo />
        </motion.div>
      </div>
    </section>
  );
}

function TrainerSection() {
  return (
    <section id="trainers" className="scroll-mt-16 border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-28">
        <FeatureTabs
          features={trainerFeatures}
          header={
            <div>
              <SectionLabel>For trainers</SectionLabel>
              <TypeHeading
                text="Your whole roster."
                highlight="At a glance."
                className="text-4xl leading-[0.95] sm:text-6xl"
              />
              <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/55">
                Stop chasing screenshots and food diaries. See what every client
                ate, how they&apos;re trending, and who needs you today.
              </p>
            </div>
          }
        />
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section id="features" className="scroll-mt-16 border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-28">
        <SectionLabel>Features</SectionLabel>
        <TypeHeading
          text="Everything a coach needs."
          highlight="Nothing they don't."
          className="text-4xl leading-[0.95] sm:text-6xl"
        />
        <div className="mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const lead = i === 0;
            return (
              <motion.div
                key={feature.title}
                {...reveal}
                transition={{ ...reveal.transition, delay: (i % 3) * 0.06 }}
                className={`border-b border-r border-line p-7 ${lead ? "bg-accent text-paper" : ""}`}
              >
                <span
                  className={`font-display text-4xl ${lead ? "" : "text-accent"}`}
                >
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.12em]">
                  {feature.title}
                </h3>
                <span
                  className={`mt-3 inline-block border px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] ${
                    lead ? "border-paper/40" : "border-accent/50 text-accent"
                  }`}
                >
                  [{feature.tag}]
                </span>
                <p
                  className={`mt-4 text-[13px] leading-relaxed ${lead ? "text-paper/80" : "text-ink/55"}`}
                >
                  {feature.body}
                </p>
              </motion.div>
            );
          })}
        </div>
        <motion.div {...reveal} className="mt-6 flex flex-wrap gap-2">
          {extras.map((extra) => (
            <span
              key={extra}
              className="border border-line px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-ink/50"
            >
              {extra}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function RosterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-28">
        <SectionLabel>Who needs you today</SectionLabel>
        <TypeHeading
          text="See who's slipping."
          highlight="Before they quit."
          className="text-4xl leading-[0.95] sm:text-6xl"
        />
        <div
          ref={ref}
          className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="border border-line bg-card p-6">
            <div className="mb-5 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-ink/40">
              <span>Example roster {"//"} 7-day adherence</span>
              <span>%</span>
            </div>
            <ul className="space-y-4">
              {roster.map((client, i) => (
                <li
                  key={client.name}
                  className="grid grid-cols-[7.5rem_1fr_2.5rem] items-center gap-4 text-xs sm:grid-cols-[9rem_1fr_3rem]"
                >
                  <span className="truncate uppercase tracking-[0.1em] text-ink/70">
                    {client.name}
                  </span>
                  <span className="h-2 bg-line">
                    <motion.span
                      className="block h-full"
                      style={{ background: client.color }}
                      initial={{ width: 0 }}
                      animate={{ width: inView ? `${client.score}%` : 0 }}
                      transition={{
                        duration: 1,
                        delay: 0.1 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </span>
                  <span
                    className="text-right tabular-nums"
                    style={{ color: client.color }}
                  >
                    {client.score}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            {signals.map((signal, i) => (
              <motion.div
                key={signal.level}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.08 }}
                className="border-l-2 bg-card px-5 py-4"
                style={{ borderColor: signal.color }}
              >
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: signal.color }}
                >
                  {signal.level}
                </p>
                <p className="mt-1.5 text-[13px] text-ink/65">{signal.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientSection() {
  return (
    <section id="clients" className="scroll-mt-16 border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-28">
        <div className="text-center">
          <SectionLabel color={GREEN}>For clients</SectionLabel>
          <TypeHeading
            text="Logging a meal takes"
            highlight="five seconds."
            className="text-4xl leading-[0.95] sm:text-6xl"
          />
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ink/55">
            The easier it is to log, the more your clients do it. FitLens makes
            it a photo, not a chore.
          </p>
        </div>
        <div className="mt-16">
          <FanSpread screens={clientScreens} />
        </div>
        <dl className="mt-16 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {clientPoints.map(([term, detail]) => (
            <motion.div
              key={term}
              {...reveal}
              className="border-b border-r border-line p-6"
            >
              <dt className="text-xs font-semibold uppercase tracking-[0.12em]">
                {term}
              </dt>
              <dd className="mt-2.5 text-[13px] leading-relaxed text-ink/55">
                {detail}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function BeforeAfter() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-28">
        <SectionLabel>Before / after</SectionLabel>
        <TypeHeading
          text="Coaching, minus"
          highlight="the guesswork."
          className="text-4xl leading-[0.95] sm:text-6xl"
        />
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2">
          <motion.div {...reveal} className="bg-paper p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
              Without FitLens
            </p>
            <ul className="mt-6 space-y-4">
              {withoutFitLens.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-ink/45">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red/70" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
            className="bg-card p-8"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
              With FitLens
            </p>
            <ul className="mt-6 space-y-4">
              {withFitLens.map((item) => (
                <li key={item} className="flex gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
        <div>
          <SectionLabel>FAQ</SectionLabel>
          <TypeHeading
            text="Questions"
            highlight="people ask."
            className="text-4xl leading-[0.95] sm:text-6xl"
          />
        </div>
        <motion.div {...reveal} className="border-t border-line">
          {faqs.map(({ q, a }, i) => (
            <details key={q} className="group border-b border-line py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                <span className="flex gap-4">
                  <span className="text-xs text-accent">0{i + 1}</span>
                  <span className="text-sm font-medium uppercase tracking-[0.08em]">
                    {q}
                  </span>
                </span>
                <Plus className="h-4 w-4 shrink-0 text-ink/40 transition-transform duration-300 group-open:rotate-45 group-open:text-accent" />
              </summary>
              <p className="mt-3 max-w-xl pl-9 text-[13px] leading-relaxed text-ink/55">
                {a}
              </p>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="pilot" className="scroll-mt-16 border-b border-line">
      <div className="relative mx-auto max-w-6xl overflow-hidden px-5 py-24 sm:px-8 lg:py-32">
        <div
          aria-hidden
          className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_20%_50%,black,transparent)]"
        />
        <div className="relative">
          <SectionLabel>Join the pilot</SectionLabel>
          <TypeHeading
            text="Coach with"
            highlight="proof."
            className="text-5xl leading-[0.92] sm:text-8xl"
          />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/55">
            We&apos;re onboarding a small group of personal trainers first.
            Leave your email and we&apos;ll set you up, free during the pilot.
          </p>
          <div className="mt-10">
            <PilotForm id="pilot-email" />
          </div>
        </div>
      </div>
    </section>
  );
}
