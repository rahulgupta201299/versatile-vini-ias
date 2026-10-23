import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { AdminHomepageBanner } from "@/types";
import { PageHeader } from "@/sections/Admin/ui";
import BannerManager from "@/sections/Admin/homepage/BannerManager";
import { MARKETING_SHAPE } from "@/sections/Admin/homepage/bannerShapes";

export const metadata: Metadata = { title: "Marketing banner" };
export const dynamic = "force-dynamic";

export default async function MarketingBannerPage() {
  const banners = await loadAdminData<AdminHomepageBanner[]>("admin/homepage/marketing-banners?placement=first");

  return (
    <>
      <PageHeader eyebrow="Web / Homepage / Marketing banner" title="Marketing banner" subtitle="The wide promo banner under “Browse Our Free Resources”. Add more than one to make it a slider." />
      <BannerManager banners={banners} apiPath="homepage/marketing-banners" placement="first" shape={MARKETING_SHAPE} itemName="banner" itemsName="banners" orderDescription="Several active banners here turn into a slider, in this order." />
    </>
  );
}
