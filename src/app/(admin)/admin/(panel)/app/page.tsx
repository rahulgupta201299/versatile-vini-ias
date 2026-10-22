import type { Metadata } from "next";
import { Smartphone } from "lucide-react";
import { ACCESS } from "@/lib/adminAccess";
import AccessGate from "@/sections/Admin/AccessGate";
import ComingSoon from "@/sections/Admin/ComingSoon";

export const metadata: Metadata = { title: "App Dashboard" };

export default function Page() {
  return (
    <AccessGate access={ACCESS.app}>
      <ComingSoon eyebrow="App / Dashboard" title="App Dashboard" description="Content and settings for the VINI mobile app." icon={Smartphone} />
    </AccessGate>
  );
}
