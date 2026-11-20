// gen-price-data.mjs — generates src/lib/price-data.generated.ts from JSON price tables
// Run: node scripts/gen-price-data.mjs
import fs from 'fs';
import path from 'path';

const PRICE_TABLE_DIR = path.join(process.cwd(), 'src', 'data', 'price-tables');
const OUT = path.join(process.cwd(), 'src', 'lib', 'price-data.generated.ts');

const HKD_TO_USD = 1 / 7.81;
const HKD_TO_JPY = 1 / 0.05;

function hkdToUSD(hkd) { return Math.round(hkd * HKD_TO_USD); }
function hkdToJPY(hkd) { return Math.round(hkd * HKD_TO_JPY); }

function loadJSON(fn) { return JSON.parse(fs.readFileSync(path.join(PRICE_TABLE_DIR, fn), 'utf-8')); }

function normTiers(tiers, multiplier = 1) {
  return tiers.map(t => ({
    qty: t.qty,
    priceHKD: Math.round((t.sell_hkd || t.price || 0) * multiplier),
    priceUSD: hkdToUSD(Math.round((t.sell_hkd || t.price || 0) * multiplier)),
    priceJPY: hkdToJPY(Math.round((t.sell_hkd || t.price || 0) * multiplier)),
    weightKg: t.weight_kg !== null && t.weight_kg !== undefined ? t.weight_kg : null,
  }));
}

// Helper: normalize name (could be string or Record)
function normName(name) {
  if (!name) return { 'zh-hk': '', en: '', ja: '' };
  if (typeof name === 'string') return { 'zh-hk': name, en: name, ja: name };
  return { 'zh-hk': name?.['zh-hk'] || name?.zh || '', en: name?.en || '', ja: name?.ja || '' };
}

const map = {};

// 1. gang-run-card-boxes → PKG-016, PKG-013 (飞机盒 filter), PKG-015 (双插盒 filter)
const gr = loadJSON('gang-run-card-boxes.json');
const grName = normName(gr.name);
const grConfigs = gr.configs.map(cfg => ({
  label: { 'zh-hk': cfg.config, en: cfg.config, ja: cfg.config },
  tiers: normTiers(cfg.tiers),
}));

map['gang-run-card-boxes'] = { source: 'gang-run-card-boxes.json', productName: grName, defaultConfigIndex: 0, configs: grConfigs };
map['white-card-boxes'] = {
  source: 'gang-run-card-boxes.json (飛機盒 filter)',
  productName: { 'zh-hk': '白卡彩盒(飛機盒)', en: 'White Card Box (Airplane)', ja: '白カードボックス(飛行機箱)' },
  defaultConfigIndex: 0,
  configs: gr.configs.filter(c => c.config.includes('飞机盒')).map(cfg => ({
    label: { 'zh-hk': '【飛機盒】' + cfg.config, en: cfg.config, ja: cfg.config },
    tiers: normTiers(cfg.tiers),
  })),
};
map['tuck-end-boxes'] = {
  source: 'gang-run-card-boxes.json (雙插盒 filter)',
  productName: { 'zh-hk': '插口盒(雙插)', en: 'Tuck End Box (Double Tuck)', ja: '差し込み式ボックス(両挿)' },
  defaultConfigIndex: 0,
  configs: gr.configs.filter(c => c.config.includes('双插盒')).map(cfg => ({
    label: { 'zh-hk': '【雙插盒】' + cfg.config, en: cfg.config, ja: cfg.config },
    tiers: normTiers(cfg.tiers),
  })),
};

// 2. corrugated-boxes
const cb = loadJSON('corrugated-boxes-cost.json');
map['corrugated-boxes'] = {
  source: 'corrugated-boxes-cost.json',
  productName: normName(cb.name),
  defaultConfigIndex: 0,
  configs: cb.configs.map(c => ({ label: { 'zh-hk': c.config, en: c.config, ja: c.config }, tiers: normTiers(c.tiers) })),
};

