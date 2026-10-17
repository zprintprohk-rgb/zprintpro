/**
 * Generate image sitemap for Google Image Search
 * Reads products.ts and outputs public/sitemap-image.xml
 * Image sitemap helps Google Images discover and index all product images.
 */
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://zprintpro.com';
const TODAY = new Date().toISOString().split('T')[0];
const productsTs = fs.readFileSync(
  path.join(__dirname, '../src/data/products.ts'),
  'utf-8'
);

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Strategy (2026-10-17 fix): blocks are sliced by SLUG ORDER, not by brace hunting —
// products.ts has mixed indentation (most blocks 2-space objects/4-space fields, doujinshi 0-space object/6-space fields).
// Slug lines are line-anchored at any indent; each block = [slug_i, slug_{i+1}) which always contains name/imagesByLocale/images.
// Locale keys in imagesByLocale may be quoted ('zh-hk', 'en') or bare (en:, ja:) — both accepted.
const slugRe = /^[ \t]*slug:\s*['"]([^'"]+)['"]/gm;
const slugHits = [];
let m;
while ((m = slugRe.exec(productsTs)) !== null) {
  slugHits.push({ slug: m[1], index: m.index });
}
const products = [];
for (let si = 0; si < slugHits.length; si++) {
  const { slug, index: slugIndex } = slugHits[si];
  let endPos = si + 1 < slugHits.length ? slugHits[si + 1].index : productsTs.length;
  if (si + 1 === slugHits.length) {
    const arrEnd = productsTs.indexOf('\n];', slugIndex);
    if (arrEnd !== -1) endPos = arrEnd;
  }
  const block = productsTs.slice(slugIndex, endPos);

  // Extract name (first `name:` at any indent; nameEn/nameJa do not match `name:`)
  const nameSimpleMatch = block.match(/^[ \t]+name:\s*['"]([^'"]+)['"]/m);
  const productName = nameSimpleMatch ? nameSimpleMatch[1] : slug;

  // Extract imagesByLocale (closing brace at any indent >= 4; locale keys quoted OR bare)
  const imagesByLocale = { 'zh-hk': [], en: [], ja: [] };
  const iblMatch = block.match(/imagesByLocale:\s*\{([\s\S]*?)\n\s{4,}\}/);
  if (iblMatch) {
    const inner = iblMatch[1];
    for (const loc of ['zh-hk', 'en', 'ja']) {
      const locMatch = inner.match(new RegExp(`(?:['"]${loc}['"]|\\b${loc})\\s*:\\s*\\[([^\\]]*?)\\]`));
      if (locMatch) {
        const arr = locMatch[1];
        const urls = [];
        const urlRe = /['"]([^'"]*\.(?:webp|jpg|png))['"]/g;
        let um;
        while ((um = urlRe.exec(arr)) !== null) urls.push(um[1]);
        imagesByLocale[loc] = urls;
      }
    }
  }

  // Fallback: images: [...]
  const imagesArrMatch = block.match(/images:\s*\[([^\]]*?)\]/);
  let fallbackImages = [];
  if (imagesArrMatch) {
    const arr = imagesArrMatch[1];
    const urlRe = /['"]([^'"]*\.(?:webp|jpg|png))['"]/g;
    let um;
    while ((um = urlRe.exec(arr)) !== null) fallbackImages.push(um[1]);
  }
  for (const loc of ['zh-hk', 'en', 'ja']) {
    if (imagesByLocale[loc].length === 0) {
      imagesByLocale[loc] = fallbackImages;
    }
  }

  // Only include if has any images
  const totalImgs = imagesByLocale['zh-hk'].length + imagesByLocale.en.length + imagesByLocale.ja.length;
  if (totalImgs > 0) {
    products.push({ slug, name: productName, imagesByLocale });
  }
}

console.log(`Parsed ${products.length} products with images`);

// Build XML
let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

let totalImages = 0;
for (const { slug, name, imagesByLocale } of products) {
  for (const locale of ['zh-hk', 'en', 'ja']) {
    const images = imagesByLocale[locale];
    if (!images || images.length === 0) continue;
    const pageUrl = `${BASE_URL}/${locale}/product/${slug}/`;
    xml += `  <url>
    <loc>${pageUrl}</loc>
    <lastmod>${TODAY}</lastmod>
`;
    for (const img of images) {
      const imgUrl = img.startsWith('http') ? img : `${BASE_URL}${img.startsWith('/') ? '' : '/'}${img}`;
      const caption = locale === 'zh-hk'
        ? `${name} - ZPrintPro 香港觀塘實體工廠專業印刷`
        : locale === 'ja'
        ? `${name} - ZPrintPro 印刷 高画質商品画像`
        : `${name} - ZPrintPro professional printing`;
      xml += `    <image:image>
      <image:loc>${escapeXml(imgUrl)}</image:loc>
      <image:title>${escapeXml(name)}</image:title>
      <image:caption>${escapeXml(caption)}</image:caption>
    </image:image>
`;
      totalImages++;
    }
    xml += `  </url>
`;
  }
}

// v28.6 (2026-10-11): 48 张类目 hero 入图 sitemap — page=类目页, loc=hero webp, title=sidecar alt 真值。
// slug→hero 基名与 CategoryPageV9 V9_HERO_BASE 保持同源 (改图位必须同步改这里)。
const HERO_BASE = {
  stickers: 'hero-sticker',
  flyers: 'hero-flyer',
  packaging: 'hero-gift-box',
  'paper-bags': 'hero-kraft-bag',
  posters: 'hero-poster',
  banners: 'hero-banners',
  books: 'hero-books',
  educational: 'hero-educational',
  envelopes: 'hero-envelopes',
  calendars: 'hero-calendars',
  'red-packets': 'hero-red-packets',
  menus: 'hero-menus',
  'greeting-cards': 'hero-greeting-card',
  'japan-doujin': 'hero-japan-doujin',
  'wedding-invitations': 'hero-wedding-invitations',
  'place-cards': 'hero-place-cards',
};
for (const [catSlug, base] of Object.entries(HERO_BASE)) {
  for (const locale of ['zh-hk', 'en', 'ja']) {
    const metaPath = path.join(__dirname, `../public/images/hero/${base}-${locale}.meta.json`);
    let title = catSlug;
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
      if (meta && meta.title && meta.title[locale]) title = meta.title[locale];
    } catch (e) {
      console.warn(`  hero meta missing, fallback to slug: ${base}-${locale}`);
    }
    xml += `  <url>
    <loc>${BASE_URL}/${locale}/category/${catSlug}/</loc>
    <lastmod>${TODAY}</lastmod>
    <image:image>
      <image:loc>${BASE_URL}/images/hero/${base}-${locale}.webp</image:loc>
      <image:title>${escapeXml(title)}</image:title>
    </image:image>
`;
    totalImages++;
    xml += `  </url>
`;
  }
}

xml += `</urlset>
`;

const outputPath = path.join(__dirname, '../public/sitemap-image.xml');
fs.writeFileSync(outputPath, xml, 'utf-8');

console.log(`✓ Generated sitemap-image.xml`);
console.log(`   Products with images: ${products.length}`);
console.log(`   Total images indexed: ${totalImages}`);
console.log(`   Output: public/sitemap-image.xml`);
