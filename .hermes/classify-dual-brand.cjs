#!/usr/bin/env node
/* 只读: 443 处双品牌按「是否 title 承载」分类 (逐处判定所在行/字段) */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-main-tmp';
const SCAN = ['src', 'messages', 'scripts'];
const EXT = new Set(['.ts', '.tsx', '.js', '.mjs', '.cjs', '.json', '.html', '.md']);
const RE = /智印港\s*ZprintPro|智印港\s*\|\s*ZprintPro|ジープリント\s*ZprintPro|ZprintPro\s*智印港/g;
const TITLE_HINT = /title|Title|headline|og:title|twitter:title|seoTitle|metaTitle|featuredSnippet|name":\s*"|alt|Alt|aria-label|description|Description|metaDesc/;

const files = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (['node_modules', '.next', '.git', '.open-next'].includes(e.name)) continue; walk(p); }
    else if (EXT.has(path.extname(e.name))) files.push(p);
  }
}
SCAN.forEach(d => { const p = path.join(ROOT, d); if (fs.existsSync(p)) walk(p); });

let total = 0, inTitle = 0, inBody = 0;
const byFileTitle = [];
for (const f of files) {
  let t; try { t = fs.readFileSync(f, 'utf8'); } catch { continue; }
  if (!RE.test(t)) continue;
  RE.lastIndex = 0;
  const lines = t.split(/\r?\n/);
  let ft = 0, fb = 0;
  for (const line of lines) {
    const n = (line.match(RE) || []).length;
    if (!n) continue;
    // 判定: 行内是否出现 title/description/alt 类字段名
    if (TITLE_HINT.test(line)) ft += n; else fb += n;
  }
  total += ft + fb; inTitle += ft; inBody += fb;
  if (ft) byFileTitle.push({ file: path.relative(ROOT, f).replace(/\\/g, '/'), ft, fb });
}
byFileTitle.sort((a, b) => b.ft - a.ft);
console.log(`总 ${total} 处 | 落在 title/meta/alt/desc 字段行 = ${inTitle} | 落在正文/其他行 = ${inBody}`);
console.log('--- 含 title/meta 字段的行内命中 (按文件) ---');
byFileTitle.forEach(r => console.log(`  ${String(r.ft).padStart(4)} title行 / ${String(r.fb).padStart(4)} 其他行  ${r.file}`));
