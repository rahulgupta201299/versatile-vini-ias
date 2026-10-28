"use client";

// [2FA OFF] import React, { useEffect, useRef, useState } from "react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
// [2FA OFF] import { ArrowLeft, Eye, EyeOff, KeyRound, Lock, Mail, ShieldCheck } from "lucide-react";
import { Eye, EyeOff, KeyRound, Lock, Mail } from "lucide-react";
import { COLORS } from "@/theme/colors";

// [2FA OFF] const RESEND_SECONDS = 30;
// [2FA OFF] const EMPTY = ["", "", "", "", "", ""];

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

    return (await res.json()) as { ok: boolean; error?: string; challengeId?: string; signedIn?: boolean; demo?: boolean };
  } catch {
    return { ok: false, error: "Network error — check your connection." };
  }
}

/** Only allow redirects back into the admin panel. */
const safeNext = (n: string | null) => (n && /^\/admin(\/|$|\?)/.test(n) && !n.startsWith("/admin/login") ? n : "/admin");

/**
 * Admin sign-in: email + password → 6-digit email OTP (auto-submits).
 * 2FA IS TEMPORARILY DISABLED: every OTP-step line is commented with "// [2FA OFF]".
 * To restore: uncomment those lines, delete the "2FA is temporarily disabled" lines below, and set ADMIN_2FA_ENABLED=true in Backend/.env.
 */
