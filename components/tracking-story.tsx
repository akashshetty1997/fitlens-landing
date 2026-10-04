"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const ORANGE = "#F97316";
const GREEN = "#10B981";
const BLUE = "#3B82F6";
const SKIN = "#F2C6A0";

type Phase =
  | "idle"
  | "point"
  | "snap"
  | "analysing"
  | "result"
  | "logged"
  | "tracked"
  // trainer side
  | "notify"
  | "review"
  | "verified"
  | "message";

const TRAINER_PHASES: Phase[] = ["notify", "review", "verified", "message"];

// When each phase starts (ms) in one loop of the story
const TIMELINE: [Phase, number][] = [
  ["idle", 0],
  ["point", 800],
  ["snap", 2000],
  ["analysing", 2500],
  ["result", 3700],
  ["logged", 5900],
  ["tracked", 6700],
  ["notify", 9200],
  ["review", 10600],
  ["verified", 12600],
  ["message", 13500],
];
const LOOP_MS = 17200;

const STEPS = [
  {
    who: "Client",
    label: "Point",
    body: "Curious what's on the plate",
    phases: ["idle", "point"],
  },
  {
    who: "Client",
    label: "Snap",
    body: "One photo, no scales",
    phases: ["snap"],
  },
  {
    who: "Client",
    label: "Analyse",
    body: "Calories and macros in seconds",
    phases: ["analysing", "result"],
  },
  {
    who: "Client",
    label: "Track",
    body: "Logged to today's totals",
    phases: ["logged", "tracked"],
  },
  {
    who: "Trainer",
    label: "Review",
    body: "The meal lands with the coach",
    phases: ["notify", "review"],
  },
  {
    who: "Trainer",
    label: "Coach",
    body: "Verify it and send a nudge",
    phases: ["verified", "message"],
  },
];

/**
 * A little story: a client points their phone at a salad, snaps it, sees the
 * nutrition and logs it; then their trainer reviews the meal and sends a note.
 * Loops while on screen.
 */
