const fs = require('fs');

const priceMap = {
  'BC-001': { base: 0.8,  range: 'HK$80-160/100張', matSur: 0.4 },
  'BC-002': { base: 1.2,  range: 'HK$120-220/100張', matSur: 0.5 },
  'BC-003': { base: 2.0,  range: 'HK$200-350/100張', matSur: 0.8 },
  'BC-004': { base: 1.5,  range: 'HK$150-280/100張', matSur: 0.6 },
  'BC-005': { base: 0.9,  range: 'HK$90-170/100張', matSur: 0.4 },
  'BC-006': { base: 0.8,  range: 'HK$80-150/100張', matSur: 0.3 },
  'BC-007': { base: 1.0,  range: 'HK$100-180/100張', matSur: 0.5 },
  'BC-008': { base: 1.8,  range: 'HK$180-320/100張', matSur: 0.5 },
  'BC-009': { base: 1.1,  range: 'HK$110-200/100張', matSur: 0.4 },
  'ST-001': { base: 0.3,  range: 'HK$0.3-1.2/張' },
  'ST-002': { base: 0.5,  range: 'HK$0.5-1.8/張' },
  'ST-003': { base: 0.6,  range: 'HK$0.6-2.0/張' },
  'ST-004': { base: 50,   range: 'HK$50-150/A4' },
  'ST-005': { base: 0.8,  range: 'HK$0.8-2.8/張' },
  'ST-006': { base: 1.0,  range: 'HK$1.0-3.5/張' },
  'ST-007': { base: 1.5,  range: 'HK$1.5-5.0/張' },
  'ST-008': { base: 0.7,  range: 'HK$0.7-2.5/張' },
  'PB-001': { base: 0.8,  range: 'HK$0.8-3/個' },
  'PB-002': { base: 1.0,  range: 'HK$1.0-4/個' },
  'PB-003': { base: 2.5,  range: 'HK$2.5-10/個' },
  'PB-004': { base: 1.0,  range: 'HK$1.0-4/個' },
  'PB-005': { base: 1.0,  range: 'HK$1.0-4/個' },
  'PB-006': { base: 0.5,  range: 'HK$0.5-2/個' },
  'PB-007': { base: 2.0,  range: 'HK$2.0-8/個' },
  'FL-001': { base: 0.25, range: 'HK$0.25-0.8/張' },
  'FL-002': { base: 0.15, range: 'HK$0.15-0.5/張' },
  'FL-003': { base: 0.3,  range: 'HK$0.3-1.0/張' },
  'FL-004': { base: 0.6,  range: 'HK$0.6-2.0/張' },
  'FL-005': { base: 0.4,  range: 'HK$0.4-1.2/張' },
  'FL-006': { base: 0.45, range: 'HK$0.45-1.5/張' },
  'FL-007': { base: 0.3,  range: 'HK$0.3-1.0/張' },
  'PO-001': { base: 12,   range: 'HK$12-40/張' },
  'PO-002': { base: 25,   range: 'HK$25-85/張' },
  'PO-003': { base: 20,   range: 'HK$20-65/張' },
  'PO-004': { base: 40,   range: 'HK$40-120/套' },
  'PO-005': { base: 32,   range: 'HK$32-100/張' },
  'PO-006': { base: 16,   range: 'HK$16-50/張' },
  'PK-001': { base: 4,    range: 'HK$4-25/個' },
  'PK-002': { base: 6,    range: 'HK$6-32/個' },
  'PK-003': { base: 2.5,  range: 'HK$2.5-18/個' },
  'PK-004': { base: 1.8,  range: 'HK$1.8-10/個' },
  'PK-005': { base: 2.5,  range: 'HK$2.5-15/個' },
  'PK-006': { base: 8,    range: 'HK$8-42/個' },
  'RP-001': { base: 1.5,  range: 'HK$1.5-6/個' },
  'RP-002': { base: 4,    range: 'HK$4-12/個' },
  'RP-003': { base: 2.5,  range: 'HK$2.5-8/個' },
  'RP-004': { base: 1.5,  range: 'HK$1.5-5/個' },
  'RP-005': { base: 2.5,  range: 'HK$2.5-7/個' },
  'RP-006': { base: 3,    range: 'HK$3-10/個' },
  'CL-001': { base: 12,   range: 'HK$12-40/本' },
  'CL-002': { base: 16,   range: 'HK$16-50/本' },
  'CL-003': { base: 20,   range: 'HK$20-65/本' },
  'CL-004': { base: 6,    range: 'HK$6-20/本' },
  'CL-005': { base: 24,   range: 'HK$24-80/本' },
  'CL-006': { base: 10,   range: 'HK$10-30/本' },
  'MN-001': { base: 12,   range: 'HK$12-40/張' },
  'MN-002': { base: 8,    range: 'HK$8-30/張' },
  'MN-003': { base: 40,   range: 'HK$40-160/本' },
  'MN-004': { base: 16,   range: 'HK$16-65/張' },
  'MN-005': { base: 0.3,  range: 'HK$0.3-1.5/張' },
  'BN-001': { base: 20,   range: 'HK$20-80/平方米' },
  'BN-002': { base: 120,  range: 'HK$120-400/套' },
  'BN-003': { base: 16,   range: 'HK$16-65/平方米' },
  'BN-004': { base: 40,   range: 'HK$40-160/平方米' },
  'BN-005': { base: 24,   range: 'HK$24-100/平方米' },
  'BK-001': { base: 24,   range: 'HK$24-120/本' },
  'BK-002': { base: 6,    range: 'HK$6-32/本' },
  'BK-003': { base: 16,   range: 'HK$16-80/本' },
  'BK-004': { base: 40,   range: 'HK$40-240/本' },
  'BK-005': { base: 8,    range: 'HK$8-40/本' },
  'EV-001': { base: 0.3,  range: 'HK$0.3-2/個' },
  'EV-002': { base: 0.5,  range: 'HK$0.5-3/個' },
  'EV-003': { base: 0.8,  range: 'HK$0.8-4/個' },
  'EV-004': { base: 1.5,  range: 'HK$1.5-6/個' },
  'ED-001': { base: 4,    range: 'HK$4-16/本' },
  'ED-002': { base: 8,    range: 'HK$8-40/張' },
  'ED-003': { base: 0.2,  range: 'HK$0.2-0.8/張' },
  'ED-004': { base: 24,   range: 'HK$24-120/本' },
};

