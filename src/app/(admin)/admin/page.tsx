import { redirect } from "next/navigation";

/** /admin → the Web workspace dashboard. */
export default function AdminIndex() {
  redirect("/admin/web");
}