// 3. white-card-bags
const wb = loadJSON('white-card-bags-cost.json');
map['white-card-bags'] = {
  source: 'white-card-bags-cost.json',
  productName: normName(wb.name),
  defaultConfigIndex: 0,
  configs: wb.configs.map(c => ({ label: { 'zh-hk': c.config, en: c.config, ja: c.config }, tiers: normTiers(c.tiers) })),
};

// 4. digital-stickers
const ds = loadJSON('digital-stickers-cost.json');
const dsName = normName(ds.name);
const dsConfigs = ds.configs.map(c => ({ label: { 'zh-hk': c.config, en: c.config, ja: c.config }, tiers: normTiers(c.tiers) }));
map['waterproof-stickers'] = { source: 'digital-stickers-cost.json', productName: dsName, defaultConfigIndex: 0, configs: dsConfigs };
map['digital-stickers'] = { source: 'digital-stickers-cost.json', productName: dsName, defaultConfigIndex: 0, configs: dsConfigs };

// 5. flyers.json (eprint)
const f = loadJSON('flyers.json');
f.products.forEach(p => {
  const label = `${p.config?.size || p.sku} ${p.config?.paper || ''} ${p.config?.print || ''}`.trim();
  map[p.sku] = {
    source: 'flyers.json (eprint ×0.95)',
    productName: { 'zh-hk': label, en: label, ja: label },
    defaultConfigIndex: 0,
    configs: [{ label: { 'zh-hk': label, en: label, ja: label }, tiers: normTiers(p.tiers) }],
  };
});

// 6. books.json
const b = loadJSON('books.json');
b.products.forEach(p => {
  const mult = p.priceMultiplier || 1;
  const label = `${p.config?.size || ''} ${p.config?.pages || ''} ${p.config?.binding || ''}`.trim();
  map[p.sku] = {
    source: `books.json (eprint ×${mult})`,
    productName: { 'zh-hk': label, en: label, ja: label },
    defaultConfigIndex: 0,
    configs: [{ label: { 'zh-hk': label, en: label, ja: label }, tiers: normTiers(p.tiers, mult) }],
  };
});

// 7. special-fold-leaflets
const sf = loadJSON('special-fold-leaflets.json');
const sfName = normName(sf.name);
const sfConfigs = sf.configs.map(c => ({ label: { 'zh-hk': c.config, en: c.config, ja: c.config }, tiers: normTiers(c.tiers) }));
map['folded-leaflets'] = { source: 'special-fold-leaflets.json', productName: sfName, defaultConfigIndex: 0, configs: sfConfigs };
map['special-fold-leaflets'] = { source: 'special-fold-leaflets.json', productName: sfName, defaultConfigIndex: 0, configs: sfConfigs };

// 8. flyers-cost-yate98
const fy = loadJSON('flyers-cost-yate98.json');
const fyName = normName(fy.name);
map['custom-flyers'] = {
  source: 'flyers-cost-yate98.json',
  productName: fyName,
  defaultConfigIndex: 0,
  configs: fy.configs.map(c => ({ label: { 'zh-hk': c.config, en: c.config, ja: c.config }, tiers: normTiers(c.tiers) })),
};

// 9. posters.json — v14 K3 7/25 B2 digital anchor
const posters = loadJSON('posters.json');
const posterConfigs = posters.configs.map(c => ({ label: { 'zh-hk': c.config, en: c.config, ja: c.config }, tiers: normTiers(c.tiers) }));
map['a2-posters'] = { source: 'posters.json (B2 digital ×3-stage formula)', productName: { 'zh-hk': 'A2海報', en: 'A2 Poster', ja: 'A2ポスター' }, defaultConfigIndex: 0, configs: posterConfigs };


