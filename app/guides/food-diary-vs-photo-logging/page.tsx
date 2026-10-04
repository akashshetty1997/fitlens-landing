import type { Metadata } from "next";
import Link from "next/link";
import { GuideLayout } from "@/components/guide-layout";
import { getGuide } from "@/lib/guides";

const guide = getGuide("food-diary-vs-photo-logging");

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
        Every coach eventually has to decide how clients will record what they
        eat. The three most common options are a written food diary, a
        calorie-counting app, and photo logging. Each one trades client effort
        against detail and against how much work it creates for you. Here is how
        they compare.
      </p>

      <h2>The short version</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Written food diary</th>
            <th>Calorie-counting app</th>
            <th>Photo logging</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Client effort per meal</strong>
            </td>
            <td>Low</td>
            <td>High: search, weigh, scan</td>
            <td>Lowest: one photo</td>
          </tr>
          <tr>
            <td>
              <strong>Numbers (calories, macros)</strong>
            </td>
            <td>No</td>
            <td>Yes, detailed</td>
            <td>Yes, if the app estimates them</td>
          </tr>
          <tr>
            <td>
              <strong>Shows portions and context</strong>
            </td>
            <td>Rarely</td>
            <td>Only as entered</td>
            <td>Yes, you see the actual plate</td>
          </tr>
          <tr>
            <td>
              <strong>Coach visibility</strong>
            </td>
            <td>Whatever the client shares</td>
            <td>Usually screenshots</td>
            <td>Direct, if the app connects to the coach</td>
          </tr>
          <tr>
            <td>
              <strong>Typical drop-off</strong>
            </td>
            <td>Entries get vaguer over time</td>
            <td>Tedium after the first weeks</td>
            <td>Forgetting to take the photo</td>
          </tr>
        </tbody>
      </table>

      <h2>Written food diaries</h2>
      <p>
        A notebook, a notes app or a chat thread with the coach. The barrier to
        start is almost zero, which is why many coaches begin here.
      </p>
      <ul>
        <li>
          <strong>Good for:</strong> building awareness, spotting habits such as
          late-night snacking, and clients who dislike apps.
        </li>
        <li>
          <strong>Watch out for:</strong> vague entries (&ldquo;chicken and
          rice&rdquo;), no portion sizes, and no numbers to compare against
          targets. Entries also tend to arrive in batches, written from memory.
        </li>
      </ul>

      <h2>Calorie-counting apps</h2>
      <p>
        Database apps where the client searches each food, enters an amount and
        sometimes scans barcodes. They give the most detailed numbers, when they
        are used carefully.
      </p>
      <ul>
        <li>
          <strong>Good for:</strong> detail-oriented clients, specific goals
          such as contest prep, and packaged food with barcodes.
        </li>
        <li>
          <strong>Watch out for:</strong> the effort. Many clients start strong,
          then stop logging the meals that matter most: restaurants, busy days,
          the weekend. Database entries also vary in quality, and you usually
          only see what the client chooses to screenshot.
        </li>
      </ul>

      <h2>Photo logging</h2>
      <p>
        The client photographs each meal. Simple photo diaries only show you the
        picture; newer tools also estimate the calories and macros from it.
      </p>
      <ul>
        <li>
          <strong>Good for:</strong> busy clients, building a consistent habit,
          and coaches who want to see what was actually on the plate, not a
          description of it.
        </li>
        <li>
          <strong>Watch out for:</strong> hidden ingredients such as oils and
          sauces, and forgotten photos. A short text note alongside the photo
          fixes most accuracy issues. There is more on this in{" "}
          <Link href="/guides/ai-calorie-counter-accuracy">
            how accurate AI calorie counters are
          </Link>
          .
        </li>
      </ul>

      <h2>Which should you use?</h2>
      <p>
        Match the method to the client and the goal, not the other way round:
      </p>
      <ul>
        <li>
          <strong>New to tracking, or easily overwhelmed:</strong> photo
          logging, focusing on consistency first.
        </li>
        <li>
          <strong>Needs precise numbers for a short phase:</strong> a
          weighing-and-searching app, for a set period.
        </li>
        <li>
          <strong>Mainly working on habits and awareness:</strong> a food diary
          or photo log is enough.
        </li>
        <li>
          <strong>You coach many clients:</strong> choose a method where the
          results come to you automatically, so you are not chasing screenshots.
        </li>
      </ul>
      <p>
        Many coaches end up with a hybrid: photos for everyday meals, labels for
        packaged food, and a short note whenever something is not visible.
        Whatever you choose, the tracking only pays off if you review it and
        respond. See{" "}
        <Link href="/guides/track-client-nutrition">
          how to track your clients&apos; nutrition
        </Link>{" "}
        for a simple weekly routine.
      </p>

      <h2>Where FitLens fits</h2>
      <p>
        FitLens combines the low effort of photo logging with numbers you can
        coach from. Clients log with a photo or a one-line description, FitLens
        estimates calories, protein, carbs and fat, and every meal lands on your
        trainer dashboard, along with a daily list of clients who need
        attention.
      </p>
    </GuideLayout>
  );
}
