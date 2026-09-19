// moq10-list-blog-books-edits.ts — 列出博客書刊/校園「真需修」逐條清單 (人工剔除誤判後)
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const lines = fs.readFileSync(path.join(ROOT, 'src/data/blog-posts.ts'), 'utf-8').split('\n');

/** 逐條: [行號, 判定, 原因, 是否需修] */
const VERDICTS: [number, string, boolean][] = [
  [501, '騎馬釘 → 10 (真實門檻)', true],
  [1230, '騎馬釘小手冊 + A4 摺頁組合 → 10', true],
  [1476, '月曆 SKU (minQ=1000) — 分類器誤判, 不動', false],
  [1545, '畫冊 → 10', true],
  [1828, '練習簿 → 10', true],
  [1833, '學校練習簿 → 10', true],
  [1929, '包裝盒 SKU (100 個起) — 分類器誤判「精裝盒」為精裝書, 不動', false],
  [1945, '小誌 Zine (騎馬釘) → 10', true],
  [1950, '小誌 Zine → 10', true],
  [1952, 'ja Zine → 10', true],
  [1968, '源碼註釋 (非客戶可見) — 可一併更新為 10 以免誤導後人', true],
  [1975, '童書繪本 (hardcover-books 10 本) → 10', true],
  [1980, '童書繪本 → 10', true],
];

console.log('=== 博客書刊/校園 MOQ 逐條判定 ===\n');
let needFix = 0;
for (const [n, why, fix] of VERDICTS) {
  const l = (lines[n - 1] || '').trim();
  console.log(`${fix ? '【需修】' : '【不動】'} L${n} — ${why}`);
  console.log(`   ${l.slice(0, 175)}`);
  console.log('');
  if (fix) needFix++;
}
console.log(`合計: ${VERDICTS.length} 條判定, 其中 ${needFix} 條需修, ${VERDICTS.length - needFix} 條不動`);
