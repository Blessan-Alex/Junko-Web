import type { NextConfig } from "next";
import redirectsData from "./scripts/redirects.json";

type RedirectRule = {
  source: string;
  destination: string;
  permanent: boolean;
};

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
    return redirectsData as RedirectRule[];
  },
};

export default nextConfig;
