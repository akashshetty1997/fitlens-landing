"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

// A real analysis from the app, so the demo shows exactly what users get
const MEAL =
  "Grilled chicken salad with mixed greens, cherry tomatoes, cucumber, avocado and olive oil";
const CALORIES = 381;
const MACROS = [
  { label: "Protein", grams: 34, max: 50, color: "#F97316" },
  { label: "Carbs", grams: 11, max: 50, color: "#10B981" },
  { label: "Fat", grams: 23, max: 50, color: "#3B82F6" },
];
const INGREDIENTS = [
  ["Grilled chicken breast", 165],
  ["Olive oil dressing", 119],
  ["Avocado", 60],
  ["Cherry tomatoes", 15],
  ["Mixed greens", 14],
  ["Cucumber", 8],
] as const;

type Phase = "typing" | "thinking" | "result";

/**
 * Types a meal description, "thinks", then reveals the AI breakdown.
 * Plays when scrolled into view and loops while visible.
 */
export function AiDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(reduceMotion ? MEAL.length : 0);
  const [phase, setPhase] = useState<Phase>(reduceMotion ? "result" : "typing");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setTyped(MEAL.length);
      setPhase("result");
      return;
    }
    if (!inView) return;

    setTyped(0);
    setPhase("typing");
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= MEAL.length; i++) {
      timers.push(setTimeout(() => setTyped(i), i * 28));
    }
    const typedAt = MEAL.length * 28;
    timers.push(setTimeout(() => setPhase("thinking"), typedAt + 300));
    timers.push(setTimeout(() => setPhase("result"), typedAt + 1500));
    timers.push(setTimeout(() => setCycle((c) => c + 1), typedAt + 9000));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduceMotion, cycle]);

  const showResult = phase === "result";

  return (
    <div ref={ref} className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      {/* Input */}
      <div className="flex flex-col border border-line bg-card p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40">
          What did you eat?
        </p>
        <p className="mt-4 min-h-[6.5rem] text-lg leading-snug">
          {MEAL.slice(0, typed)}
          {phase === "typing" && (
            <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 animate-pulse bg-accent" />
          )}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-6 text-sm">
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors duration-500 ${
              phase === "typing"
                ? "bg-ink/[0.06] text-ink/50"
                : "bg-accent text-paper"
            }`}
          >
            <Sparkles
              className={`h-4 w-4 ${phase === "thinking" ? "animate-spin" : ""}`}
            />
            {phase === "thinking"
              ? "Analysing…"
              : showResult
                ? "Analysed"
                : "Analyse meal"}
          </span>
        </div>
      </div>

      {/* Result */}
      <div className="border border-line bg-card p-6">
        <div className="flex items-baseline justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-ink/40">
            AI breakdown
          </p>
          <p
            className={`text-xs text-ink/40 transition-opacity duration-500 ${showResult ? "opacity-100" : "opacity-0"}`}
          >
            85% confidence
          </p>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <Counter
            value={showResult ? CALORIES : 0}
            className="font-display text-6xl tabular-nums"
          />
          <span className="text-ink/50">kcal</span>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {MACROS.map((macro, i) => (
            <div key={macro.label}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-ink/60">{macro.label}</span>
                <span className="tabular-nums">
                  {showResult ? macro.grams : 0}g
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: macro.color }}
                  initial={false}
                  animate={{
                    width: showResult
                      ? `${(macro.grams / macro.max) * 100}%`
                      : "0%",
                  }}
                  transition={{
                    duration: 0.9,
                    delay: showResult ? 0.15 + i * 0.1 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <ul className="mt-6 divide-y divide-ink/[0.07] border-t border-ink/[0.07]">
          {INGREDIENTS.map(([name, kcal], i) => (
            <motion.li
              key={name}
              className="flex justify-between py-2.5 text-sm"
              initial={false}
              animate={{
                opacity: showResult ? 1 : 0.15,
                x: showResult ? 0 : -8,
              }}
              transition={{
                duration: 0.4,
                delay: showResult ? 0.35 + i * 0.08 : 0,
              }}
            >
              <span className="text-ink/80">{name}</span>
              <span className="tabular-nums text-ink/50">{kcal} kcal</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Counter({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const previous = useRef(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const controls = animate(previous.current, value, {
      duration: value > previous.current ? 1.1 : 0.3,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = String(Math.round(v));
      },
    });
    previous.current = value;
    return () => controls.stop();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
