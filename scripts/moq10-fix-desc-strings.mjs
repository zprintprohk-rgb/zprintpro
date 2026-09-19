// moq10-fix-desc-strings.mjs
// 2026-09-19 — 全網站起訂量修正 (紙品 100 → 10) 第 4 步
//
// 職責: 修正受影響紙品 SKU 的用戶可見文案中殘留的「100 起印」事實宣稱。
//       只改「起印量」語意, 不動價格、不動非受影響 SKU (包裝盒/紙袋/月曆/婚慶維持 100+)。
//
// ★ 精準替換: 逐 SKU 區塊內替換, 不全域 replace, 避免誤傷他品類。
// ★ price_range 內不含「起印」字樣, 故不會被誤改 (已核: 如 'HK$0.35-0.95/張')。

import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'src', 'data', 'products.ts');

const TARGETS = [
  'premium-greeting-cards', 'thick-greeting-cards-400g', 'foil-greeting-cards',
  'spot-uv-greeting-cards', 'matte-greeting-cards', 'rounded-corner-greeting-cards',
  'waterproof-stickers', 'transparent-stickers', 'removable-stickers', 'small-batch-stickers',
  'die-cut-stickers', 'foil-stickers', 'security-stickers', 'fluorescent-stickers',
  'a4-flyers', 'a5-flyers', 'double-sided-flyers', 'folded-leaflets',
  'thick-paper-flyers', 'eco-flyers', 'same-day-flyers', 'school-flyers',
];

/** 替換表 (順序有意義: 先長後短, 先帶空格後不帶) */
const RULES = [
  [/100\s*張起印/g, '10 張起印'],
  [/100\s*張起(?!印)/g, '10 張起'],
  [/MOQ\s*100/g, 'MOQ 10'],
  [/(?<![\d])100\s*MOQ/g, '10 MOQ'],
  [/100\s*枚から/g, '10枚から'],
  [/100\s*枚〜/g, '10枚〜'],
];

let src = fs.readFileSync(FILE, 'utf-8');
const lines = src.split('\n');

// 以 4 空白縮排的 "slug: '<slug>'" 作為產品區塊邊界
const anchors = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^    slug: '([^']+)'/);
  if (m) anchors.push({ slug: m[1], line: i });
}

let totalRepl = 0;
const report = [];

// 由後往前改, 避免位移
for (let a = anchors.length - 1; a >= 0; a--) {
  const { slug, line } = anchors[a];
  if (!TARGETS.includes(slug)) continue;
  const end = a + 1 < anchors.length ? anchors[a + 1].line : lines.length;
  let blockRepl = 0;
  const hits = [];
  for (let i = line; i < end; i++) {
    let cur = lines[i];
    for (const [re, to] of RULES) {
      const found = cur.match(re);
      if (found) {
        hits.push(...found);
        blockRepl += found.length;
        cur = cur.replace(re, to);
      }
    }
    lines[i] = cur;
  }
  if (blockRepl) {
    totalRepl += blockRepl;
    report.push(`${slug}: ${blockRepl} 處 (${[...new Set(hits)].join(' / ')})`);
  }
}

fs.writeFileSync(FILE, lines.join('\n'), 'utf-8');

console.log('=== 文案 100→10 起印 修正 ===');
for (const r of report) console.log('  ' + r);
console.log(`\n共 ${report.length} 個 SKU / ${totalRepl} 處已修正。`);
