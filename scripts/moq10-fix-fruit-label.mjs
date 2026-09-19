// moq10-fix-fruit-label.mjs — 修正水果貼紙食品標籤的起印量 (前置確認抓出的本批漏改)
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const prod = fs.readFileSync(path.join(ROOT, 'src/data/products.ts'), 'utf-8');
const i = prod.indexOf("slug: 'fruit-food-label-stickers'");
const mq = i >= 0 ? (prod.slice(i, i + 4000).match(/minQuantity:\s*(\d+)/) || [])[1] : null;
console.log(`fruit-food-label-stickers minQuantity = ${mq ?? 'NOT FOUND'}`);

const FILE = path.join(ROOT, 'src/data/sku-seo-data.ts');
let s = fs.readFileSync(FILE, 'utf-8');

const EDITS = [
  // 主描述首句
  ['水果貼紙食品標籤印刷 專為香港中小企、本地餐廳及跨境電商品牌設計。100 張起印，無開版費',
   '水果貼紙食品標籤印刷 專為香港中小企、本地餐廳及跨境電商品牌設計。10 張起印，無開版費'],
  // 「收費透明」模板句 (同檔其他 SKU 已於第五波修, 此 SKU 因 title 不同而漏)
  ['收費透明：100 張起印，無開版費、無製版費，港九新界 $500 以上免費順豐速遞。',
   '收費透明：10 張起印，無開版費、無製版費，港九新界 $500 以上免費順豐速遞。'],
  // FAQ Q2: 原寫「最低 100 張起印…小批量可低至 50 張」—— 與 minQuantity=10 直接矛盾
  ['100 張起印，無開版費、無製版費。小批量系列可低至 50 張。',
   '10 張起印，無開版費、無製版費。小批量系列（10-99 張）單張單價較高，100 張以上單張明顯較平。'],
];

let total = 0;
for (const [from, to] of EDITS) {
  const n = s.split(from).length - 1;
  if (n === 0) { console.log(`已冪等 (找不到): ${from.slice(0, 34)}…`); continue; }
  s = s.split(from).join(to);
  total += n;
  console.log(`${n} 處: ${from.slice(0, 40)}…`);
}
fs.writeFileSync(FILE, s, 'utf-8');
console.log(`\n合計 ${total} 處已修正`);

