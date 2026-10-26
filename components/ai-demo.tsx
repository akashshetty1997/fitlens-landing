"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

// A real FitLens analysis of this description, replayed as a labelled
// example: the client types, FitLens analyses, the breakdown appears. Until
// the result shows, the numbers are placeholders (never a fake "0").
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
const TYPE_MS = 28;

type Phase = "typing" | "analysing" | "result";

export function AiDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [typed, setTyped] = useState(MEAL.length);
  const [phase, setPhase] = useState<Phase>("result");
  const [cycle, setCycle] = useState(0);

  // Start the animation only once it's on screen
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(motion.matches);
    sync();
    motion.addEventListener("change", sync);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "-80px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      motion.removeEventListener("change", sync);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || !inView) {
      setTyped(MEAL.length);
      setPhase("result");
      return;
    }
    setTyped(0);
    setPhase("typing");
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= MEAL.length; i++) {
      timers.push(setTimeout(() => setTyped(i), i * TYPE_MS));
    }
    const typedAt = MEAL.length * TYPE_MS;
    timers.push(setTimeout(() => setPhase("analysing"), typedAt + 300));
    timers.push(setTimeout(() => setPhase("result"), typedAt + 1500));
    timers.push(setTimeout(() => setCycle((c) => c + 1), typedAt + 9000));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduceMotion, cycle]);

  const done = phase === "result";

  return (
    <div ref={ref} className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
      {/* Input */}
      <div className="flex flex-col rounded-[var(--radius-card)] bg-card p-6 sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-ink">What did you eat?</p>
          <span className="rounded-full border border-line px-3 py-1 text-xs text-ink-2">
            Example
          </span>
        </div>
        <p className="mt-4 min-h-[7rem] text-lg leading-snug text-ink" aria-hidden>
          {MEAL.slice(0, typed)}
          {phase === "typing" && (
            <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 animate-pulse bg-accent" />
          )}
        </p>
        {/* Screen readers get the whole example at once, not the typing */}
        <p className="sr-only">Example meal description: {MEAL}</p>
        <div className="mt-auto pt-6">
          <span
            className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-500 ${
              phase === "typing" ? "bg-paper text-ink-2" : "bg-accent text-on-accent"
            }`}
            aria-hidden
          >
            <Sparkles className={`h-4 w-4 ${phase === "analysing" ? "animate-spin" : ""}`} />
            {phase === "analysing" ? "Analysing…" : done ? "Analysed" : "Analyse meal"}
          </span>
        </div>
      </div>

      {/* Result */}
      <div className="rounded-[var(--radius-card)] bg-card p-6 sm:p-8" aria-live="off">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm font-semibold text-ink">AI breakdown</p>
          <p className={`text-sm text-ink-2 transition-opacity duration-500 ${done ? "opacity-100" : "opacity-0"}`}>
            85% confidence
          </p>
        </div>

        <div className="mt-3 flex h-[60px] items-baseline gap-2">
          {done ? (
            <>
              <span className="text-6xl font-bold tracking-tight text-ink tabular-nums">{CALORIES}</span>
              <span className="text-ink-2">kcal</span>
            </>
          ) : (
            <span className="mt-2 h-12 w-36 animate-pulse rounded-xl bg-line" aria-hidden />
          )}
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-4">
          {MACROS.map((macro, i) => (
            <div key={macro.label}>
              <dt className="text-sm text-ink-2">{macro.label}</dt>
              <dd className="m-0 h-6 text-base font-semibold text-ink tabular-nums">
                {done ? `${macro.grams} g` : <span className="mt-1 inline-block h-4 w-10 animate-pulse rounded bg-line" aria-hidden />}
              </dd>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden>
                <div
                  className="h-full rounded-full transition-[width] duration-700 ease-out"
                  style={{
                    width: done ? `${Math.min(100, (macro.grams / MACRO_SCALE) * 100)}%` : "0%",
                    background: macro.color,
                    transitionDelay: done ? `${150 + i * 100}ms` : "0ms",
                  }}
                />
              </div>
            </div>
          ))}
        </dl>

        <ul className="mt-6 divide-y divide-line border-t border-line">
          {INGREDIENTS.map(([name, kcal], i) => (
            <li
              key={name}
              className="flex justify-between py-2.5 text-sm transition-opacity duration-500"
              style={{ opacity: done ? 1 : 0, transitionDelay: done ? `${300 + i * 70}ms` : "0ms" }}
            >
              <span className="text-ink">{name}</span>
              <span className="tabular-nums text-ink-2">{kcal} kcal</span>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs leading-5 text-ink-2">
          A real FitLens analysis, replayed as an example. Nutrition values are
          AI estimates to support coaching, not medical advice.
        </p>
      </div>
    </div>
  );
}
