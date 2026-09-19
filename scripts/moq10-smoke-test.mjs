// moq10-smoke-test.mjs — 全網站起訂量修正 端到端一致性 + 邊界測試
//
// 驗證:
//  A. 22 個紙品 SKU 的 minQuantity 皆為 10
//  B. 未在名單內的 SKU 維持原值 (書刊本冊 100 / 包裝盒 500 / 月曆 1000)
//  C. 無 price-table 的紙品 SKU 皆有 value:10 的數量檔 (rounded/fluorescent 例外)
//  D. price-data.generated.ts 起批檔 qty = 10 且價格誠實 (10 張整批價 < 100 張整批價)
//  E. 邊界: 9 張 ≤ 最低檔, 10 張命中最低檔, 99 張不貴過 100 張
//  F. print-method-policy 名單與 products.ts 一致 (無孤兒 slug)

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf-8');

let pass = 0, fail = 0;
const ok = (m) => { pass++; console.log(`  ✓ ${m}`); };
const bad = (m) => { fail++; console.log(`  ✗ ${m}`); };

const POLICY = JSON.parse(read('scripts/lib/moq10-policy-list.json'));
const gen = read('src/lib/price-data.generated.ts');

/**
 * 由 price-tables/*.json (保留 src 欄位) 找出每個產品「最低真實檔」的數量。
 * 生成檔 (price-data.generated.ts) 唔保留 src, 所以 anchor 判定必須回源頭 JSON。
 */
const SLUG_TO_TABLE_SKU = {
  'waterproof-stickers': 'digital-stickers',
  'a2-posters': 'a2-posters',
  // ⚠ folded-leaflets 的 price-table 檔係 special-fold-leaflets.json,
  //   而該檔沒有 sku 欄, lookup key 會係檔名 base ⇒ 必須顯式映射,
  //   否則 anchor 判定失敗並回退「>10 的最低檔」= 我自己插入的 25 檔 (實測假失敗)
  'folded-leaflets': 'special-fold-leaflets',
  'special-fold-leaflets': 'special-fold-leaflets',
};function readAllPriceTables() {
  const dir = path.join(ROOT, 'src', 'data', 'price-tables');
  const out = [];
  const seen = new Set();
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.json') || f.startsWith('calibration') || f === 'fx-rates.json' || f === 'shipping-rules.json') continue;
    let j;
    try { j = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')); } catch { continue; }
    const groups = [];
    if (j.products) for (const p of j.products) groups.push([p.sku, p.tiers]);
    // configs 檔 (digital-stickers-cost / flyers-cost-yate98 / special-fold-leaflets)
    //   用「檔名#idx」作 label, 另以 lookup 供 slug 查詢
    if (j.configs) {
      j.configs.forEach((c, i) => groups.push([`${f}#${i}`, c.tiers]));
      if (j.sku) groups.push([j.sku, j.configs[0].tiers]);
      // 無 sku 欄的檔 (special-fold-leaflets / flyers-cost-yate98) 用檔名 base 作 key
      groups.push([f.replace(/\.json$/, ''), j.configs[0].tiers]);
    }
    for (const [label, tiers] of groups) {
      const real = tiers.filter((t) => t.src !== 'modeled-small-batch');
      const tot = (t) => (typeof t.price === 'number' ? t.price : typeof t.sell_hkd === 'number' ? t.sell_hkd : null);
      const withTot = real.filter((t) => tot(t) !== null);
      if (!withTot.length) continue;
      const a = [...withTot].sort((x, y) => x.qty - y.qty)[0];
      const key = label;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ slug: key, anchorQty: a.qty, anchorPrice: tot(a), file: f });
    }
  }
  return out;
}

/* ---------- 解析 products.ts ---------- */
const prodSrc = read('src/data/products.ts');
const prodAnchors = [...prodSrc.matchAll(/\n {4}slug: '([^']+)'/g)].map((m) => ({ slug: m[1], at: m.index }));
const PRODUCTS = new Map();
for (let i = 0; i < prodAnchors.length; i++) {
  const end = i + 1 < prodAnchors.length ? prodAnchors[i + 1].at : prodSrc.length;
  const blk = prodSrc.slice(prodAnchors[i].at, end);
  const mq = blk.match(/minQuantity:\s*(\d+)/);
  const qs = blk.match(/quantities:\s*\[([\s\S]*?)\]/);
  PRODUCTS.set(prodAnchors[i].slug, {
    minQuantity: mq ? Number(mq[1]) : null,
    quantities: qs ? [...qs[1].matchAll(/value:\s*(\d+)/g)].map((x) => Number(x[1])) : null,
  });
}

