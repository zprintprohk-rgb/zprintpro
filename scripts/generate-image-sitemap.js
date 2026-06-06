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

// Strategy: find every "  slug: 'xxx'" at 2-space indent (product property),
// then walk back to find the nearest enclosing "  {" object start,
// then extract name + images + imagesByLocale from that block.
const slugRe = /^\s{4}slug:\s*['"]([^'"]+)['"]/gm;
const products = [];
let m;
while ((m = slugRe.exec(productsTs)) !== null) {
  const slug = m[1];
  const slugIndex = m.index;
  // Find block start: previous "\n  {" (2-space-indented object start in array)
  let startPos = productsTs.slice(0, slugIndex).lastIndexOf('\n  {');
  if (startPos === -1) continue;
  // Find block end: next "\n  {" (next product start) OR "\n];" (array end) OR "\n  }" (array-of-object close)
  let endPos = productsTs.indexOf('\n  {', slugIndex);
  if (endPos === -1) {
    endPos = productsTs.indexOf('\n];', slugIndex);
  }
  if (endPos === -1) endPos = productsTs.length;
  const block = productsTs.slice(startPos, endPos);

  // Extract name. Try simple string form first (products.ts uses this),
  // then fallback to object form { 'zh-hk': '...', en: '...', ja: '...' }.
  // NOTE: there's also seoImages.filename.name, so we anchor on the FIRST occurrence.
  const nameSimpleMatch = block.match(/^\s{4}name:\s*['"]([^'"]+)['"]/m);
  const productName = nameSimpleMatch
    ? nameSimpleMatch[1]
    : slug;

  // Extract imagesByLocale (inner block is 4-space indented)
  const imagesByLocale = { 'zh-hk': [], en: [], ja: [] };
  const iblMatch = block.match(/imagesByLocale:\s*\{([\s\S]*?)\n\s{4}\}/);
  if (iblMatch) {
    const inner = iblMatch[1];
    for (const loc of ['zh-hk', 'en', 'ja']) {
      const locMatch = inner.match(new RegExp(`['"]${loc}['"]:\\s*\\[([^\\]]*?)\\]`));
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

xml += `</urlset>
`;

const outputPath = path.join(__dirname, '../public/sitemap-image.xml');
fs.writeFileSync(outputPath, xml, 'utf-8');

console.log(`✓ Generated sitemap-image.xml`);
console.log(`   Products with images: ${products.length}`);
console.log(`   Total images indexed: ${totalImages}`);
console.log(`   Output: public/sitemap-image.xml`);
