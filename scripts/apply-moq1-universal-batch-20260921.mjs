/**
 * apply-moq1-universal-batch-20260921.mjs — K3 08:36 拍板「全部按 1 件起」落地批
 *
 * 范围（per K3 08:36 指令）:
 *   A. banners 引擎 minQ 100→1（5 SKU：outdoor-vinyl / roll-up / adhesive / vehicle-wraps / mesh）+ seo.ts 品类 meta 回改 1（引擎变 1 后原 1 声称恢复为真）
 *   B. 畢業紀念冊族 minQ 50→1（graduation-yearbook）+ 全部 copy 层 50→1（sku-seo-data 三语 / products-content / category-conversion-blocks / products.ts 描述）
 *
 * 不动（登记待 K3）:
 *   - 月曆族（calendars 1000 口径 vs 08:36「全部按1件起」拍板冲突 —— 升级中，冲突未裁决前不动 conversion-blocks 月曆族 50 本起 ×4）
 *   - wedding-invitations / place-cards minQ=50（K3 未点名，copy=data 一致）
 *   - educational 品类通用「10 MOQ」（exercise-books 引擎=10；若 K3 要教育品类也 1 件起需引擎层 exercise-books 10→1 一并改）
 *   - educational 价格表「練習簿 100 本起」vs exercise-books 引擎 10（疑似高估，登记）
 *
 * 纪律: 每规则 exact-string + 计数断言 + 幂等（已应用 c==0 即过）；同文件多规则串行重读防快照互覆（03:20 坑 #2）。
 * 用法: node scripts/apply-moq1-universal-batch-20260921.mjs [--apply]
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const APPLY = process.argv.includes('--apply');
const F = (p) => path.join(ROOT, p);

const results = [];
let pass = 0, fail = 0;

/** 串行执行: 每条规则前重读文件 */
function runRule(r) {
  const file = F(r.file);
  let txt = fs.readFileSync(file, 'utf8');
  const c = txt.split(r.from).length - 1;
  const applied = txt.split(r.to).length - 1;
  let status, note;
  if (c === 1) {
    if (APPLY) {
      fs.writeFileSync(file, txt.replace(r.from, r.to), 'utf8');
      status = 'APPLIED';
    } else status = 'WOULD-APPLY';
    pass++;
  } else if (c === 0 && applied >= 1) {
    status = 'IDEMPOTENT'; pass++;
  } else {
    status = 'FAIL'; fail++;
    note = `命中 ${c} 次（期望 1），已应用 ${applied} 次`;
  }
  results.push({ rule: r.id, file: r.file, status, note });
  if (status === 'FAIL') console.error(`🔴 ${r.id} ${r.file}: ${note}\n  from=${r.from.slice(0, 90)}`);
}

const rules = [
  // ===== A. banners 引擎 100→1（slug 锚定, 块内 minQuantity 唯一替换）=====
  ...['outdoor-vinyl-banners', 'roll-up-banners', 'adhesive-banners', 'vehicle-wraps', 'mesh-banners'].map((slug, i) => ({
    id: `A${i + 1}-banner-minq-${slug}`,
    file: 'src/data/products.ts',
    from: `slug: '${slug}',`,
    to: `slug: '${slug}',`,
    anchor: true, slug, mq: '100',
  })),
  // ===== B. 畢業紀念冊引擎 50→1 =====
  { id: 'B1-yearbook-minq', file: 'src/data/products.ts', from: "slug: 'graduation-yearbook',", to: "slug: 'graduation-yearbook',", anchor: true, slug: 'graduation-yearbook', mq: '50' },
];

// 锚定规则特殊处理: 从 slug 位置起找下一个 minQuantity: <mq>,
function runAnchorRule(r) {
  const file = F(r.file);
  const txt = fs.readFileSync(file, 'utf8');
  const si = txt.indexOf(`slug: '${r.slug}',`);
  if (si < 0) { results.push({ rule: r.id, file: r.file, status: 'FAIL', note: 'slug 未找到' }); fail++; return; }
  // 窗口 = 本 slug 到下一个 SKU slug（行首 4 空格缩进）之间；不能用裸 "slug: '" —— 会撞上 category_slug
  const nextSlug = txt.indexOf("\n    slug: '", si + 10);
  const seg = txt.slice(si, nextSlug > 0 ? nextSlug : si + 8000);
  const from = `minQuantity: ${r.mq},`;
  const to = 'minQuantity: 1,';
  const c = seg.split(from).length - 1;
  const applied = seg.split(to).length - 1;
  let status, note;
  if (c === 1) {
    if (APPLY) {
      const abs = si + seg.indexOf(from);
      fs.writeFileSync(file, txt.slice(0, abs) + to + txt.slice(abs + from.length), 'utf8');
      status = 'APPLIED';
    } else status = 'WOULD-APPLY';
    pass++;
  } else if (c === 0 && applied >= 1) { status = 'IDEMPOTENT'; pass++; }
  else { status = 'FAIL'; fail++; note = `块内命中 ${c} 次`; console.error(`🔴 ${r.id}: ${note}`); }
  results.push({ rule: r.id, file: r.file, status, note });
}

