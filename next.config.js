/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // 国际化通过 app/[locale] 文件路由实现，不在 config 中声明 i18n
};

module.exports = nextConfig;
