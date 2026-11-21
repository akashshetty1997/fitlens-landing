"use client";

// The staff dashboard, section by section in the same order as the Django one
import { useMemo, useState } from "react";
import { ExternalLink, Image as ImageIcon, Search, Smartphone } from "lucide-react";
import type { ClientStatus, Dashboard } from "./types";
import {
  Alert,
  Badge,
  BarList,
  Card,
  Columns,
  Kpi,
  MEALS,
  Meter,
  SIGNUPS,
  Section,
  Stat,
  Table,
  type Tone,
  num,
  pct,
  pretty,
  when,
} from "./ui";

export const SECTIONS = [
  ["overview", "Overview"],
  ["problems", "Problem reports"],
  ["growth", "Growth"],
  ["funnel", "Funnel"],
  ["plans", "Plan leads"],
  ["trainers", "Trainers"],
  ["clients", "Clients"],
  ["meals", "Meals & AI"],
  ["community", "Community"],
  ["accounts", "Accounts"],
] as const;

const STATUS: Record<ClientStatus, { tone: Tone; label: string }> = {
  at_risk: { tone: "red", label: "At risk" },
  inactive: { tone: "amber", label: "Inactive" },
  needs_attention: { tone: "amber", label: "Needs attention" },
  on_track: { tone: "green", label: "On track" },
};

const PLAN_STATE = {
  over: { tone: "red", label: "Over limit" },
  full: { tone: "amber", label: "Full" },
  near: { tone: "gray", label: "Near limit" },
} as const;

const ExternalLinkText = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-accent-text hover:underline">
    {children}
    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
  </a>
);

const platformName = (platform: string) =>
  ({ ios: "iOS", android: "Android", web: "Web" })[platform.toLowerCase()] ?? platform;

const complianceTone = (value: number): Tone => (value >= 70 ? "green" : value >= 40 ? "amber" : "red");

