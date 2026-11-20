// .hermes/_moq_desc.cjs — 4 SKU desc 字段口径 + 全库 MOQ 串统计
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const marks = [];
const re = /^  "([a-z0-9-]+)": \{/gm;
let m; while ((m = re.exec(t)) !== null) marks.push({ slug: m[1], off: m.index });
['certificates', 'textbooks', 'electronics-packaging-box', 'kraft-paper-packaging-box'].forEach(slug => {
  const i = marks.findIndex(x => x.slug === slug);
  const seg = t.slice(marks[i].off, marks[i + 1] ? marks[i + 1].off : t.length);
  const dm = seg.match(/"description":\s*"((?:[^"\\]|\\.)*)"/);
  const desc = dm ? dm[1] : '';
  const claims = [...new Set([...desc.matchAll(/(\d{1,5})\s*(?:個|張|枚|本|冊)\s*起/g)].map(x => x[1]))];
  console.log(`${slug}: descClaims=${JSON.stringify(claims)} descHead=${JSON.stringify(desc.slice(0, 90))}`);
});
