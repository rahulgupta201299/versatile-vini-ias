import { NextResponse } from "next/server";
import { CAREERS_CONTENT } from "@/data/company";
import { backendPost, OTP_LIVE, readVerifiedToken } from "@/lib/careers";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const RESUME_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

/** POST multipart/form-data: token, job, name, email, experience, location, link?, note?, resume? */
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ ok: false, error: "Invalid form data" }, { status: 400 });

  const phone = readVerifiedToken(form.get("token"));
  if (!phone) return NextResponse.json({ ok: false, error: "Please verify your phone number again." }, { status: 401 });

  const job = String(form.get("job") ?? "");
  if (!CAREERS_CONTENT.jobs.some((j) => j.id === job)) return NextResponse.json({ ok: false, error: "This role is no longer open." }, { status: 404 });

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  if (name.length < 2) return NextResponse.json({ ok: false, error: "Please enter your name" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return NextResponse.json({ ok: false, error: "Please enter a valid email" }, { status: 400 });

  const resume = form.get("resume");
  const link = String(form.get("link") ?? "").trim();
  if (resume instanceof File && resume.size > 0) {
    if (resume.size > MAX_RESUME_BYTES) return NextResponse.json({ ok: false, error: "Resume must be under 5 MB" }, { status: 400 });
    if (!RESUME_TYPES.includes(resume.type)) return NextResponse.json({ ok: false, error: "Upload a PDF or Word file" }, { status: 400 });
  } else if (!/^https?:\/\/\S+$/.test(link)) {
    return NextResponse.json({ ok: false, error: "Add your resume or a link to it" }, { status: 400 });
  }

  form.delete("token");
  form.set("phone", phone);

  if (OTP_LIVE) {
    const res = await backendPost("careers/apply", form, false).catch(() => null);
    if (!res?.ok) return NextResponse.json({ ok: false, error: "Couldn't submit right now. Please try again." }, { status: 502 });
  }
  // demo mode: accepted without storing — connect the backend (CAREERS_OTP_MODE=live) to receive applications.
  return NextResponse.json({ ok: true });
}
