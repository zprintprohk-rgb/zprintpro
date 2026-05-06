const fs = require('fs');

const filepath = 'src/data/products.ts';
let content = fs.readFileSync(filepath, 'utf8');

// ========== 1. Fix FL-002: normalize basePrice to A4 standard ==========
// FL-002 is "a5-flyers" but its basePrice=0.12 is the A5 price.
// The sizes template assumes A4 base (a5=0.65, a4=1, a3=1.8).
// Fix: set basePrice to A4 standard (0.18) so multipliers work correctly.
content = content.replace(
  /(id: 'FL-002',[\s\S]*?price_range: 'HK\$)0\.12-0\.40\/張'/,
  "$10.18-0.65/張'"
);
content = content.replace(
  /(id: 'FL-002',[\s\S]*?basePrice:) 0\.12/,
  "$1 0.18"
);

// ========== 2. Apply modest flyer price increases (+20-25%) ==========
// Based on e-print cost analysis: digital printing costs more than offset.
// These increases cover the digital-printing premium for small batches.

const flyerPriceUpdates = [
  { id: 'FL-001', oldBase: 0.18, newBase: 0.22, oldRange: "HK$0.18-0.65/張", newRange: "HK$0.22-0.80/張" },
  // FL-002 already handled above
  { id: 'FL-003', oldBase: 0.22, newBase: 0.27, oldRange: "HK$0.22-0.80/張", newRange: "HK$0.27-0.95/張" },
  { id: 'FL-004', oldBase: 0.45, newBase: 0.55, oldRange: "HK$0.45-1.60/張", newRange: "HK$0.55-1.95/張" },
  { id: 'FL-005', oldBase: 0.28, newBase: 0.35, oldRange: "HK$0.28-0.95/張", newRange: "HK$0.35-1.20/張" },
  { id: 'FL-007', oldBase: 0.22, newBase: 0.27, oldRange: "HK$0.22-0.80/張", newRange: "HK$0.27-0.95/張" },
  { id: 'FL-008', oldBase: 0.32, newBase: 0.40, oldRange: "HK$0.32-1.20/張", newRange: "HK$0.40-1.50/張" },
];

for (const u of flyerPriceUpdates) {
  // Update basePrice (match within the SKU block to avoid false matches)
  const basePattern = new RegExp(`(id: '${u.id}',[\\s\\S]*?basePrice:) ${u.oldBase}`);
  content = content.replace(basePattern, `$1 ${u.newBase}`);

  // Update price_range by finding the SKU block and replacing within it
  const idIndex = content.indexOf(`id: '${u.id}'`);
  if (idIndex !== -1) {
    const nextIdIndex = content.indexOf(`id: '`, idIndex + 10);
    const blockEnd = nextIdIndex === -1 ? content.length : nextIdIndex;
    const before = content.slice(0, idIndex);
    const block = content.slice(idIndex, blockEnd);
    const after = content.slice(blockEnd);
    const newBlock = block.replace(u.oldRange, u.newRange);
    if (newBlock !== block) {
      content = before + newBlock + after;
    }
  }
}

// ========== 3. Fix calendar SKUs: remove sizes from CL-002~006 ==========
// These SKUs got the wall-calendar sizes template [a4=1, a3=1.8, desk=0.6]
// but they are desk/mini/photo-frame/magnetic calendars.
// Remove sizes, keep materials/finishings/quantities.

const calendarSkus = ['CL-002', 'CL-003', 'CL-004', 'CL-005', 'CL-006'];

for (const sku of calendarSkus) {
  const idIndex = content.indexOf(`id: '${sku}'`);
  if (idIndex === -1) continue;

  const blockStart = content.lastIndexOf('{', idIndex);
  const nextId = content.indexOf(`id: '`, idIndex + 1);
  const blockEnd = nextId === -1 ? content.length : content.lastIndexOf('}', nextId) + 1;
  let block = content.slice(blockStart, blockEnd);

  // Remove the sizes array from variables
  const sizesPattern = /      sizes: \[\n[\s\S]*?      \],\n/;
  block = block.replace(sizesPattern, '');

  content = content.slice(0, blockStart) + block + content.slice(blockEnd);
}

fs.writeFileSync(filepath, content);
console.log('Pricing fixes applied to products.ts');
console.log('  - FL-002: basePrice 0.12 -> 0.18 (A4 standard)');
console.log('  - Flyers: modest +20-25% price increases');
console.log('  - Calendars CL-002~006: removed incorrect sizes');
