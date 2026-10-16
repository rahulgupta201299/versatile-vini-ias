"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { X, Smartphone, ArrowRight } from "lucide-react";
import { PLAY_STORE_URL } from "@/data/app";
import { COLORS } from "@/theme/colors";

/** Session flag — the popup shows once per browser tab session. */
const SEEN_KEY = "vini_app_promo_seen";
const DELAY_MS = 3000;

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

/** App download popup shown a few seconds after the first page load of a session. */
export default function AppPromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (readSeen()) return;
    const t = window.setTimeout(() => {
      markSeen();
      setOpen(true);
    }, DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  const close = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onClose={close}
      maxWidth={false}
      aria-labelledby="app-promo-title"
      slotProps={{ paper: { sx: { width: "min(760px, calc(100% - 32px))", m: 2, borderRadius: { xs: 3, md: 4 }, overflow: "hidden", bgcolor: "#FFFDF5" } } }}
    >
      <IconButton
        aria-label="Close"
        onClick={close}
        sx={{ position: "absolute", top: 8, right: 8, zIndex: 2, width: 34, height: 34, bgcolor: "rgba(255,255,255,.92)", color: COLORS.navy, boxShadow: "0 2px 8px rgba(0,0,0,.18)", "&:hover": { bgcolor: "#fff" } }}
      >
        <X size={18} />
      </IconButton>

      <Box component="a" href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={close} sx={{ display: "block", lineHeight: 0 }}>
        <Image src="/images/app/app-promo.webp" alt="Vini IAS app — courses, test series and latest updates" width={1280} height={711} priority sizes="(max-width: 800px) 100vw, 760px" style={{ width: "100%", height: "auto" }} />
      </Box>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", justifyContent: "space-between", gap: { xs: 1.5, sm: 2 }, px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 2.25 }, borderTop: `3px solid ${COLORS.red}` }}>
        <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
          <Typography id="app-promo-title" sx={{ fontWeight: 800, color: COLORS.navy, fontSize: { xs: "1.05rem", sm: "1.2rem" } }}>
            Study smarter with the Vini IAS App
          </Typography>
          <Typography sx={{ color: "#52525B", fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
            Live classes, test series & daily updates — all in your pocket.
          </Typography>
        </Box>
        <Box
          component="a"
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          sx={{
            display: "inline-flex", alignItems: "center", gap: 1, flexShrink: 0, px: 2.5, py: 1.25, borderRadius: 999,
            bgcolor: COLORS.red, color: "#fff", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", whiteSpace: "nowrap",
            boxShadow: "0 6px 16px rgba(254,0,52,.3)", transition: "transform .2s, box-shadow .2s",
            "&:hover": { transform: "translateY(-2px)", boxShadow: "0 10px 22px rgba(254,0,52,.38)" },
            "& .arrow": { transition: "transform .2s" }, "&:hover .arrow": { transform: "translateX(3px)" },
          }}
        >
          <Smartphone size={18} /> Download the App <ArrowRight className="arrow" size={18} />
        </Box>
      </Box>
    </Dialog>
  );
}
