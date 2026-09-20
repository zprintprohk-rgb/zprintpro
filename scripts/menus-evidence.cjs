// menus 簇实证片段清单 —— 供候选标题取用 (只读)
// 原则: 候选只能由 products.ts 的实证字段构成, 不得编造 (K3 真值 10/10/10/10/100
// + unitLabel 張/份/本/份/份 已由数据层落地)
const fs = require('node:fs');
const { equiv } = require('./guards/title-equiv.js');

const src = fs.readFileSync('src/data/products.ts', 'utf8');
const a = [...src.matchAll(/^ {4}slug: '([a-z0-9-]+)',$/gm)].map((m) => ({ s: m[1], i: m.index }));
a.push({ s: '__END__', i: src.length });

const TARGETS = ['pvc-menus', 'laminated-menus', 'hardcover-menus', 'drink-menus', 'disposable-menus', 'wedding-menu-cards'];

for (let k = 0; k < a.length - 1; k++) {
  if (!TARGETS.includes(a[k].s)) continue;
  const seg = src.slice(a[k].i, a[k + 1].i);
  const g = (re) => (seg.match(re) || [])[1];
  console.log(`\n═══ ${a[k].s} ═══`);
  console.log(`  minQuantity = ${g(/minQuantity: (\d+)/)}   unitLabel = ${g(/unitLabel: '([^']*)'/) ?? '(无)'}`);
  console.log(`  price_range = ${g(/price_range: '([^']*)'/) ?? '-'}   basePrice = ${g(/basePrice: ([\d.]+)/)}`);
  console.log(`  basePrice_en = ${g(/basePrice_en: ([\d.]+)/) ?? '-'}   basePrice_ja = ${g(/basePrice_ja: ([\d.]+)/) ?? '-'}`);
  const specs = seg.match(/specs: \{([\s\S]*?)\n {4}\}/);
  if (specs) for (const line of specs[1].split('\n')) {
    const t = line.trim(); if (t) console.log(`  spec  ${t}`);
  }
  const feat = seg.match(/features: \[([\s\S]*?)\n {4}\]/);
  if (feat) {
    console.log('  features:');
    for (const line of feat[1].split('\n')) {
      const m = line.match(/'([^']+)'/);
      if (m) console.log(`    · ${m[1]}`);
    }
  }
  const nm = g(/name: '([^']*)'/);
  if (nm) console.log(`  name(zh-hk) = ${nm}`);
}

// 顺带: 当前 3 语 title 的当量与缺口 (只读)
const seo = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const b = [...seo.matchAll(/^(?: {2})"([a-z0-9-]+)": \{/gm)].map((m) => ({ s: m[1], i: m.index }));
b.push({ s: '__X__', i: seo.length });
console.log('\n\n═══ 当前标题缺口 (需达 50-57) ═══');
for (let k = 0; k < b.length - 1; k++) {
  if (!TARGETS.includes(b[k].s)) continue;
  const seg = seo.slice(b[k].i, b[k + 1].i);
  for (const l of ['zh-hk', 'en', 'ja']) {
    const m = seg.match(new RegExp(`"${l}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
    if (!m) continue;
    const e = equiv(m[1]);
    const gap = e > 57 ? `需删 ${e - 57}` : e < 50 ? `需补 ${50 - e}` : '达标';
    console.log(`  ${b[k].s}/${l}: ${e} 当量 → ${gap}`);
  }
}
