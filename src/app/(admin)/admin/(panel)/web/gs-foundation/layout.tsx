import AccessGate from "@/sections/Admin/AccessGate";

/** Web → GS Foundation: admins with GS Foundation access. */
export default function GsFoundationLayout({ children }: { children: React.ReactNode }) {
  return <AccessGate sections={["gsFoundation"]}>{children}</AccessGate>;
}
