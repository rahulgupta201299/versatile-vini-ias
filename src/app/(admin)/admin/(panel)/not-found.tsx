import AdminErrorState from "@/sections/Admin/AdminErrorState";

/** Admin 404 — unknown admin addresses, shown inside the sidebar layout. */
export default function AdminNotFound() {
  return <AdminErrorState variant="not-found" title="Page not found" message="This admin page doesn't exist. Use the menu on the left, or go back to the dashboard." />;
}
