import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol:'https',
        hostname:"*",
      }
    ]
  },
  experimental: {
    ppr: 'incremental'
  },
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "bottom-right"
  }
  /* config options here */
};

export default nextConfig;
