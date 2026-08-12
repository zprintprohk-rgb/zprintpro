// Search regression test (2026-06-08: 增加 typeahead 业务别名 + 简繁互通 验证)
import { searchAll, categories, products } from '../../products';

// === 1. 业务搜索: 关键 query 命中数 ===
// 验证:
//  - 简繁互通 (宣传/宣傳, 贴纸/貼紙)
//  - 业务别名 (名片/咭片/名刺, フライヤー/チラシ)
//  - 英文别名 (flyers, business card, sticker)
const businessQueries = [
  // 简体 → 繁体
  { q: '宣传单张', minP: 8, desc: '简体 → 繁體 flycat. 傳單印刷' },
  { q: '傳單印刷', minP: 8, desc: '繁體 (HK) direct match' },
  // 业务卡 跨地区别名
  { q: '名片', minP: 5, desc: 'CN 名片 → 咭片 alias' },
  { q: '咭片', minP: 5, desc: 'HK 咭片 direct' },
  { q: '名刺', minP: 5, desc: 'JP 名刺 → alias' },
  { q: 'business card', minP: 5, desc: 'EN business card' },
  // 贴纸
  { q: '贴纸', minP: 5, desc: 'CN 贴纸 → 貼紙' },
  { q: '貼紙', minP: 5, desc: 'HK 貼紙 direct' },
  { q: 'sticker', minP: 5, desc: 'EN sticker' },
  // 海报
  { q: '海报', minP: 2, desc: 'CN 海报 → 海報' },
  { q: '海報', minP: 2, desc: 'HK 海報' },
  { q: 'poster', minP: 2, desc: 'EN poster' },
  // 包装
  { q: '包装盒', minP: 2, desc: 'CN 包装盒 → 包裝盒' },
  { q: '包裝盒', minP: 2, desc: 'HK 包裝盒' },
  { q: 'packaging', minP: 2, desc: 'EN packaging' },
  // 纸袋
  { q: '纸袋', minP: 2, desc: 'CN 纸袋 → 紙袋' },
  { q: '紙袋', minP: 2, desc: 'HK 紙袋' },
  // 日语
  { q: 'チラシ', minP: 5, desc: 'JP チラシ' },
  { q: 'ステッカー', minP: 2, desc: 'JP ステッカー' },
];

let pass = 0, fail = 0;
const fails: string[] = [];

for (const t of businessQueries) {
  const r = searchAll(t.q, { productLimit: 30, categoryLimit: 5 });
  const ok = r.products.length >= t.minP;
  if (ok) {
    pass++;
    console.log(`  ✓ "${t.q}" → ${r.products.length}p + ${r.categories.length}c (${t.desc})`);
  } else {
    fail++;
    fails.push(`"${t.q}" → expected ≥${t.minP} products, got ${r.products.length} (${t.desc})`);
    console.log(`  ✗ "${t.q}" → ${r.products.length}p + ${r.categories.length}c (${t.desc}) — expected ≥${t.minP}`);
  }
}

// === 2. 分类搜索: typeahead dropdown 关键 ===
const catQueries = [
  { q: '宣传单张', expectedCat: 'flyers' },
  { q: '傳單印刷', expectedCat: 'flyers' },
  { q: '名片', expectedCat: 'business-cards' },
  { q: '咭片', expectedCat: 'business-cards' },
  { q: '名刺', expectedCat: 'business-cards' },
  { q: 'flyers', expectedCat: 'flyers' },
  { q: 'business card', expectedCat: 'business-cards' },
  { q: 'sticker', expectedCat: 'stickers' },
  { q: 'チラシ', expectedCat: 'flyers' },
];

console.log('\n=== Category match (typeahead dropdown 验证) ===');
for (const t of catQueries) {
  const r = searchAll(t.q, { productLimit: 30, categoryLimit: 5 });
  const catSlugs = r.categories.map((c) => c.slug);
  const ok = catSlugs.includes(t.expectedCat);
  if (ok) {
    pass++;
    console.log(`  ✓ "${t.q}" → categories: [${catSlugs.join(', ')}] (expected ${t.expectedCat})`);
  } else {
    fail++;
    fails.push(`"${t.q}" → expected category "${t.expectedCat}", got [${catSlugs.join(', ')}]`);
    console.log(`  ✗ "${t.q}" → categories: [${catSlugs.join(', ')}] — expected ${t.expectedCat}`);
  }
}

// === 3. 数据完整性: 所有产品都能被自身 SKU/name 搜到 ===
console.log('\n=== Data integrity (每个产品都能被自身名字搜到) ===');
let integPass = 0, integFail = 0;
for (const p of products.slice(0, 20)) { // 只测前 20 个, 避免太慢
  const r = searchAll(p.name, { productLimit: 100, categoryLimit: 0 });
  if (r.products.some((x) => x.sku_code === p.sku_code)) {
    integPass++;
  } else {
    integFail++;
    fails.push(`Integrity: "${p.name}" (${p.sku_code}) not found in self-search`);
  }
}
console.log(`  ${integPass}/${integPass + integFail} products find themselves`);
if (integFail === 0) pass += 20;
else fail += integFail;

// === 总结 ===
console.log('\n' + '='.repeat(50));
console.log(`Search regression: ${pass} pass / ${fail} fail`);
if (fail > 0) {
  console.log('\nFailures:');
  for (const f of fails) console.log(`  - ${f}`);
  process.exit(1);
}
console.log('All search tests PASSED ✓');
