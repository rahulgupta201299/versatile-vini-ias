"use client";

import { useEffect } from "react";
import { ERROR_COPY } from "@/components/ErrorScreen";
import { COLORS } from "@/theme/colors";

/**
 * Last-resort error screen, used only when the root layout itself fails. It renders its own <html>
 * and inline styles because the theme and fonts aren't available here.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { badge, title, message } = ERROR_COPY.error;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: COLORS.surface, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif", color: COLORS.ink }}>
        <main style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
          <p aria-hidden style={{ display: "inline-block", margin: 0, padding: "0 8px", fontSize: 72, fontWeight: 900, lineHeight: 1, color: COLORS.red, backgroundImage: `linear-gradient(transparent 62%, ${COLORS.yellow} 62%, ${COLORS.yellow} 88%, transparent 88%)` }}>
            {badge}
          </p>
          <h1 style={{ margin: "16px 0 0", fontSize: 26, color: COLORS.navy }}>{title}</h1>
          <p style={{ margin: "10px 0 0", color: COLORS.textSecondary, lineHeight: 1.7 }}>{message}</p>
          {error.digest && <p style={{ margin: "12px 0 0", color: COLORS.disabled, fontSize: 12 }}>Reference: {error.digest}</p>}
          <div style={{ marginTop: 28, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button type="button" onClick={reset} style={{ height: 44, padding: "0 24px", border: "none", borderRadius: 999, background: COLORS.red, color: "#FFFFFF", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- a full reload is the point after a root error */}
            <a href="/" style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 24px", borderRadius: 999, border: `1px solid ${COLORS.border}`, color: COLORS.navy, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Go to homepage
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
