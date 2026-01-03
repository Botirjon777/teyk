import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "192.168.1.119",
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'teyk-app.directus.app',
        pathname: '/assets/**',
      },
    ],
  },
};

export default nextConfig;
