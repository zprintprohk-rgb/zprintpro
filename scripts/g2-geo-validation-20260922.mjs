// g2-geo-validation-2026-09-22.mjs — GEO-G2 验证批探针
// 6 PDP × (线上 JSON-LD 断言 + validator.schema.org URL 模式)
// 断言口径: ProcureAction / eligibleQuantity(minValue=products.ts minQuantity) 解析无错
//           sourcingIntentKeywords / ProcureAction 自定义字段 = 预期「未知字段」级提示, 不算 FAIL
//           FOB = 0; businessFunction=GR Sell; 三语 unitText 正确
// 数据来源: 线上 https://zprintpro.com (2026-09-22 抓取) + src/data/products.ts (本地真值) + validator.schema.org API
import { writeFileSync, readFileSync } from 'fs';

const BASE = 'https://zprintpro.com';
// 6 页: 建议 3 页 + 自选 3 页 (GSC imps≥30 优先)
const PAGES = [
  { slug: 'a5-flyers', locale: 'zh-hk', note: 'R2 验证窗槽 (只读观测, 不动 title)' },
  { slug: 'waterproof-stickers', locale: 'en', note: 'G1 探针页' },
  { slug: 'mini-calendars', locale: 'ja', note: 'G1 探针页' },
  { slug: 'small-batch-stickers', locale: 'en', note: '自选, GSC en imps 246 (P0)' },
  { slug: 'saddle-stitch-booklets', locale: 'en', note: '自选, GSC en imps 181 (P0)' },
  { slug: 'double-sided-flyers', locale: 'ja', note: '自选, GSC ja imps 48; R2 验证窗槽 (只读观测)' },
];

