"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { ArrowRight, Check } from "lucide-react";

// Pilot signup: posts the email to Formspree (same endpoint and payload as
// before) and records a "Pilot signup" analytics event with the form id.
const FORMSPREE_URL = "https://formspree.io/f/xzddzwjj";

export function PilotForm({ id }: { id: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
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
