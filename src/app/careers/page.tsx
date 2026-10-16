import type { Metadata } from "next";
import { CareersBenefits, CareersHero, CareersPillars, CareersStats, JobOpenings } from "@/sections/Company";
import { getCareersContent } from "@/services";

export const metadata: Metadata = {
  title: "Careers | Vini IAS",
  description: "Join Vini IAS and help transform the way India prepares for UPSC, BPSC and State PCS. See open positions across academics, technology, marketing and more.",
  alternates: { canonical: "/careers" },
};

export default async function CareersPage() {
  const careers = await getCareersContent();
  return (
    <>
      <CareersHero hero={careers.hero} />
      <CareersStats stats={careers.stats} />
      <CareersPillars pillars={careers.pillars} />
      <CareersBenefits benefits={careers.benefits} />
      <JobOpenings jobs={careers.jobs} email={careers.email} />
    </>
  );
}
