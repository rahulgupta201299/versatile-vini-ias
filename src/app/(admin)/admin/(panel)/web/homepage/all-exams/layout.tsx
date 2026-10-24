import AccessGate from "@/sections/Admin/AccessGate";

/** Homepage → All Exams: admins with All Exams access. */
export default function AllExamsLayout({ children }: { children: React.ReactNode }) {
  return <AccessGate sections={["allExams"]}>{children}</AccessGate>;
}