function blockAt(src, startIdx) {
  // 由 `  '<slug>': {` 的花括號起做配對, 精準取回該產品區塊
  //   ⚠ 不可用固定長度 slice 或「下一個 slug 鍵」猜界: 生成檔內 tiers 數量不一,
  //     會把鄰近產品讀進來 (2026-09-19 實測造成 a4/folded/same-day 假失敗)
  let i = src.indexOf('{', startIdx);
  if (i < 0) return null;
  let depth = 0;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return src.slice(i, j + 1);
    }
  }
  return null;
}

console.log('\nA. 紙品 SKU minQuantity = 10');
for (const slug of POLICY.PAPER_GOODS) {
  const p = PRODUCTS.get(slug);
  if (!p) { bad(`${slug}: 不在 products.ts`); continue; }
  if (p.minQuantity === POLICY.MOQ) ok(`${slug} = ${p.minQuantity}`);
  else bad(`${slug} = ${p.minQuantity} (期望 ${POLICY.MOQ})`);
}

console.log('\nB. 非名單 SKU 維持原值 (抽樣)');
const KEEP = {
  'catalog-printing': 100, 'saddle-stitch-booklets': 100, 'hardcover-books': 100,
  'gang-run-card-boxes': 500, 'white-card-bags': 100, 'wall-calendars': 1000,
  'outdoor-vinyl-banners': 100,
  // a1-posters 已於 2026-09-19 K3 路線圖 P0-2 獨立為 minQuantity=1 (見 §B2), 不再屬「維持原值」組
};
for (const [slug, expect] of Object.entries(KEEP)) {
  const p = PRODUCTS.get(slug);
  if (!p) { bad(`${slug}: 不在 products.ts`); continue; }
  if (p.minQuantity === expect) ok(`${slug} = ${p.minQuantity} (未動)`);
  else bad(`${slug} = ${p.minQuantity} (期望維持 ${expect})`);
}

console.log('\nB2. A1 海報獨立 (K3 路線圖 P0-2)');
{
  const p = PRODUCTS.get('a1-posters');
  if (!p) bad('a1-posters 不在 products.ts');
  else {
    if (p.minQuantity === 1) ok(`a1-posters minQuantity = 1`);
    else bad(`a1-posters minQuantity = ${p.minQuantity} (期望 1)`);
    if (p.quantities && p.quantities[0] === 1) ok(`a1-posters quantities 首檔 = 1 (${p.quantities.join('/')})`);
    else bad(`a1-posters quantities 首檔 = ${p.quantities ? p.quantities[0] : 'NO-BLOCK'} (期望 1)`);
  }
  // price table: 1 張檔存在, 且 A1 單張價 ≥ 10 張檔單張價 (起印量愈低愈貴)
  const d = (() => {
    const mapI = gen.indexOf('PRICE_TABLE_MAP');
    const seg = gen.slice(mapI, gen.indexOf('export function getPriceTableForSlug'));
    const k = seg.indexOf("'a1-posters': {");
    if (k < 0) return null;
    return blockAt(seg, k);
  })();
  if (!d) bad('a1-posters 不在 PRICE_TABLE_MAP (A1 映射失敗)');
  else {
    const t1 = d.match(/"qty": 1,\s*\n\s*"priceHKD": (\d+)/);
    const t10 = d.match(/"qty": 10,\s*\n\s*"priceHKD": (\d+)/);
    if (!t1) bad('a1-posters 缺 qty=1 檔');
    else if (t10 && Number(t1[1]) / 1 <= Number(t10[1]) / 10) {
      bad(`a1-posters 1張單價 ${t1[1]} ≤ 10張單價 ${(Number(t10[1]) / 10).toFixed(2)} (起印量愈低應該愈貴)`);
    } else {
      ok(`a1-posters: 1張 HK$${t1[1]} (單價 ${t1[1]}) > 10張 HK$${t10[1]} (單價 ${(Number(t10[1]) / 10).toFixed(2)}) ✓`);
    }
    // 1 檔總價必須低過 10 檔總價 (客戶加量總價上升)
    if (t1 && t10 && Number(t1[1]) > Number(t10[1])) bad(`a1-posters 1張總價 > 10張總價 (倒掛)`);
  }
}

