/**
 * build-title-input-bank.mjs — 标题生成输入银行 (阶段二 · K3 2026-09-19 两天冲刺方案)
 *
 * 合并三源 → 每条违规槽位的「生成输入」:
 *   ① src/data/products.ts  → minQuantity / price_range / basePrice(3语) / specs / features
 *   ② .hermes/gsc-2026-09-18/extract.json (GSC 28d) → 同簇候选词 (query / imps / pos / clicks)
 *   ③ .hermes/reports/sku-title-census-2026-09-19.json → 当前 title / 当量 / band / 批次 / 问题
 *
 * ★ 内置 MOQ 一致性自检 (a2「1張起印」事故固化):
 *   扫描每条当前 title 中的起印量声明, 与 products.ts minQuantity 比对,
 *   不一致即标 MOQ_MISMATCH —— 把「数字钩子必须有来源」变成可执行断言。
 *
 * 用法: node scripts/build-title-input-bank.mjs
 * 输出: .hermes/reports/title-input-bank-2026-09-19.json + .md
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const TODAY = '2026-09-19';
const LOCALES = ['zh-hk', 'en', 'ja'];

/* ---------- ① products.ts ---------- */
function parseProducts() {
  const txt = read('src/data/products.ts');
  // ★ 2026-09-19 实测: products.ts 的 slug 行缩进 = **4 空格** (不是 2)。
  //   教训同 error-patterns.md「② 嵌套结构陷阱」: 盲目假设缩进 ⇒ 整档解析出 0 条 = 假零。
  const re = /^ {4}slug: '([a-z0-9-]+)',/gm;
  const starts = [...txt.matchAll(re)].map((m) => ({ slug: m[1], idx: m.index }));
  starts.push({ slug: '__END__', idx: txt.length });
  const out = {};
  for (let i = 0; i < starts.length - 1; i++) {
    const seg = txt.slice(starts[i].idx, starts[i + 1].idx);
    const g = (r) => { const m = seg.match(r); return m ? m[1] : null; };
    const specsSeg = (seg.match(/specs: \{[\s\S]{0,900}?\n {4}\}/) || [''])[0];
    const specs = {};
    for (const k of ['material', 'size', 'printMethod', 'finishing']) {
      const m = specsSeg.match(new RegExp(`${k}:\\s*'([^']*)'`));
      if (m) specs[k] = m[1];
    }
    const featsSeg = (seg.match(/features: \[[\s\S]{0,1200}?\n {4}\]/) || [''])[0];
    const features = [...featsSeg.matchAll(/'([^']{4,90})'/g)].map((m) => m[1]);
    out[starts[i].slug] = {
      category: g(/category_slug:\s*'([a-z0-9-]+)'/),
      minQuantity: g(/minQuantity:\s*(\d+)/) ? Number(g(/minQuantity:\s*(\d+)/)) : null,
      price_range: g(/price_range:\s*'([^']*)'/),
      basePrice: g(/^ {4}basePrice:\s*([\d.]+)/m) ? Number(g(/^ {4}basePrice:\s*([\d.]+)/m)) : null,
      basePrice_en: g(/basePrice_en:\s*([\d.]+)/) ? Number(g(/basePrice_en:\s*([\d.]+)/)) : null,
      basePrice_ja: g(/basePrice_ja:\s*([\d.]+)/) ? Number(g(/basePrice_ja:\s*([\d.]+)/)) : null,
      specs,
      features: features.slice(0, 6),
    };
  }
  return out;
}

/* ---------- ② GSC 同簇候选词 ---------- */
const CLUSTER = {
  stickers: ['貼紙', 'sticker', 'ステッカー', 'シール', 'label', '標籤'],
  flyers: ['傳單', '單張', 'flyer', 'leaflet', 'チラシ'],
  packaging: ['包裝盒', '紙盒', '禮盒', 'box', 'packaging', '箱', 'パッケージ'],
  'paper-bags': ['紙袋', 'paper bag', '袋'],
  posters: ['海報', 'poster', 'ポスター'],
  books: ['書籍', '畫冊', '騎馬釘', '膠裝', 'book', 'catalog', 'booklet', '冊子'],
  calendars: ['月曆', '月歷', '日曆', 'calendar', 'カレンダー'],
  'red-packets': ['利是封', 'red packet', 'envelope', 'ポチ袋'],
  menus: ['餐牌', '菜單', 'menu', 'メニュー'],
  banners: ['橫幅', '橫額', '易拉', 'banner', 'バナー'],
  envelopes: ['信封', '封筒'],
  educational: ['教材', '證書', '校園', '校簿', '校刊', 'education', 'school', 'certificate'],
  'greeting-cards': ['賀卡', '賀咭', 'greeting', 'カード'],
  posters_a1a2: ['a1', 'a2'],
};
function loadGsc() {
  const g = JSON.parse(read('.hermes/gsc-2026-09-18/extract.json'));
  const rows = g?.new?.combo_28d?.['查询数'] || [];
  const out = [];
  for (const r of rows) {
    // ★ 实测字段名 = 「热门查询」(不是「排名靠前的查询」) —— 猜错即整源解析出 0 条 (假零)。
    const q = r['热门查询'] || r['查询'];
    if (!q) continue;
    out.push({ q, clicks: r['点击次数'] ?? 0, imps: r['展示'] ?? 0, ctr: r['点击率'] ?? 0, pos: r['排名'] ?? null });
  }
  return out;
}
function gscCandidates(gsc, category) {
  const toks = CLUSTER[category];
  if (!toks) return [];
  return gsc
    .filter((r) => r.imps >= 3 && toks.some((t) => r.q.toLowerCase().includes(t.toLowerCase())))
    .filter((r) => /印刷|訂製|訂做|订制|printing|print|custom|作成|製作|poster|sticker/.test(r.q))
    .sort((a, b) => b.imps - a.imps)
    .slice(0, 8);
}

