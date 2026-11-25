import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets phones on the local network load dev assets (dev server only).
  allowedDevOrigins: ["10.0.0.4"],
  experimental: {
    // The dev filesystem cache grew to several GB and filled the disk.
    turbopackFileSystemCacheForDev: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [64, 96, 128, 160, 192, 256, 320, 384],
  },
};

export default nextConfig;
