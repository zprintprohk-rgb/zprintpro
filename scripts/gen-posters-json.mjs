// gen-posters-json.mjs — generates posters.json from B2 digital anchor + 3-stage formula
import fs from 'fs';
import path from 'path';

const OUT = path.join(process.cwd(), 'src', 'data', 'price-tables', 'posters.json');
const HKD_RATE = 1.087; // 1 CNY = 1.087 HKD

// B2 non-member costs (RMB per sheet)
const COST = {
  '铜版纸': { under157g: { simplex: 2.3, duplex: 3.6 }, g200: { simplex: 2.4, duplex: 3.8 }, g250: { simplex: 2.5, duplex: 4.0 } },
  '哑粉纸': { under157g: { simplex: 2.3, duplex: 3.6 }, g200: { simplex: 2.4, duplex: 3.8 }, g250: { simplex: 2.5, duplex: 4.0 } },
};

const SETUP_FEE = 20; // RMB per order

// e-print A2 157g 光粉 公开价 (HKD)
const EPRINT_A2_157G = {
  simplex: [10, 490, 50, 540, 100, 590, 200, 640, 300, 690, 500, 740],
  duplex:  [10, 790, 50, 840, 100, 890, 200, 940, 300, 1070, 500, 1120],
};

function parseEprint(qty, side) {
  const arr = side === 'simplex' ? EPRINT_A2_157G.simplex : EPRINT_A2_157G.duplex;
  // Find the largest e-print tier ≤ qty
  let best = null;
  for (let i = 0; i < arr.length; i += 2) {
    const eQty = arr[i];
    const price = arr[i + 1];
    if (qty >= eQty) best = price;
  }
  // If qty < smallest tier, use smallest tier (10)
  if (!best) best = arr[1];
  return best;
}

function computePrice(qty, unitCostRMB, side) {
  // Step 1: B2 formula price
  const costRMB = unitCostRMB * qty + SETUP_FEE;
  let formulaRMB;
  if (costRMB <= 200) formulaRMB = Math.ceil(costRMB * 3);
  else if (costRMB <= 500) formulaRMB = Math.ceil(costRMB * 2.5);
  else formulaRMB = Math.ceil(costRMB * 2.2);
  
  // Convert to HKD
  let formulaHKD = Math.round(formulaRMB * HKD_RATE);
  
  // Step 2 & 3: Floor ×0.88, Ceiling ×0.95 vs e-print
  const eprintPrice = parseEprint(qty, side);
  const floor = Math.round(eprintPrice * 0.88);
  const ceil = Math.round(eprintPrice * 0.95);
  
  // Final = min(max(formula, floor), ceil)
  const final = Math.min(Math.max(formulaHKD, floor), ceil);
  
  return { formulaHKD, floor, ceil, final };
}

// Generate tiers: 10, 20, 50, 100, 200, 300, 500
const QUANTITIES = [10, 20, 50, 100, 200, 300, 500];

function buildConfig(name, paperType, weight, simplexUnit, duplexUnit) {
  const keyName = name; // e.g. "A2 · 铜版纸 · 157g"
  
  const simplexConfig = {
    config: `${keyName} · 單面`,
    tiers: QUANTITIES.map(q => {
      const { final } = computePrice(q, simplexUnit, 'simplex');
      return { qty: q, sell_hkd: final, weight_kg: null };
    }),
  };
  
  const duplexConfig = {
    config: `${keyName} · 雙面`,
    tiers: QUANTITIES.map(q => {
      const { final } = computePrice(q, duplexUnit, 'duplex');
      return { qty: q, sell_hkd: final, weight_kg: null };
    }),
  };
  
  // A3 variant: A3 = 2-up on B2, so cost per sheet = simplex/duplex but qty doubled
  const a3SimplexConfig = {
    config: name.replace('A2', 'A3') + ` · ${paperType} · ${weight} · 單面`,
    tiers: QUANTITIES.map(qt => {
      const impressions = Math.ceil(qt / 2);
      const { final } = computePrice(impressions, simplexUnit, 'simplex');
      return { qty: qt, sell_hkd: final, weight_kg: null };
    }),
  };
  
  const a3DuplexConfig = {
    config: name.replace('A2', 'A3') + ` · ${paperType} · ${weight} · 雙面`,
    tiers: QUANTITIES.map(qt => {
      const impressions = Math.ceil(qt / 2);
      const { final } = computePrice(impressions, duplexUnit, 'duplex');
      return { qty: qt, sell_hkd: final, weight_kg: null };
    }),
  };

  return [simplexConfig, duplexConfig, a3SimplexConfig, a3DuplexConfig];
}

function main() {
  const configs = [];
  
  // A2 · 铜版纸 · 157g
  configs.push(...buildConfig('A2', '铜版纸', '157g', COST['铜版纸'].under157g.simplex, COST['铜版纸'].under157g.duplex));
  // A2 · 哑粉纸 · 157g
  configs.push(...buildConfig('A2', '哑粉纸', '157g', COST['哑粉纸'].under157g.simplex, COST['哑粉纸'].under157g.duplex));
  // A2 · 铜版纸 · 250g
  configs.push(...buildConfig('A2', '铜版纸', '250g', COST['铜版纸'].g250.simplex, COST['铜版纸'].g250.duplex));

  const output = {
    sku: 'posters',
    category: 'posters',
    name: { 'zh-hk': '海報印刷', en: 'Poster Printing', ja: 'ポスター印刷' },
    currency_anchor: 'HKD',
    markup_rule: 'B2 digital non-member cost × 三段式 (成本≤200→×3, ≤500→×2.5, >500→×2.2) × HKD 1.087, 夹逼 e-print ×0.88~0.95',
    src: 'anchor-b2-digital',
    anchor: 'F:\\B2价格表非会员pdf.pdf — 深圳快印 B2 HP Indigo-15K',
    anchorType: 'factory-cost',
    calibratedAt: '2026-07-25',
    note: 'v14 K3 7/25 修订: 作废 e-print×0.95 方案, 改用 B2 数码三段式公式夹逼 e-print。A1 数码打不下 (594×840>740×510), A1 走喷绘另议, 本表只做 A2/A3。A3 拼版: 2 张 A3 = 1 个 B2 印张。白墨/满版色 v1 不接。其余纸材配置可扩展。',
    configs,
  };

  fs.writeFileSync(OUT, JSON.stringify(output, null, 2), 'utf-8');
  
  // Print verification anchors
  console.log('=== Verification: A2 · 157g · 單面 ===');
  QUANTITIES.forEach(q => {
    const { formulaHKD, floor, ceil, final } = computePrice(q, COST['铜版纸'].under157g.simplex, 'simplex');
    console.log(`${q}張: formula=${formulaHKD} floor=${floor} ceil=${ceil} → FINAL=${final}`);
  });
  console.log('=== A2 · 157g · 雙面 10張 ===');
  const d10 = computePrice(10, COST['铜版纸'].under157g.duplex, 'duplex');
  console.log(`10張雙面: formula=${d10.formulaHKD} floor=${d10.floor} ceil=${d10.ceil} → FINAL=${d10.final}`);
  
  console.log(`\nGenerated: ${OUT}`);
  console.log(`Configs: ${configs.length}`);
}

main();
