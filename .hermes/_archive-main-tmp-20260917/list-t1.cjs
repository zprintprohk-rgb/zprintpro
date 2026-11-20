#!/usr/bin/env node
/* 只读: 列出 T1 (blog-data) 26 处的明细 + 所属 post slug (用于探针清单) */
const fs = require('fs');
const ROOT = 'F:\\zprintpro-main-tmp\\';
const M = JSON.parse(fs.readFileSync(ROOT + '.hermes\\title-batch-T-manifest.json', 'utf8'));
const items = M.items.filter(i => /^src\/data\/blog-data\//.test(i.file));
console.log(`T1 明细: ${items.length} 处`);
const byFile = {};
for (const it of items) (byFile[it.file] = byFile[it.file] || []).push(it);
for (const [f, arr] of Object.entries(byFile)) {
  const lines = fs.readFileSync(ROOT + f.replace(/\//g, '\\'), 'utf8').split(/\r?\n/);
  console.log(`\n=== ${f} (${arr.length}) ===`);
  for (const it of arr) {
    // 向上找所属 slug
    let slug = '?';
    for (let k = it.line - 1; k >= 0; k--) {
      const m = (lines[k] || '').match(/^\s{2}"([a-z0-9-]+)":\s*\{/);
      if (m) { slug = m[1]; break; }
    }
    const line = lines[it.line - 1] || '';
    const i = line.indexOf(it.form);
    console.log(`  L${it.line} [${it.kind}/${it.form}] slug=${slug} :: …${line.slice(Math.max(0, i - 55), i + 45).replace(/\\n/g, ' ')}…`);
  }
}
