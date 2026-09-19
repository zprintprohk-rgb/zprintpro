'use strict';
/** Etsy 篇草稿的**事实来源预核** — 每个数字/表述必须在站内找到来源, 否则不写 (防编造, §0.23) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const FILES = [
  'src/data/blog-data/en.json', 'src/data/buying-guides.ts', 'src/data/products.ts',
  'src/data/products-content.ts', 'src/lib/print-method-policy.ts', 'src/data/category-seo-content.ts',
];
const blob = FILES.map(f => { try { return fs.readFileSync(path.join(REPO, f), 'utf8'); } catch (e) { return ''; } }).join('\n');

const CLAIMS = [
  ['起订 1 本（数码）', /From 1 copy \(digital\)/],
  ['100 本以上柯式更经济', /100\+ cheaper on offset/],
  ['免费打样 / free proof', /free (digital )?proof/i],
  ['DHL 2-4 天', /DHL[^.]{0,20}2-4/i],
  ['FDA 21 CFR 175.105', /21 CFR 175\.105/],
  ['EU REACH', /EU REACH/],
  ['ISO 12647', /ISO 12647/],
  ['FSC 纸材', /FSC-certified paper/],
  ['30 秒 AI 报价', /30-second (AI )?(instant )?quote/i],
  ['免费美国运费 $99', /Free US shipping over \$99|free shipping over \$99|Free shipping over \$99/i],
  ['自有工厂（深圳）', /own factory in Shenzhen|Shenzhen-owned|self-owned factory/i],
  ['5-7 工作日生产', /5-7 (working days|business days|day)/i],
  ['saddle stitch 8-64 页', /8-64/],
  ['perfect bound 48-400 页', /48-400/],
  ['硬壳 2.5mm 灰板', /2\.5 ?mm (gray|grey) board/i],
  ['防水 BOPP', /BOPP/],
];

console.log('=== 事实来源预核 (站内是否存在该表述) ===');
let miss = 0;
for (const [label, re] of CLAIMS) {
  const ok = re.test(blob);
  if (!ok) miss++;
  console.log(`  ${ok ? '✅' : '⚠️ 站内未见'}  ${label}`);
}
console.log(`\n  ${miss ? miss + ' 项无站内来源 => 草稿中不得使用或须改写' : '全部有来源 ✅'}`);
