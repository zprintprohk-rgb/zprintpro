#!/usr/bin/env node
/* 只读: 生成「非 title 面」双品牌清单 (file:line:column:form) → .hermes/dual-brand-nontitle.json + 摘要
 * 口径: 与 classify-dual-brand.cjs 一致 (行内含 title/meta/desc/alt 字段名 = title 面, 其余 = 非 title 面)
 * 排除: 门禁/扫描脚本自身 (其双品牌字串是检测正则, 不许改)
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-main-tmp';
const OUT = 'F:\\zprintpro-nextjs\\.hermes\\dual-brand-nontitle.json';
const SCAN = ['src', 'messages'];
const EXT = new Set(['.ts', '.tsx', '.js', '.mjs', '.cjs', '.json', '.html']);
const RE = /智印港\s*ZprintPro|智印港\s*\|\s*ZprintPro|ジープリント\s*ZprintPro|ZprintPro\s*智印港/g;
const TITLE_HINT = /title|Title|headline|og:title|twitter:title|seoTitle|metaTitle|featuredSnippet|name":\s*"|alt|Alt|aria-label|description|Description|metaDesc/;
// 排除清单: 检测/门禁脚本 (字串即规则)
const EXCLUDE = [
  'scripts/guards/', 'scripts/check-', 'src/lib/brand-', 'scripts/seed-error-patterns',
];

const files = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (['node_modules', '.next', '.git', '.open-next'].includes(e.name)) continue; walk(p); }
    else if (EXT.has(path.extname(e.name))) files.push(p);
  }
}
SCAN.forEach(d => { const p = path.join(ROOT, d); if (fs.existsSync(p)) walk(p); });

const manifest = [];
const summary = {};
for (const f of files) {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  if (EXCLUDE.some(x => rel.startsWith(x))) continue;
  let t; try { t = fs.readFileSync(f, 'utf8'); } catch { continue; }
  if (!RE.test(t)) continue;
  RE.lastIndex = 0;
  const lines = t.split(/\r?\n/);
  lines.forEach((line, idx) => {
    RE.lastIndex = 0;
    let m;
    while ((m = RE.exec(line)) !== null) {
      const isTitle = TITLE_HINT.test(line);
      manifest.push({ file: rel, line: idx + 1, col: m.index + 1, form: m[0], face: isTitle ? 'title' : 'body', ctx: line.trim().slice(Math.max(0, m.index - 40), m.index + 60) });
      const k = rel + '|' + (isTitle ? 'title' : 'body');
      summary[k] = (summary[k] || 0) + 1;
    }
  });
}
const body = manifest.filter(x => x.face === 'body');
const title = manifest.filter(x => x.face === 'title');
fs.writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), total: manifest.length, bodyCount: body.length, titleCount: title.length, items: manifest }, null, 1), 'utf8');
console.log(`清单: 总 ${manifest.length} | 非 title 面 ${body.length} | title 面 ${title.length} -> ${OUT}`);
console.log('\n--- 非 title 面 按文件 (前 25) ---');
const byFile = {};
body.forEach(x => { byFile[x.file] = (byFile[x.file] || 0) + 1; });
Object.entries(byFile).sort((a, b) => b[1] - a[1]).slice(0, 25).forEach(([f, n]) => console.log(`  ${String(n).padStart(4)}  ${f}`));
console.log('\n--- 形态分布 ---');
const byForm = {};
body.forEach(x => { byForm[x.form] = (byForm[x.form] || 0) + 1; });
console.log(JSON.stringify(byForm, null, 1));
