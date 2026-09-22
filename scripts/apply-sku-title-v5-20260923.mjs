#!/usr/bin/env node
/**
 * apply-sku-title-v5-20260923.mjs — SKU 标题 v5 长尾补源修复 (K3 2026-09-23 指令)
 *
 * 规则: docs/zprintpro-sku-title-rule-v5-2026-09-23.md (五段式 + 长尾 L0>L1>L2>L3 + 当量 50-57)
 * 文件: src/data/sku-seo-data.ts (唯一目标, 92 SKU × 3 locale title 字段)
 *
 * 修复类型:
 *  P0 正确性: ja custom-red-packets 错写年賀状→ポチ袋; ja perfect-bound 中綴じ错配→無線綴じ;
 *             ja doujinshi 10枚→10冊+去最安; ja kraft-box 300枚→300個+去最安値;
 *             ja catalog 10枚→10冊; zh custom-red-packets 定制→訂製 (GSC 訂製族实证)
 *  P1 长尾补源: zh sticker×6 + flyer×4 加 L1 长尾 (可移貼紙/戶外貼紙/貼紙訂製/貼紙印刷/標籤貼紙/
 *             宣傳單張印刷/摺頁傳單/摺頁印刷/即日急件/PVC貼紙); en 11 槽补工艺/数字/去空洞
 *  P2 同簇去重: en a5-flyers 去跨品类 Holiday Cards; en 模板同质化 (Free US Ship/Free Shipping)
 *
 * 冻结豁免: certificates / foil-stickers (TITLE_WINDOW_FROZEN) 不动;
 *          greeting-cards 名片标题 (thick/foil-greeting-cards) 属 §0.0 未拍板区, 不动 (上报)
 *
 * 用法: node scripts/apply-sku-title-v5-20260923.mjs [--apply]
 * 断言: 每条 old 精确匹配恰好 1 次; --apply 前先写备份到 .hermes/_bak-sku-title-v5-20260923/
 */
import fs from 'fs';
import path from 'path';

const APPLY = process.argv.includes('--apply');
const FILE = 'src/data/sku-seo-data.ts';

// 当量计算: 全角 CJK/假名/全角符号 ×2, 半角 ×1 (与 scripts/guards/title-equiv.js 口径一致)
function eq(t) {
  let n = 0;
  for (const ch of t) n += /[\u2E80-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF\u3040-\u30FF]/.test(ch) ? 2 : 1;
  return n;
}

