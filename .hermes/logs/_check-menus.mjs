// .hermes/logs/_check-menus.mjs — menus 簇 5 SKU 現狀盤點（對照 K3 市場基準）
import fs from 'node:fs';

const lines = fs.readFileSync('src/data/products.ts', 'utf8').split(/\r?\n/);
const SLUGS = ['pvc-menus', 'laminated-menus', 'hardcover-menus', 'drink-menus', 'disposable-menus'];

/** K3 2026-09-19 市場基準建議 */
const K3_TARGET = {
  'pvc-menus': { truth: 10, unit: '份', market: 'print88king PVC 10 張 HKD24/張' },
  'laminated-menus': { truth: 10, unit: '份', market: 'cpress 過膠 10 張 $95 / 高碧 10 張 $9.50/張' },
  'hardcover-menus': { truth: 10, unit: '本', market: '香港印刷中心精裝 1 本起（硬皮+可換內頁）' },
  'drink-menus': { truth: 10, unit: '份', market: '酒水單小批量數碼可行' },
  'disposable-menus': { truth: 100, unit: '份', market: '一次性餐牌屬大批量柯式產線（128–157g 輕身紙）' },
};

for (const slug of SLUGS) {
  const i = lines.findIndex((l) => /^ {4}slug:/.test(l) && l.includes(`'${slug}'`));
  if (i < 0) {
    console.log(`🔴 ${slug}: 找不到`);
    continue;
  }
  let mq = '';
  let name = '';
  let price = '';
  let desc = '';
  for (let k = i; k < i + 90 && k < lines.length; k++) {
    if (k > i && /^ {4}slug:/.test(lines[k])) break;
    if (!name) {
      const m = lines[k].match(/name: '([^']{0,70})/);
      if (m) name = m[1];
    }
    const m2 = lines[k].match(/^\s*minQuantity:\s*(\d+)/);
    if (m2 && !mq) mq = m2[1];
    const m3 = lines[k].match(/price_range:\s*'([^']{0,40})/);
    if (m3 && !price) price = m3[1];
    const m4 = lines[k].match(/^\s*description: '([^']{0,130})/);
    if (m4 && !desc) desc = m4[1];
  }
  const k3 = K3_TARGET[slug];
  const needChange = String(k3.truth) !== mq;
  console.log(`${needChange ? '🔴 需改' : '✓ 已符'} [${slug}] 真值=${mq} → K3 建議 ${k3.truth} (${k3.unit})`);
  console.log(`     name: ${name}`);
  console.log(`     價格: ${price}`);
  console.log(`     市場依據: ${k3.market}`);
  console.log(`     描述: ${desc.slice(0, 110)}`);
  console.log('');
}
