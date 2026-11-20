// .hermes/_direct_coverage.cjs — 全站 SKU body 首段直答覆盖率
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const marks = [...t.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map(m => ({ s: m[1], o: m.index }));
const rows = [];
for (let i = 0; i < marks.length; i++) {
  const seg = t.slice(marks[i].o, marks[i + 1] ? marks[i + 1].o : t.length);
  const bm = seg.match(/"body":\s*"((?:[^"\\]|\\.)*)"/);
  const body = bm ? bm[1] : '';
  const first = body.split(/\\n\\n/)[0] || '';
  const hasMoq = /\d{1,5}\s*(?:個|張|枚|本|冊)\s*起/.test(first);
  const hasPrice = /HK\$\s*[\d.]+/.test(first);
  rows.push({ slug: marks[i].s, len: body.length, ok: hasMoq && hasPrice, moq: hasMoq, price: hasPrice, head: first.slice(0, 50) });
}
const ok = rows.filter(r => r.ok);
console.log(`total=${rows.length} 直答达标=${ok.length} (${(ok.length / rows.length * 100).toFixed(0)}%)`);
const miss = rows.filter(r => !r.ok);
console.log('missing:', miss.length);
miss.slice(0, 18).forEach(r => console.log(`  ${r.slug} (moq=${r.moq} price=${r.price}) head=${JSON.stringify(r.head)}`));
