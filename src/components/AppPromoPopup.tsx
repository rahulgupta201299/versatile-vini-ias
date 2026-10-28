"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { X, ArrowRight } from "lucide-react";
import { PLAY_STORE_URL } from "@/data/app";
import { COLORS } from "@/theme/colors";

/** Session flag — the popup shows once per browser tab session. */
const SEEN_KEY = "vini_app_promo_seen";
const DELAY_MS = 3000;
const ROTATE_MS = 2600;

/** Rotating headline + subline (pw.live-style vertical ticker). */
const MESSAGES = [
  { title: "Your Entire Prep in One App", sub: "Download now & start learning today" },
  { title: "Live & Recorded Classes", sub: "Learn anytime, anywhere — even offline" },
  { title: "Daily Answer Writing & Tests", sub: "Practice, get evaluated & track progress" },
  { title: "Notes, PYQs & Current Affairs", sub: "Everything for UPSC, BPSC & State PCS" },
];

function readSeen() {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    window.sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* storage unavailable — popup simply may show again */
  }
}

/** Vertical text ticker: slides up one message at a time and loops seamlessly (first slide cloned at the end). */
function RotatingText({ slideHeight }: { slideHeight: number }) {
  const [idx, setIdx] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const t = window.setInterval(() => {
      setAnimate(true);
      setIdx((i) => i + 1);
    }, ROTATE_MS);

    return () => window.clearInterval(t);
  }, []);

  const onEnd = () => {
    if (idx === MESSAGES.length) {
      setAnimate(false);
      setIdx(0);
    }
  };

  const slides = [...MESSAGES, MESSAGES[0]];

  return (
    <Box aria-live="polite" sx={{ height: slideHeight, overflow: "hidden" }}>
      <Box
        onTransitionEnd={onEnd}
        sx={{
          transform: `translate3d(0, -${idx * slideHeight}px, 0)`,
          transition: animate ? "transform .55s cubic-bezier(.65,0,.35,1)" : "none",
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
      >
        {slides.map((m, i) => (
          <Box key={i} aria-hidden={i !== idx} sx={{ height: slideHeight, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography component="p" sx={{ fontWeight: 800, color: COLORS.navy, fontSize: { xs: "1.38rem", sm: "1.6rem" }, lineHeight: 1.25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {m.title}
            </Typography>
            <Typography sx={{ color: "#71717A", fontSize: { xs: "0.95rem", sm: "1rem" }, mt: 0.5 }}>{m.sub}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function PromoBody({ onClose, phone }: { onClose: () => void; phone: boolean }) {
  return (
    <>
      <Box sx={{ position: "relative", lineHeight: 0, background: "linear-gradient(180deg, #FFF3B8 0%, #FFF9DC 100%)" }}>
        <Image src="/images/app/app-promo.webp" alt="Vini IAS app — courses, test series and latest updates" width={1280} height={711} priority sizes="(max-width: 600px) 100vw, 560px" style={{ width: "100%", height: "auto" }} />
      </Box>

      <Box sx={{ textAlign: "center", px: { xs: 2.5, sm: 4 }, pt: { xs: 2.25, sm: 2.75 }, pb: phone ? "calc(16px + env(safe-area-inset-bottom))" : 3.5 }}>
        <Typography id="app-promo-title" sx={{ color: "#3D3D3D", fontSize: { xs: "0.95rem", sm: "1rem" }, fontWeight: 500 }}>
          Get Vini IAS App for
        </Typography>
        <RotatingText slideHeight={phone ? 66 : 74} />

        <Box sx={{ display: "grid", gap: phone ? 0.75 : 1.25, gridTemplateColumns: phone ? "1fr" : "1fr 1fr", mt: phone ? 2.25 : 2.75 }}>
          <Box
            component="a"
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            sx={{
              order: phone ? 0 : 2,
              height: 50, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 1, borderRadius: "12px",
              bgcolor: COLORS.red, color: "#fff", fontWeight: 700, fontSize: "1rem", textDecoration: "none",
              boxShadow: "0 8px 20px rgba(254,0,52,.25)", transition: "background-color .2s, transform .2s",
              "&:hover": { bgcolor: "#D9002C", transform: "translateY(-1px)" },
              "& .arrow": { transition: "transform .2s" }, "&:hover .arrow": { transform: "translateX(3px)" },
            }}
          >
            {phone ? "Open in App" : "Download the App"} <ArrowRight className="arrow" size={18} />
          </Box>
          <Box
            component="button"
            type="button"
            onClick={onClose}
            sx={{
              order: 1, height: phone ? 44 : 50, border: phone ? "none" : `1.5px solid ${COLORS.redTintHover}`, borderRadius: "12px",
              bgcolor: phone ? "transparent" : "#FFFFFF", color: COLORS.red, fontFamily: "inherit", fontWeight: 600, fontSize: "0.98rem", cursor: "pointer",
              "&:hover": { bgcolor: COLORS.redTint },
            }}
          >
            Continue in Web
          </Box>
        </Box>
      </Box>
    </>
  );
}

/** App download popup shown a few seconds after the first page load of a session (pw.live style). */
export default function AppPromoPopup() {
  const [open, setOpen] = useState(false);
  const phone = useMediaQuery("(max-width:599.95px)");

  useEffect(() => {
    if (readSeen()) return;

    const t = window.setTimeout(() => {
      markSeen();
      setOpen(true);
    }, DELAY_MS);

    return () => window.clearTimeout(t);
  }, []);

  const close = () => setOpen(false);

  if (phone) {
    return (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={close}
        slotProps={{ paper: { "aria-labelledby": "app-promo-title", sx: { borderRadius: "22px 22px 0 0", overflow: "hidden", maxHeight: "94vh" } } }}
      >
        <PromoBody onClose={close} phone />
      </Drawer>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={close}
      maxWidth={false}
      aria-labelledby="app-promo-title"
      slotProps={{ paper: { sx: { width: 560, maxWidth: "calc(100% - 32px)", m: 2, borderRadius: "22px", overflow: "hidden" } } }}
    >
      <IconButton
        aria-label="Close"
        onClick={close}
        sx={{ position: "absolute", top: 10, right: 10, zIndex: 2, width: 34, height: 34, bgcolor: "rgba(255,255,255,.92)", color: COLORS.navy, boxShadow: "0 2px 8px rgba(0,0,0,.18)", "&:hover": { bgcolor: "#fff" } }}
      >
        <X size={18} />
      </IconButton>
      <PromoBody onClose={close} phone={false} />
    </Dialog>
  );
}
