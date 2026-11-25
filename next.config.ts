import type { NextConfig } from "next";

import { SITE_URL } from "./lib/site-url";

const nextConfig: NextConfig = {
  async redirects() {
    return ["beshvil-halev.vercel.app", "www.shvilalev.co.il"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: `${SITE_URL}/:path*`,
      permanent: true,
    }));
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [64, 96, 128, 160, 192, 256, 320, 384],
  },
};

export default nextConfig;
