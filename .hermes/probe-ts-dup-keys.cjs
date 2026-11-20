#!/usr/bin/env node
/* 只读: sku-seo-data.ts 重复 slug key 检查 + 名片 SKU 全部出现位置 */
const fs = require('fs');
const p = 'F:\\zprintpro-main-tmp\\src\\data\\sku-seo-data.ts';
const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
const seen = new Map();
lines.forEach((l, i) => {
  const m = l.match(/^  "([a-z0-9-]+)":\s*\{/);
  if (!m) return;
  const k = m[1];
  if (!seen.has(k)) seen.set(k, []);
  seen.get(k).push(i + 1);
});
const dup = [...seen.entries()].filter(([, v]) => v.length > 1);
console.log(`总 slug key=${seen.size}, 重复 key=${dup.length}`);
dup.slice(0, 20).forEach(([k, v]) => console.log(`  DUP ${k} @ lines ${v.join(', ')}`));

console.log('\n--- 名片相关 key 与 title ---');
const targets = ['thick-greeting-cards-400g', 'foil-greeting-cards', 'premium-greeting-cards', 'matte-greeting-cards', 'spot-uv-greeting-cards', 'rounded-corner-greeting-cards'];
for (const t of targets) {
  const occ = seen.get(t);
  if (!occ) { console.log(`  ${t}: (无 entry)`); continue; }
  for (const ln of occ) {
    const t1 = (lines[ln - 1 + 4] || '').trim().slice(0, 120); // 粗略取 title 行
    console.log(`  ${t} @L${ln}: ${t1}`);
  }
}
// 全文 title 含 名片 的行
console.log('\n--- 全文 title 含「名片」 ---');
lines.forEach((l, i) => { if (/"title":/.test(l) && /名片/.test(l)) console.log(`  L${i + 1}: ${l.trim().slice(0, 130)}`); });
