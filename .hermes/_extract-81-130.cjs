// 抽取 T1 81-130 槽素材（复刻 _draft-31-80.json 流程）
const fs = require('fs');
const { skuSeoData } = require('../src/data/sku-seo-data.ts');
const { products } = require('../src/data/products.ts');
const truth = {};
for (const p of products) truth[p.slug] = p;
const a = JSON.parse(fs.readFileSync('.hermes/reports/sku-quality-audit-2026-09-21.json', 'utf8'));
const t1 = a.slots.filter((x) => x.tier === 'T1_REWRITE')
  .sort((m, n) => (n.gsc?.imps || 0) - (m.gsc?.imps || 0));
const slice = t1.slice(80, 130);
const out = slice.map((s) => {
  const d = skuSeoData[s.slug] || {};
  const t = truth[s.slug] || {};
  const seo = d.seo?.[s.locale] || {};
  return {
    slug: s.slug, locale: s.locale,
    imps: s.gsc?.imps || 0, pos: s.gsc?.pos ?? null,
    name: d.name?.[s.locale] || null,
    minQ: t.minQuantity ?? null,
    bp: t.basePrice ?? null, bpe: t.basePrice_en ?? null, bpj: t.basePrice_ja ?? null,
    title: seo.title ?? null,
    h1: seo.h1 ?? null,
    desc: seo.description ?? null,
    kws: seo.keywords || [],
    issues: (s.issues || []).map((i) => `${i.field}:${i.kind}${i.cur ? '=' + i.cur : ''}`),
  };
});
fs.writeFileSync('.hermes/_draft-81-130.json', JSON.stringify(out, null, 2));
console.log('slots 81-130:', out.length, 'imps range:', out[0].imps, '->', out[out.length - 1].imps);
for (const o of out) console.log(`${o.slug}|${o.locale} imps=${o.imps} minQ=${o.minQ} bp=${o.bp}/${o.bpe}/${o.bpj} :: ${(o.issues||[]).join(',')}`);
