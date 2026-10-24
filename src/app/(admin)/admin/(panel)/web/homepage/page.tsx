import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { getAdminSession } from "@/lib/adminAuth";
import { can } from "@/lib/adminAccess";
import { HomepageSummary } from "@/types";
import HomepageOverview from "@/sections/Admin/homepage/HomepageOverview";

export const metadata: Metadata = { title: "Homepage" };
export const dynamic = "force-dynamic";

export default async function HomepagePage() {
  const admin = await getAdminSession();
  // Admins with only All Exams access see just that row
  const summary = can(admin, "homepage") ? await loadAdminData<HomepageSummary>("admin/homepage/summary") : null;

  return <HomepageOverview summary={summary} showAllExams={can(admin, "allExams")} />;
}
