import { cookies } from "next/headers";
import { json, sessionCookie } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

export async function POST() {
  (await cookies()).set(sessionCookie("", 0));
  return json({ ok: true });
}
