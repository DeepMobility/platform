import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 's3-alpha-sig.figma.com',
      },
    ],
  },
};

export default nextConfig;
