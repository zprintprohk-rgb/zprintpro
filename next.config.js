/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'export',      // ✅ 恢复静态导出
  distDir: 'out',        // ✅ 输出到 out 目录
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