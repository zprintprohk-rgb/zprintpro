/**
 * apply-posters-moq1-batch-20260921.mjs — K3 2026-09-21 10:52「posters 3 SKU 1張起」落地批
 *
 * 拍板: outdoor-posters / display-posters / adhesive-posters 引擎 minQuantity 100→1（K3 原話「1张起」）。
 *   - 引擎 products.ts: minQ 100→1 ×3 + outdoor/display quantities 階梯 100/500/1000 → 1/3/5/10/20（照 a1-posters 現行圖案）+ adhesive 賣點行 100 張起印→1 張起印
 *   - sku-seo-data.ts 3 SKU × 三語 title/desc/h1/body/FAQ（SKU 段錨定防共享模板誤傷）
 *   - category-conversion-blocks.ts: posters 塊 zh 標題 100 張起→1 張起
 *   - blog-data ×3: marathon-event（3 語 MOQ 閘口 100→1，批量階梯數字保留）+ real-estate en「100 MOQ starter」→1
 *   - blog-posts.ts: marathon excerpt ×3 語
 *
 * 不動（留批量語境）: 價格指南/價格基準句（100 張批量價、price inflection）、poster-printing-guide ja ロット解說、
 *   rush 博客「100 張起印」（急件服務自身口徑，非本 3 SKU）、a2-posters（引擎=10，未拍）、價格階梯折扣語句。
 *
 * 纪律: 每条规则 exact-string/段锚定 + 计数断言 + 幂等；同文件多规则串行重读防快照互覆。
 * 用法: node scripts/apply-posters-moq1-batch-20260921.mjs [--apply]
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const APPLY = process.argv.includes('--apply');
const F = (p) => path.join(ROOT, p);

const results = [];
let pass = 0, fail = 0;

function report(r, status, note) {
  results.push({ rule: r.id, file: r.file, status, note });
  if (status === 'FAIL') { fail++; console.error(`🔴 ${r.id} ${r.file}: ${note}\n  from=${(r.from || '').slice(0, 90)}`); }
  else pass++;
}

// ===== slug 塊錨定（products.ts）=====
function runAnchorRule(r) {
  const file = F(r.file);
  const txt = fs.readFileSync(file, 'utf8');
  const si = txt.indexOf(`\n    slug: '${r.slug}',`);
  if (si < 0) { report(r, 'FAIL', 'slug 未找到'); return; }
  const nextSlug = txt.indexOf("\n    slug: '", si + 10);
  const seg = txt.slice(si, nextSlug > 0 ? nextSlug : si + 9000);
  const from = `minQuantity: ${r.mq},`;
  const c = seg.split(from).length - 1;
  const applied = seg.split('minQuantity: 1,').length - 1;
  if (c === 1) {
    if (APPLY) {
      const abs = si + seg.indexOf(from);
      fs.writeFileSync(file, txt.slice(0, abs) + 'minQuantity: 1,' + txt.slice(abs + from.length), 'utf8');
    }
    report(r, APPLY ? 'APPLIED' : 'WOULD-APPLY');
  } else if (c === 0 && applied >= 1) report(r, 'IDEMPOTENT');
  else report(r, 'FAIL', `塊內命中 ${c} 次`);
}

// ===== 全文 exact-string（count 断言）=====
function runRule(r) {
  const file = F(r.file);
  const txt = fs.readFileSync(file, 'utf8');
  const c = txt.split(r.from).length - 1;
  const applied = txt.split(r.to).length - 1;
  if (c === r.count) {
    if (APPLY) fs.writeFileSync(file, txt.split(r.from).join(r.to), 'utf8');
    report(r, APPLY ? 'APPLIED' : 'WOULD-APPLY', `×${c}`);
  } else if (c === 0 && applied >= r.count) report(r, 'IDEMPOTENT');
  else report(r, 'FAIL', `命中 ${c} 次（期望 ${r.count}），已应用 ${applied}`);
}

// ===== 段锚定（[start, end) 区间内 replaceAll + 计数）=====
function runSegRule(r) {
  const file = F(r.file);
  const txt = fs.readFileSync(file, 'utf8');
  const si = txt.indexOf(r.start);
  if (si < 0) { report(r, 'FAIL', 'start 锚未找到'); return; }
  const ei = txt.indexOf(r.end, si + r.start.length);
  if (ei < 0) { report(r, 'FAIL', 'end 锚未找到'); return; }
  const seg = txt.slice(si, ei);
  const c = seg.split(r.from).length - 1;
  if (c >= 1) {
    if (APPLY) {
      const newSeg = seg.split(r.from).join(r.to);
      fs.writeFileSync(file, txt.slice(0, si) + newSeg + txt.slice(ei), 'utf8');
    }
    report(r, APPLY ? 'APPLIED' : 'WOULD-APPLY', `段内 ×${c}`);
  } else if (seg.split(r.to).length - 1 >= 1) report(r, 'IDEMPOTENT');
  else report(r, 'FAIL', '段内命中 0 次');
}

// ---------- A. 引擎 3 SKU ----------
for (const slug of ['outdoor-posters', 'display-posters', 'adhesive-posters'])
  runAnchorRule({ id: `A-eng-${slug}`, file: 'src/data/products.ts', slug, mq: '100' });

// ---------- B. 引擎 quantities 階梯（outdoor/display → a1 圖案 1/3/5/10/20）----------
const OLD_TIERS = `      quantities: [
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.85 },
        { value: 1000, label: '1000張', discount: 0.7 },
      ],`;
const NEW_TIERS = `      quantities: [
        { value: 1, label: '1張', discount: 1 },
        { value: 3, label: '3張', discount: 0.86 },
        { value: 5, label: '5張', discount: 0.77 },
        { value: 10, label: '10張', discount: 0.64 },
        { value: 20, label: '20張', discount: 0.55 },
      ],`;
for (const slug of ['outdoor-posters', 'display-posters']) {
  const file = F('src/data/products.ts');
  const txt = fs.readFileSync(file, 'utf8');
  const si = txt.indexOf(`\n    slug: '${slug}',`);
  const nextSlug = txt.indexOf("\n    slug: '", si + 10);
  const seg = txt.slice(si, nextSlug);
  const c = seg.split(OLD_TIERS).length - 1;
  const applied = seg.split(NEW_TIERS).length - 1;
  const r = { id: `B-tiers-${slug}`, file: 'src/data/products.ts', from: OLD_TIERS };
  if (c === 1) {
    if (APPLY) fs.writeFileSync(file, txt.slice(0, si) + seg.split(OLD_TIERS).join(NEW_TIERS) + txt.slice(nextSlug), 'utf8');
    report(r, APPLY ? 'APPLIED' : 'WOULD-APPLY');
  } else if (c === 0 && applied === 1) report(r, 'IDEMPOTENT');
  else report(r, 'FAIL', `塊內命中 ${c} 次`);
}

// ---------- C. adhesive 賣點行 ----------
{
  const file = F('src/data/products.ts');
  const txt = fs.readFileSync(file, 'utf8');
  const si = txt.indexOf("\n    slug: 'adhesive-posters',");
  const nextSlug = txt.indexOf("\n    slug: '", si + 10);
  const seg = txt.slice(si, nextSlug);
  const from = '【當日可取】數碼輸出，100 張起印，急單無憂';
  const to = '【當日可取】數碼輸出，1 張起印，急單無憂';
  const c = seg.split(from).length - 1;
  const r = { id: 'C-adh-feature', file: 'src/data/products.ts', from };
  if (c === 1) {
    if (APPLY) fs.writeFileSync(file, txt.slice(0, si) + seg.split(from).join(to) + txt.slice(nextSlug), 'utf8');
    report(r, APPLY ? 'APPLIED' : 'WOULD-APPLY');
  } else if (c === 0 && seg.split(to).length - 1 === 1) report(r, 'IDEMPOTENT');
  else report(r, 'FAIL', `塊內命中 ${c} 次`);
}

// ---------- D. sku-seo-data.ts 3 SKU × 三語（SKU 段锚定）----------
const SKU_SEG_END = { 'outdoor-posters': '\n  "display-posters"', 'display-posters': '\n  "adhesive-posters"', 'adhesive-posters': '\n  "' };
const ZH_NAME = { 'outdoor-posters': '戶外海報', 'display-posters': '展架海報', 'adhesive-posters': '背膠海報' };
const ZH_PRICE = { 'outdoor-posters': '16', 'display-posters': '32', 'adhesive-posters': '13' };
const JA_TITLE_FROM = { 'outdoor-posters': '防水・ラミネート・100枚〜', 'display-posters': '100枚〜・最安', 'adhesive-posters': '100枚〜 ¥390〜' };
const JA_TITLE_TO = { 'outdoor-posters': '防水・ラミネート・1枚〜', 'display-posters': '1枚〜・最安', 'adhesive-posters': '1枚〜 ¥390〜' };
const EN_H1_FROM = { 'outdoor-posters': 'Outdoor Posters 50+ |', 'display-posters': 'Display Posters 50+ |', 'adhesive-posters': 'Adhesive Posters 50+ |' };
const EN_H1_TO = { 'outdoor-posters': 'Outdoor Posters 1+ |', 'display-posters': 'Display Posters 1+ |', 'adhesive-posters': 'Adhesive Posters 1+ |' };

const skuCommonRules = [
  { id: 'zh-q2', from: '50 張起印（無開版費）。100 / 500 / 1,000 數量設有階梯式折扣。', to: '1 張起印（無開版費）。3 / 5 / 10 / 20 張設有階梯式折扣。' },
  { id: 'en-desc', from: '50-MOQ. Free US shipping over $100, DHL Express | Free Design | 100 MOQ', to: '1-MOQ. Free US shipping over $100, DHL Express | Free Design' },
  { id: 'en-pricing', from: 'Pricing is transparent: 100-piece minimum, no setup fees', to: 'Pricing is transparent: 1-piece minimum, no setup fees' },
  { id: 'en-q2', from: '50 posters minimum (no setup fees). Bulk discounts at 100 / 500 / 1,000 quantities.', to: '1 poster minimum (no setup fees). Bulk discounts at 3 / 5 / 10 / 20 quantities.' },
  { id: 'ja-desc', from: '10枚〜、翌日-3営業日', to: '1枚〜、翌日-3営業日' },
  { id: 'ja-intro', from: '100 枚から対応、Giclée', to: '1 枚から対応、Giclée' },
  { id: 'ja-pricing', from: '料金透明：100 枚から、版代・型代ゼロ。', to: '料金透明：1 枚から、版代・型代ゼロ。' },
  { id: 'ja-q2', from: '50 枚から対応（版代ゼロ）。100 / 500 / 1,000 数量で段階割引。', to: '1 枚から対応（版代ゼロ）。3 / 5 / 10 / 20 枚で段階割引。' },
];
for (const slug of ['outdoor-posters', 'display-posters', 'adhesive-posters']) {
  const start = `\n  "${slug}": {`;
  const end = SKU_SEG_END[slug];
  const segDef = { start, end };
  runSegRule({ id: `D-${slug}-zh-title`, file: 'src/data/sku-seo-data.ts', ...segDef,
    from: `| 100個起 HK$${ZH_PRICE[slug]}起 |`, to: `| 1個起 HK$${ZH_PRICE[slug]}起 |` });
  runSegRule({ id: `D-${slug}-ja-title`, file: 'src/data/sku-seo-data.ts', ...segDef,
    from: JA_TITLE_FROM[slug], to: JA_TITLE_TO[slug] });
  runSegRule({ id: `D-${slug}-en-h1`, file: 'src/data/sku-seo-data.ts', ...segDef,
    from: EN_H1_FROM[slug], to: EN_H1_TO[slug] });
  for (const r of skuCommonRules)
    runSegRule({ id: `D-${slug}-${r.id}`, file: 'src/data/sku-seo-data.ts', ...segDef, from: r.from, to: r.to });
}

// ---------- E. category-conversion-blocks.ts posters 塊 zh 標題 ----------
runRule({ id: 'E1-cb-title', file: 'src/data/category-conversion-blocks.ts', count: 1,
  from: '海報印刷｜印海報 A0-A3 大圖輸出・戶外防水 PVC 100 張起｜智印港', to: '海報印刷｜印海報 A0-A3 大圖輸出・戶外防水 PVC 1 張起｜智印港' });

// ---------- F. blog-data marathon ×3 語 + real-estate en ----------
const MARA = { start: '"marathon-event-poster-printing-guide"', end: '\n  "' };
runSegRule({ id: 'F-zh-desc', file: 'src/data/blog-data/zh-hk.json', ...MARA, from: '· 100 張起印 ·', to: '· 1 張起印 ·' });
runSegRule({ id: 'F-zh-body', file: 'src/data/blog-data/zh-hk.json', ...MARA, from: ',100 張起印,免費設計 mockup', to: ',1 張起印,免費設計 mockup' });
runSegRule({ id: 'F-zh-faq', file: 'src/data/blog-data/zh-hk.json', ...MARA, from: 'A: 100 張起印。學界田徑', to: 'A: 1 張起印。學界田徑' });
runSegRule({ id: 'F-en-desc', file: 'src/data/blog-data/en.json', ...MARA, from: '· 100 MOQ ·', to: '· 1 MOQ ·' });
runSegRule({ id: 'F-en-body1', file: 'src/data/blog-data/en.json', ...MARA, from: 'at 100 MOQ, Free Shipping', to: 'at 1 MOQ, Free Shipping' });
runSegRule({ id: 'F-en-body2', file: 'src/data/blog-data/en.json', ...MARA, from: 'at 100 MOQ, free design mockup', to: 'at 1 MOQ, free design mockup' });
runSegRule({ id: 'F-ja-desc', file: 'src/data/blog-data/ja.json', ...MARA, from: '· 100 枚から対応 ·', to: '· 1 枚から対応 ·' });
runSegRule({ id: 'F-ja-body1', file: 'src/data/blog-data/ja.json', ...MARA, from: '100 枚から小ロット対応、3-5 営業日', to: '1 枚から小ロット対応、3-5 営業日' });
runSegRule({ id: 'F-ja-body2', file: 'src/data/blog-data/ja.json', ...MARA, from: '100 枚から対応、3-5 営業日', to: '1 枚から対応、3-5 営業日' });
runSegRule({ id: 'F-ja-faq', file: 'src/data/blog-data/ja.json', ...MARA, from: 'SKU あたり 100 枚から。学校陸上大会は', to: 'SKU あたり 1 枚から。学校陸上大会は' });
const REEST = { start: '"real-estate-floor-plan-poster-printing-guide"', end: '\n  "' };
runSegRule({ id: 'F-en-reest', file: 'src/data/blog-data/en.json', ...REEST, from: '100 MOQ starter', to: '1 MOQ starter' });

// ---------- G. blog-posts.ts marathon excerpt ×3 ----------
const BPMARA = { start: 'marathon-event-poster-printing-guide', end: 'car-dealership-amenity-sticker-printing-guide' };
runSegRule({ id: 'G-zh-excerpt', file: 'src/data/blog-posts.ts', ...BPMARA, from: '學界田徑必睇。100 張起印，A1/A2', to: '學界田徑必睇。1 張起印，A1/A2' });
runSegRule({ id: 'G-en-excerpt', file: 'src/data/blog-posts.ts', ...BPMARA, from: 'charity foundations: 100 MOQ, waterproof', to: 'charity foundations: 1 MOQ, waterproof' });
runSegRule({ id: 'G-ja-excerpt', file: 'src/data/blog-posts.ts', ...BPMARA, from: 'チャリティ財団向け。100 枚から対応、防水', to: 'チャリティ財団向け。1 枚から対応、防水' });

console.log(`\n📊 posters MOQ=1 批: ${pass} PASS / ${fail} FAIL${APPLY ? '（已寫入）' : '（dry-run, 加 --apply 寫入）'}`);
for (const r of results) if (r.status === 'FAIL') console.log(`  🔴 ${r.rule}: ${r.note || ''}`);
process.exit(fail > 0 ? 1 : 0);
