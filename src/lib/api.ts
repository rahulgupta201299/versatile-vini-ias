/**
 * Backend API client (server only — used by Server Components, route handlers and services).
 *
 * ┌ Environment (.env.local) ───────────────────────────────────────────────┐
 * │ API_BASE_URL      e.g. https://api.viniias.com/v1   (unset → local data)  │
 * │ API_TOKEN         optional bearer token sent with every request           │
 * │ API_TIMEOUT_MS    request timeout, default 8000                           │
 * │ REVALIDATE_SECRET secret for POST /api/revalidate (on-demand refresh)     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * Endpoints (all GET, JSON — shapes are in src/types/index.ts):
 *   /navigation                    NavigationData
 *   /exam-categories               ExamGoalCategory[]
 *   /site-config                   SiteConfig
 *   /banners/hero?course=<slug>    HeroBanner[]
 *   /banners/results               ResultBannerTab[]
 *   /banners/promo                 HeroBanner[]
 *   /home/ranker-stats             StatItem[]
 *   /home/impact                   ImpactData
 *   /home/resources                ResourceItem[]
 *   /goals/<slug>                  CoursePageData        (404 → page generated from local data)
 *   /courses/gs-foundation/<slug>  FreeResourcePage      (404 → local data / not found)
 *
 * Every call has a local fallback (src/data/*), so the site keeps working when the API is
 * not configured, slow or down. Responses are cached by Next.js (ISR) and tagged, so they can
 * be refreshed instantly via POST /api/revalidate { "tag": "<CACHE_TAGS value>" }.
 */

const BASE_URL = (process.env.API_BASE_URL ?? "").replace(/\/+$/, "");
const TOKEN = process.env.API_TOKEN;
const TIMEOUT_MS = Number(process.env.API_TIMEOUT_MS) || 8000;

/** Cache lifetimes in seconds. */
export const REVALIDATE = {
  /** banners, results — change often */
  fast: 300,
  /** page content */
  default: 900,
  /** navigation, site config, exam lists — rarely change */
  slow: 3600,
} as const;

/** Cache tags — pass one to POST /api/revalidate to refresh that data immediately. */
export const CACHE_TAGS = {
  navigation: "navigation",
  exams: "exam-categories",
  siteConfig: "site-config",
  heroBanners: "hero-banners",
  results: "result-banners",
  promo: "promo-banners",
  home: "home",
  goals: "goals",
  freeResources: "free-resources",
} as const;
export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

export const isApiConfigured = () => Boolean(BASE_URL);

/**
 * Endpoints that just failed or returned nothing are skipped for a short time, so a down API
 * doesn't get hit (and time out) once per page render. Successful responses are cached by Next.js.
 */
const FAILURE_COOLDOWN_MS = 60_000;
const unavailableUntil = new Map<string, number>();

const hasContent = (data: unknown) => (Array.isArray(data) ? data.length > 0 : data !== null && typeof data === "object");

interface FetchOptions<T> {
  /** Returned when the API is not configured, fails, times out or returns an empty/invalid body. */
  fallback: T;
  query?: Record<string, string | undefined>;
  revalidate?: number;
  tags?: CacheTag[];
  /** Extra shape check before trusting the response (default: non-empty array / object). */
  isValid?: (data: unknown) => boolean;
}

export async function fetchApi<T>(path: string, { fallback, query, revalidate = REVALIDATE.default, tags, isValid = hasContent }: FetchOptions<T>): Promise<T> {
  if (!BASE_URL) return fallback;

  const url = new URL(`${BASE_URL}/${path.replace(/^\/+/, "")}`);
  for (const [key, value] of Object.entries(query ?? {})) if (value) url.searchParams.set(key, value);

  const key = url.toString();
  if ((unavailableUntil.get(key) ?? 0) > Date.now()) return fallback;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json", ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}) },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { revalidate, tags },
    });
    if (res.status === 404) {
      unavailableUntil.set(key, Date.now() + FAILURE_COOLDOWN_MS);
      return fallback;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data: unknown = await res.json();
    if (!isValid(data)) throw new Error("empty or invalid response");
    return data as T;
  } catch (err) {
    unavailableUntil.set(key, Date.now() + FAILURE_COOLDOWN_MS);
    console.error(`[api] GET ${url.pathname}${url.search} failed, using local data —`, err instanceof Error ? err.message : err);
    return fallback;
  }
}
