/** @type {import('next').NextConfig} */
const path = require('path');

// ============================================================================
// 404 修复：/guide/ → /blog/ 通配重定向
// 触发：GSC 报 87 个 /<locale>/guide/<slug>/ 不适用
// 根因：app/[locale]/guide/[slug]/page.tsx 只覆盖 3 个 pillar slug，
//       而全站共有 30 个 guide 类 slug 走 /blog/[slug]/ 路由。
// 修复：所有 /<locale>/guide/<anything>/ → /<locale>/blog/<anything>/
//       + 裸 /<locale>/guide/ → /<locale>/blog/
//
// 斜杠规则（重要）：
//   trailingSlash: true → 所有请求会被规范化到带尾斜杠的 URL
//   Next.js redirects() 的 source 必须以 / 结尾才能正确匹配带尾斜杠的请求
//   destination 也必须以 / 结尾，否则会触发二次 308 重定向
// ============================================================================

const LOCALES = ['zh-hk', 'en', 'ja'];

function buildGuideRedirects() {
  const rules = [];

  for (const locale of LOCALES) {
    // 1) 裸 /guide 列表页 → /blog/ 列表页
    //    同时写"不带斜杠"和"带斜杠"两个 source，
    //    避免 trailingSlash 重定向和我们的 redirect 冲突产生重定向环
    rules.push({
      source: `/${locale}/guide`,
      destination: `/${locale}/blog`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/guide/`,
      destination: `/${locale}/blog/`,
      permanent: true,
    });

    // 2) /guide/<slug>/ → /blog/<slug>/（通配）
    //    用 :slug+ 强制至少 1 个字符，避免吞掉裸 /guide/（虽然上面已经处理了，双保险）
    //    destination 同样以 / 结尾，跟 trailingSlash: true 对齐
    //    2026-07-15 修 GSC "重定向错误"（87 个 /<locale>/guide/* 报 2 跳链）:
    //    destination 必须带尾斜杠，避免 trailingSlash 二次 308
    rules.push({
      source: `/${locale}/guide/:slug+`,
      destination: `/${locale}/blog/:slug+/`,
      permanent: true,
    });
  }

  // 3) 不重定向 /<locale>/payment/success/ —
  //    该路由实际存在（构建路由表确认），GSC 报 404 是 CF 边缘缓存了旧 build 的 404
  //    处理方案：部署后到 CF Dashboard → Caching → Purge Everything，
  //    让新 build 的 200 响应覆盖旧缓存即可。

  // returns/ → help-center/ (退货政策内容在 help-center 的 Returns tab)
  for (const locale of LOCALES) {
    rules.push({
      source: `/${locale}/returns`,
      destination: `/${locale}/help-center/`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/returns/`,
      destination: `/${locale}/help-center/`,
      permanent: true,
    });
  }

  // custom-gift-boxes → gift-boxes (旧 slug 已弃用)
  for (const locale of LOCALES) {
    rules.push({
      source: `/${locale}/product/custom-gift-boxes`,
      destination: `/${locale}/product/gift-boxes`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/product/custom-gift-boxes/`,
      destination: `/${locale}/product/gift-boxes/`,
      permanent: true,
    });
  }

  // 2026-07-22 v6: gift-boxes 合并进 rigid-boxes (K3 拍板, GSC 28天数据 gift-boxes 227展示 pos 58-72 跟 rigid-boxes 285展示 pos 48-78 互相抢词)
  // 类目 13→12 SKU 集中权重, 1 屏展示
  for (const locale of LOCALES) {
    rules.push({
      source: `/${locale}/product/gift-boxes`,
      destination: `/${locale}/product/rigid-boxes`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/product/gift-boxes/`,
      destination: `/${locale}/product/rigid-boxes/`,
      permanent: true,
    });
  }

  return rules;
}

const nextConfig = {
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
  async redirects() {
    return buildGuideRedirects();
  },
};

module.exports = nextConfig;