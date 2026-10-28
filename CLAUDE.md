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
- **Deleting:** items are normally switched active / inactive (lists show both groups). Hard delete only through `DeleteButton` (confirmation dialog), shown only with Delete access; categories must be empty first.
- **Access (RBAC):** per-section permissions (View / Edit / Delete) in `SECTIONS` (`src/lib/adminAccess.ts`, mirrors backend `config/permissions.js`). Nav items list their `sections`, pages are wrapped in `<AccessGate sections={["x"]}>`, client UI uses `useSectionAccess("x")` (`canEdit`, `canDelete`). Hidden in the menu is not enough — the gate and the backend's `requireSection` block access.
- **Admin users:** Team → Admin users (Super Admins and Admins; Admins manage Members only, never give Delete). People are switched active / inactive, never deleted.
- **Long text:** use `RichTextEditor` (TipTap) for content writers; it saves HTML that the backend sanitises. On the site render it inside `richTextSx` (`src/theme/richText.ts`).
- **Fields containing buttons** (editors, pickers, uploads) use `<Field group>` — a `<label>` would re-click the first button inside it.

## Coding best practices (always follow — same as the Backend, see ../CLAUDE.md)
- **`if` + `return`, never `else if`**; no `else` after `return`.
- **Destructuring with defaults** for props, objects and arguments: `({ isPreview = false, banner })`.
- **No `??` / `??=`** in new or changed code — use a default value, `||`, or an `if` when `0` / `false` matter.
- **No nested ternaries** in logic or JSX — move the choice into a small helper or component with early returns.
- **Chain for readability**: `list.filter(…).map(…)`, one step per line when long.
- Truthy checks (`if (!banner)`), named conditions (`const isLive = …`), small named helpers.

## React / Next.js standards (always follow)
- **Naming:** components `PascalCase`, hooks `useCamelCase`, variables / functions / props `camelCase`, module-level constants
  `SCREAMING_SNAKE_CASE` only for true constants (never rename props or hook results into SCREAMING aliases).
  Files: one component per file, named like the component.
- **Images:** always `next/image` (`Image`) — `fill` + `sizes` or width/height, `priority` only on the above-the-fold LCP image.
  Banners with separate phone artwork use `ArtDirectedImage` (`getImageProps` + `<picture>`). Data/blob URLs are
  served unoptimised automatically; a new remote host needs an entry in `images.remotePatterns` (next.config.ts).
  No `<img>` / `component="img"` (exception: admin previews of local data URLs, which use `Image` with `unoptimized`).
- **Reuse before you write:** look for an existing shared component (`src/components/`) before building UI that looks
  similar. Two look-alike blocks → one component. Current shared pieces: `FaqList` (every FAQ accordion),
  `HighlightTitle` (navy heading with a red phrase), `MobileCallbackForm` (one-field callback form), `ArtDirectedImage`,
  `ErrorScreen`, `skeletons/*`, `SiteOverlays` (login + app popups, lazy-loaded; open login with `openAuth()`),
  `CourseCtaButton` (admin-set text + link, else scroll / sign-up popup). Admin editors saved part by part use
  `Admin/common/PartAccordion` (`usePart`, `PartCard`, `useOpenParts`), plus `FileField` and `IconSelect`.
- **Contact details** (phone, WhatsApp, email, website) come only from `getSiteConfig().contact` / `useSiteData().config.contact`
  (admin → Web → Contact Info). Never hard-code them.
- **Route groups** for layouts (`(site)`, `(vini-ai)`, `(admin)`); one dynamic route instead of copy-pasted folders.
- **Server first:** pages and sections are Server Components; add `"use client"` only to the small interactive part.
  Read site-wide data with `useSiteData()` (context) instead of passing it down several levels; fetch page data in the
  page / server component that uses it. No prop drilling or re-forwarding of the same data.
- **No default values that Next already uses** — don't write `export const dynamicParams = true`, `dynamic = "auto"`,
  `revalidate = false`, `runtime = "nodejs"`, `reactStrictMode`-style defaults, `<Image loading="lazy">`, etc.
- **Loading:** every route that waits for the backend has a `loading.tsx` with shimmer skeletons
  (`src/components/skeletons`) that keep the final layout's sizes — no layout shift.
- **Errors:** route-level `error.tsx` (site, vini-ai, admin sections) + `global-error.tsx`, all using the branded
  `ErrorScreen` (site) / `AdminErrorState` (admin). Show friendly text, a retry and a way home — never raw errors.
- **Web vitals:** LCP image `priority` + correct `sizes`; lazy-load below-the-fold / on-demand client UI with
  `next/dynamic` (modals, popups, search, heavy editors); fixed sizes / aspect ratios for media (CLS); keep client
  bundles small (INP); cache backend fetches with tags (TTFB).
- **SEO:** content should come from the server (backend) wherever it can; metadata via `generateMetadata`.
- **Lint & format:** `npm run lint` must pass with the line-spacing rules (blank line before `return`, after variable
  blocks, between blocks); run `npx eslint --fix` on touched files, then `npx tsc --noEmit`.

