/**
 * apply-v5-title-batch-20260923.mjs — SKU 标题 v5 规则首批落地（K3 2026-09-23 指令）
 *
 * 规则 SSoT: docs/zprintpro-sku-title-rule-v5-2026-09-23.md（五段式 + 当量 50-57 + 长尾来源阶梯）
 * 冻结口径: K3 2026-09-23 新拍板「排名前10且有点击才冻结」→ 本批 19 槽全部非冻结
 * 数据来源: products.ts 真值（minQuantity/basePrice_en/basePrice_ja/unitLabel/turnaround/price_range）
 *           + GSC .hermes/gsc-2026-09-18/extract.json（28d 查询表 L1 实证）
 *           + DELIVERY 词库（L0, en 品类词）+ L2 联网检索式模板（ja 小ロット/業務用/印刷 后缀）
 *
 * 安全: 断言旧串逐字命中（幂等）→ 当量 50-57 校验（title-equiv.js）→ 备份 → 回滚映射
 * 用法: node scripts/apply-v5-title-batch-20260923.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { equiv, band, TITLE_MIN, TITLE_MAX } = require('./guards/title-equiv.js');

const ROOT = path.resolve(import.meta.dirname, '..');
const FILE = path.join(ROOT, 'src/data/sku-seo-data.ts');

/* ---------------- 批次定义（19 槽） ---------------- */
const BATCH = [
  // ---- P0: 无数字钩子（v5 §一④ 数字钩子必填）----
  {
    slug: 'doujinshi-printing', locale: 'en',
    old: 'Doujinshi Printing Comiket | Free US Ship | ZprintPro',
    new: 'Doujinshi Printing | Comiket | 10 MOQ 24h Rush | ZprintPro',
    longTail: 'Comiket', src: 'L2(产品desc/行业常识, GSC同人誌族实证)', grade: '流量大词',
    hooks: '10 MOQ←minQuantity=10; 24h Rush←turnaround(コミケ前24時間特急対応)',
  },
  {
    slug: 'doujinshi-printing', locale: 'ja',
    old: '同人誌印刷 コミケ対応印刷 10枚〜・最安 | ZprintPro',
    new: '同人誌印刷 | コミケ前24時間特急対応 | 10部〜 | ZprintPro',
    longTail: 'コミケ前24時間特急対応', src: 'L1(GSC同人誌印刷 4imp pos8)+desc', grade: '带钱词(交期)',
    hooks: '10部〜←minQuantity=10(站内ja口径=部, desc实证); 24時間特急←turnaround',
  },
  {
    slug: 'exercise-books', locale: 'en',
    old: 'Saddle-Stitched Exercise Books | Free US Ship | ZprintPro',
    new: 'Exercise Book Printing | School | 10 MOQ $1.84 | ZprintPro',
    longTail: 'School', src: 'L1(GSC school exercise book printing 43imp)', grade: '流量大词',
    hooks: '10 MOQ←minQuantity=10; $1.84←basePrice_en=1.84',
  },
  {
    slug: 'pvc-menus', locale: 'en',
    old: 'PVC Menus | Laminated Durable | Free US Ship | ZprintPro',
    new: 'PVC Menus | Restaurant Menus | 10 MOQ $2.76 | ZprintPro',
    longTail: 'Restaurant Menus', src: 'L1(GSC pvc menu 24imp pos12.6 + nameEn)', grade: '流量大词',
    hooks: '10 MOQ←minQuantity=10; $2.76←basePrice_en=2.76',
  },
  {
    slug: 'fluorescent-stickers', locale: 'en',
    old: 'Custom Fluorescent Stickers | Free US Ship | ZprintPro',
    new: 'Fluorescent Stickers | Die Cut | 10 MOQ $0.46 | ZprintPro',
    longTail: 'Die Cut', src: 'L1(GSC die cut sticker 5imp)+工艺', grade: '流量大词',
    hooks: '10 MOQ←minQuantity=10; $0.46←basePrice_en=0.46',
  },
  {
    slug: 'transparent-stickers', locale: 'en',
    old: 'Custom Transparent Stickers | Free US Ship | ZprintPro',
    new: 'Transparent Stickers | Clear | 10 MOQ $0.41 | ZprintPro',
    longTail: 'Clear', src: 'L1(GSC clear sticker 1imp pos10 + nameEn)', grade: '流量大词',
    hooks: '10 MOQ←minQuantity=10; $0.41←basePrice_en=0.41',
  },
  {
    slug: 'vehicle-wraps', locale: 'en',
    old: 'Vehicle Wraps | 3M Vinyl Wrap | Free US Ship | ZprintPro',
    new: 'Vehicle Wraps | 3M Vinyl | 1 MOQ From $6.44 | ZprintPro',
    longTail: '(工艺位 3M Vinyl)', src: 'L1(GSC vehicle wrap 3imp pos18.7)', grade: '工艺',
    hooks: '1 MOQ←minQuantity=1(K3 9/21 08:36批); $6.44←basePrice_en=6.44',
  },
  {
    slug: 'roll-up-banners', locale: 'ja',
    old: 'ロールアップバナー | アルミスタンド 高画質 | ZprintPro',
    new: 'ロールアップバナー | アルミスタンド | 1個〜 ¥6,440〜 | ZprintPro',
    longTail: '(工艺位 アルミスタンド)', src: 'L1(GSC ロールアップバナー 2imp pos3.5)', grade: '工艺',
    hooks: '1個〜←desc真值(1個〜); ¥6,440〜←basePrice_ja=6440',
  },
  {
    slug: 'textbooks', locale: 'en',
    old: 'Textbooks | Perfect Bound | Free US Ship | ZprintPro',
    new: 'Textbook Printing | K12 Schools | 100 MOQ $9.20 | ZprintPro',
    longTail: 'K12 Schools', src: 'L1(GSC printing textbooks 1imp pos1 + nameEn)', grade: '流量大词',
    hooks: '100 MOQ←minQuantity=100; $9.20←basePrice_en=9.2',
  },
  {
    slug: 'mini-calendars', locale: 'ja',
    old: 'ミニカレンダー | ノベルティ 各種サイズ | ZprintPro',
    new: 'ミニカレンダー 印刷 | 2027 ノベルティ | 1冊〜 ¥50〜 | ZprintPro',
    longTail: '印刷/2027/ノベルティ', src: 'L1(GSC ミニカレンダー 1imp pos1)+L2(ja 印刷后缀)', grade: '流量大词',
    hooks: '1冊〜←minQuantity=1(ja日历族口径=冊); ¥50〜←basePrice_ja=50',
  },
  {
    slug: 'custom-calendars', locale: 'ja',
    old: 'カスタムカレンダー | ノベルティ 各種サイズ | ZprintPro',
    new: 'オリジナルカレンダー | 業務用 小ロット | 1冊〜 ¥50〜 | ZprintPro',
    longTail: '業務用 小ロット', src: 'L2(ja 业务用/小ロット检索模板; G4主词对齐nameJa首段)', grade: '带钱词',
    hooks: '1冊〜←minQuantity=1; ¥50〜←basePrice_ja=50',
  },
  {
    slug: 'custom-red-packets', locale: 'ja',
    old: 'オリジナル年賀状印刷 | 箔押し UV エンボス | ZprintPro',
    new: 'オリジナル年賀状印刷 | 箔押し UV | 100枚〜 ¥103〜 | ZprintPro',
    longTail: '(工艺位 箔押し UV)', src: '家族口径(9/21裁决#6 纯日文); ポチ袋语义差异见报告', grade: '工艺',
    hooks: '100枚〜←minQuantity=100; ¥103〜←basePrice_ja=103',
  },
  {
    slug: 'a5-flyers', locale: 'en',
    old: 'A5 Flyers for Holiday Cards | Free US Ship | ZprintPro',
    new: 'A5 Flyers | Custom Leaflets | 10 MOQ $0.40 | ZprintPro',
    longTail: 'Custom Leaflets', src: 'L1(GSC a5 flyer 1imp pos3 + nameEn Leaflets)', grade: '流量大词',
    hooks: '10 MOQ←minQuantity=10; $0.40←basePrice_en=0.4',
  },
  {
    slug: 'eco-flyers', locale: 'en',
    old: 'Eco Flyers | Same-Day Printing | Free US Ship | ZprintPro',
    new: 'Eco Flyers | Recycled Paper | 10 MOQ $0.60 | ZprintPro',
    longTail: 'Recycled Paper', src: 'L1(GSC eco flyers 2imp pos10)+素材真值', grade: '流量大词',
    hooks: '10 MOQ←minQuantity=10; $0.60←basePrice_en=0.6',
  },
  // ---- P1: 空洞词/失实/量词修复 ----
  {
    slug: 'small-batch-stickers', locale: 'en',
    old: 'Small Batch Stickers 50 pcs from $0.045 | ZprintPro',
    new: 'Small Batch Stickers | 10 pcs | From $0.045 | ZprintPro',
    longTail: '(主词即长尾 GSC small batch stickers 40imp pos5.5)', src: 'L1(GSC small batch sticker printing 69imp pos6.6)', grade: '带钱词',
    hooks: '10 pcs←minQuantity=10(MOQ失实50→10); $0.045←desc/hero校准价',
  },
  {
    slug: 'kraft-paper-packaging-box', locale: 'ja',
    old: 'クラフト紙包装箱 エコ・300枚〜・最安値 | ZprintPro',
    new: 'クラフト紙包装箱印刷 | 梱包 業務用 | 300個〜 ¥150〜 | ZprintPro',
    longTail: '梱包 業務用', src: 'L2(ja 业务用模板; 最安値空洞词移除)', grade: '带钱词',
    hooks: '300個〜←minQuantity=300(量词枚→個修正); ¥150〜←basePrice_ja=150',
  },
  {
    slug: 'double-sided-flyers', locale: 'ja',
    old: '両面チラシ印刷 フルカラー 安い 10枚〜 ¥85〜 | ZprintPro',
    new: '両面チラシ印刷 | フルカラー 10枚〜 | ¥85〜 | ZprintPro',
    longTail: '(工艺位 フルカラー)', src: 'T1已审提案(title-quality-proposals-20260921.json 未落盘, 本批补落)', grade: '工艺',
    hooks: '10枚〜←minQuantity=10; ¥85〜←basePrice_ja=85',
  },
  {
    slug: 'a4-flyers', locale: 'en',
    old: 'A4 Flyer Printing | 10 MOQ | Free US Ship | ZprintPro',
    new: 'A4 Flyer Printing | 10 MOQ | From $0.55 | ZprintPro',
    longTail: '(无, 钩子优先)', src: '-', grade: '-',
    hooks: '10 MOQ←minQuantity=10; $0.55←basePrice_en=0.55(Free US Ship条件承诺移除)',
  },
  {
    slug: 'graduation-yearbook', locale: 'en',
    old: 'Graduation Yearbook | 1 MOQ | Free US Ship | ZprintPro',
    new: 'Graduation Yearbook | 1 MOQ | From $10.35 | ZprintPro',
    longTail: '(无, 钩子优先)', src: '-', grade: '-',
    hooks: '1 MOQ←minQuantity=1(K3 9/21 08:36批); $10.35←basePrice_en=10.35',
  },
];

