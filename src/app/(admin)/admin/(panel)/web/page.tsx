import type { Metadata } from "next";
import { getAdminSession } from "@/lib/adminAuth";
import WebDashboard from "@/sections/Admin/web/WebDashboard";

export const metadata: Metadata = { title: "Web Dashboard" };

export default async function WebDashboardPage() {
  const admin = await getAdminSession(); // layout already guarantees a session
  return <WebDashboard adminName={admin?.name} />;
}
