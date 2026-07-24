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

// Write output as compact JSON for each slug
function ser(obj, indent = 2) {
  return JSON.stringify(obj, null, indent).replace(/'/g, "\\'");
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
`;

fs.writeFileSync(OUT, output, 'utf-8');
console.log('Generated:', OUT, 'with', Object.keys(map).length, 'slugs');