/* ---------- ★ MOQ 一致性自检 ---------- */
function claimedMoq(title, locale) {
  if (!title) return null;
  if (locale === 'en') {
    const m = title.match(/(\d{1,4})\s*(?:pcs\s*)?MOQ/i) || title.match(/MOQ\s*[:：]?\s*(\d{1,4})/i) || title.match(/(\d{1,4})\s*pcs/i);
    return m ? Number(m[1]) : null;
  }
  if (locale === 'ja') {
    const m = title.match(/(\d{1,4})\s*(?:枚|部|冊|本|セット)〜/) || title.match(/(\d{1,4})\s*(?:枚|部|冊|本|セット)から/);
    return m ? Number(m[1]) : null;
  }
  const m = title.match(/(\d{1,4})\s*(?:張|個|本|套|份|枚)?起/) || title.match(/(\d{1,4})\s*(?:張|個|本|套|份)起印/);
  return m ? Number(m[1]) : null;
}

/* ---------- 主 ---------- */
const products = parseProducts();
const gsc = loadGsc();
const census = JSON.parse(read('.hermes/reports/sku-title-census-2026-09-19.json'));

const violations = census.rows.filter((r) => r.band !== 'OK');
const bySlug = {};
for (const r of violations) (bySlug[r.slug] = bySlug[r.slug] || []).push(r);

const skus = {};
const moqMismatch = [];
for (const [slug, slots] of Object.entries(bySlug)) {
  const p = products[slug] || {};
  const entry = {
    slug,
    category: p.category || slots[0].category || null,
    moq: p.minQuantity ?? null,
    price_range: p.price_range ?? null,
    basePrice: { 'zh-hk': p.basePrice ?? null, en: p.basePrice_en ?? null, ja: p.basePrice_ja ?? null },
    specs: p.specs || {},
    features: p.features || [],
    gscCandidates: gscCandidates(gsc, p.category || slots[0].category),
    slots: {},
  };
  for (const r of slots) {
    const claimed = claimedMoq(r.title, r.locale);
    const mismatch = claimed != null && p.minQuantity != null && claimed !== p.minQuantity;
    if (mismatch) moqMismatch.push({ slug, locale: r.locale, claimed, truth: p.minQuantity, batch: r.batch, title: r.title });
    entry.slots[r.locale] = {
      current_title: r.title,
      equiv: r.equiv,
      band: r.band,
      batch: r.batch,
      imps: r.gsc?.imps ?? null,
      pos: r.gsc?.pos != null ? Number(r.gsc.pos.toFixed(2)) : null,
      ctr: r.gsc?.ctr ?? null,
      issues: r.issues,
      claimedMoq: claimed,
      moqConsistent: claimed == null || p.minQuantity == null ? null : claimed === p.minQuantity,
    };
  }
  skus[slug] = entry;
}

const bank = {
  schema: 'title-input-bank-v1',
  generatedFor: TODAY,
  calibration: `${TODAY} ${new Date().toISOString().slice(11, 16)} UTC`,
  rule: { min: 50, max: 57, hardMax: 58, sot: 'scripts/guards/title-equiv.js' },
  sources: {
    products: 'src/data/products.ts',
    gsc: '.hermes/gsc-2026-09-18/extract.json (combo_28d, 窗口 2026-08-19~09-15)',
    census: '.hermes/reports/sku-title-census-2026-09-19.json',
  },
  counts: {
    violatingSkus: Object.keys(skus).length,
    violatingSlots: violations.length,
    withMoqTruth: Object.values(skus).filter((s) => s.moq != null).length,
    withPriceRange: Object.values(skus).filter((s) => s.price_range).length,
    withSpecs: Object.values(skus).filter((s) => Object.keys(s.specs).length).length,
    withGscCandidates: Object.values(skus).filter((s) => s.gscCandidates.length).length,
    moqMismatch: moqMismatch.length,
  },
  moqMismatch,
  skus,
};

