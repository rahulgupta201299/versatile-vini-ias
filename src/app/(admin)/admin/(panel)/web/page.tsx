import type { Metadata } from "next";
import { getAdminSession } from "@/lib/adminAuth";

import AccessGate from "@/sections/Admin/AccessGate";
import WebDashboard from "@/sections/Admin/web/WebDashboard";

export const metadata: Metadata = { title: "Web Dashboard" };

export default async function WebDashboardPage() {
  const admin = await getAdminSession(); // the layout already guarantees a session

  return (
    <AccessGate sections={["webDashboard"]}>
      <WebDashboard adminName={admin?.name} />
    </AccessGate>
  );
}
