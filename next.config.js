/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // Enable static export for easier deployment
  output: 'export',
  trailingSlash: true,
  // Configure asset paths for static export
  assetPrefix: '',
}

module.exports = nextConfig