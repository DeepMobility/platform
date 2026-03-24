import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

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

export default withNextIntl(nextConfig);
