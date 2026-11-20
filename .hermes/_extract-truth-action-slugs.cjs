// 一次性真值提取：动作清单 SKU 的 products.ts + UNIT_PRICE_ANCHORS 锚点
// 输出 .hermes/_truth-action-slugs.json
const fs = require('fs');
const path = require('path');

const ROOT = 'F:\\zprintpro-nextjs';
const src = fs.readFileSync(path.join(ROOT, 'src/data/products.ts'), 'utf8');

const SLUGS = ['a2-posters','same-day-flyers','saddle-stitch-booklets','pvc-menus','food-boxes','catalog-printing','waterproof-stickers','foil-stickers','small-batch-stickers','die-cut-stickers','certificates','doujinshi-printing','textbooks','exercise-books','business-envelopes','a5-flyers','eco-paper-bags','kraft-paper-packaging-box','premium-greeting-cards','adhesive-banners','double-sided-flyers','outdoor-vinyl-banners','roll-up-banners','kraft-paper-bags','foil-greeting-cards','thick-greeting-cards-400g'];

const out = {};
for (const slug of SLUGS) {
  const i = src.indexOf(`slug: '${slug}'`);
  if (i < 0) { out[slug] = { error: 'MISSING' }; continue; }
  const block = src.slice(i, i + 4000);
  const grab = (re) => { const m = block.match(re); return m ? m[1] : null; };
  out[slug] = {
    minQuantity: grab(/minQuantity:\s*(\d+)/) ? +grab(/minQuantity:\s*(\d+)/) : null,
    basePrice: grab(/basePrice:\s*([\d.]+)/) ? +grab(/basePrice:\s*([\d.]+)/) : null,
    basePrice_en: grab(/basePrice_en:\s*([\d.]+)/) ? +grab(/basePrice_en:\s*([\d.]+)/) : null,
    basePrice_ja: grab(/basePrice_ja:\s*([\d.]+)/) ? +grab(/basePrice_ja:\s*([\d.]+)/) : null,
    price_range: grab(/price_range:\s*'([^']+)'/),
    category: grab(/category_slug:\s*'([^']+)'/),
    name: grab(/name:\s*'([^']+)'/),
    nameEn: grab(/nameEn:\s*'([^']+)'/),
    nameJa: grab(/nameJa:\s*'([^']+)'/),
  };
}

// UNIT_PRICE_ANCHORS（页面展示价 SSoT）
let anchors = null;
try {
  const afiles = ['src/data/unit-price-anchors.ts','src/lib/unit-price-anchors.ts','src/data/price-anchors.ts'];
  for (const f of afiles) {
    const p = path.join(ROOT, f);
    if (fs.existsSync(p)) { anchors = { file: f, found: [] }; break; }
  }
} catch (e) { anchors = { error: String(e) }; }
out.__anchors_probe = anchors;

fs.writeFileSync(path.join(ROOT, '.hermes/_truth-action-slugs.json'), JSON.stringify(out, null, 2), 'utf8');
console.log(JSON.stringify(out, null, 2));
