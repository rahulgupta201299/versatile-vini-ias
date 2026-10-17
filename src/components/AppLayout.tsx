"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Header from "@/sections/Header/Header";
import Footer from "@/sections/Footer/Footer";
import AuthModal from "./AuthModal";
import AppPromoPopup from "./AppPromoPopup";
import SupportCallback from "./SupportCallback";
import { OPEN_AUTH_EVENT } from "@/utils/events";

/** Main-site chrome: header, footer, login modal, app popup and the help tab. Used by app/(site)/layout.tsx and the 404 page. */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const open = () => setAuthOpen(true);
    window.addEventListener(OPEN_AUTH_EVENT, open);
    return () => window.removeEventListener(OPEN_AUTH_EVENT, open);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header onOpenAuth={() => setAuthOpen(true)} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <AppPromoPopup />
      <SupportCallback />
    </Box>
  );
}
