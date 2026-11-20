// 按品类展示工艺: 只改 flyer 家族 8 个条目的通用 FAQ 工艺清单 (2026-09-23, 用户拍板)
// 其余 64 个产品 (贺卡/餐牌/贴纸等圆角模切为真实工艺) 不动。
const fs = require('fs');
const FILE = 'F:/zprintpro-nextjs/src/data/products-content.ts';
const FLYERS = ['a4-flyers','a5-flyers','double-sided-flyers','folded-leaflets','thick-paper-flyers','eco-flyers','same-day-flyers','school-flyers'];
const FAQ_PREFIX = '<details class="my-2"><summary><strong>智印港支援哪些材質和工藝？</strong></summary>';
const OLD_FAQ = FAQ_PREFIX + '<p>材質涵蓋銅版紙、啞粉紙、棉質紙、牛皮紙、PET、PVC 等。工藝包括四色柯式印刷、燙金、燙銀、局部 UV、壓凹、壓紋、圓角模切、騎馬釘、無線膠裝、PUR 裝等多種選擇，免費樣品對比。</p></details>';
const NEW_FAQ = FAQ_PREFIX + '<p>材質涵蓋銅版紙、啞粉紙、書紙、牛皮紙等。傳單常用工藝包括四色柯式／數碼印刷、對摺／三摺摺頁、局部 UV 與標準刀模裁切等多種選擇，免費樣品對比。</p></details>';

const t = fs.readFileSync(FILE, 'utf8');
const lines = t.split(/\r?\n/);
let cur = '?';
let changed = 0, foundInFlyers = 0, nonFlyerHits = 0;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^  '([a-z0-9-]+)': \{/);
  if (m) cur = m[1];
  if (lines[i].includes(FAQ_PREFIX)) {
    if (FLYERS.includes(cur)) {
      if (lines[i] === OLD_FAQ) { lines[i] = NEW_FAQ; changed++; }
      else { console.log(`⚠️ L${i + 1} ${cur}: FAQ 行与预期不同, 未替换 (需人工核对)`); }
      foundInFlyers++;
    } else {
      nonFlyerHits++;
    }
  }
}
console.log(`flyer 家族 FAQ 命中: ${foundInFlyers} | 已替换: ${changed} | 非 flyer 命中(不动): ${nonFlyerHits}`);
if (foundInFlyers !== 8) { console.log('❌ 应命中 8 个 flyer, 实际 ' + foundInFlyers + ' — 中止写回'); process.exit(1); }
if (changed !== foundInFlyers) { console.log('❌ 部分未替换, 中止写回'); process.exit(1); }
fs.writeFileSync(FILE, lines.join('\r\n'), 'utf8');
console.log('✅ 已写回 products-content.ts (' + changed + ' 处 flyer FAQ 按品类定制)');
