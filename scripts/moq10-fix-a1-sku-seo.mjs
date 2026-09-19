// moq10-fix-a1-sku-seo.mjs
// 2026-09-19 — K3 路線圖 P0-2 A1 獨立 第 3 步
//
// 職責: 修正 a1-posters 在 sku-seo-data.ts 內的 6 處矛盾宣稱
//       (title 100起印 / description 10 張起 / body 100 張起 / en 50-MOQ + 100 MOQ / h1 50+ / HK$20起)。
//       全部統一為 K3 拍板口徑: **1 張起印**, 單張 HK$45 (Yupo/環保) / HK$56 (相紙), 10 張 HK$290/360。
//
// ★ 精準替換 (逐字串), 不作全域 replace。
// ★ 冪等: 找不到舊字串即報「已冪等」。

import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'src', 'data', 'sku-seo-data.ts');
let src = fs.readFileSync(FILE, 'utf-8');

const EDITS = [
  {
    id: 'title',
    from: '"title": "A1 大幅海報 厚紙・100起印・HK$20起・4小時打稿 | 智印港"',
    to: '"title": "A1 大幅海報 厚紙・1張起印・HK$45起・4小時打稿 | 智印港"',
  },
  {
    id: 'desc-zh',
    from: '"description": "A1 大幅海報/海報印刷 10 張起。',
    to: '"description": "A1 大幅海報/海報印刷 1 張起。',
  },
  {
    id: 'body-zh',
    from: 'A1大幅海報 專為香港中小企、本地餐廳及跨境電商品牌設計。100 張起印，無開版費，',
    to: 'A1大幅海報 專為香港中小企、本地餐廳及跨境電商品牌設計。1 張起印，無開版費，',
  },
  {
    id: 'desc-en',
    from: '"description": "A1 posters (594x841mm) for retail and trade shows. 200-300g matte or photo paper. 50-MOQ. Free US shipping over $100, DHL Express | Free Design | 100 MOQ"',
    to: '"description": "A1 posters (594x841mm) for retail and trade shows, from 1 poster (no minimum order). Yupo / eco poster inkjet or photo paper, matte art paper 200-300g. Free US shipping over $100, DHL Express | Free Design"',
  },
  {
    id: 'h1-en',
    from: '"h1": "A1 Posters 50+ | Trade Show | ZprintPro"',
    to: '"h1": "A1 Posters from 1 | Trade Show | ZprintPro"',
  },
];

const report = [];
for (const e of EDITS) {
  const n = src.split(e.from).length - 1;
  if (n === 0) { report.push(`${e.id}: 已冪等 (找不到舊字串)`); continue; }
  src = src.split(e.from).join(e.to);
  report.push(`${e.id}: ${n} 處已修正`);
}

fs.writeFileSync(FILE, src, 'utf-8');
console.log('=== a1-posters SKU SEO 修正 ===');
for (const r of report) console.log('  ' + r);
