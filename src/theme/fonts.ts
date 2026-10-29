import { Noto_Sans_Devanagari, Reddit_Sans } from "next/font/google";

/** Site text font (same family as pw.live). Variable font, self-hosted by next/font. */
export const redditSans = Reddit_Sans({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-reddit-sans" });

/**
 * Hindi (Devanagari) — Reddit Sans has no Hindi letters, so the browser takes them from here.
 * Only downloaded on pages that show Hindi (unicode-range), hence no preload.
 */
export const notoDevanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], display: "swap", variable: "--font-devanagari", preload: false });

/** Site font stack (theme + globals.css); system fonts only until the web fonts load. */
export const FONT_STACK = 'var(--font-reddit-sans), var(--font-devanagari), system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

/** Class names for <html>: define the two font variables used by FONT_STACK. */
export const fontVariables = `${redditSans.variable} ${notoDevanagari.variable}`;
