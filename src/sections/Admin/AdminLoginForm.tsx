"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { ArrowLeft, Eye, EyeOff, KeyRound, Lock, Mail, ShieldCheck } from "lucide-react";
import { COLORS } from "@/theme/colors";

const RESEND_SECONDS = 30;
const EMPTY = ["", "", "", "", "", ""];

const inputSx = {
  width: "100%",
  height: 48,
  pl: 5.5,
  pr: 1.75,
  borderRadius: "12px",
  border: `1.5px solid ${COLORS.border}`,
  bgcolor: "#FFFFFF",
  fontFamily: "inherit",
  fontSize: "0.98rem",
  color: COLORS.ink,
  outline: "none",
  transition: "border-color .2s, box-shadow .2s",
  "&:focus": { borderColor: COLORS.red, boxShadow: `0 0 0 3px ${COLORS.redTint}` },
  "&::placeholder": { color: "#9CA3AF" },
} as const;

const primarySx = {
  width: "100%",
  height: 50,
  border: "none",
  borderRadius: "12px",
  bgcolor: COLORS.red,
  color: "#FFFFFF",
  fontFamily: "inherit",
  fontWeight: 700,
  fontSize: "1rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
  transition: "background-color .2s",
  "&:hover:not(:disabled)": { bgcolor: COLORS.redDark },
  "&:disabled": { opacity: 0.6, cursor: "not-allowed" },
} as const;

async function post(url: string, body: object) {
  try {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), credentials: "same-origin" });
    return (await res.json()) as { ok: boolean; error?: string; challengeId?: string; demo?: boolean };
  } catch {
    return { ok: false, error: "Network error — check your connection." };
  }
}

/** Only allow redirects back into the admin panel. */
const safeNext = (n: string | null) => (n && /^\/admin(\/|$|\?)/.test(n) && !n.startsWith("/admin/login") ? n : "/admin");

