#!/usr/bin/env node
/* 只读: 全站源代码内简体「行业」/「适配行业」分布 (线上 zh-hk 页 12 处污染的来源定位) */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-main-tmp';
const EXT = /\.(ts|tsx|js|json|html)$/;
const files = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { if (!['node_modules', '.next', '.git', '.open-next'].includes(e.name)) walk(p); } else if (EXT.test(e.name)) files.push(p); } })(path.join(ROOT, 'src'));
let total = 0; const per = {};
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  const n = (t.match(/行业/g) || []).length;
  if (n) { total += n; per[path.relative(ROOT, f).replace(/\\/g, '/')] = n; }
}
console.log(`源码内简体「行业」合计 ${total} 处 / ${Object.keys(per).length} 文件`);
Object.entries(per).sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([f, n]) => console.log(`  ${String(n).padStart(4)}  ${f}`));
// 其他高频简体字抽样 (用守卫同一字符集)
const SIMP = /[复电业为发这们个时来会说过对开现应学页]/g;
let s2 = 0; const per2 = {};
for (const f of files) { const t = fs.readFileSync(f, 'utf8'); const n = (t.match(SIMP) || []).length; if (n) { s2 += n; per2[path.relative(ROOT, f).replace(/\\/g, '/')] = n; } }
console.log(`\n其他简体字 (守卫字符集) 合计 ${s2} 处 / ${Object.keys(per2).length} 文件`);
Object.entries(per2).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([f, n]) => console.log(`  ${String(n).padStart(4)}  ${f}`));
