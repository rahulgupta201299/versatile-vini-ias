import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { SiteDataProvider } from "@/context/SiteDataContext";
import { getSiteData } from "@/services/site";
import { COLORS } from "@/theme/colors";
import { fontVariables } from "@/theme/fonts";

export const viewport: Viewport = {
  themeColor: COLORS.red,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Vini IAS (विनी IAS) | Premier UPSC & BPSC Coaching Platform",
  description:
    "Vini IAS is India's leading EdTech platform for UPSC CSE, 71st BPSC, and State PCS examinations. Learn from top educators and serving civil servants with live classes, answer writing mentorship, and all-India test series.",
  keywords: [
    "Vini IAS",
    "UPSC Coaching",
    "71st BPSC Foundation",
    "BPSC Toppers",
    "Shashank Gaurav Rank 2",
    "Civil Services Preparation",
    "Daily Answer Writing",
    "UPSC Mentorship",
    "Ethics and Essay Masterclass",
    "State PCS Notes",
  ],
  authors: [{ name: "Vini Eduventure Pvt. LTD." }],
  creator: "Vini IAS",
  publisher: "Vini Eduventure Pvt. LTD.",
  metadataBase: new URL("https://viniias.com"),
  openGraph: {
    title: "Vini IAS (विनी IAS) - Crack UPSC & BPSC with Top Rankers",
    description:
      "Join Bihar & East India's most trusted civil service preparation platform with over 1000+ selections in 70th BPSC and UPSC.",
    url: "https://viniias.com",
    siteName: "Vini IAS",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 320,
        height: 132,
        alt: "Vini IAS EdTech Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vini IAS - Premier UPSC & BPSC Coaching",
    description: "Rank 2, 5, 8, 10 BPSC Achievers Guidance & Comprehensive UPSC Batches",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

/** Root shell shared by every route group: <html>/<body>, theme and site-wide data. Page chrome lives in the group layouts — (site) and (vini-ai). */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Site-wide data (menus, exams, contact, footer) — fetched once, cached, shared with client components
  const siteData = await getSiteData();
  const { contact, social, app } = siteData.config;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Vini IAS",
    alternateName: "विनी IAS",
    url: "https://viniias.com",
    logo: "https://viniias.com/images/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.tel.replace(/^tel:/, ""),
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [...Object.values(social), app.googlePlay, app.appStore].filter((url) => url.startsWith("http")),
    description:
      "Premier Indian EdTech institution providing UPSC Civil Services, BPSC, and State PCS online and offline classroom coaching.",
  };

  return (
    <html lang="en" className={fontVariables}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeRegistry>
          <SiteDataProvider value={siteData}>
            {children}
          </SiteDataProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
