/**
 * resolve-moq-conflicts.mjs — MOQ 冲突裁决 (阶段三前置, K3 2026-09-19 指令)
 *
 * 真值来源优先级 (K3 纪律): **最新 K3 裁决 > products.ts 当前值**
 *   (products.ts 本身可能滞后于裁决)
 *
 * 已纳入的裁决基线:
 *   - 4593937c (09-19 11:56) 第一波: 紙品線 (傳單/貼紙/賀卡) 100→10, 22 SKU
 *   - bb2a1f71 (09-19 16:47) 第三波: 書刊本冊 100→10
 *   - c18107a0 (09-19 19:43) a2-posters 100→10 + 明示「餐牌 【50本起訂】 vs 真值 100」为矛盾(已移除 features 版)
 *
 * 判定 (逐 locale 独立, **不强行统一**):
 *   ALIGNED      — 标题声称 == 真值; 或 products.ts 文本自证该 SKU 有独立口径
 *   PENDING_K3   — 同 category+locale 全体一致声称同一值 (疑为市场/产品线约定), 无法自证
 *   DRIFT        — 与裁决真值冲突, 且无任何自证证据
 *
 * 用法: node scripts/resolve-moq-conflicts.mjs
 * 输出: .hermes/reports/moq-conflict-resolution.json (+ .md)
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const TODAY = '2026-09-19';

/* ---- 真值: products.ts ---- */
function parseProducts() {
  const txt = read('src/data/products.ts');
  const re = /^ {4}slug: '([a-z0-9-]+)',/gm;
  const starts = [...txt.matchAll(re)].map((m) => ({ slug: m[1], idx: m.index }));
  starts.push({ slug: '__END__', idx: txt.length });
  const out = {};
  for (let i = 0; i < starts.length - 1; i++) {
    const seg = txt.slice(starts[i].idx, starts[i + 1].idx);
    const g = (r) => { const m = seg.match(r); return m ? m[1] : null; };
    out[starts[i].slug] = {
      category: g(/category_slug:\s*'([a-z0-9-]+)'/),
      minQuantity: g(/minQuantity:\s*(\d+)/) ? Number(g(/minQuantity:\s*(\d+)/)) : null,
      // 自证语料: 描述/正文/features/quantities 里出现的起印量声明
      selfText: (seg.match(/(?:description|body|features|quantities)[\s\S]{0,1200}/) || [''])[0],
    };
  }
  return out;
}

