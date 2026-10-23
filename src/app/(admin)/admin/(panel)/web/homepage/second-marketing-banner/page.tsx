import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { AdminHomepageBanner } from "@/types";
import { PageHeader } from "@/sections/Admin/ui";
import BannerManager from "@/sections/Admin/homepage/BannerManager";
import { MARKETING_SHAPE } from "@/sections/Admin/homepage/bannerShapes";

export const metadata: Metadata = { title: "2nd marketing banner" };
export const dynamic = "force-dynamic";

export default async function SecondMarketingBannerPage() {
  const banners = await loadAdminData<AdminHomepageBanner[]>("admin/homepage/marketing-banners?placement=second");

  return (
    <>
      <PageHeader eyebrow="Web / Homepage / 2nd marketing banner" title="2nd marketing banner" subtitle="The promo slider under “Select Your Goal”." />
      <BannerManager banners={banners} apiPath="homepage/marketing-banners" placement="second" shape={MARKETING_SHAPE} itemName="banner" itemsName="banners" orderDescription="Several active banners here turn into a slider, in this order." />
    </>
  );
}