/* ---------------- 执行 ---------------- */
const txt = fs.readFileSync(FILE, 'utf8');
const bakDir = path.join(ROOT, `.hermes/backup-title-v5-${new Date().toISOString().replace(/[:.]/g, '-')}`);
fs.mkdirSync(bakDir, { recursive: true });
fs.writeFileSync(path.join(bakDir, 'sku-seo-data.ts'), txt);
console.log('backup:', bakDir);

const rollback = [];
let changed = 0;
for (const item of BATCH) {
  const { slug, locale, old, new: nw } = item;
  // 定位 slug 块
  const start = txt.indexOf(`"${slug}": {`);
  if (start < 0) throw new Error(`slug not found: ${slug}`);
  const next = txt.indexOf(`\n  "`, start + 4);
  const seg = txt.slice(start, next < 0 ? txt.length : next);
  // 定位 locale 块
  const locStart = seg.indexOf(`"${locale}": {`);
  if (locStart < 0) throw new Error(`locale block not found: ${slug}|${locale}`);
  const locSeg = seg.slice(locStart);
  const titleMatch = locSeg.match(/"title": "((?:[^"\\]|\\.)*)"/);
  if (!titleMatch) throw new Error(`title not found: ${slug}|${locale}`);
  const cur = titleMatch[1].replace(/\\"/g, '"');
  if (cur !== old) throw new Error(`OLD MISMATCH ${slug}|${locale}:\n  expect: ${old}\n  actual: ${cur}`);
  // 当量校验
  const e = equiv(nw);
  const b = band(nw);
  if (e < TITLE_MIN || e > TITLE_MAX) throw new Error(`BAND FAIL ${slug}|${locale}: equiv=${e} band=${b} title="${nw}"`);
  // 写入（替换 title 值）
  const abs = start + locStart + titleMatch.index;
  const pre = txt.slice(0, abs);
  const post = txt.slice(abs + titleMatch[0].length);
  const newLine = `"title": "${nw.replace(/"/g, '\\"')}"`;
  txt = pre + newLine + post;
  changed++;
  rollback.push({ slug, locale, old, new: nw, equiv: e, band: b, longTail: item.longTail, src: item.src, hooks: item.hooks });
  console.log(`OK ${slug}|${locale} eq=${e} ${old}  ->  ${nw}`);
}

fs.writeFileSync(FILE, txt, 'utf8');
fs.writeFileSync(path.join(ROOT, `.hermes/rollback-title-v5-2026-09-23.json`), JSON.stringify(rollback, null, 1));
fs.writeFileSync(path.join(bakDir, 'rollback.json'), JSON.stringify(rollback, null, 1));
console.log(`\nchanged ${changed}/${BATCH.length} slots; rollback: .hermes/rollback-title-v5-2026-09-23.json`);
