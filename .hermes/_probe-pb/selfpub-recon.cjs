'use strict';
// Self-Publishing (en-first) 起草規格偵察: 既有 slug 佔用 / 承接 SKU / 內鏈白名單
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';

/* 1) 既有 self-publishing / 自助出版 相關內容? */
const needles = [/self[\s-]?publish/i, /self[\s-]?publishing/i, /自助出版/, /自費出版/];
function scanFile(rel) {
  let raw; try { raw = fs.readFileSync(path.join(ROOT, rel), 'utf8'); } catch (e) { return null; }
  const lines = raw.split('\n');
  const hits = [];
  lines.forEach((l, i) => { if (needles.some(n => n.test(l))) hits.push((i + 1) + ': ' + l.trim().slice(0, 130)); });
  return hits.length ? { rel, hits } : null;
}
const files = [
  'src/data/blog-posts.ts', 'src/data/blog-data/en.json', 'src/data/products.ts',
  'src/data/category-seo-content.ts', 'src/data/buying-guides.ts', 'src/data/pillar-content.ts',
  'public/sitemap-en.xml',
];
console.log('=== 既有 self-publishing 相關內容 ===');
for (const f of files) {
  const r = scanFile(f);
  if (r) { console.log('\n[' + r.rel + ']  ' + r.hits.length + ' 處'); r.hits.slice(0, 6).forEach(h => console.log('   ' + h)); }
}

/* 2) books 類別 SKU (承接候選) */
console.log('\n=== books 類別 SKU (products.ts) ===');
{
  const raw = fs.readFileSync(path.join(ROOT, 'src/data/products.ts'), 'utf8');
  const blocks = raw.split(/\n  \{\n/);
  const rows = [];
  for (const b of blocks) {
    const slug = (b.match(/slug:\s*'([^']+)'/) || [])[1];
    const cat = (b.match(/category:\s*'([^']+)'/) || (b.match(/categorySlug:\s*'([^']+)'/) || []))[1];
    if (!slug || !cat) continue;
    if (!/book|zine|journal|notebook|calendar|catalog|education/i.test(cat + ' ' + slug)) continue;
    const mq = (b.match(/minQuantity:\s*(\d+)/) || [])[1];
    const pr = (b.match(/priceRange:\s*'([^']*)'/) || (b.match(/price_range:\s*'([^']*)'/) || []))[1];
    rows.push({ slug, cat, mq, pr });
  }
  rows.forEach(r => console.log('   ' + r.slug.padEnd(42) + ' cat=' + String(r.cat).padEnd(14) + ' MOQ=' + String(r.mq || '-').padEnd(6) + ' price=' + (r.pr || '-')));
}

/* 3) slug 佔用檢查 */
console.log('\n=== slug 佔用檢查 ===');
{
  const raw = fs.readFileSync(path.join(ROOT, 'src/data/blog-posts.ts'), 'utf8');
  const slugs = new Set([...raw.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]));
  for (const cand of ['self-publishing-printing-guide', 'self-publishing-guide', 'book-printing-self-publishing']) {
    console.log('   ' + cand.padEnd(34) + (slugs.has(cand) ? '★ 已佔用' : '✅ 可用'));
  }
}
