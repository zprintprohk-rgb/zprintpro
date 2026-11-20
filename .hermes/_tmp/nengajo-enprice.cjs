const ts = require('fs').readFileSync('src/data/products.ts', 'utf8');
for (const slug of ['premium-greeting-cards', 'thick-greeting-cards-400g', 'foil-greeting-cards', 'spot-uv-greeting-cards', 'matte-greeting-cards', 'rounded-corner-greeting-cards']) {
  const i = ts.indexOf("slug: '" + slug + "'");
  const blk = ts.slice(i, i + 3000);
  const g = (re) => { const m = blk.match(re); return m ? m[1] : null; };
  console.log(slug, 'HKD', g(/basePrice:\s*([\d.]+)/), '| USD', g(/basePrice_en:\s*([\d.]+)/), '| JPY', g(/basePrice_ja:\s*([\d.]+)/), '| MOQ', g(/minQuantity:\s*(\d+)/));
}
