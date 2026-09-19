/**
 * classify-moq-precision.mjs — 门童 #24 命中精度分类 (K3 2026-09-19 决策「最高优先级」)
 *
 * 输入: .hermes/logs/moq-scan-latest.json (由 `npx tsx scripts/moq10-books-context-scan.ts --json` 落盘)
 * 输出: .hermes/reports/moq-precision-classification-2026-09-19.json (+ .md)
 *
 * 四类 (K3 决策原文):
 *   LOCALE_SPECIFIC_KEEP — 同 locale 内 ≥5 槽位一致声称同一值且与全局真值不同 ⇒ 已核准, 不阻断
 *   NO_MOQ_HOOK          — products.ts 明载为产品线级 MOQ (如 small-batch-stickers 50) ⇒ 已核准, 不生成 MOQ 钩子
 *   TRUE_DRIFT           — 不满足上述, 且声称值 != 真值 ⇒ 阻断, 须修
 *   MANUAL_REVIEW        — **无法自动判定 ⇒ 不猜**, 人工过目
 *
 * 纪律: 分类器不得猜测。任何证据不足一律落 MANUAL_REVIEW (§0.23.2)。
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const TODAY = '2026-09-19';

/* ---- 真值 ---- */
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
      selfText: seg,
    };
  }
  return out;
}

