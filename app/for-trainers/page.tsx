import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { PhoneFrame } from "@/components/screen-deck";

const path = "/for-trainers";
const title = "Nutrition Tracking App for Personal Trainers";
const description =
  "FitLens lets personal trainers see what clients actually eat. Clients snap a photo of each meal, AI estimates calories and macros, and you get a daily list of who needs you.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { url: path, title: `${title} | FitLens`, description },
};

const screens = [
  {
    src: "/screens/trainer-dashboard.webp",
    alt: "Trainer dashboard with a prioritised attention queue",
    caption: "Attention queue",
  },
  {
    src: "/screens/meal-result.webp",
    alt: "AI breakdown of a client's meal with calories, macros and ingredients",
    caption: "AI meal breakdown",
  },
  {
    src: "/screens/meal-plans.webp",
    alt: "Meal plans shared with several clients",
    caption: "Meal plans",
  },
];

export default function ForTrainersPage() {
  return (
    <PageShell
      path={path}
      title={title}
      description={description}
      crumbs={[{ name: "For trainers", path }]}
      eyebrow="For personal trainers"
      heading={
        <>
          Nutrition tracking for{" "}
          <em className="not-italic text-accent">personal trainers.</em>
        </>
      }
      intro={
        <p>
          FitLens shows you what your clients actually eat. Clients snap a photo
          of each meal or type a one-line description, FitLens estimates the
          calories, protein, carbs and fat, and every meal lands on your
          dashboard with a daily list of the clients who need you most.
        </p>
      }
    >
      <div className="not-prose grid grid-cols-3 gap-3 sm:gap-6">
        {screens.map((screen) => (
          <figure key={screen.src} className="m-0">
            <div className="aspect-[1320/2868]">
              <PhoneFrame screen={screen} />
            </div>
            <figcaption className="mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-ink/60">
              {screen.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <h2>The problem: you coach nutrition blind</h2>
      <p>
        Workouts happen in front of you. Meals happen everywhere else. Most
        trainers piece nutrition together from food diaries, screenshots of
        calorie apps and messages like &ldquo;ate pretty well this week&rdquo;.
        It&apos;s slow to review, easy for clients to stop doing, and you
        usually find out a client has drifted weeks after it started.
      </p>
      <p>
        FitLens fixes the two things that break nutrition coaching:{" "}
        <strong>clients stop logging</strong> because it&apos;s tedious, and{" "}
        <strong>trainers can&apos;t see the data</strong> without chasing it.
      </p>

      <h2>How it works</h2>
      <ol>
        <li>
          <strong>Clients log in seconds.</strong> A photo of the plate, a short
          text description, or both. No weighing, no database searches.
        </li>
        <li>
          <strong>AI breaks the meal down.</strong> FitLens estimates calories,
          protein, carbs and fat ingredient by ingredient, with a confidence
          score, so clients and coaches can see exactly what was counted.
        </li>
        <li>
          <strong>You see it on your dashboard.</strong> Every client&apos;s
          meals, targets and adherence in one place, plus a prioritised list of
          who needs attention today.
        </li>
      </ol>

      <h2>What you get as the trainer</h2>
      <ul>
        <li>
          <strong>Daily attention queue.</strong> Clients who have stopped
          logging, keep missing protein or are well over target rise to the top,
          so you spend your time where it matters.
        </li>
        <li>
          <strong>Client snapshots.</strong> 7-day adherence, weight trend,
          targets, notes and meals awaiting your review on one screen.
        </li>
        <li>
          <strong>Meal review.</strong> See each logged meal with its photo and
          breakdown, and mark it as verified.
        </li>
        <li>
          <strong>Meal plans, written once.</strong> Build a single meal or a
          full day with macros and share it with as many clients as you like.
        </li>
        <li>
          <strong>Targets per client.</strong> Set calorie and macro targets
          that FitLens tracks against every day.
        </li>
        <li>
          <strong>Your own squad and chat.</strong> A private group feed for
          your clients, plus direct messages. Report and block are built in.
        </li>
        <li>
          <strong>Easy onboarding.</strong> Clients join your roster with your
          trainer code.
        </li>
      </ul>

      <h2>What your clients get</h2>
      <ul>
        <li>The fastest way to log a meal: a photo or a sentence.</li>
        <li>
          A daily ring for calories, macros and water, so they always know where
          they stand.
        </li>
        <li>Meal plans from you, ready to follow.</li>
        <li>Weight tracking with trends, not just daily numbers.</li>
        <li>A squad that keeps them accountable, and a direct line to you.</li>
      </ul>
      <p>
        Clients always use FitLens for free. The easier logging is, the more of
        their week you actually see. For a coaching routine built around this,
        read{" "}
        <Link href="/guides/track-client-nutrition">
          how to track your clients&apos; nutrition
        </Link>
        .
      </p>

      <h2>Is FitLens right for you?</h2>
      <table>
        <thead>
          <tr>
            <th>FitLens is a good fit if…</th>
            <th>Consider another tool if…</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nutrition is a big part of how you coach</td>
            <td>You only need workout programming</td>
          </tr>
          <tr>
            <td>
              Your clients won&apos;t stick with weighing and searching foods
            </td>
            <td>
              Clients need gram-precise tracking for a medical or competition
              reason
            </td>
          </tr>
          <tr>
            <td>You want to see meals without chasing screenshots</td>
            <td>
              You want one platform that also runs payments and scheduling
            </td>
          </tr>
          <tr>
            <td>You coach in person, online, or both</td>
            <td>
              Your clients don&apos;t use iPhones (FitLens is iPhone-first)
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Already on an all-in-one platform? See how FitLens compares in{" "}
        <Link href="/compare/trainerize-alternative">
          FitLens vs. Trainerize for nutrition coaching
        </Link>
        .
      </p>

      <h2>A note on accuracy</h2>
      <p>
        Photo-based nutrition estimates are best at everyday plated meals and at
        showing trends over a week. They are less reliable for hidden oils,
        sauces and mixed dishes, which is why FitLens shows every ingredient it
        counted and lets clients add a short note. FitLens provides estimates
        for coaching and general wellness, not medical advice. More detail in{" "}
        <Link href="/guides/ai-calorie-counter-accuracy">
          how accurate AI calorie counters are
        </Link>
        .
      </p>

      <h2>Works however you coach</h2>
      <ul>
        <li>
          <strong>In-person trainers:</strong> see what clients ate between sessions, and open each session knowing
          whether last week&apos;s nutrition supported the training.
        </li>
        <li>
          <strong>Online coaches:</strong> replace weekly food-diary check-ins with a dashboard that updates as clients
          eat, and message clients the same day something slips.
        </li>
        <li>
          <strong>Hybrid coaches:</strong> keep one view of every client&apos;s nutrition, whether you see them weekly or
          monthly.
        </li>
      </ul>

      <h2>Get started in three steps</h2>
      <ol>
        <li>
          <strong>Join the pilot</strong> and set up your trainer profile in the FitLens app.
        </li>
        <li>
          <strong>Share your trainer code.</strong> Clients download FitLens, enter the code, and appear in your roster
          and your squad.
        </li>
        <li>
          <strong>Set targets and share a meal plan.</strong> Give each client a calorie and protein target, share a
          plan if you use one, and their meals start arriving on your dashboard.
        </li>
      </ol>

      <h2>Common questions</h2>
      <h3>Do my clients need to pay?</h3>
      <p>No. Clients always use FitLens for free.</p>
      <h3>Can clients log without a photo?</h3>
      <p>
        Yes. A short text description (&ldquo;two eggs, toast with butter, black coffee&rdquo;) works too, and adding a
        note to a photo improves the estimate.
      </p>
      <h3>Can I review or correct what the AI estimated?</h3>
      <p>
        Every meal shows the ingredients FitLens counted, so you and your client can see what was included. You can
        mark meals as verified from your dashboard.
      </p>
      <h3>Is my clients&apos; data private?</h3>
      <p>
        Client data is never sold or used for advertising, and clients can delete their account at any time. See the{" "}
        <Link href="/privacy-policy">privacy policy</Link>.
      </p>

      <h2>Pricing</h2>
      <p>
        FitLens is <strong>free for trainers during the pilot</strong>, and
        clients always use it for free. We&apos;ll share pricing with pilot
        trainers well before anything changes.
      </p>
    </PageShell>
  );
}
