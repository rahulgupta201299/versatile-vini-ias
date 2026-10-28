"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { ArrowDown } from "lucide-react";
import { solidPill } from "./careerStyles";

/** Phone-only sticky "Apply Now" bar; hides once the apply form is on screen. */
export default function MobileApplyBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = document.getElementById("apply");

    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting || e.boundingClientRect.top < 0), { threshold: 0.05 });

    io.observe(el);

    return () => io.disconnect();
  }, []);

  return (
    <Box sx={{ display: { xs: "block", md: "none" }, position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 1080, p: 1.25, pb: "calc(10px + env(safe-area-inset-bottom))", bgcolor: "rgba(255,255,255,.96)", borderTop: "1px solid #E2E8F0", boxShadow: "0 -8px 24px rgba(15,23,42,.08)", transform: hidden ? "translateY(110%)" : "none", transition: "transform .25s ease" }}>
      <Box component="a" href="#apply" sx={{ ...solidPill, width: "100%", height: 48, fontSize: "1rem" }}>
        Apply Now <ArrowDown size={18} />
      </Box>
    </Box>
  );
}
