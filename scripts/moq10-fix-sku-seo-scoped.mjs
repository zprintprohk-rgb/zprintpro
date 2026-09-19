// moq10-fix-sku-seo-scoped.mjs  (v2 — 區塊級品類判斷, 修正 v1 誤傷紙袋)
//
// 2026-09-19 — 第四波補漏 (重做)
//
// ⚠ v1 失敗教訓: v1 用「逐行替換 + 行內品類關鍵詞」判斷, 但長描述模板句
//   「專為香港中小企…設計。100 張起印，無開版費…」**行內不含品類詞**
//   (品類名在句首「牛皮紙袋 專為…」而我只比對整行是否含 OUT_SCOPE, 結果
//    紙袋行同時含「袋」與「貼紙」? 不 —— 實際係該行含「紙袋」被 OUT 命中,
//    但另一批紙袋行因行內同時有「順豐」等無關詞而漏過) ⇒ 誤改紙袋 body 為 10 張起印。
//   已 git checkout 還原, 本版改用 **區塊級** (整個 SKU 物件) 判斷:
//     每個 SKU 物件以 `  "slug": {` 開頭, 取其 title/body 作該區塊的身份,
//     再決定該區塊內要改成幾張。
//
// 判斷:
//   區塊 title/body 命中海報類   → 1 張起印
//   區塊命中傳單/貼紙類         → 10 張起印
//   區塊命中紙袋/包裝/餐牌/月曆/信封 → **不動**
//
// ★ 冪等; 只改「起印量」語意, 保留價目數字。

import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'src', 'data', 'sku-seo-data.ts');
const src = fs.readFileSync(FILE, 'utf-8');
const lines = src.split('\n');

// 1) 找所有 SKU 區塊起點 (縮排 2 空白的 "key": {)
const blockStarts = [];
lines.forEach((l, i) => {
  if (/^ {2}"[^"]+": \{$/.test(l)) blockStarts.push(i);
});
if (!blockStarts.length) throw new Error('找不到 SKU 區塊');

// 2) 逐區塊判斷品類
const isPoster = (t) => /海報|poster/i.test(t);
const isPaperGoods = (t) => /貼紙|傳單|單張|摺頁|sticker|flyer|leaflet|label/i.test(t);
const isOutScope = (t) => /紙袋|包裝盒|彩盒|禮盒|紙盒|化妝品盒|月曆|年曆|信封|利是|紅包|餐牌|菜單|練習|筆記|紀念冊|notebook|bag|box|calendar|menu|envelope/i.test(t);

const NEEDLES = [
  { re: /100\s*張起印/g, unit: '張' },
  { re: /100張起印/g, unit: '張' },
  { re: /100起印/g, unit: '張' },
];

let nPoster = 0, nPaper = 0, nSkipBlocks = 0;
const report = [];
const skippedTitles = [];

for (let b = 0; b < blockStarts.length; b++) {
  const start = blockStarts[b];
  const end = b + 1 < blockStarts.length ? blockStarts[b + 1] : lines.length;
  const seg = lines.slice(start, end).join('\n');
  if (!/100\s*張起印|100張起印|100起印/.test(seg)) continue;

  const titleM = seg.match(/"title": "([^"]{0,90})/);
  const bodyM = seg.match(/"body": "([^"]{0,60})/);
  const identity = `${titleM ? titleM[1] : ''} ${bodyM ? bodyM[1] : ''}`;

  if (isOutScope(identity) && !isPoster(identity) && !isPaperGoods(identity)) {
    nSkipBlocks++;
    if (skippedTitles.length < 20) skippedTitles.push(identity.slice(0, 46));
    continue;
  }
  const to = isPoster(identity) ? '1 張起印' : '10 張起印';
  const toCompact = isPoster(identity) ? '1起印' : '10起印';

  for (let i = start; i < end; i++) {
    let l = lines[i];
    const before = l;
    l = l.replace(/100\s*張起印/g, to);
    l = l.replace(/100張起印/g, to.replace(' ', ''));
    l = l.replace(/100起印/g, toCompact);
    if (l !== before) {
      lines[i] = l;
      if (isPoster(identity)) nPoster++; else nPaper++;
    }
  }
  report.push(`${to} ← ${identity.slice(0, 52)}`);
}

fs.writeFileSync(FILE, lines.join('\n'), 'utf-8');
console.log('=== 區塊級起印量修正 ===');
console.log(`  海報類 → 1 張 : ${nPoster} 行`);
console.log(`  紙品類 → 10 張: ${nPaper} 行`);
console.log(`  保留區塊 (非本批): ${nSkipBlocks}`);
if (skippedTitles.length) { console.log('  保留樣本:'); skippedTitles.forEach((s) => console.log('    ' + s)); }
console.log(`\n  修正區塊明細 (${report.length}):`);
report.slice(0, 30).forEach((r) => console.log('    ' + r));
