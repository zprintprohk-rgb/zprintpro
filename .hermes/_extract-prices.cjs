// 精确提取目标 slug 的 minQuantity + 三币种 basePrice（全块扫描）
const fs = require('fs');
const src = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');
const SLUGS = ['waterproof-stickers','foil-stickers','die-cut-stickers','exercise-books','certificates','business-envelopes','adhesive-banners','pvc-menus','textbooks','a5-flyers','saddle-stitch-booklets','eco-paper-bags','double-sided-flyers','catalog-printing','doujinshi-printing','food-boxes','a2-posters','same-day-flyers','small-batch-stickers','kraft-paper-packaging-box','premium-greeting-cards','foil-greeting-cards','thick-greeting-cards-400g'];
const out = {};
for (const slug of SLUGS) {
  const i = src.indexOf(`slug: '${slug}'`);
  if (i < 0) { out[slug] = null; continue; }
  // 块结束 = 下一个 "\n    slug: " 或数组尾
  const rest = src.slice(i + 1);
  const nm = rest.match(/\n    slug: '/);
  const block = nm ? rest.slice(0, nm.index) : rest.slice(0, 12000);
  const g = (re) => { const m = block.match(re); return m ? m[1] : null; };
  out[slug] = {
    minQ: g(/minQuantity:\s*(\d+)/),
    hk: g(/basePrice:\s*([\d.]+)/),
    en: g(/basePrice_en:\s*([\d.]+)/),
    ja: g(/basePrice_ja:\s*([\d.]+)/),
    range: g(/price_range:\s*'([^']+)'/),
    cat: g(/category_slug:\s*'([^']+)'/),
  };
}
console.log(JSON.stringify(out, null, 1));
