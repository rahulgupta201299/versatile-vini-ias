"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { ArrowLeft, BookOpen, Camera, CalendarClock, ChevronRight, FilePenLine, ImagePlus, Mic, MicOff, Newspaper, Paperclip, Plus, Search, Send, Smartphone, Target, X } from "lucide-react";
import { PLAY_STORE_URL } from "@/data/app";
import StoreBadges from "@/components/StoreBadges";

/* VINI AI sub-brand palette (from the logo). */
const AI = { orange: "#EC5530", orangeDark: "#D5441F", soft: "#FFF4EF", softer: "#FFF9F6", line: "#FAD9CC", pink: "#E0447A", pinkSoft: "#FDEEF4", ink: "#111827", body: "#4B5563", muted: "#9CA3AF" };

const TARGET_KEY = "vini_ai_target";
const EXAMS = ["UPSC CSE", "BPSC", "State PCS", "Judiciary", "CLAT", "Other"];
const YEARS = ["2026", "2027", "2028"];

const TASKS = [
  { title: "Evaluate Mains Answer", icon: FilePenLine, tone: "orange", prompt: "Evaluate my Mains answer: " },
  { title: "Daily Current Affairs Summary", icon: Newspaper, tone: "pink", prompt: "Give me today's current affairs summary for UPSC" },
  { title: "Create My Study Routine", icon: CalendarClock, tone: "orange", prompt: "Create a daily study routine for me for UPSC preparation" },
  { title: "Make Notes from NCERT", icon: BookOpen, tone: "pink", prompt: "Make short notes from NCERT chapter: " },
] as const;

type SpeechRec = { lang: string; interimResults: boolean; start: () => void; stop: () => void; onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null; onend: (() => void) | null; onerror: (() => void) | null };

/** Voice input via the Web Speech API (Chrome/Edge/Android). Returns null where unsupported. */
function useDictation(onText: (t: string) => void) {
  const recRef = useRef<SpeechRec | null>(null);
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  useEffect(() => {
    const w = window as unknown as { SpeechRecognition?: new () => SpeechRec; webkitSpeechRecognition?: new () => SpeechRec };
    setSupported(!!(w.SpeechRecognition || w.webkitSpeechRecognition));
  }, []);
  const toggle = () => {
    if (listening) return recRef.current?.stop();
    const w = window as unknown as { SpeechRecognition?: new () => SpeechRec; webkitSpeechRecognition?: new () => SpeechRec };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = "en-IN";
    rec.interimResults = false;
    rec.onresult = (e) => onText(e.results[0][0].transcript);
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    setListening(true);
    rec.start();
  };
  return { listening, supported, toggle };
}

function MicButton({ onText }: { onText: (t: string) => void }) {
  const { listening, supported, toggle } = useDictation(onText);
  if (!supported) return null;
  return (
    <IconButton aria-label={listening ? "Stop voice input" : "Ask by voice"} onClick={toggle} sx={{ color: listening ? AI.orange : AI.ink, bgcolor: listening ? AI.soft : "transparent", animation: listening ? "aiPulse 1.2s ease-in-out infinite" : "none", "@keyframes aiPulse": { "0%,100%": { boxShadow: `0 0 0 0 ${AI.orange}55` }, "50%": { boxShadow: `0 0 0 8px ${AI.orange}00` } } }}>
      {listening ? <MicOff size={22} /> : <Mic size={22} />}
    </IconButton>
  );
}

