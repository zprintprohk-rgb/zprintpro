// gen-posters-json.mjs — v16: dual-track B2 digital / offset ×0.95
import fs from 'fs';
import path from 'path';

const OUT = path.join(process.cwd(), 'src', 'data', 'price-tables', 'posters.json');
const SETUP_FEE = 20;

// e-print offset A2·157g public HKD prices (K3 7/25)
const OFFSET_SIMPLEX = { 100:590, 200:640, 300:690, 500:740, 1000:890, 2000:1220, 3000:1660, 5000:2570 };
const OFFSET_DUPLEX  = { 100:890, 200:940, 300:1070, 500:1120, 1000:1220, 2000:1650, 3000:2100, 5000:3150 };

function b2digital(qty, unitRMB) {
  const cost = unitRMB * qty + SETUP_FEE;
  let m = cost <= 200 ? 3 : cost <= 500 ? 2.5 : 2.2;
  return Math.round(cost * m);
}

function offset95(qty, side) {
  const table = side === 'simplex' ? OFFSET_SIMPLEX : OFFSET_DUPLEX;
  // find largest e-print tier ≤ qty, ×0.95
  let best = null;
  for (const [eQty, price] of Object.entries(table)) {
    if (qty >= Number(eQty)) best = price;
  }
  if (!best) best = Object.values(table)[0]; // fallback 100
  return Math.round(best * 0.95);
}

function buildTiers(unitRMB, side, labelPrefix) {
  const DS = [10,20,50,100,200,300,500];
  const OS = [1000,2000,3000,5000]; // pure offset
  const tiers = [];
  for (const q of DS) {
    const digital = b2digital(q, unitRMB);
    const offset = offset95(q, side);
    const final = Math.min(digital, offset);
    const prod = digital <= offset ? 'digital' : 'offset';
    tiers.push({ qty: q, sell_hkd: final, production: prod, weight_kg: null });
  }
  for (const q of OS) {
    const offset = offset95(q, side);
    tiers.push({ qty: q, sell_hkd: offset, production: 'offset', weight_kg: null });
  }
  return tiers;
}

function buildConfig(name, simplexUnit, duplexUnit) {
  const simplexTiers = buildTiers(simplexUnit, 'simplex', name);
  const duplexTiers = buildTiers(duplexUnit, 'duplex', name);
  const a3SimplexTiers = simplexTiers.map(t => ({ ...t, sell_hkd: t.production === 'digital' ? b2digital(Math.ceil(t.qty/2), simplexUnit) : t.sell_hkd, qty: t.qty }));
  const a3DuplexTiers = duplexTiers.map(t => ({ ...t, sell_hkd: t.production === 'digital' ? b2digital(Math.ceil(t.qty/2), duplexUnit) : t.sell_hkd, qty: t.qty }));
  return [
    { config: name + ' · 單面', tiers: simplexTiers },
    { config: name + ' · 雙面', tiers: duplexTiers },
    { config: name.replace('A2','A3') + ' · 單面', tiers: a3SimplexTiers },
    { config: name.replace('A2','A3') + ' · 雙面', tiers: a3DuplexTiers },
  ];
}

// A1 inkjet
const a1Configs = [
  { config: 'A1 · PP/環保海報 (Yupo) · 單面 · 噴繪成品 · 不含安裝裱貼',
    tiers: [10,20,50,100,200].map(q => ({ qty: q, sell_hkd: q * 29, production: 'inkjet', weight_kg: null })) },
  { config: 'A1 · 相紙海報 · 單面 · 噴繪成品 · 不含安裝裱貼',
    tiers: [10,20,50,100,200].map(q => ({ qty: q, sell_hkd: q * 36, production: 'inkjet', weight_kg: null })) },
];

function main() {
  const configs = [];
  configs.push(...buildConfig('A2 · 铜版纸 · 157g', 2.3, 3.6));
  configs.push(...buildConfig('A2 · 哑粉纸 · 157g', 2.3, 3.6));
  configs.push(...buildConfig('A2 · 铜版纸 · 250g', 2.5, 4.0));
  configs.push(...a1Configs);

  const output = {
    sku: 'posters', category: 'posters',
    name: { 'zh-hk': '海報印刷', en: 'Poster Printing', ja: 'ポスター印刷' },
    currency_anchor: 'HKD',
    markup_rule: 'B2 digital × (≤200→×3,≤500→×2.5,>500→×2.2); offset = e-print ×0.95; dual-track = min(digital,offset)',
    src: 'anchor-b2-digital+v16-offset',
    anchor: 'B2非会员价 + e-print柯式海报价',
    anchorType: 'factory-cost', calibratedAt: '2026-07-25',
    note: 'v16 K3 7/25: 小单数码/大单柯式自动取优。A1=喷绘e-banner×0.95。',
    configs,
  };

  fs.writeFileSync(OUT, JSON.stringify(output, null, 2), 'utf-8');

  // Verify anchors
  const a2s = configs.find(c => c.config === 'A2 · 铜版纸 · 157g · 單面');
  console.log('=== A2 · 157g · 單面 dual-track ===');
  a2s.tiers.forEach(t => console.log(t.qty+'張: HK$'+t.sell_hkd+' ['+t.production+']'));
  const a2d = configs.find(c => c.config === 'A2 · 铜版纸 · 157g · 雙面');
  console.log('=== A2 · 157g · 雙面 ===');
  a2d.tiers.slice(0,6).forEach(t => console.log(t.qty+'張: HK$'+t.sell_hkd+' ['+t.production+']'));
  console.log('\nGenerated:', OUT, configs.length, 'configs');
}

main();