export function TrackingStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-120px" });
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduceMotion ? "message" : "idle");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setPhase("message");
      return;
    }
    if (!inView) return;
    const timers = TIMELINE.map(([p, at]) => setTimeout(() => setPhase(p), at));
    timers.push(setTimeout(() => setCycle((c) => c + 1), LOOP_MS));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduceMotion, cycle]);

  const activeStep = STEPS.findIndex((s) => s.phases.includes(phase));

  return (
    <div ref={ref}>
      <div className="grid items-center gap-8 border border-line bg-card p-4 sm:p-8 lg:grid-cols-[1.35fr_0.65fr]">
        <SceneSwitcher phase={phase} />
        <div className="mx-auto w-full max-w-[250px]">
          <BigPhone phase={phase} />
        </div>
      </div>

      <ol className="grid grid-cols-2 gap-px border border-t-0 border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
        {STEPS.map((step, i) => {
          const active = i === activeStep;
          const done = i < activeStep;
          return (
            <li key={step.label} className="relative bg-paper p-5">
              <p
                className={`text-xs tabular-nums transition-colors duration-300 ${active ? "text-accent" : done ? "text-ink/50" : "text-ink/25"}`}
              >
                0{i + 1}
                <span className="ml-2 text-[10px] uppercase tracking-[0.15em]">
                  {step.who}
                </span>
              </p>
              <p
                className={`mt-2 text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${active ? "text-ink" : "text-ink/40"}`}
              >
                {step.label}
              </p>
              <p
                className={`mt-1 text-[12px] transition-colors duration-300 ${active ? "text-ink/60" : "text-ink/25"}`}
              >
                {step.body}
              </p>
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] bg-accent"
                initial={false}
                animate={{ width: active || done ? "100%" : "0%" }}
                transition={{ duration: active ? 0.6 : 0.3 }}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ---------------- illustrated scenes ---------------- */

function SceneSwitcher({ phase }: { phase: Phase }) {
  const trainer = TRAINER_PHASES.includes(phase);
  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={trainer ? "trainer-label" : "client-label"}
          className="absolute left-0 top-0 z-10 border border-line bg-paper px-2.5 py-1 text-[10px] uppercase tracking-[0.18em]"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          <span style={{ color: trainer ? GREEN : ORANGE }}>●</span>{" "}
          {trainer ? "Trainer · Coach Alex" : "Client · Sam"}
        </motion.p>
      </AnimatePresence>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={trainer ? "trainer" : "client"}
          initial={{ opacity: 0, x: trainer ? 60 : -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: trainer ? -60 : 60 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {trainer ? <TrainerScene phase={phase} /> : <Scene phase={phase} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Scene({ phase }: { phase: Phase }) {
  const raised = phase !== "idle";
  const lookingAtPhone =
    phase === "analysing" ||
    phase === "result" ||
    phase === "logged" ||
    phase === "tracked";
  const armAngle = !raised ? 16 : lookingAtPhone ? -58 : -76;
  const bubble =
    phase === "idle" || phase === "point"
      ? "?"
      : phase === "tracked"
        ? "check"
        : phase === "result"
          ? "kcal"
          : null;

  return (
    <svg
      viewBox="0 0 420 300"
      className="w-full"
      role="img"
      aria-label="A person photographs a salad with their phone, sees the calories and macros, and logs the meal"
    >
      {/* floor */}
      <line
        x1="16"
        y1="276"
        x2="404"
        y2="276"
        stroke="#27272A"
        strokeWidth="2"
      />

      {/* table */}
      <rect x="252" y="198" width="150" height="9" rx="3" fill="#3F3F46" />
      <rect x="266" y="207" width="7" height="69" rx="2" fill="#3F3F46" />
      <rect x="381" y="207" width="7" height="69" rx="2" fill="#3F3F46" />

      {/* plate + salad */}
      <Plate x={327} y={192} scale={1} />

      {/* camera flash */}
      <AnimatePresence>
        {phase === "snap" && (
          <motion.polygon
            points="222,166 292,180 372,198 292,200"
            fill="#FAFAFA"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.55, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* person */}
      <g>
        {/* legs + shoes */}
        <rect x="132" y="214" width="14" height="60" rx="7" fill="#3F3F46" />
        <rect x="153" y="214" width="14" height="60" rx="7" fill="#3F3F46" />
        <ellipse cx="143" cy="274" rx="11" ry="4" fill="#FAFAFA" />
        <ellipse cx="164" cy="274" rx="11" ry="4" fill="#FAFAFA" />

        {/* back arm */}
        <rect
          x="124"
          y="150"
          width="12"
          height="58"
          rx="6"
          fill="#C2410C"
          transform="rotate(8 130 152)"
        />

        {/* torso (hoodie) */}
        <rect x="122" y="138" width="56" height="86" rx="24" fill={ORANGE} />
        <path
          d="M140 140 Q150 156 160 140"
          stroke="#C2410C"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* head */}
        <motion.g
          initial={false}
          animate={{ rotate: lookingAtPhone ? 8 : raised ? 3 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0.5, originY: 1 }}
        >
          <rect x="145" y="124" width="12" height="16" rx="5" fill={SKIN} />
          <circle cx="151" cy="108" r="23" fill={SKIN} />
          <path
            d="M128 106 Q129 82 152 82 Q172 82 174 100 Q162 92 150 96 Q140 99 136 112 Z"
            fill="#7A4A2C"
          />
          <circle
            cx="138"
            cy="111"
            r="5"
            fill={SKIN}
            stroke="#E0A87F"
            strokeWidth="1.5"
          />
          <circle cx="163" cy="107" r="2.4" fill="#18181B" />
          <motion.path
            d={
              phase === "tracked" || phase === "logged"
                ? "M159 117 Q164 122 169 117"
                : "M160 118 Q164 120 168 118"
            }
            stroke="#18181B"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </motion.g>

        {/* front arm holding the phone; pivots at the shoulder */}
        <g transform="translate(168 150)">
          <motion.g
            initial={false}
            animate={{ rotate: armAngle }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0.5, originY: 0 }}
          >
            <rect x="-6" y="0" width="12" height="54" rx="6" fill={ORANGE} />
            <circle cx="0" cy="56" r="6.5" fill={SKIN} />
            {/* phone stays upright while the arm turns */}
            <motion.g
              initial={false}
              animate={{ rotate: -armAngle }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0.5, originY: 0.5 }}
            >
              <rect
                x="-7"
                y="42"
                width="14"
                height="26"
                rx="3"
                fill="#18181B"
                stroke="#52525B"
                strokeWidth="1.2"
              />
              <rect
                x="-5"
                y="45"
                width="10"
                height="20"
                rx="1.5"
                fill={
                  phase === "snap"
                    ? "#FAFAFA"
                    : phase === "point"
                      ? "#0B0B0C"
                      : raised
                        ? "#FAFAFA"
                        : "#27272A"
                }
              />
            </motion.g>
          </motion.g>
        </g>
      </g>

      {/* "+381 kcal" floating up when logged */}
      <AnimatePresence>
        {phase === "logged" && (
          <motion.text
            x="226"
            y="140"
            fill={GREEN}
            fontSize="15"
            fontWeight="600"
            fontFamily="var(--font-mono), monospace"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: -34 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1 }}
          >
            +381 kcal
          </motion.text>
        )}
      </AnimatePresence>

      {/* thought bubble */}
      <AnimatePresence mode="wait">
        {bubble && (
          <motion.g
            key={bubble}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3 }}
            style={{ originX: 0.2, originY: 1 }}
          >
            <circle cx="182" cy="76" r="3" fill="#FAFAFA" />
            <circle cx="190" cy="66" r="4.5" fill="#FAFAFA" />
            <rect
              x="188"
              y="26"
              width={bubble === "kcal" ? 82 : 38}
              height="32"
              rx="16"
              fill="#FAFAFA"
            />
            {bubble === "?" && (
              <text
                x="207"
                y="48"
                textAnchor="middle"
                fontSize="18"
                fontWeight="700"
                fill="#18181B"
                fontFamily="var(--font-display), sans-serif"
              >
                ?
              </text>
            )}
            {bubble === "kcal" && (
              <text
                x="229"
                y="47"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill={ORANGE}
                fontFamily="var(--font-mono), monospace"
              >
                381 kcal
              </text>
            )}
            {bubble === "check" && (
              <path
                d="M198 42 L205 49 L217 35"
                stroke={GREEN}
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}

const TRAINER_SKIN = "#C68B59";

function TrainerScene({ phase }: { phase: Phase }) {
  const reading = phase !== "notify";
  const bubble =
    phase === "notify"
      ? "bell"
      : phase === "review"
        ? "eyes"
        : phase === "verified"
          ? "check"
          : null;

  return (
    <svg
      viewBox="0 0 420 300"
      className="w-full"
      role="img"
      aria-label="The trainer gets a notification, reviews the client's meal, verifies it and sends an encouraging message"
    >
      <line
        x1="16"
        y1="276"
        x2="404"
        y2="276"
        stroke="#27272A"
        strokeWidth="2"
      />

      {/* dumbbell rack */}
      <rect x="292" y="196" width="104" height="6" rx="2" fill="#3F3F46" />
      <rect x="292" y="236" width="104" height="6" rx="2" fill="#3F3F46" />
      <rect x="298" y="196" width="6" height="80" rx="2" fill="#3F3F46" />
      <rect x="384" y="196" width="6" height="80" rx="2" fill="#3F3F46" />
      {[
        [316, 189, ORANGE],
        [344, 189, BLUE],
        [372, 189, GREEN],
        [323, 229, "#52525B"],
        [357, 229, "#52525B"],
      ].map(([x, y, color], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <rect x="-9" y="-1" width="18" height="3" rx="1.5" fill="#71717A" />
          <rect
            x="-12"
            y="-5"
            width="5"
            height="11"
            rx="1.5"
            fill={color as string}
          />
          <rect
            x="7"
            y="-5"
            width="5"
            height="11"
            rx="1.5"
            fill={color as string}
          />
        </g>
      ))}

      {/* trainer */}
      <g>
        <rect
          x="132"
          y="214"
          width="14"
          height="60"
          rx="7"
          fill="#27272A"
          stroke="#3F3F46"
          strokeWidth="1"
        />
        <rect
          x="153"
          y="214"
          width="14"
          height="60"
          rx="7"
          fill="#27272A"
          stroke="#3F3F46"
          strokeWidth="1"
        />
        <ellipse cx="143" cy="274" rx="11" ry="4" fill={ORANGE} />
        <ellipse cx="164" cy="274" rx="11" ry="4" fill={ORANGE} />

        {/* back arm */}
        <rect
          x="124"
          y="150"
          width="12"
          height="58"
          rx="6"
          fill="#047857"
          transform="rotate(8 130 152)"
        />

        {/* tee with a whistle */}
        <rect x="122" y="138" width="56" height="86" rx="20" fill={GREEN} />
        <path
          d="M140 140 L150 168 L160 140"
          stroke="#FAFAFA"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="150" cy="170" r="4" fill="#E4E4E7" />

        {/* head */}
        <motion.g
          initial={false}
          animate={{ rotate: reading ? 10 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ originX: 0.5, originY: 1 }}
        >
          <rect
            x="145"
            y="124"
            width="12"
            height="16"
            rx="5"
            fill={TRAINER_SKIN}
          />
          <circle cx="151" cy="108" r="23" fill={TRAINER_SKIN} />
          {/* cap */}
          <path d="M128 102 Q130 80 152 80 Q172 80 174 100 Z" fill={ORANGE} />
          <rect x="160" y="96" width="22" height="5" rx="2.5" fill="#C2410C" />
          <circle
            cx="138"
            cy="111"
            r="5"
            fill={TRAINER_SKIN}
            stroke="#A86F42"
            strokeWidth="1.5"
          />
          <circle cx="163" cy="108" r="2.4" fill="#18181B" />
          <path
            d={
              phase === "message" || phase === "verified"
                ? "M159 117 Q164 122 169 117"
                : "M160 118 Q164 119 168 118"
            }
            stroke="#18181B"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </motion.g>

        {/* front arm: lifts the phone when it pings */}
        <g transform="translate(168 150)">
          <motion.g
            initial={{ rotate: 14 }}
            animate={{ rotate: reading ? -52 : 14 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0.5, originY: 0 }}
          >
            <rect x="-6" y="0" width="12" height="54" rx="6" fill={GREEN} />
            <circle cx="0" cy="56" r="6.5" fill={TRAINER_SKIN} />
            <motion.g
              initial={{ rotate: -14 }}
              animate={{ rotate: reading ? 52 : -14 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0.5, originY: 0.5 }}
            >
              <rect
                x="-7"
                y="42"
                width="14"
                height="26"
                rx="3"
                fill="#18181B"
                stroke="#52525B"
                strokeWidth="1.2"
              />
              <rect
                x="-5"
                y="45"
                width="10"
                height="20"
                rx="1.5"
                fill="#FAFAFA"
              />
            </motion.g>
          </motion.g>
        </g>

        {/* ping rings while the notification arrives */}
        {phase === "notify" &&
          [0, 0.5].map((delay) => (
            <motion.circle
              key={delay}
              cx="186"
              cy="214"
              r="10"
              fill="none"
              stroke={ORANGE}
              strokeWidth="2"
              initial={{ opacity: 0.9, scale: 0.5 }}
              animate={{ opacity: 0, scale: 2.4 }}
              transition={{ duration: 1.2, repeat: Infinity, delay }}
              style={{ originX: 0.5, originY: 0.5 }}
            />
          ))}
      </g>

      {/* thought bubble */}
      <AnimatePresence mode="wait">
        {bubble && (
          <motion.g
            key={bubble}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3 }}
            style={{ originX: 0.2, originY: 1 }}
          >
            <circle cx="182" cy="76" r="3" fill="#FAFAFA" />
            <circle cx="190" cy="66" r="4.5" fill="#FAFAFA" />
            <rect
              x="188"
              y="26"
              width="40"
              height="32"
              rx="16"
              fill="#FAFAFA"
            />
            {bubble === "bell" && (
              <g transform="translate(208 42)" fill={ORANGE}>
                <path d="M-7 4 Q-7 -9 0 -9 Q7 -9 7 4 L9 6 L-9 6 Z" />
                <circle cx="0" cy="9" r="2.4" />
              </g>
            )}
            {bubble === "eyes" && (
              <g transform="translate(208 42)">
                <circle
                  cx="-6"
                  cy="0"
                  r="5.5"
                  fill="#FAFAFA"
                  stroke="#18181B"
                  strokeWidth="1.6"
                />
                <circle
                  cx="6"
                  cy="0"
                  r="5.5"
                  fill="#FAFAFA"
                  stroke="#18181B"
                  strokeWidth="1.6"
                />
                <circle cx="-4" cy="1" r="2.2" fill="#18181B" />
                <circle cx="8" cy="1" r="2.2" fill="#18181B" />
              </g>
            )}
            {bubble === "check" && (
              <path
                d="M199 42 L206 49 L218 35"
                stroke={GREEN}
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </motion.g>
        )}
      </AnimatePresence>

      {/* the message flies out to the client */}
      <AnimatePresence>
        {phase === "message" && (
          <motion.g
            initial={{ opacity: 0, x: -20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <rect
              x="206"
              y="102"
              width="132"
              height="34"
              rx="12"
              fill={ORANGE}
            />
            <path d="M214 136 L208 146 L224 136 Z" fill={ORANGE} />
            <text
              x="272"
              y="124"
              textAnchor="middle"
              fontSize="13"
              fontWeight="600"
              fill="#09090B"
              fontFamily="var(--font-mono), monospace"
            >
              Great protein!
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}

function Plate({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="4" rx="47" ry="10" fill="#D4D4D8" />
      <ellipse cx="0" cy="2" rx="36" ry="7" fill="#FAFAFA" />
      {/* greens */}
      <circle cx="-16" cy="-5" r="8" fill={GREEN} />
      <circle cx="-3" cy="-9" r="9" fill="#059669" />
      <circle cx="11" cy="-5" r="7.5" fill={GREEN} />
      {/* chicken */}
      <rect
        x="-12"
        y="-6"
        width="13"
        height="6"
        rx="2"
        fill="#F5C77E"
        transform="rotate(-12)"
      />
      <rect
        x="2"
        y="-4"
        width="12"
        height="6"
        rx="2"
        fill="#EBB061"
        transform="rotate(10)"
      />
      {/* tomatoes + avocado */}
      <circle cx="-20" cy="-1" r="3.6" fill="#EF4444" />
      <circle cx="18" cy="-1" r="3.2" fill="#EF4444" />
      <ellipse cx="6" cy="-11" rx="5" ry="3" fill="#A3E635" />
    </g>
  );
}

/* ---------------- the phone in close-up ---------------- */

function BigPhone({ phase }: { phase: Phase }) {
  const screen =
    phase === "idle" || phase === "point" || phase === "snap"
      ? "camera"
      : phase === "analysing"
        ? "analysing"
        : phase === "tracked"
          ? "tracked"
          : phase === "notify"
            ? "notify"
            : phase === "review" || phase === "verified"
              ? "review"
              : phase === "message"
                ? "message"
                : "result";

  return (
    <div className="relative aspect-[9/19] w-full rounded-[2.4rem] bg-[#1c1c1f] p-[6px] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.09)]">
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-white text-[#09090B]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={screen}
            className="absolute inset-0"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {screen === "camera" && <CameraScreen dimmed={phase === "idle"} />}
            {screen === "analysing" && <AnalysingScreen />}
            {screen === "result" && (
              <ResultScreen logged={phase === "logged"} />
            )}
            {screen === "tracked" && <TrackedScreen />}
            {screen === "notify" && <NotifyScreen />}
            {screen === "review" && (
              <ReviewScreen verified={phase === "verified"} />
            )}
            {screen === "message" && <MessageScreen />}
          </motion.div>
        </AnimatePresence>

        {/* shutter flash */}
        <AnimatePresence>
          {phase === "snap" && (
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CameraScreen({ dimmed }: { dimmed: boolean }) {
  return (
    <div className="flex h-full flex-col bg-[#0B0B0C] text-white">
      <p className="pt-7 text-center font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
        Meal check
      </p>
      <div className="relative mx-4 mt-6 flex-1">
        {/* viewfinder corners, like the FitLens logo */}
        {[
          "left-0 top-0 border-l-2 border-t-2",
          "right-0 top-0 border-r-2 border-t-2",
          "left-0 bottom-0 border-b-2 border-l-2",
          "right-0 bottom-0 border-b-2 border-r-2",
        ].map((c) => (
          <span key={c} className={`absolute h-6 w-6 border-accent ${c}`} />
        ))}
        <motion.svg
          viewBox="-60 -30 120 60"
          className="absolute inset-x-3 top-1/2 -translate-y-1/2"
          animate={{ scale: dimmed ? 0.92 : 1, opacity: dimmed ? 0.5 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <Plate x={0} y={0} />
        </motion.svg>
      </div>
      <div className="flex justify-center py-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80">
          <span className="h-9 w-9 rounded-full bg-white" />
        </span>
      </div>
    </div>
  );
}

function AnalysingScreen() {
  return (
    <div className="flex h-full flex-col px-4 pt-7 font-sans">
      <p className="text-center text-[11px] font-semibold">Meal Details</p>
      <div className="mt-8 flex flex-col items-center gap-3">
        <Sparkles className="h-7 w-7 animate-spin text-accent [animation-duration:2s]" />
        <p className="text-[12px] font-medium">Analysing your meal…</p>
      </div>
      <div className="mt-8 space-y-3">
        {[90, 70, 80, 55].map((w, i) => (
          <motion.div
            key={i}
            className="h-3 rounded-full bg-[#F4F4F5]"
            style={{ width: `${w}%` }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.12 }}
          />
        ))}
      </div>
    </div>
  );
}

function ResultScreen({ logged }: { logged: boolean }) {
  const macros = [
    { label: "Protein", value: 34, color: ORANGE },
    { label: "Carbs", value: 11, color: GREEN },
    { label: "Fat", value: 23, color: BLUE },
  ];
  return (
    <div className="flex h-full flex-col px-4 pt-7 font-sans">
      <p className="text-center text-[11px] font-semibold">Meal Details</p>
      <p className="mt-5 text-[13px] font-bold leading-tight">
        Grilled chicken salad
      </p>
      <p className="mt-1 text-[10px] text-[#71717A]">Lunch · 85% confidence</p>
      <div className="mt-4 flex items-baseline gap-1">
        <CountUp to={381} className="text-4xl font-bold tabular-nums" />
        <span className="text-[11px] text-[#71717A]">kcal</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {macros.map((m, i) => (
          <div key={m.label} className="rounded-lg bg-[#F4F4F5] p-2">
            <p className="text-[12px] font-bold tabular-nums">{m.value}g</p>
            <p className="text-[9px] text-[#71717A]">{m.label}</p>
            <div className="mt-1.5 h-1 rounded-full bg-[#E4E4E7]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: m.color }}
                initial={{ width: 0 }}
                animate={{ width: `${(m.value / 40) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-1.5 text-[10px]">
        {[
          ["Grilled chicken breast", 165],
          ["Olive oil dressing", 119],
          ["Avocado", 60],
        ].map(([n, k], i) => (
          <motion.div
            key={n}
            className="flex justify-between border-b border-[#F4F4F5] pb-1.5"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <span>{n}</span>
            <span className="text-[#71717A]">{k} cal</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-auto pb-6">
        <motion.div
          className="flex h-10 items-center justify-center gap-1.5 rounded-xl text-[12px] font-semibold text-white"
          animate={{
            backgroundColor: logged ? GREEN : "#09090B",
            scale: logged ? [1, 0.94, 1] : 1,
          }}
          transition={{ duration: 0.35 }}
        >
          {logged ? (
            <>
              <Check className="h-4 w-4" /> Logged
            </>
          ) : (
            "Log meal"
          )}
        </motion.div>
      </div>
    </div>
  );
}

function TrackedScreen() {
  const target = 1944;
  const before = 1138;
  const after = before + 381;
  const r = 44;
  const circumference = 2 * Math.PI * r;
  return (
    <div className="flex h-full flex-col px-4 pt-7 font-sans">
      <motion.div
        className="mx-auto flex items-center gap-1.5 rounded-full bg-[#09090B] px-3 py-1.5 text-[10px] font-medium text-white"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Check className="h-3 w-3 text-green" /> Lunch logged · +381 kcal
      </motion.div>
      <p className="mt-5 text-[13px] font-bold">Today</p>
      <div className="relative mx-auto mt-3 h-[120px] w-[120px]">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="#F4F4F5"
            strokeWidth="11"
          />
          <motion.circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke={BLUE}
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{
              strokeDashoffset: circumference * (1 - before / target),
            }}
            animate={{ strokeDashoffset: circumference * (1 - after / target) }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <CountUp
            from={before}
            to={after}
            delay={0.3}
            className="text-xl font-bold tabular-nums"
            format
          />
          <span className="text-[9px] text-[#71717A]">
            of {target.toLocaleString()} kcal
          </span>
        </div>
      </div>
      <div className="mt-5 space-y-2.5">
        {[
          { label: "Protein", from: 67, to: 101, max: 170, color: ORANGE },
          { label: "Carbs", from: 124, to: 135, max: 170, color: GREEN },
          { label: "Fat", from: 51, to: 74, max: 65, color: BLUE },
        ].map((m) => (
          <div key={m.label}>
            <div className="flex justify-between text-[10px]">
              <span className="font-medium">{m.label}</span>
              <span className="text-[#71717A]">
                {m.to}/{m.max}g
              </span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-[#F4F4F5]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: m.color }}
                initial={{ width: `${Math.min(100, (m.from / m.max) * 100)}%` }}
                animate={{ width: `${Math.min(100, (m.to / m.max) * 100)}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- trainer's phone ---------- */

function NotifyScreen() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-[#27272A] to-[#09090B] px-3 pt-10 font-sans text-white">
      <p className="text-center text-4xl font-semibold tabular-nums">12:41</p>
      <p className="mt-1 text-center text-[10px] text-white/50">Tuesday</p>
      <motion.div
        className="mt-8 rounded-2xl bg-white/90 p-3 text-[#09090B] shadow-lg"
        initial={{ opacity: 0, y: -16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-[#71717A]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fitlens-mark.png"
            alt=""
            className="h-3.5 w-3.5 rounded-sm bg-[#09090B] p-[1px]"
          />
          FitLens · now
        </div>
        <p className="mt-1.5 text-[12px] font-semibold">
          Sam Rivera logged lunch
        </p>
        <p className="text-[11px] text-[#52525B]">
          Grilled chicken salad · 381 kcal. Tap to review.
        </p>
      </motion.div>
    </div>
  );
}

function ReviewScreen({ verified }: { verified: boolean }) {
  const macros = [
    { label: "Protein", value: 34, color: ORANGE },
    { label: "Carbs", value: 11, color: GREEN },
    { label: "Fat", value: 23, color: BLUE },
  ];
  return (
    <div className="flex h-full flex-col px-4 pt-7 font-sans">
      <p className="text-center text-[11px] font-semibold">Client Meal</p>
      <div className="mt-5 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F4F5] text-[11px] font-semibold">
          S
        </span>
        <div className="flex-1">
          <p className="text-[12px] font-semibold leading-tight">Sam Rivera</p>
          <p className="text-[9px] text-[#71717A]">Lunch · 12:40</p>
        </div>
        <motion.span
          className="rounded-full px-2 py-0.5 text-[9px] font-semibold"
          animate={{
            backgroundColor: verified ? "#D1FAE5" : "#FEF3C7",
            color: verified ? "#047857" : "#B45309",
          }}
        >
          {verified ? "Verified" : "Awaiting review"}
        </motion.span>
      </div>
      <p className="mt-4 text-[13px] font-bold leading-tight">
        Grilled chicken salad
      </p>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-3xl font-bold">381</span>
        <span className="text-[11px] text-[#71717A]">kcal</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {macros.map((m) => (
          <div key={m.label} className="rounded-lg bg-[#F4F4F5] p-2">
            <p className="text-[12px] font-bold">{m.value}g</p>
            <p className="text-[9px] text-[#71717A]">{m.label}</p>
            <div
              className="mt-1.5 h-1 rounded-full"
              style={{ background: m.color }}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-[#F4F4F5] p-2.5 text-[10px] text-[#52525B]">
        Protein target today:{" "}
        <span className="font-semibold text-[#09090B]">101 / 170g</span>
      </div>
      <div className="mt-auto pb-6">
        <motion.div
          className="flex h-10 items-center justify-center gap-1.5 rounded-xl text-[12px] font-semibold text-white"
          animate={{
            backgroundColor: verified ? GREEN : "#09090B",
            scale: verified ? [1, 0.94, 1] : 1,
          }}
          transition={{ duration: 0.35 }}
        >
          {verified ? (
            <>
              <Check className="h-4 w-4" /> Verified
            </>
          ) : (
            "Verify meal"
          )}
        </motion.div>
      </div>
    </div>
  );
}

const COACH_MESSAGE = "Great protein at lunch, Sam! Keep it up 💪";

function MessageScreen() {
  const [typed, setTyped] = useState(0);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const chars = Array.from(COACH_MESSAGE);
    chars.forEach((_, i) =>
      timers.push(setTimeout(() => setTyped(i + 1), 150 + i * 22)),
    );
    timers.push(setTimeout(() => setSent(true), 150 + chars.length * 22 + 250));
    return () => timers.forEach(clearTimeout);
  }, []);
  const text = Array.from(COACH_MESSAGE).slice(0, typed).join("");

  return (
    <div className="flex h-full flex-col font-sans">
      <div className="flex items-center gap-2 border-b border-[#F4F4F5] px-4 pb-3 pt-7">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F4F4F5] text-[10px] font-semibold">
          S
        </span>
        <div>
          <p className="text-[11px] font-semibold leading-tight">Sam Rivera</p>
          <p className="text-[9px] text-[#10B981]">Active now</p>
        </div>
      </div>
      <div className="flex-1 space-y-2 px-3 pt-4 text-[11px]">
        <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-[#F4F4F5] px-3 py-2">
          Logged my lunch 🥗
        </div>
        {sent && (
          <motion.div
            className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[#09090B] px-3 py-2 text-white"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {COACH_MESSAGE}
          </motion.div>
        )}
        {sent && (
          <motion.p
            className="text-right text-[9px] text-[#71717A]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Delivered
          </motion.p>
        )}
      </div>
      <div className="mx-3 mb-6 flex min-h-10 items-center rounded-full border border-[#E4E4E7] px-3 py-2 text-[11px]">
        {sent ? (
          <span className="text-[#A1A1AA]">Type a message…</span>
        ) : (
          <span>
            {text}
            <span className="cursor-blink ml-0.5 inline-block h-3 w-[1.5px] translate-y-0.5 bg-[#09090B]" />
          </span>
        )}
      </div>
    </div>
  );
}

function CountUp({
  from = 0,
  to,
  delay = 0,
  className,
  format = false,
}: {
  from?: number;
  to: number;
  delay?: number;
  className?: string;
  format?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const controls = animate(from, to, {
      duration: 1.1,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = format
          ? Math.round(v).toLocaleString()
          : String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [from, to, delay, format]);
  return (
    <span ref={ref} className={className}>
      {format ? from.toLocaleString() : from}
    </span>
  );
}
