"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Check, ChevronDown, Languages } from "lucide-react";
import { COLORS } from "@/theme/colors";

/** Languages offered (Google Translate codes) — native names so readers can find their own. */
const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "bn", label: "বাংলা" },
  { code: "mr", label: "मराठी" },
  { code: "te", label: "తెలుగు" },
  { code: "ta", label: "தமிழ்" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ml", label: "മലയാളം" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "or", label: "ଓଡ଼ିଆ" },
  { code: "ur", label: "اردو" },
] as const;

const SCRIPT_ID = "google-translate-script";
const ELEMENT_ID = "google_translate_element";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: { translate?: { TranslateElement: new (opts: object, id: string) => unknown } };
  }
}

/** Current target language from Google's `googtrans` cookie ("/en/hi" → "hi"). */
function readLang() {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : "en";
}

function writeCookie(lang: string) {
  const value = lang === "en" ? "" : `/en/${lang}`;
  const expiry = lang === "en" ? "; expires=Thu, 01 Jan 1970 00:00:00 GMT" : "";
  const host = window.location.hostname;
  document.cookie = `googtrans=${value}; path=/${expiry}`;
  if (host.includes(".")) document.cookie = `googtrans=${value}; path=/; domain=.${host.replace(/^www\./, "")}${expiry}`;
}

/** Loads the Google Translate widget once (hidden) — our own button drives it. */
function loadGoogleTranslate() {
  if (document.getElementById(SCRIPT_ID)) return;
  if (!document.getElementById(ELEMENT_ID)) {
    const holder = document.createElement("div");
    holder.id = ELEMENT_ID;
    holder.style.display = "none";
    document.body.appendChild(holder);
  }
  window.googleTranslateElementInit = () => {
    if (window.google?.translate) new window.google.translate.TranslateElement({ pageLanguage: "en", includedLanguages: LANGUAGES.map((l) => l.code).join(","), autoDisplay: false }, ELEMENT_ID);
  };
  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.body.appendChild(s);
}

/** "Switch language" pill — translates the article with Google Translate. */
export default function LanguageSwitcher() {
  const [lang, setLang] = useState("en");
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setLang(readLang());
    loadGoogleTranslate();
  }, []);

  const choose = (code: string) => {
    setAnchor(null);
    if (code === lang) return;
    setLang(code);
    writeCookie(code);
    const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (combo && code !== "en") {
      combo.value = code;
      combo.dispatchEvent(new Event("change"));
    } else {
      // back to English (or widget not ready yet) — reload so the page renders in the chosen language
      window.location.reload();
    }
  };

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  return (
    <>
      <Box
        component="button"
        type="button"
        className="notranslate"
        translate="no"
        aria-haspopup="menu"
        aria-expanded={Boolean(anchor)}
        aria-label={`Switch language, current: ${current.label}`}
        onClick={(e: React.MouseEvent<HTMLElement>) => setAnchor(e.currentTarget)}
        sx={{ display: "inline-flex", alignItems: "center", gap: 0.6, height: 28, px: 1.25, borderRadius: "9999px", border: `1px solid ${COLORS.redBorder}`, backgroundColor: COLORS.redTint, color: COLORS.red, fontFamily: "inherit", fontWeight: 700, fontSize: "0.75rem", cursor: "pointer", "&:hover": { backgroundColor: COLORS.redTintHover } }}
      >
        <Languages size={14} />
        {current.label}
        <ChevronDown size={14} />
      </Box>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        className="notranslate"
        slotProps={{ paper: { sx: { mt: 0.75, borderRadius: "12px", minWidth: 180, maxHeight: 320, boxShadow: "0 12px 32px rgba(15,23,42,.14)" } } }}
      >
        {LANGUAGES.map((l) => (
          <MenuItem key={l.code} selected={l.code === lang} onClick={() => choose(l.code)} translate="no" sx={{ fontSize: "0.9rem", fontWeight: l.code === lang ? 700 : 500, color: l.code === lang ? COLORS.red : COLORS.navy, gap: 1, justifyContent: "space-between" }}>
            {l.label}
            {l.code === lang && <Check size={16} />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
