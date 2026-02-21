import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "drive.usercontent.google.com",
        port: "",
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: false,
  trailingSlash: false,
};

export default nextConfig;
