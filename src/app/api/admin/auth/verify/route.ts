import { NextResponse } from "next/server";
import { resendOtp, verifyOtp } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

/** POST { challengeId, code } → sets the 2-day session cookie.  POST { challengeId, resend: true } → re-sends the OTP. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const challengeId = typeof body?.challengeId === "string" ? body.challengeId : "";

  if (!challengeId) return NextResponse.json({ ok: false, error: "Please sign in again." }, { status: 400 });

  const r = body?.resend ? await resendOtp(challengeId) : await verifyOtp(challengeId, String(body?.code || ""));

  return r.ok ? NextResponse.json(r) : NextResponse.json({ ok: false, error: r.error }, { status: r.status });
}
