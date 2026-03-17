import type { NextConfig } from "next";
import redirectsData from "./scripts/redirects.json";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  async redirects() {
    return redirectsData as any;
  },
};

export default nextConfig;
