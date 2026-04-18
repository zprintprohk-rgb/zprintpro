#!/usr/bin/env node

/**
 * 站點地圖生成腳本
 * 生成 sitemap.xml 和 sitemap-index.xml
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://zprintpro.com';
const LANGUAGES = ['zh-hk', 'en', 'ja'];

// 分類列表（13個，與實際產品數據一致）
const categories = [
  { slug: 'paper-bags', priority: 0.8 },
  { slug: 'flyers', priority: 0.8 },
  { slug: 'stickers', priority: 0.8 },
  { slug: 'packaging', priority: 0.8 },
  { slug: 'posters', priority: 0.8 },
  { slug: 'books', priority: 0.8 },
  { slug: 'business-cards', priority: 0.8 },
  { slug: 'envelopes', priority: 0.8 },
  { slug: 'menus', priority: 0.8 },
  { slug: 'calendars', priority: 0.8 },
  { slug: 'red-packets', priority: 0.8 },
  { slug: 'banners', priority: 0.8 },
  { slug: 'educational', priority: 0.8 },
];

// 產品列表（79個SKU的slug，與實際產品數據一致）
const products = [
  // Business Cards (9)
  'premium-business-cards', 'thick-business-cards-400g', 'foil-business-cards', 'spot-uv-business-cards',
  'matte-business-cards', 'rounded-corner-cards', 'double-sided-cards', 'same-day-business-cards', 'eco-business-cards',
  // Stickers (8)
  'waterproof-stickers', 'transparent-stickers', 'removable-stickers', 'small-batch-stickers',
  'die-cut-stickers', 'foil-stickers', 'security-stickers', 'fluorescent-stickers',
  // Paper Bags (7)
  'kraft-paper-bags', 'white-card-bags', 'gift-bags', 'eco-paper-bags', 'handle-bags', 'small-bags', 'large-bags',
  // Flyers (7)
  'a4-flyers', 'a5-flyers', 'double-sided-flyers', 'folded-leaflets', 'thick-paper-flyers', 'same-day-flyers', 'eco-flyers',
  // Posters (6)
  'a2-posters', 'a1-posters', 'outdoor-posters', 'display-posters', 'art-posters', 'adhesive-posters',
  // Packaging (6)
  'gift-boxes', 'cosmetic-boxes', 'food-boxes', 'mailer-boxes', 'folding-boxes', 'rigid-boxes',
  // Red Packets (6)
  'foil-red-packets', 'embossed-red-packets', 'custom-red-packets', 'cartoon-red-packets', 'eco-red-packets', 'large-red-packets',
  // Calendars (6)
  'wall-calendars', 'desk-calendars', 'custom-calendars', 'mini-calendars', 'photo-frame-calendars', 'magnetic-calendars',
  // Menus (5)
  'pvc-menus', 'laminated-menus', 'hardcover-menus', 'drink-menus', 'disposable-menus',
  // Banners (5)
  'outdoor-vinyl-banners', 'roll-up-banners', 'adhesive-banners', 'vehicle-wraps', 'mesh-banners',
  // Books (5)
  'catalog-printing', 'saddle-stitch-booklets', 'perfect-bound-books', 'hardcover-books', 'spiral-notebooks',
  // Envelopes (4)
  'business-envelopes', 'colored-envelopes', 'large-envelopes', 'pearl-envelopes',
  // Educational (4)
  'exercise-books', 'certificates', 'school-flyers', 'textbooks',
];

// 博客文章
const blogPosts = [
  'sticker-guide', 'business-card-design', 'packaging-trends', 'cmyk-guide', 'paper-materials', 'eco-printing',
];

// 靜態頁面（帶 trailing slash 與 next.config.js 一致）
const staticPages = [
  { path: '', priority: 1.0, changefreq: 'daily' },
  { path: 'about/', priority: 0.7, changefreq: 'monthly' },
  { path: 'contact/', priority: 0.7, changefreq: 'monthly' },
  { path: 'quote/', priority: 0.9, changefreq: 'weekly' },
  { path: 'faq/', priority: 0.6, changefreq: 'monthly' },
  { path: 'blog/', priority: 0.7, changefreq: 'weekly' },
  { path: 'privacy/', priority: 0.3, changefreq: 'yearly' },
  { path: 'terms/', priority: 0.3, changefreq: 'yearly' },
  { path: 'search/', priority: 0.3, changefreq: 'monthly' },
];

// 生成當前日期
const today = new Date().toISOString().split('T')[0];

// 生成單個語言的 sitemap
function generateLanguageSitemap(lang) {
  const langPath = lang === 'zh-hk' ? '' : `/${lang}`;
  const urls = [];

  // 靜態頁面
  staticPages.forEach(page => {
    urls.push({
      loc: `${SITE_URL}${langPath}/${page.path}`,
      priority: page.priority,
      changefreq: page.changefreq,
      lastmod: today,
    });
  });

  // 分類頁面
  categories.forEach(cat => {
    urls.push({
      loc: `${SITE_URL}${langPath}/category/${cat.slug}/`,
      priority: cat.priority,
      changefreq: 'weekly',
      lastmod: today,
    });
  });

  // 產品頁面
  products.forEach(product => {
    urls.push({
      loc: `${SITE_URL}${langPath}/product/${product}/`,
      priority: 0.6,
      changefreq: 'weekly',
      lastmod: today,
    });
  });

  // 博客文章頁面
  blogPosts.forEach(post => {
    urls.push({
      loc: `${SITE_URL}${langPath}/blog/${post}/`,
      priority: 0.5,
      changefreq: 'monthly',
      lastmod: today,
    });
  });

  // 生成 XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
    ${LANGUAGES.map(l => {
      const lPath = l === 'zh-hk' ? '' : `/${l}`;
      const href = url.loc.replace(langPath, lPath);
      return `<xhtml:link rel="alternate" hreflang="${l === 'zh-hk' ? 'zh-HK' : l}" href="${href}" />`;
    }).join('\n    ')}
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

// 生成 sitemap index
function generateSitemapIndex() {
  const sitemaps = LANGUAGES.map(lang => {
    const langCode = lang === 'zh-hk' ? 'zh' : lang;
    return {
      loc: `${SITE_URL}/sitemap-${langCode}.xml`,
      lastmod: today,
    };
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return xml;
}

// 主函數
function main() {
  const outDir = path.join(process.cwd(), 'out');
  
  // 確保輸出目錄存在
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 生成各語言的 sitemap
  LANGUAGES.forEach(lang => {
    const langCode = lang === 'zh-hk' ? 'zh' : lang;
    const sitemap = generateLanguageSitemap(lang);
    fs.writeFileSync(path.join(outDir, `sitemap-${langCode}.xml`), sitemap);
    console.log(`Generated sitemap-${langCode}.xml`);
  });

  // 生成 sitemap index
  const sitemapIndex = generateSitemapIndex();
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapIndex);
  console.log('Generated sitemap.xml');

  // 生成 robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin paths
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
`;
  fs.writeFileSync(path.join(outDir, 'robots.txt'), robotsTxt);
  console.log('Generated robots.txt');

  console.log('\n✅ Sitemap generation complete!');
  console.log(`📄 Total URLs: ${staticPages.length + categories.length + products.length + blogPosts.length}`);
  console.log(`🌐 Languages: ${LANGUAGES.join(', ')}`);
}

main();
