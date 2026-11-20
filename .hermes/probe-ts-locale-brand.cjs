#!/usr/bin/env node
/* 只读: sku-seo-data.ts 按 locale 统计品牌词 (轻量行扫描, 不做完整解析) */
const fs = require('fs');
const lines = fs.readFileSync('F:\\zprintpro-nextjs\\src\\data\\sku-seo-data.ts', 'utf8').split(/\r?\n/);
const stat = { 'zh-hk': { z: 0, c: 0 }, en: { z: 0, c: 0 }, ja: { z: 0, c: 0 } };
let cur = null;
const zhHkZLines = [];
lines.forEach((l, i) => {
  const m = l.match(/"(zh-hk|en|ja)"\s*:\s*[{"\[]/);
  if (m) cur = m[1];
  if (!cur) return;
  const z = (l.match(/ZprintPro/g) || []).length;
  const c = (l.match(/智印港/g) || []).length;
  stat[cur].z += z; stat[cur].c += c;
  if (cur === 'zh-hk' && z && zhHkZLines.length < 8) zhHkZLines.push(`L${i + 1}: ${l.trim().slice(0, 160)}`);
});
console.log('按 locale 计数:', JSON.stringify(stat, null, 0));
console.log('\n--- zh-hk 段落内 ZprintPro 行样本 ---');
console.log(zhHkZLines.join('\n') || '(无)');

// entry 计数
const entries = (fs.readFileSync('F:\\zprintpro-nextjs\\src\\data\\sku-seo-data.ts', 'utf8').match(/^  "[a-z0-9-]+":\s*\{/gm) || []).length;
console.log('\nentry 数:', entries);