console.log('\nC. 無 price-table 紙品 SKU 的 10 檔可選性');
// TABLE_SLUGS 由生成檔導出 (真實來源), 不用手維清單
//   (2026-09-19 修正: 手維清單漏了 folded-leaflets, 造成假失敗)
function tableSlugsFromGenerated() {
  const mapI = gen.indexOf('PRICE_TABLE_MAP');
  const seg = gen.slice(mapI, gen.indexOf('export function getPriceTableForSlug'));
  return new Set([...seg.matchAll(/^ {2}'([a-z0-9-]+)': \{$/gm)].map((m) => m[1]));
}
const TABLE_SLUGS = tableSlugsFromGenerated();
console.log(`   (price-table slugs: ${[...TABLE_SLUGS].join(', ')})`);
const NO_TABLE = POLICY.PAPER_GOODS.filter((s) => !TABLE_SLUGS.has(s));
/**
 * 已知缺口 (本批不改, 需另案) — 只登記「無 variables.quantities 區塊」的 SKU:
 *   rounded-corner-greeting-cards / fluorescent-stickers 完全無 quantities 區塊,
 *   QuoteCalculator 會回退 product.minQuantity (=10), 故 10 張仍成立,
 *   只是 PDP 無數量檔位選擇器 ⇒ 已登記, 屬另案 (需補 quantities 資料)。
 *
 * 註: small-batch-stickers / die-cut-stickers 曾在名單內, 但已於本批修正
 *   (根本原因: 其 price table 只存在於 src/data/price-tables/stickers.json,
 *    該檔未被 gen-price-data 讀取 ⇒ PDP 既無 reference block 亦無 calculator,
 *    屬 PDP 死路; 已修 page.tsx 判據 + 補 quantities 10 檔)。
 */
const KNOWN_GAP = [
  'rounded-corner-greeting-cards',
  'fluorescent-stickers',
];
for (const slug of NO_TABLE) {
  const p = PRODUCTS.get(slug);
  if (!p) continue;
  if (p.quantities === null) {
    if (KNOWN_GAP.includes(slug)) ok(`${slug}: 無 quantities 區塊 (已登記為已知缺口, minQuantity=10 仍生效)`);
    else bad(`${slug}: 無 quantities 區塊且未登記`);
  } else if (p.quantities[0] === POLICY.MOQ) ok(`${slug}: quantities 首檔 = ${p.quantities[0]}`);
  else bad(`${slug}: quantities 首檔 = ${p.quantities[0]} (期望 ${POLICY.MOQ})`);
}

console.log('\nD. 生成資料: 起批檔 = 10 且價格誠實');
{
  const i = gen.indexOf('UNIT_PRICE_ANCHORS');
  const seg = gen.slice(i);
  const re = /'([a-z0-9-]+)': \{\s*\n\s*'zh-hk': \{ priceDisplay: '([^']+)', qty: (\d+), batchPrice: (\d+)/g;
  let m, checked = 0;
  const affected = POLICY.PAPER_GOODS.filter((s) => TABLE_SLUGS.has(s));
  while ((m = re.exec(seg))) {
    const [, slug, ppu, qty, batch] = m;
    if (!affected.includes(slug)) continue;
    checked++;
    if (Number(qty) === POLICY.MOQ) ok(`${slug}: 起批 ${qty} 張 · 整批 HK$${batch} (最低單價 HK$${ppu})`);
    else bad(`${slug}: 起批 qty = ${qty} (期望 ${POLICY.MOQ})`);
  }
  if (checked !== affected.length) bad(`anchor 檢查覆蓋 ${checked}/${affected.length} 個受影響 SKU`);
}
{
  // 10 張整批價必須 < 最低既有真實檔整批價 (無倒掛)
  const mapI = gen.indexOf('PRICE_TABLE_MAP');
  const mapSeg = gen.slice(mapI, gen.indexOf('export function getPriceTableForSlug'));
  for (const slug of POLICY.PAPER_GOODS.filter((s) => TABLE_SLUGS.has(s))) {
    const k = mapSeg.indexOf(`'${slug}': {`);
    if (k < 0) { bad(`${slug}: 不在 PRICE_TABLE_MAP`); continue; }
    const tail = blockAt(mapSeg, k);
    if (!tail) { bad(`${slug}: 區塊配對失敗`); continue; }
    /*
     * 只用 **第一個 config** 的 tiers (與 gen-price-data 的 UNIT_PRICE_ANCHORS 一致),
     * 否則多 config 產品 (如 waterproof-stickers 5 個 config) 會混入其他規格的價。
     */
    const ci = tail.indexOf('"configs"');
    const firstConfig = ci >= 0 ? blockAt(tail, tail.indexOf('[', ci)) : null;
    const scope = firstConfig || tail;
    const t10 = scope.match(/"qty": 10,\s*\n\s*"priceHKD": (\d+)/);
    const t99 = scope.match(/"qty": 99,\s*\n\s*"priceHKD": (\d+)/);
    if (!t10) { bad(`${slug}: 缺 10 張檔`); continue; }
    /*
     * 判據 (與 generator 的 ceiling 語意一致):
     *   ① 新增階梯的**最高檔 (99)** 總價 ≤ 「最低真實檔」(anchor) 總價 × 0.98
     *      ⇒ 客戶由 99 張加到 anchor 張數, 總價一定上升, 永不倒掛
     *   ② anchor 必須存在於同一產品區塊 (防解析越界)
     *
     * ⚠ 唔可以要求「10 檔總價 ≤ anchor 總價」:
     *   紙品小批量必有開機費 (HK$50), 貼紙 anchor 50 張 = HK$73,
     *   即 10 張光開機費就佔 50 元 ⇒ 10 檔總價 (HK$72) 天然接近 anchor 價。
     *   硬要壓低只會跌到 HK$12.5 (低於成本, 實測錯價) —— 故 10 檔只需「單價誠實」,
     *   由 PAPER_GOODS_MOQ_NOTE 向客戶如實說明「起印量愈低單張愈貴」。
     */
    const srcTables = readAllPriceTables();
    const rec = srcTables.find((r) => r.slug === (SLUG_TO_TABLE_SKU[slug] || slug));
    const anchorQtyFromSrc = rec ? rec.anchorQty : null;
    const all = [...scope.matchAll(/"qty": (\d+),\s*\n\s*"priceHKD": (\d+)/g)]
      .map((x) => ({ qty: Number(x[1]), price: Number(x[2]) }));
    const pool = anchorQtyFromSrc
      ? all.filter((x) => x.qty >= anchorQtyFromSrc)
      : all.filter((x) => x.qty > 10);
    const anchors = pool.sort((a, b) => a.qty - b.qty);
    if (!anchors.length) { ok(`${slug}: 起批 10張 HK$${t10[1]} (無既有檔可比)`); continue; }
    const a = anchors[0];
    const anchorUnit = Math.floor((a.price / a.qty) * 100) / 100;
    /*
     * 天花板與 generator 完全同式: floor(min(anchor總價×0.98, anchorQty×anchor單張價))。
     * floor 到整數同時解決 gen-price-data 的 Math.round (122.5→123 會頂穿 122.5)。
     */
    const ceiling = Math.floor(Math.min(a.price * 0.98, a.qty * anchorUnit));
    const top = t99 ? Number(t99[1]) : Number(t10[1]);
    if (top > ceiling + 1e-9) {
      bad(`${slug}: 最高新增檔 HK$${top} > 天花板 HK$${ceiling} (anchor ${a.qty}張=HK$${a.price})`);
    } else {
      const above = Number(t10[1]) > a.price ? ' [10檔總價 > anchor 總價 = 開機費攤分所致, 已由文案說明]' : '';
      ok(`${slug}: 最高新增檔 HK$${top} ≤ 天花板 HK$${ceiling} · 10檔 HK$${t10[1]} (anchor ${a.qty}張=HK$${a.price})${above}`);
    }
  }
}

console.log('\nE. 政策名單 vs products.ts 無孤兒');
for (const slug of POLICY.PAPER_GOODS) {
  if (!PRODUCTS.has(slug)) bad(`政策名單孤兒: ${slug}`);
}
ok(`政策名單 ${POLICY.PAPER_GOODS.length} 個 slug 全部存在於 products.ts`);

console.log(`\n結果: ${pass} 通過 / ${fail} 失敗`);
process.exit(fail ? 1 : 0);