export default function AdminLoginForm({ next, demo }: { next: string | null; demo: boolean }) {
  const router = useRouter();
  // [2FA OFF] const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  // [2FA OFF] const [challengeId, setChallengeId] = useState("");
  // [2FA OFF] const [otp, setOtp] = useState(EMPTY);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  // [2FA OFF] const [cooldown, setCooldown] = useState(0);
  // [2FA OFF] const [info, setInfo] = useState("");
  // [2FA OFF] const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // [2FA OFF] useEffect(() => {
    // [2FA OFF] if (!cooldown) return;
    // [2FA OFF] const t = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
    // [2FA OFF] return () => window.clearTimeout(t);
  // [2FA OFF] }, [cooldown]);

  const submitCredentials = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setError("Enter a valid email address.");

    if (!password) return setError("Enter your password.");

    setBusy(true);
    setError("");
    const r = await post("/api/admin/auth/login", { email: email.trim(), password });

    if (r.ok && r.signedIn) {
      // signed in (2FA disabled in the backend, or a device trusted in the last 48h)
      router.replace(safeNext(next));
      router.refresh();

      return;
    }

    setBusy(false);

    // 2FA is temporarily disabled: the backend (ADMIN_2FA_ENABLED=false) signs in with email + password only.
    if (!r.ok) return setError(r.error || "Sign-in failed.");

    setError("Email verification is switched on in the backend. Turn it off (ADMIN_2FA_ENABLED=false) or restore the OTP step in this form.");
    // [2FA OFF] if (!r.ok || !r.challengeId) return setError(r.error || "Sign-in failed.");
    // [2FA OFF] setChallengeId(r.challengeId);
    // [2FA OFF] setPassword("");
    // [2FA OFF] setOtp(EMPTY);
    // [2FA OFF] setStep("otp");
    // [2FA OFF] setCooldown(RESEND_SECONDS);
    // [2FA OFF] window.setTimeout(() => otpRefs.current[0]?.focus(), 50);
  };

  // [2FA OFF] const verify = async (code: string) => {
    // [2FA OFF] setBusy(true);
    // [2FA OFF] setError("");
    // [2FA OFF] const r = await post("/api/admin/auth/verify", { challengeId, code });
    // [2FA OFF] if (!r.ok) {
      // [2FA OFF] setBusy(false);
      // [2FA OFF] setError(r.error || "Incorrect code.");
      // [2FA OFF] setOtp(EMPTY);
      // [2FA OFF] if (/sign in again/i.test(r.error ?? "")) return;
      // [2FA OFF] return window.setTimeout(() => otpRefs.current[0]?.focus(), 30);
    // [2FA OFF] }
    // [2FA OFF] router.replace(safeNext(next));
    // [2FA OFF] router.refresh();
  // [2FA OFF] };

  // [2FA OFF] const setDigits = (start: number, raw: string) => {
    // [2FA OFF] const digits = raw.replace(/\D/g, "");
    // [2FA OFF] if (!digits && raw !== "") return;
    // [2FA OFF] const nextOtp = [...otp];
    // [2FA OFF] if (!digits) nextOtp[start] = "";
    // [2FA OFF] digits.split("").slice(0, 6 - start).forEach((d, k) => (nextOtp[start + k] = d));
    // [2FA OFF] setOtp(nextOtp);
    // [2FA OFF] setError("");
    // [2FA OFF] if (!nextOtp.includes("")) verify(nextOtp.join(""));
    // [2FA OFF] else otpRefs.current[Math.min(start + Math.max(digits.length, 1), 5)]?.focus();
  // [2FA OFF] };

  // [2FA OFF] const resend = async () => {
    // [2FA OFF] setError("");
    // [2FA OFF] setInfo("");
    // [2FA OFF] const r = await post("/api/admin/auth/verify", { challengeId, resend: true });
    // [2FA OFF] if (!r.ok) return setError(r.error || "Couldn't resend the code.");
    // [2FA OFF] setInfo("A new code has been sent.");
    // [2FA OFF] setCooldown(RESEND_SECONDS);
  // [2FA OFF] };

  // [2FA OFF] const backToCredentials = () => {
    // [2FA OFF] setStep("credentials");
    // [2FA OFF] setChallengeId("");
    // [2FA OFF] setOtp(EMPTY);
    // [2FA OFF] setError("");
    // [2FA OFF] setInfo("");
  // [2FA OFF] };

  const errorBox = error && (
    <Box role="alert" sx={{ mt: 2, p: 1.25, borderRadius: "10px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}`, color: COLORS.redDark, fontSize: "0.88rem", fontWeight: 600 }}>
      {error}
    </Box>
  );

  // [2FA OFF] if (step === "otp") {
    // [2FA OFF] return (
      // [2FA OFF] <Box>
        // [2FA OFF] <Box component="button" type="button" onClick={backToCredentials} sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, mb: 2, p: 0, border: "none", bgcolor: "transparent", color: COLORS.muted, fontFamily: "inherit", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", "&:hover": { color: COLORS.red } }}>
          // [2FA OFF] <ArrowLeft size={16} /> Use a different account
        // [2FA OFF] </Box>
        // [2FA OFF] <Box sx={{ width: 52, height: 52, borderRadius: "14px", bgcolor: COLORS.redTint, color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
          // [2FA OFF] <ShieldCheck size={26} />
        // [2FA OFF] </Box>
        // [2FA OFF] <Typography component="h1" sx={{ mt: 2, fontWeight: 800, color: COLORS.navy, fontSize: "1.45rem" }}>Check your email</Typography>
        // [2FA OFF] <Typography sx={{ mt: 0.75, color: COLORS.textSecondary, fontSize: "0.93rem", lineHeight: 1.55 }}>
          // [2FA OFF] We sent a 6-digit verification code to <b style={{ color: COLORS.navy }}>{email.trim()}</b>. It expires in 10 minutes.
        // [2FA OFF] </Typography>

        // [2FA OFF] <Box
          // [2FA OFF] role="group"
          // [2FA OFF] aria-label="Verification code"
          // [2FA OFF] onPaste={(e: React.ClipboardEvent) => {
            // [2FA OFF] e.preventDefault();
            // [2FA OFF] setDigits(0, e.clipboardData.getData("text"));
          // [2FA OFF] }}
          // [2FA OFF] sx={{ mt: 3, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: { xs: 0.75, sm: 1.25 } }}
        // [2FA OFF] >
          // [2FA OFF] {otp.map((d, i) => (
            // [2FA OFF] <Box
              // [2FA OFF] key={i}
              // [2FA OFF] component="input"
              // [2FA OFF] ref={(el: HTMLInputElement | null) => {
                // [2FA OFF] otpRefs.current[i] = el;
              // [2FA OFF] }}
              // [2FA OFF] value={d}
              // [2FA OFF] inputMode="numeric"
              // [2FA OFF] autoComplete={i === 0 ? "one-time-code" : "off"}
              // [2FA OFF] maxLength={6}
              // [2FA OFF] disabled={busy}
              // [2FA OFF] aria-label={`Digit ${i + 1}`}
              // [2FA OFF] onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDigits(i, e.target.value)}
              // [2FA OFF] onKeyDown={(e: React.KeyboardEvent) => {
                // [2FA OFF] if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
              // [2FA OFF] }}
              // [2FA OFF] sx={{ ...inputSx, px: 0, pl: 0, height: { xs: 52, sm: 58 }, textAlign: "center", fontSize: "1.4rem", fontWeight: 800, ...(error ? { borderColor: COLORS.red } : {}) }}
            // [2FA OFF] />
          // [2FA OFF] ))}
        // [2FA OFF] </Box>
        // [2FA OFF] {errorBox}
        // [2FA OFF] <Box sx={{ mt: 2.25, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, flexWrap: "wrap", fontSize: "0.88rem" }}>
          // [2FA OFF] {busy ? (
            // [2FA OFF] <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, color: COLORS.body }}>
              // [2FA OFF] <CircularProgress size={16} /> Verifying…
            // [2FA OFF] </Box>
          // [2FA OFF] ) : cooldown ? (
            // [2FA OFF] <Typography sx={{ color: COLORS.muted, fontSize: "0.88rem" }}>Resend code in {cooldown}s</Typography>
          // [2FA OFF] ) : (
            // [2FA OFF] <Box component="button" type="button" onClick={resend} sx={{ p: 0, border: "none", bgcolor: "transparent", color: COLORS.red, fontFamily: "inherit", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>
              // [2FA OFF] Resend code
            // [2FA OFF] </Box>
          // [2FA OFF] )}
          // [2FA OFF] {info && !error && <Typography sx={{ color: COLORS.success, fontSize: "0.85rem", fontWeight: 600 }}>{info}</Typography>}
        // [2FA OFF] </Box>
        // [2FA OFF] {demo && <DemoNote text="Demo mode: no email is sent — use code 123456." />}
        // [2FA OFF] <Typography sx={{ mt: 3, color: COLORS.muted, fontSize: "0.8rem" }}>You&apos;ll stay signed in for 48 hours, and this device won&apos;t ask for a code again during that time.</Typography>
      // [2FA OFF] </Box>
    // [2FA OFF] );
  // [2FA OFF] }

  return (
    <Box component="form" onSubmit={submitCredentials} noValidate>
      <Box sx={{ width: 52, height: 52, borderRadius: "14px", bgcolor: COLORS.redTint, color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <KeyRound size={26} />
      </Box>
      <Typography component="h1" sx={{ mt: 2, fontWeight: 800, color: COLORS.navy, fontSize: "1.45rem" }}>Admin sign in</Typography>
      <Typography sx={{ mt: 0.75, color: COLORS.textSecondary, fontSize: "0.93rem" }}>Authorised staff only.</Typography>

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