/* ---- 全部 title (用于簇一致性 + locale 判据) ---- */
function parseTitles() {
  const txt = read('src/data/sku-seo-data.ts');
  const starts = [...txt.matchAll(/^(?: {2})?"([a-z0-9-]+)": \{/gm)].map((m) => ({ slug: m[1], idx: m.index }));
  starts.push({ slug: '__END__', idx: txt.length });
  const rows = [];
  for (let i = 0; i < starts.length - 1; i++) {
    const seg = txt.slice(starts[i].idx, starts[i + 1].idx);
    if (!seg.includes('"seo"')) continue;
    for (const loc of ['zh-hk', 'en', 'ja']) {
      const m = seg.match(new RegExp(`"${loc}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
      if (m) rows.push({ slug: starts[i].slug, locale: loc, title: m[1].replace(/\\"/g, '"') });
    }
  }
  return rows;
}
function claimedMoq(title, locale) {
  if (!title) return null;
  if (locale === 'en') {
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

/* ---- 门童命中 ---- */
const scan = JSON.parse(read('.hermes/logs/moq-scan-latest.json'));
const arrKey = ['hits', 'drift', 'findings', 'all'].find((k) => Array.isArray(scan[k]));
if (!arrKey) {
  console.error('找不到命中数组。keys =', Object.keys(scan).join(','), '→ 请检查 --json 输出的形状');
  process.exit(1);
}
const hits = scan[arrKey];
const shape = Object.fromEntries(Object.entries(scan).map(([k, v]) => [k, Array.isArray(v) ? `array[${v.length}]` : typeof v]));
console.log('payload shape:', JSON.stringify(shape));

const products = parseProducts();
const titles = parseTitles();

/* NO_MOQ_HOOK 白名单: products.ts 自载的产品线级 MOQ (不猜 —— 逐条附自证原文) */
function productLineNoHook(slug, claimed, p) {
  if (!p) return null;
  const re = new RegExp(`support[s]?\\s*${claimed}[\\s-]*(?:sticker|pcs|piece)`, 'i');
  if (re.test(p.selfText)) return `products.ts 自载「…support ${claimed}-sticker MOQ for the … line」⇒ 该 SKU 属产品线级口径`;
  return null;
}

const out = [];
let skippedNonTitle = 0;
for (const h of hits) {
  // ★ 作用域收窄 (2026-09-19 实测教训): 门童 findings 混合了 title 行命中与
  //   body/description/品类级散文命中。后者合法地出现各种数量表述
  //   (例「100 張以上更經濟」),对它们套 minQuantity 判 DRIFT = 假阳性洪水。
  //   ⇒ 本分类器**只裁 title 字段** (且限 sku-seo-data.ts —— 该档 title 保证是单 SKU 标量)。
  const isTitleHit = String(h.file || '').includes('sku-seo-data') && /"title"\s*:\s*"/.test(String(h.text || ''));
  if (!isTitleHit) { skippedNonTitle++; continue; }

  const slug = h.slug;
  const p = products[slug];
  const truth = h.truth ?? p?.minQuantity ?? null;
  const claimed = h.found ?? null;
  // 从 title 集合定位该 slug+locale 的标题 (用于 locale / 簇判据)
  const hitText = String(h.text || '');
  const cand = titles.find((t) => t.slug === slug && hitText.includes(t.title.slice(0, 18)));
  const locale = cand?.locale || null;
  const category = p?.category || null;

  let cls, reason;

  if (truth == null) { cls = 'MANUAL_REVIEW'; reason = 'products.ts 无该 slug 的 minQuantity ⇒ 真值不明, 不猜'; }
  else if (claimed == null) { cls = 'MANUAL_REVIEW'; reason = '未能从命中文本解析出声称值 ⇒ 不猜'; }
  else if (claimed === truth) { cls = 'MANUAL_REVIEW'; reason = `声称 == 真值 (${claimed}); 命中可能来自非 MOQ 语境 (如件数/单价) ⇒ 人工确认`; }
  else {
    const pline = productLineNoHook(slug, claimed, p);
    // 簇一致性: 同 category+locale 下声称同一值的槽位数
    const peers = titles.filter((t) => {
      const c = products[t.slug]?.category;
      return c === category && t.locale === locale && claimedMoq(t.title, t.locale) === claimed;
    }).length;
    const peerTotal = titles.filter((t) => products[t.slug]?.category === category && t.locale === locale).length;

    if (pline) { cls = 'NO_MOQ_HOOK'; reason = pline; }
    else if (locale && locale !== 'zh-hk' && peers >= 5 && peers === peerTotal) { cls = 'LOCALE_SPECIFIC_KEEP'; reason = `同簇 (${category}/${locale}) 全部 ${peerTotal} 条一致声称 ${claimed} (与全局真值 ${truth} 不同) ⇒ 市场级约定`; }
    else if (locale && locale !== 'zh-hk' && peers >= 5) { cls = 'LOCALE_SPECIFIC_KEEP'; reason = `同簇 (${category}/${locale}) ${peers}/${peerTotal} 条声称 ${claimed} (≥5) ⇒ 疑为市场级约定`; }
    else if (locale && peers >= 5) { cls = 'MANUAL_REVIEW'; reason = `zh-hk 簇 ${peers}/${peerTotal} 条声称 ${claimed} ⇒ 可能是本 SKU 群真值口径, 但 zh-hk 无「市场差异」理由 ⇒ 人工判定`; }
    else { cls = 'TRUE_DRIFT'; reason = `声称 ${claimed} != 真值 ${truth}; 无产品线自证、无 ≥5 簇约定`; }
  }

  out.push({ slug, locale, category, kind: h.kind, claimed, truth, cls, reason, line: h.line, file: h.file, text: hitText.slice(0, 110) });
}

const counts = out.reduce((m, r) => ((m[r.cls] = (m[r.cls] || 0) + 1), m), {});
const payload = {
  schema: 'moq-precision-classification-v1',
  generatedFor: TODAY,
  calibration: `${TODAY} ${new Date().toISOString().slice(11, 16)} UTC`,
  source: { gatePayload: '.hermes/logs/moq-scan-latest.json', arrayKey: arrKey, hitCount: hits.length, scanPayloadShape: shape },
  scope: `仅 title 字段命中 (file 含 sku-seo-data 且 text 含 "title":)。门童 findings 共 ${hits.length} 条, 其中 ${skippedNonTitle} 条为 body/description/品类级散文命中, **不在本表裁决范围** (对其套 minQuantity 判 DRIFT = 洪水式假阳性)。`,
  rule: 'K3 2026-09-19: LOCALE_SPECIFIC_KEEP (同locale≥5一致) / NO_MOQ_HOOK (产品线自证) / TRUE_DRIFT / MANUAL_REVIEW (不猜)',
  counts,
  skippedNonTitleHits: skippedNonTitle,
  items: out,
};
const dir = path.join(ROOT, '.hermes/reports');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, `moq-precision-classification-${TODAY}.json`), JSON.stringify(payload, null, 1));

const md = [];
md.push(`# 门童 #24 命中精度分类 (${TODAY})`);
md.push('');
md.push(`校准日期: ${payload.calibration}`);
md.push('');
md.push(`> 输入: \`${payload.source.gatePayload}\` (数组键 \`${arrKey}\`, 命中 **${hits.length}** 条)`);
md.push(`> 规则: ${payload.rule}`);
md.push('> **纪律: 无法自动判定一律落 MANUAL_REVIEW, 不猜** (§0.23.2)');
md.push('');
md.push('## 分类汇总');
md.push('');
md.push('| 类别 | 条数 | 门禁行为 |');
md.push('|---|---|---|');
md.push(`| TRUE_DRIFT | ${counts.TRUE_DRIFT || 0} | **阻断, 须修** |`);
md.push(`| MANUAL_REVIEW | ${counts.MANUAL_REVIEW || 0} | 人工过目 (不阻塞其他批次) |`);
md.push(`| LOCALE_SPECIFIC_KEEP | ${counts.LOCALE_SPECIFIC_KEEP || 0} | 已核准桶, 不阻断 |`);
md.push(`| NO_MOQ_HOOK | ${counts.NO_MOQ_HOOK || 0} | 已核准桶, 生成器不发 MOQ 钩子 |`);
md.push('');
for (const cls of ['TRUE_DRIFT', 'MANUAL_REVIEW', 'LOCALE_SPECIFIC_KEEP', 'NO_MOQ_HOOK']) {
  const sub = out.filter((r) => r.cls === cls);
  if (!sub.length) continue;
  md.push(`## ${cls} (${sub.length})`);
  md.push('');
  md.push('| slug | locale | 类别 | 声称 | 真值 | 行 | 理由 |');
  md.push('|---|---|---|---|---|---|---|');
  for (const r of sub.slice(0, 60)) md.push(`| ${r.slug} | ${r.locale || '-'} | ${r.category || '-'} | ${r.claimed} | ${r.truth} | ${r.line} | ${r.reason} |`);
  if (sub.length > 60) md.push(`| … | | | | | | 另有 ${sub.length - 60} 条, 见 JSON |`);
  md.push('');
}
fs.writeFileSync(path.join(dir, `moq-precision-classification-${TODAY}.md`), md.join('\n'));

console.log(JSON.stringify(counts, null, 1));
console.log(`\nTRUE_DRIFT sample:`);
for (const r of out.filter((x) => x.cls === 'TRUE_DRIFT').slice(0, 10)) console.log(`  ${r.slug}/${r.locale || '-'}\t称 ${r.claimed} vs ${r.truth}\t${r.reason.slice(0, 70)}`);
console.log(`\nreport: .hermes/reports/moq-precision-classification-${TODAY}.md`);
