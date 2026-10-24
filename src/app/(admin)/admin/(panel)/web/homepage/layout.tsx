import AccessGate from "@/sections/Admin/AccessGate";

/** Web → Homepage: admins with Homepage or All Exams access (each part checks its own section below). */
export default function HomepageLayout({ children }: { children: React.ReactNode }) {
  return <AccessGate sections={["homepage", "allExams"]}>{children}</AccessGate>;
}
