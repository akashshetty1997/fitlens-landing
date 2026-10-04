"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { PhoneFrame, type Screen } from "@/components/screen-deck";

/**
 * Phones stacked in the middle that fan out into an arc as the section
 * scrolls into view.
 */
export function FanSpread({ screens }: { screens: Screen[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  // 0 = stacked, 1 = fully fanned
  const spread = useTransform(
    scrollYProgress,
    [0, 1],
    [reduceMotion ? 1 : 0, 1],
  );

  const middle = (screens.length - 1) / 2;

  return (
    <div
      ref={ref}
      className="relative mx-auto h-[440px] w-full max-w-5xl sm:h-[660px]"
    >
      {screens.map((screen, i) => (
        <FanCard
          key={screen.src}
          screen={screen}
          offset={i - middle}
          spread={spread}
          count={screens.length}
        />
      ))}
    </div>
  );
}

function FanCard({
  screen,
  offset,
  spread,
  count,
}: {
  screen: Screen;
  offset: number;
  spread: MotionValue<number>;
  count: number;
}) {
  // Gap between card centres when fully fanned: 23% of the viewport, at most 210px
  const x = useTransform(
    spread,
    (s) => `calc(-50% + ${offset * s} * min(23vw, 210px))`,
  );
  const rotate = useTransform(spread, (s) => offset * s * 7);
  const y = useTransform(spread, (s) => Math.abs(offset) * s * 34);

  return (
    <motion.div
      className="absolute left-1/2 top-0 w-[44%] max-w-[250px] sm:w-[250px]"
      style={{
        x,
        rotate,
        y,
        zIndex: count - Math.abs(Math.round(offset * 2)),
        transformOrigin: "50% 120%",
      }}
    >
      <div className="aspect-[1320/2868]">
        <PhoneFrame screen={screen} />
      </div>
      <p className="mt-4 text-center text-[10px] uppercase tracking-[0.18em] text-ink/60">
        {screen.caption}
      </p>
    </motion.div>
  );
}
