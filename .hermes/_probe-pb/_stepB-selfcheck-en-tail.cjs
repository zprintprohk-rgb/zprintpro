'use strict';
/** 自查: Step B-1 给 en 页写的中文尾巴是否增加了 en 值内 CJK (与 Step C 目标冲突?) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const F = path.join(REPO, 'src', 'data', 'buying-guides.ts');
const BAK = path.join(REPO, '.hermes', '_probe-pb', '_buying-guides.ts.bak-stepB1');

const CJK = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/g;   // 基本区 + 扩展A + 兼容
const cnt = (s) => (s.match(CJK) || []).length;

const oldTail = '<p><small class="text-gray-500">数据来源：GSC 数据 / gsc-fresh-2026-09-03.json · candle labels · imps 数据 · pos 数据 (per K3 v10 §九 + §0.23 数据诚信红线, 校准 2026-09-17 K3 v10 拍板日)</small></p>';
const newTail = '<p><small class="text-gray-500">Specs and pricing in this guide are based on our latest 2026 market review, for material and budget planning.</small></p>';

console.log('=== Step B-1 en 尾巴 自查 ===');
console.log('  旧尾巴 CJK 字符数:', cnt(oldTail));
console.log('  新尾巴 CJK 字符数:', cnt(newTail), '  <- 期望 0');
console.log('  旧尾巴:', JSON.stringify(oldTail.slice(0, 60)));
console.log('  新尾巴:', JSON.stringify(newTail.slice(0, 60)));

// 直接看现网档里 en: 那一行的 CJK
const lines = fs.readFileSync(F, 'utf8').split('\n');
const enLine = lines[929];   // L930
const tail = enLine.slice(enLine.lastIndexOf('<p><small'));
console.log('\n=== 现网 en 行 (L930) 尾部实际内容 ===');
console.log('  ' + JSON.stringify(tail));
console.log('  该尾巴 CJK:', cnt(tail), '  <- 若 >0 则 en 值内仍有中文');

const zhLine = lines[928], jaLine = lines[930];
const zhTail = zhLine.slice(zhLine.lastIndexOf('<p><small'));
const jaTail = jaLine.slice(jaLine.lastIndexOf('<p><small'));
console.log('\n=== zh-hk / ja 尾巴 CJK (应 >0, 属正常语系) ===');
console.log('  zh-hk:', cnt(zhTail), JSON.stringify(zhTail.slice(0, 50)));
console.log('  ja   :', cnt(jaTail), JSON.stringify(jaTail.slice(0, 50)));

// 三语尾巴列表现状
console.log('\n=== 结论 ===');
if (cnt(tail) > 0) {
  console.log('  ⚠️ en 值内仍有中文', cnt(tail), '字 —— 需改为纯英文');
} else {
  console.log('  ✅ en 值内 0 中文');
}
