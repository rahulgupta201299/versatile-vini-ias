import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { AdminCelebrationBanner } from "@/types";
import CelebrationBannerList from "@/sections/Admin/celebration/CelebrationBannerList";

export const metadata: Metadata = { title: "Celebration banner" };
export const dynamic = "force-dynamic";

export default async function CelebrationBannersPage() {
  const banners = await loadAdminData<AdminCelebrationBanner[]>("admin/homepage/celebration-banners");

  return <CelebrationBannerList banners={banners} />;
}
