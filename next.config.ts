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

      ],
      minimumCacheTTL: 60,

  },
};

export default nextConfig;
