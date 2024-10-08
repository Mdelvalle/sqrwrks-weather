import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "plus.unsplash.com" },
      { hostname: "openweathermap.org" },
    ],
  },
};

export default nextConfig;
