// moq10-check-greeting-card-pricing.mjs — 核查賀卡 price_range 語意 (HK$100-180/100張 是否 per-100)
import fs from 'fs';

const src = fs.readFileSync('src/data/products.ts', 'utf-8');
const slugs = [
  'premium-greeting-cards', 'thick-greeting-cards-400g', 'foil-greeting-cards',
  'spot-uv-greeting-cards', 'matte-greeting-cards', 'rounded-corner-greeting-cards',
  'foil-stickers', 'transparent-stickers', 'removable-stickers', 'security-stickers',
  'a4-flyers', 'a5-flyers', 'double-sided-flyers', 'school-flyers', 'thick-paper-flyers',
];

const anchors = [...src.matchAll(/\n\s+slug: '([^']+)'/g)].map((m) => ({ slug: m[1], at: m.index }));

for (const s of slugs) {
  const idx = anchors.findIndex((a) => a.slug === s);
  if (idx < 0) { console.log(`${s}: NOT FOUND`); continue; }
  const end = idx + 1 < anchors.length ? anchors[idx + 1].at : src.length;
  const blk = src.slice(anchors[idx].at, end);
  const g = (k) => {
    const mm = blk.match(new RegExp(`${k}:\\s*([^,\\n]+)`));
    return mm ? mm[1].trim() : '?';
  };
  const pr = g('price_range');
  const unit = pr.split('/')[1] || '';
  const per = unit.replace(/[^\d]/g, '');
  console.log(
    `${s.padEnd(28)} basePrice=${g('basePrice').padEnd(8)} price_range=${pr.padEnd(24)}` +
    ` 分母=${(per || '1').padEnd(5)} 單位=${unit}`
  );
}
