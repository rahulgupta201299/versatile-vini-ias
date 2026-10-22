import type { Metadata } from "next";
import { getAdminSession } from "@/lib/adminAuth";
import { ACCESS } from "@/lib/adminAccess";
import AccessGate from "@/sections/Admin/AccessGate";
import WebDashboard from "@/sections/Admin/web/WebDashboard";

export const metadata: Metadata = { title: "Web Dashboard" };

export default async function WebDashboardPage() {
  const admin = await getAdminSession(); // the layout already guarantees a session

  return (
    <AccessGate access={ACCESS.webDashboard}>
      <WebDashboard adminName={admin?.name} />
    </AccessGate>
  );
}
