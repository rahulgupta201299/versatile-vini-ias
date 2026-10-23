import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { HomepageSummary } from "@/types";
import HomepageOverview from "@/sections/Admin/homepage/HomepageOverview";

export const metadata: Metadata = { title: "Homepage" };
export const dynamic = "force-dynamic";

export default async function HomepagePage() {
  const summary = await loadAdminData<HomepageSummary>("admin/homepage/summary");

  return <HomepageOverview summary={summary} />;
}
