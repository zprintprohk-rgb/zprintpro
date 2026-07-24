// gen-posters-json.mjs — v15: pure B2 formula (no e-print clamp)
import fs from 'fs';
import path from 'path';

const OUT = path.join(process.cwd(), 'src', 'data', 'price-tables', 'posters.json');
const SETUP_FEE = 20;

const QUANTITIES = [10, 20, 50, 100, 200, 300, 500];

function b2Price(qty, unitRMB) {
  const cost = unitRMB * qty + SETUP_FEE;
  let m = cost <= 200 ? 3 : cost <= 500 ? 2.5 : 2.2;
  return Math.round(cost * m);
}

function buildConfig(name, simplexUnit, duplexUnit) {
  return [
    { config: name + ' · 單面', tiers: QUANTITIES.map(q => ({ qty: q, sell_hkd: b2Price(q, simplexUnit), weight_kg: null })) },
    { config: name + ' · 雙面', tiers: QUANTITIES.map(q => ({ qty: q, sell_hkd: b2Price(q, duplexUnit), weight_kg: null })) },
    { config: name.replace('A2','A3') + ' · 單面', tiers: QUANTITIES.map(q => ({ qty: q, sell_hkd: b2Price(Math.ceil(q/2), simplexUnit), weight_kg: null })) },
    { config: name.replace('A2','A3') + ' · 雙面', tiers: QUANTITIES.map(q => ({ qty: q, sell_hkd: b2Price(Math.ceil(q/2), duplexUnit), weight_kg: null })) },
  ];
}

// A1 inkjet: e-banner ×0.95
// e-banner PP/環保海報 (Yupo) A1 單面: $30/張 → ×0.95 = $28.5 → $29
// e-banner 相紙海報 A1 單面: $38/張 → ×0.95 = $36.1 → $36
const a1Configs = [
  {
    config: 'A1 · PP/環保海報 (Yupo) · 單面 · 噴繪成品 · 不含安裝裱貼',
    tiers: [10,20,50,100,200].map(q => ({ qty: q, sell_hkd: q * 29, weight_kg: null })),
  },
  {
    config: 'A1 · 相紙海報 · 單面 · 噴繪成品 · 不含安裝裱貼',
    tiers: [10,20,50,100,200].map(q => ({ qty: q, sell_hkd: q * 36, weight_kg: null })),
  },
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
    markup_rule: 'B2 digital × (cost≤200→×3, ≤500→×2.5, >500→×2.2); A1 = e-banner ×0.95',
    src: 'anchor-b2-digital',
    anchor: 'B2非会员价; A1: https://hk.e-banner.com ×0.95',
    anchorType: 'factory-cost', calibratedAt: '2026-07-25',
    note: 'v15 K3 7/25: 纯 B2 公式 (作废 e-print 夹逼)。A1 喷绘 e-banner 对标。',
    configs,
  };

  fs.writeFileSync(OUT, JSON.stringify(output, null, 2), 'utf-8');

  console.log('=== A2 · 157g · 單面 ===');
  QUANTITIES.forEach(q => console.log(q+'張: '+b2Price(q, 2.3)));
  console.log('=== A2 · 157g · 雙面 ===');
  [10,50,100].forEach(q => console.log(q+'張: '+b2Price(q, 3.6)));
  console.log('\nGenerated: '+OUT+', '+configs.length+' configs');
}

main();
