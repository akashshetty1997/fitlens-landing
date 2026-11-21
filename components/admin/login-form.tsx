"use client";

import { useState, type FormEvent } from "react";
import { Lock } from "lucide-react";
import { Wordmark } from "@/components/wordmark";

const field =
  "h-12 w-full rounded-full border border-line bg-paper px-5 text-base text-ink placeholder:text-ink-2/70 transition-colors focus:border-accent focus:outline-none";

export function LoginForm({ onSignedIn }: { onSignedIn: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSending(true);
    setError("");
    try {
      const response = await fetch("/admin/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(body.error || "Couldn't sign in. Try again.");
        return;
      }
      setPassword("");
      onSignedIn();
    } catch {
      setError("Couldn't reach the server. Check your connection.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4 py-12">
      <Wordmark />
      <h1 className="mt-8 text-[30px] font-bold tracking-tight text-ink">Staff sign in</h1>
      <p className="mt-1 text-ink-2">The FitLens team dashboard. Use your staff account.</p>
      <form onSubmit={submit} className="mt-8 space-y-3" noValidate>
        <label className="block">
          <span className="sr-only">Email</span>
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={field}
          />
        </label>
        <label className="block">
          <span className="sr-only">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={field}
          />
        </label>
        {error && (
          <p role="alert" className="px-2 text-sm text-ink">
            <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-red align-middle" aria-hidden />
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={sending || !email || !password}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-[15px] font-semibold text-on-accent transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Lock className="h-4 w-4" aria-hidden />
          {sending ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="mt-6 text-xs text-ink-2">You stay signed in for 8 hours on this browser.</p>
    </div>
  );
}
