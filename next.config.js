/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    domains: ['m.media-amazon.com', 'encrypted-tbn0.gstatic.com', 'encrypted-tbn1.gstatic.com', 'encrypted-tbn2.gstatic.com', 'encrypted-tbn3.gstatic.com', 'encrypted-tbn4.gstatic.com', 'encrypted-tbn5.gstatic.com', 'encrypted-tbn6.gstatic.com', 'encrypted-tbn7.gstatic.com',],
  }
}

module.exports = nextConfig
