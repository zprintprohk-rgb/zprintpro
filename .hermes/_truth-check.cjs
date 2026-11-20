const fs = require('fs');
const ptxt = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');
const slugIdx = [...ptxt.matchAll(/(?:^|[^_\w])slug: '([a-z0-9-]+)',/g)];
const prod = {};
for (let i = 0; i < slugIdx.length; i++) {
  const slug = slugIdx[i][1];
  const start = slugIdx[i].index;
  const end = i + 1 < slugIdx.length ? slugIdx[i + 1].index : ptxt.length;
  const block = ptxt.slice(start, Math.min(end, start + 4000));
  const grab = (k) => { const m = block.match(new RegExp(`\\b${k}:\\s*'((?:[^'\\\\]|\\\\.)*)'`)); return m ? m[1] : undefined; };
  const grabNum = (k) => { const m = block.match(new RegExp(`\\b${k}:\\s*(\\d+(?:\\.\\d+)?)`)); return m ? Number(m[1]) : undefined; };
  prod[slug] = {
    minQ: grabNum('minQuantity'), unit: grab('unitLabel'), bp: grabNum('basePrice'),
    bpe: grabNum('basePrice_en'), bpj: grabNum('basePrice_ja'),
    turnaround: grab('turnaround'), price_range: grab('price_range'),
  };
}
for (const s of ['a2-posters', 'a4-flyers', 'doujinshi-printing', 'kraft-paper-packaging-box', 'double-sided-flyers', 'exercise-books', 'pvc-menus', 'fluorescent-stickers', 'transparent-stickers', 'vehicle-wraps', 'roll-up-banners', 'textbooks', 'mini-calendars', 'custom-calendars', 'custom-red-packets', 'small-batch-stickers', 'food-boxes', 'foil-wedding-invitations', 'wedding-seating-charts', 'wedding-suite-bundle', 'white-card-boxes', 'corrugated-boxes', 'cosmetic-boxes', 'outdoor-posters', 'premium-greeting-cards', 'matte-greeting-cards', 'rounded-corner-greeting-cards', 'eco-red-packets', 'same-day-flyers', 'die-cut-stickers', 'adhesive-banners', 'drink-tokens', 'mini-calendars']) {
  console.log(s, JSON.stringify(prod[s] || 'NOT FOUND'));
}
