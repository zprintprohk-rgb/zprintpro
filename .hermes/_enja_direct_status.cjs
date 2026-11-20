// .hermes/_enja_direct_status.cjs — 5 包装 SKU 的 en/ja body 现状
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const marks = [...t.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map(m => ({ s: m[1], o: m.index }));
const SKUS = ['rigid-boxes', 'cosmetic-boxes', 'mailer-boxes', 'white-card-bags', 'kraft-paper-bags'];
for (const s of SKUS) {
  const i = marks.findIndex(x => x.s === s);
  const seg = t.slice(marks[i].o, marks[i + 1] ? marks[i + 1].o : t.length);
  // en/ja 子对象里的 body
  const enBody = seg.match(/"en":\s*\{[\s\S]*?"body":\s*"((?:[^"\\]|\\.)*)"/);
  const jaBody = seg.match(/"ja":\s*\{[\s\S]*?"body":\s*"((?:[^"\\]|\\.)*)"/);
  console.log(`=== ${s}`);
  console.log('  en:', enBody ? JSON.stringify(enBody[1].slice(0, 110)) : '(no en body)');
  console.log('  ja:', jaBody ? JSON.stringify(jaBody[1].slice(0, 110)) : '(no ja body)');
}
