import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "api.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
