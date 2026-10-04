import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "FitLens: AI nutrition tracking for personal trainers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview shown when the site is shared (WhatsApp, LinkedIn, X, iMessage)
export default async function OpengraphImage() {
  const mark = await readFile(join(process.cwd(), "public/fitlens-mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;
  const dots = ["#F97316", "#10B981", "#3B82F6"];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#09090b",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={64} height={64} alt="" />
        <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: 4 }}>
          FITLENS
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: -3,
          }}
        >
          COACH WHAT THEY
        </span>
        <span
          style={{
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: -3,
            color: "#F97316",
          }}
        >
          ACTUALLY EAT.
        </span>
        <span style={{ marginTop: 28, fontSize: 30, color: "#a1a1aa" }}>
          AI nutrition tracking for personal trainers
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 22,
          color: "#71717a",
        }}
      >
        {dots.map((c) => (
          <span
            key={c}
            style={{ width: 14, height: 14, background: c, display: "flex" }}
          />
        ))}
        <span style={{ marginLeft: 8 }}>
          Snap a meal · get macros · coach with proof
        </span>
      </div>
    </div>,
    size,
  );
}