// 修复表: [slug, locale, oldTitle, newTitle]
const FIXES = [
  // ── zh-hk: sticker 簇长尾补源 (L1 GSC hk_28d 实证) ──
  ['waterproof-stickers', 'zh-hk',
    '防水貼紙 | 防水 PVC 異形切割 | 10個起 HK$0.22起 | 智印港',
    '防水貼紙 可移貼紙 戶外抗UV 10個起 HK$0.22起 | 智印港'],
  ['transparent-stickers', 'zh-hk',
    '透明貼紙 | 防水 PVC 異形切割 | 10個起 HK$0.38起 | 智印港',
    '透明貼紙 PVC貼紙 防水 異形切割 10個起 HK$0.38起 | 智印港'],
  ['removable-stickers', 'zh-hk',
    '可移貼紙 | 防水 PVC 異形切割 | 10個起 HK$0.45起 | 智印港',
    '可移貼紙 戶外貼紙 無殘膠 10個起 HK$0.45起 | 智印港'],
  ['die-cut-stickers', 'zh-hk',
    '異形模切貼紙 透明・模切・10起印・HK$0.58起 | 智印港',
    '異形模切貼紙 貼紙訂製 防水圓角 10起印 HK$0.58起 | 智印港'],
  ['security-stickers', 'zh-hk',
    '防偽貼紙 | 防水 PVC 異形切割 | 10個起 HK$1.15起 | 智印港',
    '防偽貼紙 標籤貼紙 防水圓角 10個起 HK$1.15起 | 智印港'],
  ['fluorescent-stickers', 'zh-hk',
    '螢光貼紙 | 防水 PVC 異形切割 | 10個起 HK$0.52起 | 智印港',
    '螢光貼紙 貼紙印刷 防水圓角 10個起 HK$0.52起 | 智印港'],
  // ── zh-hk: flyer 簇长尾补源 ──
  ['a4-flyers', 'zh-hk',
    'A4 傳單印刷 圓角・覆膜・10起印・HK$0.35起 | 智印港',
    'A4 傳單印刷 宣傳單張 圓角覆膜 10起印 HK$0.35起 | 智印港'],
  ['double-sided-flyers', 'zh-hk',
    '雙面傳單印刷 | 單張印刷 | 10張起印 HK$0.40起 | 智印港',
    '雙面傳單印刷 摺頁傳單 四色 10張起印 HK$0.40起 | 智印港'],
  ['folded-leaflets', 'zh-hk',
    '摺頁單張 | A4/A5 雙面四色 | 10張起 HK$0.7起 | 智印港',
    '摺頁單張 摺頁印刷 雙面四色 10張起 HK$0.7起 | 智印港'],
  ['same-day-flyers', 'zh-hk',
    '即日印刷 傳單 10張起 HK$1.30起 圓角・覆膜 | 智印港',
    '即日印刷 傳單 即日急件 覆膜 10張起 HK$1.30起 | 智印港'],
  // ── zh-hk: 定制→訂製 (GSC 訂製利是封 33imp / 利是封訂製 30imp) ──
  ['custom-red-packets', 'zh-hk',
    '定制利是封印刷 | 燙金 UV 壓紋 | 100個起 HK$1.9起 | 智印港',
    '訂製利是封印刷 | 燙金 UV 壓紋 | 100個起 HK$1.9起 | 智印港'],
  // ── en: 补工艺/数字, 去 Free US Ship / Free Shipping 模板空洞 ──
  ['transparent-stickers', 'en',
    'Custom Transparent Stickers | Free US Ship | ZprintPro',
    'Transparent Stickers | Die-Cut PVC | 10 MOQ | ZprintPro'],
  ['die-cut-stickers', 'en',
    'Custom Die-Cut Stickers | Free Shipping $99+ | ZprintPro',
    'Die-Cut Stickers | Custom Shapes | 10 MOQ | ZprintPro'],
  ['security-stickers', 'en',
    'Custom Security Stickers | Free Shipping $99+ | ZprintPro',
    'Security Stickers | Tamper-Proof | 10 MOQ | ZprintPro'],
  ['fluorescent-stickers', 'en',
    'Custom Fluorescent Stickers | Free US Ship | ZprintPro',
    'Fluorescent Stickers | Custom Print | 10 MOQ | ZprintPro'],
  ['small-batch-stickers', 'en',
    'Small Batch Stickers 50 pcs from $0.045 | ZprintPro',
    'Small Batch Custom Stickers 50pcs from $0.045 | ZprintPro'],
  ['kraft-paper-bags', 'en',
    'Custom Kraft Paper Bags | Free Shipping $99+ | ZprintPro',
    'Kraft Paper Bags | Eco-Friendly | 100 MOQ | ZprintPro'],
  ['a5-flyers', 'en',
    'A5 Flyers for Holiday Cards | Free US Ship | ZprintPro',
    'A5 Flyers | Full Color | 10 MOQ | Free Ship | ZprintPro'],
  ['exercise-books', 'en',
    'Saddle-Stitched Exercise Books | Free US Ship | ZprintPro',
    'Exercise Books | Saddle-Stitched | 10 MOQ | ZprintPro'],
  ['textbooks', 'en',
    'Textbooks | Perfect Bound | Free US Ship | ZprintPro',
    'Textbook Printing | Perfect Bound | 100 MOQ | ZprintPro'],
  ['magnetic-calendars', 'en',
    'Magnetic Calendars | Free Shipping $99+ | ZprintPro',
    'Magnetic Calendars | Custom | 1 MOQ $0.40 | ZprintPro'],
  ['pvc-menus', 'en',
    'PVC Menus | Laminated Durable | Free US Ship | ZprintPro',
    'PVC Menus | Laminated Durable | 10 MOQ | ZprintPro'],
  ['doujinshi-printing', 'en',
    'Doujinshi Printing Comiket | Free US Ship | ZprintPro',
    'Doujinshi Printing Comiket | 10 MOQ | USA | ZprintPro'],
  // ── ja: 正确性 + 计数单位 + 去空洞 ──
  ['doujinshi-printing', 'ja',
    '同人誌印刷 コミケ対応印刷 10枚〜・最安 | ZprintPro',
    '同人誌印刷 コミケ対応 10冊〜 小ロット 短納期 | ZprintPro'],
  ['custom-red-packets', 'ja',
    'オリジナル年賀状印刷 | 箔押し UV エンボス | ZprintPro',
    'オリジナルポチ袋印刷 | 箔押し UV エンボス | ZprintPro'],
  ['perfect-bound-books', 'ja',
    '無線綴じ本｜中綴じ ラミネート｜10冊〜 ¥644〜｜ZprintPro',
    '無線綴じ本 小ロット ラミネート 10冊〜 ¥644〜 | ZprintPro'],
  ['kraft-paper-packaging-box', 'ja',
    'クラフト紙包装箱 エコ・300枚〜・最安値 | ZprintPro',
    'クラフト紙包装箱 特注 エコ 300個〜 ¥240〜 | ZprintPro'],
  ['catalog-printing', 'ja',
    'カタログ印刷｜箔押し ラミネート｜10枚〜¥644〜｜ZprintPro',
    'カタログ印刷 箔押し ラミネート 10冊〜 ¥644〜 | ZprintPro'],
];