/** VINI AI "Ask Doubt" landing — search, quick tasks, photo doubts and an ask bar. Answers open in the VINI Learning App. */
export default function ViniAiTutor() {
  const [query, setQuery] = useState("");
  const [ask, setAsk] = useState("");
  const [photo, setPhoto] = useState<{ name: string; url: string } | null>(null);
  const [handoff, setHandoff] = useState<string | null>(null);
  const [targetOpen, setTargetOpen] = useState(false);
  const [target, setTarget] = useState<{ exam: string; year: string } | null>(null);
  const [draft, setDraft] = useState({ exam: EXAMS[0], year: YEARS[1] });
  const fileRef = useRef<HTMLInputElement>(null);
  const askRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const t = JSON.parse(localStorage.getItem(TARGET_KEY) || "null");
      if (t?.exam && t?.year) {
        setTarget(t);
        setDraft(t);
      }
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => () => { if (photo) URL.revokeObjectURL(photo.url); }, [photo]);

  const router = useRouter();
  /** Back to the previous page; straight to the VINI IAS home when VINI AI was opened directly. */
  const goBack = () => {
    const fromSite = typeof document !== "undefined" && document.referrer.startsWith(window.location.origin);
    if (fromSite && window.history.length > 1) router.back();
    else router.push("/");
  };
  const exam = target?.exam.split(" ")[0] ?? "UPSC";
  const submit = (text: string) => {
    const t = text.trim();
    if (!t && !photo) return askRef.current?.focus();
    setHandoff(t || "Solve the doubt in my photo");
  };
  const pickPhoto = (f?: File | null) => {
    if (!f || !f.type.startsWith("image/")) return;
    setPhoto({ name: f.name, url: URL.createObjectURL(f) });
    askRef.current?.focus();
  };
  const openCamera = () => fileRef.current?.click();
  const applyTask = (prompt: string) => {
    setAsk(prompt.replace("UPSC", exam));
    window.setTimeout(() => {
      askRef.current?.focus();
      askRef.current?.setSelectionRange(9999, 9999);
    }, 30);
  };
  const saveTarget = () => {
    setTarget(draft);
    try {
      localStorage.setItem(TARGET_KEY, JSON.stringify(draft));
    } catch {
      /* ignore */
    }
    setTargetOpen(false);
  };

  return (
    <Box sx={{ background: `radial-gradient(circle at 90% 0%, ${AI.soft} 0%, transparent 45%), linear-gradient(180deg, #FFFFFF 0%, ${AI.softer} 100%)`, minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <input ref={fileRef} type="file" accept="image/*" capture="environment" hidden onChange={(e) => { pickPhoto(e.target.files?.[0]); e.target.value = ""; }} />

      {/* own sticky header (the site header is hidden on this page) */}
      <Box component="header" sx={{ position: "sticky", top: 0, zIndex: 10, bgcolor: "rgba(255,255,255,.88)", backdropFilter: "saturate(1.4) blur(10px)", borderBottom: `1px solid ${AI.line}`, pt: "env(safe-area-inset-top)" }}>
        <Container sx={{ maxWidth: "820px !important", height: { xs: 62, md: 72 }, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
          <Box component={Link} href="/vini-ai" aria-label="VINI AI home" sx={{ position: "relative", display: "block", width: { xs: 128, md: 160 }, aspectRatio: "800 / 255" }}>
            <Image src="/images/vini-ai/logo.webp" alt="VINI AI" fill priority sizes="160px" style={{ objectFit: "contain" }} />
          </Box>
          <Box component="button" type="button" onClick={() => setTargetOpen(true)} sx={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 0.75, height: { xs: 38, md: 42 }, px: { xs: 1.4, md: 2 }, borderRadius: 999, border: `1.5px solid ${AI.orange}`, bgcolor: "#FFFFFF", color: AI.orange, fontFamily: "inherit", fontWeight: 700, fontSize: { xs: "0.85rem", md: "0.95rem" }, cursor: "pointer", transition: "background-color .2s", "&:hover": { bgcolor: AI.soft } }}>
            <Target size={18} /> {target ? `${target.exam.split(" ")[0]} ${target.year}` : "Set Target"}
          </Box>
        </Container>
      </Box>

      <Container sx={{ flex: 1, maxWidth: "820px !important", pt: { xs: 1, md: 2 }, pb: { xs: 3, md: 4 } }}>
        {/* hero */}
        <Box sx={{ mt: { xs: 2.5, md: 4 }, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
          <Box>
            <Typography component="h1" sx={{ fontWeight: 900, fontSize: { xs: "2.4rem", sm: "3rem", md: "3.6rem" }, lineHeight: 1.05, color: AI.ink, letterSpacing: "-.02em" }}>
              Ask <Box component="span" sx={{ color: AI.orange }}>Doubt</Box>
            </Typography>
            <Typography sx={{ mt: 1, color: AI.body, fontSize: { xs: "1.02rem", md: "1.2rem" } }}>Your personal AI study companion</Typography>
          </Box>
          <Box sx={{ flexShrink: 0, p: { xs: 1, md: 1.25 }, borderRadius: "50%", bgcolor: AI.soft, boxShadow: `0 0 0 8px ${AI.softer}` }}>
            <Box component="button" type="button" aria-label="Ask a doubt with a photo" onClick={openCamera} sx={{ position: "relative", width: { xs: 76, md: 92 }, height: { xs: 76, md: 92 }, borderRadius: "50%", border: "none", cursor: "pointer", color: "#FFFFFF", background: `linear-gradient(145deg, #F7774F, ${AI.orange})`, boxShadow: `0 14px 28px ${AI.orange}55`, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .2s", "&:hover": { transform: "scale(1.05)" } }}>
              <Camera size={34} />
              <Box component="span" sx={{ position: "absolute", top: 4, right: 4, width: 24, height: 24, borderRadius: "50%", bgcolor: AI.pink, border: "2px solid #FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}><Plus size={14} strokeWidth={3} /></Box>
            </Box>
          </Box>
        </Box>

        {/* search */}
        <Box component="form" onSubmit={(e: React.FormEvent) => { e.preventDefault(); submit(query); }} sx={{ mt: { xs: 3, md: 4 }, display: "flex", alignItems: "center", gap: 1, pl: 2, pr: 1, height: { xs: 58, md: 64 }, borderRadius: 999, bgcolor: "#FFFFFF", border: `1.5px solid ${AI.line}`, boxShadow: `0 10px 26px ${AI.orange}14`, transition: "border-color .2s, box-shadow .2s", "&:focus-within": { borderColor: AI.orange, boxShadow: `0 0 0 4px ${AI.orange}1F` } }}>
          <Search size={24} color={AI.orange} style={{ flexShrink: 0 }} />
          <Box component="input" value={query} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} placeholder={`Search any ${exam} doubt`} aria-label="Search any doubt" sx={{ flex: 1, minWidth: 0, border: "none", outline: "none", bgcolor: "transparent", fontFamily: "inherit", fontSize: { xs: "1rem", md: "1.08rem" }, color: AI.ink, "&::placeholder": { color: AI.muted } }} />
          <Box sx={{ width: "1px", height: 28, bgcolor: AI.line }} />
          <MicButton onText={(t) => setQuery(t)} />
        </Box>

        {/* tasks */}
        <Box sx={{ mt: { xs: 3.5, md: 4.5 }, display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ flex: 1, height: "1.5px", background: `linear-gradient(90deg, transparent, ${AI.pink}88)` }} />
          <Typography component="h2" sx={{ color: AI.orange, fontWeight: 800, fontSize: { xs: "1.1rem", md: "1.3rem" }, whiteSpace: "nowrap" }}>What can I help you with?</Typography>
          <Box sx={{ flex: 1, height: "1.5px", background: `linear-gradient(90deg, ${AI.pink}88, transparent)` }} />
        </Box>
        <Box sx={{ mt: { xs: 2.25, md: 3 }, display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" }, gap: { xs: 1.5, md: 2 } }}>
          {TASKS.map((t) => {
            const Icon = t.icon;
            const pink = t.tone === "pink";
            return (
              <Box key={t.title} component="button" type="button" onClick={() => applyTask(t.prompt)} sx={{ position: "relative", overflow: "hidden", textAlign: "left", p: { xs: 1.75, md: 2 }, pb: { xs: 2.25, md: 2.5 }, borderRadius: "18px", border: `1px solid ${pink ? "#F8D5E2" : AI.line}`, bgcolor: pink ? "#FFF8FB" : AI.softer, fontFamily: "inherit", cursor: "pointer", transition: "transform .2s, box-shadow .2s, border-color .2s", "&:hover": { transform: "translateY(-3px)", boxShadow: `0 14px 28px ${pink ? AI.pink : AI.orange}22`, borderColor: pink ? AI.pink : AI.orange }, "&::after": { content: '""', position: "absolute", right: -30, bottom: -40, width: 120, height: 70, borderRadius: "50%", bgcolor: pink ? AI.pinkSoft : "#FDE6DB", opacity: 0.8 } }}>
                <Box sx={{ width: { xs: 50, md: 56 }, height: { xs: 50, md: 56 }, borderRadius: "50%", bgcolor: pink ? AI.pinkSoft : "#FDE6DB", color: pink ? AI.pink : AI.orange, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={26} />
                </Box>
                <Box sx={{ position: "relative", zIndex: 1, mt: 2, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 1 }}>
                  <Typography sx={{ fontWeight: 700, color: AI.ink, fontSize: { xs: "0.95rem", md: "1rem" }, lineHeight: 1.3 }}>{t.title}</Typography>
                  <ChevronRight size={20} color={pink ? AI.pink : AI.orange} style={{ flexShrink: 0 }} />
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* photo doubts */}
        <Box sx={{ mt: { xs: 2, md: 2.5 }, display: "flex", alignItems: "center", gap: { xs: 1.5, md: 2.5 }, p: { xs: 1.75, md: 2.25 }, borderRadius: "18px", bgcolor: AI.soft, border: `1px solid ${AI.line}` }}>
          <Box sx={{ flexShrink: 0, width: { xs: 52, md: 64 }, height: { xs: 52, md: 64 }, borderRadius: "14px", bgcolor: "#FFFFFF", color: AI.orange, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 14px ${AI.orange}22` }}>
            <ImagePlus size={30} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0, pl: { xs: 0, sm: 2 }, borderLeft: { sm: `1px solid ${AI.line}` } }}>
            <Typography sx={{ fontWeight: 800, color: AI.ink, fontSize: { xs: "0.98rem", md: "1.05rem" } }}>Solve Doubts with Photos</Typography>
            <Typography sx={{ mt: 0.25, color: AI.body, fontSize: { xs: "0.84rem", md: "0.9rem" }, lineHeight: 1.45 }}>Click a photo of your question and get instant AI help.</Typography>
          </Box>
          <Box component="button" type="button" onClick={openCamera} sx={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 0.25, height: 38, px: 1.5, borderRadius: 999, border: `1.5px solid ${AI.line}`, bgcolor: "#FFFFFF", color: AI.orange, fontFamily: "inherit", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", "&:hover": { borderColor: AI.orange } }}>
            Try Now <ChevronRight size={16} />
          </Box>
        </Box>
      </Container>

      {/* ask bar — sticks to the bottom while on this page */}
      <Box sx={{ position: "sticky", bottom: 0, zIndex: 5, pb: { xs: "calc(12px + env(safe-area-inset-bottom))", md: 2 }, pt: 1.5, background: `linear-gradient(180deg, transparent, ${AI.softer} 40%)` }}>
        <Container sx={{ maxWidth: "820px !important" }}>
          {photo && (
            <Box sx={{ mb: 1, display: "inline-flex", alignItems: "center", gap: 1, p: 0.75, pr: 1, borderRadius: "12px", bgcolor: "#FFFFFF", border: `1px solid ${AI.line}`, boxShadow: "0 6px 16px rgba(0,0,0,.06)" }}>
              <Box component="img" src={photo.url} alt="" sx={{ width: 40, height: 40, borderRadius: "8px", objectFit: "cover" }} />
              <Typography noWrap sx={{ maxWidth: 180, fontSize: "0.82rem", color: AI.body }}>{photo.name}</Typography>
              <IconButton size="small" aria-label="Remove photo" onClick={() => setPhoto(null)}><X size={16} /></IconButton>
            </Box>
          )}
          <Box component="form" onSubmit={(e: React.FormEvent) => { e.preventDefault(); submit(ask); }} sx={{ display: "flex", alignItems: "center", gap: 0.75, pl: 1, pr: 0.75, height: { xs: 60, md: 64 }, borderRadius: 999, bgcolor: "#FFFFFF", border: "1px solid #EEE", boxShadow: "0 12px 30px rgba(17,24,39,.10)", "&:focus-within": { borderColor: AI.orange } }}>
            <IconButton aria-label="Attach a photo" onClick={openCamera} sx={{ color: AI.body }}><Paperclip size={22} /></IconButton>
            <Box component="input" ref={askRef} value={ask} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAsk(e.target.value)} placeholder="Ask anything..." aria-label="Ask anything" sx={{ flex: 1, minWidth: 0, border: "none", outline: "none", bgcolor: "transparent", fontFamily: "inherit", fontSize: { xs: "1rem", md: "1.05rem" }, color: AI.ink, "&::placeholder": { color: AI.muted } }} />
            <MicButton onText={(t) => setAsk((a) => (a ? `${a} ${t}` : t))} />
            <Box sx={{ width: "1px", height: 28, bgcolor: "#EEE" }} />
            <Box component="button" type="submit" aria-label="Send" sx={{ flexShrink: 0, width: { xs: 46, md: 50 }, height: { xs: 46, md: 50 }, borderRadius: "50%", border: "none", cursor: "pointer", color: "#FFFFFF", background: `linear-gradient(145deg, #F7774F, ${AI.orange})`, boxShadow: `0 8px 18px ${AI.orange}55`, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .2s", "&:hover": { transform: "scale(1.06)" } }}>
              <Send size={20} style={{ marginLeft: -2 }} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* app store badges — below the ask bar */}
      <Container sx={{ maxWidth: "820px !important", pt: { xs: 0.5, md: 1 }, pb: { xs: 2.5, md: 3 }, display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", justifyContent: "center", gap: { xs: 1, sm: 1.5 } }}>
        <Typography sx={{ color: AI.body, fontWeight: 600, fontSize: { xs: "0.85rem", md: "0.92rem" } }}>Get VINI AI on the app</Typography>
        <Box sx={{ width: { xs: "100%", sm: "auto" }, display: "flex", justifyContent: "center" }}>
          <StoreBadges size="sm" />
        </Box>
      </Container>

      {/* bottom actions */}
      <Box component="footer" sx={{ borderTop: `1px solid ${AI.line}`, bgcolor: "#FFFFFF", pb: "env(safe-area-inset-bottom)" }}>
        <Container sx={{ maxWidth: "820px !important", py: { xs: 2, md: 2.5 }, display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: { xs: 1.25, md: 2 } }}>
          <Box component="button" type="button" onClick={goBack} sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 1, height: { xs: 50, md: 54 }, borderRadius: 999, border: `1.5px solid ${AI.line}`, bgcolor: "#FFFFFF", color: AI.ink, fontFamily: "inherit", fontWeight: 700, fontSize: { xs: "0.98rem", md: "1.05rem" }, cursor: "pointer", transition: "border-color .2s, color .2s", "&:hover": { borderColor: AI.orange, color: AI.orange } }}>
            <ArrowLeft size={20} /> Back
          </Box>
          <Box component="a" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 1, height: { xs: 50, md: 54 }, borderRadius: 999, color: "#FFFFFF", fontWeight: 800, fontSize: { xs: "0.98rem", md: "1.05rem" }, textDecoration: "none", background: `linear-gradient(145deg, #F7774F, ${AI.orange})`, boxShadow: `0 10px 22px ${AI.orange}44`, transition: "transform .2s", "&:hover": { transform: "translateY(-1px)" } }}>
            <Smartphone size={20} /> Open in App
          </Box>
        </Container>
      </Box>

      {/* app hand-off */}
      <Dialog open={!!handoff} onClose={() => setHandoff(null)} maxWidth="xs" fullWidth slotProps={{ paper: { sx: { borderRadius: "22px", m: 2, overflow: "hidden" } } }}>
        <Box sx={{ position: "relative", p: 3, textAlign: "center", background: `linear-gradient(180deg, ${AI.soft} 0%, #FFFFFF 70%)` }}>
          <IconButton aria-label="Close" onClick={() => setHandoff(null)} sx={{ position: "absolute", top: 8, right: 8 }}><X size={20} /></IconButton>
          <Box sx={{ mx: "auto", position: "relative", width: 150, aspectRatio: "800 / 255", mb: 1.5 }}>
            <Image src="/images/vini-ai/logo.webp" alt="VINI AI" fill sizes="150px" style={{ objectFit: "contain" }} />
          </Box>
          <Typography sx={{ fontWeight: 800, color: AI.ink, fontSize: "1.2rem" }}>Get your answer in the app</Typography>
          <Box sx={{ mt: 1.5, p: 1.5, borderRadius: "12px", bgcolor: "#FFFFFF", border: `1px dashed ${AI.line}`, color: AI.body, fontSize: "0.9rem", textAlign: "left" }}>
            <Box component="span" sx={{ color: AI.orange, fontWeight: 700 }}>Your doubt: </Box>{handoff}
          </Box>
          <Typography sx={{ mt: 1.5, color: AI.body, fontSize: "0.9rem" }}>VINI AI answers doubts, evaluates answers and makes notes inside the VINI Learning App.</Typography>
          <Box component="a" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" sx={{ mt: 2.25, display: "flex", alignItems: "center", justifyContent: "center", gap: 1, height: 50, borderRadius: 999, color: "#FFFFFF", fontWeight: 800, textDecoration: "none", background: `linear-gradient(145deg, #F7774F, ${AI.orange})`, boxShadow: `0 10px 22px ${AI.orange}44` }}>
            <Smartphone size={18} /> Open VINI Learning App
          </Box>
        </Box>
      </Dialog>

      {/* set target */}
      <Dialog open={targetOpen} onClose={() => setTargetOpen(false)} maxWidth="xs" fullWidth slotProps={{ paper: { sx: { borderRadius: "22px", m: 2 } } }}>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 800, color: AI.ink, fontSize: "1.2rem" }}><Target size={20} color={AI.orange} /> Set your target</Typography>
            <IconButton aria-label="Close" onClick={() => setTargetOpen(false)}><X size={20} /></IconButton>
          </Box>
          <Typography sx={{ mt: 0.5, color: AI.body, fontSize: "0.9rem" }}>VINI AI tailors answers and plans to your exam.</Typography>
          <Typography sx={{ mt: 2.25, mb: 1, fontWeight: 700, color: AI.ink, fontSize: "0.85rem" }}>Exam</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {EXAMS.map((x) => {
              const on = draft.exam === x;
              return <Box key={x} component="button" type="button" onClick={() => setDraft((d) => ({ ...d, exam: x }))} sx={{ px: 1.75, py: 0.75, borderRadius: 999, border: `1.5px solid ${on ? AI.orange : "#E5E7EB"}`, bgcolor: on ? AI.soft : "#FFFFFF", color: on ? AI.orange : AI.body, fontFamily: "inherit", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>{x}</Box>;
            })}
          </Box>
          <Typography sx={{ mt: 2.25, mb: 1, fontWeight: 700, color: AI.ink, fontSize: "0.85rem" }}>Attempt year</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {YEARS.map((y) => {
              const on = draft.year === y;
              return <Box key={y} component="button" type="button" onClick={() => setDraft((d) => ({ ...d, year: y }))} sx={{ flex: 1, py: 1, borderRadius: "12px", border: `1.5px solid ${on ? AI.orange : "#E5E7EB"}`, bgcolor: on ? AI.soft : "#FFFFFF", color: on ? AI.orange : AI.body, fontFamily: "inherit", fontWeight: 800, cursor: "pointer" }}>{y}</Box>;
            })}
          </Box>
          <Box component="button" type="button" onClick={saveTarget} sx={{ mt: 3, width: "100%", height: 50, borderRadius: 999, border: "none", color: "#FFFFFF", fontFamily: "inherit", fontWeight: 800, fontSize: "1rem", cursor: "pointer", background: `linear-gradient(145deg, #F7774F, ${AI.orange})`, "&:hover": { background: AI.orangeDark } }}>
            Save target
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
