// .hermes/_pkg_truths.cjs — 包装簇 8 SKU 真值提取
const fs = require('fs');
const t = fs.readFileSync('src/data/products.ts', 'utf8');
for (const s of ['folding-boxes', 'mailer-boxes', 'rigid-boxes', 'cosmetic-boxes', 'white-card-bags', 'kraft-paper-bags', 'eco-paper-bags', 'gift-bags']) {
  const i = t.indexOf(`slug: '${s}'`);
  const seg = t.slice(i, i + 2800);
  const mq = (seg.match(/minQuantity: (\d+)/) || [])[1];
  const bp = (seg.match(/basePrice: ([\d.]+)/) || [])[1];
  const pr = (seg.match(/price_range: '([^']+)'/) || [])[1];
  const lead = (seg.match(/lead_time[^,]*'([^']+)'/) || [])[1];
  const title = (seg.match(/title_zh: '([^']{0,60})/) || [])[1];
  console.log(`${s} | minQ=${mq} base=${bp} range=${pr} lead=${lead || '-'} | ${title}`);
}
