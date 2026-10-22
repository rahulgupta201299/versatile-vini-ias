import type { Metadata } from "next";
import CelebrationBannerEditor from "@/sections/Admin/celebration/CelebrationBannerEditor";

export const metadata: Metadata = { title: "New celebration banner" };

export default function NewCelebrationBannerPage() {
  return <CelebrationBannerEditor />;
}
