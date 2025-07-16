/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // Enable static export for easier deployment
  output: 'export',
  trailingSlash: false,
  // Configure asset paths for static export
  assetPrefix: '',
}

module.exports = nextConfig