import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // YouTube video thumbnails on the goal pages
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  // react-pdf runs on the server only (article PDF downloads)
  serverExternalPackages: ["@react-pdf/renderer"],
  // files the PDF route reads at runtime
  outputFileTracingIncludes: {
    "/exams/[category]/[slug]/pdf": ["./src/lib/pdf-fonts/**", "./public/images/logo.png", "./public/images/blogs/**"],
  },
};

export default nextConfig;
