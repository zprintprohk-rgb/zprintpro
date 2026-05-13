/**
 * Generate sitemap.xml for static export
 * Reads slugs from source files and outputs to public/sitemap.xml
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://zprintpro.com';
const TODAY = new Date().toISOString().split('T')[0];

// --- Extract data from TypeScript files using regex ---

function extractSlugsFromTs(filePath, pattern) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugs = [];
  let match;
  while ((match = pattern.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return [...new Set(slugs)];
}

// 1. Categories
const categorySlugs = extractSlugsFromTs(
  path.join(__dirname, '../src/data/products.ts'),
  /slug:\s*['"]([^'"]+)['"],\s*name:/g
);

// 2. Products
const productSlugs = extractSlugsFromTs(
  path.join(__dirname, '../src/data/products.ts'),
  /slug:\s*['"]([^'"]+)['"],\s*\n\s*category:/g
);

// 3. Blog legacy articles
const blogSlugs = [
  'company-intro',
  'hong-kong-printing-guide',
  'design-file-specs',
  'brand-materials-checklist',
  'mtr-advertising-specs',
  'sticker-guide',
  'business-card-design',
  'packaging-trends',
  'cmyk-guide',
  'paper-materials',
  'eco-printing',
];

// 4. Buying guides
const guideSlugs = extractSlugsFromTs(
  path.join(__dirname, '../src/data/buying-guides.ts'),
  /slug:\s*['"]([^'"]+)['"],/g
);

// 5. Cluster articles
const clusterSlugs = extractSlugsFromTs(
  path.join(__dirname, '../src/data/pillar-content.ts'),
  /slug:\s*['"]([^'"]+)['"],/g
);

// Combine all blog slugs (legacy + guides + clusters)
const allBlogSlugs = [...new Set([...blogSlugs, ...guideSlugs, ...clusterSlugs])];

// 6. Static pages
const staticPages = [
  '',                          // home
  'about/',
  'blog/',
  'case-studies/',
  'contact/',
  'faq/',
  'help-center/',
  'service-areas/',
  'company-news/',
  // commerce pages - lower priority
  'cart/',
  'checkout/',
  'order-confirmation/',
  'payment/success/',
  // legal - noindex but include for completeness
  'privacy/',
  'terms/',
];

// Priority mapping
function getPriority(urlPath) {
  if (urlPath === '') return '1.0';
  if (urlPath.startsWith('category/')) return '0.8';
  if (urlPath.startsWith('product/')) return '0.9';
  if (urlPath.startsWith('blog/')) return '0.7';
  if (['about/', 'contact/', 'faq/', 'service-areas/', 'case-studies/'].includes(urlPath)) return '0.7';
  if (['cart/', 'checkout/', 'order-confirmation/', 'payment/success/'].includes(urlPath)) return '0.3';
  if (['privacy/', 'terms/'].includes(urlPath)) return '0.3';
  return '0.5';
}

function getChangefreq(urlPath) {
  if (urlPath === '') return 'daily';
  if (urlPath.startsWith('category/')) return 'weekly';
  if (urlPath.startsWith('product/')) return 'weekly';
  if (urlPath.startsWith('blog/')) return 'monthly';
  return 'monthly';
}

const locales = ['zh-hk', 'en', 'ja'];

const urls = [];

// Home pages
locales.forEach((locale) => {
  urls.push({ loc: `${BASE_URL}/${locale}/`, priority: '1.0', changefreq: 'daily' });
});

// Static pages
staticPages.forEach((page) => {
  if (page === '') return; // already done as home
  locales.forEach((locale) => {
    urls.push({
      loc: `${BASE_URL}/${locale}/${page}`,
      priority: getPriority(page),
      changefreq: getChangefreq(page),
    });
  });
});

// Category pages
categorySlugs.forEach((slug) => {
  locales.forEach((locale) => {
    urls.push({
      loc: `${BASE_URL}/${locale}/category/${slug}/`,
      priority: '0.8',
      changefreq: 'weekly',
    });
  });
});

// Product pages
productSlugs.forEach((slug) => {
  locales.forEach((locale) => {
    urls.push({
      loc: `${BASE_URL}/${locale}/product/${slug}/`,
      priority: '0.9',
      changefreq: 'weekly',
    });
  });
});

// Blog pages
allBlogSlugs.forEach((slug) => {
  locales.forEach((locale) => {
    urls.push({
      loc: `${BASE_URL}/${locale}/blog/${slug}/`,
      priority: '0.7',
      changefreq: 'monthly',
    });
  });
});

// Build XML
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

urls.forEach((url) => {
  xml += `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
`;
  // xhtml:link alternates
  const slugPart = url.loc.replace(BASE_URL + '/', '');
  const pathWithoutLocale = slugPart.replace(/^(zh-hk|en|ja)\//, '');
  locales.forEach((locale) => {
    xml += `    <xhtml:link rel="alternate" hreflang="${locale === 'zh-hk' ? 'zh-Hant-HK' : locale === 'en' ? 'en' : 'ja-JP'}" href="${BASE_URL}/${locale}/${pathWithoutLocale}" />
`;
  });
  xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/zh-hk/${pathWithoutLocale}" />
  </url>
`;
});

xml += `</urlset>
`;

const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf-8');

console.log(`✅ Generated sitemap.xml with ${urls.length} URLs`);
console.log(`   Categories: ${categorySlugs.length}`);
console.log(`   Products: ${productSlugs.length}`);
console.log(`   Blog posts: ${allBlogSlugs.length}`);
console.log(`   Static pages: ${staticPages.length}`);
console.log(`   Locales: ${locales.length}`);
console.log(`   Total: ${urls.length}`);