const dir = path.join(ROOT, '.hermes/reports');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, `title-input-bank-${TODAY}.json`), JSON.stringify(bank, null, 1));

const md = [];
md.push(`# 标题生成输入银行 (${TODAY})`);
md.push('');
md.push(`校准日期: ${bank.calibration}`);
md.push('');
md.push('> 三源合并: `products.ts` (数字真值) + GSC 28d (同簇候选词) + census (现状)');
md.push(`> **违规 SKU ${bank.counts.violatingSkus} 个 / 槽位 ${bank.counts.violatingSlots} 条**`);
md.push('');
md.push('## 数据完备度');
md.push('');
md.push('| 维度 | 有数据 | 说明 |');
md.push('|---|---|---|');
md.push(`| MOQ 真值 | ${bank.counts.withMoqTruth}/${bank.counts.violatingSkus} | products.ts minQuantity |`);
md.push(`| 价格区间 | ${bank.counts.withPriceRange}/${bank.counts.violatingSkus} | products.ts price_range |`);
md.push(`| specs (材质/尺寸/工艺) | ${bank.counts.withSpecs}/${bank.counts.violatingSkus} | 标题工艺修饰来源 |`);
md.push(`| GSC 同簇候选词 | ${bank.counts.withGscCandidates}/${bank.counts.violatingSkus} | 长尾词 3 筛选素材 |`);
md.push('');
md.push(`## ★ MOQ 一致性自检: ${moqMismatch.length} 条不一致 (a2「1張起印」同类)`.replace('${moqMismatch.length}', String(moqMismatch.length)));
md.push('');
if (moqMismatch.length) {
  md.push('| slug | locale | 标题声称 | products.ts 真值 | 批次 | 当前 title |');
  md.push('|---|---|---|---|---|---|');
  for (const m of moqMismatch) md.push(`| ${m.slug} | ${m.locale} | ${m.claimed} | ${m.truth} | ${m.batch} | ${m.title.slice(0, 60)} |`);
} else {
  md.push('✅ 无 MOQ 声明与真值冲突 (所有标题的起印量声明与 products.ts minQuantity 一致)');
}
md.push('');
md.push('## 逐 SKU 输入 (按违规槽位展示数降序)');
md.push('');
const ordered = Object.values(skus).sort((a, b) => {
  const ai = Math.max(...Object.values(a.slots).map((s) => s.imps || 0));
  const bi = Math.max(...Object.values(b.slots).map((s) => s.imps || 0));
  return bi - ai;
});
for (const s of ordered.slice(0, 40)) {
  md.push(`### ${s.slug}  ·  ${s.category || '-'}  ·  MOQ ${s.moq ?? '-'}  ·  ${s.price_range || '-'}`);
  if (Object.keys(s.specs).length) md.push(`- specs: ${Object.entries(s.specs).map(([k, v]) => `${k}=${v}`).join(' / ')}`);
  if (s.features.length) md.push(`- features: ${s.features.slice(0, 3).join(' / ')}`);
  if (s.gscCandidates.length) md.push(`- GSC 同簇候选词: ${s.gscCandidates.slice(0, 4).map((c) => `${c.q}(${c.imps}imp/pos${c.pos != null ? Number(c.pos).toFixed(1) : '-'})`).join(' · ')}`);
  md.push('');
  md.push('| locale | band | 当量 | 展示 | 位置 | 批次 | 当前 title |');
  md.push('|---|---|---|---|---|---|---|');
  for (const [loc, v] of Object.entries(s.slots)) {
    md.push(`| ${loc} | ${v.band} | ${v.equiv} | ${v.imps ?? '-'} | ${v.pos ?? '-'} | ${v.batch} | ${(v.current_title || '').slice(0, 58)} |`);
  }
  md.push('');
}
fs.writeFileSync(path.join(dir, `title-input-bank-${TODAY}.md`), md.join('\n'));

console.log(JSON.stringify(bank.counts, null, 1));
console.log('\n=== ★ MOQ 一致性自检 ===');
if (!moqMismatch.length) console.log('  ✅ 0 条不一致 (标题起印量声明 与 products.ts minQuantity 全部一致)');
for (const m of moqMismatch) console.log(`  🔴 ${m.slug}/${m.locale}: 标题称 ${m.claimed} vs 真值 ${m.truth} (${m.batch})`);
console.log(`\nreport: .hermes/reports/title-input-bank-${TODAY}.md`);
