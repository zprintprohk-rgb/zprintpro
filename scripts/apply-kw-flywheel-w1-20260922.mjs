/**
 * apply-kw-flywheel-w1-20260922.mjs — kw-flywheel 飞轮 W1 落地（title 5 槽 + AEO desc 20 槽）
 *
 * 数据源: DELIVERY/kw-flywheel/page_action_plan.csv (48 行施工图, 2026-09-22)
 * 冻结避让: title-window-freeze 23 slug 全避让; 批次1/R2/T1 验证窗槽全避让;
 *          same-day-flyers zh-hk (9/20 事实修复窗) 避让 → 本批仅 5 槽 title 全合法。
 * 真值: products.ts minQuantity/basePrice(_en/_ja); 价格钩与现行 title/页面锚点一致。
 * 闸门: exact-match + 计数断言 + 当量 50-57 + 自动备份 .hermes/_bak-kw-flywheel-w1-20260922/
 *
 * 用法: node scripts/apply-kw-flywheel-w1-20260922.mjs --check  (dry-run)
 *       node scripts/apply-kw-flywheel-w1-20260922.mjs --apply
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { equiv, band } = require('../scripts/guards/title-equiv.js');

const FILE = 'F:/zprintpro-nextjs/src/data/sku-seo-data.ts';
const BAK_DIR = 'F:/zprintpro-nextjs/.hermes/_bak-kw-flywheel-w1-20260922';
const APPLY = process.argv.includes('--apply');

// ── ops: title 重写 (5 槽) ──────────────────────────────────────────────
const TITLE_OPS = [
  // P0 plan row: 騎馬釘词群前置 (GSC 騎馬釘印刷 881imps pos31; 騎馬釘 1297 pos32-36)
  { slug: 'saddle-stitch-booklets', loc: 'zh-hk', field: 'title',
    oldS: '騎馬釘小冊子印刷 | 覆膜 騎馬釘 | 10本起印 HK$6起 | 智印港',
    newS: '騎馬釘書刊 小冊子印刷 覆膜 10本起印 HK$6起 | 智印港' },
  // P1 plan row: 訂製入 title (GSC 食品包裝訂製 1127imps pos19-21)
  { slug: 'food-boxes', loc: 'zh-hk', field: 'title',
    oldS: '食品包裝盒印刷 | 100個起 HK$2.5起 | 防油紙卡 | 智印港',
    newS: '食品包裝盒印刷 訂製 100個起 HK$2.5 防油紙卡 | 智印港' },
  // P0 plan row: 両面カラー×チラシ两翼 + 安い (GSC 両面カラー印刷 981imps pos28-30; チラシ印刷 早い)
  { slug: 'double-sided-flyers', loc: 'ja', field: 'title',
    oldS: '両面チラシ印刷 | フルカラー 10枚〜 | ¥85〜 | ZprintPro',
    newS: '両面チラシ印刷 フルカラー 安い 10枚〜 ¥85〜 | ZprintPro' },
  // P0 plan row: 小ロット+防油 词群 (GSC 食品パッケージ 44imps pos56 重建)
  { slug: 'food-boxes', loc: 'ja', field: 'title',
    oldS: '食品包装箱 印刷 | 100個〜 小ロット | ¥101〜 | ZprintPro',
    newS: '食品包装箱印刷 小ロット 防油 100個〜 ¥101〜 | ZprintPro' },
  // 事实修复: minQuantity=10 (products.ts) vs title 100枚〜 (批次1 同类修复漏网: exercise-books/a5-flyers/thick-paper-flyers 已修); 补真值价格钩 ¥258 (basePrice_ja)
  { slug: 'saddle-stitch-booklets', loc: 'ja', field: 'title',
    oldS: '中綴じ冊子 ラミネート・中綴じ・100枚〜 | ZprintPro',
    newS: '中綴じ冊子 ラミネート・中綴じ・10冊〜 ¥258〜 | ZprintPro' },
];

// ── ops: AEO desc 首句直答化 + artifact/MOQ 修复 (20 槽) ──────────────────
// 每槽 ops 按序执行; oldS 必须在该 slug/locale 的 description 串内出现恰好 1 次。
const DESC_OPS = [
  // ── zh-hk: 重复 artifact + MOQ 100→10 冲突修复 + 直答句 ──
  { slug: 'waterproof-stickers', loc: 'zh-hk', ops: [
    ['防水貼紙/防水貼紙 100 張起。', '防水貼紙印刷 10 張起印、HK$0.22 起/張，3-5 個工作天交貨，港九新界滿 HK$500 免費速遞。'],
  ]},
  { slug: 'foil-stickers', loc: 'zh-hk', ops: [
    ['燙金貼紙/燙金貼紙 100 張起。', '燙金貼紙印刷 10 個起印、HK$0.78 起/張，3-5 個工作天交貨，金/銀/玫瑰金多色可選。'],
  ]},
  { slug: 'die-cut-stickers', loc: 'zh-hk', ops: [
    ['異形模切貼紙/貼紙印刷 100 張起。', '異形模切貼紙 10 張起印、HK$0.58 起/張，3-5 個工作天交貨，任意形狀切割、免刀模費。'],
  ]},
  { slug: 'exercise-books', loc: 'zh-hk', ops: [
    ['作業簿印刷/作業簿 50 本起。', '作業簿印刷 10 本起印、HK$4 起/本，5-10 個工作天交貨，四色印刷騎馬釘裝訂。'],
  ]},
  { slug: 'certificates', loc: 'zh-hk', ops: [
    ['證書印刷/證書印刷 100 起。', '證書印刷 100 個起印、HK$8 起/個，3-5 個工作天交貨，燙金/壓紋/局部UV 工藝可選。'],
  ]},
  { slug: 'business-envelopes', loc: 'zh-hk', ops: [
    ['公司信封/公司信封 100 個起。', '公司信封印刷 100 個起印、HK$0.22 起/個，3-5 個工作天交貨，DL/C5/C4 開窗全封可選。'],
  ]},
  { slug: 'adhesive-banners', loc: 'zh-hk', ops: [
    ['背膠噴繪/噴繪 1 個起。', '背膠噴繪 1 件起印、HK$10 起/件，1-3 個工作天交貨，透明/PP/PVC 防水材質可選。'],
  ]},
  { slug: 'doujinshi-printing', loc: 'zh-hk', ops: [
    ['同人誌 / Comiket / 即售會專用同人誌印刷。', '同人誌印刷 10 本起印，Comiket 會期前 24 小時特急對應，DHL 直送日本 2-4 個工作天。'],
    ['特急対応', '特急對應'],
    ['自営工場', '自營工場'],
  ]},
  // ── ja: 重複 artifact (XのXは) + MOQ 冲突 + 直答句 ──
  { slug: 'waterproof-stickers', loc: 'ja', ops: [
    ['防水ステッカーの防水ステッカーは ZprintPro にお任せ。', '防水ステッカー 10枚〜 ¥41〜、3-5営業日で全国配送。'],
    ['100枚〜、3-5営業日で全国配送。30秒無料見積もり', '10枚〜、3-5営業日で全国配送。30秒無料見積もり'],
  ]},
  { slug: 'pvc-menus', loc: 'ja', ops: [
    ['PVC menuのPVC menuは ZprintPro にお任せ。', 'PVCメニュー 10枚〜 ¥386〜、5-7営業日で全国配送。'],
  ]},
  { slug: 'saddle-stitch-booklets', loc: 'ja', ops: [
    ['中綴じ冊子の中綴じ冊子は ZprintPro にお任せ。', '中綴じ冊子 10冊〜 ¥258〜、5-10営業日で全国配送。'],
    ['50冊〜、5-10営業日で全国配送。30秒無料見積もり', '10冊〜、5-10営業日で全国配送。30秒無料見積もり'],
  ]},
  { slug: 'eco-paper-bags', loc: 'ja', ops: [
    ['エコ紙袋のエコ紙袋は ZprintPro にお任せ。', 'エコ紙袋 100枚〜 ¥240〜、5-7営業日で全国配送。'],
  ]},
  { slug: 'double-sided-flyers', loc: 'ja', ops: [
    ['両面カラー印刷 両面チラシは ZprintPro にお任せ。', '両面チラシ印刷 10枚〜 ¥85〜、翌日-2営業日で全国配送。'],
  ]},
  { slug: 'textbooks', loc: 'ja', ops: [
    ['教科書印刷は ZprintPro にお任せ。', '教科書印刷 100冊〜 ¥1288〜、5-7営業日、DHL で日本へ 2-4 日配送。'],
  ]},
  { slug: 'catalog-printing', loc: 'ja', ops: [
    ['カタログ印刷は ZprintPro にお任せ。', 'カタログ印刷 10冊〜 ¥644〜、3-5営業日、DHL で日本へ 2-4 日配送。'],
  ]},
  // ── en: 模板残缺 (from ZprintPro the US / $100 运费错误 / MOQ 冲突) + 直答句 ──
  { slug: 'exercise-books', loc: 'en', ops: [
    ['Custom exercise books from ZprintPro the US. Perfect Bound, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express | Free Design | 100 MOQ',
     'Custom exercise books from $1.84/book, 10 MOQ, saddle-stitched 4-color printing. 5-10 business days plus free US shipping over $99. Free 1-hour digital proof, DHL 2-4 day delivery.'],
  ]},
  { slug: 'business-envelopes', loc: 'en', ops: [
    ['Custom business envelopes from ZprintPro the US. Foil-Lined Premium, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express | Free Design | 100 MOQ',
     'Custom business envelopes DL/C5/C4 from $0.14/pc, 100 MOQ, window or full-cover options. 3-5 business days plus free US shipping over $99. Free 1-hour digital proof, DHL 2-4 day delivery.'],
  ]},
  { slug: 'textbooks', loc: 'en', ops: [
    ['Custom textbooks from ZprintPro the US. Perfect Bound, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express | Free Design | 100 MOQ',
     'Custom textbook printing from $9.20/book, 100 MOQ, perfect bound or saddle stitch. 5-7 business days plus free US shipping over $99. Free 1-hour digital proof, DHL 2-4 day delivery.'],
  ]},
  { slug: 'a5-flyers', loc: 'en', ops: [
    ['Custom a5 flyers from ZprintPro the US. Same-Day Printing, 4-color CMYK. 100-MOQ. Free US shipping over $100, DHL Express | Free Design | 100 MOQ',
     'A5 flyer printing from $0.40/pc, 10 MOQ, same-day rush available, 4-color CMYK both sides. Free US shipping over $99. Free 1-hour digital proof.'],
  ]},
  { slug: 'pvc-menus', loc: 'en', ops: [
    ['Custom pvc menus from ZprintPro the US. Laminated Durable, 4-color CMYK. 10-MOQ. Free US shipping over $100, DHL Express | Free Design | 10 MOQ',
     'PVC menus from $2.76/pc, 10 MOQ, laminated waterproof for restaurants and bars. 5-7 business days plus free US shipping over $99. Free 1-hour digital proof.'],
  ]},
];

// ── 执行器 ─────────────────────────────────────────────────────────────
let src = fs.readFileSync(FILE, 'utf8');
const orig = src;
const errors = [];
const report = [];

function slugBlock(s, slug) {
  const i = s.indexOf(`"${slug}": {`);
  if (i < 0) return null;
  const rest = s.slice(i);
  const nm = rest.slice(10).match(/\n  "[a-z0-9-]+": \{/);
  return { start: i, end: nm ? i + 10 + nm.index : s.length };
}

function applyTitleOp(s, op) {
  const b = slugBlock(s, op.slug);
  if (!b) { errors.push(`slug MISSING: ${op.slug}`); return s; }
  let block = s.slice(b.start, b.end);
  const fieldRe = new RegExp(`("${op.loc}":\\s*\\{[\\s\\S]*?"${op.field}":\\s*")((?:[^"\\\\]|\\\\.)*)(")`);
  const m = block.match(fieldRe);
  if (!m) { errors.push(`field MISSING: ${op.slug}/${op.loc}/${op.field}`); return s; }
  const cur = JSON.parse(`"${m[2]}"`);
  if (cur !== op.oldS) { errors.push(`OLD MISMATCH ${op.slug}/${op.loc}/${op.field}:\n  file: ${cur}\n  want: ${op.oldS}`); return s; }
  const eq = equiv(op.newS); const bd = band(op.newS);
  if (bd !== 'OK') { errors.push(`EQ FAIL ${op.slug}/${op.loc}: ${eq} ${bd} | ${op.newS}`); return s; }
  block = block.slice(0, m.index) + m[1] + JSON.stringify(op.newS).slice(1, -1) + m[3] + block.slice(m.index + m[0].length);
  report.push(`TITLE ${op.slug}/${op.loc}: ${eq} OK | ${op.newS}`);
  return s.slice(0, b.start) + block + s.slice(b.end);
}

function applyDescOp(s, op) {
  const b = slugBlock(s, op.slug);
  if (!b) { errors.push(`slug MISSING: ${op.slug}`); return s; }
  let block = s.slice(b.start, b.end);
  const fieldRe = new RegExp(`("${op.loc}":\\s*\\{[\\s\\S]*?"description":\\s*")((?:[^"\\\\]|\\\\.)*)(")`);
  const m = block.match(fieldRe);
  if (!m) { errors.push(`desc MISSING: ${op.slug}/${op.loc}`); return s; }
  let cur = JSON.parse(`"${m[2]}"`);
  for (const [oldS, newS] of op.ops) {
    const cnt = cur.split(oldS).length - 1;
    if (cnt !== 1) { errors.push(`DESC OLD x${cnt} (want 1) ${op.slug}/${op.loc}: ${oldS.slice(0, 40)}...`); return s; }
    cur = cur.replace(oldS, newS);
  }
  block = block.slice(0, m.index) + m[1] + JSON.stringify(cur).slice(1, -1) + m[3] + block.slice(m.index + m[0].length);
  report.push(`DESC  ${op.slug}/${op.loc}: ${op.ops.length} op(s) | ${cur.slice(0, 60)}...`);
  return s.slice(0, b.start) + block + s.slice(b.end);
}

for (const op of TITLE_OPS) src = applyTitleOp(src, op);
for (const op of DESC_OPS) src = applyDescOp(src, op);

console.log('══════ 报告 ══════');
report.forEach(r => console.log(r));
console.log(`\nTITLE ops: ${TITLE_OPS.length} · DESC slots: ${DESC_OPS.length}`);

if (errors.length) {
  console.error('\n══════ 错误 (未写盘) ══════');
  errors.forEach(e => console.error(e));
  process.exit(2);
}

if (!APPLY) {
  console.log('\n[dry-run] 0 错误。--apply 写盘。');
  process.exit(0);
}

fs.mkdirSync(BAK_DIR, { recursive: true });
fs.writeFileSync(path.join(BAK_DIR, 'sku-seo-data.ts.bak'), orig, 'utf8');
fs.writeFileSync(FILE, src, 'utf8');
console.log(`\n[apply] 已写盘 + 备份: ${BAK_DIR}/sku-seo-data.ts.bak`);
