#!/usr/bin/env node
/* 只读: 精化面判定 — 逐处回看上文 (最多 8 行) 找 title/SEO-title 键, 区分 title 面 vs 正文面
 * 输出: .hermes/dual-brand-refined.json + 汇总
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-main-tmp';
const OUT = 'F:\\zprintpro-nextjs\\.hermes\\dual-brand-refined.json';
const SCAN = ['src', 'messages'];
const EXT = new Set(['.ts', '.tsx', '.js', '.mjs', '.cjs', '.json', '.html']);
const RE = /智印港\s*ZprintPro|智印港\s*\|\s*ZprintPro|ジープリント\s*ZprintPro|ZprintPro\s*智印港/g;
// 同行的 title 提示
const TITLE_SAME = /title|Title|headline|og:title|twitter:title|seoTitle|metaTitle|featuredSnippet|\balt\b|Alt|aria-label|description|Description|metaDesc/;
// 上文键 (title/SEO title 类) — 出现即视为 title 面
const KEY_UP = /(^|\s)(title|ogTitle|twitterTitle|h1|headline|seoTitle|metaTitle|indexTitle|displayName|siteName|authorName|pageTitle)\s*:/;
const EXCLUDE = ['scripts/'];

const files = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (['node_modules', '.next', '.git', '.open-next'].includes(e.name)) continue; walk(p); }
    else if (EXT.has(path.extname(e.name))) files.push(p);
  }
}
SCAN.forEach(d => { const p = path.join(ROOT, d); if (fs.existsSync(p)) walk(p); });

const items = [];
for (const f of files) {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  if (EXCLUDE.some(x => rel.startsWith(x))) continue;
  const t = fs.readFileSync(f, 'utf8');
  if (!RE.test(t)) continue;
  RE.lastIndex = 0;
  const lines = t.split(/\r?\n/);
  lines.forEach((line, idx) => {
    RE.lastIndex = 0;
    let m;
    while ((m = RE.exec(line)) !== null) {
      let face = 'body', why = 'no-title-key';
      if (TITLE_SAME.test(line)) { face = 'title'; why = 'same-line-title-field'; }
      else {
        for (let k = idx - 1; k >= Math.max(0, idx - 8); k--) {
          const prev = lines[k];
          if (!prev.trim()) continue;
          if (KEY_UP.test(prev)) { face = 'title'; why = `up-key:${prev.trim().slice(0, 40)}`; break; }
          // 遇到对象结束或同级新键, 停止回看
          if (/^\s*\},?\s*$/.test(prev)) break;
        }
      }
      const form = m[0];
      items.push({ file: rel, line: idx + 1, form, face, why, ctx: line.trim().slice(Math.max(0, m.index - 45), m.index + 55) });
    }
  });
}
const body = items.filter(x => x.face === 'body');
const title = items.filter(x => x.face === 'title');
fs.writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), total: items.length, bodyCount: body.length, titleCount: title.length, items }, null, 1), 'utf8');
console.log(`精化分类: 总 ${items.length} | 正文面 ${body.length} | title 面 ${title.length} -> ${OUT}`);
const byFormLoc = {};
body.forEach(x => {
  const loc = /ジープリント/.test(x.form) ? 'ja' : 'zh-hk';
  byFormLoc[loc] = byFormLoc[loc] || {};
  byFormLoc[loc][x.form] = (byFormLoc[loc][x.form] || 0) + 1;
});
console.log('正文面 语言×形态:', JSON.stringify(byFormLoc));
const byFile = {};
body.forEach(x => { byFile[x.file] = (byFile[x.file] || 0) + 1; });
console.log('\n--- 正文面按文件 (前 25) ---');
Object.entries(byFile).sort((a, b) => b[1] - a[1]).slice(0, 25).forEach(([f, n]) => console.log(`  ${String(n).padStart(4)}  ${f}`));
console.log('\n--- 被精化为 title 面的样本 (前 12, 说明误判修正) ---');
title.filter(x => x.why.startsWith('up-key')).slice(0, 12).forEach(x => console.log(`  ${x.file}:${x.line} [${x.why}] ${x.ctx.slice(0, 70)}`));
