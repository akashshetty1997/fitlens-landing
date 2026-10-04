import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The old Vercel address permanently redirects to the real domain, keeping the path
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "fitlens-landing.vercel.app" }],
        destination: "https://usefitlens.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
