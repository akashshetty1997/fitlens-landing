"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight,
  Camera, 
  Check,
  LayoutDashboard, 
  Users, 
  Sparkles,
  Smartphone,
  Dumbbell,
  BarChart3,
  AlertTriangle,
  Activity,
  ChefHat,
  TrendingUp,
  Droplet,
  Calendar,
  MessageCircle,
  UserCheck,
  Shield,
  Share2
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("https://formspree.io/f/xzddzwjj", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);
    if (res.ok) {
      setSubmitted(true);
    }
  };

  const currentYear = new Date().getFullYear();

  const clientFeatures = [
    {
      icon: Camera,
      title: "AI-Powered Meal Logging",
      description: "Take a photo, describe with voice, or type - AI instantly analyzes nutrition"
    },
    {
      icon: TrendingUp,
      title: "Smart Nutrition Tracking",
      description: "Track calories, protein, carbs, and fats with visual progress rings"
    },
    {
      icon: Users,
      title: "Squad Feed & Accountability",
      description: "Share meals with your trainer's squad for group motivation"
    },
    {
      icon: Droplet,
      title: "Hydration Tracking",
      description: "Log water intake with one tap to stay hydrated throughout the day"
    },
    {
      icon: Calendar,
      title: "Weekly Calendar View",
      description: "Review your nutrition history and track compliance over time"
    },
    {
      icon: MessageCircle,
      title: "Direct Trainer Communication",
      description: "Message your trainer directly for guidance and support"
    }
  ];

  const trainerFeatures = [
    {
      icon: LayoutDashboard,
      title: "Client Dashboard Overview",
      description: "Monitor all clients' progress, compliance, and nutrition at a glance"
    },
    {
      icon: UserCheck,
      title: "Automated Compliance Tracking",
      description: "See who's logging meals without chasing clients for screenshots"
    },
    {
      icon: AlertTriangle,
      title: "Risk Management & Alerts",
      description: "Identify at-risk clients who need intervention before they quit"
    },
    {
      icon: Activity,
      title: "Client Status Tracking",
      description: "See inactive, on-track, and struggling clients with visual indicators"
    },
    {
      icon: ChefHat,
      title: "Meal Creation & Sharing",
      description: "Create meal plans and share them directly with clients for easy logging"
    },
    {
      icon: Users,
      title: "Squad Management",
      description: "Create accountability groups where clients motivate each other"
    },
    {
      icon: BarChart3,
      title: "Nutrition Analytics",
      description: "View detailed reports on client nutrition patterns and trends"
    },
    {
      icon: Shield,
      title: "Unique Trainer Code",
      description: "Share your code to instantly onboard new clients to your squad"
    },
    {
      icon: Share2,
      title: "Scalable Client Management",
      description: "Manage unlimited clients without the manual tracking headache"
    }
  ];

  return (
    <main className="landing-shell min-h-screen overflow-hidden bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-background/70 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="FitLens home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-sm font-black text-emerald-950 shadow-lg shadow-emerald-500/20">
              F
            </span>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-emerald-400">Fit</span>Lens
            </span>
          </Link>
          <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#features">Features</a>
            <a className="transition-colors hover:text-foreground" href="#showcase">See it in action</a>
            <Link className="transition-colors hover:text-foreground" href="/privacy">Privacy</Link>
          </div>
          <Button className="rounded-full px-5 shadow-lg shadow-white/5" asChild>
            <a href="#waitlist">
              Get Early Access
              <ArrowRight />
            </a>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <motion.section
        className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 pt-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-20 lg:pb-32 lg:pt-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <div>
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-sm font-medium text-emerald-300"
            variants={fadeUp}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Nutrition accountability, reimagined
          </motion.div>
          <motion.h1
            className="max-w-3xl text-5xl font-bold leading-[1.04] tracking-[-0.055em] md:text-7xl"
            variants={fadeUp}
          >
            See what your clients{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-200 bg-clip-text text-transparent">
              actually eat
            </span>
          </motion.h1>
          <motion.p
            className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground md:text-xl"
            variants={fadeUp}
          >
            AI-powered nutrition tracking for personal trainers. Your clients log
            meals via photo, voice, or text — you get proof, not promises.
          </motion.p>
          <motion.div className="mt-9 flex flex-col gap-3 sm:flex-row" variants={fadeUp}>
            <Button size="lg" className="rounded-full px-6 shadow-xl shadow-emerald-500/10" asChild>
              <a href="#waitlist">
                Request Early Access
                <ArrowRight />
              </a>
            </Button>
            <a
              href="#showcase"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 px-6 text-sm font-medium text-foreground transition-colors hover:bg-white/5"
            >
              Explore the product
            </a>
          </motion.div>
          <motion.div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground" variants={fadeUp}>
            <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Photo, voice & text logging</span>
            <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Built for coaches</span>
          </motion.div>
        </div>

        <motion.div className="relative mx-auto w-full max-w-[480px]" variants={fadeUp}>
          <div className="absolute -inset-8 rounded-[3rem] bg-emerald-500/15 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.06] p-3 shadow-2xl shadow-black/40 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between px-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Live nutrition snapshot</span>
              <span>Today</span>
            </div>
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
              <img
                src="/images/client/screen1.png"
                alt="FitLens nutrition tracking screen"
                className="h-[520px] w-full object-cover object-top opacity-95"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="absolute -bottom-5 -left-8 hidden rounded-2xl border border-white/10 bg-[#17191c]/95 p-4 shadow-xl backdrop-blur md:block">
              <div className="text-2xl font-bold text-foreground">298 <span className="text-sm font-normal text-muted-foreground">kcal logged</span></div>
              <div className="mt-1 text-xs text-emerald-300">On track for today</div>
            </div>
            <div className="absolute -right-5 top-20 hidden rounded-2xl border border-white/10 bg-[#17191c]/95 p-4 shadow-xl backdrop-blur sm:block">
              <div className="text-xs text-muted-foreground">Weekly consistency</div>
              <div className="mt-1 text-2xl font-bold text-foreground">92%</div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Problem/Solution */}
      <motion.section
        className="mx-auto max-w-6xl px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <motion.div className="mb-10 max-w-xl" variants={fadeUp}>
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-400">The coaching gap</div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Stop coaching from guesswork.</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={fadeUp}>
            <Card className="h-full rounded-3xl border-white/10 bg-white/[0.03] transition-colors hover:bg-white/[0.05]">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex rounded-full bg-rose-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-300">
                  THE PROBLEM
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Clients say they&apos;re eating clean
                </h3>
                <p className="text-muted-foreground">
                  But results don&apos;t lie. You program great workouts, but
                  you&apos;re flying blind on nutrition. Self-reported food logs
                  are unreliable, and you lose clients who blame the training.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Card className="h-full rounded-3xl border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-transparent transition-colors hover:from-emerald-400/15">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  THE SOLUTION
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  FitLens shows you the truth
                </h3>
                <p className="text-muted-foreground">
                  Clients snap a photo, leave a voice note, or type what they
                  ate. Our AI analyzes it instantly. You see real data on your
                  dashboard — no more guessing.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        id="features"
        className="mx-auto max-w-6xl px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <motion.h2
          className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl"
          variants={fadeUp}
        >
          Built for trainers who scale
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div variants={fadeUp}>
            <Card className="h-full rounded-3xl border-white/10 bg-white/[0.03] text-center transition-all hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.05]">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-7 h-7 text-emerald-500" />
                </div>
                <h3 className="font-semibold mb-2">AI Food Recognition</h3>
                <p className="text-muted-foreground text-sm">
                  Photo, voice, or text — our AI breaks down calories, protein,
                  carbs, and fat instantly.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Card className="h-full rounded-3xl border-white/10 bg-white/[0.03] text-center transition-all hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.05]">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <LayoutDashboard className="w-7 h-7 text-emerald-500" />
                </div>
                <h3 className="font-semibold mb-2">Trainer Dashboard</h3>
                <p className="text-muted-foreground text-sm">
                  See all your clients in one place. Track compliance, spot
                  trends, intervene early.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Card className="h-full rounded-3xl border-white/10 bg-white/[0.03] text-center transition-all hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.05]">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-emerald-500" />
                </div>
                <h3 className="font-semibold mb-2">Squad Accountability</h3>
                <p className="text-muted-foreground text-sm">
                  Clients post meals to group feeds. Peer pressure that drives
                  results without extra work for you.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Detailed Features Section */}
      <motion.section
        className="mx-auto max-w-6xl px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <motion.div className="text-center mb-16" variants={fadeUp}>
          <div className="mb-4 inline-block rounded-full bg-emerald-400/10 px-4 py-1 text-sm font-semibold text-emerald-300">
            POWERFUL FEATURES
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you&apos;re a client tracking your nutrition or a trainer managing your squad, FitLens has the tools you need
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Client Features */}
          <motion.div variants={fadeUp}>
            <Card className="h-full rounded-3xl border-emerald-400/20 border-l-4 border-l-emerald-400 bg-white/[0.03]">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <Smartphone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">For Clients</h3>
                    <p className="text-sm text-muted-foreground">Track your fitness journey</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {clientFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <feature.icon className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trainer Features */}
          <motion.div variants={fadeUp}>
            <Card className="h-full rounded-3xl border-amber-400/20 border-l-4 border-l-amber-400 bg-white/[0.03]">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center">
                    <Dumbbell className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">For Trainers</h3>
                    <p className="text-sm text-muted-foreground">Scale your coaching business</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {trainerFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                      <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <feature.icon className="w-4 h-4 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Comparison Stats */}
        <motion.div variants={fadeUp}>
          <Card className="rounded-[2rem] border-0 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 text-white shadow-2xl shadow-emerald-500/10">
            <CardContent className="p-12 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6" />
                <h3 className="text-2xl md:text-3xl font-bold">
                  Built for Scale, Designed for Results
                </h3>
              </div>
              <p className="text-emerald-50 text-lg mb-8 max-w-2xl mx-auto">
                FitLens replaces spreadsheets, MyFitnessPal screenshots, and manual tracking with automated AI-powered compliance monitoring
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-5xl font-bold mb-2">10x</div>
                  <div className="text-emerald-100">Faster compliance checking</div>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">100%</div>
                  <div className="text-emerald-100">Verified meal data</div>
                </div>
                <div>
                  <div className="text-5xl font-bold mb-2">∞</div>
                  <div className="text-emerald-100">Scalable clients</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.section>

      {/* App Screenshots */}
      <motion.section
        id="showcase"
        className="mx-auto max-w-6xl px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-4"
          variants={fadeUp}
        >
          See it in action
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
          variants={fadeUp}
        >
          A simple experience for clients. Powerful insights for trainers.
        </motion.p>

        {/* Trainer App */}
        <motion.div className="mb-16" variants={fadeUp}>
          <h3 className="text-xl font-semibold text-center mb-6 text-emerald-500">
            Trainer Dashboard
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="overflow-hidden rounded-2xl border-white/10 bg-white/[0.03] shadow-xl shadow-black/20 transition-transform hover:-translate-y-1">
              <img
                src="/images/trainer/dashboard.png"
                alt="Trainer dashboard"
                className="w-full h-auto"
              />
            </Card>
            <Card className="overflow-hidden rounded-2xl border-white/10 bg-white/[0.03] shadow-xl shadow-black/20 transition-transform hover:-translate-y-1">
              <img
                src="/images/trainer/screen1.png"
                alt="Trainer view"
                className="w-full h-auto"
              />
            </Card>
            <Card className="overflow-hidden rounded-2xl border-white/10 bg-white/[0.03] shadow-xl shadow-black/20 transition-transform hover:-translate-y-1">
              <img
                src="/images/trainer/screen2.png"
                alt="Client details"
                className="w-full h-auto"
              />
            </Card>
            <Card className="overflow-hidden rounded-2xl border-white/10 bg-white/[0.03] shadow-xl shadow-black/20 transition-transform hover:-translate-y-1">
              <img
                src="/images/trainer/squad.png"
                alt="Squad view"
                className="w-full h-auto"
              />
            </Card>
          </div>
        </motion.div>

        {/* Client App */}
        <motion.div variants={fadeUp}>
          <h3 className="text-xl font-semibold text-center mb-6 text-emerald-500">
            Client App
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="overflow-hidden rounded-2xl border-white/10 bg-white/[0.03] shadow-xl shadow-black/20 transition-transform hover:-translate-y-1">
              <img
                src="/images/client/screen1.png"
                alt="Client home"
                className="w-full h-auto"
              />
            </Card>
            <Card className="overflow-hidden rounded-2xl border-white/10 bg-white/[0.03] shadow-xl shadow-black/20 transition-transform hover:-translate-y-1">
              <img
                src="/images/client/screen2.png"
                alt="Meal logging"
                className="w-full h-auto"
              />
            </Card>
            <Card className="overflow-hidden rounded-2xl border-white/10 bg-white/[0.03] shadow-xl shadow-black/20 transition-transform hover:-translate-y-1">
              <img
                src="/images/client/screen3.png"
                alt="AI analysis"
                className="w-full h-auto"
              />
            </Card>
            <Card className="overflow-hidden rounded-2xl border-white/10 bg-white/[0.03] shadow-xl shadow-black/20 transition-transform hover:-translate-y-1">
              <img
                src="/images/client/screen4.png"
                alt="Progress view"
                className="w-full h-auto"
              />
            </Card>
            <Card className="overflow-hidden rounded-2xl border-white/10 bg-white/[0.03] shadow-xl shadow-black/20 transition-transform hover:-translate-y-1">
              <img
                src="/images/client/screen5.png"
                alt="Squad feed"
                className="w-full h-auto"
              />
            </Card>
          </div>
        </motion.div>
      </motion.section>

      {/* Waitlist */}
      <motion.section
        id="waitlist"
        className="mx-auto max-w-4xl px-6 py-24 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <motion.div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 via-white/[0.04] to-transparent px-6 py-14 shadow-2xl shadow-emerald-500/5 md:px-16" variants={fadeUp}>
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">Your clients. Your clarity.</div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Ready to coach with proof?</h2>
          <motion.p className="mb-8 text-muted-foreground" variants={fadeUp}>
            We&apos;re onboarding trainers for our pilot program. Join the
            waitlist and be first in line.
          </motion.p>
          <motion.div variants={fadeUp}>
            {submitted ? (
              <Card className="border-emerald-400/30 bg-emerald-400/10">
                <CardContent className="p-6">
                  <p className="font-medium text-emerald-300">
                    You&apos;re on the list! We&apos;ll be in touch soon.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 flex-1 rounded-full border-white/10 bg-black/20 px-5"
                />
                <Button type="submit" size="lg" className="rounded-full px-6" disabled={loading}>
                  {loading ? "Joining..." : "Join Waitlist"}
                  {!loading && <ArrowRight />}
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-muted-foreground text-sm">
            © {currentYear} FitLens. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-emerald-500">Fit</span>Lens
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
