/**
 * Backend base URL — the one place that decides which backend the frontend talks to.
 *
 *   npm run dev   (NODE_ENV=development) → API_BASE_URL_DEV, default http://localhost:8000/api  (VINI/Backend running locally)
 *   build/start   (NODE_ENV=production)  → API_BASE_URL                                         (deployed backend)
 *
 * Server only: read by src/lib/api.ts, src/lib/adminAuth.ts and src/lib/careers.ts.
 */
const DEV_DEFAULT = "http://localhost:8000/api";

const raw = process.env.NODE_ENV === "production" ? process.env.API_BASE_URL : process.env.API_BASE_URL_DEV || DEV_DEFAULT;

export const API_BASE_URL = (raw ?? "").replace(/\/+$/, "");
