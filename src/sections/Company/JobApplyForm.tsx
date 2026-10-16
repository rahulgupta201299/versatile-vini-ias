"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Check, CheckCircle2, FileUp, Link2, Lock, Pencil, Send, ShieldCheck, X } from "lucide-react";
import { CareerJob } from "@/types";
import { COLORS } from "@/theme/colors";
import { sanitizeMobile, validateMobile } from "@/utils/validation";
import ShareBlog from "@/sections/Blog/ShareBlog";
import { fieldSx, lightPill, solidPill } from "./careerStyles";
import { jobUrl, shareText } from "./careerUtils";

const VERIFIED_KEY = "vini_careers_verified"; // sessionStorage: { phone, token } — skip OTP for the next role
const PROFILE_KEY = "vini_careers_profile"; // localStorage: name/email/… — pre-fill next time
const RESEND_SECONDS = 30;
const MAX_RESUME = 5 * 1024 * 1024;
const EXPERIENCE = ["Fresher", "Less than 1 year", "1–3 years", "3–5 years", "5+ years"];

type Profile = { name: string; email: string; experience: string; city: string; link: string };
const EMPTY: Profile = { name: "", email: "", experience: "", city: "", link: "" };

const store = {
  get<T>(kind: "local" | "session", key: string): T | null {
    try {
      const raw = (kind === "local" ? localStorage : sessionStorage).getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },
  set(kind: "local" | "session", key: string, value: unknown) {
    try {
      (kind === "local" ? localStorage : sessionStorage).setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable — the form still works, it just won't remember */
    }
  },
  del(kind: "local" | "session", key: string) {
    try {
      (kind === "local" ? localStorage : sessionStorage).removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

async function post<T>(url: string, body: BodyInit, json = true): Promise<T & { ok: boolean; error?: string }> {
  try {
    const res = await fetch(url, { method: "POST", body, headers: json ? { "Content-Type": "application/json" } : undefined });
    return await res.json();
  } catch {
    return { ok: false, error: "Network error — please check your connection." } as T & { ok: boolean; error?: string };
  }
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <Typography component="span" sx={{ display: "block", mb: 0.6, color: COLORS.navy, fontWeight: 700, fontSize: "0.82rem", letterSpacing: ".02em" }}>
      {children}
      {required && <Box component="span" sx={{ color: COLORS.red }}> *</Box>}
    </Typography>
  );
}

function Step({ n, label, done, active }: { n: number; label: string; done: boolean; active: boolean }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box sx={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 800, bgcolor: done ? COLORS.success : active ? COLORS.red : "#FFFFFF", color: done || active ? "#FFFFFF" : COLORS.muted, border: `1.5px solid ${done ? COLORS.success : active ? COLORS.red : COLORS.border}` }}>
        {done ? <Check size={15} strokeWidth={3} /> : n}
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", color: done || active ? COLORS.navy : COLORS.muted }}>{label}</Typography>
    </Box>
  );
}

/** One-card application: verify phone (inline OTP, auto-submits) → details unlock → submit. Remembers the candidate for the next role. */
export default function JobApplyForm({ job }: { job: CareerJob }) {
  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [demo, setDemo] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpErr, setOtpErr] = useState("");
  const [busy, setBusy] = useState<"" | "send" | "verify" | "submit">("");
  const [cooldown, setCooldown] = useState(0);
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState<Profile>(EMPTY);
  const [resume, setResume] = useState<File | null>(null);
  const [useLink, setUseLink] = useState(false);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof Profile | "resume" | "form", string>>>({});
  const [done, setDone] = useState(false);
  const [drag, setDrag] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const verified = !!token;

  // Restore a verified phone (this session) and saved details (this device).
  useEffect(() => {
    const v = store.get<{ phone: string; token: string; exp: number }>("session", VERIFIED_KEY);
    if (v && v.exp > Date.now()) {
      setPhone(v.phone);
      setToken(v.token);
    }
    const p = store.get<Profile>("local", PROFILE_KEY);
    if (p) setProfile({ ...EMPTY, ...p });
  }, []);

  useEffect(() => {
    if (!cooldown) return;
    const t = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearTimeout(t);
  }, [cooldown]);

  const sendOtp = async () => {
    const err = validateMobile(phone);
    setPhoneErr(err);
    if (err) return;
    setBusy("send");
    const r = await post<{ demo?: boolean }>("/api/careers/otp", JSON.stringify({ action: "send", phone }));
    setBusy("");
    if (!r.ok) return setPhoneErr(r.error || "Couldn't send the code");
    setOtpSent(true);
    setDemo(!!r.demo);
    setOtp(["", "", "", "", "", ""]);
    setOtpErr("");
    setCooldown(RESEND_SECONDS);
    window.setTimeout(() => otpRefs.current[0]?.focus(), 50);
  };

  const verifyOtp = async (code: string) => {
    setBusy("verify");
    const r = await post<{ token?: string }>("/api/careers/otp", JSON.stringify({ action: "verify", phone, code }));
    setBusy("");
    if (!r.ok || !r.token) {
      setOtpErr(r.error || "Incorrect code");
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
      return;
    }
    setToken(r.token);
    store.set("session", VERIFIED_KEY, { phone, token: r.token, exp: Date.now() + 2 * 60 * 60 * 1000 });
  };

  const setDigits = (start: number, raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (!digits && raw !== "") return;
    const next = [...otp];
    if (!digits) next[start] = "";
    digits.split("").slice(0, 6 - start).forEach((d, k) => (next[start + k] = d));
    setOtp(next);
    setOtpErr("");
    const filled = next.join("");
    if (filled.length === 6 && !next.includes("")) verifyOtp(filled);
    else otpRefs.current[Math.min(start + Math.max(digits.length, 1), 5)]?.focus();
  };

  const changeNumber = () => {
    setToken("");
    setOtpSent(false);
    setOtp(["", "", "", "", "", ""]);
    store.del("session", VERIFIED_KEY);
  };

  const pickFile = (f: File | undefined | null) => {
    if (!f) return;
    const okType = /\.(pdf|docx?)$/i.test(f.name);
    if (!okType) return setErrors((e) => ({ ...e, resume: "Upload a PDF or Word file" }));
    if (f.size > MAX_RESUME) return setErrors((e) => ({ ...e, resume: "File must be under 5 MB" }));
    setResume(f);
    setErrors((e) => ({ ...e, resume: "" }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (profile.name.trim().length < 2) e.name = "Enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(profile.email.trim())) e.email = "Enter a valid email";
    if (!profile.experience) e.experience = "Select your experience";
    if (useLink ? !/^https?:\/\/\S+$/.test(profile.link.trim()) : !resume) e.resume = useLink ? "Paste a valid link (https://…)" : "Upload your resume";
    setErrors(e);
    return !Object.values(e).some(Boolean);
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!verified || !validate()) return;
    const fd = new FormData();
    fd.set("token", token);
    fd.set("job", job.id);
    fd.set("name", profile.name.trim());
    fd.set("email", profile.email.trim());
    fd.set("experience", profile.experience);
    fd.set("city", profile.city.trim());
    fd.set("note", note.trim());
    if (useLink) fd.set("link", profile.link.trim());
    else if (resume) fd.set("resume", resume);
    setBusy("submit");
    const r = await post("/api/careers/apply", fd, false);
    setBusy("");
    if (!r.ok) {
      if (r.error?.includes("verify")) changeNumber();
      return setErrors({ form: r.error || "Couldn't submit — please try again." });
    }
    store.set("local", PROFILE_KEY, { ...profile, link: useLink ? profile.link : "" });
    setDone(true);
  };

  const set = (k: keyof Profile) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile((p) => ({ ...p, [k]: e.target.value }));
    setErrors((x) => ({ ...x, [k]: "" }));
  };
  const errText = (msg?: string) => msg ? <Typography role="alert" sx={{ mt: 0.5, color: COLORS.red, fontSize: "0.8rem", fontWeight: 600 }}>{msg}</Typography> : null;
  const errBorder = (msg?: string) => (msg ? { borderColor: COLORS.red } : {});

  if (done) {
    return (
      <Box sx={{ textAlign: "center", py: 3 }}>
        <Box sx={{ mx: "auto", width: 64, height: 64, borderRadius: "50%", bgcolor: "#DCFCE7", color: COLORS.success, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CheckCircle2 size={34} />
        </Box>
        <Typography sx={{ mt: 2, fontWeight: 800, color: COLORS.navy, fontSize: "1.25rem" }}>Application sent!</Typography>
        <Typography sx={{ mt: 0.75, color: COLORS.textSecondary, fontSize: "0.95rem" }}>
          Thanks {profile.name.split(" ")[0]} — we&apos;ve received your application for <b>{job.title}</b>. Our team will reach out on +91 {phone} or {profile.email}.
        </Typography>
        <Box sx={{ mt: 2.5, display: "flex", gap: 1, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          <Box component={Link} href="/careers#openings" sx={solidPill}>Browse more roles</Box>
          <ShareBlog variant="icon" title={job.title} message={shareText(job)} url={jobUrl(job.id)} id={job.id} campaign={`job_${job.id}`} dialogTitle="Share this job" />
        </Box>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
        <Step n={1} label="Verify phone" done={verified} active={!verified} />
        <Box sx={{ flex: 1, height: 2, borderRadius: 1, bgcolor: verified ? COLORS.success : COLORS.border }} />
        <Step n={2} label="Your details" done={false} active={verified} />
      </Box>

      {/* 1 — phone + inline OTP */}
      <Label required>Mobile number</Label>
      {verified ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.75, height: 46, borderRadius: "12px", border: "1.5px solid #BBF7D0", bgcolor: "#F0FDF4" }}>
          <ShieldCheck size={18} color={COLORS.success} />
          <Typography sx={{ fontWeight: 700, color: COLORS.navy }}>+91 {phone}</Typography>
          <Box component="span" sx={{ px: 1, py: 0.2, borderRadius: 999, bgcolor: "#DCFCE7", color: "#166534", fontSize: "0.72rem", fontWeight: 800 }}>Verified</Box>
          <Box component="button" type="button" onClick={changeNumber} aria-label="Change number" sx={{ ml: "auto", display: "inline-flex", alignItems: "center", gap: 0.5, border: "none", bgcolor: "transparent", color: COLORS.muted, fontFamily: "inherit", fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", "&:hover": { color: COLORS.red } }}>
            <Pencil size={14} /> Change
          </Box>
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box sx={{ position: "relative", flex: 1 }}>
              <Box sx={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontWeight: 700, color: COLORS.navy, fontSize: "0.95rem" }}>+91</Box>
              <Box
                component="input"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                value={phone}
                disabled={otpSent}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPhone(sanitizeMobile(e.target.value));
                  setPhoneErr("");
                }}
                onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && (e.preventDefault(), sendOtp())}
                placeholder="10-digit mobile number"
                aria-label="Mobile number"
                sx={{ ...fieldSx, pl: 6, ...errBorder(phoneErr) }}
              />
            </Box>
            {otpSent ? (
              <Box component="button" type="button" onClick={() => setOtpSent(false)} sx={{ ...lightPill, height: 46, borderRadius: "12px", px: 1.75 }}>
                <Pencil size={15} /> Edit
              </Box>
            ) : (
              <Box component="button" type="button" onClick={sendOtp} disabled={busy === "send"} sx={{ ...solidPill, height: 46, borderRadius: "12px", px: 2 }}>
                {busy === "send" ? <CircularProgress size={18} sx={{ color: "#FFF" }} /> : "Get OTP"}
              </Box>
            )}
          </Box>
          {errText(phoneErr)}
          {!otpSent && <Typography sx={{ mt: 0.75, color: COLORS.muted, fontSize: "0.8rem" }}>We&apos;ll send a one-time code on WhatsApp/SMS to verify it&apos;s you.</Typography>}

          {otpSent && (
            <Box sx={{ mt: 1.75, p: 1.75, borderRadius: "12px", bgcolor: COLORS.redTintSoft, border: `1px solid ${COLORS.redTintHover}` }}>
              <Typography sx={{ color: COLORS.body, fontSize: "0.85rem", mb: 1.25 }}>
                Enter the 6-digit code sent to <b>+91 {phone}</b>
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: { xs: 0.75, sm: 1 }, maxWidth: 340 }} onPaste={(e: React.ClipboardEvent) => { e.preventDefault(); setDigits(0, e.clipboardData.getData("text")); }}>
                {otp.map((d, i) => (
                  <Box
                    key={i}
                    component="input"
                    ref={(el: HTMLInputElement | null) => { otpRefs.current[i] = el; }}
                    value={d}
                    inputMode="numeric"
                    autoComplete={i === 0 ? "one-time-code" : "off"}
                    maxLength={6}
                    disabled={busy === "verify"}
                    aria-label={`Digit ${i + 1}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDigits(i, e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent) => { if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus(); }}
                    sx={{ ...fieldSx, px: 0, height: 48, textAlign: "center", fontSize: "1.2rem", fontWeight: 800, ...errBorder(otpErr) }}
                  />
                ))}
              </Box>
              {errText(otpErr)}
              <Box sx={{ mt: 1.25, display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", fontSize: "0.82rem" }}>
                {busy === "verify" ? (
                  <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, color: COLORS.body }}><CircularProgress size={14} /> Verifying…</Box>
                ) : cooldown ? (
                  <Typography sx={{ color: COLORS.muted, fontSize: "0.82rem" }}>Resend code in {cooldown}s</Typography>
                ) : (
                  <Box component="button" type="button" onClick={sendOtp} sx={{ border: "none", bgcolor: "transparent", p: 0, color: COLORS.red, fontFamily: "inherit", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>Resend code</Box>
                )}
                {demo && <Box component="span" sx={{ ml: "auto", px: 1, py: 0.25, borderRadius: "6px", bgcolor: "#FFF7CC", color: "#8A6D00", fontWeight: 700, fontSize: "0.74rem" }}>Demo mode · code 123456</Box>}
              </Box>
            </Box>
          )}
        </>
      )}

      {/* 2 — details (unlock after verification) */}
      <Box sx={{ position: "relative", mt: 2.5, pt: 2.5, borderTop: `1px dashed ${COLORS.border}` }}>
        {!verified && (
          <Box sx={{ position: "absolute", inset: 0, zIndex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", pt: 6, background: "rgba(255,255,255,.72)", backdropFilter: "blur(1.5px)" }}>
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, px: 1.5, py: 0.75, borderRadius: 999, bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 6px 16px rgba(15,23,42,.08)", color: COLORS.body, fontSize: "0.85rem", fontWeight: 700 }}>
              <Lock size={15} /> Verify your number to continue
            </Box>
          </Box>
        )}
        <Box component="fieldset" disabled={!verified} sx={{ border: "none", m: 0, p: 0, minWidth: 0, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.75 }}>
          <Box>
            <Label required>Full name</Label>
            <Box component="input" value={profile.name} onChange={set("name")} autoComplete="name" placeholder="Your name" sx={{ ...fieldSx, ...errBorder(errors.name) }} />
            {errText(errors.name)}
          </Box>
          <Box>
            <Label required>Email</Label>
            <Box component="input" type="email" value={profile.email} onChange={set("email")} autoComplete="email" placeholder="you@example.com" sx={{ ...fieldSx, ...errBorder(errors.email) }} />
            {errText(errors.email)}
          </Box>
          <Box>
            <Label required>Experience</Label>
            <Box component="select" value={profile.experience} onChange={set("experience")} sx={{ ...fieldSx, cursor: "pointer", color: profile.experience ? COLORS.ink : "#9CA3AF", ...errBorder(errors.experience) }}>
              <option value="">Select</option>
              {EXPERIENCE.map((x) => <option key={x} value={x}>{x}</option>)}
            </Box>
            {errText(errors.experience)}
          </Box>
          <Box>
            <Label>Current city</Label>
            <Box component="input" value={profile.city} onChange={set("city")} autoComplete="address-level2" placeholder="e.g. Patna" sx={fieldSx} />
          </Box>

          <Box sx={{ gridColumn: "1 / -1" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Label required>{useLink ? "Resume / portfolio link" : "Resume"}</Label>
              <Box component="button" type="button" onClick={() => { setUseLink((v) => !v); setErrors((e) => ({ ...e, resume: "" })); }} sx={{ mb: 0.6, display: "inline-flex", alignItems: "center", gap: 0.5, border: "none", bgcolor: "transparent", p: 0, color: COLORS.red, fontFamily: "inherit", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}>
                {useLink ? <><FileUp size={14} /> Upload a file instead</> : <><Link2 size={14} /> Paste a link instead</>}
              </Box>
            </Box>
            {useLink ? (
              <Box component="input" type="url" value={profile.link} onChange={set("link")} placeholder="https://drive.google.com/… or LinkedIn" sx={{ ...fieldSx, ...errBorder(errors.resume) }} />
            ) : resume ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, px: 1.75, height: 52, borderRadius: "12px", border: "1.5px solid #BBF7D0", bgcolor: "#F0FDF4" }}>
                <CheckCircle2 size={18} color={COLORS.success} />
                <Typography noWrap sx={{ flex: 1, minWidth: 0, fontWeight: 600, color: COLORS.navy, fontSize: "0.9rem" }}>{resume.name}</Typography>
                <Typography sx={{ color: COLORS.muted, fontSize: "0.78rem" }}>{(resume.size / 1024 / 1024).toFixed(1)} MB</Typography>
                <Box component="button" type="button" aria-label="Remove file" onClick={() => setResume(null)} sx={{ border: "none", bgcolor: "transparent", color: COLORS.muted, cursor: "pointer", display: "flex", "&:hover": { color: COLORS.red } }}><X size={18} /></Box>
              </Box>
            ) : (
              <Box
                component="label"
                onDragOver={(e: React.DragEvent) => { e.preventDefault(); setDrag(true); }}
                onDragLeave={() => setDrag(false)}
                onDrop={(e: React.DragEvent) => { e.preventDefault(); setDrag(false); pickFile(e.dataTransfer.files?.[0]); }}
                sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5, py: 2.25, px: 2, borderRadius: "12px", border: `1.5px dashed ${errors.resume ? COLORS.red : drag ? COLORS.red : COLORS.border}`, bgcolor: drag ? COLORS.redTint : COLORS.surface, cursor: "pointer", textAlign: "center", transition: "all .2s", "&:hover": { borderColor: COLORS.red, bgcolor: COLORS.redTintSoft } }}
              >
                <FileUp size={22} color={COLORS.red} />
                <Typography sx={{ fontWeight: 700, color: COLORS.navy, fontSize: "0.9rem" }}>Tap to upload or drag &amp; drop</Typography>
                <Typography sx={{ color: COLORS.muted, fontSize: "0.78rem" }}>PDF or Word · max 5 MB</Typography>
                <input ref={fileRef} type="file" hidden accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => pickFile(e.target.files?.[0])} />
              </Box>
            )}
            {errText(errors.resume)}
          </Box>

          <Box sx={{ gridColumn: "1 / -1" }}>
            <Label>Anything you&apos;d like us to know? (optional)</Label>
            <Box component="textarea" rows={3} value={note} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value.slice(0, 600))} placeholder="Notice period, expected salary, portfolio highlights…" sx={{ ...fieldSx, height: "auto", py: 1.25, resize: "vertical", lineHeight: 1.5 }} />
          </Box>
        </Box>

        {errors.form && <Box role="alert" sx={{ mt: 2, p: 1.25, borderRadius: "10px", bgcolor: COLORS.redTint, color: COLORS.redDark, fontSize: "0.88rem", fontWeight: 600 }}>{errors.form}</Box>}

        <Box component="button" type="submit" disabled={!verified || busy === "submit"} sx={{ ...solidPill, mt: 2.5, width: "100%", height: 50, fontSize: "1rem" }}>
          {busy === "submit" ? <CircularProgress size={20} sx={{ color: "#FFF" }} /> : <><Send size={17} /> Submit application</>}
        </Box>
        <Typography sx={{ mt: 1, textAlign: "center", color: COLORS.muted, fontSize: "0.75rem" }}>Your details are used only for hiring at VINI GROUP.</Typography>
      </Box>
    </Box>
  );
}
