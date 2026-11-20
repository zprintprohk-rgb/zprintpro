// .hermes/_lead_claims.cjs — 3 SKU 现有交期声称
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const marks = [...t.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map(m => ({ s: m[1], o: m.index }));
for (const s of ['mailer-boxes', 'white-card-bags', 'kraft-paper-bags']) {
  const i = marks.findIndex(x => x.s === s);
  const seg = t.slice(marks[i].o, marks[i + 1] ? marks[i + 1].o : t.length);
  const leads = [...new Set([...seg.matchAll(/(\d+(?:-\d+)?)\s*(?:個工作天|個工作日|天)(?:交貨|生產|出貨|送達)?/g)].map(m => m[0]))];
  const prices = [...new Set([...seg.matchAll(/HK\$[\d.]+(?:-[\d.]+)?(?:\/個)?/g)].map(m => m[0]))];
  console.log(`${s}: leads=${JSON.stringify(leads.slice(0, 5))}`);
  console.log(`   prices=${JSON.stringify(prices.slice(0, 6))}`);
}