// Write output as compact JSON for each slug
function ser(obj, indent = 2) {
  return JSON.stringify(obj, null, indent).replace(/'/g, "\\'");
}

function serUnitAnchors(map) {
  const lines = [];
  const sheets = ['a2-posters','a1-posters','a4-flyers','a5-flyers','folded-leaflets','same-day-flyers','eco-flyers'];
  const books = ['saddle-stitch-booklets','perfect-bound-books','hardcover-books','exercise-books','catalog-printing','spiral-notebooks'];
  for (const [slug, data] of Object.entries(map)) {
    if (!data.configs?.length) continue;
    // Take first config's tiers as default
    const cfg = data.configs[0];
    if (!cfg.tiers?.length) continue;
    let bestHKD = { ppu: Infinity, qty: 0, batch: 0 };
    let bestUSD = { ppu: Infinity, qty: 0, batch: 0 };
    let bestJPY = { ppu: Infinity, qty: 0, batch: 0 };
    cfg.tiers.forEach(t => {
      if (t.priceHKD / t.qty < bestHKD.ppu) bestHKD = { ppu: t.priceHKD / t.qty, qty: t.qty, batch: t.priceHKD };
      if (t.priceUSD / t.qty < bestUSD.ppu) bestUSD = { ppu: t.priceUSD / t.qty, qty: t.qty, batch: t.priceUSD };
      if (t.priceJPY / t.qty < bestJPY.ppu) bestJPY = { ppu: t.priceJPY / t.qty, qty: t.qty, batch: t.priceJPY };
    });
    const fmt = v => v < 1 ? v.toFixed(2) : v < 10 ? v.toFixed(1) : Math.round(v).toString();
    const uw = sheets.includes(slug) ? { 'zh-hk': '每張', en: 'per sheet', ja: '1枚' }
      : books.includes(slug) ? { 'zh-hk': '每本', en: 'per book', ja: '1冊' }
      : { 'zh-hk': '每個', en: 'per pc', ja: '1個' };
    lines.push(`  '${slug}': {`);
    lines.push(`    'zh-hk': { priceDisplay: '${fmt(bestHKD.ppu)}', qty: ${bestHKD.qty}, batchPrice: ${bestHKD.batch}, unitLabel: '${uw['zh-hk']}' },`);
    lines.push(`    en: { priceDisplay: '${fmt(bestUSD.ppu)}', qty: ${bestUSD.qty}, batchPrice: ${bestUSD.batch}, unitLabel: '${uw.en}' },`);
    lines.push(`    ja: { priceDisplay: '${fmt(bestJPY.ppu)}', qty: ${bestJPY.qty}, batchPrice: ${bestJPY.batch}, unitLabel: '${uw.ja}' },`);
    lines.push('  },');
  }
  return lines.join('\n');
}

const entries = Object.entries(map).map(([slug, data]) =>
  `  '${slug}': ${ser(data)},`).join('\n');

const output = `// Generated by scripts/gen-price-data.mjs — DO NOT EDIT
// Maps product slug → pre-computed price tiers (server-safe, no fs)
import type { PriceTableData } from './price-injector-types';

export const PRICE_TABLE_MAP: Record<string, PriceTableData> = {
${entries}
};

export function getPriceTableForSlug(slug: string): PriceTableData | null {
  return PRICE_TABLE_MAP[slug] || null;
}

/** v18: Pre-computed unit price anchors (lowest per-unit across all configs) */
export const UNIT_PRICE_ANCHORS: Record<string, Record<string, { priceDisplay: string; qty: number; batchPrice: number; unitLabel: string }>> = {
${serUnitAnchors(map)}
};

export function findClosestTierBatch(
  slug: string,
  qty: number,
  configIndex: number = 0,
): { qty: number; priceHKD: number; priceUSD: number; priceJPY: number; matched: boolean } | null {
  const data = PRICE_TABLE_MAP[slug];
  if (!data) return null;
  const cfg = data.configs[configIndex];
  if (!cfg || !cfg.tiers.length) return null;
  let best = cfg.tiers[cfg.tiers.length - 1];
  let matched = false;
  for (const t of cfg.tiers) {
    if (t.qty >= qty) { best = t; matched = t.qty === qty; break; }
  }
  return { qty: best.qty, priceHKD: best.priceHKD, priceUSD: best.priceUSD, priceJPY: best.priceJPY, matched };
}
`;

fs.writeFileSync(OUT, output, 'utf-8');
console.log('Generated:', OUT, 'with', Object.keys(map).length, 'slugs');
