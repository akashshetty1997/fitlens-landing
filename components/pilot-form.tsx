"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { ArrowRight, Check } from "lucide-react";

// Pilot signup: posts the email to Formspree (same endpoint and payload as
// before) and records a "Pilot signup" analytics event with the form id.
// With agentTool, the form registers a WebMCP tool for in-browser AI agents
// (ChatGPT's desktop browser, Chrome). It only fills in the email; the visitor
// still checks it and presses Join, so nothing is sent without them. (Declarative
// form labels were removed: ChatGPT exposed them as tools that send the form.)

type ModelContext = {
  registerTool: (tool: unknown, options?: { signal?: AbortSignal }) => Promise<unknown>;
};
const FORMSPREE_URL = "https://formspree.io/f/xzddzwjj";

export function PilotForm({ id, agentTool = false }: { id: string; agentTool?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  useEffect(() => {
    if (!agentTool) return;
    const modelContext =
      (document as Document & { modelContext?: ModelContext }).modelContext ??
      (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
    if (!modelContext?.registerTool) return;
    const controller = new AbortController();
    modelContext
      .registerTool(
        {
          name: "join_trainer_pilot",
          title: "Join the FitLens trainer pilot",
          description:
            "Fills in a personal trainer's email address on the FitLens pilot sign-up form. Nothing is sent until the visitor checks it and presses Join.",
          inputSchema: {
            type: "object",
            properties: {
              email: { type: "string", format: "email", description: "The personal trainer's email address" },
            },
            required: ["email"],
          },
          async execute({ email: value }: { email: string }) {
            setEmail(String(value ?? "").trim().slice(0, 254));
            setStatus("idle");
            const input = document.getElementById(id);
            input?.scrollIntoView({ behavior: "smooth", block: "center" });
            input?.focus();
            return {
              content: [
                {
                  type: "text",
                  text: 'The email is filled in on the sign-up form. The visitor needs to check it and press "Join the free trainer pilot" to send it.',
                },
              ],
            };
          },
        },
        { signal: controller.signal },
      )
      .catch(() => {});
    return () => controller.abort();
  }, [agentTool, id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) track("Pilot signup", { form: id });
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <p
        role="status"
        className="inline-flex items-center gap-2 rounded-full bg-green/10 px-5 py-3 text-sm font-medium text-ink"
      >
        <Check className="h-4 w-4 text-green" aria-hidden />
        You&apos;re on the list. We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <div className="w-full max-w-lg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 sm:flex-row"
        aria-describedby={status === "error" ? `${id}-error` : undefined}
      >
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourgym.com"
          className="h-12 w-full rounded-full border border-line bg-paper px-5 text-base text-ink placeholder:text-ink-2/70 transition-colors focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 text-[15px] font-semibold text-on-accent transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending" ? "Joining…" : "Join the free trainer pilot"}
          {status !== "sending" && <ArrowRight className="h-4 w-4" aria-hidden />}
        </button>
      </form>
      {status === "error" && (
        <p id={`${id}-error`} role="alert" className="mt-2 flex items-center gap-2 text-sm text-ink">
          <span className="h-2 w-2 shrink-0 rounded-full bg-red" aria-hidden />
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
