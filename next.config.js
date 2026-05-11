/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // 根路径重定向由 Cloudflare Pages _redirects 文件处理
  // 静态导出模式下 redirects 不生效，移除避免配置冲突
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(__dirname, 'src'),
    };
    return config;
  },
};

module.exports = nextConfig;