// --- 本地真值: products.ts minQuantity (以 src/data/products.ts 为准, 6 slug) ---
// 用正则从 products.ts 抽 minQuantity (只信源文件)
const pts = readFileSync('src/data/products.ts', 'utf8');
function truth(slug) {
  // 找 slug: 'xxx' 所在产品块, 抽 minQuantity / basePrice / basePrice_en / basePrice_ja / price_range / turnaround / unitLabel
  const idx = pts.indexOf(`slug: '${slug}'`);
  if (idx < 0) return null;
  const tail = pts.slice(idx, idx + 20000);
  const grab = (k, dflt) => { const m = tail.match(new RegExp(`${k}:\\s*([^,\\n}]+)`)); return m ? m[1].trim().replace(/'/g, '') : dflt; };
  return {
    minQuantity: Number(grab('minQuantity', 'NaN')),
    basePrice: grab('basePrice', ''),
    basePrice_en: grab('basePrice_en', ''),
    basePrice_ja: grab('basePrice_ja', ''),
    price_range: grab('price_range', ''),
    turnaround: grab('turnaround', ''),
    unitLabel: grab('unitLabel', ''),
    category: grab('category', ''),
  };
}

function extractJsonLd(html) {
  const blocks = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    let txt = m[1].trim();
    txt = txt.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
    try { blocks.push(JSON.parse(txt)); } catch (e) { blocks.push({ __parseError: e.message, __raw: txt.slice(0, 300) }); }
  }
  return blocks;
}

function findProduct(node, out = []) {
  if (!node || typeof node !== 'object') return out;
  if (node['@type'] === 'Product' || (Array.isArray(node['@type']) && node['@type'].includes('Product'))) out.push(node);
  for (const v of Object.values(node)) {
    if (Array.isArray(v)) v.forEach((x) => findProduct(x, out));
    else if (v && typeof v === 'object') findProduct(v, out);
  }
  return out;
}

const EXPECTED_ERR = (e) => {
  const a = (e.args || []).join(' ');
  return (e.errorType === 'INVALID_ITEMTYPE' && /ProcureAction/.test(a)) ||
         (e.errorType === 'INVALID_OBJECT' && /ProcureAction/.test(a)) ||
         (e.errorType === 'INVALID_PREDICATE' && /sourcingIntentKeywords/.test(a));
};

const results = [];
for (const p of PAGES) {
  const url = `${BASE}/${p.locale}/product/${p.slug}/`;
  const t = truth(p.slug);
  const rec = { ...p, url, truth: t, live: {}, validator: {}, assertions: [] };
  // 1) 抓线上页
  let html = '';
  try {
    const r = await fetch(url, { headers: { 'accept-encoding': 'identity', 'user-agent': 'Mozilla/5.0 G2Validator' } });
    html = (await r.text()).replace(/&quot;/g, '"');
    rec.live.status = r.status; rec.live.length = html.length;
    if (r.status !== 200 || html.length < 5000) rec.assertions.push({ k: 'page_valid', ok: false, info: `status=${r.status} len=${html.length}` });
    else rec.assertions.push({ k: 'page_valid', ok: true, info: `status=${r.status} len=${html.length}` });
  } catch (e) {
    rec.live.error = e.message;
    rec.assertions.push({ k: 'page_valid', ok: false, info: 'FETCH_ERR ' + e.message });
    results.push(rec); continue;
  }
  // 2) JSON-LD 断言
  const blocks = extractJsonLd(html);
  const prods = blocks.flatMap((b) => findProduct(b));
  rec.live.numJsonLd = blocks.length;
  rec.live.numProduct = prods.length;
  const fob = /FOB/i.test(html);
  rec.assertions.push({ k: 'fob_absent', ok: !fob, info: fob ? 'FOB FOUND' : 'FOB=0' });
  if (!prods.length) { rec.assertions.push({ k: 'product_present', ok: false, info: 'no Product node' }); results.push(rec); continue; }
  const P = prods[0];
  rec.live.productSample = {
    name: P.name, image: P.image, offers: P.offers ? { price: P.offers.price, priceCurrency: P.offers.priceCurrency, availability: P.offers.availability, eligibleQuantity: P.offers.eligibleQuantity, businessFunction: P.offers.businessFunction } : null,
    potentialAction: P.potentialAction, sourcingIntentKeywords: P.sourcingIntentKeywords,
  };
  const pa = P.potentialAction || {};
  rec.assertions.push({ k: 'procure_action', ok: pa['@type'] === 'ProcureAction', info: `potentialAction.@type=${pa['@type']}` });
  rec.assertions.push({ k: 'procure_target', ok: JSON.stringify(pa).includes(`/${p.locale}/quote/`), info: `target=${JSON.stringify(pa.target || '')}` });
  const eq = (P.offers || {}).eligibleQuantity || {};
  rec.assertions.push({ k: 'eligibleQuantity_minValue', ok: eq.minValue === t.minQuantity, info: `schema=${eq.minValue} products.ts=${t.minQuantity}` });
  rec.assertions.push({ k: 'eligibleQuantity_unitCode', ok: eq.unitCode === 'H87', info: `unitCode=${eq.unitCode}` });
  rec.assertions.push({ k: 'businessFunction', ok: (P.offers || {}).businessFunction === 'http://purl.org/goodrelations/v1#Sell', info: `bf=${(P.offers || {}).businessFunction}` });
  rec.assertions.push({ k: 'sourcingIntentKeywords_present', ok: typeof P.sourcingIntentKeywords === 'string' && P.sourcingIntentKeywords.length > 5, info: `sik=${String(P.sourcingIntentKeywords || '').slice(0, 60)}` });
  rec.assertions.push({ k: 'offer_price_currency', ok: !!(P.offers && P.offers.price && P.offers.priceCurrency), info: `price=${P.offers?.price} ${P.offers?.priceCurrency}` });
  rec.assertions.push({ k: 'offer_availability', ok: !!(P.offers && P.offers.availability), info: `availability=${P.offers?.availability}` });

  // 3) validator.schema.org URL 模式
  try {
    const body = 'url=' + encodeURIComponent(url);
    const vr = await fetch('https://validator.schema.org/validate', {
      method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body, signal: AbortSignal.timeout(120000),
    });
    const raw = await vr.text();
    const js = JSON.parse(raw.slice(raw.indexOf('{')));
    rec.validator.status = vr.status;
    rec.validator.numObjects = js.numObjects;
    rec.validator.totalNumErrors = js.totalNumErrors;
    rec.validator.totalNumWarnings = js.totalNumWarnings;
    const errs = js.errors || [];
    rec.validator.expectedErrors = errs.filter(EXPECTED_ERR).map((e) => ({ type: e.errorType, args: e.args }));
    rec.validator.unexpectedErrors = errs.filter((e) => !EXPECTED_ERR(e)).map((e) => ({ type: e.errorType, args: e.args }));
    rec.validator.unexpectedWarnings = (js.warnings || []).map((w) => ({ type: w.errorType, args: w.args }));
    rec.assertions.push({ k: 'validator_parse', ok: vr.status === 200 && js.numObjects > 0, info: `objects=${js.numObjects}` });
    rec.assertions.push({ k: 'validator_no_unexpected_errors', ok: rec.validator.unexpectedErrors.length === 0, info: JSON.stringify(rec.validator.unexpectedErrors).slice(0, 300) });
  } catch (e) {
    rec.validator.error = e.message;
    rec.assertions.push({ k: 'validator_parse', ok: false, info: 'ERR ' + e.message });
  }
  results.push(rec);
  console.log(`done ${p.locale}/${p.slug}`);
}

writeFileSync('.hermes/reports/geo-g2-validation-2026-09-22-evidence.json', JSON.stringify({ generated: '2026-09-22', base: BASE, pages: results }, null, 2));
const fails = results.flatMap((r) => r.assertions.filter((a) => !a.ok).map((a) => `${r.locale}/${r.slug} :: ${a.k} ${a.info}`));
console.log('---ASSERTION FAILURES---');
console.log(fails.length ? fails.join('\n') : '(none)');
console.log(`pages=${results.length} assertions=${results.reduce((s, r) => s + r.assertions.length, 0)}`);