export function DashboardView({ data }: { data: Dashboard }) {
  const { meta, overview: o, attention: a, growth: g, meals: m, accounts: acc } = data;
  const admin = (path: string) => `${meta.admin_url}${path}`;
  const period = `${meta.period_days} d`;

  return (
    <div className="space-y-12">
      <Section id="overview" title="Overview" note={`Last ${meta.period_days} days`}>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <Kpi label="Clients" value={num(o.total_clients)} sub={`+${num(o.signups_this_period)} sign-ups in ${period}`} />
          <Kpi label="Logging · 7 d" value={num(o.meal_logging_clients_7d)} sub={`${pct(o.meal_logging_rate)} of clients logged in ${period}`} />
          <Kpi label="Trainers" value={num(o.total_trainers)} sub={`${num(o.trainers_with_clients)} with clients · ${num(o.avg_clients_per_trainer)} avg`} />
          <Kpi label={`Meals · ${period}`} value={num(o.meals_this_period)} sub={`${num(o.meals_today)} today · ${num(o.avg_meals_per_client_day)} per client a day`} />
          <Kpi label="AI meals today" value={num(o.ai_meals_total_today)} sub={`${num(o.ai_users_today)} people`} />
        </div>

        <h3 className="mb-3 mt-8 text-base font-semibold text-ink">Needs attention</h3>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
          <Alert label="Problem reports" value={a.new_problem_reports} hint="New, not looked at" tone="red" href="#problems" />
          <Alert label="Inactive clients" value={a.inactive_clients} hint="No meal for 3+ days" tone="amber" href="#clients" />
          <Alert label="Trainers at limit" value={a.plan_full} hint="Full or over the free plan" tone="amber" href="#plans" />
          <Alert label="Open content reports" value={a.open_reports} hint="Reported posts, messages, people" tone="red" href="#accounts" />
          <Alert label="Failed meals" value={a.failed_meals_recent} hint={`${num(a.pending_meals)} still processing`} tone="red" href="#meals" />
          <Alert label="Unverified meals" value={a.unverified_meals} hint="Not checked by a trainer" tone="gray" href="#meals" />
        </div>
      </Section>

      <Section
        id="problems"
        title="Problem reports"
        note={<ExternalLinkText href={admin("moderation/problemreport/?status__exact=new")}>All new reports</ExternalLinkText>}
      >
        {data.problem_reports.length === 0 ? (
          <Card>
            <p className="text-sm text-ink-2">No new problem reports. Nice.</p>
          </Card>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {data.problem_reports.map((r) => (
              <article key={r.id} className="flex flex-col rounded-[20px] bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">
                    {r.user ? r.user.name : "Signed out"}
                    {r.user && <span className="font-normal text-ink-2"> · {pretty(r.user.role)}</span>}
                  </p>
                  <time dateTime={r.created_at} className="text-xs text-ink-2" title={new Date(r.created_at).toLocaleString()}>
                    {when(r.created_at)}
                  </time>
                </div>
                {r.contact_email && <p className="mt-0.5 truncate text-xs text-ink-2">{r.contact_email}</p>}
                <p className="mt-3 whitespace-pre-wrap break-words text-[15px] leading-6 text-ink">
                  {r.note || <span className="text-ink-2">No note, see the logs in admin.</span>}
                </p>
                <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2">
                  {r.screen && (
                    <div>
                      <dt className="inline">Screen </dt>
                      <dd className="inline font-mono text-ink">{r.screen}</dd>
                    </div>
                  )}
                  {r.app_version && (
                    <div>
                      <dt className="inline">App </dt>
                      <dd className="inline text-ink">{r.app_version}</dd>
                    </div>
                  )}
                  {(r.device || r.platform) && (
                    <div className="inline-flex items-center gap-1">
                      <Smartphone className="h-3.5 w-3.5" aria-hidden />
                      <dd className="text-ink">
                        {[r.device, r.platform && `${platformName(r.platform)} ${r.os_version}`.trim()].filter(Boolean).join(" · ")}
                      </dd>
                    </div>
                  )}
                  {r.has_screenshot && (
                    <div className="inline-flex items-center gap-1">
                      <ImageIcon className="h-3.5 w-3.5" aria-hidden />
                      <dd className="text-ink">Screenshot</dd>
                    </div>
                  )}
                </dl>
                <div className="mt-4 border-t border-line pt-3 text-sm">
                  <ExternalLinkText href={admin(`moderation/problemreport/${r.id}/change/`)}>Open in admin</ExternalLinkText>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>

      <Section id="growth" title="Growth" note="Last 14 days">
        <div className="grid gap-3 lg:grid-cols-2">
          <Card title={`Meals logged · ${num(g.meals_total)}`}>
            <Columns days={g.daily} field="meals" color={MEALS} label="meals" />
          </Card>
          <Card title={`Sign-ups · ${num(g.signups_total)}`}>
            <Columns days={g.daily} field="signups" color={SIGNUPS} label="sign-ups" />
          </Card>
          <Card title={`Sign-ups by method · ${period}`}>
            <BarList rows={g.by_provider} total={g.signups_this_period} color={SIGNUPS} />
          </Card>
          <Card title={`Sign-ups by role · ${period}`}>
            <BarList rows={g.by_role} total={g.signups_this_period} color={SIGNUPS} />
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-line pt-4">
              <Stat label="Today" value={num(g.signups_today)} />
              <Stat label="This week" value={num(g.signups_this_week)} />
              <Stat label="30-day retention" value={pct(g.retention_rate)} />
            </div>
          </Card>
        </div>
        <details className="mt-3 text-sm text-ink-2">
          <summary className="cursor-pointer select-none">Show the 14 days as a table</summary>
          <div className="mt-3">
            <Table head={["Day", "Meals", "Sign-ups"]}>
              {g.daily.map((d) => (
                <tr key={d.day}>
                  <td className="px-4 py-2">{d.day}</td>
                  <td className="px-4 py-2 tabular-nums">{num(d.meals)}</td>
                  <td className="px-4 py-2 tabular-nums">{num(d.signups)}</td>
                </tr>
              ))}
            </Table>
          </div>
        </details>
      </Section>

      <Section id="funnel" title="Client activation" note="Where new clients drop off">
        <Card>
          <BarList
            rows={data.funnel.map((step) => ({ label: step.label, count: step.count }))}
            total={data.funnel[0]?.count || 1}
          />
        </Card>
      </Section>

      <Section id="plans" title="Free plan · upgrade leads" note={`${num(data.plan_leads.length)} trainers at or near the limit`}>
        <Table head={["Trainer", "Clients", "Plan", "Active · 7 d", ""]} empty={!data.plan_leads.length}>
          {data.plan_leads.map((t) => (
            <tr key={t.id}>
              <td className="px-4 py-3">
                <p className="font-medium">{t.name}</p>
                <p className="text-xs text-ink-2">{t.email}</p>
              </td>
              <td className="px-4 py-3 tabular-nums">
                {num(t.total_clients)} / {num(t.capacity)}
              </td>
              <td className="px-4 py-3">
                <Badge tone={PLAN_STATE[t.plan_state].tone}>{PLAN_STATE[t.plan_state].label}</Badge>
              </td>
              <td className="px-4 py-3 tabular-nums">{num(t.active_clients)}</td>
              <td className="space-x-3 whitespace-nowrap px-4 py-3 text-right">
                <a className="font-medium text-accent-text hover:underline" href={`mailto:${t.email}?subject=More%20clients%20on%20FitLens`}>
                  Email
                </a>
                <ExternalLinkText href={admin(`users/user/${t.id}/change/`)}>Raise limit</ExternalLinkText>
              </td>
            </tr>
          ))}
        </Table>
      </Section>

      <Section id="trainers" title="Trainers" note={`${num(data.trainers.length)} trainers`}>
        <Table head={["Trainer", "Clients", "Capacity", `Meals · ${period}`, "Compliance", "Joined"]} empty={!data.trainers.length}>
          {data.trainers.map((t) => (
            <tr key={t.id}>
              <td className="px-4 py-3">
                <a href={admin(`users/user/${t.id}/change/`)} target="_blank" rel="noreferrer" className="font-medium hover:underline">
                  {t.name}
                </a>
                <p className="text-xs text-ink-2">{t.email}</p>
              </td>
              <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                {num(t.total_clients)} <span className="text-ink-2">· {num(t.active_clients)} active</span>
              </td>
              <td className="w-40 px-4 py-3">
                <Meter value={t.capacity_used} />
                <p className="mt-1 text-xs text-ink-2 tabular-nums">
                  {num(t.total_clients)} of {num(t.capacity)}
                </p>
              </td>
              <td className="px-4 py-3 tabular-nums">{num(t.meals_this_period)}</td>
              <td className="px-4 py-3">
                {data.has_compliance && t.total_clients ? (
                  <Badge tone={complianceTone(t.avg_compliance)}>{pct(t.avg_compliance)}</Badge>
                ) : (
                  <span className="text-ink-2">–</span>
                )}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-ink-2">{when(t.date_joined)}</td>
            </tr>
          ))}
        </Table>
      </Section>

      <ClientsSection data={data} admin={admin} period={period} />

      <Section id="meals" title="Meals and AI" note={`Last ${meta.period_days} days`}>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Kpi label="AI confidence" value={pct(m.avg_confidence)} sub="Average across analyzed meals" />
          <Kpi label="High confidence" value={pct(m.ai_success_rate)} sub={m.has_response_time ? `of analyzed meals · ${num(m.avg_response_time)} s average` : "of analyzed meals"} />
          <Kpi label="Trainer-verified" value={num(m.verified_meals)} sub={`${num(m.unverified_meals)} not verified`} />
          <Kpi label="Heavy AI users" value={num(m.heavy_ai_users)} sub="5 or more AI meals today (limit 10)" />
        </div>
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          <Card title="How meals are logged">
            <BarList rows={m.methods} total={m.meals_this_period} />
          </Card>
          <Card title="Meal types">
            <BarList rows={m.types} total={m.meals_this_period} />
          </Card>
          <Card title="AI processing · all time">
            <BarList rows={m.processing} total={m.total_meals} />
            {m.peak_hours.length > 0 && (
              <p className="mt-4 text-xs text-ink-2">
                Busiest hours today (UTC):{" "}
                {m.peak_hours.map((h) => (
                  <span key={h} className="ml-1 rounded-full bg-ink/5 px-2 py-0.5 text-ink tabular-nums">
                    {h}
                  </span>
                ))}
              </p>
            )}
          </Card>
        </div>
        {m.top_ai_users.length > 0 && (
          <div className="mt-3">
            <h3 className="mb-3 text-base font-semibold text-ink">Top AI users today</h3>
            <Table head={["Person", "Role", "AI meals today", ""]}>
              {m.top_ai_users.map((u) => (
                <tr key={u.id}>
                  <td className="px-4 py-3">
                    <p className="font-medium">{u.name}</p>
                    <p className="text-xs text-ink-2">{u.email}</p>
                  </td>
                  <td className="px-4 py-3">{pretty(u.role)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={u.ai_meals_today >= 10 ? "red" : u.ai_meals_today >= 5 ? "amber" : "gray"}>{u.ai_meals_today} / 10</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ExternalLinkText href={admin(`users/user/${u.id}/change/`)}>Open</ExternalLinkText>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        )}
      </Section>

      <Section id="community" title="Community and coaching" note={`Last ${meta.period_days} days`}>
        <div className="grid gap-3 md:grid-cols-2">
          <Card title="Squads and chat">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="Squad posts" value={num(data.community.squad_posts)} />
              <Stat label="Comments" value={num(data.community.comments)} />
              <Stat label="Reactions" value={num(data.community.reactions)} />
              <Stat label="Chat messages" value={num(data.community.chat_messages)} />
            </div>
          </Card>
          <Card title="Coaching and tracking">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="Plans created" value={num(data.community.plans_created)} />
              <Stat label="Plans assigned" value={num(data.community.plans_assigned)} />
              <Stat label="Water logs" value={num(data.community.water_logs)} />
              <Stat label="Weight logs" value={num(data.community.weight_logs)} />
            </div>
          </Card>
        </div>
      </Section>

      <Section id="accounts" title="Accounts and safety">
        <div className="grid gap-3 lg:grid-cols-3">
          <Card title="Email verification">
            <BarList
              rows={[
                { label: "Verified", count: acc.verified_users },
                { label: "Not verified", count: acc.unverified_users },
              ]}
              total={acc.total_users}
              color={SIGNUPS}
            />
            <p className="mt-4 text-xs text-ink-2">
              Last 24 h: {num(acc.verify_codes_24h)} verification codes, {num(acc.reset_codes_24h)} password resets
            </p>
          </Card>
          <Card title={`Push notifications · ${pct(acc.push_rate)} of people`}>
            <BarList rows={acc.devices_by_platform} total={acc.devices_by_platform.reduce((s, r) => s + r.count, 0)} color={SIGNUPS} />
          </Card>
          <Card title="Trust and safety">
            <p className="text-sm text-ink-2">
              {num(acc.open_reports)} open reports · {num(acc.user_blocks)} blocks
            </p>
            <ul className="mt-3 divide-y divide-line">
              {acc.content_reports.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                  <span className="text-ink">
                    {r.reason} <span className="text-ink-2">· {pretty(r.content_type)} · {when(r.created_at)}</span>
                  </span>
                  <ExternalLinkText href={admin(`moderation/contentreport/${r.id}/change/`)}>Review</ExternalLinkText>
                </li>
              ))}
            </ul>
            {acc.content_reports.length === 0 && <p className="mt-2 text-sm text-ink-2">No open reports.</p>}
          </Card>
        </div>
      </Section>

      <footer className="flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-6 text-sm">
        <span className="text-ink-2">Django admin:</span>
        <ExternalLinkText href={admin("users/user/")}>Users</ExternalLinkText>
        <ExternalLinkText href={admin("meals/meal/")}>Meals</ExternalLinkText>
        <ExternalLinkText href={admin("users/trainerclientrelationship/")}>Trainer relationships</ExternalLinkText>
        <ExternalLinkText href={admin("moderation/contentreport/")}>Content reports</ExternalLinkText>
        <ExternalLinkText href={admin("moderation/problemreport/")}>Problem reports</ExternalLinkText>
        <ExternalLinkText href={admin("users/compliancescore/")}>Compliance scores</ExternalLinkText>
      </footer>
    </div>
  );
}

const FILTERS: ("all" | ClientStatus)[] = ["all", "at_risk", "inactive", "needs_attention", "on_track"];

function ClientsSection({ data, admin, period }: { data: Dashboard; admin: (path: string) => string; period: string }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const counts = useMemo(() => {
    const out: Record<string, number> = { all: data.clients.length };
    for (const c of data.clients) out[c.status] = (out[c.status] || 0) + 1;
    return out;
  }, [data.clients]);
  const rows = data.clients.filter((c) => {
    if (filter !== "all" && c.status !== filter) return false;
    const q = query.trim().toLowerCase();
    return !q || `${c.name} ${c.email} ${c.trainer}`.toLowerCase().includes(q);
  });

  return (
    <Section
      id="clients"
      title="Client engagement"
      note={data.clients_total > data.clients.length ? `Showing ${data.clients.length} of ${data.clients_total}, least active first` : "Least active first"}
    >
      <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`h-8 rounded-full px-3 text-sm font-medium transition-colors ${
                filter === f ? "bg-accent text-on-accent" : "bg-card text-ink hover:bg-ink/8"
              }`}
            >
              {f === "all" ? "All" : STATUS[f].label} <span className="tabular-nums opacity-70">{num(counts[f] || 0)}</span>
            </button>
          ))}
        </div>
        <label className="relative block md:w-64">
          <span className="sr-only">Search clients</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-2" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, email or trainer"
            className="h-9 w-full rounded-full border border-line bg-paper pl-9 pr-4 text-sm text-ink placeholder:text-ink-2/70 focus:border-accent focus:outline-none"
          />
        </label>
      </div>
      <Table head={["Client", "Status", "Trainer", "Last meal", "Today", "Week", period, "Streak", "Usually"]} empty={!rows.length}>
        {rows.map((c) => (
          <tr key={c.id}>
            <td className="px-4 py-3">
              <a href={admin(`users/user/${c.id}/change/`)} target="_blank" rel="noreferrer" className="font-medium hover:underline">
                {c.name}
              </a>
              <p className="text-xs text-ink-2">{c.email}</p>
            </td>
            <td className="px-4 py-3">
              <Badge tone={STATUS[c.status].tone}>{STATUS[c.status].label}</Badge>
            </td>
            <td className="px-4 py-3">{c.trainer}</td>
            <td className="whitespace-nowrap px-4 py-3 text-ink-2">{when(c.last_active)}</td>
            <td className="px-4 py-3 tabular-nums">{num(c.meals_today)}</td>
            <td className="px-4 py-3 tabular-nums">{num(c.meals_this_week)}</td>
            <td className="px-4 py-3 tabular-nums">{num(c.meals_this_period)}</td>
            <td className="px-4 py-3 tabular-nums">{c.streak ? `${c.streak} d` : "–"}</td>
            <td className="px-4 py-3">{c.preferred_method === "none" ? "–" : pretty(c.preferred_method)}</td>
          </tr>
        ))}
      </Table>
    </Section>
  );
}
