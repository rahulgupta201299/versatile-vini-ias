import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // YouTube video thumbnails on the goal pages
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  // Old menu link to the Foundation Batch page (the page was always /foundation-batch-2027-29)
  async redirects() {
    return [
      { source: "/courses/gs-foundation/foundation-batch-2028", destination: "/courses/gs-foundation/foundation-batch-2027-29", permanent: true },
      // Admin: GS Foundation moved under Courses
      { source: "/admin/web/gs-foundation/:path*", destination: "/admin/web/courses/gs-foundation/:path*", permanent: true },
    ];
  },
  // react-pdf runs on the server only (article PDF downloads)
  serverExternalPackages: ["@react-pdf/renderer"],
  // files the PDF route reads at runtime
  outputFileTracingIncludes: {
    "/exams/[category]/[slug]/pdf": ["./src/lib/pdf-fonts/**", "./public/images/logo.png", "./public/images/blogs/**"],
  },
};

export default nextConfig;