let content = fs.readFileSync('src/data/products.ts', 'utf-8');

// Process each product block
const lines = content.split('\n');
let currentSku = null;
let modified = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Detect SKU
  const skuMatch = line.match(/sku_code:\s*['"]([^'"]+)['"]/);
  if (skuMatch) {
    currentSku = skuMatch[1];
  }
  
  // Replace price_range for current SKU
  if (currentSku && priceMap[currentSku] && line.includes('price_range:')) {
    const oldRange = line.match(/price_range:\s*['"]([^'"]+)['"]/);
    if (oldRange) {
      lines[i] = line.replace(oldRange[1], priceMap[currentSku].range);
      modified++;
    }
  }
  
  // Replace basePrice for current SKU
  if (currentSku && priceMap[currentSku] && line.includes('basePrice:')) {
    const oldBase = line.match(/basePrice:\s*([\d.]+)/);
    if (oldBase) {
      lines[i] = line.replace(oldBase[1], priceMap[currentSku].base.toString());
      modified++;
    }
  }
  
  // Reset SKU at end of product block
  if (line.trim() === '},' && currentSku) {
    currentSku = null;
  }
}

fs.writeFileSync('src/data/products.ts', lines.join('\n'), 'utf-8');
console.log(`Modified ${modified} lines in products.ts`);

// Verify
const verify = fs.readFileSync('src/data/products.ts', 'utf-8');
let ok = 0;
for (const [sku, data] of Object.entries(priceMap)) {
  const idx = verify.indexOf(`sku_code: '${sku}'`);
  if (idx > 0) {
    const block = verify.substring(idx, idx + 400);
    const bp = block.match(/basePrice:\s*([\d.]+)/);
    const pr = block.match(/price_range:\s*['"]([^'"]+)['"]/);
    if (bp && parseFloat(bp[1]) === data.base && pr && pr[1] === data.range) {
      ok++;
    } else {
      console.log(`VERIFY FAIL: ${sku} base=${bp?.[1]} range=${pr?.[1]}`);
    }
  }
}
console.log(`Verified ${ok}/${Object.keys(priceMap).length} products`);
