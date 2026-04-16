#!/usr/bin/env node

/**
 * 站點地圖生成腳本
 * 生成 sitemap.xml 和 sitemap-index.xml
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://zprintpro.com';
const LANGUAGES = ['zh-hk', 'en', 'ja'];

// 分類列表
const categories = [
  { slug: 'stickers', priority: 0.8 },
  { slug: 'labels', priority: 0.8 },
  { slug: 'cards', priority: 0.8 },
  { slug: 'booklets', priority: 0.8 },
  { slug: 'packaging', priority: 0.8 },
  { slug: 'large-format', priority: 0.8 },
  { slug: 'stationery', priority: 0.8 },
  { slug: 'promotional', priority: 0.8 },
];

// 產品列表（79個SKU的slug）
const products = [
  // Stickers
  'circular-stickers', 'rectangular-stickers', 'die-cut-stickers', 'kiss-cut-stickers',
  'hologram-stickers', 'clear-stickers', 'foil-stickers', 'security-stickers',
  'vinyl-stickers', 'removable-stickers',
  // Labels
  'product-labels', 'shipping-labels', 'food-labels', 'cosmetic-labels',
  'wine-labels', 'thermal-labels', 'barcode-labels', 'qr-code-labels',
  'asset-labels', 'cable-labels',
  // Cards
  'business-cards', 'name-cards', 'postcards', 'greeting-cards',
  'thank-you-cards', 'appointment-cards', 'loyalty-cards', 'gift-cards',
  'invitation-cards', 'rack-cards',
  // Booklets
  'booklets', 'catalogues', 'brochures', 'flyers',
  'leaflets', 'menus', 'annual-reports', 'magazines',
  'notebooks', 'calendars',
  // Packaging
  'product-boxes', 'mailer-boxes', 'shopping-bags', 'gift-boxes',
  'paper-bags', 'tissue-paper', 'stickers-seals', 'hang-tags',
  'sleeve-packaging', 'corrugated-mailers',
  // Large Format
  'banners', 'posters', 'foam-boards', 'roll-up-banners',
  'vinyl-banners', 'backdrops', 'window-graphics', 'floor-graphics',
  'vehicle-wraps', 'canvas-prints',
  // Stationery
  'letterheads', 'envelopes', 'notepads', 'folders',
  'ncr-forms', 'invoices', 'compliment-slips', 'sticky-notes',
  'desk-pads', 'certificates',
  // Promotional
  'bookmarks', 'magnets', 'coasters', 'lanyards',
  'badges', 'tote-bags', 'pens', 'mouse-pads',
  'keychains',
];

// 靜態頁面
const staticPages = [
  { path: '', priority: 1.0, changefreq: 'daily' },
  { path: 'about', priority: 0.7, changefreq: 'monthly' },
  { path: 'contact', priority: 0.7, changefreq: 'monthly' },
  { path: 'quote', priority: 0.9, changefreq: 'weekly' },
  { path: 'faq', priority: 0.6, changefreq: 'monthly' },
  { path: 'blog', priority: 0.7, changefreq: 'weekly' },
  { path: 'sitemap', priority: 0.5, changefreq: 'monthly' },
  { path: 'privacy', priority: 0.3, changefreq: 'yearly' },
  { path: 'terms', priority: 0.3, changefreq: 'yearly' },
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
  console.log(`📄 Total URLs: ${staticPages.length + categories.length + products.length}`);
  console.log(`🌐 Languages: ${LANGUAGES.join(', ')}`);
}

main();
