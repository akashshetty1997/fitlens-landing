import type { Metadata } from "next";
import Link from "next/link";
import { GuideLayout } from "@/components/guide-layout";
import { getGuide } from "@/lib/guides";

const guide = getGuide("ai-calorie-counter-accuracy");

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
        Snapping a photo of your plate and getting calories and macros back
        feels almost too easy. So the obvious question is:{" "}
        <strong>can you trust the numbers?</strong> The honest answer is that
        photo-based estimates are useful and consistent for most everyday meals,
        less reliable for a few specific kinds of food, and best used to track
        trends rather than to count every last calorie.
      </p>

      <h2>How photo calorie estimation works</h2>
      <p>An AI calorie counter has to solve three problems, in order:</p>
      <ol>
        <li>
          <strong>Identify the foods</strong> on the plate: grilled chicken,
          mixed greens, cherry tomatoes, avocado.
        </li>
        <li>
          <strong>Estimate how much of each</strong> there is, from visual cues
          like plate size, depth and how much of the plate each food covers.
        </li>
        <li>
          <strong>Convert those amounts into nutrition</strong> using typical
          values for each food: calories, protein, carbohydrate and fat.
        </li>
      </ol>
      <p>
        Errors can creep in at each step, and portion size (step 2) is usually
        the hardest part. A photo shows the top of a bowl, not how deep it is,
        and it cannot weigh anything.
      </p>

      <h2>Where photo estimates work well</h2>
      <ul>
        <li>
          <strong>Plated meals with visible, separate foods</strong>, such as a
          protein, a carb and vegetables side by side.
        </li>
        <li>
          <strong>Common whole foods</strong>: eggs, fruit, rice, chicken, fish,
          bread, salads.
        </li>
        <li>
          <strong>Standard portions</strong>: a sandwich, a bowl of oats, a
          typical restaurant main.
        </li>
        <li>
          <strong>Spotting patterns over time.</strong> Even when a single
          estimate is a little off, it tends to be off in a consistent way, so
          the weekly picture is still meaningful.
        </li>
      </ul>

      <h2>Where they struggle</h2>
      <ul>
        <li>
          <strong>Hidden fats.</strong> Cooking oil, butter and dressings add a
          lot of calories and are often invisible. This is the single most
          common source of underestimates.
        </li>
        <li>
          <strong>Sauces and mixed dishes</strong> such as curries, stews,
          casseroles and pasta bakes, where ingredients are blended together.
        </li>
        <li>
          <strong>Portion depth.</strong> A deep bowl and a shallow plate can
          look the same from above.
        </li>
        <li>
          <strong>Drinks</strong>, especially lattes, smoothies, juices and
          alcohol, whose contents you cannot see.
        </li>
        <li>
          <strong>Packaged foods</strong>, where the label is already the most
          accurate source.
        </li>
      </ul>

      <h2>Why consistency beats precision for coaching</h2>
      <p>
        Weighing and searching every ingredient is the most precise way to
        track, and also the fastest way for most people to stop tracking
        altogether. For coaching, the more important question is usually
        directional: is this client eating roughly what they need, most days,
        and are they getting enough protein?
      </p>
      <p>
        A method that a client uses for every meal, every day, with estimates
        that are a bit off, gives a coach far more to work with than a precise
        method used for a few days. Watch weekly averages and trends, and check
        them against what really matters: body-weight trend, performance, energy
        and how the client feels.
      </p>

      <h2>Simple habits that make estimates much better</h2>
      <ol>
        <li>
          <strong>Add a few words.</strong> &ldquo;Cooked in 1 tbsp olive
          oil&rdquo; or &ldquo;large bowl&rdquo; gives the AI exactly the
          information a photo cannot show.
        </li>
        <li>
          <strong>Shoot from above, with the whole plate in frame</strong>, in
          decent light, before you start eating.
        </li>
        <li>
          <strong>Mention sauces and dressings</strong>, even if they are on the
          side.
        </li>
        <li>
          <strong>Check the ingredient list</strong> the app returns and correct
          anything it got wrong.
        </li>
        <li>
          <strong>Use the label for packaged food</strong> and the photo for
          everything else.
        </li>
        <li>
          <strong>Log drinks too</strong>, because they are easy to forget and
          can add up quickly.
        </li>
      </ol>

      <h2>How FitLens approaches accuracy</h2>
      <p>
        FitLens lets clients log with a photo, a short text description, or
        both. Instead of returning a single number, it breaks each meal down{" "}
        <strong>ingredient by ingredient</strong>, so you can see exactly what
        it counted and spot anything missing. Each analysis also comes with a{" "}
        <strong>confidence score</strong>, and trainers can review and verify
        meals from their dashboard.
      </p>
      <blockquote>
        Like every photo-based tool, FitLens provides estimates for coaching and
        general wellness. They are not medical advice. If you need precise
        intake for a medical condition, work with a doctor or registered
        dietitian.
      </blockquote>
      <p>
        Building a coaching routine around these estimates? See{" "}
        <Link href="/guides/track-client-nutrition">
          how to track your clients&apos; nutrition
        </Link>
        .
      </p>
    </GuideLayout>
  );
}