// 先跑锚定规则（从文件尾部往前避免行号漂移 —— anchor 用 indexOf 不受行号影响，顺序无关，但串行重读已保证）
for (const r of rules.filter((x) => x.anchor)) runAnchorRule(r);

// ===== 文案层规则（exact-string）=====
const copyRules = [
  // products.ts 畢業冊 en/ja 描述
  { id: 'B2-yearbook-desc-en', file: 'src/data/products.ts', from: 'Free design mockup, 50 MOQ, DHL Express global 2-4 day delivery from Asia factory.', to: 'Free design mockup, 1 MOQ, DHL Express global 2-4 day delivery from Asia factory.' },
  { id: 'B3-yearbook-desc-ja', file: 'src/data/products.ts', from: '無料デザインモックアップ、50冊〜、', to: '無料デザインモックアップ、1冊〜、' },
  // sku-seo-data 畢業冊族三语
  { id: 'B4-zh-title', file: 'src/data/sku-seo-data.ts', from: '騎馬釘 / 膠裝 / 精裝 50 本起 | 智印港', to: '騎馬釘 / 膠裝 / 精裝 1 本起 | 智印港' },
  { id: 'B5-zh-h1', file: 'src/data/sku-seo-data.ts', from: '香港畢業紀念冊 — 50 本起印 騎馬釘', to: '香港畢業紀念冊 — 1 本起印 騎馬釘' },
  { id: 'B6-zh-body', file: 'src/data/sku-seo-data.ts', from: '50 本起印，適合班級、年級或校友會規模的訂製', to: '1 本起印，適合班級、年級或校友會規模的訂製' },
  { id: 'B7-en-title', file: 'src/data/sku-seo-data.ts', from: 'Graduation Yearbook | 50 MOQ | Free US Ship | ZprintPro', to: 'Graduation Yearbook | 1 MOQ | Free US Ship | ZprintPro' },
  { id: 'B8-en-desc', file: 'src/data/sku-seo-data.ts', from: 'Graduation Yearbook, hardcover & softcover binding. Free Design, 50 MOQ, Free Shipping $99+', to: 'Graduation Yearbook, hardcover & softcover binding. Free Design, 1 MOQ, Free Shipping $99+' },
  { id: 'B9-en-h1', file: 'src/data/sku-seo-data.ts', from: 'Graduation Yearbook Printing — 50 MOQ · 3 Binding Options', to: 'Graduation Yearbook Printing — 1 MOQ · 3 Binding Options' },
  { id: 'B10-en-body', file: 'src/data/sku-seo-data.ts', from: 'with a 50-copy minimum.', to: 'with a 1-copy minimum.' },
  { id: 'B11-ja-title', file: 'src/data/sku-seo-data.ts', from: '卒業記念アルバム印刷 50冊〜 | 中綴じ/無線綴じ | ZprintPro', to: '卒業記念アルバム印刷 1冊〜 | 中綴じ/無線綴じ | ZprintPro' },
  { id: 'B12-ja-desc', file: 'src/data/sku-seo-data.ts', from: 'クラブ特刊印刷、50 冊から対応。', to: 'クラブ特刊印刷、1 冊から対応。' },
  { id: 'B13-ja-h1', file: 'src/data/sku-seo-data.ts', from: '卒業記念アルバム印刷 — 50 冊〜 · 3 種類の製本', to: '卒業記念アルバム印刷 — 1 冊〜 · 3 種類の製本' },
  { id: 'B14-ja-body', file: 'src/data/sku-seo-data.ts', from: '最小注文数は 50 冊から承ります。', to: '最小注文数は 1 冊から承ります。' },
  { id: 'B15-ja-faq', file: 'src/data/sku-seo-data.ts', from: 'A1: 最小注文は 50 冊からです。当社の多くの商品は 50〜100 冊/部/枚からの受注で、大量注文は段階割引がございます。お急ぎの少量注文は 10 枚からご相談ください。', to: 'A1: 最小注文は 1 冊からです。大量注文は段階割引がございます。' },
  { id: 'B16-zh-faq1', file: 'src/data/sku-seo-data.ts', from: '香港畢業紀念冊 50 本起印, 騎馬釘 / 膠裝 / 精裝三種裝訂可選', to: '香港畢業紀念冊 1 本起印, 騎馬釘 / 膠裝 / 精裝三種裝訂可選' },
  { id: 'B17-zh-faq2', file: 'src/data/sku-seo-data.ts', from: '校友會刊 / 社團特刊 50 本起印, 支持班級照片', to: '校友會刊 / 社團特刊 1 本起印, 支持班級照片' },
  // products-content 畢業冊
  { id: 'B18-pc-socialproof', file: 'src/data/products-content.ts', from: '提供印刷服務。50 本起印, 深圳自設廠房直送', to: '提供印刷服務。1 本起印, 深圳自設廠房直送' },
  { id: 'B19-pc-faq', file: 'src/data/products-content.ts', from: '畢業紀念冊 50 本起印, 騎馬釘 / 膠裝 100 本起印享階段折扣。', to: '畢業紀念冊 1 本起印, 100 本起印享階段折扣。' },
  // category-conversion-blocks educational
  { id: 'B20-cb-meta', file: 'src/data/category-conversion-blocks.ts', from: '畢業紀念冊 HK$45-180/本，騎馬釘膠裝精裝三種裝訂，50 本起訂。', to: '畢業紀念冊 HK$45-180/本，騎馬釘膠裝精裝三種裝訂，1 本起訂。' },
  { id: 'B21-cb-stat', file: 'src/data/category-conversion-blocks.ts', from: '"stat": "50本起",', to: '"stat": "1本起",' },
  { id: 'B22-cb-label', file: 'src/data/category-conversion-blocks.ts', from: '"label": "畢業紀念冊 50 本開班，班級同校友會都訂得逢"', to: '"label": "畢業紀念冊 1 本起印，班級同校友會都訂得逢"' },
  { id: 'B23-cb-pricetable', file: 'src/data/category-conversion-blocks.ts', from: '"中學大學畢業紀念冊、校史特刊、校友會刊",\n        "50 本起"', to: '"中學大學畢業紀念冊、校史特刊、校友會刊",\n        "1 本起"' },
  // seo.ts banners 回改 1（引擎 100→1 后原声称恢复为真）
  { id: 'A6-banner-title-zh', file: 'src/lib/seo.ts', from: "'zh-hk': '摺頁印刷 100個起 | 防水防UV + 易拉寶 + X架 | 智印港',", to: "'zh-hk': '摺頁印刷 1個起 | 防水防UV + 易拉寶 + X架 | 智印港'," },
  { id: 'A7-banner-title-en', file: 'src/lib/seo.ts', from: "'en': 'Outdoor Banner Printing from $12 | 100 MOQ + Waterproof UV | ZprintPro',", to: "'en': 'Outdoor Banner Printing from $12 | 1 MOQ + Waterproof UV | ZprintPro'," },
  { id: 'A8-banner-title-ja', file: 'src/lib/seo.ts', from: "'ja': '屋外バナー印刷｜100枚〜・防水UV・ロールアップ｜ZprintPro',", to: "'ja': '屋外バナー印刷｜1枚〜・防水UV・ロールアップ｜ZprintPro'," },
  { id: 'A9-banner-desc-zh', file: 'src/lib/seo.ts', from: "'zh-hk': '戶外橫額印刷 100 個起印，HK$30 起/個。", to: "'zh-hk': '戶外橫額印刷 1 個起印，HK$30 起/個。" },
  { id: 'A10-banner-desc-en', file: 'src/lib/seo.ts', from: "'en': 'Custom outdoor banner printing from $12, 100 MOQ.", to: "'en': 'Custom outdoor banner printing from $12, 1 MOQ." },
  { id: 'A11-banner-desc-ja', file: 'src/lib/seo.ts', from: "'ja': '屋外バナー印刷 100 枚から、¥1,500〜。", to: "'ja': '屋外バナー印刷 1 枚から、¥1,500〜。" },
];

for (const r of copyRules) runRule(r);

console.log(`\n📊 MOQ=1 批: ${pass} PASS / ${fail} FAIL${APPLY ? '（已寫入）' : '（dry-run, 加 --apply 寫入）'}`);
for (const r of results) if (r.status === 'FAIL') console.log(`  🔴 ${r.rule}: ${r.note || ''}`);
process.exit(fail > 0 ? 1 : 0);
