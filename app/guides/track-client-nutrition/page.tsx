import type { Metadata } from "next";
import Link from "next/link";
import { GuideLayout } from "@/components/guide-layout";
import { getGuide } from "@/lib/guides";

const guide = getGuide("track-client-nutrition");

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  alternates: { canonical: `/guides/${guide.slug}` },
  openGraph: {
    type: "article",
    url: `/guides/${guide.slug}`,
    title: guide.title,
    description: guide.description,
  },
};

export default function Page() {
  return (
    <GuideLayout guide={guide}>
      <p>
        Most personal trainers are confident about the training side of
        coaching. Programming, progressions and form checks happen in front of
        you. Nutrition happens everywhere else: at home, at work, in
        restaurants, late at night. That is why it is the part of coaching where
        clients most often stall, and the part trainers most often have to guess
        about.
      </p>
      <p>
        You do not need clients to weigh every gram to coach nutrition well. You
        need a simple, repeatable system that gives you{" "}
        <strong>enough information to make good decisions</strong> and takes as
        little effort as possible from the client. This guide walks through one.
      </p>

      <h2>1. Pick a tracking method your clients will actually use</h2>
      <p>
        The best tracking method is the one a client keeps doing after the first
        week. Precision matters far less than consistency, because a rough
        picture of every meal beats a perfect picture of three meals followed by
        silence.
      </p>
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Client effort</th>
            <th>What you see as the coach</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Written food diary or messages</td>
            <td>Low to start, easy to forget</td>
            <td>Descriptions only, no numbers, scattered across chats</td>
          </tr>
          <tr>
            <td>Calorie-counting app the client uses alone</td>
            <td>High: searching, weighing, scanning</td>
            <td>Usually screenshots, if the client remembers to send them</td>
          </tr>
          <tr>
            <td>Photo logging</td>
            <td>Lowest: one photo per meal</td>
            <td>What they actually ate, plus portion size and context</td>
          </tr>
          <tr>
            <td>Trainer-connected app</td>
            <td>Low, if logging is photo- or text-based</td>
            <td>Every client&apos;s meals and numbers in one dashboard</td>
          </tr>
        </tbody>
      </table>
      <p>
        For most coaching relationships, a low-effort method that the coach can
        see directly wins. There is a deeper comparison in{" "}
        <Link href="/guides/food-diary-vs-photo-logging">
          food diaries vs. photo logging
        </Link>
        .
      </p>

      <h2>2. Track a few numbers well, not everything badly</h2>
      <p>
        For most fat-loss, muscle-gain and general health goals, these are the
        signals worth watching:
      </p>
      <ul>
        <li>
          <strong>Calories against target.</strong> Look at the weekly average
          rather than single days. One big dinner is noise; a week that is
          consistently over target is a pattern.
        </li>
        <li>
          <strong>Protein.</strong> It is often the most useful single macro to
          coach, because it supports muscle retention, keeps clients fuller, and
          is easy to improve with small swaps.
        </li>
        <li>
          <strong>Logging consistency.</strong> How many days this week did the
          client log at all? A drop here usually shows up before results stall,
          so it is your early warning.
        </li>
        <li>
          <strong>Body-weight trend.</strong> Use a weekly average or trend line
          rather than reacting to daily fluctuations from water, salt and
          digestion.
        </li>
        <li>
          <strong>Hydration</strong>, if it matters for the client&apos;s goals
          or energy levels.
        </li>
      </ul>
      <p>
        Carbs and fat matter too, but for many clients they are easier to coach
        once calories and protein are under control. Start simple and add detail
        only when it changes what you would tell the client.
      </p>

      <h2>3. Set targets the client understands</h2>
      <p>
        A target is only useful if the client can act on it in the moment.
        &ldquo;Hit 140 g of protein&rdquo; is clear. &ldquo;Eat cleaner&rdquo;
        is not. When you set or update targets:
      </p>
      <ul>
        <li>
          Give a daily calorie range and a protein number, and explain why each
          one fits their goal.
        </li>
        <li>
          Translate numbers into food: what does 40 g of protein at lunch look
          like for this person?
        </li>
        <li>
          Change one thing at a time, so you can tell what actually worked.
        </li>
      </ul>
      <blockquote>
        Nutrition targets for clients with medical conditions, eating disorders
        or specific clinical needs belong with a doctor or registered dietitian.
        Stay within your scope of practice.
      </blockquote>

      <h2>4. Review on a schedule, and let the data tell you who needs you</h2>
      <p>
        Reading every meal from every client every day does not scale past a
        handful of clients. A better routine is a quick daily scan for red flags
        plus a deeper weekly review.
      </p>
      <h3>Daily (5 minutes)</h3>
      <ul>
        <li>Who has not logged anything for two days or more?</li>
        <li>
          Who has been well under or over their calorie target several days
          running?
        </li>
        <li>Who has missed their protein target most of the week?</li>
      </ul>
      <h3>Weekly (per client)</h3>
      <ul>
        <li>Average calories and protein against target</li>
        <li>Logging consistency: days logged out of seven</li>
        <li>Weight trend compared with last week</li>
        <li>One thing that went well and one thing to change next week</li>
      </ul>
      <p>
        The point of the daily scan is triage. Clients who are on track get a
        quick acknowledgement; your real time goes to the ones who are slipping,
        while it is still easy to help.
      </p>

      <h2>5. Give feedback that is specific and kind</h2>
      <p>
        Clients log more when they feel seen rather than judged. Good nutrition
        feedback tends to be:
      </p>
      <ul>
        <li>
          <strong>Specific:</strong> &ldquo;Your lunches this week averaged
          about 35 g of protein, great&rdquo; beats &ldquo;good job&rdquo;.
        </li>
        <li>
          <strong>Forward-looking:</strong> one concrete change for next week,
          not a list of everything that went wrong.
        </li>
        <li>
          <strong>Timely:</strong> a short note the same day lands better than a
          long review a week later.
        </li>
        <li>
          <strong>Positive by default:</strong> praise the habit of logging
          itself, especially on bad days. A logged bad day is far more useful to
          you than an unlogged one.
        </li>
      </ul>

      <h2>6. Remove friction wherever you can</h2>
      <p>
        Small changes make a big difference to how long clients keep tracking:
      </p>
      <ul>
        <li>
          Let them log with a photo or a one-line description instead of
          searching a database.
        </li>
        <li>
          Share ready-made meal ideas so they are not starting from a blank
          page.
        </li>
        <li>
          Keep everything in one place, so neither of you is digging through
          chats for screenshots.
        </li>
        <li>
          Make it social, with a small group of clients who can share meals and
          encourage each other.
        </li>
      </ul>

      <h2>Where FitLens fits</h2>
      <p>
        FitLens was built around this exact workflow. Clients log a meal by
        snapping a photo or typing a short description, and FitLens estimates
        the calories, protein, carbs and fat ingredient by ingredient. As a
        trainer you get a dashboard that shows every client&apos;s meals and
        adherence, plus a daily attention queue of clients who have stopped
        logging or are missing targets. You can share meal plans with any number
        of clients, review meals, and message clients directly.
      </p>
      <p>
        If you want to understand the limits of photo estimates before relying
        on them, read{" "}
        <Link href="/guides/ai-calorie-counter-accuracy">
          how accurate AI calorie counters are
        </Link>
        .
      </p>
    </GuideLayout>
  );
}
