/**
 * apply-v5-title-batch2-20260923.mjs — v5 标题第二批（K3 d3f165fc 批遗漏补修，12 槽）
 *
 * 背景: K3 侧会话 02:42 已 commit d3f165fc（28 槽 v5 修复，unpushed）。本批 =
 *   K3 批遗漏的 5 ja + 6 en 无钩子/空洞词槽 + 1 ja 数据纠错（kraft ¥240→¥150，bpj 真值）。
 * 规则: docs/zprintpro-sku-title-rule-v5-2026-09-23.md（五段式 + 当量 50-57 + 长尾来源阶梯 + 数字钩子真值）
 * 安全: 断言旧串逐字命中 → 当量 50-57（title-equiv.js）→ 备份 → 回滚映射
 * 用法: node scripts/apply-v5-title-batch2-20260923.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { equiv, band, TITLE_MIN, TITLE_MAX } = require('./guards/title-equiv.js');

const ROOT = path.resolve(import.meta.dirname, '..');
const FILE = path.join(ROOT, 'src/data/sku-seo-data.ts');

const BATCH = [
  // ---- ja：无数字钩子（K3 批遗漏）----
  {
    slug: 'custom-red-packets', locale: 'ja',
    old: 'オリジナルポチ袋印刷 | 箔押し UV エンボス | ZprintPro',
    new: 'オリジナルポチ袋印刷 箔押し UV 100枚〜 ¥103〜 | ZprintPro',
    longTail: '(工艺位 箔押し UV)', src: 'L1(GSC オリジナル ポチ袋 1imp pos3, K3批主词已对齐)',
    hooks: '100枚〜←minQuantity=100; ¥103〜←basePrice_ja=103',
  },
  {
    slug: 'custom-calendars', locale: 'ja',
    old: 'カスタムカレンダー | ノベルティ 各種サイズ | ZprintPro',
    new: 'オリジナルカレンダー | 業務用 | 1冊〜 ¥50〜 | ZprintPro',
    longTail: '業務用', src: 'L2(ja 業務用 检索模板; G4主词对齐nameJa首段 オリジナルカレンダー)',
    hooks: '1冊〜←minQuantity=1(ja日历族=冊); ¥50〜←basePrice_ja=50',
  },
  {
    slug: 'mini-calendars', locale: 'ja',
    old: 'ミニカレンダー | ノベルティ 各種サイズ | ZprintPro',
    new: 'ミニカレンダー 2027 ノベルティ 1冊〜 ¥50〜 | ZprintPro',
    longTail: '2027 ノベルティ', src: 'L1(GSC ミニカレンダー 1imp pos1)+季节年号+意图词',
    hooks: '1冊〜←minQuantity=1; ¥50〜←basePrice_ja=50',
  },
  {
    slug: 'double-sided-flyers', locale: 'ja',
    old: '両面チラシ印刷 フルカラー 安い 10枚〜 ¥85〜 | ZprintPro',
    new: '両面チラシ印刷 | フルカラー 10枚〜 | ¥85〜 | ZprintPro',
    longTail: '(工艺位 フルカラー)', src: 'T1已审提案落盘(title-quality-proposals-20260921.json, 去安い空洞)',
    hooks: '10枚〜←minQuantity=10; ¥85〜←basePrice_ja=85',
  },
  {
    slug: 'roll-up-banners', locale: 'ja',
    old: 'ロールアップバナー | アルミスタンド 高画質 | ZprintPro',
    new: 'ロールアップバナー | アルミスタンド | 1個〜 | ZprintPro',
    longTail: '(工艺位 アルミスタンド)', src: 'L1(GSC ロールアップバナー 2imp pos3.5)',
    hooks: '1個〜←desc真值(1個〜、1-3営業日)',
  },
  // ---- en：Free US Ship/Free Shipping 空洞 + 无钩子 ----
  {
    slug: 'a4-flyers', locale: 'en',
    old: 'A4 Flyer Printing | 10 MOQ | Free US Ship | ZprintPro',
    new: 'A4 Flyer Printing | 10 MOQ | From $0.55 | ZprintPro',
    longTail: '(无, 钩子优先)', src: '-',
    hooks: '10 MOQ←minQuantity=10; $0.55←basePrice_en=0.55',
  },
  {
    slug: 'thick-paper-flyers', locale: 'en',
    old: 'Thick Paper Flyers | Free Shipping $99+ | ZprintPro',
    new: 'Thick Paper Flyers | 10 MOQ | From $0.70 | ZprintPro',
    longTail: '(无, 钩子优先)', src: '-',
    hooks: '10 MOQ←minQuantity=10; $0.70←basePrice_en=0.7',
  },
  {
    slug: 'outdoor-vinyl-banners', locale: 'en',
    old: 'Outdoor Vinyl Banners | Free Shipping $99+ | ZprintPro',
    new: 'Outdoor Vinyl Banners | 1 MOQ | From $2.76 | ZprintPro',
    longTail: '(无, 钩子优先)', src: '-',
    hooks: '1 MOQ←minQuantity=1(K3 9/21 08:36批); $2.76←basePrice_en=2.76',
  },
  {
    slug: 'eco-flyers', locale: 'en',
    old: 'Eco Flyers | Same-Day Printing | Free US Ship | ZprintPro',
    new: 'Eco Flyers | Recycled Paper | 10 MOQ $0.60 | ZprintPro',
    longTail: 'Recycled Paper', src: 'L1(GSC eco flyers 2imp pos10)+素材真值',
    hooks: '10 MOQ←minQuantity=10; $0.60←basePrice_en=0.6',
  },
  {
    slug: 'vehicle-wraps', locale: 'en',
    old: 'Vehicle Wraps | 3M Vinyl Wrap | Free US Ship | ZprintPro',
    new: 'Vehicle Wraps | 3M Vinyl | 1 MOQ From $6.44 | ZprintPro',
    longTail: '(工艺位 3M Vinyl)', src: 'L1(GSC vehicle wrap 3imp pos18.7)',
    hooks: '1 MOQ←minQuantity=1; $6.44←basePrice_en=6.44',
  },
  {
    slug: 'graduation-yearbook', locale: 'en',
    old: 'Graduation Yearbook | 1 MOQ | Free US Ship | ZprintPro',
    new: 'Graduation Yearbook | 1 MOQ | From $10.35 | ZprintPro',
    longTail: '(无, 钩子优先)', src: '-',
    hooks: '1 MOQ←minQuantity=1(K3 9/21 08:36批); $10.35←basePrice_en=10.35',
  },
  // ---- ja：K3 批数据纠错（¥240 = cosmetic-boxes bpj 误植，真值 bpj=150）----
  {
    slug: 'kraft-paper-packaging-box', locale: 'ja',
    old: 'クラフト紙包装箱 特注 エコ 300個〜 ¥240〜 | ZprintPro',
    new: 'クラフト紙包装箱 特注 エコ 300個〜 ¥150〜 | ZprintPro',
    longTail: '(K3批已含 特注 エコ)', src: 'K3批结构保留；仅价格纠错',
    hooks: '¥240→¥150←basePrice_ja=150(双方法复核: 块解析+直接grep, 240=cosmetic-boxes bpj误植)',
  },
];

const txt0 = fs.readFileSync(FILE, 'utf8');
const bakDir = path.join(ROOT, `.hermes/backup-title-v5-b2-${new Date().toISOString().replace(/[:.]/g, '-')}`);
fs.mkdirSync(bakDir, { recursive: true });
fs.writeFileSync(path.join(bakDir, 'sku-seo-data.ts'), txt0);
console.log('backup:', bakDir);

const rollback = [];
let txt = txt0;
let changed = 0;
for (const item of BATCH) {
  const { slug, locale, old, new: nw } = item;
  const start = txt.indexOf(`"${slug}": {`);
  if (start < 0) throw new Error(`slug not found: ${slug}`);
  const next = txt.indexOf(`\n  "`, start + 4);
  const seg = txt.slice(start, next < 0 ? txt.length : next);
  const locStart = seg.indexOf(`"${locale}": {`);
  if (locStart < 0) throw new Error(`locale block not found: ${slug}|${locale}`);
  const locSeg = seg.slice(locStart);
  const titleMatch = locSeg.match(/"title": "((?:[^"\\]|\\.)*)"/);
  if (!titleMatch) throw new Error(`title not found: ${slug}|${locale}`);
  const cur = titleMatch[1].replace(/\\"/g, '"');
  if (cur !== old) throw new Error(`OLD MISMATCH ${slug}|${locale}:\n  expect: ${old}\n  actual: ${cur}`);
  const e = equiv(nw);
  const b = band(nw);
  if (e < TITLE_MIN || e > TITLE_MAX) throw new Error(`BAND FAIL ${slug}|${locale}: equiv=${e} band=${b} title="${nw}"`);
  const abs = start + locStart + titleMatch.index;
  txt = txt.slice(0, abs) + `"title": "${nw.replace(/"/g, '\\"')}"` + txt.slice(abs + titleMatch[0].length);
  changed++;
  rollback.push({ slug, locale, old, new: nw, equiv: e, band: b, longTail: item.longTail, src: item.src, hooks: item.hooks });
  console.log(`OK ${slug}|${locale} eq=${e} ${old}  ->  ${nw}`);
}

fs.writeFileSync(FILE, txt, 'utf8');
fs.writeFileSync(path.join(ROOT, `.hermes/rollback-title-v5-b2-2026-09-23.json`), JSON.stringify(rollback, null, 1));
fs.writeFileSync(path.join(bakDir, 'rollback.json'), JSON.stringify(rollback, null, 1));
console.log(`\nchanged ${changed}/${BATCH.length} slots; rollback: .hermes/rollback-title-v5-b2-2026-09-23.json`);
