// .hermes/_remaining_truths.cjs — 未达标 SKU 的真值可用性
const fs = require('fs');
const prod = fs.readFileSync('src/data/products.ts', 'utf8');
const pm = [...prod.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].map(m => ({ s: m[1], o: m.index }));
const truth = {};
pm.forEach((x, i) => {
  const seg = prod.slice(x.o, pm[i + 1] ? pm[i + 1].o : prod.length);
  const mq = seg.match(/minQuantity: (\d+)/), pr = seg.match(/price_range: '([^']+)'/);
  truth[x.s] = { minQ: mq && +mq[1], range: pr && pr[1] };
});
const seo = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const marks = [...seo.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map(m => ({ s: m[1], o: m.index }));
const out = [];
marks.forEach((mk, i) => {
  const seg = seo.slice(mk.o, marks[i + 1] ? marks[i + 1].o : seo.length);
  const bm = seg.match(/"body":\s*"((?:[^"\\]|\\.)*)"/);
  const body = bm ? bm[1] : '';
  const first = body.split('\\n\\n')[0] || '';
  const ok = /\d{1,5}\s*(?:個|張|枚|本|冊)\s*起/.test(first) && /HK\$/.test(first);
  if (ok) return;
  const t = truth[mk.s] || {};
  const perUnit = t.range && /^HK\$[\d.]+-[\d.,]+\/(個|張|本|枚|冊)$/.test(t.range);
  out.push({ slug: mk.s, minQ: t.minQ, range: t.range, perUnit, first: first.slice(0, 40) });
});
console.log('missing', out.length, '| per-unit usable:', out.filter(x => x.perUnit && x.minQ).length);
out.filter(x => x.perUnit && x.minQ).slice(0, 30).forEach(x => console.log(`  ${x.slug}: ${x.minQ}起 ${x.range}`));
