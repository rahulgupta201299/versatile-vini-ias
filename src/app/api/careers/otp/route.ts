import { NextResponse } from "next/server";
import { backendPost, DEMO_OTP, isIndianMobile, issueVerifiedToken, OTP_LIVE } from "@/lib/careers";

/** POST { action: "send", phone } | { action: "verify", phone, code } */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const action = body?.action;
  const phone = body?.phone;
  if (!isIndianMobile(phone)) return NextResponse.json({ ok: false, error: "Enter a valid 10-digit mobile number" }, { status: 400 });

  if (action === "send") {
    if (!OTP_LIVE) return NextResponse.json({ ok: true, demo: true });
    const res = await backendPost("careers/otp/send", JSON.stringify({ phone })).catch(() => null);
    return res?.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ ok: false, error: "Couldn't send the code. Please try again." }, { status: 502 });
  }

  if (action === "verify") {
    const code = String(body?.code ?? "");
    if (!/^\d{6}$/.test(code)) return NextResponse.json({ ok: false, error: "Enter the 6-digit code" }, { status: 400 });
    let valid = false;
    if (!OTP_LIVE) valid = code === DEMO_OTP;
    else {
      const res = await backendPost("careers/otp/verify", JSON.stringify({ phone, code })).catch(() => null);
      valid = !!res?.ok;
    }
    return valid ? NextResponse.json({ ok: true, token: issueVerifiedToken(phone) }) : NextResponse.json({ ok: false, error: "Incorrect code. Please check and try again." }, { status: 400 });
  }

  return NextResponse.json({ ok: false, error: "Unknown action" }, { status: 400 });
}
