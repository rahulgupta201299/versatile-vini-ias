/**
 * Backend base URL — the one place that decides which backend the frontend talks to.
 *
 *   npm run dev   (NODE_ENV=development) → API_BASE_URL_DEV, default http://localhost:8000/api  (VINI/Backend running locally)
 *   build/start   (NODE_ENV=production)  → API_BASE_URL,     default https://vini-backend.vercel.app/api
 *
 * The backend serves everything under /api, so "/api" is added when the configured URL leaves it out
 * (e.g. API_BASE_URL=https://vini-backend.vercel.app → https://vini-backend.vercel.app/api).
 *
 * Server only: read by src/lib/api.ts, src/lib/adminAuth.ts and src/lib/careers.ts.
 */
const DEV_DEFAULT = "http://localhost:8000/api";
const PROD_DEFAULT = "https://vini-backend.vercel.app/api";

function normalize(url: string): string {
  const clean = url.trim().replace(/^["']|["']$/g, "").replace(/\/+$/, "");

  return /\/api$/.test(clean) ? clean : `${clean}/api`;
}

const raw =
  process.env.NODE_ENV === "production"
    ? process.env.API_BASE_URL?.trim() || PROD_DEFAULT
    : process.env.API_BASE_URL_DEV?.trim() || DEV_DEFAULT;

export const API_BASE_URL = normalize(raw);
