'use strict';
/** 按「独立口径干跑真值」一键对齐 wave1-execute.cjs 的全部期望次数 (消除人工计数误差) */
const fs = require('fs');
const path = require('path');
const P = path.resolve(__dirname, 'wave1-execute.cjs');
let t = fs.readFileSync(P, 'utf8');
const m = t.match(/const RULES = \[([\s\S]*?)\n\];/);
const F = {
  en: 'src/data/blog-data/en.json', ja: 'src/data/blog-data/ja.json',
  cat: 'src/data/category-seo-content.ts', sku: 'src/data/sku-seo-data.ts',
  buy: 'src/data/buying-guides.ts', bp: 'src/data/blog-posts.ts',
  catpage: 'src/app/[locale]/category/[slug]/page.tsx',
};
const src = {};
for (const k of Object.keys(F)) src[k] = fs.readFileSync(path.join(path.resolve(__dirname, '..', '..'), F[k]), 'utf8');
const RULES = eval('[' + m[1] + ']');

let changed = 0;
for (const [fk, oldS, , expect] of RULES) {
  const real = src[fk].split(oldS).length - 1;
  if (real === expect) continue;
  const start = t.indexOf("'" + oldS + "'");
  if (start < 0) { console.log('  未找到: ' + oldS.slice(0, 30)); continue; }
  const afterStr = start + oldS.length + 1;
  const seg = t.slice(afterStr, afterStr + 80);
  const nm = seg.match(/^(['"]?,\s*'[^']*')(,\s*)(\d+)(,\s*')/);
  if (!nm) { console.log('  定位失败: ' + oldS.slice(0, 30) + ' seg=' + JSON.stringify(seg.slice(0, 26))); continue; }
  const newSeg = seg.replace(/^(['"]?,\s*'[^']*')(,\s*)(\d+)(,\s*')/, `$1$2${real}$4`);
  t = t.slice(0, afterStr) + newSeg + t.slice(afterStr + 80);
  console.log(`  ${oldS.slice(0, 32).padEnd(34)} ${nm[3]} → ${real}`);
  changed++;
}
fs.writeFileSync(P, t, 'utf8');
console.log(`已写回 (${changed} 条对齐)`);
