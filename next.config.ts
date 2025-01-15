import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.dummyjson.com",
        protocol: "https",
        pathname: "**",
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
  }
};

export default nextConfig;
