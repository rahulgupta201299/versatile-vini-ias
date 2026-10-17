import type { Metadata } from "next";
import LegalPage from "@/sections/Legal/LegalPage";
import { LEGAL_DOCS, PRIVACY_POLICY } from "@/data/legal";

export const metadata: Metadata = {
  title: `${PRIVACY_POLICY.title} | Vini IAS`,
  description: PRIVACY_POLICY.description,
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return <LegalPage doc={PRIVACY_POLICY} docs={LEGAL_DOCS} />;
}
