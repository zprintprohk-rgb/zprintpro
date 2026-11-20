'use strict';
/** 采集 products-content.ts 中「定价口径」相关文案的精确原文 (三语), 供断言式改写 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const F = path.join(REPO, 'src', 'data', 'products-content.ts');
const raw = fs.readFileSync(F, 'utf8');
const lines = raw.split('\n');

const NEEDLES = [
  '校準報價', '校準來源', '真實校準', '參考實詢', '参考價格 × 1.3', '合理利潤', 'RMB→HKD',
  'Calibrated Pricing', '1.3x fair margin', 'CNY→USD', 'supplier quote', 'Calibration source',
  '校正価格', '校正価', '参考価格', '校正後',
];

console.log('=== 逐条命中定位 (行号 + 原文片段) ===\n');
const found = {};
lines.forEach((L, i) => {
  NEEDLES.forEach(nd => {
    if (L.includes(nd)) {
      found[nd] = found[nd] || [];
      found[nd].push({ line: i + 1, ctx: L });
    }
  });
});
Object.entries(found).forEach(([nd, arr]) => {
  console.log(`--- 「${nd}」 × ${arr.length} ---`);
  arr.forEach(a => {
    const idx = a.ctx.indexOf(nd);
    console.log(`  L${a.line}: …${a.ctx.slice(Math.max(0, idx - 120), idx + 150)}…`);
  });
  console.log('');
});

// 导出所有含定价口径的整段 (给改写用)
console.log('=== 逐行完整原文 (含 h3/p 段, 便于构造替换) ===');
const lines2 = new Set();
Object.values(found).forEach(arr => arr.forEach(a => lines2.add(a.line)));
[...lines2].sort((a, b) => a - b).forEach(ln => {
  const L = lines[ln - 1];
  if (L.length < 3000) {
    console.log(`\n##### L${ln} (len ${L.length}) #####`);
    console.log(L);
  } else {
    console.log(`\n##### L${ln} (len ${L.length}) — 只印定价相关窗口 #####`);
    const nd = NEEDLES.find(n => L.includes(n));
    const idx = nd ? L.indexOf(nd) : 0;
    console.log(L.slice(Math.max(0, idx - 400), idx + 700));
  }
});
