'use strict';
/**
 * 方法 2 (獨立複算) — 不讀 CSV, 直接重掃源文件, 按「結構化字段歸屬」分檔
 * 對帳目標 (方法 1 的逐檔字符數): en.json 912 / category-seo-content 118 / buying-guides 38 /
 *                                sku-seo-data 28 / payment-methods 16 / Footer 12 / category-page 10 / blog-posts 4 = 1138
 */
const fs = require('fs');
const path = require('path');
const P = 'F:\\zprintpro-nextjs\\';
const CJK = /[\u3400-\u4dbf\u4e00-\u9fff]/g;
const CJK1 = /[\u3400-\u4dbf\u4e00-\u9fff]/;

const FILES = [
  'src/data/blog-data/en.json',
  'src/data/category-seo-content.ts',
  'src/data/buying-guides.ts',
  'src/data/sku-seo-data.ts',
  'src/app/[locale]/payment-methods/page.tsx',
  'src/components/layout/Footer.tsx',
  'src/app/[locale]/category/[slug]/page.tsx',
  'src/data/blog-posts.ts',
];
const M1 = { 'src/data/blog-data/en.json': 912, 'src/data/category-seo-content.ts': 118, 'src/data/buying-guides.ts': 38, 'src/data/sku-seo-data.ts': 28, 'src/app/[locale]/payment-methods/page.tsx': 16, 'src/components/layout/Footer.tsx': 12, 'src/app/[locale]/category/[slug]/page.tsx': 10, 'src/data/blog-posts.ts': 4 };

/* ---------- A. JSON 檔: 結構化走訪逐字段歸因 ---------- */
function walkJson(file) {
  const obj = JSON.parse(fs.readFileSync(P + file, 'utf8'));
  const buckets = {};
  let chars = 0;
  const add = (k, n) => { buckets[k] = (buckets[k] || 0) + n; };
  for (const [slug, e] of Object.entries(obj)) {
    for (const [field, v] of Object.entries(e || {})) {
      if (typeof v !== 'string') continue;
      const n = (v.match(CJK) || []).length;
      if (!n) continue;
      chars += n;
      // 字段歸因 (方法 2 的核心: 靠結構而非行文本)
      if (field === 'category') add('D category 欄位', n);
      else if (field === 'title' || field === 'description' || field === 'seoTitle' || field === 'metaTitle') add('E title/description 欄位', n);
      else if (field === 'content') {
        if (/application\/ld\+json|"@type"|@context/.test(v)) add('B JSON-LD 殘留', n);
        else if (/<strong>Q\d*[:：]|FAQPage|faq/i.test(v)) add('C FAQ 殘留', n);
        else add('F content 正文內嵌', n);
      } else add('G 其他/待判', n);
    }
  }
  return { chars, buckets };
}

/* ---------- B. TS/TSX 檔: 以 'en': 值域切片歸因 ---------- */
function scanTs(file) {
  const s = fs.readFileSync(P + file, 'utf8');
  const buckets = {};
  let chars = 0;
  const add = (k, n) => { buckets[k] = (buckets[k] || 0) + n; };
  // 抓 'en': '...' 或 en: `...` 或 "en": "..."
  const re = /['"]?en['"]?\s*:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`)/g;
  let m;
  while ((m = re.exec(s)) !== null) {
    const v = m[1] !== undefined ? m[1] : m[2] !== undefined ? m[2] : m[3];
    if (!v) continue;
    const n = (v.match(CJK) || []).length;
    if (!n) continue;
    const before = s.slice(Math.max(0, m.index - 160), m.index);
    chars += n;
    if (/ld\+json|"@type"|@context/.test(v) || /ld\+json/.test(before)) add('B JSON-LD 殘留', n);
    else if (/\bq\s*:|faq/i.test(before) || /<strong>Q\d*[:：]/.test(v)) add('C FAQ 殘留', n);
    else if (/category/i.test(before)) add('D category 欄位', n);
    else if (/title|desc/i.test(before)) add('E title/description 欄位', n);
    else add('G 其他/待判', n);
  }
  return { chars, buckets };
}

console.log('=== 方法 2: 直接重掃源文件 (不讀 CSV) ===\n');
console.log('file'.padEnd(52) + 'M2字符  M1字符  一致?');
let t2 = 0, t1 = 0, mismatch = 0;
const agg = {};
for (const f of FILES) {
  let r;
  try { r = f.endsWith('.json') ? walkJson(f) : scanTs(f); }
  catch (e) { console.log(f.padEnd(52) + '解析失敗: ' + e.message); continue; }
  t2 += r.chars; t1 += (M1[f] || 0);
  const ok = r.chars === M1[f];
  if (!ok) mismatch++;
  console.log(f.padEnd(52) + String(r.chars).padEnd(7) + String(M1[f]).padEnd(8) + (ok ? '✅' : '★ 差 ' + (r.chars - M1[f])));
  for (const [k, v] of Object.entries(r.buckets)) agg[k] = (agg[k] || 0) + v;
}
console.log('\n合計: 方法2 = ' + t2 + ' | 方法1 = ' + t1 + (t2 === t1 ? '  ✅ 完全一致' : '  ★ 差 ' + (t2 - t1)));
console.log('逐檔不一致數: ' + mismatch + ' / ' + FILES.length);

console.log('\n=== 方法 2 分檔 (字符級) ===');
const order = ['B JSON-LD 殘留', 'C FAQ 殘留', 'D category 欄位', 'E title/description 欄位', 'F content 正文內嵌', 'G 其他/待判'];
let sum = 0;
for (const k of order) { console.log('  ' + k.padEnd(26) + (agg[k] || 0)); sum += (agg[k] || 0); }
console.log('  合計 ' + sum);
const hi = order.slice(0, 4).reduce((a, k) => a + (agg[k] || 0), 0);
console.log('\n★ 高優先檔位合計 (B+C+D+E) = ' + hi + '  → 方法1 為 122');
