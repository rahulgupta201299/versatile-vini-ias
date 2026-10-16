"use client";

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
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

/** "Have questions?" sheet: illustration, request-a-call-back form and a call-us link. */
function CallbackPanel({ onClose }: { onClose: () => void }) {
  const { config, examCategories } = useSiteData();
  const CONTACT = config.contact;
  const examOptions = [...examCategories.map((c) => c.category), "Other"];
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
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
    <Box sx={{ position: "relative", px: { xs: 2.25, sm: 3.5 }, pt: { xs: 1.25, sm: 3 }, pb: { xs: "calc(20px + env(safe-area-inset-bottom))", sm: 3.5 }, background: `linear-gradient(180deg, ${COLORS.redTint} 0%, #FFFFFF 46%)`, textAlign: "center" }}>
      {/* grab handle (mobile sheet) */}
      <Box sx={{ display: { xs: "block", sm: "none" }, width: 42, height: 4, borderRadius: 2, bgcolor: "#D4D4D8", mx: "auto", mb: 1.5 }} />
      <Box sx={{ width: { xs: 132, sm: 150 }, height: { xs: 132, sm: 150 }, mx: "auto", borderRadius: "50%", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.redTintHover}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 26px rgba(254,0,52,.10)" }}>
        <CounsellorIllustration width={{ xs: 112, sm: 128 }} />
      </Box>

      <Typography id="support-callback-title" component="h2" sx={{ mt: 2, fontWeight: 800, color: COLORS.navy, fontSize: { xs: "1.15rem", sm: "1.3rem" } }}>
        Have questions about your prep?
      </Typography>
      <Typography sx={{ color: "#52525B", fontSize: { xs: "0.9rem", sm: "0.95rem" }, mt: 0.5, mb: 2.25 }}>
        Our experts can answer all your questions
      </Typography>

      {submitted ? (
        <Box sx={{ p: 2.25, borderRadius: "12px", backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", gap: 1.5, textAlign: "left" }}>
          <CheckCircle2 size={26} color={COLORS.success} style={{ flexShrink: 0 }} />
          <Box>
            <Typography sx={{ fontWeight: 700, color: "#166534" }}>Request received!</Typography>
            <Typography sx={{ fontSize: "0.88rem", color: COLORS.body }}>
              Thanks {form.values.name}, our expert will call you at <b>+91 {form.values.mobile}</b> shortly.
            </Typography>
          </Box>
        </Box>
      ) : (
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
            sx={{ mt: 0.5, height: 50, border: "none", borderRadius: "12px", backgroundColor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: "1rem", cursor: "pointer", boxShadow: "0 8px 20px rgba(254,0,52,.22)", transition: "background-color .2s", "&:hover": { backgroundColor: "#D9002C" } }}
          >
            Request a call back
          </Box>
          <Box
            component="a"
            href={CONTACT.tel}
            sx={{ height: 46, display: "flex", alignItems: "center", justifyContent: "center", gap: 0.75, borderRadius: "12px", border: "1px solid #E4E4E7", bgcolor: "#FFFFFF", color: COLORS.navy, fontSize: "0.93rem", fontWeight: 600, textDecoration: "none", "&:hover": { borderColor: COLORS.red, color: COLORS.red } }}
          >
            <PhoneCall size={16} /> or call us @ {CONTACT.phoneDisplay}
          </Box>
        </Box>
      )}

      {/* desktop close */}
      <IconButton aria-label="Close" onClick={onClose} sx={{ display: { xs: "none", sm: "inline-flex" }, position: "absolute", top: 10, right: 10, color: COLORS.navy }}>
        <X size={20} />
      </IconButton>
    </Box>
  );
}

/** Floating light-red support tab on the right edge; opens the call-back sheet (bottom sheet on phones). */
export default function SupportCallback() {
  const [open, setOpen] = useState(false);
  const isPhone = useMediaQuery("(max-width:599.95px)");
  const close = () => setOpen(false);

  return (
    <>
      <Box
        component="button"
        type="button"
        aria-label="Have questions? Request a call back"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          right: 0,
          bottom: { xs: 96, md: 120 },
          zIndex: 1090,
          width: { xs: 46, md: 52 },
          height: { xs: 50, md: 56 },
          display: open ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${COLORS.redTintHover}`,
          borderRight: "none",
          borderRadius: "14px 0 0 14px",
          bgcolor: COLORS.redTint,
          color: COLORS.red,
          cursor: "pointer",
          boxShadow: "0 6px 18px rgba(254,0,52,.18)",
          transition: "width .2s, background-color .2s",
          "&:hover": { bgcolor: COLORS.redTintHover, width: { xs: 46, md: 58 } },
          "&:focus-visible": { outline: `2px solid ${COLORS.red}`, outlineOffset: 2 },
        }}
      >
        <Headset size={24} strokeWidth={2.2} />
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
            <CallbackPanel onClose={close} />
          </Box>
        </Drawer>
      ) : (
        <Dialog open={open} onClose={close} aria-labelledby="support-callback-title" slotProps={{ paper: { sx: { width: 440, maxWidth: "calc(100% - 32px)", borderRadius: "20px", overflow: "hidden" } } }}>
          <CallbackPanel onClose={close} />
        </Dialog>
      )}
    </>
  );
}
