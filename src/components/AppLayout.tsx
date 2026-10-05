"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Header, Footer } from "@/sections";
import AuthModal from "./AuthModal";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [authOpen, setAuthOpen] = useState(false);

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
