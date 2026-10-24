import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";

import AccessGate from "@/sections/Admin/AccessGate";
import ComingSoon from "@/sections/Admin/ComingSoon";

export const metadata: Metadata = { title: "Sales" };

export default function Page() {
  return (
    <AccessGate sections={["sales"]}>
      <ComingSoon eyebrow="Web / Sales" title="Sales" description="Leads, enquiries and call-back requests from the website." icon={BarChart3} />
    </AccessGate>
  );
}
