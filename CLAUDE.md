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

## Admin panel rules (always follow)
- **Loading data in admin pages (server):** use `loadAdminData()` from `src/lib/adminData.ts` — it sends signed-out admins to sign in (401), shows the nearest `not-found.tsx` (404) and throws for server problems so the nearest `error.tsx` shows "Try again". Don't render raw backend errors in pages.
- **Changes from admin screens (browser):** use `adminRequest()` from `src/lib/adminClient.ts` (friendly offline / session-ended / server messages). Show its error message next to the field or in a red `role="alert"` box.
- **Error screens:** every admin section folder gets its own `error.tsx` (and `not-found.tsx` when it has `[id]` pages), using `AdminErrorState`. Admin-wide fallbacks: `(admin)/admin/error.tsx` (panel can't load), `(panel)/error.tsx`, `(panel)/not-found.tsx`; whole site: `app/global-error.tsx`.
- **No browser pop-ups:** never use `window.prompt`, `window.confirm` or `window.alert` — edit inline with fields (e.g. `CategoryNameForm`), with Enter to save and Esc to cancel.
- **Nothing is deleted in All Exams** — categories and sub categories are switched active / inactive, and the admin list shows active and inactive separately.
- **Access (RBAC):** every admin section lists the roles that may open it in `ACCESS` (`src/lib/adminAccess.ts`), gives its nav item that `access`, and wraps its pages in `<AccessGate access={ACCESS.x}>`. Hidden in the menu is not enough — the gate and the backend's `requireAccess` are what block access.
- **Admin users:** Team → Admin users (Super Admin only). People are switched active / inactive, never deleted.
- **Long text:** use `RichTextEditor` (TipTap) for content writers; it saves HTML that the backend sanitises. On the site render it inside `richTextSx` (`src/theme/richText.ts`).
- **Fields containing buttons** (editors, pickers, uploads) use `<Field group>` — a `<label>` would re-click the first button inside it.
