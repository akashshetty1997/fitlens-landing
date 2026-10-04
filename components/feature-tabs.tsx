"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PhoneFrame, type Screen } from "@/components/screen-deck";

export type FeatureTab = {
  title: string;
  body: string;
  screen: Screen;
};

/**
 * A list of features beside one phone. Picking a feature (click, hover or
 * keyboard) shows its screen; it also steps through them on its own.
 */
export function FeatureTabs({
  features,
  header,
  interval = 4200,
}: {
  features: FeatureTab[];
  header?: React.ReactNode;
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = setInterval(
      () => setActive((i) => (i + 1) % features.length),
      interval,
    );
    return () => clearInterval(timer);
  }, [paused, reduceMotion, interval, features.length]);

  return (
    <div
      className="grid items-center gap-12 lg:grid-cols-[1fr_290px] lg:gap-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div>
        {header}
        <div
          role="tablist"
          aria-label="Trainer features"
          className={`flex flex-col gap-2 ${header ? "mt-12" : ""}`}
        >
          {features.map((feature, i) => {
            const selected = i === active;
            return (
              <button
                key={feature.title}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`relative overflow-hidden border px-5 py-4 text-left transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  selected
                    ? "border-line bg-card"
                    : "border-transparent hover:bg-card/60"
                }`}
              >
                <span className="flex items-baseline gap-4">
                  <span
                    className={`text-xs tabular-nums transition-colors ${selected ? "text-accent" : "text-ink/30"}`}
                  >
                    0{i + 1}
                  </span>
                  <span>
                    <span
                      className={`block text-sm font-semibold uppercase tracking-[0.1em] transition-colors ${selected ? "text-ink" : "text-ink/55"}`}
                    >
                      {feature.title}
                    </span>
                    <AnimatePresence initial={false}>
                      {selected && (
                        <motion.span
                          className="block overflow-hidden text-ink/60"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <span className="block pt-2 text-[13px] leading-relaxed">
                            {feature.body}
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </span>
                {/* progress bar for the auto-advance */}
                {selected && !paused && !reduceMotion && (
                  <motion.span
                    key={`progress-${active}`}
                    className="absolute bottom-0 left-0 h-[2px] bg-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: interval / 1000, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="relative mx-auto aspect-[1320/2868] w-full max-w-[290px]"
        role="tabpanel"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={features[active].screen.src}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <PhoneFrame screen={features[active].screen} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