/* ---- 现状: 全部 title (按 category+locale 分组, 用于「簇一致性」判据) ---- */
function parseTitles(catOf) {
  const txt = read('src/data/sku-seo-data.ts');
  const starts = [...txt.matchAll(/^(?: {2})?"([a-z0-9-]+)": \{/gm)].map((m) => ({ slug: m[1], idx: m.index }));
  starts.push({ slug: '__END__', idx: txt.length });
  const rows = [];
  for (let i = 0; i < starts.length - 1; i++) {
    const seg = txt.slice(starts[i].idx, starts[i + 1].idx);
    if (!seg.includes('"seo"')) continue;
    for (const loc of ['zh-hk', 'en', 'ja']) {
      const m = seg.match(new RegExp(`"${loc}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
      if (!m) continue;
      rows.push({ slug: starts[i].slug, locale: loc, title: m[1].replace(/\\"/g, '"'), category: catOf[starts[i].slug] || null });
    }
  }
  return rows;
}

/* ---- 起印量声明抽取 (与 input-bank 同口径) ---- */
function claimedMoq(title, locale) {
  if (!title) return null;
  if (locale === 'en') {
    // ★ 假阳性修正: 裸 `(\d{1,4})\s*pcs` 会把「6 Pcs」(套装件数) 误判为起订量。
    //   本站 MOQ 全 ≥10 ⇒ pcs 回退要求 **2 位数以上**, 单数字(1-9 Pcs=件数)排除。
    const m = title.match(/(\d{1,4})\s*(?:pcs\s*)?MOQ/i) || title.match(/MOQ\s*[:：]?\s*(\d{1,4})/i) || title.match(/(\d{2,4})\s*pcs/i);
    return m ? Number(m[1]) : null;
  }
  if (locale === 'ja') {
    const m = title.match(/(\d{1,4})\s*(?:枚|部|冊|本|セット|個)〜/) || title.match(/(\d{1,4})\s*(?:枚|部|冊|本|セット|個)から/);
    return m ? Number(m[1]) : null;
  }
  const m = title.match(/(\d{1,4})\s*(?:張|個|本|套|份|枚)?起印/) || title.match(/(\d{1,4})\s*(?:張|個|本|套|份)起/);
  return m ? Number(m[1]) : null;
}

const products = parseProducts();
const catOf = Object.fromEntries(Object.entries(products).map(([k, v]) => [k, v.category]));
const allTitles = parseTitles(catOf);

/* ---- 人工核定的自证证据 (来自 products.ts 文本 + K3 裁决原文) ---- */
// 键 = slug; 值 = { claimed, verdict, evidence }
const ATTESTED = {
  'small-batch-stickers': {
    verdict: 'PENDING_K3',
    evidence: '★ 引用已更正 (2026-09-19): 自证句「We support 50-sticker MOQ for the small-batch line」位于 **src/data/sku-seo-data.ts 的 en FAQ 答案**, 不在 products.ts (前版误引)。该 SKU 自身即小批量产品线, 50 可能是产品线固有口径; 但 4593937c 把貼紙線统一为 10 ⇒ 两者冲突, 须 K3 定「产品线口径」是否高于「品类线口径」',
  },
  'pvc-menus': { verdict: 'DRIFT', evidence: '★裁决已点名: c18107a0 明示「餐牌 【50本起訂】 vs 真值 100」为矛盾并移除 features 版; 标题版残留' },
  'laminated-menus': { verdict: 'DRIFT', evidence: '★同上 (c18107a0 餐牌 真值 100, 【50本起訂】判为矛盾)' },
  'hardcover-menus': { verdict: 'DRIFT', evidence: '★同上 (c18107a0 餐牌 真值 100)' },
  'drink-menus': { verdict: 'DRIFT', evidence: '★同上 (c18107a0 餐牌 真值 100)' },
  'premium-greeting-cards': { verdict: 'DRIFT', evidence: '4593937c 第一波明列「紙品線 (傳單/貼紙/賀卡) 100→10」⇒ 賀卡真值=10, 标题 100 为残留' },
  'art-posters': { verdict: 'DRIFT', evidence: 'cc1d5293 (20:03) art-posters 真值批次已落; 标题「100枚〜」与真值 1 冲突' },
};

const conflicts = [];
for (const r of allTitles) {
  const p = products[r.slug];
  if (!p || p.minQuantity == null) continue;
  const claimed = claimedMoq(r.title, r.locale);
  if (claimed == null || claimed === p.minQuantity) continue;

  const att = ATTESTED[r.slug];
  // 簇一致性: 同 category + locale 下, 声称同一值的 SKU 数
  const peers = allTitles.filter((x) => x.category === r.category && x.locale === r.locale && claimedMoq(x.title, x.locale) === claimed);
  const peerTotal = allTitles.filter((x) => x.category === r.category && x.locale === r.locale).length;

  // products.ts 自证: 该 SKU 文本内是否出现同一数字 + 起印语素
  const selfCorrob = new RegExp(`(?:${claimed}\\s*(?:張|個|本|套|份|枚|pcs|MOQ))`, 'i').test(p.selfText);

  let verdict, reason, moqStatus;
  if (att) { verdict = att.verdict; reason = att.evidence; }
  else if (selfCorrob) { verdict = 'ALIGNED'; reason = `products.ts 自身文本含「${claimed} 起印」⇒ 该 SKU 有独立口径, 非漂移`; }
  else if (r.locale !== 'zh-hk' && peers.length >= 3 && peers.length === peerTotal) {
    verdict = 'PENDING_K3';
    reason = `同簇 (${r.category}/${r.locale}) 全部 ${peerTotal} 条一致声称 ${claimed} ⇒ 疑为分市场/产品线约定, 与全局真值 ${p.minQuantity} 并存, 须 K3 定口径层级`;
    // ★ K3 2026-09-19 决策 3: 高一致性挂起项标 LOCALE_SPECIFIC_KEEP,
    //   防生成器/后续批次误当 DRIFT 「修正」为全局值 (强改为 10 会砸掉 ja 市场约定)。
    if (r.locale === 'ja') moqStatus = 'LOCALE_SPECIFIC_KEEP';
  } else { verdict = 'DRIFT'; reason = `无自证、无簇约定; 与裁决真值 ${p.minQuantity} 直接冲突`; }

  conflicts.push({
    slug: r.slug, locale: r.locale, category: r.category,
    claimed, truth: p.minQuantity, verdict, reason,
    moqStatus: moqStatus || (verdict === 'DRIFT' ? 'USE_RULING_TRUTH' : verdict === 'ALIGNED' ? 'USE_PRODUCTS_TRUTH' : 'NO_MOQ_HOOK'),
    clusterPeers: `${peers.length}/${peerTotal}`,
    title: r.title,
  });
}

// 批次归属 (复用 census 的 batch)
let batchOf = () => null;
try {
  const c = JSON.parse(read('.hermes/reports/sku-title-census-2026-09-19.json'));
  const idx = {};
  for (const row of c.rows) idx[`${row.slug}|${row.locale}`] = row.batch;
  batchOf = (slug, locale) => idx[`${slug}|${locale}`] || null;
} catch { /* census JSON 未生成则留空 */ }
for (const c of conflicts) c.batch = batchOf(c.slug, c.locale);

const counts = conflicts.reduce((m, c) => ((m[c.verdict] = (m[c.verdict] || 0) + 1), m), {});
const out = {
  schema: 'moq-conflict-resolution-v1',
  generatedFor: TODAY,
  calibration: `${TODAY} ${new Date().toISOString().slice(11, 16)} UTC`,
  truthPriority: '最新 K3 裁决 > products.ts 当前值 (products.ts 可能滞后于裁决)',
  rulingBaseline: [
    '4593937c (09-19 11:56) 第一波 紙品線 (傳單/貼紙/賀卡) 100→10, 22 SKU',
    'bb2a1f71 (09-19 16:47) 第三波 書刊本冊 100→10',
    'c18107a0 (09-19 19:43) a2-posters 100→10; 明示 餐牌【50本起訂】vs 真值 100 为矛盾',
  ],
  counts,
  conflicts,
};

const dir = path.join(ROOT, '.hermes/reports');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, `moq-conflict-resolution-${TODAY}.json`), JSON.stringify(out, null, 1));

const md = [];
md.push(`# MOQ 冲突裁决表 (${TODAY})`);
md.push('');
md.push(`校准日期: ${out.calibration}`);
md.push('');
md.push(`> **真值优先级**: ${out.truthPriority}`);
md.push('> 裁决基线:');
for (const r of out.rulingBaseline) md.push(`> - ${r}`);
md.push('');
md.push(`## 汇总: 冲突 ${conflicts.length} 条`);
md.push('');
md.push('| 判定 | 条数 | 含义 |');
md.push('|---|---|---|');
md.push(`| ALIGNED | ${counts.ALIGNED || 0} | 有自证 ⇒ 合法, **不改** |`);
md.push(`| DRIFT | ${counts.DRIFT || 0} | 与裁决真值冲突 ⇒ **须修** |`);
md.push(`| PENDING_K3 | ${counts.PENDING_K3 || 0} | 疑为分市场/产品线口径 ⇒ **挂起, 不阻塞其他批次** |`);
md.push('');
for (const v of ['DRIFT', 'PENDING_K3', 'ALIGNED']) {
  const sub = conflicts.filter((c) => c.verdict === v);
  if (!sub.length) continue;
  md.push(`## ${v} (${sub.length} 条)`);
  md.push('');
  md.push('| slug | locale | 类别 | 标题声称 | 真值 | 簇一致 | 批次 | 理由 |');
  md.push('|---|---|---|---|---|---|---|---|');
  for (const c of sub) md.push(`| ${c.slug} | ${c.locale} | ${c.category || '-'} | ${c.claimed} | ${c.truth} | ${c.clusterPeers} | ${c.batch || '-'} | ${c.reason} |`);
  md.push('');
}
fs.writeFileSync(path.join(dir, `moq-conflict-resolution-${TODAY}.md`), md.join('\n'));

console.log(JSON.stringify(counts, null, 1));
console.log('\n=== DRIFT (须修) ===');
for (const c of conflicts.filter((x) => x.verdict === 'DRIFT')) console.log(`  ${c.slug}/${c.locale}\t称 ${c.claimed} vs 真值 ${c.truth}\t簇 ${c.clusterPeers}\t${c.batch || '-'}`);
console.log('\n=== PENDING_K3 (挂起) ===');
for (const c of conflicts.filter((x) => x.verdict === 'PENDING_K3')) console.log(`  ${c.slug}/${c.locale}\t称 ${c.claimed} vs 真值 ${c.truth}\t簇 ${c.clusterPeers}\t${c.batch || '-'}`);
console.log('\n=== ALIGNED (不改) ===');
for (const c of conflicts.filter((x) => x.verdict === 'ALIGNED')) console.log(`  ${c.slug}/${c.locale}\t称 ${c.claimed} vs 真值 ${c.truth}`);
console.log(`\nreport: .hermes/reports/moq-conflict-resolution-${TODAY}.md`);
