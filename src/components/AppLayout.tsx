import Box from "@mui/material/Box";
import Header from "@/sections/Header/Header";
import Footer from "@/sections/Footer/Footer";
import ImportantExams from "@/sections/Blog/ImportantExams";
import { getSiteData } from "@/services/site";
import SiteOverlays from "./SiteOverlays";

/** Main-site chrome: header, "Important Exams" links, footer and popups. Used by app/(site)/layout.tsx and the root 404 page. */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { importantExamsTitle, importantExams } = (await getSiteData()).config.footer;

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <ImportantExams title={importantExamsTitle} columns={importantExams} />
      <Footer />
      <SiteOverlays />
    </Box>
  );
}
