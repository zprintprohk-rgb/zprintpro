#!/usr/bin/env node
/* 只读: 代码层「双品牌 智印港 ZprintPro」存量盘点 (按文件 + 按面分类)
 * 口径: 现行规则 = K3 2026-09-01 02:54 单品牌分层 (AGENTS.md §2/§7); zh-hk 文本不得再出现 ZprintPro
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-main-tmp';
const SCAN = ['src', 'messages', 'scripts'];
const EXT = new Set(['.ts', '.tsx', '.js', '.mjs', '.cjs', '.json', '.html', '.md']);
const RE = /智印港\s*ZprintPro|智印港\s*\|\s*ZprintPro|ジープリント\s*ZprintPro|ZprintPro\s*智印港/g;

const files = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.next', '.git', '.open-next'].includes(e.name)) continue;
      walk(p);
    } else if (EXT.has(path.extname(e.name))) files.push(p);
  }
}
SCAN.forEach(d => { const p = path.join(ROOT, d); if (fs.existsSync(p)) walk(p); });

const rows = [];
let total = 0;
for (const f of files) {
  let t;
  try { t = fs.readFileSync(f, 'utf8'); } catch { continue; }
  const m = t.match(RE);
  if (!m) continue;
  total += m.length;
  rows.push({ file: path.relative(ROOT, f).replace(/\\/g, '/'), n: m.length });
}
rows.sort((a, b) => b.n - a.n);
console.log(`=== 双品牌「智印港 ZprintPro」代码层存量: ${total} 处 / ${rows.length} 文件 ===`);
rows.slice(0, 40).forEach(r => console.log(`  ${String(r.n).padStart(4)}  ${r.file}`));

// 分类
const cls = { 'SEO/元数据层': [], '页面文案层': [], '数据 title 层': [], '内部/后台': [], '其他': [] };
for (const r of rows) {
  if (/src\/lib\/seo|schema|layout\.tsx|middleware|src\/lib\/quote-engine/.test(r.file)) cls['SEO/元数据层'].push(r);
  else if (/src\/data\/.*(blog-posts|blog-data|products\.ts|category-seo)/.test(r.file)) cls['数据 title 层'].push(r);
  else if (/quote-desk|all\/page/.test(r.file)) cls['内部/后台'].push(r);
  else if (/src\/app\/\[locale\]|src\/components/.test(r.file)) cls['页面文案层'].push(r);
  else cls['其他'].push(r);
}
console.log('\n=== 按面分类 ===');
for (const [k, v] of Object.entries(cls)) {
  const n = v.reduce((a, b) => a + b.n, 0);
  console.log(`${k}: ${n} 处 / ${v.length} 文件`);
  v.slice(0, 8).forEach(r => console.log(`    - ${r.file} (${r.n})`));
}
