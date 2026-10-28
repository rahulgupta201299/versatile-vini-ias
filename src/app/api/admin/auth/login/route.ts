import { NextResponse } from "next/server";
import { isEmail, startLogin } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

/** POST { email, password } → { challengeId } (OTP sent to the admin's email), or { signedIn: true } on a trusted device (48h). */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!isEmail(email) || !password || password.length > 200) return NextResponse.json({ ok: false, error: "Enter a valid email and password." }, { status: 400 });

  const r = await startLogin(email, password);

  return r.ok ? NextResponse.json(r) : NextResponse.json({ ok: false, error: r.error }, { status: r.status });
}
