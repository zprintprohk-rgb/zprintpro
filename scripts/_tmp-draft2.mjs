const fs = await import('node:fs');
const { skuSeoData } = await import('../src/data/sku-seo-data.ts');
const { products } = await import('../src/data/products.ts');
const audit = JSON.parse(fs.readFileSync(new URL('../.hermes/reports/sku-quality-audit-2026-09-21.json', import.meta.url), 'utf8'));
const truth = {};
for (const p of products) truth[p.slug] = { minQ: p.minQuantity, bp: p.basePrice, bpe: p.basePrice_en, bpj: p.basePrice_ja, unit: p.unitLabel, cat: p.category_slug };
const t1 = audit.slots.filter((s) => s.tier === 'T1_REWRITE').sort((a, b) => (b.gsc?.imps || 0) - (a.gsc?.imps || 0)).slice(30, 80);
const out = t1.map((s) => {
  const e = skuSeoData[s.slug];
  const seo = e.seo?.[s.locale] || {};
  const t = truth[s.slug] || {};
  return {
    slug: s.slug, locale: s.locale, imps: s.gsc?.imps ?? 0, pos: s.gsc?.pos ?? null,
    name: e.name?.[s.locale], minQ: t.minQ, bp: t.bp, bpe: t.bpe, bpj: t.bpj,
    title: seo.title, h1: seo.h1, desc: seo.description,
    kws: (seo.keywords || []).slice(0, 12),
    issues: s.issues.map((i) => `${i.field}:${i.kind}`),
  };
});
fs.writeFileSync(new URL('../.hermes/_draft-31-80.json', import.meta.url), JSON.stringify(out, null, 2));
console.log('slots:', out.length);
for (const o of out) console.log(`${o.slug} | ${o.locale} | imps=${o.imps} pos=${o.pos} | minQ=${o.minQ} bp=${o.bp}/${o.bpe}/${o.bpj} | ${o.name} | ${o.issues.join(',')}`);
