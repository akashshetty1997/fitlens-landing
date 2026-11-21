"use client";

// usefitlens.com/admin: sign in, then the staff dashboard with a period switch,
// the demo-account toggle and section links
import { useCallback, useEffect, useState } from "react";
import {
  Bug,
  Dumbbell,
  ExternalLink,
  Filter,
  LayoutDashboard,
  LogOut,
  MessagesSquare,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { Wordmark } from "@/components/wordmark";
import { DashboardView, SECTIONS } from "./dashboard-view";
import { LoginForm } from "./login-form";
import type { Dashboard } from "./types";

type State = { kind: "loading" } | { kind: "signed_out" } | { kind: "error"; message: string } | { kind: "ready"; data: Dashboard };

const PERIODS = [7, 30, 90];

type SectionId = (typeof SECTIONS)[number][0];

const ICONS: Record<SectionId, LucideIcon> = {
  overview: LayoutDashboard,
  problems: Bug,
  growth: TrendingUp,
  funnel: Filter,
  plans: Sparkles,
  trainers: Dumbbell,
  clients: Users,
  meals: UtensilsCrossed,
  community: MessagesSquare,
  accounts: ShieldCheck,
};

// The section in view, so the menu can show where you are
function useActiveSection(ready: boolean) {
  const [active, setActive] = useState<SectionId>("overview");
  useEffect(() => {
    if (!ready) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id as SectionId);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    SECTIONS.forEach(([id]) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [ready]);
  return active;
}

export function AdminApp() {
  const [state, setState] = useState<State>({ kind: "loading" });
  const [period, setPeriod] = useState(30);
  const [demo, setDemo] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const active = useActiveSection(state.kind === "ready");

  const load = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch(`/admin/api/dashboard?period=${period}&demo=${demo ? 1 : 0}`, { cache: "no-store" });
      const body = await response.json().catch(() => ({}));
      if (response.status === 401) setState({ kind: "signed_out" });
      else if (!response.ok) setState({ kind: "error", message: body.error || "Couldn't load the dashboard." });
      else setState({ kind: "ready", data: body as Dashboard });
    } catch {
      setState({ kind: "error", message: "Couldn't reach the server. Check your connection." });
    } finally {
      setRefreshing(false);
    }
  }, [period, demo]);

  useEffect(() => {
    load();
  }, [load]);

  async function signOut() {
    await fetch("/admin/api/logout", { method: "POST" }).catch(() => null);
    setState({ kind: "signed_out" });
  }

  if (state.kind === "signed_out") return <LoginForm onSignedIn={load} />;

  const data = state.kind === "ready" ? state.data : null;

  const counts: Partial<Record<SectionId, number>> = data
    ? {
        problems: data.attention.new_problem_reports,
        plans: data.plan_leads.length,
        clients: data.attention.inactive_clients,
        accounts: data.attention.open_reports,
      }
    : {};

  const controls = (
    <div className="ml-auto flex flex-wrap items-center gap-2">
      <div className="flex rounded-full bg-card p-1" role="group" aria-label="Period">
        {PERIODS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPeriod(p)}
            aria-pressed={period === p}
            className={`h-7 rounded-full px-3 text-sm font-medium transition-colors ${
              period === p ? "bg-paper text-ink shadow-sm" : "text-ink-2 hover:text-ink"
            }`}
          >
            {p} d
          </button>
        ))}
      </div>
      <label className="flex h-9 cursor-pointer items-center gap-2 rounded-full bg-card px-3 text-sm text-ink">
        <input type="checkbox" checked={demo} onChange={(e) => setDemo(e.target.checked)} className="accent-[var(--accent)]" />
        <span>
          Demo<span className="hidden sm:inline"> accounts{data && !demo ? ` (${data.meta.demo_accounts} hidden)` : ""}</span>
        </span>
      </label>
      <button
        type="button"
        onClick={load}
        disabled={refreshing}
        aria-label="Refresh"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-ink transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} aria-hidden />
      </button>
      {/* Phones and tablets: the side menu is hidden, so sign out lives here */}
      <button
        type="button"
        onClick={signOut}
        aria-label="Sign out"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-card text-ink transition-opacity hover:opacity-80 lg:hidden"
      >
        <LogOut className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen lg:flex">
      {/* Side menu (desktop) */}
      <aside className="hidden border-r border-line lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-64 lg:shrink-0 lg:flex-col lg:px-3 lg:py-5">
        <div className="flex items-center gap-2 px-3">
          <Wordmark />
          <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs font-medium text-ink-2">Admin</span>
        </div>
        <nav aria-label="Sections" className="mt-6 flex-1 overflow-y-auto">
          <ul className="space-y-0.5">
            {SECTIONS.map(([id, label]) => {
              const Icon = ICONS[id];
              const current = active === id;
              const count = counts[id];
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={current ? "location" : undefined}
                    className={`flex h-10 items-center gap-3 rounded-xl px-3 text-sm transition-colors ${
                      current ? "bg-card font-semibold text-ink" : "text-ink-2 hover:bg-card hover:text-ink"
                    }`}
                  >
                    <Icon className={`h-[18px] w-[18px] shrink-0 ${current ? "text-accent-text" : ""}`} aria-hidden />
                    <span className="flex-1 truncate">{label}</span>
                    {!!count && (
                      <span className="rounded-full bg-ink/8 px-2 py-0.5 text-xs font-medium text-ink tabular-nums">{count}</span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="space-y-0.5 border-t border-line pt-3">
          {data && (
            <a
              href={data.meta.admin_url}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 items-center gap-3 rounded-xl px-3 text-sm text-ink-2 hover:bg-card hover:text-ink"
            >
              <ExternalLink className="h-[18px] w-[18px]" aria-hidden />
              Django admin
            </a>
          )}
          <button
            type="button"
            onClick={signOut}
            className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm text-ink-2 hover:bg-card hover:text-ink"
          >
            <LogOut className="h-[18px] w-[18px]" aria-hidden />
            Sign out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="z-20 border-b border-line bg-paper/90 backdrop-blur md:sticky md:top-0">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3 lg:hidden">
              <Wordmark />
              <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs font-medium text-ink-2">Admin</span>
            </div>
            <p className="hidden text-sm text-ink-2 lg:block">
              {data
                ? `Updated ${new Date(data.meta.generated_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                : "Loading…"}
            </p>
            {controls}
          </div>
          {/* Phones and tablets: sections as a scrolling row */}
          <nav aria-label="Sections" className="mx-auto max-w-6xl overflow-x-auto px-4 pb-2 sm:px-6 lg:hidden">
            <ul className="flex gap-1 whitespace-nowrap text-sm">
              {SECTIONS.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`inline-block rounded-full px-3 py-1 ${
                      active === id ? "bg-card font-medium text-ink" : "text-ink-2 hover:bg-card hover:text-ink"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="mb-8">
            <h1 className="text-[30px] font-bold tracking-tight text-ink">Platform overview</h1>
            <p className="mt-1 text-ink-2">
              {data
                ? `Last ${data.meta.period_days} days${data.meta.include_demo ? " · demo accounts included" : ""}`
                : "Loading…"}
            </p>
          </div>

          {state.kind === "error" && (
            <div role="alert" className="rounded-[20px] bg-card p-6">
              <p className="text-ink">{state.message}</p>
              <button
                type="button"
                onClick={load}
                className="mt-4 h-10 rounded-full bg-accent px-5 text-sm font-semibold text-on-accent hover:opacity-90"
              >
                Try again
              </button>
            </div>
          )}
          {state.kind === "loading" && <Skeleton />}
          {data && (
            <div className={refreshing ? "opacity-60 transition-opacity" : "transition-opacity"}>
              <DashboardView data={data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3" aria-hidden>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-[20px] bg-card" />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-[20px] bg-card" />
      <div className="h-64 animate-pulse rounded-[20px] bg-card" />
    </div>
  );
}
