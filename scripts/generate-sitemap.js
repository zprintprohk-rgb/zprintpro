const fs = require('fs');
const path = require('path');
const BASE_URL = 'https://zprintpro.com';
// Use Asia/Shanghai local date, not UTC — fixes bug where UTC late-evening
// produces yesterday's date when run during Asia/Shanghai daytime hours.
const TODAY = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Shanghai' });

function extractSlugsFromTs(filePath, pattern) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const slugs = [];
  let match;
  while ((match = pattern.exec(content)) !== null) { slugs.push(match[1]); }
  return [...new Set(slugs)];
}

// 2026-07-22 修复: 旧 regex 在 1.2MB products.ts 上 catastrophic backtracking (脚本卡 120s+ timeout)
// 旧 regex 缺 8 个 product: mailer-boxes / white-card-boxes / corrugated-boxes / tuck-end-boxes / food-boxes / handle-bags / kraft-paper-packaging-box / white-card-bags
// 改用 line-walker: 找到 "slug: 'xxx'," 行后, 向前看 25 行, 找 "name:" (categories) 或 "category:" (products) 第一个出现的行
// Categories 数组用单行格式 (slug + name + nameEn + nameJa 都在一行), regex 仍然能匹配
// Products 数组用多行格式 (slug 后跟 optimizedAt + optimizationRound + category + ...), line-walker 跳过中间字段
const categorySlugs = (() => {
  const content = fs.readFileSync(path.join(__dirname, '../src/data/products.ts'), 'utf-8');
  const lines = content.split('\n');
  const set = new Set();
  for (let i = 0; i < lines.length; i++) {
    // Categories 数组: { slug: 'xxx', name: 'yyy', nameEn: ..., nameJa: ... 都在同一行
    const m = lines[i].match(/^\s*\{\s*slug:\s*['"]([^'"]+)['"],\s*name:/);
    if (m) set.add(m[1]);
  }
  return [...set];
})();

const productSlugs = (() => {
  const content = fs.readFileSync(path.join(__dirname, '../src/data/products.ts'), 'utf-8');
  const lines = content.split('\n');
  const set = new Set();
  for (let i = 0; i < lines.length; i++) {
    // Product 对象: slug 独立一行
    const m = lines[i].match(/^\s*slug:\s*['"]([^'"]+)['"],?\s*$/);
    if (!m) continue;
    const slug = m[1];
    for (let j = 1; j <= 25 && i + j < lines.length; j++) {
      const l = lines[i + j];
      if (/^\s*\}/.test(l)) break;  // 对象结束
      if (/^\s*category:\s*['"]/.test(l)) { set.add(slug); break; }
    }
  }
  return [...set];
})();

// === Blog slugs — dynamically read from blog-posts.ts (covers buying-guide + legacy + future additions) ===
const legacyBlogSlugs = extractSlugsFromTs(path.join(__dirname, '../src/data/blog-posts.ts'), /slug:\s*['"]([^'"]+)['"],/g);
// Also include cluster slugs from pillar-content (may overlap, deduped by Set)
const clusterSlugs = extractSlugsFromTs(path.join(__dirname, '../src/data/pillar-content.ts'), /slug:\s*['"]([^'"]+)['"],/g);
const allBlogSlugs = [...new Set([...legacyBlogSlugs, ...clusterSlugs])];

const staticPages = ['','about/','blog/','case-studies/','contact/','faq/','help-center/','service-areas/','company-news/','services/rush-printing-delivery/','cart/','checkout/','order-confirmation/','payment/success/','payment-methods/','privacy/','terms/'];

function getPriority(u) {
  if(u==='')return'1.0';
  if(u.startsWith('category/'))return'0.8';
  if(u.startsWith('product/'))return'0.9';
  if(u.startsWith('guide/') || u.startsWith('blog/'))return'0.7';
  if(['about/','contact/','faq/','service-areas/','case-studies/'].includes(u))return'0.7';
  if(['cart/','checkout/','order-confirmation/','payment/success/'].includes(u))return'0.3';
  if(['privacy/','terms/'].includes(u))return'0.3';
  return'0.5';
}
function getChangefreq(u) {
  if(u==='')return'daily';
  if(u.startsWith('category/'))return'weekly';
  if(u.startsWith('product/'))return'weekly';
  if(u.startsWith('guide/') || u.startsWith('blog/'))return'weekly'; // blog updated more often now
  return'monthly';
}

const locales = ['zh-hk','en','ja'];
function hl(locale) { return locale==='zh-hk'?'zh-Hant-HK':locale==='en'?'en':'ja-JP'; }

const urls = [];
locales.forEach(l => { urls.push({ loc: BASE_URL+'/'+l+'/', priority:'1.0', changefreq:'daily' }); });
staticPages.forEach(p => { if(p==='')return; locales.forEach(l => { urls.push({ loc: BASE_URL+'/'+l+'/'+p, priority:getPriority(p), changefreq:getChangefreq(p) }); }); });
categorySlugs.forEach(s => { locales.forEach(l => { urls.push({ loc: BASE_URL+'/'+l+'/category/'+s+'/', priority:'0.8', changefreq:'weekly' }); }); });
productSlugs.forEach(s => { locales.forEach(l => { urls.push({ loc: BASE_URL+'/'+l+'/product/'+s+'/', priority:'0.9', changefreq:'weekly' }); }); });
// Fix: sitemap now uses /blog/ paths (not /guide/) — matches actual routes
allBlogSlugs.forEach(s => { locales.forEach(l => { urls.push({ loc: BASE_URL+'/'+l+'/blog/'+s+'/', priority:'0.7', changefreq:'weekly' }); }); });

function buildXml(arr) {
  let x = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  arr.forEach(u => {
    x += '  <url>\n    <loc>'+u.loc+'</loc>\n    <lastmod>'+TODAY+'</lastmod>\n    <changefreq>'+u.changefreq+'</changefreq>\n    <priority>'+u.priority+'</priority>\n';
    const sp = u.loc.replace(BASE_URL+'/','');
    const [pp, qp] = sp.split('?');
    const pwl = pp.replace(/^(zh-hk|en|ja)\//,'');
    const qs = qp ? '?'+qp : '';
    locales.forEach(l => { x += '    <xhtml:link rel="alternate" hreflang="'+hl(l)+'" href="'+BASE_URL+'/'+l+'/'+pwl+qs+'" />\n'; });
    x += '    <xhtml:link rel="alternate" hreflang="x-default" href="'+BASE_URL+'/zh-hk/'+pwl+qs+'" />\n  </url>\n';
  });
  x += '</urlset>\n';
  return x;
}

// Unified
fs.writeFileSync(path.join(__dirname,'../public/sitemap.xml'), buildXml(urls), 'utf-8');
console.log('sitemap.xml: '+urls.length+' URLs');

// Per-locale
const files = [];
locales.forEach(l => {
  const lu = urls.filter(u => u.loc.startsWith(BASE_URL+'/'+l+'/'));
  const fn = 'sitemap-'+l+'.xml';
  fs.writeFileSync(path.join(__dirname,'../public/',fn), buildXml(lu), 'utf-8');
  files.push({ locale:l, filename:fn, count:lu.length });
  console.log(fn+': '+lu.length+' URLs');
});

// Index
let ix = '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap>\n    <loc>'+BASE_URL+'/sitemap.xml</loc>\n    <lastmod>'+TODAY+'</lastmod>\n  </sitemap>\n';
files.forEach(f => { ix += '  <sitemap>\n    <loc>'+BASE_URL+'/'+f.filename+'</loc>\n    <lastmod>'+TODAY+'</lastmod>\n  </sitemap>\n'; });
ix += '</sitemapindex>\n';
fs.writeFileSync(path.join(__dirname,'../public/sitemap-index.xml'), ix, 'utf-8');
console.log('sitemap-index.xml: 4 sitemaps');

console.log('\n--- Summary ---');
console.log('Categories: '+categorySlugs.length+', Products: '+productSlugs.length+', Blog: '+allBlogSlugs.length);
console.log('Static: '+staticPages.length+', Locales: '+locales.length+', Total: '+urls.length);
files.forEach(f => console.log('  '+f.locale+': '+f.count+' URLs'));
// IndexNow ping to Bing after sitemap generation
const INDEXNOW_KEY = 'b8f1c2d3e4a5f6b7c4d8e9f0f1a2b3c4d5';
const https = require('https');
locales.forEach(locale => {
  const urlList = urls.filter(u => u.loc.startsWith(`${BASE_URL}/${locale}/`)).slice(0, 100).map(u => u.loc);
  const data = JSON.stringify({ host: 'zprintpro.com', key: INDEXNOW_KEY, keyLocation: `https://zprintpro.com/${INDEXNOW_KEY}.txt`, urlList });
  const req = https.request({ hostname: 'www.bing.com', path: '/indexnow', method: 'POST', headers: { 'Content-Type': 'application/json' } }, res => {
    console.log(`IndexNow ping ${locale}: ${res.statusCode}`);
  });
  req.on('error', () => {});
  req.write(data);
  req.end();
});
console.log('IndexNow pings sent for 3 locales');

// === Image sitemap (Google Images) — Week 1 SEO 修复 ===
// Auto-generated from product image directories. Naming rules:
//   seedream-webp/: zprintpro-{category}-{slug}-{locale}[-N].webp
//   japan/        : {slug}.webp (japan-doujin category, shared across locales)
//                    JA-zprintpro-{category}-{slug}-{locale}-{N}.jpg (locale-specific)
//   blog/{locale}/: blog cover images
function buildImageSitemap() {
  const fsx = require('fs');
  const pathx = require('path');
  const imgDir = pathx.join(__dirname, '../public/images');

  // Known category slugs (from src/data/products.ts)
  const knownCategories = ['stickers','flyers','packaging','posters','paper-bags','business-cards','banners','books','menus','envelopes','calendars','red-packets','educational','japan-doujin'];

  // Index images by product (slug → { locale: [{url, title}] })
  const productsImg = {};

  // 1. seedream-webp — main product images
  const seedDir = pathx.join(imgDir, 'products/seedream-webp');
  if (fsx.existsSync(seedDir)) {
    // Build regex with explicit category alternation
    const catPattern = knownCategories.join('|');
    const seedRe = new RegExp(`^zprintpro-(${catPattern})-([a-z0-9\\-]+)-(zh-hk|en|ja)(-\\d+)?\\.(webp|jpg|png)$`);
    fsx.readdirSync(seedDir).forEach((f) => {
      const m = f.match(seedRe);
      if (!m) return;
      const [, category, slug, locale] = m;
      if (!productsImg[slug]) productsImg[slug] = {};
      if (!productsImg[slug][locale]) productsImg[slug][locale] = [];
      const titleBase = slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
      productsImg[slug][locale].push({
        url: `/images/products/seedream-webp/${f}`,
        title: `${titleBase} | ZprintPro`,
      });
    });
  }

  // 2. japan/ — japan-doujin category, simpler naming
  const japanDir = pathx.join(imgDir, 'japan');
  if (fsx.existsSync(japanDir)) {
    fsx.readdirSync(japanDir).forEach((f) => {
      let m = f.match(/^([a-z0-9\-]+)\.webp$/);
      if (m) {
        const slug = m[1];
        ['zh-hk', 'en', 'ja'].forEach((locale) => {
          if (!productsImg[slug]) productsImg[slug] = {};
          if (!productsImg[slug][locale]) productsImg[slug][locale] = [];
          const titleBase = slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
          productsImg[slug][locale].push({
            url: `/images/japan/${f}`,
            title: `${titleBase} | ZprintPro`,
          });
        });
        return;
      }
      m = f.match(/^JA-zprintpro-japan-doujin-([a-z0-9\-]+)-(ja)-\d+\.(jpg|webp)$/);
      if (m) {
        const slug = m[1];
        if (!productsImg[slug]) productsImg[slug] = {};
        if (!productsImg[slug]['ja']) productsImg[slug]['ja'] = [];
        const titleBase = slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
        productsImg[slug]['ja'].push({
          url: `/images/japan/${f}`,
          title: `${titleBase} | ZprintPro`,
        });
      }
    });
  }

  // Build XML
  const locales = ['zh-hk', 'en', 'ja'];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  let urlCount = 0;
  Object.keys(productsImg).sort().forEach((slug) => {
    locales.forEach((locale) => {
      const imgs = productsImg[slug][locale] || [];
      if (imgs.length === 0) return;
      urlCount++;
      xml += `  <url>\n    <loc>${BASE_URL}/${locale}/product/${slug}/</loc>\n    <lastmod>${TODAY}</lastmod>\n`;
      imgs.forEach((img) => {
        xml += `    <image:image>\n      <image:loc>${BASE_URL}${img.url}</image:loc>\n      <image:title>${img.title}</image:title>\n    </image:image>\n`;
      });
      xml += `  </url>\n`;
    });
  });
  xml += '</urlset>\n';

  fsx.writeFileSync(pathx.join(__dirname, '../public/sitemap-image.xml'), xml, 'utf-8');
  console.log(`sitemap-image.xml: ${urlCount} product URLs (${Object.keys(productsImg).length} unique products)`);
}

buildImageSitemap();

// Keep process alive briefly for async HTTP requests, then exit 0
// (CF Pages build treats non-zero exit as failure, but IndexNow
// errors must not block deploy.)
setTimeout(() => process.exit(0), 100);
