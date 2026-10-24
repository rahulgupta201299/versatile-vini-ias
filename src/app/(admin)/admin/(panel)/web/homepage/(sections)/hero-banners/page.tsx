import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { AdminHomepageBanner } from "@/types";
import { PageHeader } from "@/sections/Admin/ui";
import BannerManager from "@/sections/Admin/homepage/BannerManager";
import { HERO_SHAPE } from "@/sections/Admin/homepage/bannerShapes";

export const metadata: Metadata = { title: "Hero slider" };
export const dynamic = "force-dynamic";

export default async function HeroBannersPage() {
  const banners = await loadAdminData<AdminHomepageBanner[]>("admin/homepage/hero-banners");

  return (
    <>
      <PageHeader eyebrow="Web / Homepage / Hero slider" title="Hero slider" subtitle="The banner carousel at the top of the homepage. Goal pages without their own banners show it too." />
      <BannerManager banners={banners} apiPath="homepage/hero-banners" shape={HERO_SHAPE} itemName="slide" itemsName="slides" orderDescription="The slider shows the slides in this order." />
    </>
  );
}
