/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  async redirects() {
    return [
      {
        source: '/scheduling',
        destination: '/booking',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
