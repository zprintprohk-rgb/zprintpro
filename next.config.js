/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // output: 'export',
  // distDir: 'out',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(__dirname, 'src'),
    };
    return config;
  },
};

module.exports = nextConfig;
