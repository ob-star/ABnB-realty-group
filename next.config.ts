import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // allow host
  images: {
    remotePatterns: [
      {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
      pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'google.com',
        pathname: '**',
        },
        {
          protocol: 'https',
          hostname: "**",
          pathname: '**',
          },
      ],
      minimumCacheTTL: 60,

  },
};

export default nextConfig;
