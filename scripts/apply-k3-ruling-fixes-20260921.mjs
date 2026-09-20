/**
 * apply-k3-ruling-fixes-20260921.mjs — K3 2026-09-21 00:03 裁决落地批（事实错误级）
 *
 * 裁决来源: docs/2026-09-20-handover-living-book.md §9 `2026-09-21 00:03` 段
 *   #4 drink-tokens 只能是港币 | #5 装帧词按真值 | #6 ja 英文混入 | #7 a4-flyers 语义错位
 *   #2 打稿 1 小时为统一值 (body 层)
 *
 * 真值依据 (products.ts): drink-tokens basePrice=0.25/minQ=50; exercise-books finishing=騎馬釘;
 *   spiral-notebooks finishing=YO圈或螺旋裝訂; custom-red-packets minQ=100; hardcover-menus minQ=10
 * 全部 title 改动过 scripts/guards/title-equiv.js band() 断言 (50–57, 58 阻断)。
 *
 * 用法: node scripts/apply-k3-ruling-fixes-20260921.mjs           # dry-run (默认)
 *       node scripts/apply-k3-ruling-fixes-20260921.mjs --apply
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { equiv, band } = require('./guards/title-equiv.js');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TS = path.join(ROOT, 'src', 'data', 'sku-seo-data.ts');
const APPLY = process.argv.includes('--apply');

const TITLE_FIXES = [
  // [slug, locale, old, new, 依据]
  ['drink-tokens', 'zh-hk',
    '酒水牌印刷 PVC防水 50張起 NT$6起 圓角模切 | 智印港',
    '酒水牌印刷 PVC防水 50張起 HK$0.25起 圓角模切 | 智印港',
    '#4 只能是港币 (basePrice=0.25)'],
  ['exercise-books', 'zh-hk',
    '作業簿印刷 | 四色印刷 膠裝 | 10本起 HK$4起 | 智印港',
    '作業簿印刷 | 四色印刷 騎馬釘 | 10本起 HK$4起 | 智印港',
    '#5 真值 finishing=騎馬釘裝訂'],
  ['exercise-books', 'en',
    'Exercise Books | Perfect Bound | Free US Ship | ZprintPro',
    'Saddle-Stitched Exercise Books | Free US Ship | ZprintPro',
    '#5 真值 finishing=騎馬釘裝訂'],
  ['spiral-notebooks', 'zh-hk',
    '線圈筆記本 | A4/A5 膠裝/騎馬釘 | 10本起 HK$8起 | 智印港',
    '線圈筆記本 | A4/A5 YO圈/螺旋裝 | 10本起 HK$8起 | 智印港',
    '#5 真值 finishing=YO圈或螺旋裝訂'],
  ['spiral-notebooks', 'en',
    'Spiral Notebooks | Perfect Bound | $2.76 | ZprintPro',
    'A4/A5 Spiral Notebooks | Spiral Bound | $2.76 | ZprintPro',
    '#5 真值 finishing=YO圈或螺旋裝訂'],
  ['spiral-notebooks', 'ja',
    'スパイラルノート | 中綴じ/無線綴じ 10冊〜 | ZprintPro',
    'スパイラルノート | YO綴じ・スパイラル 10冊〜 | ZprintPro',
    '#5 真值 finishing=YO圈或螺旋裝訂'],
  ['custom-red-packets', 'ja',
    'custom red packets | 箔押し UV エンボス | ZprintPro',
    'オリジナル年賀状印刷 | 箔押し UV エンボス | ZprintPro',
    '#6 ja 英文混入 + minQ=100'],
  ['hardcover-menus', 'ja',
    'ハードカバー menu 印刷 | 上製本 箔押し 10冊〜 | ZprintPro',
    'ハードカバーメニュー | 上製本 箔押し 10冊〜 | ZprintPro',
    '#6 ja 英文混入'],
  ['a4-flyers', 'en',
    'A4 Flyers for Holiday Cards | Free US Ship | ZprintPro',
    'A4 Flyer Printing | 10 MOQ | Free US Ship | ZprintPro',
    '#7 语义错位修复'],
];

const BODY_FIXES = [
  // [old, new, 期望次数, 说明] —— K3 #2: 1 小时为统一值
  ['2 小時內提供免費數碼打稿', '1 小時內提供免費數碼打稿', 66, 'zh-hk body'],
  ['within 2 hours', 'within 1 hour', 58, 'en body'],
  ['2 時間以内', '1 時間以内', 58, 'ja body (含长短语前缀, 与上互斥不重叠计数)'],
];

let txt = fs.readFileSync(TS, 'utf8');
console.log(`[fix] 模式: ${APPLY ? 'APPLY' : 'DRY-RUN'}`);

/* ---- title 修复 ---- */
for (const [slug, loc, oldT, newT, why] of TITLE_FIXES) {
  const n = txt.split(oldT).length - 1;
  if (n !== 1) { console.error(`[fix] FAIL ${slug}[${loc}] 命中 ${n} 次 (期望 1)`); process.exit(2); }
  const bOld = band(oldT), bNew = band(newT);
  console.log(`[fix] ${slug}[${loc}] eq ${equiv(oldT)}(${bOld}) -> ${equiv(newT)}(${bNew}) | ${why}`);
  if (bNew !== 'OK') { console.error(`[fix] FAIL ${slug}[${loc}] 新标题越带: ${bNew}`); process.exit(3); }
  txt = txt.replace(oldT, newT);
}

/* ---- body 修复 ---- */
for (const [oldB, newB, expect, label] of BODY_FIXES) {
  const n = txt.split(oldB).length - 1;
  console.log(`[fix] body[${label}] 命中 ${n} (期望 ${expect})`);
  if (n !== expect) { console.error(`[fix] FAIL body[${label}] 计数不符, 拒绝盲改`); process.exit(4); }
  txt = txt.split(oldB).join(newB);
}

/* ---- 后断言: 旧值零残留 ---- */
for (const [slug, loc, oldT] of TITLE_FIXES) {
  if (txt.includes(oldT)) { console.error(`[fix] FAIL 旧 title 残留 ${slug}[${loc}]`); process.exit(5); }
}
for (const [oldB] of BODY_FIXES) {
  if (txt.includes(oldB)) { console.error(`[fix] FAIL 旧 body 文案残留: ${oldB}`); process.exit(5); }
}

if (!APPLY) { console.log('[fix] DRY-RUN 通过 (未写盘)'); process.exit(0); }
const bak = path.join(ROOT, '.hermes', `_bak-sku-seo-before-k3ruling-${Date.now()}.ts`);
fs.writeFileSync(bak, fs.readFileSync(TS, 'utf8'), 'utf8');
fs.writeFileSync(TS, txt, 'utf8');
console.log(`[fix] 已写入 (备份 ${path.relative(ROOT, bak)})`);
console.log('[fix] 后断言 PASS: 9 槽 title 全在带内, body 2h→1h 旧值零残留');
