#!/usr/bin/env node
/* 只读: T 批清单按「数据面(T1, 安全) / 代码面(T2, 需逐点复核)」分组 */
const fs = require('fs');
const M = JSON.parse(fs.readFileSync('F:\\zprintpro-main-tmp\\.hermes\\title-batch-T-manifest.json', 'utf8'));
const isData = (f) => /^src\/data\//.test(f) && !/sku-seo-data|products\.ts|pillar-content|buying-guides|product-seo|category-seo-content|blog-posts/.test(f);
const data = {}, code = {}, codeFiles = {}, dataFiles = {};
for (const i of M.items) {
  const key = i.file;
  if (isData(i.file)) { data[key] = (data[key] || 0) + 1; dataFiles[key] = (dataFiles[key] || 0) + 1; }
  else { code[key] = (code[key] || 0) + 1; }
}
const sum = (o) => Object.values(o).reduce((a, b) => a + b, 0);
console.log(`T1 (locale 键控数据文件, 机械可改): ${sum(data)} 处 / ${Object.keys(data).length} 文件`);
Object.entries(data).sort((a, b) => b[1] - a[1]).forEach(([f, n]) => console.log(`   ${String(n).padStart(3)}  ${f}`));
console.log(`\nT2 (代码/混合面, 需逐点复核): ${sum(code)} 处 / ${Object.keys(code).length} 文件`);
Object.entries(code).sort((a, b) => b[1] - a[1]).slice(0, 20).forEach(([f, n]) => console.log(`   ${String(n).padStart(3)}  ${f}`));
console.log('\n按 kind:', JSON.stringify(M.items.reduce((a, x) => (a[x.kind] = (a[x.kind] || 0) + 1, a), {})));
console.log('按 locale:', JSON.stringify(M.items.reduce((a, x) => (a[x.locale] = (a[x.locale] || 0) + 1, a), {})));