// ── 断言: old 精确匹配恰 1 次; band 50-57 ──
let src = fs.readFileSync(FILE, 'utf8');
const errors = [];
for (const [slug, loc, oldT, newT] of FIXES) {
  const n = src.split(oldT).length - 1;
  if (n !== 1) errors.push(`count=${n} (期望 1): ${slug}|${loc}: ${oldT.slice(0, 40)}`);
  const b = eq(newT);
  if (b < 50 || b > 57) errors.push(`band=${b} 越带: ${slug}|${loc}: ${newT}`);
}
if (errors.length) {
  console.log('❌ 断言失败:');
  errors.forEach(e => console.log('  ' + e));
  process.exit(1);
}
console.log(`✅ 断言全过: ${FIXES.length} 条修复, old 均唯一命中, 新标题当量均 50-57`);

// 当量体检 3 行 (改前/改后)
console.log('\n── 当量体检 (改前→改后) ──');
for (const [slug, loc, oldT, newT] of FIXES) {
  const before = eq(oldT), after = eq(newT);
  const flag = (before < 50 || before > 57) ? '改前越带' : (after < 50 || after > 57) ? '改后越带' : 'OK';
  if (before !== after) console.log(`  ${slug}|${loc}: ${before} → ${after} [${flag}]`);
}

if (!APPLY) {
  console.log('\n(dry-run 模式, 未写文件)');
  process.exit(0);
}

// ── 备份 + 应用 ──
const bakDir = '.hermes/_bak-sku-title-v5-20260923';
fs.mkdirSync(bakDir, { recursive: true });
fs.writeFileSync(path.join(bakDir, 'sku-seo-data.ts'), src, 'utf8');
for (const [slug, loc, oldT, newT] of FIXES) {
  const n = src.split(oldT).length - 1;
  if (n !== 1) { console.error(`应用失败: ${slug}|${loc} 匹配 ${n} 次`); process.exit(1); }
  src = src.replace(oldT, newT);
}
fs.writeFileSync(FILE, src, 'utf8');
console.log(`\n✅ 已应用 ${FIXES.length} 条修复 → ${FILE} (备份: ${bakDir}/)`);
