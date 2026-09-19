'use strict';
/**
 * Etsy 篇注册 BlogPostMeta (入 blog-posts.ts)
 * 依据: 文件内 2026-09-18 注释先例 —— 未注册 ⇒ getBlogPostMetaBySlug 返 undefined
 *       ⇒ 线上 <title>/<h1> 退化成 slug 本身且无 meta description (门童 #20 规则 E 检测)
 * 语言口径: K3 裁决 en 单语正文; title/excerpt 因接口要求为 Record<Locale>, 三语齐备(zh-hk/ja 为对应表述)
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const F = path.join(REPO, 'src', 'data', 'blog-posts.ts');
const BAK = path.join(REPO, '.hermes', '_probe-pb', '_blog-posts.ts.bak-etsy');

const DECL_ANCHOR = `export const blogPosts: BlogPostMeta[] = [`;
const ARRAY_ANCHOR = `  lpWeddingTableCard,`;

const BLOCK = `const lpEtsySellerPrintingGuide: BlogPostMeta = {
  slug: 'etsy-seller-printing-guide',
  categoryKey: 'printing',
  source: 'daily',
  date: '2026-09-19',
  title: {
    'zh-hk': "Etsy 賣家印刷指南：10 件起印、免費打樣 | 智印港",
    en: "Etsy Printing: 10-Piece Min, Free Proof | ZprintPro",
    ja: "Etsy セラー向け印刷ガイド：10枚から・無料校正 | ZprintPro",
  },
  excerpt: {
    'zh-hk': "Etsy 賣家最關心起訂量同補貨速度。呢篇講清楚 10 件起印（100 件起單價明顯下降）、免費數碼打樣、DHL 2-4 日補貨，以及 FDA 21 CFR 175.105 同 EU REACH 合規文件點樣取得。",
    en: "Etsy sellers print from 10 pieces with no 500-piece minimum, get a free digital proof, DHL 2-4 day restock and FDA plus REACH files on request. Quote in 30s.",
    ja: "Etsy セラー向けに、10 枚からの少部数印刷、無料デジタル校正、DHL 2-4 日の補充、FDA 21 CFR 175.105 と EU REACH のコンプライアンス書類の取得方法をまとめました。",
  },
  targetKeywords: {
    primary: 'etsy seller printing',
    secondary: [
      'printing for etsy sellers', 'etsy product labels', 'small batch printing etsy',
      'etsy packaging printing', 'etsy seller supplies', 'low minimum print run',
      'etsy seller printing', 'Etsy 賣家印刷', 'Etsy 印刷',
    ],
  },
};

`;

function main() {
  const before = fs.readFileSync(F, 'utf8');

  // 计数断言
  const nDecl = before.split(DECL_ANCHOR).length - 1;
  const nArr = before.split(ARRAY_ANCHOR).length - 1;
  if (nDecl !== 1) { console.error(`❌ 计数断言失败: 声明锚点出现 ${nDecl} 次 -> 不写盘`); process.exit(1); }
  if (nArr !== 1) { console.error(`❌ 计数断言失败: 数组锚点出现 ${nArr} 次 -> 不写盘`); process.exit(1); }
  if (before.includes('etsy-seller-printing-guide') || before.includes('lpEtsySellerPrintingGuide')) {
    console.error('❌ 已注册 (幂等保护) -> 不写盘'); process.exit(1);
  }
  console.log('  计数断言 OK: 两锚点各 1 次, 且未重复注册');

  fs.writeFileSync(BAK, before, 'utf8');
  console.log('  备份 OK');

  // ① 插入 const 声明 (在 blogPosts 声明之前)
  let out = before.replace(DECL_ANCHOR, BLOCK + DECL_ANCHOR);
  // ② 数组内注册 (跟在 last daily 条目后)
  out = out.replace(ARRAY_ANCHOR, ARRAY_ANCHOR + `\n  // 2026-09-19 K3 终裁: Etsy 卖家印刷指南 (en 单语正文) — 注册以免 <title>/<h1> 退化为 slug (门童 #20 规则 E)\n  lpEtsySellerPrintingGuide,`);

  // 形状断言
  const checks = [
    ['const 声明已插入', out.includes('const lpEtsySellerPrintingGuide: BlogPostMeta = {')],
    ['数组已注册', /lpWeddingTableCard,\n[\s\S]{0,200}lpEtsySellerPrintingGuide,/.test(out)],
    ['slug 正确', out.includes("slug: 'etsy-seller-printing-guide'")],
    ['三语 title 齐备', /title: \{\s*\n\s*'zh-hk':[\s\S]{0,200}en:[\s\S]{0,200}ja:/.test(out)],
    ['三语 excerpt 齐备', (out.match(/excerpt: \{/g) || []).length === before.match(/excerpt: \{/g).length + 1],
    ['行数增加 = 块行数 + 2', out.split('\n').length - before.split('\n').length === (BLOCK.split('\n').length - 1) + 2],
  ];
  let bad = 0;
  for (const [label, ok] of checks) { if (!ok) { console.log(`  ❌ ${label}`); bad++; } }
  if (bad) { console.error(`❌ 形状断言失败 ${bad} 项 -> 不写盘`); process.exit(1); }
  console.log(`  形状断言 OK: ${checks.length} 项全过`);

  fs.writeFileSync(F, out, 'utf8');
  const back = fs.readFileSync(F, 'utf8');
  if (back !== out || back.charCodeAt(0) === 0xFEFF) {
    fs.writeFileSync(F, before, 'utf8');
    console.error('❌ 写盘校验失败 -> 已回滚'); process.exit(1);
  }
  console.log(`\n✅ Etsy 篇已注册: src/data/blog-posts.ts (+${back.split('\n').length - before.split('\n').length} 行)`);
  console.log(`   回滚: Copy-Item .hermes/_probe-pb/_blog-posts.ts.bak-etsy src/data/blog-posts.ts -Force`);
}

main();
