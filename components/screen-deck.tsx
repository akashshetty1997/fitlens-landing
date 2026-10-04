"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type Screen = {
  src: string;
  alt: string;
  caption: string;
};

type ScreenDeckProps = {
  screens: Screen[];
  /** Fan the stack to the right or left */
  direction?: "right" | "left";
  /** Milliseconds between shuffles */
  interval?: number;
  className?: string;
};

// Only the first few cards are visible; the rest wait behind the stack
const VISIBLE = 3;

/**
 * A stack of phone screenshots that shuffles: the front card flicks out to the
 * side and tucks in behind the others. Click to shuffle, hover to pause.
 */
export function ScreenDeck({
  screens,
  direction = "right",
  interval = 3200,
  className = "",
}: ScreenDeckProps) {
  const [order, setOrder] = useState(() => screens.map((_, i) => i));
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const sign = direction === "right" ? 1 : -1;

  const shuffle = () => setOrder((prev) => [...prev.slice(1), prev[0]]);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = setInterval(shuffle, interval);
    return () => clearInterval(timer);
  }, [paused, reduceMotion, interval]);

  const front = screens[order[0]];

  return (
    <div className={className}>
      <button
        type="button"
        onClick={shuffle}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        aria-label={`Showing ${front.caption}. Show next screen`}
        className="relative mx-auto block aspect-[1320/2868] w-full max-w-[290px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-8 focus-visible:ring-offset-paper rounded-[2.75rem]"
      >
        {screens.map((screen, i) => {
          const position = order.indexOf(i);
          const visible = position < VISIBLE;
          const depth = Math.min(position, VISIBLE);
          const isLeaving = position === screens.length - 1;

          return (
            <motion.div
              key={screen.src}
              className="absolute inset-0"
              style={{ zIndex: screens.length - position }}
              initial={false}
              animate={
                isLeaving && !reduceMotion
                  ? {
                      // flick out to the side, then slide in behind the stack
                      x: [0, -sign * 260, sign * depth * 26],
                      rotate: [0, -sign * 14, sign * depth * 4],
                      scale: [1, 0.96, 1 - depth * 0.06],
                      opacity: [1, 1, 0],
                    }
                  : {
                      x: sign * depth * 26,
                      rotate: sign * depth * 4,
                      scale: 1 - depth * 0.06,
                      opacity: visible ? 1 - depth * 0.18 : 0,
                    }
              }
              transition={{
                duration: isLeaving ? 0.75 : 0.55,
                ease: [0.22, 1, 0.36, 1],
                times: isLeaving ? [0, 0.45, 1] : undefined,
              }}
            >
              <PhoneFrame screen={screen} priority={position === 0} />
            </motion.div>
          );
        })}
      </button>

      <div className="mt-8 flex items-center justify-center gap-3">
        <span className="text-[11px] uppercase tracking-[0.18em] text-ink/60">
          {front.caption}
        </span>
        <span className="flex gap-1.5" aria-hidden>
          {screens.map((screen, i) => (
            <span
              key={screen.src}
              className={`h-1.5 transition-all duration-500 ${
                order[0] === i ? "w-5 bg-accent" : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

export function PhoneFrame({
  screen,
  priority = false,
}: {
  screen: Screen;
  priority?: boolean;
}) {
  return (
    <div className="h-full w-full rounded-[2.75rem] bg-[#1c1c1f] p-[7px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.09)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={screen.src}
        alt={screen.alt}
        width={720}
        height={1564}
        loading={priority ? "eager" : "lazy"}
        draggable={false}
        className="h-full w-full select-none rounded-[2.35rem] object-cover"
      />
    </div>
  );
}
