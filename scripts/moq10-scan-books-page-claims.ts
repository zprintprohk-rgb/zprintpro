// moq10-scan-books-page-claims.ts — 定位 books 品類頁所有「50 本起/100 本起」來源
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
/** books 品類 SKU (全部真實 10 本) */
const BOOK_SKUS = ['catalog-printing', 'saddle-stitch-booklets', 'perfect-bound-books', 'hardcover-books', 'spiral-notebooks'];
const BOOK_HINT = /(畫冊|書刊|本冊|冊子|騎馬釘|膠裝|精裝|繪本|catalog|booklet|perfect|hardcover|spiral|線圈|年報|型錄)/i;

const DIRS = ['src/data', 'src/lib', 'src/components', 'src/app'];
const files: string[] = [];
function walk(d: string) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(ts|tsx|json)$/.test(f.name) && !/\.bak/.test(f.name)) files.push(p.replace(/\\/g, '/'));
  }
}
for (const d of DIRS) if (fs.existsSync(d)) walk(d);

const PAT = /(50\s*本起|100\s*本起|50\s*本起印|100\s*本起印|50\s*copies?|100\s*copies?|\b50\s*MOQ\b|\b100\s*MOQ\b|50\s*冊から|100\s*冊から|50\s*部から|100\s*部から)/g;

let total = 0;
for (const f of files) {
  const lines = fs.readFileSync(path.join(ROOT, f), 'utf-8').split('\n');
  lines.forEach((l, i) => {
    PAT.lastIndex = 0;
    const m = [...l.matchAll(PAT)];
    if (!m.length) return;
    if (!BOOK_HINT.test(l)) return;
    total += m.length;
    console.log(`${f}:${i + 1}  [${m.map((x) => x[0].trim()).join(', ')}]`);
    console.log(`   ${l.trim().slice(0, 175)}`);
  });
}
console.log(`\n合計 ${total} 處 (books 語境)`);
