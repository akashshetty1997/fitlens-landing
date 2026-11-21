import { cookies } from "next/headers";
import { fetchDashboard, json, SESSION_COOKIE, sessionCookie } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return json({ error: "signed_out" }, 401);

  const params = new URL(request.url).searchParams;
  const period = ["7", "30", "90"].includes(params.get("period") ?? "") ? params.get("period") : "30";
  const demo = params.get("demo") === "1" ? "1" : "0";

  const response = await fetchDashboard(token, `?period=${period}&demo=${demo}`).catch(() => null);
  if (!response) return json({ error: "Couldn't reach FitLens. Try again in a moment." }, 502);
  // Expired, or no longer staff: sign out here too
  if (response.status === 401 || response.status === 403) {
    store.set(sessionCookie("", 0));
    return json({ error: "signed_out" }, 401);
  }
  if (!response.ok) return json({ error: "Couldn't load the dashboard. Try again." }, 502);

  const body = await response.json();
  return json(body.data ?? body);
}
