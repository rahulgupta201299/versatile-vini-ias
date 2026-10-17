import type { Metadata } from "next";
import LegalPage from "@/sections/Legal/LegalPage";
import { LEGAL_DOCS, REFUND_POLICY } from "@/data/legal";

export const metadata: Metadata = {
  title: `${REFUND_POLICY.title} | Vini IAS`,
  description: REFUND_POLICY.description,
  alternates: { canonical: "/refund-policy" },
};

export default function Page() {
  return <LegalPage doc={REFUND_POLICY} docs={LEGAL_DOCS} />;
}
