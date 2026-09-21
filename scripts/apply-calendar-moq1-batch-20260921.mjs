/**
 * apply-calendar-moq1-batch-20260921.mjs — K3 09:06「月曆也 1 件起——數碼 1 本起，批量印刷 300 起」落地批
 *
 * 新口径（K3 2026-09-21 09:06 拍板）: 月曆族數碼 1 本起印；批量 300 本起上印刷機（柯式）。
 *   - 引擎 products.ts 6 SKU minQuantity 1000→1（slug 锚定）
 *   - seo.ts calendars 三语 title/desc（1000→1 + 300 阶梯句）
 *   - sku-seo-data.ts 6 SKU 三语 title/body/desc/imageAlt
 *   - products-content.ts 月曆 social-proof ×6
 *   - category-conversion-blocks.ts 月曆块（metaDescription + FAQ ×2 + 对比表 ×3）
 *   - blog-data 三语 calendar 两篇博客（段锚定，折扣阶梯数字 500/1000/10000 保留）
 *   - blog-posts.ts 两篇月曆博客 excerpt 三语
 *   - page.tsx category 硬编码 en meta（1000 MOQ→1 MOQ Bulk 300+）
 *
 * 不动（登记）: 書刊/畫冊族 50/100 本起印、zh-hk L505 catalog 博客「100 本起 (數碼印刷)」、
 *   llms-*.txt（并发会话工作区改动）、wedding/place-cards minQ=50。
 *
 * 纪律: 每条规则 exact-string/段锚定 + 计数断言 + 幂等；同文件多规则串行重读防快照互覆。
 * 用法: node scripts/apply-calendar-moq1-batch-20260921.mjs [--apply]
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

// ===== 1. 锚定规则: slug 块内 minQuantity: <mq> → 1 =====
function runAnchorRule(r) {
  const file = F(r.file);
  const txt = fs.readFileSync(file, 'utf8');
  const si = txt.indexOf(`\n    slug: '${r.slug}',`);
  if (si < 0) { report(r, 'FAIL', 'slug 未找到'); return; }
  const nextSlug = txt.indexOf("\n    slug: '", si + 10);
  const seg = txt.slice(si, nextSlug > 0 ? nextSlug : si + 8000);
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
  else report(r, 'FAIL', `块内命中 ${c} 次`);
}

// ===== 2. 全文 exact-string 规则（count 断言）=====
function runRule(r) {
  const file = F(r.file);
  const txt = fs.readFileSync(file, 'utf8');
  const c = txt.split(r.from).length - 1;
  const applied = txt.split(r.to).length - 1;
  if (c === r.count) {
    if (APPLY) fs.writeFileSync(file, txt.split(r.from).join(r.to), 'utf8');
    report(r, APPLY ? 'APPLIED' : 'WOULD-APPLY', `×${c}`);
  } else if (c === 0 && applied >= 1) report(r, 'IDEMPOTENT');
  else report(r, 'FAIL', `命中 ${c} 次（期望 ${r.count}），已应用 ${applied}`);
}

// ===== 3. 段锚定规则: [start, end) 区间内 replaceAll + 计数 =====
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

// ---------- A. 引擎 6 SKU minQ 1000→1 ----------
const CAL_SLUGS = ['wall-calendars', 'desk-calendars', 'custom-calendars', 'mini-calendars', 'photo-frame-calendars', 'magnetic-calendars'];
for (const slug of CAL_SLUGS)
  runAnchorRule({ id: `A-eng-${slug}`, file: 'src/data/products.ts', slug, mq: '1000' });

// ---------- B. seo.ts calendars 品类 meta ----------
const seoRules = [
  { id: 'B1-seo-title-zh', count: 1, from: "'zh-hk': '月曆印刷 2027 | 1000本起印・Q4旺季・60天預訂・燙金精裝・企業LOGO | 智印港',",
    to: "'zh-hk': '月曆印刷 2027 | 1本起印・批量300本起・Q4旺季・60天預訂・燙金精裝 | 智印港'," },
  { id: 'B2-seo-title-en', count: 1, from: "en: 'Calendar Printing 2027 from $5 | 1000 MOQ + Q4 Peak + 60-Day Pre-Order + Foil Hardcover + Made for USA | ZprintPro',",
    to: "en: 'Calendar Printing 2027 from $5 | 1 MOQ + Bulk 300+ + Q4 Peak + 60-Day Pre-Order + Foil Hardcover | ZprintPro'," },
  { id: 'B3-seo-title-ja', count: 1, from: "ja: 'カレンダー印刷 2027 1000部〜 · Q4繁忙期 + 60日予約 + 箔押し上製本 + 企業 LOGO + 日本全国 | ZprintPro',",
    to: "ja: 'カレンダー印刷 2027 1部〜・300部からオフセット · Q4繁忙期 + 60日予約 + 箔押し上製本 | ZprintPro'," },
  { id: 'B4-seo-desc-zh', count: 1, from: "'zh-hk': '月曆印刷 2027 1000 本起印、HK$10 起/本。",
    to: "'zh-hk': '月曆印刷 2027 1 本起印（批量 300 本起上印刷機更抵）、HK$10 起/本。" },
  { id: 'B5-seo-desc-en', count: 1, from: "en: 'Custom calendar printing 2027, 1000 MOQ.",
    to: "en: 'Custom calendar printing 2027, 1 MOQ, bulk offset from 300." },
  { id: 'B6-seo-desc-ja', count: 1, from: "ja: 'カレンダー印刷 2027 1000 部〜。",
    to: "ja: 'カレンダー印刷 2027 1 部〜、300 部からオフセット大量対応。" },
];
for (const r of seoRules) runRule({ ...r, file: 'src/lib/seo.ts' });

// ---------- C. sku-seo-data.ts 6 SKU ----------
const skuRules = [
  { id: 'C1-zh-title-dot', count: 3, from: '・1000起印・', to: '・1本起印・' },
  { id: 'C2-zh-title-ge', count: 2, from: '1000個起 HK$3起', to: '1個起 HK$3起' },
  { id: 'C3-zh-title-ben', count: 1, from: '1000本起 HK$3起', to: '1本起 HK$3起' },
  { id: 'C4-en-title', count: 3, from: ' | 1000 MOQ | ZprintPro', to: ' | 1 MOQ | ZprintPro' },
  { id: 'C4b-en-title-custom', count: 1, from: 'Custom Calendars 2027 | 1000 MOQ | $0.40 | ZprintPro', to: 'Custom Calendars 2027 | 1 MOQ | $0.40 | ZprintPro' },
  { id: 'C5-ja-title', count: 1, from: 'フォトフレームカレンダー | 1000部〜', to: 'フォトフレームカレンダー | 1部〜' },
  { id: 'C6-zh-body', count: 6, from: '最低起印量 1000 本', to: '最低起印量 1 本' },
  { id: 'C7-zh-desc-wall', count: 1, from: '掛牆年曆/掛牆年曆 50 本起。', to: '掛牆年曆/掛牆年曆 1 本起。' },
  { id: 'C8-zh-desc-desk', count: 1, from: '座檯年曆/座檯年曆 50 本起。', to: '座檯年曆/座檯年曆 1 本起。' },
  { id: 'C9-zh-desc-mag', count: 1, from: '磁吸年曆/磁吸年曆 50 本起。', to: '磁吸年曆/磁吸年曆 1 本起。' },
  { id: 'C12-ja-desc', count: 6, from: '50冊〜、7-10営業日', to: '1冊〜、7-10営業日' },
  { id: 'C13-zh-imgalt', count: 4, from: '一般為1000本起訂，大批量訂單價格更優惠。', to: '一般為1本起訂（數碼），300本起批量上印刷機更抵，大批量訂單價格更優惠。' },
  { id: 'C14-ja-body-offset', count: 8, from: 'オフセット印刷は500部から', to: 'オフセット印刷は300部から' },
  { id: 'C15-ja-body-offset2', count: 3, from: 'オフセットは500部から', to: 'オフセットは300部から' },
  { id: 'C15b-ja-faq-offset', count: 1, from: 'オフセットなら500部から', to: 'オフセットなら300部から' },
  // band 修复: 1000→1 后 en 标题当量掉到 47/49（<50 FILL），补回 3+ 当量且带 300 批量钩
  { id: 'C19-en-title-wall', count: 1, from: 'Wall Calendars | Wire-Bound | 1 MOQ | ZprintPro', to: 'Wall Calendars | Wire-Bound | 1 MOQ Bulk 300+ | ZprintPro' },
  { id: 'C19-en-title-desk', count: 1, from: 'Desk Calendars | Wire-Bound | 1 MOQ | ZprintPro', to: 'Desk Calendars | Wire-Bound | 1 MOQ Bulk 300+ | ZprintPro' },
  { id: 'C19-en-title-mini', count: 1, from: 'Mini Calendars | Wire-Bound | 1 MOQ | ZprintPro', to: 'Mini Calendars | Wire-Bound | 1 MOQ Bulk 300+ | ZprintPro' },
  { id: 'C19-en-title-custom', count: 1, from: 'Custom Calendars 2027 | 1 MOQ | $0.40 | ZprintPro', to: 'Custom Calendars 2027 | 1 MOQ + $0.40/pc | ZprintPro' },
  { id: 'C16-en-body-min', count: 6, from: '1,000-unit minimum', to: '1-unit minimum (bulk 300+ offset)' },
  { id: 'C17-en-h1', count: 6, from: 'Calendars 100+ | ZprintPro', to: 'Calendars 1+ | ZprintPro' },
];
for (const r of skuRules) runRule({ ...r, file: 'src/data/sku-seo-data.ts' });

// C18: en desc 模板被 30+ 非日历 SKU 共用, 必须 SKU 段锚定; 段内 2 连改后一次写回
const SKU_SEGS = [
  ['wall-calendars', 'desk-calendars'], ['desk-calendars', 'custom-calendars'], ['custom-calendars', 'mini-calendars'],
  ['mini-calendars', 'photo-frame-calendars'], ['photo-frame-calendars', 'magnetic-calendars'], ['magnetic-calendars', 'pvc-menus'],
];
for (const [cur, nxt] of SKU_SEGS) {
  const file = F('src/data/sku-seo-data.ts');
  const start = `\n  "${cur}": {`;
  const end = nxt ? `\n  "${nxt}": {` : null;
  const txt = fs.readFileSync(file, 'utf8');
  const si = txt.indexOf(start);
  const ei = end ? txt.indexOf(end, si + start.length) : txt.length;
  const id = `C18-${cur}`;
  if (si < 0 || ei < 0) { report({ id, file: 'src/data/sku-seo-data.ts' }, 'FAIL', '段锚未找到'); continue; }
  let seg = txt.slice(si, ei);
  let ok = true;
  const notes = [];
  for (const [suffix, from, to] of [['moq', '100-MOQ.', '1-MOQ.'], ['free', '| 100 MOQ', '| 1 MOQ']]) {
    const c = seg.split(from).length - 1;
    if (c === 1) { seg = seg.split(from).join(to); notes.push(suffix); }
    else if (c === 0 && seg.split(to).length - 1 >= 1) notes.push(`${suffix}:IDEMPOTENT`);
    else { ok = false; report({ id: `${id}-${suffix}`, file: 'src/data/sku-seo-data.ts' }, 'FAIL', `段内命中 ${c} 次`); }
  }
  if (ok) {
    if (APPLY) fs.writeFileSync(file, txt.slice(0, si) + seg + txt.slice(ei), 'utf8');
    report({ id, file: 'src/data/sku-seo-data.ts' }, APPLY ? 'APPLIED' : 'WOULD-APPLY', notes.join('+'));
  }
}

// ---------- D. products-content.ts 月曆 social-proof ×6 ----------
runRule({ id: 'D1-pc-social', file: 'src/data/products-content.ts', count: 6,
  from: '1000 本起印，48 小時快遞', to: '1 本起印（批量 300 本起上印刷機），48 小時快遞' });

// ---------- E. category-conversion-blocks.ts 月曆块 ----------
const cbRules = [
  { id: 'E1-cb-meta', count: 1, from: '都做。1000本起訂，月曆價錢', to: '都做。1本起訂（數碼），批量300本起上印刷機，月曆價錢' },
  { id: 'E2-cb-faq', count: 2, from: '50 本起訂（數碼印刷），500 本以上柯式更經濟，燙金工藝 100 本起。',
    to: '1 本起訂（數碼印刷），300 本起上印刷機批量更經濟，燙金工藝 100 本起。' },
  { id: 'E3-cb-table1', count: 1, from: '50 本起（燙金 100 本起）', to: '1 本起（燙金 100 本起）' },
  { id: 'E4-cb-table23', count: 2, from: '"50 本起"', to: '"1 本起"' },
];
for (const r of cbRules) runRule({ ...r, file: 'src/data/category-conversion-blocks.ts' });

// ---------- F. blog-data 三语（段锚定）----------
// F1. zh-hk calendar-printing-guide（迷你月曆 desc + 50/500 口径）
const ZHCG = { start: '"calendar-printing-guide"', end: '\n  "' };
runSegRule({ id: 'F1-zhcg-desc', file: 'src/data/blog-data/zh-hk.json', ...ZHCG,
  from: '迷你月曆 1000 本起印，', to: '迷你月曆 1 本起印（批量 300 本起），' });
runSegRule({ id: 'F2-zhcg-50', file: 'src/data/blog-data/zh-hk.json', ...ZHCG,
  from: '數碼 50 本起', to: '數碼 1 本起' });
runSegRule({ id: 'F3-zhcg-500', file: 'src/data/blog-data/zh-hk.json', ...ZHCG,
  from: '柯式 500 本起', to: '柯式 300 本起' });
runSegRule({ id: 'F4-zhcg-500b', file: 'src/data/blog-data/zh-hk.json', ...ZHCG,
  from: '柯式大批量 500 本起', to: '柯式大批量 300 本起' });
// F2. zh-hk 2027-monthly-calendar（100 本起印 floor→1，折扣阶梯保留）
const ZHMC = { start: '"2027-monthly-calendar-printing-timetable"', end: '\n  "' };
runSegRule({ id: 'F5-zhmc-floor', file: 'src/data/blog-data/zh-hk.json', ...ZHMC,
  from: '100 本起印', to: '1 本起印' });
runSegRule({ id: 'F6-zhmc-link', file: 'src/data/blog-data/zh-hk.json', ...ZHMC,
  from: '（4 大類型 100 本起）', to: '（4 大類型 1 本起）' });
// F3. en calendar-printing-guide
const ENCG = { start: '"calendar-printing-guide"', end: '\n  "poster-size-guide"' };
runSegRule({ id: 'F7-en-title', file: 'src/data/blog-data/en.json', ...ENCG,
  from: 'UK/US/AU, 1000pc MOQ |', to: 'UK/US/AU, 1pc MOQ + Bulk 300+ |' });
runSegRule({ id: 'F8-en-desc', file: 'src/data/blog-data/en.json', ...ENCG,
  from: '1000-pc minimum', to: '1-pc minimum' });
runSegRule({ id: 'F9-en-dig', file: 'src/data/blog-data/en.json', ...ENCG,
  from: '1000-pc digital minimum', to: '1-pc digital minimum' });
runSegRule({ id: 'F10-en-min', file: 'src/data/blog-data/en.json', ...ENCG,
  from: 'Minimum order is <strong>1,000 pcs</strong>', to: 'Minimum order is <strong>1 pc</strong>' });
runSegRule({ id: 'F11-en-table', file: 'src/data/blog-data/en.json', ...ENCG,
  from: '<td class=\\"border p-2\\">1,000 pcs minimum</td>', to: '<td class=\\"border p-2\\">1 pc minimum (offset 300+)</td>' });
runSegRule({ id: 'F12-en-faq', file: 'src/data/blog-data/en.json', ...ENCG,
  from: 'A: 1,000 pcs minimum order (offset tier pricing applies', to: 'A: 1 pc minimum order; bulk offset from 300 (tier pricing applies' });
runSegRule({ id: 'F13-en-thresh', file: 'src/data/blog-data/en.json', ...ENCG,
  from: 'from 50 digital pieces to the 500-piece offset threshold', to: 'from 1 digital piece to the 300-piece offset threshold' });
// F4. ja calendar-printing-guide
const JACG = { start: '"calendar-printing-guide"', end: '\n  "poster-size-guide"' };
runSegRule({ id: 'F14-ja-title', file: 'src/data/blog-data/ja.json', ...JACG,
  from: '卓上 1000部から短納期|', to: '卓上 1部から短納期|' });
runSegRule({ id: 'F15-ja-desc', file: 'src/data/blog-data/ja.json', ...JACG,
  from: 'デジタル1000部、レイアウト無料', to: 'デジタル1部から、レイアウト無料' });
runSegRule({ id: 'F16-ja-dig', file: 'src/data/blog-data/ja.json', ...JACG,
  from: 'デジタル1000部', to: 'デジタル1部' });
runSegRule({ id: 'F17-ja-off', file: 'src/data/blog-data/ja.json', ...JACG,
  from: 'オフセット500部', to: 'オフセット300部' });
runSegRule({ id: 'F18-ja-faq', file: 'src/data/blog-data/ja.json', ...JACG,
  from: 'デジタル印刷は1000部から、オフセット印刷は500部からです。', to: 'デジタル印刷は1部から、オフセット印刷は300部からです。' });
runSegRule({ id: 'F19-en-source', file: 'src/data/blog-data/en.json', ...ENCG,
  from: '13-page structure, 1,000 pcs minimum, Q4 peak with late-October confirmation', to: '13-page structure, 1 pc minimum (bulk 300+ offset), Q4 peak with late-October confirmation' });
runSegRule({ id: 'F20-ja-source', file: 'src/data/blog-data/ja.json', ...JACG,
  from: '壁掛けカレンダー製品ページ（1000部から・7〜10営業日・4時間校正・250〜300g）', to: '壁掛けカレンダー製品ページ（1部から・7〜10営業日・4時間校正・250〜300g）' });
runSegRule({ id: 'F21-en-wallpage', file: 'src/data/blog-data/en.json', ...ENCG,
  from: 'wall calendar product page (1,000 pcs minimum, 7-10 business days, 4-hour pro', to: 'wall calendar product page (1 pc minimum, bulk 300+ offset, 7-10 business days, 4-hour pro' });

// ---------- G. blog-posts.ts 两篇月曆博客 excerpt ----------
const bpRules = [
  { id: 'G1-bp-cg-zh', count: 1, from: '迷你月曆 1000 本起印，', to: '迷你月曆 1 本起印（批量 300 本起），' },
  { id: 'G2-bp-cg-en', count: 1, from: 'mini giveaways — 1000-piece MOQ,', to: 'mini giveaways — 1-piece MOQ,' },
  { id: 'G3-bp-cg-ja', count: 1, from: 'ミニ 1000部から。', to: 'ミニ 1部から。' },
  { id: 'G4-bp-mc-zh', count: 1, from: '起印量 100 本起 + 7 個常見問題', to: '起印量 1 本起 + 7 個常見問題' },
  { id: 'G5-bp-mc-en', count: 1, from: 'kraft) + 100 MOQ + 7 FAQs,', to: 'kraft) + 1 MOQ + 7 FAQs,' },
  { id: 'G6-bp-mc-ja', count: 1, from: 'クラフト）+ 100 冊〜 + 7 FAQ、', to: 'クラフト）+ 1 冊〜 + 7 FAQ、' },
];
for (const r of bpRules) runRule({ ...r, file: 'src/data/blog-posts.ts' });

// ---------- H. page.tsx category 硬编码 en meta ----------
runRule({ id: 'H1-pagetsx-en', file: 'src/app/[locale]/category/[slug]/page.tsx', count: 1,
  from: "'en': 'Custom Calendars 2027 late-September window · 1000 MOQ 2027 Desk Wall Hardcover Foil · USA Corporate Gifts',",
  to: "'en': 'Custom Calendars 2027 late-September window · 1 MOQ Bulk 300+ Desk Wall Hardcover Foil · USA Corporate Gifts'," });

console.log(`\n📊 月曆 MOQ=1 批: ${pass} PASS / ${fail} FAIL${APPLY ? '（已寫入）' : '（dry-run, 加 --apply 寫入）'}`);
for (const r of results) if (r.status === 'FAIL') console.log(`  🔴 ${r.rule}: ${r.note || ''}`);
process.exit(fail > 0 ? 1 : 0);
