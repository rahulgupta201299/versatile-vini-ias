"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SupportCallback from "./SupportCallback";
import { OPEN_AUTH_EVENT } from "@/utils/events";

/* Popups load after the page is interactive, so they don't add to the first-load JavaScript. */
const AuthModal = dynamic(() => import("./AuthModal"));
const AppPromoPopup = dynamic(() => import("./AppPromoPopup"), { ssr: false });

/** Login popup (opened from anywhere with `openAuth()`), the app-download popup and the help tab. */
export default function SiteOverlays() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const open = () => setIsAuthOpen(true);

    window.addEventListener(OPEN_AUTH_EVENT, open);

    return () => window.removeEventListener(OPEN_AUTH_EVENT, open);
  }, []);

  return (
    <>
      {isAuthOpen && <AuthModal open onClose={() => setIsAuthOpen(false)} />}
      <AppPromoPopup />
      <SupportCallback />
    </>
  );
}
