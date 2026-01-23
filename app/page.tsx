"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Camera, 
  LayoutDashboard, 
  Users, 
  Check, 
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
    <main className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-emerald-500">Fit</span>Lens
        </div>
        <Button asChild>
          <a href="#waitlist">Get Early Access</a>
        </Button>
      </nav>

      {/* Hero */}
      <motion.section
        className="px-6 py-24 max-w-4xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          variants={fadeUp}
        >
          See what your clients{" "}
          <span className="text-emerald-500">actually eat</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          variants={fadeUp}
        >
          AI-powered nutrition tracking for personal trainers. Your clients log
          meals via photo, voice, or text — you get proof, not promises.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Button size="lg" asChild>
            <a href="#waitlist">Request Early Access</a>
          </Button>
        </motion.div>
      </motion.section>

      {/* Problem/Solution */}
      <motion.section
        className="px-6 py-16 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={fadeUp}>
            <Card className="h-full border-destructive/30 bg-destructive/5">
              <CardContent className="p-8">
                <div className="text-destructive text-sm font-medium mb-2">
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
            <Card className="h-full border-emerald-500/30 bg-emerald-500/5">
              <CardContent className="p-8">
                <div className="text-emerald-500 text-sm font-medium mb-2">
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
        className="px-6 py-16 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          variants={fadeUp}
        >
          Built for trainers who scale
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div variants={fadeUp}>
            <Card className="text-center h-full">
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
            <Card className="text-center h-full">
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
            <Card className="text-center h-full">
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
        className="px-6 py-16 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <motion.div className="text-center mb-16" variants={fadeUp}>
          <div className="inline-block px-4 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-sm font-semibold mb-4">
            POWERFUL FEATURES
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're a client tracking your nutrition or a trainer managing your squad, FitLens has the tools you need
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Client Features */}
          <motion.div variants={fadeUp}>
            <Card className="h-full border-l-4 border-l-emerald-500">
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
            <Card className="h-full border-l-4 border-l-amber-500">
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
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
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
        className="px-6 py-16 max-w-6xl mx-auto"
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
            <Card className="overflow-hidden">
              <img
                src="/images/trainer/dashboard.png"
                alt="Trainer dashboard"
                className="w-full h-auto"
              />
            </Card>
            <Card className="overflow-hidden">
              <img
                src="/images/trainer/screen1.png"
                alt="Trainer view"
                className="w-full h-auto"
              />
            </Card>
            <Card className="overflow-hidden">
              <img
                src="/images/trainer/screen2.png"
                alt="Client details"
                className="w-full h-auto"
              />
            </Card>
            <Card className="overflow-hidden">
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
            <Card className="overflow-hidden">
              <img
                src="/images/client/screen1.png"
                alt="Client home"
                className="w-full h-auto"
              />
            </Card>
            <Card className="overflow-hidden">
              <img
                src="/images/client/screen2.png"
                alt="Meal logging"
                className="w-full h-auto"
              />
            </Card>
            <Card className="overflow-hidden">
              <img
                src="/images/client/screen3.png"
                alt="AI analysis"
                className="w-full h-auto"
              />
            </Card>
            <Card className="overflow-hidden">
              <img
                src="/images/client/screen4.png"
                alt="Progress view"
                className="w-full h-auto"
              />
            </Card>
            <Card className="overflow-hidden">
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
        className="px-6 py-24 max-w-2xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
      >
        <motion.h2 className="text-3xl font-bold mb-4" variants={fadeUp}>
          Get early access
        </motion.h2>
        <motion.p className="text-muted-foreground mb-8" variants={fadeUp}>
          We&apos;re onboarding trainers for our pilot program. Join the
          waitlist and be first in line.
        </motion.p>
        <motion.div variants={fadeUp}>
          {submitted ? (
            <Card className="border-emerald-500/30 bg-emerald-500/10">
              <CardContent className="p-6">
                <p className="text-emerald-500 font-medium">
                  You&apos;re on the list! We&apos;ll be in touch soon.
                </p>
              </CardContent>
            </Card>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>
          )}
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-muted-foreground text-sm">
            © {currentYear} FitLens. All rights reserved.
          </div>
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-emerald-500">Fit</span>Lens
          </div>
        </div>
      </footer>
    </main>
  );
}