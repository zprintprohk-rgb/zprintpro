// .hermes/_b1c9_langfix.cjs — 修正批次A副作用: ja/en 字段中的 zh 替换产物
const fs = require('fs');
const path = require('path');
const REPO = process.cwd();
// 1) CSV: col13 (ja) 國際認證體系 → 国際認証体系; col12 (en) 任何 CJK 检查
const csvP = path.join(REPO, 'zprintpro-sku-seo-data.csv');
let csv = fs.readFileSync(csvP, 'utf8');
const csvLines = csv.split('\n');
let csvFixed = 0;
const cjk = /[\u4e00-\u9fff]/;
csvLines.forEach((r, i) => {
  const cols = r.split('\t');
  if (cols.length !== 31 || !cols[3]) return;
  // ja 列 (col13 + FAQ ja 列若无——FAQ 列为 zh 惰性, 不动)
  if (cols[13] && cols[13].includes('國際認證體系')) {
    cols[13] = cols[13].replace(/國際認證體系/g, '国際認証体系');
    csvFixed++;
    console.log(`csv row ${i + 1} ${cols[3]} ja: 國際認證體系→国際認証体系`);
  }
  if (cols[12] && cjk.test(cols[12])) {
    console.log(`csv row ${i + 1} ${cols[3]} EN 列含 CJK: ${cols[12].match(/[\u4e00-\u9fff]+/g)?.join(',')}`);
  }
  csvLines[i] = cols.join('\t');
});
csv = csvLines.join('\n');
// 2) ts: ja 子段 (ja 段内) 國際認證體系 → 国際認証体系; en 段 CJK 检查
const tsP = path.join(REPO, 'src/data/sku-seo-data.ts');
let ts = fs.readFileSync(tsP, 'utf8');
const segRe = /"ja": \{[\s\S]*?"\n      \},/g;
let tsFixed = 0;
ts = ts.replace(segRe, (seg) => {
  if (seg.includes('國際認證體系')) {
    tsFixed += seg.split('國際認證體系').length - 1;
    return seg.replace(/國際認證體系/g, '国際認証体系');
  }
  return seg;
});
console.log(`ts ja 段修正: ${tsFixed} 处`);
// en 段 CJK 抽查 (排除标题等合法 CJK? en 段不应有 CJK)
const enRe = /"en": \{[\s\S]*?"\n      \},/g;
let enCjkHits = 0;
ts.replace(enRe, (seg) => {
  const m = seg.match(/[\u4e00-\u9fff]+/g);
  if (m) { enCjkHits++; console.log('ts en 段 CJK:', m.slice(0, 5).join(','), '@', seg.slice(0, 60)); }
  return seg;
});
if (enCjkHits) console.log(`ts en 段 CJK 命中块: ${enCjkHits} (登记不盲改)`);
fs.writeFileSync(csvP, csv, 'utf-8');
fs.writeFileSync(tsP, ts, 'utf-8');
console.log(`PASS: csv ${csvFixed} + ts ${tsFixed}`);
