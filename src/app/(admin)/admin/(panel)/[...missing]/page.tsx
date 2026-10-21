import { notFound } from "next/navigation";

/** Any unknown /admin/... address → the admin not-found page (inside the panel, not the public site's 404). */
export default function UnknownAdminPage() {
  notFound();
}
