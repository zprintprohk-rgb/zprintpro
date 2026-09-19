// moq10-audit-books-campus.ts — 列出現存「書刊/校園」MOQ 宣稱與真實 minQuantity 的對照
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

/** 真實 minQuantity (2026-09-19 實查 products.ts) */
const TRUTH: [string, number, number][] = [
  // [SKU, minQuantity, 舊宣稱值 (常見)]
  ['saddle-stitch-booklets', 10, 100],
  ['catalog-printing', 10, 100],
  ['perfect-bound-books', 10, 100],
  ['hardcover-books', 10, 100],
  ['spiral-notebooks', 10, 100],
  ['exercise-books', 10, 100],
  ['school-flyers', 10, 100],
  ['textbooks', 100, 100],          // 未改, 宣稱 100 = 正確
  ['certificates', 100, 100],       // 未改, 正確
  ['graduation-yearbook', 50, 50],  // 未改, 正確
];

console.log('=== 真實門檻 (權威) ===');
for (const [sku, mq, old] of TRUTH) {
  const flag = mq === old ? '✓ 宣稱與門檻一致' : `← 宣稱 ${old} 已過期 (實際 ${mq})`;
  console.log(`  ${sku.padEnd(24)} minQ=${String(mq).padEnd(5)} ${flag}`);
}

/** 掃「書刊/校園」語境的 MOQ 宣稱 */
const TARGETS = ['src/data/blog-posts.ts', 'src/data/buying-guides.ts', 'src/data/category-seo-content.ts', 'src/data/category-conversion-blocks.ts'];
const CONTEXT = /(騎馬釘|書刊|畫冊|本冊|冊子|校園|教育|教材|練習|畢業冊|畢業紀念冊|證書|saddle|booklet|textbook|exercise|certificate|yearbook|繪本|同人)/i;
const MOQ_ANY = /(\d+)\s*(本|張|個|冊|部)\s*起|\bMOQ\s*(\d+)\b|(\d+)\s*[- ]copy\s*MOQ|(\d+)\s*冊から|(\d+)\s*部から/gi;

let total = 0;
for (const rel of TARGETS) {
  const lines = fs.readFileSync(path.join(ROOT, rel), 'utf-8').split('\n');
  const hits: string[] = [];
  lines.forEach((l, i) => {
    if (!CONTEXT.test(l)) return;
    MOQ_ANY.lastIndex = 0;
    const m = [...l.matchAll(MOQ_ANY)];
    if (!m.length) return;
    // 只列「已過期」的 (100/50 而真實係 10)
    const stale = m.filter((x) => {
      const n = Number(x[1] ?? x[3] ?? x[4] ?? x[5] ?? x[6] ?? 0);
      return n === 100 || n === 50;
    });
    if (!stale.length) return;
    total++;
    hits.push(`  L${i + 1} [${stale.map((s) => s[0].trim()).join(', ')}] ${l.trim().slice(0, 150)}`);
  });
  if (hits.length) {
    console.log(`\n=== ${rel} (${hits.length} 條疑似過期) ===`);
    hits.slice(0, 25).forEach((h) => console.log(h));
    if (hits.length > 25) console.log(`  …其餘 ${hits.length - 25} 條`);
  }
}
console.log(`\n合計 ${total} 條含過期 MOQ 數字 (書刊/校園語境)`);
