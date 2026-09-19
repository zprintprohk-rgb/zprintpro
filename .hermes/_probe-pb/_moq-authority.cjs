'use strict';
/** 起订量权威基线 v2 — 行扫描 (按 slug 归属 minQuantity), 覆盖全 97 SKU */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const lines = fs.readFileSync(path.join(REPO, 'src', 'data', 'products.ts'), 'utf8').split('\n');

let cur = null;
const rows = [];
for (const L of lines) {
  const s = L.match(/^\s*slug:\s*'([^']+)'/);
  if (s) { cur = { slug: s[1], min: null, cat: null }; rows.push(cur); continue; }
  if (!cur) continue;
  const q = L.match(/minQuantity:\s*(\d+)/);
  if (q && cur.min === null) cur.min = +q[1];
  const c = L.match(/category_slug:\s*'([^']+)'/);
  if (c && !cur.cat) cur.cat = c[1];
  // 新的顶层对象以 "  {" 或 "  }," 结束
  if (/^\s*\},?\s*$/.test(L) && cur && cur.min !== null && cur.cat) cur = null;
}
const withMin = rows.filter(r => r.min !== null);
console.log(`SKU 总数: ${rows.length} | 有 minQuantity: ${withMin.length}\n`);

const GROUPS = [
  ['贴纸 / 标签（Etsy 高频）', /sticker|label/],
  ['传单 / 海报', /flyer|poster/],
  ['贺卡 / 请柬', /card|invitation|greeting/],
  ['书刊本册', /book|catalog|notebook|booklet|zine|selfpub|photo|campus|yearbook|magazine/],
  ['包装盒', /box|packaging|mailer/],
  ['纸袋', /bag/],
  ['年历 / 利是封', /calendar|red-packet|lai-see/],
];
for (const [name, kw] of GROUPS) {
  const list = withMin.filter(e => kw.test(e.slug) || (e.cat && kw.test(e.cat)));
  if (!list.length) continue;
  const mins = [...new Set(list.map(e => e.min))].sort((a, b) => a - b);
  console.log(`### ${name} — ${list.length} SKU | minQuantity ∈ {${mins.join(', ')}}`);
  list.slice(0, 10).forEach(e => console.log(`   ${String(e.min).padStart(4)}  ${e.slug}  [${e.cat}]`));
  if (list.length > 10) console.log(`   … 另 ${list.length - 10}`);
  console.log('');
}
console.log('=== 全局 minQuantity 分布 ===');
const dist = {};
withMin.forEach(e => dist[e.min] = (dist[e.min] || 0) + 1);
Object.entries(dist).sort((a, b) => +a[0] - +b[0]).forEach(([k, v]) => console.log(`   ${String(k).padStart(5)}: ${v} SKU`));
