import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The staff dashboard is never indexed (it also sets noindex in its metadata)
  async headers() {
    return [
      // ":path*" also matches /admin itself
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  // The old Vercel address permanently redirects to the real domain, keeping the path
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "fitlens-landing.vercel.app" }],
        destination: "https://usefitlens.com/:path*",
        permanent: true,
      },
      // The Trainerize comparison page was removed; send old links and search results to the trainer page
      {
        source: "/compare/:path*",
        destination: "/for-trainers",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
