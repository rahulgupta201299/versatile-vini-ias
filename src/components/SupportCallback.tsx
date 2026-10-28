"use client";

import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Grow from "@mui/material/Grow";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CheckCircle2, Headset, PhoneCall, User, X } from "lucide-react";
import CounsellorIllustration from "@/components/illustrations/CounsellorIllustration";
import { useSiteData } from "@/context/SiteDataContext";
import { useFormValidation, validateName, validateMobile, validateRequiredSelect, sanitizeName, sanitizeMobile } from "@/utils/validation";
import { COLORS } from "@/theme/colors";

const FIELD_SX = { backgroundColor: "#FFFFFF", borderRadius: "10px", height: 46, fontSize: "0.93rem" };
const PRIMARY_BTN = { height: 50, width: "100%", border: "none", borderRadius: "12px", backgroundColor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: "1rem", cursor: "pointer", boxShadow: "0 8px 20px rgba(254,0,52,.22)", transition: "background-color .2s", "&:hover": { backgroundColor: "#D9002C" } } as const;
const CALL_BTN = { height: 46, display: "flex", alignItems: "center", justifyContent: "center", gap: 0.75, borderRadius: "12px", border: "1px solid #E4E4E7", bgcolor: "#FFFFFF", color: COLORS.navy, fontSize: "0.93rem", fontWeight: 600, textDecoration: "none", "&:hover": { borderColor: COLORS.red, color: COLORS.red } } as const;

