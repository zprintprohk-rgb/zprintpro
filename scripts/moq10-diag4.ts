// moq10-diag4.ts — 檢查嵌套子商品的縮排特徵（是否可機械區分）
import fs from 'fs';

const lines = fs.readFileSync('src/data/products.ts', 'utf-8').split(/\r?\n/);

function dump(start: number, end: number, label: string) {
  console.log(`\n===== ${label} (L${start}-${end}) =====`);
  for (let i = start - 1; i < end && i < lines.length; i++) {
    const l = lines[i];
    const indent = (l.match(/^\s*/) || [''])[0].length;
    if (/^\s*(\/\/|$)/.test(l)) continue;
    const short = l.trim().slice(0, 85);
    console.log(`  L${i + 1} [i=${String(indent).padStart(2)}] ${short}`);
  }
}

// fruit-food-label-stickers 區塊尾 + japan-doujin 起始
dump(7450, 7465, 'japan-doujin block 起始（找 slug 行）');
// 找出 japan-doujin 的 slug 行
const jdIdx = lines.findIndex((l) => /^ {4}slug: 'japan-doujin'/.test(l));
console.log(`\n>>> japan-doujin slug 行 = L${jdIdx + 1}`);
if (jdIdx >= 0) dump(jdIdx + 1, jdIdx + 20, 'japan-doujin block 開頭');

// fruit-food-label-stickers 的 slug 行
const fsIdx = lines.findIndex((l) => /^ {4}slug: 'fruit-food-label-stickers'/.test(l));
console.log(`\n>>> fruit-food-label-stickers slug 行 = L${fsIdx + 1}`);
if (fsIdx >= 0) dump(fsIdx + 1, fsIdx + 35, 'fruit-food-label-stickers 開頭');
if (fsIdx >= 0) dump(7580, 7600, 'fruit-food 區塊內 L7595 附近（疑似嵌套）');
