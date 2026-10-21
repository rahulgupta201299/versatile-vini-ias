import { notFound, redirect } from "next/navigation";
import { adminBackend } from "@/lib/adminBackend";

/**
 * Loads backend data for an admin page (server only) and handles every failure in one place:
 *   401 (session ended) → the sign-in page
 *   404 (missing item)  → the nearest admin not-found page
 *   anything else       → throws, so the nearest admin error.tsx shows "Try again"
 */
export async function loadAdminData<T>(path: string): Promise<T> {
  const result = await adminBackend<T>(path);

  if (result.ok) return result.data;

  if (result.status === 401) redirect("/admin/login");

  if (result.status === 404) notFound();

  throw new Error(`Couldn't load ${path} (${result.status}): ${result.error}`);
}
