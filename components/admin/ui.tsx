// Building blocks for /admin: cards, numbers, bar lists, the daily column chart,
// badges and tables. Marks use the chart colours below; text stays in ink tokens.
import type { ReactNode } from "react";

// Checked with the dataviz palette validator in light and dark mode
export const MEALS = "#ea580c";
export const SIGNUPS = "#3b82f6";

export const num = (value: number | null | undefined) =>
  value == null ? "–" : value.toLocaleString("en-US", { maximumFractionDigits: 1 });

export const pct = (value: number | null | undefined) => (value == null ? "–" : `${num(value)}%`);

export function when(iso: string | null) {
  if (!iso) return "Never";
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export const pretty = (value: string) =>
  value ? value.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase()) : "Unknown";

export function Section({ id, title, note, children }: { id: string; title: string; note?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-xl font-bold tracking-tight text-ink">{title}</h2>
        {note && <p className="text-sm text-ink-2">{note}</p>}
      </div>
      {children}
    </section>
  );
}

export function Card({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[20px] bg-card p-5 ${className}`}>
      {title && <h3 className="mb-4 text-sm font-semibold text-ink">{title}</h3>}
      {children}
    </div>
  );
}

export function Kpi({ label, value, sub }: { label: string; value: ReactNode; sub?: ReactNode }) {
  return (
    <div className="rounded-[20px] bg-card p-5">
      <p className="text-sm text-ink-2">{label}</p>
      <p className="mt-1 text-[28px] font-bold leading-tight tracking-tight text-ink tabular-nums">{value}</p>
      {sub && <p className="mt-1 text-xs text-ink-2">{sub}</p>}
    </div>
  );
}

const TONES = {
  red: "bg-red/12 text-ink ring-1 ring-red/40",
  amber: "bg-amber/12 text-ink ring-1 ring-amber/40",
  green: "bg-green/12 text-ink ring-1 ring-green/40",
  gray: "bg-ink/5 text-ink-2",
} as const;
const DOTS = { red: "bg-red", amber: "bg-amber", green: "bg-green", gray: "bg-ink-2/50" } as const;
export type Tone = keyof typeof TONES;

// Status always carries its words; the dot only repeats it
export function Badge({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ${TONES[tone]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${DOTS[tone]}`} aria-hidden />
      {children}
    </span>
  );
}

// Alert card: quiet at 0, tinted when something needs a look
export function Alert({ label, value, hint, tone, href }: { label: string; value: number; hint: string; tone: Tone; href?: string }) {
  const active = value > 0;
  const body = (
    <>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-ink">{label}</p>
        {active && <Badge tone={tone}>{tone === "red" ? "Act now" : "Look"}</Badge>}
      </div>
      <p className="mt-2 text-[28px] font-bold leading-none text-ink tabular-nums">{num(value)}</p>
      <p className="mt-2 text-xs text-ink-2">{hint}</p>
    </>
  );
  const className = `block rounded-[20px] p-5 transition-opacity ${active ? TONES[tone] : "bg-card"} ${href ? "hover:opacity-80" : ""}`;
  return href ? (
    <a href={href} className={className}>
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  );
}

// Horizontal bars with the label and the number always visible
export function BarList({ rows, total, color = MEALS, format = num }: { rows: { label: string; count: number }[]; total?: number; color?: string; format?: (n: number) => string }) {
  if (!rows.length) return <p className="text-sm text-ink-2">Nothing yet.</p>;
  const max = total ?? Math.max(...rows.map((row) => row.count), 1);
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.label}>
          <div className="mb-1 flex justify-between gap-3 text-sm">
            <span className="truncate text-ink">{pretty(row.label)}</span>
            <span className="shrink-0 text-ink-2 tabular-nums">
              {format(row.count)}
              {total ? ` · ${Math.round((row.count / (total || 1)) * 100)}%` : ""}
            </span>
          </div>
          <div className="h-2 rounded-full bg-ink/8">
            <div
              className="h-2 rounded-full"
              style={{ width: `${Math.min(100, (row.count / (max || 1)) * 100)}%`, background: color }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

// A thin meter (capacity, verification): red past 100%
export function Meter({ value, color = MEALS }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 w-full min-w-16 rounded-full bg-ink/8">
      <div
        className="h-1.5 rounded-full"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: value >= 100 ? "var(--color-red, #ef4444)" : color }}
      />
    </div>
  );
}

// One series per chart (meals and signups have different scales: two charts, never two axes).
// Each column is focusable and shows its day and value on hover or focus.
export function Columns({ days, field, color, label }: { days: { day: string; meals: number; signups: number }[]; field: "meals" | "signups"; color: string; label: string }) {
  const max = Math.max(...days.map((d) => d[field]), 0);
  const top = max <= 4 ? 4 : Math.ceil(max / 5) * 5;
  const short = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return (
    <figure>
      <div className="relative h-40">
        <div className="absolute inset-x-0 top-0 border-t border-line" aria-hidden />
        <span className="absolute -top-2.5 right-0 bg-card pl-1 text-[11px] text-ink-2 tabular-nums">{num(top)}</span>
        <div className="absolute inset-x-0 bottom-0 border-t border-line" aria-hidden />
        <div className="absolute inset-0 flex items-end gap-[2px] pr-6">
          {days.map((d) => (
            <div key={d.day} className="group relative flex h-full flex-1 items-end justify-center">
              <button
                type="button"
                aria-label={`${short(d.day)}: ${d[field]} ${label}`}
                className="flex h-full w-full items-end justify-center focus:outline-none"
              >
                <span
                  className="block w-full max-w-6 rounded-t-[4px]"
                  style={{ height: `${(d[field] / top) * 100}%`, minHeight: d[field] ? 2 : 0, background: color }}
                />
              </button>
              <span className="pointer-events-none absolute bottom-full z-10 mb-1 hidden whitespace-nowrap rounded-lg bg-ink px-2 py-1 text-xs text-paper shadow group-hover:block group-focus-within:block">
                {short(d.day)} · {num(d[field])} {label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1 flex justify-between pr-6 text-[11px] text-ink-2">
        <span>{days[0] && short(days[0].day)}</span>
        <span>{days.at(-1) && short(days.at(-1)!.day)}</span>
      </div>
    </figure>
  );
}

export function Table({ head, children, empty }: { head: string[]; children: ReactNode; empty?: boolean }) {
  return (
    <div className="overflow-x-auto rounded-[20px] bg-card">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-2">
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line text-ink">{children}</tbody>
      </table>
      {empty && <p className="px-4 py-6 text-sm text-ink-2">Nothing here.</p>}
    </div>
  );
}

export function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <p className="text-[22px] font-bold leading-tight text-ink tabular-nums">{value}</p>
      <p className="text-xs text-ink-2">{label}</p>
    </div>
  );
}
