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

  // 2026-07-23 v7: drawer-slide-gift-box 合并进 rigid-boxes (K3 拍板, GSC 28天数据 drawer-slide 10展示/1点击 礼盒类最弱, gang-run-card-boxes 顶坑位)
  // 类目 12→12 SKU 维持 (删 1 加 1)
  for (const locale of LOCALES) {
    rules.push({
      source: `/${locale}/product/drawer-slide-gift-box`,
      destination: `/${locale}/product/rigid-boxes`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/product/drawer-slide-gift-box/`,
      destination: `/${locale}/product/rigid-boxes/`,
      permanent: true,
    });
  }

  // 2026-07-27 v22: 名片 → 賀卡 改造 (K3 拍板方案 b, §11 憲法長期衝突清理)
  // 6 SKU × 3 locale + 1 类目 × 3 locale = 21 条 301
  // buying guide 旧 slug (business-card-buying-guide → greeting-card-buying-guide) 也走 next.config.js
  // 完整 7 旧 SKU 类目 slug → 新 slug 映射
  const V22_REDIRECTS = [
    // 6 SKU 1:1 映射
    ['premium-business-cards', 'premium-greeting-cards'],
    ['thick-business-cards-400g', 'thick-greeting-cards-400g'],
    ['foil-business-cards', 'foil-greeting-cards'],
    ['spot-uv-business-cards', 'spot-uv-greeting-cards'],
    ['matte-business-cards', 'matte-greeting-cards'],
    ['rounded-corner-cards', 'rounded-corner-greeting-cards'],
    // 类目
    ['business-cards', 'greeting-cards'],
    // buying guide
    ['business-card-buying-guide', 'greeting-card-buying-guide'],
  ];
  for (const [oldSlug, newSlug] of V22_REDIRECTS) {
    for (const locale of LOCALES) {
      // 不带尾斜杠版本
      rules.push({
        source: `/${locale}/product/${oldSlug}`,
        destination: `/${locale}/product/${newSlug}`,
        permanent: true,
      });
      // 带尾斜杠版本 (避免 trailingSlash 二次 308, K3 7/15 fix)
      rules.push({
        source: `/${locale}/product/${oldSlug}/`,
        destination: `/${locale}/product/${newSlug}/`,
        permanent: true,
      });
    }
  }
  // 类目路径 /category/business-cards/ → /category/greeting-cards/ (3 locale)
  for (const locale of LOCALES) {
    rules.push({
      source: `/${locale}/category/business-cards`,
      destination: `/${locale}/category/greeting-cards`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/category/business-cards/`,
      destination: `/${locale}/category/greeting-cards/`,
      permanent: true,
    });
  }
  // buying guide /blog/business-card-buying-guide/ → /blog/greeting-card-buying-guide/ (3 locale)
  for (const locale of LOCALES) {
    rules.push({
      source: `/${locale}/blog/business-card-buying-guide`,
      destination: `/${locale}/blog/greeting-card-buying-guide`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/blog/business-card-buying-guide/`,
      destination: `/${locale}/blog/greeting-card-buying-guide/`,
      permanent: true,
    });
  }

  // 2026-08-03 K3 10:09 拍板 8/3 PDP 404 修: 3 简化对象 (paper-bags / stickers / custom-stickers) 301 → /category/{slug}/
  // 根因: products.ts 4 字段简化对象 (slug + name + 3 locale name + sort_order) 缺 category_slug / description / images / basePrice, build 时 generateStaticParams 不生成路径
  // §0.6 P0 警报: paper-bags 78 matrix hits + custom-stickers 9 matrix hits 7 天 0 命中 (404)
  // §0.7 301 接收端必须加内链分发权重, /category/paper-bags/ 已有 5+ 内链入口 (其他产品页 + 类目页)
  const PDP_404_REDIRECTS = [
    ['paper-bags', 'paper-bags'],        // 78 hits matrix 继承
    ['stickers', 'stickers'],            // 1 hit matrix 保留
    ['custom-stickers', 'stickers'],     // 9 hits matrix 合并到 stickers
  ];
  for (const [oldSlug, targetCategory] of PDP_404_REDIRECTS) {
    for (const locale of LOCALES) {
      // 不带尾斜杠版本
      rules.push({
        source: `/${locale}/product/${oldSlug}`,
        destination: `/${locale}/category/${targetCategory}/`,
        permanent: true,
      });
      // 带尾斜杠版本 (避免 trailingSlash 二次 308)
      rules.push({
        source: `/${locale}/product/${oldSlug}/`,
        destination: `/${locale}/category/${targetCategory}/`,
        permanent: true,
      });
    }
  }

  // 2026-08-04 K3 05:54 拍板 GSC 31 URL 404 修: 8/3 f2156dc9 后 31 URL 仍 404 摸底
  // 根因: locale 重复 (3) + 旧 SKU 已合并/删 (10) + 类目/服务迁移 (3) + 系统路径 (4) + 乱码 (6, 不修)
  // §0.6 P0 警报: 20 URL 真 404 影响 GSC 健康度
  // §0.7 301 接收端必须加内链分发权重, 类目页都有 5+ 内链入口
  const GSC_404_REDIRECTS = [
    // 模式 A: locale 重复 (/zh-hk/zh-hk/.../ -> /zh-hk/.../) - 3 rules
    // 模式 B: 旧 SKU -> 类目页 - 12 rules
    ['cosmetics-packaging-box', 'packaging'],
    ['double-sided-cards', 'greeting-cards'],
    ['same-day-business-cards', 'greeting-cards'],
    ['eco-business-cards', 'greeting-cards'],
    ['small-bags', 'paper-bags'],
    // 模式 C: 服务/路由迁移 - 3 rules
    ['ja/services/same-day-printing-delivery', 'ja/services/rush-printing-delivery'],
    ['ja/services/seo/postcard-set', 'category/japan-doujin'],
    ['ja/services/seo/eco-tote-bag', 'category/paper-bags'],
    ['catalogs', 'category/books'],
  ];
  for (const [oldSlug, target] of GSC_404_REDIRECTS) {
    for (const locale of LOCALES) {
      // 判断 target 形式
      const isCategory = target.startsWith('category/');
      const isService = target.includes('/services/');
      const targetCat = isCategory ? target.replace('category/', '') : target;
      const dest = isCategory
        ? `/${locale}/category/${targetCat}/`
        : isService
          ? `/${locale}/${target}/`
          : `/${locale}/category/${target}/`;

      // 不带尾斜杠版本
      rules.push({
        source: `/${locale}/product/${oldSlug}`,
        destination: dest,
        permanent: true,
      });
      // 带尾斜杠版本
      rules.push({
        source: `/${locale}/product/${oldSlug}/`,
        destination: dest,
        permanent: true,
      });
    }
  }
  // 2026-09-05 W4 v34: GSC /en/catalogs 品类页 404 (13 词 227 展示) 301 收拢 -> books 类目页
  // 依据: GSC_404_REDIRECTS 循环只生成 /{locale}/product/{oldSlug} source (本文件原 L216-241),
  // 打补丁前全文件 grep `catalogs` = 0 命中 -> category/catalogs 原不在任何 source 中;
  // GSC 实报形态为 /en/catalogs -> 裸 catalogs 与 category/catalogs 两种形态都覆盖。
  // destination 带尾斜杠对齐 trailingSlash:true (文件头 L15 注释), 避免二次 308。
  for (const locale of LOCALES) {
    rules.push({
      source: `/${locale}/category/catalogs`,
      destination: `/${locale}/category/books/`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/category/catalogs/`,
      destination: `/${locale}/category/books/`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/catalogs`,
      destination: `/${locale}/category/books/`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/catalogs/`,
      destination: `/${locale}/category/books/`,
      permanent: true,
    });
  }

  // 2026-09-05 W5 v34: GSC booklets/rush-printing 品类页 404 (45 词 813 展示) 308 收拢
  // - booklets -> books: exercise book/saddle stitch/教材製本 系承接 books 类目
  //   (词图 v2 审计: en 17 词 301 展示 / zh-hk 5 词 140 / ja 6 词 93)
  // - rush-printing -> flyers: 即日印刷词群语义即 flyers 即日 hook
  //   (ja 即日 印刷 12 + 印刷 即日 10 / zh-hk 即日印刷 35 + a2 印刷 即日 8)
  // destination 带尾斜杠对齐 trailingSlash:true, permanent:true 产出 308;
  // 与 W4 catalogs 独立块同构, 可独立回滚。
  for (const locale of LOCALES) {
    rules.push({
      source: `/${locale}/category/booklets`,
      destination: `/${locale}/category/books/`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/category/booklets/`,
      destination: `/${locale}/category/books/`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/booklets`,
      destination: `/${locale}/category/books/`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/booklets/`,
      destination: `/${locale}/category/books/`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/category/rush-printing`,
      destination: `/${locale}/category/flyers/`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/category/rush-printing/`,
      destination: `/${locale}/category/flyers/`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/rush-printing`,
      destination: `/${locale}/category/flyers/`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/rush-printing/`,
      destination: `/${locale}/category/flyers/`,
      permanent: true,
    });
  }

  // /product/{oldSlug}/ (无 locale 前缀, GSC 索引的根路径) 3 locale
  for (const [oldSlug, target] of [
    ['double-sided-cards', 'greeting-cards'],
    ['eco-business-cards', 'greeting-cards'],
    ['small-bags', 'paper-bags'],
  ]) {
    rules.push({
      source: `/product/${oldSlug}`,
      destination: `/category/${target}/`,
      permanent: true,
    });
    rules.push({
      source: `/product/${oldSlug}/`,
      destination: `/category/${target}/`,
      permanent: true,
    });
  }
  // 模式 A: locale 重复 6 rules (/zh-hk/zh-hk/services/rush-printing-delivery/ × 3 locale)
  for (const locale of LOCALES) {
    rules.push({
      source: `/${locale}/${locale}/services/rush-printing-delivery`,
      destination: `/${locale}/services/rush-printing-delivery/`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/${locale}/services/rush-printing-delivery/`,
      destination: `/${locale}/services/rush-printing-delivery/`,
      permanent: true,
    });
  }
  // 模式 C: /zh-hk/product/packaging/ -> /category/packaging/ (3 locale, 跟 8/3 paper-bags 一致)
  for (const locale of LOCALES) {
    rules.push({
      source: `/${locale}/product/packaging`,
      destination: `/${locale}/category/packaging/`,
      permanent: true,
    });
    rules.push({
      source: `/${locale}/product/packaging/`,
      destination: `/${locale}/category/packaging/`,
      permanent: true,
    });
  }

  // 2026-08-04 K3 09:47 拍板 攒批 A 修: 9:30 verify PARTIAL 7 URL 修
  // §0.1 第 2 例外 (K3 8/4 拍板 攒批跟 daily cron 1 commit + 1 push)
  // §0.7 301 接收端 /category/{slug}/ + /blog/{slug}/ + /services/{slug}/ 5+ 内链入口 ✅
  // 14 redirect rules (7 路径 × 2 trailing slash)
  // 根因: e6a61a6 6 模式分类错 4 个 — 模式 A 漏算 /zh-hk/zh-hk/product/{X}/ (只列 services/),
  //       模式 C 修 /zh-hk/product/packaging/ 错配 (GSC 报 404 的是 /zh-hk/packaging/ 无 /product/),
  //       模式 E 把 /ja/services/seo/{X}/ 误判乱码 (实际是 services 路径错位, 走 /blog/ 跟 /category/ 互争),
  //       /zh-hk/product/ (无 slug) 模式 E placeholder 实际是真 404
  const GSC_404_R2 = [
    // #1 /zh-hk/packaging/ → /zh-hk/category/packaging/ (e6a61a6 模式 C source 多 /product/)
    ['/zh-hk/packaging', '/zh-hk/category/packaging/'],
    // #2 /zh-hk/zh-hk/product/cosmetics-packaging-box/ → /zh-hk/category/packaging/
    ['/zh-hk/zh-hk/product/cosmetics-packaging-box', '/zh-hk/category/packaging/'],
    // #3 /zh-hk/zh-hk/product/eco-business-cards/ → /zh-hk/category/packaging/
    ['/zh-hk/zh-hk/product/eco-business-cards', '/zh-hk/category/packaging/'],
    // #4 /ja/services/same-day-printing-delivery/ → /ja/services/rush-printing-delivery/
    //   (e6a61a6 template 写错 source 多 /product/, destination 改 /ja/services/rush-printing-delivery/)
    ['/ja/services/same-day-printing-delivery', '/ja/services/rush-printing-delivery/'],
    // #5 /ja/services/seo/postcard-set/ → /ja/blog/postcard-set/ (跟 #4 同样 template 错, destination 走 /blog/)
    ['/ja/services/seo/postcard-set', '/ja/blog/postcard-set/'],
    // #6 /ja/services/seo/eco-tote-bag/ → /ja/blog/eco-tote-bag/ (同上)
    ['/ja/services/seo/eco-tote-bag', '/ja/blog/eco-tote-bag/'],
    // #7 /zh-hk/product/ (无 slug, GSC 报 404 实际真 404) → /zh-hk/category/
    ['/zh-hk/product', '/zh-hk/category/'],
  ];
  for (const [source, dest] of GSC_404_R2) {
    rules.push({ source: source, destination: dest, permanent: true });
    rules.push({ source: source + '/', destination: dest, permanent: true });
  }

  // 模式 D: 系统路径 404 (GSC 抓错, 加 noindex 兜底)
  // /upload/, /license/, /cdn-cgi/email-protection 不重定向, 让 Google 自然去索引
  // (GSC 自动 90 天清理 stale 404)

  // 2026-09-05 v23: /servis/ spelling typo collapse (blog CTA mass-404 fix, user-reported on
  // zh-hk/blog/rush-printing-hk-guide section 9 CTA). Content sources already fixed in
  // blog-data/{zh-hk,ja,en}.json (38 URL occurrences); these 301s catch URLs already
  // indexed by GSC or linked externally.
  // Targets: rush-printing-delivery -> real service page; business-envelopes -> real SKU;
  // category/servis -> services hub page.
  const LOCALES_R3 = ['zh-hk', 'en', 'ja'];
  const SERVIS_TYPO_MAP = [
    ['servis/rush-printing-delivery', 'services/rush-printing-delivery/'],
    ['servis/business-envelopes', 'product/business-envelopes/'],
    ['category/servis', 'services/'],
  ];
  for (const locale of LOCALES_R3) {
    for (const [badPath, goodPath] of SERVIS_TYPO_MAP) {
      rules.push({
        source: `/${locale}/${badPath}`,
        destination: `/${locale}/${goodPath}`,
        permanent: true,
      });
      rules.push({
        source: `/${locale}/${badPath}/`,
        destination: `/${locale}/${goodPath}`,
        permanent: true,
      });
    }
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