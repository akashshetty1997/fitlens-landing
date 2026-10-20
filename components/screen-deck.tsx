"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion, type PanInfo } from "framer-motion";

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
// How far (px) or how fast (px/s) a drag must go to count as a swipe
const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 450;

/**
 * A stack of phone screenshots that shuffles: the front card flicks out to the
 * side and tucks in behind the others. Click or swipe to shuffle (swipe back
 * for the previous screen), arrow keys work too, hover to pause.
 */
export function ScreenDeck({
  screens,
  direction = "right",
  interval = 3200,
  className = "",
}: ScreenDeckProps) {
  const [order, setOrder] = useState(() => screens.map((_, i) => i));
  const [lastMove, setLastMove] = useState<"next" | "previous">("next");
  const [paused, setPaused] = useState(false);
  const dragged = useRef(false);
  const reduceMotion = useReducedMotion();
  const sign = direction === "right" ? 1 : -1;

  const next = () => {
    setLastMove("next");
    setOrder((prev) => [...prev.slice(1), prev[0]]);
  };
  const previous = () => {
    setLastMove("previous");
    setOrder((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
  };

  // Restart the countdown after every move, so a swipe never gets an instant auto-shuffle
  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = setTimeout(next, interval);
    return () => clearTimeout(timer);
  }, [order, paused, reduceMotion, interval]);

  // The front card flicks away from the fan side, so swiping that way means "next"
  const onDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    const toward = -sign * offset.x;
    const speed = -sign * velocity.x;
    if (toward > SWIPE_DISTANCE || speed > SWIPE_VELOCITY) next();
    else if (toward < -SWIPE_DISTANCE || speed < -SWIPE_VELOCITY) previous();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") next();
    else if (event.key === "ArrowLeft") previous();
    else return;
    event.preventDefault();
  };

  const front = screens[order[0]];

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => {
          // A drag ends with a click on the button; only real taps should shuffle
          if (dragged.current) {
            dragged.current = false;
            return;
          }
          next();
        }}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        aria-label={`Showing ${front.caption}. Show next screen`}
        className="relative mx-auto block aspect-[1320/2868] w-full max-w-[290px] cursor-grab active:cursor-grabbing outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-8 focus-visible:ring-offset-paper rounded-[2.75rem]"
      >
        {screens.map((screen, i) => {
          const position = order.indexOf(i);
          const visible = position < VISIBLE;
          const depth = Math.min(position, VISIBLE);
          const isLeaving = lastMove === "next" && position === screens.length - 1;
          const isFront = position === 0;

          return (
            <motion.div
              key={screen.src}
              className="absolute inset-0"
              style={{ zIndex: screens.length - position }}
              initial={false}
              drag={isFront ? "x" : false}
              dragSnapToOrigin
              dragElastic={0.9}
              dragConstraints={{ left: 0, right: 0 }}
              onDragStart={() => {
                dragged.current = true;
                setPaused(true);
              }}
              onDragEnd={(event, info) => {
                setPaused(false);
                onDragEnd(event, info);
                // Touch drags may not fire a click, so clear the flag once this gesture is done
                setTimeout(() => {
                  dragged.current = false;
                }, 0);
              }}
              animate={
                isLeaving && !reduceMotion
                  ? {
                      // flick out to the side (from wherever a swipe let go), then slide in behind the stack
                      x: [null, -sign * 260, sign * depth * 26],
                      rotate: [null, -sign * 14, sign * depth * 4],
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
