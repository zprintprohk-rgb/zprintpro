const { execSync } = require('child_process');
const fs = require('fs');
// 1. products.ts truth for a4-flyers
const t = fs.readFileSync('src/data/products.ts', 'utf8');
const starts = [...t.matchAll(/(?:^|[^_\w])slug: '([a-z0-9-]+)',/gm)].map((m) => ({ slug: m[1], idx: m.index }));
starts.push({ slug: '__END__', idx: t.length });
for (let i = 0; i < starts.length - 1; i++) {
  if (starts[i].slug !== 'a4-flyers') continue;
  const b = t.slice(starts[i].idx, starts[i + 1].idx);
  const g = (re) => { const m = b.match(re); return m ? m[1] : null; };
  console.log('products.ts a4-flyers:');
  console.log('  minQuantity =', g(/\bminQuantity:\s*(\d+)/));
  console.log('  basePrice(zh-hk) =', g(/\bbasePrice:\s*([\d.]+)/));
  console.log('  basePrice_en =', g(/\bbasePrice_en:\s*([\d.]+)/));
  console.log('  basePrice_ja =', g(/\bbasePrice_ja:\s*([\d.]+)/));
}
// 2. guard findings for a4-flyers zh-hk in latest audit
try {
  const a = JSON.parse(fs.readFileSync('.hermes/logs/sku-title-v5-audit-2026-09-22.json', 'utf8'));
  for (const f of a.findings) {
    if (f.slug === 'a4-flyers') {
      console.log(`\n门童 #27 a4-flyers|${f.locale}: equiv=${f.equiv} hard=[${f.hard.map(h=>h.rule).join(',')}] warn=[${f.warn.map(w=>w.rule).join(',')}]`);
    }
  }
} catch (e) { console.log('audit read err', e.message); }
// 3. git history of the zh-hk title
console.log('\ngit log -L for a4-flyers zh-hk title:');
try {
  const out = execSync('git log --oneline -8 -- src/data/sku-seo-data.ts', { encoding: 'utf8' });
  console.log(out.split('\n').slice(0, 8).join('\n'));
} catch (e) { console.log('err', e.message); }
