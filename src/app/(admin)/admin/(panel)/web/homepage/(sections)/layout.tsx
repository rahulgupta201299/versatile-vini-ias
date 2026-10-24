import AccessGate from "@/sections/Admin/AccessGate";

/** Homepage sections (banners, free resources, Select Your Goal, top rankers): admins with Homepage access. */
export default function HomepageSectionsLayout({ children }: { children: React.ReactNode }) {
  return <AccessGate sections={["homepage"]}>{children}</AccessGate>;
}
