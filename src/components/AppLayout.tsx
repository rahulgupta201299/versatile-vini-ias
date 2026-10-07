"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Header, Footer } from "@/sections";
import AuthModal from "./AuthModal";
import { OPEN_AUTH_EVENT } from "@/utils/events";

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
    </Box>
  );
}
