import type { NextConfig } from "next";

// Static export so the site can be hosted on GitHub Pages (project site => /threads).
// Build with NEXT_PUBLIC_BASE_PATH=/threads for Pages; leave it empty for local preview.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
