import Box from "@mui/material/Box";
import Header from "@/sections/Header/Header";
import Footer from "@/sections/Footer/Footer";
import SiteOverlays from "./SiteOverlays";

/** Main-site chrome: header, footer and popups. Used by app/(site)/layout.tsx and the root 404 page. */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />
      <SiteOverlays />
    </Box>
  );
}
