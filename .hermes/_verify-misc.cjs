const fs = require('fs');
// 1. T1 proposal for double-sided-flyers ja
for (const f of ['title-quality-proposals-20260921.json', 'title-quality-proposals-20260921-b31-80.json', 'title-quality-proposals-20260921-b81-130.json', 'title-quality-proposals-20260921-b131-213.json']) {
  const p = JSON.parse(fs.readFileSync('F:/zprintpro-nextjs/.hermes/' + f, 'utf8'));
  for (const pr of p.proposals || []) {
    if (pr.slug === 'double-sided-flyers' || pr.slug === 'kraft-paper-packaging-box' || pr.slug === 'small-batch-stickers' || pr.slug === 'graduation-yearbook' || pr.slug === 'roll-up-banners') {
      console.log(`[${f}] ${pr.slug}|${pr.locale} title=${JSON.stringify(pr.title)} note=${pr.note || ''}`);
    }
  }
}
// 2. graduation-yearbook + roll-up-banners truth
const ptxt = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');
const slugIdx = [...ptxt.matchAll(/(?:^|[^_\w])slug: '([a-z0-9-]+)',/g)];
for (let i = 0; i < slugIdx.length; i++) {
  const slug = slugIdx[i][1];
  if (!['graduation-yearbook', 'roll-up-banners', 'small-batch-stickers'].includes(slug)) continue;
  const start = slugIdx[i].index;
  const end = i + 1 < slugIdx.length ? slugIdx[i + 1].index : ptxt.length;
  const block = ptxt.slice(start, Math.min(end, start + 4000));
  const grab = (k) => { const m = block.match(new RegExp(`\\b${k}:\\s*'((?:[^'\\\\]|\\\\.)*)'`)); return m ? m[1] : undefined; };
  const grabNum = (k) => { const m = block.match(new RegExp(`\\b${k}:\\s*(\\d+(?:\\.\\d+)?)`)); return m ? Number(m[1]) : undefined; };
  console.log('TRUTH', slug, JSON.stringify({ minQ: grabNum('minQuantity'), unit: grab('unitLabel'), bpe: grabNum('basePrice_en'), bpj: grabNum('basePrice_ja'), price_range: grab('price_range') }));
}
// 3. small-batch-stickers en desc from sku-seo-data
const stxt = fs.readFileSync('F:/zprintpro-nextjs/src/data/sku-seo-data.ts', 'utf8');
const si = stxt.indexOf('"small-batch-stickers"');
if (si > 0) {
  const seg = stxt.slice(si, si + 8000);
  const m = seg.match(/"en": \{\s*"title": "((?:[^"\\]|\\.)*)"[\s\S]{0,1200}?"description": "((?:[^"\\]|\\.)*)"/);
  if (m) console.log('SB en title:', m[1], '\nSB en desc:', m[2].slice(0, 400));
  else console.log('SB en regex miss; seg head:', seg.slice(0, 400));
}
// 4. roll-up-banners ja desc unit
const ri = stxt.indexOf('"roll-up-banners"');
if (ri > 0) {
  const seg = stxt.slice(ri, ri + 8000);
  const m = seg.match(/"ja": \{\s*"title": "((?:[^"\\]|\\.)*)"[\s\S]{0,1200}?"description": "((?:[^"\\]|\\.)*)"/);
  if (m) console.log('RU ja title:', m[1], '\nRU ja desc:', m[2].slice(0, 300));
}
