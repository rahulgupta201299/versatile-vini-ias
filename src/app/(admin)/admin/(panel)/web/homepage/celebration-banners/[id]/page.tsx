import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { AdminCelebrationBanner } from "@/types";
import CelebrationBannerEditor from "@/sections/Admin/celebration/CelebrationBannerEditor";

export const metadata: Metadata = { title: "Edit celebration banner" };
export const dynamic = "force-dynamic";

export default async function EditCelebrationBannerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const banner = await loadAdminData<AdminCelebrationBanner>(`admin/homepage/celebration-banners/${encodeURIComponent(id)}`);

  return <CelebrationBannerEditor key={banner._id} banner={banner} />;
}
