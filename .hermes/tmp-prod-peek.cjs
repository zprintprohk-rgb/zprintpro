const fs = require('fs');
const t = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');
for (const slug of ['large-envelopes', 'fluorescent-stickers']) {
  const i = t.indexOf(`slug: '${slug}'`);
  if (i < 0) { console.log(slug, 'NOT FOUND'); continue; }
  const block = t.slice(i, i + 2600);
  const pick = (re) => { const m = block.match(re); return m ? m[1] : '(none)'; };
  console.log(`=== ${slug} ===`);
  console.log('title_zh:', pick(/title_zh:\s*'([^']*)'/));
  console.log('price_range:', pick(/price_range:\s*'([^']*)'/));
  console.log('basePrice:', pick(/basePrice:\s*([\d.]+)/));
  console.log('basePrice_en:', pick(/basePrice_en:\s*([\d.]+)/));
  console.log('minQuantity:', pick(/minQuantity:\s*([\d.]+)/));
  const sm = block.match(/specs:\s*\{([\s\S]*?)\}/);
  if (sm) console.log('specs:', sm[1].replace(/\s+/g, ' ').slice(0, 400));
  console.log('');
}
