import type { Metadata } from "next";
import { Search } from "lucide-react";

import AccessGate from "@/sections/Admin/AccessGate";
import ComingSoon from "@/sections/Admin/ComingSoon";

export const metadata: Metadata = { title: "SEO" };

export default function Page() {
  return (
    <AccessGate sections={["seo"]}>
      <ComingSoon eyebrow="Web / SEO" title="SEO" description="Page titles, descriptions and search settings for viniias.com." icon={Search} />
    </AccessGate>
  );
}
