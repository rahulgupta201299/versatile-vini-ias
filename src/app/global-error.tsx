"use client";

import { useEffect } from "react";

/**
 * Last-resort error screen for the whole site (admin included) — only used when the root layout itself fails,
 * so it renders its own <html> and plain styles (the theme isn't available here).
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "#F8FAFC", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif", color: "#0F172A" }}>
        <main style={{ maxWidth: 480, width: "100%", padding: 32, borderRadius: 20, background: "#FFFFFF", border: "1px solid #E2E8F0", textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: 22 }}>Something went wrong</h1>
          <p style={{ margin: "10px 0 0", color: "#475569", lineHeight: 1.6 }}>The page couldn&apos;t be loaded. Please try again — if it keeps happening, the server may be down for a moment.</p>
          {error.digest && <p style={{ margin: "12px 0 0", color: "#94A3B8", fontSize: 12 }}>Reference: {error.digest}</p>}
          <div style={{ marginTop: 24, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button type="button" onClick={reset} style={{ height: 42, padding: "0 18px", border: "none", borderRadius: 11, background: "#FE0034", color: "#FFFFFF", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- a full reload is the point after a root error */}
            <a href="/" style={{ display: "inline-flex", alignItems: "center", height: 42, padding: "0 18px", borderRadius: 11, border: "1px solid #E2E8F0", color: "#0F172A", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Go to homepage
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
