const fs = require('fs');
const txt = fs.readFileSync('F:/zprintpro-nextjs/src/data/sku-seo-data.ts', 'utf8');
const starts = [...txt.matchAll(/^(?: {2})?"([a-z0-9-]+)": \{/gm)].map((m) => ({ slug: m[1], idx: m.index }));
starts.push({ slug: '__END__', idx: txt.length });
const want = {
  'small-batch-stickers': ['en'], 'kraft-paper-packaging-box': ['ja'], 'perfect-bound-books': ['ja'],
  'catalog-printing': ['ja'], 'custom-red-packets': ['ja', 'zh-hk'], 'laminated-menus': ['zh-hk'],
  'eco-tote-bag': ['zh-hk'], 'premium-greeting-cards': ['en'], 'thick-paper-flyers': ['en'],
  'outdoor-vinyl-banners': ['en'], 'exercise-books': ['en'], 'textbooks': ['en'], 'pvc-menus': ['en'],
  'doujinshi-printing': ['en', 'ja'], 'a5-flyers': ['en'], 'transparent-stickers': ['en'], 'fluorescent-stickers': ['en'],
};
for (let i = 0; i < starts.length - 1; i++) {
  const seg = txt.slice(starts[i].idx, starts[i + 1].idx);
  if (!seg.includes('"seo"')) continue;
  const slug = starts[i].slug;
  if (!want[slug]) continue;
  for (const loc of want[slug]) {
    const m = seg.match(new RegExp(`"${loc}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
    if (m) console.log(`${slug}|${loc}: ${m[1]}`);
  }
}
// truth for remaining candidates
const ptxt = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');
const slugIdx = [...ptxt.matchAll(/(?:^|[^_\w])slug: '([a-z0-9-]+)',/g)];
for (let i = 0; i < slugIdx.length; i++) {
  const slug = slugIdx[i][1];
  if (!['thick-paper-flyers', 'outdoor-vinyl-banners', 'laminated-menus', 'eco-tote-bag', 'premium-greeting-cards', 'perfect-bound-books', 'catalog-printing', 'kraft-paper-packaging-box', 'small-batch-stickers', 'white-card-boxes'].includes(slug)) continue;
  const start = slugIdx[i].index;
  const end = i + 1 < slugIdx.length ? slugIdx[i + 1].index : ptxt.length;
  const block = ptxt.slice(start, Math.min(end, start + 4000));
  const grab = (k) => { const m = block.match(new RegExp(`\\b${k}:\\s*'((?:[^'\\\\]|\\\\.)*)'`)); return m ? m[1] : undefined; };
  const grabNum = (k) => { const m = block.match(new RegExp(`\\b${k}:\\s*(\\d+(?:\\.\\d+)?)`)); return m ? Number(m[1]) : undefined; };
  console.log(`TRUTH ${slug}: minQ=${grabNum('minQuantity')} bp=${grabNum('basePrice')} bpe=${grabNum('basePrice_en')} bpj=${grabNum('basePrice_ja')} unit=${grab('unitLabel')} range=${grab('price_range')}`);
}
