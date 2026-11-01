import type { NextConfig } from "next";
import redirectsData from "./scripts/redirects.json";
import { getSecurityHeaders } from "./src/lib/security/security-headers";

type RedirectRule = {
  source: string;
  destination: string;
  permanent: boolean;
};

const nextConfig: NextConfig = {
  serverExternalPackages: ["firebase-admin"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 1080, 1920],
    imageSizes: [256, 384],
    formats: ['image/webp'],
  },
  async redirects() {
    return redirectsData as RedirectRule[];
  },
  async headers() {
    const securityHeaders = getSecurityHeaders();
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
