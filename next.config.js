/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'export',
  distDir: 'out',
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
  // 国际化通过 app/[locale] 文件路由实现，不在 config 中声明 i18n
};

module.exports = nextConfig;
