// 生成 ja imageAlt 修复映射的**依据摆盘**: 列出 25 条确证折行 SKU 的真值来源 (nameJa / nameEn / category)
// 只读。用来人工核对「即将写入的日文名是否来自 products.ts 真值」, 不允许凭空翻译。
const fs = require('node:fs');
const src = fs.readFileSync('src/data/products.ts', 'utf8');

// 按 slug 切段 (与 scripts/verify-menus.cjs 同法)
const idx = [...src.matchAll(/^ {4}slug: '([a-z0-9-]+)',$/gm)].map((m) => ({ s: m[1], i: m.index }));
idx.push({ s: '__END__', i: src.length });
const truth = {};
for (let k = 0; k < idx.length - 1; k++) {
  const seg = src.slice(idx[k].i, idx[k + 1].i);
  truth[idx[k].s] = {
    name: (seg.match(/name: '((?:[^'\\]|\\.)*)'/) || [])[1],
    nameJa: (seg.match(/nameJa: '((?:[^'\\]|\\.)*)'/) || [])[1],
    nameEn: (seg.match(/nameEn: '((?:[^'\\]|\\.)*)'/) || [])[1],
    unit: (seg.match(/unitLabel: '([^']*)'/) || [])[1],
    mq: (seg.match(/minQuantity: (\d+)/) || [])[1],
    cat: (seg.match(/category_slug: '([a-z0-9-]+)'/) || [])[1],
  };
}

const CONFIRMED = ['transparent-stickers', 'small-batch-stickers', 'die-cut-stickers', 'fluorescent-stickers',
  'gift-bags', 'large-bags', 'folded-leaflets', 'eco-flyers', 'food-boxes', 'folding-boxes', 'rigid-boxes',
  'custom-red-packets', 'cartoon-red-packets', 'eco-red-packets', 'large-red-packets',
  'custom-calendars', 'mini-calendars', 'photo-frame-calendars', 'magnetic-calendars',
  'adhesive-banners', 'mesh-banners', 'perfect-bound-books', 'hardcover-books', 'colored-envelopes',
  'electronics-packaging-box'];
const REVIEW = ['eco-paper-bags', 'small-bags', 'a1-posters', 'display-posters'];

console.log('═══ 🔴 确证折行 25 条: 真值来源 (products.ts) ═══');
let miss = 0;
for (const s of CONFIRMED) {
  const t = truth[s];
  if (!t) { console.log(`  ❌ [${s}] products.ts 无此 slug —— 不得凭想象写日文名`); miss++; continue; }
  console.log(`  [${s}] cat=${t.cat} mq=${t.mq}${t.unit || ''}`);
  console.log(`      name  = ${t.name || '(无)'}`);
  console.log(`      nameJa= ${t.nameJa || '❌缺失'}`);
  if (!t.nameJa) miss++;
}
console.log(`\n═══ 🟡 需人读 4 条 ═══`);
for (const s of REVIEW) {
  const t = truth[s] || {};
  console.log(`  [${s}] nameJa=${t.nameJa || '❌缺失'}  unit=${t.unit || '-'}`);
}
console.log(`\n结论: nameJa 缺失/无源 = ${miss} 个 ⇒ 这些条目**不得**擅自写日文名, 应回源头或升级。`);