/** Two-step admin sign-in: email + password → 6-digit email OTP (auto-submits). */
export default function AdminLoginForm({ next, demo }: { next: string | null; demo: boolean }) {
  const router = useRouter();
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [challengeId, setChallengeId] = useState("");
  const [otp, setOtp] = useState(EMPTY);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [info, setInfo] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!cooldown) return;
    const t = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => window.clearTimeout(t);
  }, [cooldown]);

  const submitCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setError("Enter a valid email address.");
    if (!password) return setError("Enter your password.");
    setBusy(true);
    setError("");
    const r = await post("/api/admin/auth/login", { email: email.trim(), password });
    setBusy(false);
    if (!r.ok || !r.challengeId) return setError(r.error || "Sign-in failed.");
    setChallengeId(r.challengeId);
    setPassword("");
    setOtp(EMPTY);
    setStep("otp");
    setCooldown(RESEND_SECONDS);
    window.setTimeout(() => otpRefs.current[0]?.focus(), 50);
  };

  const verify = async (code: string) => {
    setBusy(true);
    setError("");
    const r = await post("/api/admin/auth/verify", { challengeId, code });
    if (!r.ok) {
      setBusy(false);
      setError(r.error || "Incorrect code.");
      setOtp(EMPTY);
      if (/sign in again/i.test(r.error ?? "")) return;
      return window.setTimeout(() => otpRefs.current[0]?.focus(), 30);
    }
    router.replace(safeNext(next));
    router.refresh();
  };

  const setDigits = (start: number, raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (!digits && raw !== "") return;
    const nextOtp = [...otp];
    if (!digits) nextOtp[start] = "";
    digits.split("").slice(0, 6 - start).forEach((d, k) => (nextOtp[start + k] = d));
    setOtp(nextOtp);
    setError("");
    if (!nextOtp.includes("")) verify(nextOtp.join(""));
    else otpRefs.current[Math.min(start + Math.max(digits.length, 1), 5)]?.focus();
  };

  const resend = async () => {
    setError("");
    setInfo("");
    const r = await post("/api/admin/auth/verify", { challengeId, resend: true });
    if (!r.ok) return setError(r.error || "Couldn't resend the code.");
    setInfo("A new code has been sent.");
    setCooldown(RESEND_SECONDS);
  };

  const backToCredentials = () => {
    setStep("credentials");
    setChallengeId("");
    setOtp(EMPTY);
    setError("");
    setInfo("");
  };

  const errorBox = error && (
    <Box role="alert" sx={{ mt: 2, p: 1.25, borderRadius: "10px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}`, color: COLORS.redDark, fontSize: "0.88rem", fontWeight: 600 }}>
      {error}
    </Box>
  );

  if (step === "otp") {
    return (
      <Box>
        <Box component="button" type="button" onClick={backToCredentials} sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, mb: 2, p: 0, border: "none", bgcolor: "transparent", color: COLORS.muted, fontFamily: "inherit", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", "&:hover": { color: COLORS.red } }}>
          <ArrowLeft size={16} /> Use a different account
        </Box>
        <Box sx={{ width: 52, height: 52, borderRadius: "14px", bgcolor: COLORS.redTint, color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ShieldCheck size={26} />
        </Box>
        <Typography component="h1" sx={{ mt: 2, fontWeight: 800, color: COLORS.navy, fontSize: "1.45rem" }}>Check your email</Typography>
        <Typography sx={{ mt: 0.75, color: COLORS.textSecondary, fontSize: "0.93rem", lineHeight: 1.55 }}>
          We sent a 6-digit verification code to <b style={{ color: COLORS.navy }}>{email.trim()}</b>. It expires in 10 minutes.
        </Typography>

        <Box
          role="group"
          aria-label="Verification code"
          onPaste={(e: React.ClipboardEvent) => {
            e.preventDefault();
            setDigits(0, e.clipboardData.getData("text"));
          }}
          sx={{ mt: 3, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: { xs: 0.75, sm: 1.25 } }}
        >
          {otp.map((d, i) => (
            <Box
              key={i}
              component="input"
              ref={(el: HTMLInputElement | null) => {
                otpRefs.current[i] = el;
              }}
              value={d}
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              maxLength={6}
              disabled={busy}
              aria-label={`Digit ${i + 1}`}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDigits(i, e.target.value)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
              }}
              sx={{ ...inputSx, px: 0, pl: 0, height: { xs: 52, sm: 58 }, textAlign: "center", fontSize: "1.4rem", fontWeight: 800, ...(error ? { borderColor: COLORS.red } : {}) }}
            />
          ))}
        </Box>
        {errorBox}
        <Box sx={{ mt: 2.25, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, flexWrap: "wrap", fontSize: "0.88rem" }}>
          {busy ? (
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, color: COLORS.body }}>
              <CircularProgress size={16} /> Verifying…
            </Box>
          ) : cooldown ? (
            <Typography sx={{ color: COLORS.muted, fontSize: "0.88rem" }}>Resend code in {cooldown}s</Typography>
          ) : (
            <Box component="button" type="button" onClick={resend} sx={{ p: 0, border: "none", bgcolor: "transparent", color: COLORS.red, fontFamily: "inherit", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>
              Resend code
            </Box>
          )}
          {info && !error && <Typography sx={{ color: COLORS.success, fontSize: "0.85rem", fontWeight: 600 }}>{info}</Typography>}
        </Box>
        {demo && <DemoNote text="Demo mode: no email is sent — use code 123456." />}
        <Typography sx={{ mt: 3, color: COLORS.muted, fontSize: "0.8rem" }}>You&apos;ll stay signed in on this device for 2 days.</Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={submitCredentials} noValidate>
      <Box sx={{ width: 52, height: 52, borderRadius: "14px", bgcolor: COLORS.redTint, color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <KeyRound size={26} />
      </Box>
      <Typography component="h1" sx={{ mt: 2, fontWeight: 800, color: COLORS.navy, fontSize: "1.45rem" }}>Admin sign in</Typography>
      <Typography sx={{ mt: 0.75, color: COLORS.textSecondary, fontSize: "0.93rem" }}>Authorised staff only. A verification code will be sent to your email.</Typography>

      <Box component="label" sx={{ display: "block", mt: 3 }}>
        <Typography component="span" sx={{ display: "block", mb: 0.75, color: COLORS.navy, fontWeight: 700, fontSize: "0.85rem" }}>Email</Typography>
        <Box sx={{ position: "relative" }}>
          <Mail size={18} color={COLORS.muted} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
          <Box component="input" type="email" name="email" autoComplete="username" autoFocus value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value); setError(""); }} placeholder="you@groupvini.in" sx={inputSx} />
        </Box>
      </Box>

      <Box component="label" sx={{ display: "block", mt: 2 }}>
        <Typography component="span" sx={{ display: "block", mb: 0.75, color: COLORS.navy, fontWeight: 700, fontSize: "0.85rem" }}>Password</Typography>
        <Box sx={{ position: "relative" }}>
          <Lock size={18} color={COLORS.muted} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
          <Box component="input" type={showPw ? "text" : "password"} name="password" autoComplete="current-password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value); setError(""); }} placeholder="Enter your password" sx={{ ...inputSx, pr: 6 }} />
          <Box component="button" type="button" onClick={() => setShowPw((v) => !v)} aria-label={showPw ? "Hide password" : "Show password"} sx={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, border: "none", borderRadius: "8px", bgcolor: "transparent", color: COLORS.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", "&:hover": { color: COLORS.navy, bgcolor: COLORS.surface } }}>
            {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
          </Box>
        </Box>
      </Box>

      {errorBox}
      <Box component="button" type="submit" disabled={busy} sx={{ ...primarySx, mt: 3 }}>
        {busy ? <CircularProgress size={20} sx={{ color: "#FFFFFF" }} /> : "Continue"}
      </Box>
      {demo && <DemoNote text="Demo mode: sign in with the ADMIN_DEMO_EMAIL / ADMIN_DEMO_PASSWORD from your .env file." />}
    </Box>
  );
}

function DemoNote({ text }: { text: string }) {
  return (
    <Box sx={{ mt: 2.5, p: 1.25, borderRadius: "10px", bgcolor: "#FFF7CC", border: "1px solid #F5E08A", color: "#7A6000", fontSize: "0.8rem", fontWeight: 600 }}>
      {text}
    </Box>
  );
}
