import { Sparkles } from "lucide-react";

// A real FitLens analysis of this description, shown as a labelled example
// (not live output). Macro colours are the app's nutrition colours.
const MEAL =
  "Grilled chicken salad with mixed greens, cherry tomatoes, cucumber, avocado and olive oil";
const CALORIES = 381;
const MACROS = [
  { label: "Protein", grams: 34, color: "var(--protein)" },
  { label: "Carbs", grams: 11, color: "var(--carbs)" },
  { label: "Fat", grams: 23, color: "var(--fat)" },
];
const INGREDIENTS = [
  ["Grilled chicken breast", 165],
  ["Olive oil dressing", 119],
  ["Avocado", 60],
  ["Cherry tomatoes", 15],
  ["Mixed greens", 14],
  ["Cucumber", 8],
] as const;
const MACRO_SCALE = 50; // grams for a full bar

export function MealExample() {
  return (
    <figure className="m-0 rounded-[var(--radius-card)] bg-card p-6 sm:p-8">
      <figcaption className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
          <Sparkles className="h-4 w-4 text-accent" aria-hidden />
          Example analysis
        </span>
        <span className="rounded-full border border-line px-3 py-1 text-xs text-ink-2">
          Sample from the app
        </span>
      </figcaption>

      <div className="mt-6 grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm text-ink-2">What the client typed</p>
          <p className="mt-2 text-lg leading-snug text-ink">&ldquo;{MEAL}&rdquo;</p>
        </div>

        <div>
          <p className="text-sm text-ink-2">What FitLens estimated</p>
          <p className="mt-1 flex items-baseline gap-1.5">
            <span className="text-5xl font-bold tracking-tight text-ink tabular-nums">
              {CALORIES}
            </span>
            <span className="text-ink-2">kcal</span>
          </p>

          <dl className="mt-5 grid grid-cols-3 gap-4">
            {MACROS.map((macro) => (
              <div key={macro.label}>
                <dt className="text-sm text-ink-2">{macro.label}</dt>
                <dd className="m-0 text-base font-semibold text-ink tabular-nums">
                  {macro.grams} g
                </dd>
                <div className="mt-2 h-1.5 rounded-full bg-line" aria-hidden>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(100, (macro.grams / MACRO_SCALE) * 100)}%`,
                      background: macro.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </dl>

          <ul className="mt-6 divide-y divide-line border-t border-line">
            {INGREDIENTS.map(([name, kcal]) => (
              <li key={name} className="flex justify-between py-2.5 text-sm">
                <span className="text-ink">{name}</span>
                <span className="tabular-nums text-ink-2">{kcal} kcal</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 text-xs leading-5 text-ink-2">
        Shown as an example. Nutrition values are AI estimates to support
        coaching, not medical advice; clients and trainers can check every
        ingredient.
      </p>
    </figure>
  );
}
