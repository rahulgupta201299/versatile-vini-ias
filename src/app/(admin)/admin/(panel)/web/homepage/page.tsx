import type { Metadata } from "next";
import HomepageManager from "@/sections/Admin/web/HomepageManager";

export const metadata: Metadata = { title: "Homepage" };

export default function HomepagePage() {
  return <HomepageManager />;
}
