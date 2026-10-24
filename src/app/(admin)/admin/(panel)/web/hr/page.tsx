import type { Metadata } from "next";
import { Users } from "lucide-react";

import AccessGate from "@/sections/Admin/AccessGate";
import ComingSoon from "@/sections/Admin/ComingSoon";

export const metadata: Metadata = { title: "HR & Careers" };

export default function Page() {
  return (
    <AccessGate sections={["hr"]}>
      <ComingSoon eyebrow="Web / HR & Careers" title="HR & Careers" description="Job openings and applications from the careers page." icon={Users} />
    </AccessGate>
  );
}
