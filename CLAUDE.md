# Vini IAS Frontend — project notes

## Brand colours (always use these)
- **Red** `#FE0034` (RGB 254, 0, 52) — `COLORS.red` (+ `redDark`, `redDarker`, `redTint`, `redTintSoft`, `redBorder`)
- **Yellow** `#FFE51F` (RGB 255, 229, 31) — `COLORS.yellow` (+ `yellowDark`)
- Text on yellow: near-black (`COLORS.ink`); text on red: white / yellow.
- Take colours from `src/theme/colors.ts` only — no new blues, greens or purples for backgrounds, buttons or accents.

## Content rules
- Never show educators / faculty on course pages.
- Plans are only **Foundation** and **Foundation Plus**.
- Toppers come from the homepage Top Rankers section.
- Every "Test Series" link is external (`TEST_SERIES_URL`, opens in a new tab).

## Layouts / route groups
- `src/app/layout.tsx` is the bare root shell only (html, body, theme, site data). Do not add page chrome there.
- `src/app/(site)/` — every main-site page. Its `layout.tsx` renders `AppLayout` (header, footer, login modal, app popup, help tab). New site pages go here.
- `src/app/(vini-ai)/` — standalone VINI AI sub-brand (own header + Back / Open in App footer, orange palette, its own logo). No site header/footer.
- Never hide/show the header or footer with pathname checks — add a new route group with its own layout instead.
- `api/`, `sitemap.ts`, `robots.ts`, `not-found.tsx` stay at the app root (404 wraps itself in `AppLayout`).
- `src/app/(admin)/` — admin panel at /admin (no site chrome, noindex, never linked from the site). Auth: email + password → 6-digit email OTP → 2-day httpOnly cookie (`src/lib/adminAuth.ts`, `/api/admin/auth/*`, gate in `src/middleware.ts`). Production uses ADMIN_AUTH_MODE=live (backend /admin/auth/*).
