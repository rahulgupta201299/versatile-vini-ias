import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import { ACCESS } from "@/lib/adminAccess";
import AccessGate from "@/sections/Admin/AccessGate";
import ComingSoon from "@/sections/Admin/ComingSoon";

export const metadata: Metadata = { title: "Store Dashboard" };

export default function Page() {
  return (
    <AccessGate access={ACCESS.store}>
      <ComingSoon eyebrow="Store / Dashboard" title="Store Dashboard" description="Books, study material and orders in the VINI store." icon={ShoppingBag} />
    </AccessGate>
  );
}
