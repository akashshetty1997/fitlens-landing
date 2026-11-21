import { cookies } from "next/headers";
import { API_URL, fetchDashboard, json, SESSION_MAX_AGE, sessionCookie } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

// Sign in with a FitLens staff account. The API decides who is staff: the
// token is kept only if it can read the staff dashboard.
export async function POST(request: Request) {
  // Only this site's own form may sign in
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json({ error: "Not allowed." }, 403);
  }

  let email = "";
  let password = "";
  try {
    const body = await request.json();
    email = typeof body.email === "string" ? body.email.trim() : "";
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    // handled below
  }
  if (!email || !password) return json({ error: "Enter your email and password." }, 400);

  let login: Response;
  try {
    login = await fetch(`${API_URL}/users/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });
  } catch {
    return json({ error: "Couldn't reach FitLens. Try again in a moment." }, 502);
  }
  if (login.status === 429) return json({ error: "Too many tries. Wait a minute and try again." }, 429);
  if (!login.ok) return json({ error: "Email or password is incorrect." }, 401);

  const token: unknown = (await login.json().catch(() => null))?.data?.tokens?.access;
  if (typeof token !== "string") return json({ error: "Couldn't sign in. Try again." }, 502);

  const probe = await fetchDashboard(token, "?period=7").catch(() => null);
  if (!probe) return json({ error: "Couldn't reach FitLens. Try again in a moment." }, 502);
  if (probe.status === 403) return json({ error: "This account isn't a FitLens staff account." }, 403);
  if (!probe.ok) return json({ error: "Couldn't load the dashboard. Try again." }, 502);

  (await cookies()).set(sessionCookie(token, SESSION_MAX_AGE));
  return json({ ok: true });
}
