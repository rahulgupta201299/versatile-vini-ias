"use client";

import React, { createContext, useContext, useState } from "react";
import Box from "@mui/material/Box";
import { Header, Footer } from "@/sections";
import { AuthModal } from "@/components";

interface AuthContextType {
  openAuth: () => void;
  closeAuth: () => void;
  isAuthOpen: boolean;
}

const AuthContext = createContext<AuthContextType>({
  openAuth: () => {},
  closeAuth: () => {},
  isAuthOpen: false,
});

export const useAuth = () => useContext(AuthContext);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [authOpen, setAuthOpen] = useState(false);

  const openAuth = () => setAuthOpen(true);
  const closeAuth = () => setAuthOpen(false);

  return (
    <AuthContext.Provider value={{ openAuth, closeAuth, isAuthOpen: authOpen }}>
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Top Header menu bar static on every page */}
        <Header onOpenAuth={openAuth} />

        {/* Dynamic page content in between */}
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>

        {/* Footer static on every page */}
        <Footer />

        {/* Global Auth Modal accessible from any page */}
        <AuthModal open={authOpen} onClose={closeAuth} />
      </Box>
    </AuthContext.Provider>
  );
}
