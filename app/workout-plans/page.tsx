import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { Phone } from "@/components/phone";
import { SITE_URL } from "@/lib/site";

const path = "/workout-plans";
const title = "Workout Plan App for Personal Trainers";
const description =
  "Build workout plans from 650+ exercises, share them with clients and see every set they log. FitLens puts training and nutrition coaching in one app.";
const updated = "2026-10-26";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { url: path, title: `${title} | FitLens`, description },
};

const screens = [
  {
    src: "/screens/workout-builder.webp",
    alt: "Workout plan builder with sets, reps, weight and a demo video on each exercise",
    caption: "Plan builder",
  },
  {
    src: "/screens/workout-player.webp",
    alt: "Client workout player showing the exercise, weight, reps and a tick for every set",
    caption: "Client workout",
  },
  {
    src: "/screens/workout-today.webp",
    alt: "Client home screen with today's workout, tasks from the coach and logged meals",
    caption: "Today's workout",
  },
];

const faqs = [
  {
    q: "Can I add my own exercises?",
    a: "Yes. If an exercise isn't in the library of more than 650, add it with your own name, instructions and photo. Your custom exercises are only visible to you and your clients.",
  },
  {
    q: "Can I record a demo video for an exercise?",
    a: "Yes. Record a short demo or choose one from your phone, or paste a YouTube or Vimeo link. Your client sees a Coach's demo button on that exercise during the workout.",
  },
  {
    q: "What happens when I edit a plan a client is already following?",
    a: "Your changes apply from the client's next workout. Workouts they have already logged keep the targets they were done against, so their history stays accurate.",
  },
  {
    q: "Can clients log weights and reps without signal in the gym?",
    a: "Yes. Every set is saved on the phone first and sent when the connection is back, so a dead spot in the gym never loses a set.",
  },
  {
    q: "Do clients have to pay for workouts?",
    a: "No. Clients always use FitLens for free, including workout plans. Trainers coaching up to 10 clients are free too.",
  },
];

export default function WorkoutPlansPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path}#faq`,
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <PageShell
      path={path}
      title={title}
      description={description}
      crumbs={[{ name: "Workout plans", path }]}
      eyebrow="Workout plans for personal trainers"
      updated={updated}
      heading={
        <>
          Workout plans your clients{" "}
          <em className="not-italic text-accent-text">actually follow.</em>
        </>
      }
      intro={
        <p>
          FitLens is a workout plan app for personal trainers. Build a plan from
          more than 650 exercises, share it with any client, and they follow it
          one set at a time on their phone. Every set they log, with the weight,
          reps and time, lands in FitLens next to their meals, so you coach
          training and nutrition from one place.
        </p>
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="not-prose grid grid-cols-3 gap-3 sm:gap-6">
        {screens.map((screen) => (
          <figure key={screen.src} className="m-0">
            <div className="aspect-[1320/2868]">
              <Phone screen={screen} />
            </div>
            <figcaption className="mt-3 text-center text-sm text-ink-2">
              {screen.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <h2>Build a workout plan in minutes</h2>
      <ul>
        <li>
          <strong>Weekly or rotation.</strong> Fix training to weekdays (Monday,
          Wednesday, Friday) or run a rotation (Day 1, Day 2, Day 3) that moves
          on whenever the client trains.
        </li>
        <li>
          <strong>650+ exercises.</strong> Search by name, muscle or equipment,
          each with start and end illustrations and step-by-step instructions.
          Add your own exercises when you need something specific.
        </li>
        <li>
          <strong>Targets on every exercise.</strong> Sets, reps or a timed hold,
          weight and rest, typed straight onto the exercise, plus a coaching
          note.
        </li>
        <li>
          <strong>Your own demo videos.</strong> Record a quick demo, choose one
          from your phone, or paste a YouTube or Vimeo link.
        </li>
        <li>
          <strong>Start from a template.</strong> Beginner Full Body, Push / Pull
          / Legs and Upper / Lower are ready to copy and adjust, or duplicate any
          plan you have already written.
        </li>
      </ul>

      <h2>What your clients see</h2>
      <ul>
        <li>Today&apos;s workout on their home screen, with one tap to start.</li>
        <li>
          One set at a time: the weight and reps to do, what they lifted last
          time, and a tick for every set.
        </li>
        <li>A rest countdown between sets, and a timer for holds like planks.</li>
        <li>
          A swap for a similar exercise when the machine is taken, and your demo
          video one tap away.
        </li>
        <li>A summary at the end with time, sets and time on each exercise.</li>
      </ul>

      <h2>See every session, set by set</h2>
      <p>
        Each finished workout shows what your client did against the targets you
        set: the weight and reps for every set, any exercise they swapped, and
        how long each exercise took. You get a notification when a client
        finishes a workout, and workout analytics show who is training
        consistently and how their strength is moving, so you know who to
        congratulate and who to check in with.
      </p>

      <h2>Training and nutrition in one app</h2>
      <p>
        Most trainers run workouts in one app and food diaries in another, or in
        WhatsApp. FitLens keeps both together: clients log meals with a photo
        and follow your workouts in the same app, and you see both on one
        client screen. Shared tasks tie it together, for example &ldquo;film
        your last set&rdquo; linked to a workout day. Read more about{" "}
        <Link href="/for-trainers">nutrition tracking for personal trainers</Link>{" "}
        or{" "}
        <Link href="/guides/track-client-nutrition">
          how to track your clients&apos; nutrition
        </Link>
        .
      </p>

      <h2>Common questions</h2>
      {faqs.map(({ q, a }) => (
        <div key={q}>
          <h3>{q}</h3>
          <p>{a}</p>
        </div>
      ))}

      <h2>Pricing</h2>
      <p>
        Workout plans are included in FitLens at no extra cost. FitLens is{" "}
        <strong>free for trainers coaching up to 10 clients</strong>, and
        clients always use it for free.
      </p>
      <p className="text-sm text-ink-2">
        Exercise data by{" "}
        <a href="https://repdb.co" target="_blank" rel="noopener noreferrer">
          RepDB
        </a>
        .
      </p>
    </PageShell>
  );
}
