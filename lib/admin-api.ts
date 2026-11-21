// Server-only helpers for /admin. The browser never sees the API token: it is
// kept in an httpOnly cookie and sent to the FitLens API from these routes.
// Import this only from app/admin/api/* (route handlers run on the server).

export const API_URL = (process.env.FITLENS_API_URL || "https://api.iamakashshetty.com/api/v1").replace(/\/$/, "");

export const SESSION_COOKIE = "fl_admin";
// Shorter than the API token (24 h): sign in again after a working day
export const SESSION_MAX_AGE = 8 * 60 * 60;

export const sessionCookie = (value: string, maxAge: number) => ({
  name: SESSION_COOKIE,
  value,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/admin",
  maxAge,
});

export async function fetchDashboard(token: string, query = "") {
  return fetch(`${API_URL}/dashboard/platform/${query}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    cache: "no-store",
  });
}

export const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
