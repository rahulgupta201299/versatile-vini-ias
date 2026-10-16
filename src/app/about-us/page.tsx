import type { Metadata } from "next";
import { AppDownloadSection } from "@/sections";
import { AboutCulture, AboutFounders, AboutHero, AboutMission, AboutPresence, AboutVision } from "@/sections/Company";
import { getAboutContent } from "@/services";

export const metadata: Metadata = {
  title: "About Us | Vini IAS",
  description: "Vini IAS makes quality UPSC, BPSC and State PCS preparation accessible and affordable — our mission, vision and presence.",
  alternates: { canonical: "/about-us" },
};

export default async function AboutUsPage() {
  const about = await getAboutContent();
  return (
    <>
      <AboutHero hero={about.hero} />
      <AboutMission items={about.mission} />
      <AboutVision vision={about.vision} />
      <AboutFounders founders={about.founders} />
      <AboutPresence presence={about.presence} />
      <AboutCulture culture={about.culture} />
      <AppDownloadSection />
    </>
  );
}
