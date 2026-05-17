import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: "cdn11.dienmaycholon.vn",
      },
    ],
  },
};

export default nextConfig;
