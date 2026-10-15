import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // react-pdf runs on the server only (article PDF downloads)
  serverExternalPackages: ["@react-pdf/renderer"],
  // files the PDF route reads at runtime
  outputFileTracingIncludes: {
    "/exams/[category]/[slug]/pdf": ["./src/lib/pdf-fonts/**", "./public/images/logo.png", "./public/images/blogs/**"],
  },
};

export default nextConfig;
