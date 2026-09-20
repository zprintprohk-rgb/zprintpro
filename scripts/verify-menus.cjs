// menus 簇收尾核实: products.ts 真值(minQuantity/unitLabel) vs sku-seo-data.ts 标题现状
const fs = require('node:fs');
const { equiv, TITLE_MIN, TITLE_MAX } = require('./guards/title-equiv.js');

const src = fs.readFileSync('src/data/products.ts', 'utf8');
const a = [...src.matchAll(/^ {4}slug: '([a-z0-9-]+)',$/gm)].map((m) => ({ s: m[1], i: m.index }));
a.push({ s: '__END__', i: src.length });

console.log('=== products.ts 真值 ===');
const truth = {};
for (let k = 0; k < a.length - 1; k++) {
  if (!/menu/i.test(a[k].s)) continue;
  const seg = src.slice(a[k].i, a[k + 1].i);
  const mq = (seg.match(/minQuantity: (\d+)/) || [])[1];
  const ul = (seg.match(/unitLabel: '([^']*)'/) || [])[1];
  truth[a[k].s] = { mq, ul };
  console.log(`  ${a[k].s.padEnd(20)} minQuantity=${String(mq).padEnd(5)} unitLabel=${ul ?? '(无)'}`);
}

const seo = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const b = [...seo.matchAll(/^(?: {2})"([a-z0-9-]+)": \{/gm)].map((m) => ({ s: m[1], i: m.index }));
b.push({ s: '__X__', i: seo.length });

console.log('\n=== sku-seo-data.ts 标题现状 (menus) ===');
for (let k = 0; k < b.length - 1; k++) {
  if (!/menu/i.test(b[k].s)) continue;
  const seg = seo.slice(b[k].i, b[k + 1].i);
  console.log(`\n[${b[k].s}]  真值 minQuantity=${truth[b[k].s]?.mq ?? '?'} unitLabel=${truth[b[k].s]?.ul ?? '(无)'}`);
  for (const l of ['zh-hk', 'en', 'ja']) {
    const re = new RegExp(`"${l}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`);
    const m = seg.match(re);
    if (!m) { console.log(`   ${l.padEnd(6)} (无 title 槽)`); continue; }
    const t = m[1];
    const e = equiv(t);
    const claimed = (t.match(/(\d+)\s*(張|张|份|本|個|个|枚)\s*起/) || [])[0] || '—';
    const band = e > TITLE_MAX ? `🔴超${TITLE_MAX}` : e < TITLE_MIN ? `🟠不足${TITLE_MIN}` : '✅';
    console.log(`   ${l.padEnd(6)} ${String(e).padStart(3)} 当量 ${band}  声称=${claimed}`);
    console.log(`          ${t}`);
  }
}
