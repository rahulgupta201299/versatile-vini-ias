import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { AdminTopRankers } from "@/types";
import { PageHeader } from "@/sections/Admin/ui";
import TopRankersManager from "@/sections/Admin/homepage/TopRankersManager";

export const metadata: Metadata = { title: "Top rankers" };
export const dynamic = "force-dynamic";

export default async function TopRankersPage() {
  const data = await loadAdminData<AdminTopRankers>("admin/homepage/top-rankers");

  return (
    <>
      <PageHeader eyebrow="Web / Homepage / Top rankers" title="Top rankers" subtitle="“Our Top Rankers” on the homepage and course pages — the headline boxes and the result banners for each tab." />
      <TopRankersManager data={data} />
    </>
  );
}
