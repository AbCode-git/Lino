/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com'],
    formats: ['image/webp'],
  },
  // Enable code splitting and lazy loading by default
  webpack(config) {
    return config;
  },
}

module.exports = nextConfig;