/** "Have questions?" panel: intro (call back / call us) → enquiry form. */
function CallbackPanel({ layout }: { layout: "sheet" | "card" }) {
  const card = layout === "card";
  const [step, setStep] = useState<"intro" | "form">("intro");
  const { config, examCategories } = useSiteData();
  const { contact } = config;
  const examOptions = [...examCategories.map((c) => c.category), "Other"];
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  // What the card shows: the thank-you note, the two buttons, or the form
  const view = submitted ? "done" : step;
  const form = useFormValidation(
    { name: "", mobile: "", exam: "" },
    { name: (v) => validateName(v), mobile: (v) => validateMobile(v), exam: validateRequiredSelect("an exam") },
    { name: sanitizeName, mobile: sanitizeMobile }
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.validateAll(formRef.current)) setSubmitted(true);
  };

  return (
    <Box sx={{ position: "relative", px: card ? 2.5 : 2.25, pt: card ? 2.5 : 1.25, pb: card ? 2.5 : "calc(20px + env(safe-area-inset-bottom))", background: card ? "#FFFFFF" : `linear-gradient(180deg, ${COLORS.redTint} 0%, #FFFFFF 46%)`, textAlign: card ? "left" : "center" }}>
      {!card && <Box sx={{ width: 42, height: 4, borderRadius: 2, bgcolor: "#D4D4D8", mx: "auto", mb: 1.5 }} />}

      <Box sx={card ? { display: "flex", alignItems: "center", gap: 1.5, mb: 2.25 } : { mb: 2.25 }}>
        <Box sx={{ order: card ? 2 : 0, flexShrink: 0, width: card ? 112 : 132, height: card ? 112 : 132, mx: card ? 0 : "auto", borderRadius: "50%", bgcolor: card ? COLORS.redTint : "#FFFFFF", border: `1px solid ${COLORS.redTintHover}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: card ? "none" : "0 10px 26px rgba(254,0,52,.10)" }}>
          <CounsellorIllustration width={card ? 96 : 112} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography id="support-callback-title" component="h2" sx={{ mt: card ? 0 : 2, fontWeight: 800, color: COLORS.navy, fontSize: card ? "1.2rem" : "1.15rem", lineHeight: 1.3 }}>
            Have questions about your prep?
          </Typography>
          <Typography sx={{ color: "#52525B", fontSize: "0.92rem", mt: 0.5 }}>
            Our experts can answer all your questions
          </Typography>
        </Box>
      </Box>

      {view === "done" && (
        <Box sx={{ p: 2.25, borderRadius: "12px", backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", gap: 1.5, textAlign: "left" }}>
          <CheckCircle2 size={26} color={COLORS.success} style={{ flexShrink: 0 }} />
          <Box>
            <Typography sx={{ fontWeight: 700, color: "#166534" }}>Request received!</Typography>
            <Typography sx={{ fontSize: "0.88rem", color: COLORS.body }}>
              Thanks {form.values.name}, our expert will call you at <b>+91 {form.values.mobile}</b> shortly.
            </Typography>
          </Box>
        </Box>
      )}

      {view === "intro" && (
        <Box sx={{ display: "grid", gap: 1.1 }}>
          <Box component="button" type="button" onClick={() => setStep("form")} sx={PRIMARY_BTN}>
            Request a call back
          </Box>
          <Box component="a" href={contact.tel} sx={CALL_BTN}>
            <PhoneCall size={16} /> or call us @ {contact.phoneDisplay}
          </Box>
        </Box>
      )}

      {view === "form" && (
        <Box component="form" ref={formRef} onSubmit={onSubmit} noValidate sx={{ display: "grid", gap: 1.1, textAlign: "left" }}>
          <TextField
            placeholder="Your name"
            {...form.fieldProps("name")}
            helperText={form.visibleError("name") || undefined}
            required
            autoComplete="name"
            inputProps={{ maxLength: 50, "aria-label": "Your name" }}
            InputProps={{ startAdornment: <InputAdornment position="start"><User size={17} color={COLORS.muted} /></InputAdornment>, sx: FIELD_SX }}
          />
          <TextField
            placeholder="Mobile number"
            {...form.fieldProps("mobile")}
            helperText={form.visibleError("mobile") || undefined}
            required
            type="tel"
            autoComplete="tel-national"
            inputProps={{ inputMode: "numeric", "aria-label": "Mobile number" }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Box component="span" sx={{ fontWeight: 700, color: COLORS.navy }}>+91</Box></InputAdornment>, sx: FIELD_SX }}
          />
          <TextField
            select
            {...form.fieldProps("exam")}
            helperText={form.visibleError("exam") || undefined}
            required
            inputProps={{ "aria-label": "Exam you are preparing for" }}
            SelectProps={{
              displayEmpty: true,
              onClose: () => form.markTouched("exam"),
              renderValue: (v) => (v ? String(v) : <Box component="span" sx={{ color: "#A1A1AA" }}>Exam you are preparing for</Box>),
              MenuProps: { slotProps: { paper: { sx: { maxHeight: 280 } } } },
            }}
            InputProps={{ sx: FIELD_SX }}
          >
            {examOptions.map((o) => (
              <MenuItem key={o} value={o}>
                {o}
              </MenuItem>
            ))}
          </TextField>
          <Box
            component="button"
            type="submit"
            sx={{ ...PRIMARY_BTN, mt: 0.5 }}
          >
            Submit
          </Box>
          <Box
            component="a"
            href={contact.tel}
            sx={CALL_BTN}
          >
            <PhoneCall size={16} /> or call us @ {contact.phoneDisplay}
          </Box>
        </Box>
      )}

    </Box>
  );
}

/**
 * Floating light-red support tab. Desktop: a call-back card pops up above the tab (tab turns into ✕), like pw.live.
 * Phones: a bottom sheet. "Request a call back" reveals the enquiry form.
 */
export default function SupportCallback() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(0); // remount panel on each open → starts at the intro step
  const isPhone = useMediaQuery("(max-width:599.95px)");
  const close = () => setOpen(false);
  const toggle = () => {
    if (!open) setSession((n) => n + 1);

    setOpen((o) => !o);
  };

  useEffect(() => {
    if (!open || isPhone) return;

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [open, isPhone]);

  const desktopOpen = open && !isPhone;

  return (
    <>
      <Box
        component="button"
        type="button"
        aria-label={desktopOpen ? "Close" : "Have questions? Request a call back"}
        aria-expanded={open}
        onClick={toggle}
        sx={{
          position: "fixed",
          right: 0,
          bottom: { xs: 96, md: 120 },
          zIndex: desktopOpen ? 1302 : 1090,
          width: { xs: 46, md: 52 },
          height: { xs: 50, md: 56 },
          display: open && isPhone ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${desktopOpen ? COLORS.red : COLORS.redTintHover}`,
          borderRight: "none",
          borderRadius: "14px 0 0 14px",
          bgcolor: desktopOpen ? COLORS.red : COLORS.redTint,
          color: desktopOpen ? "#FFFFFF" : COLORS.red,
          cursor: "pointer",
          boxShadow: "0 6px 18px rgba(254,0,52,.18)",
          transition: "width .2s, background-color .2s, color .2s",
          "&:hover": { bgcolor: desktopOpen ? "#D9002C" : COLORS.redTintHover, width: { xs: 46, md: 58 } },
          "&:focus-visible": { outline: `2px solid ${COLORS.red}`, outlineOffset: 2 },
        }}
      >
        {desktopOpen ? <X size={24} strokeWidth={2.4} /> : <Headset size={24} strokeWidth={2.2} />}
      </Box>

      {isPhone ? (
        <Drawer
          anchor="bottom"
          open={open}
          onClose={close}
          slotProps={{ paper: { "aria-labelledby": "support-callback-title", sx: { borderRadius: "20px 20px 0 0", overflow: "visible", maxHeight: "92vh" } } }}
        >
          {/* floating close above the sheet */}
          <IconButton
            aria-label="Close"
            onClick={close}
            sx={{ position: "absolute", top: -54, left: "50%", transform: "translateX(-50%)", width: 40, height: 40, bgcolor: "#FFFFFF", color: COLORS.navy, boxShadow: "0 4px 14px rgba(0,0,0,.2)", "&:hover": { bgcolor: "#FFFFFF" } }}
          >
            <X size={20} />
          </IconButton>
          <Box sx={{ borderRadius: "20px 20px 0 0", overflowY: "auto" }}>
            <CallbackPanel key={session} layout="sheet" />
          </Box>
        </Drawer>
      ) : (
        <>
          <Fade in={desktopOpen} unmountOnExit>
            <Box onClick={close} aria-hidden sx={{ position: "fixed", inset: 0, zIndex: 1300, bgcolor: "rgba(15,23,42,.45)" }} />
          </Fade>
          <Grow in={desktopOpen} unmountOnExit style={{ transformOrigin: "bottom right" }}>
            <Box
              role="dialog"
              aria-modal="true"
              aria-labelledby="support-callback-title"
              sx={{ position: "fixed", right: 24, bottom: { sm: 162, md: 192 }, zIndex: 1301, width: 400, maxWidth: "calc(100vw - 48px)", maxHeight: "calc(100vh - 220px)", overflowY: "auto", borderRadius: "18px", bgcolor: "#FFFFFF", boxShadow: "0 24px 60px rgba(15,23,42,.28)" }}
            >
              <CallbackPanel key={session} layout="card" />
            </Box>
          </Grow>
        </>
      )}
    </>
  );
}
