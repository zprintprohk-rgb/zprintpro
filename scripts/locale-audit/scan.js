// Locale violation scanner: finds 香港/深圳/深セン/中国 in ja contexts and Hong Kong/Shenzhen in en contexts.
// Usage: node scripts/locale-audit/scan.js > scripts/locale-audit/report.json
const fs = require('fs');

const FILES = [
  'src/data/products.ts',
  'src/data/sku-seo-data.ts',
  'src/data/category-seo-content.ts',
  'src/lib/seo.ts',
  'src/lib/h1-builder.ts',
  'src/lib/metadata.ts',
  'src/lib/seo-keywords.ts',
  'src/lib/seo-related-queries.ts',
  'src/lib/seo/schema-extensions.ts',
];

// locale key markers (checked in order, first match wins)
const MARKERS = [
  { re: /^\s*'zh-hk'\s*:/, loc: 'zh' },
  { re: /^\s*"zh-hk"\s*:/, loc: 'zh' },
  { re: /^\s*(longDescriptionJa|descriptionJa|title_ja|description_ja)\b\s*:/, loc: 'ja' },
  { re: /^\s*(longDescriptionEn|descriptionEn|title_en|description_en)\b\s*:/, loc: 'en' },
  { re: /^\s*(longDescription|descriptionZh|title_zh|description_zh|description)\s*:/, loc: 'zh' },
  { re: /^\s*ja\s*:/, loc: 'ja' },
  { re: /^\s*"ja"\s*:/, loc: 'ja' },
  { re: /^\s*en\s*:/, loc: 'en' },
  { re: /^\s*"en"\s*:/, loc: 'en' },
  { re: /^\s*zh\s*:/, loc: 'zh' },
  { re: /^\s*"zh"\s*:/, loc: 'zh' },
];

const JA_BAD = /香港|深圳|深セン|中国/g;
const EN_BAD = /Hong Kong|Shenzhen|\bHK\b/g;

const NAP_RE = /特定商取引法|特商法|嘉城路|平湖街道|会社概要|龍崗区|龙岗区/;

const out = [];
for (const file of FILES) {
  if (!fs.existsSync(file)) continue;
  const lines = fs.readFileSync(file, 'utf-8').split('\n');
  let ctx = null;
  lines.forEach((line, i) => {
    for (const m of MARKERS) {
      const mm = line.match(m.re);
      if (mm) { ctx = m.loc; break; }
    }
    if (ctx !== 'ja' && ctx !== 'en') return;
    const re = ctx === 'ja' ? JA_BAD : EN_BAD;
    re.lastIndex = 0;
    const matches = line.match(re);
    if (!matches) return;
    // HK$ currency exemption
    const filtered = matches.filter(x => x !== 'HK' || !/HK\$/.test(line));
    if (!filtered.length) return;
    out.push({
      file, line: i + 1, ctx,
      hits: [...new Set(filtered)],
      nap: NAP_RE.test(line),
      text: line.trim().slice(0, 300),
    });
  });
}
console.log(JSON.stringify(out, null, 1));
console.error(`total hit lines: ${out.length}`);
