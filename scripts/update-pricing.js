const fs = require('fs');

const filepath = 'src/lib/pricing.ts';
const content = fs.readFileSync(filepath, 'utf8');
const lines = content.split('\n');

// Find INDEPENDENT_PRICES block
let startIdx = -1, endIdx = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const INDEPENDENT_PRICES')) startIdx = i;
  if (startIdx !== -1 && lines[i].trim() === '};') {
    endIdx = i;
    break;
  }
}

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find INDEPENDENT_PRICES block');
  process.exit(1);
}

// Parse existing prices and apply 8% discount
const discount = 0.92;
const newPrices = {};

const existingLines = lines.slice(startIdx, endIdx + 1).join('\n');
const slugMatches = [...existingLines.matchAll(/['"]([\w-]+)['"]\s*:\s*\{/g)];

for (const m of slugMatches) {
  const slug = m[1];
  const start = existingLines.indexOf(`'${slug}': {`);
  if (start === -1) continue;
  
  // Find the block for this slug
  const blockStart = existingLines.indexOf(`'${slug}': {`);
  let braceCount = 0;
  let blockEnd = blockStart;
  for (let i = blockStart; i < existingLines.length; i++) {
    if (existingLines[i] === '{') braceCount++;
    if (existingLines[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        blockEnd = i + 1;
        break;
      }
    }
  }
  
  // Extract en and ja prices
  const block = existingLines.slice(blockStart, blockEnd);
  const enMin = parseFloat(block.match(/'en':\s*\{\s*min:\s*([\d.]+)/)?.[1] || 0);
  const enMax = parseFloat(block.match(/'en':\s*\{[^}]*max:\s*([\d.]+)/)?.[1] || 0);
  const enUnit = block.match(/'en':\s*\{[^}]*unit:\s*['"]([^'"]+)['"]/)?.[1] || 'pc';
  const jaMin = parseFloat(block.match(/'ja':\s*\{\s*min:\s*([\d.]+)/)?.[1] || 0);
  const jaMax = parseFloat(block.match(/'ja':\s*\{[^}]*max:\s*([\d.]+)/)?.[1] || 0);
  const jaUnit = block.match(/'ja':\s*\{[^}]*unit:\s*['"]([^'"]+)['"]/)?.[1] || '枚';
  
  newPrices[slug] = {
    en: { min: +(enMin * discount).toFixed(2), max: +(enMax * discount).toFixed(2), unit: enUnit },
    ja: { min: Math.round(jaMin * discount), max: Math.round(jaMax * discount), unit: jaUnit },
  };
}

// Add new secondary category prices (already discounted by 8% from market rates)
const newEntries = {
  // Banners
  'outdoor-vinyl-banners': {
    en: { min: 1.84, max: 3.68, unit: 'sqft' },
    ja: { min: 258, max: 506, unit: '平方フィート' },
  },
  'roll-up-banners': {
    en: { min: 46.00, max: 92.00, unit: 'set' },
    ja: { min: 6440, max: 12880, unit: 'セット' },
  },
  'adhesive-banners': {
    en: { min: 1.38, max: 2.76, unit: 'sqft' },
    ja: { min: 194, max: 368, unit: '平方フィート' },
  },
  'vehicle-wraps': {
    en: { min: 4.60, max: 9.20, unit: 'sqft' },
    ja: { min: 644, max: 1288, unit: '平方フィート' },
  },
  'mesh-banners': {
    en: { min: 1.84, max: 4.60, unit: 'sqft' },
    ja: { min: 258, max: 598, unit: '平方フィート' },
  },
  // Books
  'catalog-printing': {
    en: { min: 4.60, max: 18.40, unit: 'pc' },
    ja: { min: 644, max: 2576, unit: '個' },
  },
  'saddle-stitch-booklets': {
    en: { min: 1.84, max: 7.36, unit: 'pc' },
    ja: { min: 258, max: 1030, unit: '個' },
  },
  'perfect-bound-books': {
    en: { min: 4.60, max: 13.80, unit: 'pc' },
    ja: { min: 644, max: 1932, unit: '個' },
  },
  'hardcover-books': {
    en: { min: 13.80, max: 36.80, unit: 'pc' },
    ja: { min: 1932, max: 5150, unit: '個' },
  },
  'spiral-notebooks': {
    en: { min: 2.76, max: 9.20, unit: 'pc' },
    ja: { min: 386, max: 1288, unit: '個' },
  },
  // Menus
  'pvc-menus': {
    en: { min: 2.76, max: 7.36, unit: 'pc' },
    ja: { min: 386, max: 1030, unit: '個' },
  },
  'laminated-menus': {
    en: { min: 1.84, max: 5.52, unit: 'pc' },
    ja: { min: 258, max: 773, unit: '個' },
  },
  'hardcover-menus': {
    en: { min: 9.20, max: 23.00, unit: 'pc' },
    ja: { min: 1288, max: 3220, unit: '個' },
  },
  'drink-menus': {
    en: { min: 3.68, max: 9.20, unit: 'pc' },
    ja: { min: 515, max: 1288, unit: '個' },
  },
  'disposable-menus': {
    en: { min: 0.14, max: 0.46, unit: 'pc' },
    ja: { min: 20, max: 64, unit: '個' },
  },
  // Envelopes
  'business-envelopes': {
    en: { min: 0.14, max: 0.74, unit: 'pc' },
    ja: { min: 20, max: 103, unit: '個' },
  },
  'colored-envelopes': {
    en: { min: 0.18, max: 0.92, unit: 'pc' },
    ja: { min: 25, max: 129, unit: '個' },
  },
  'large-envelopes': {
    en: { min: 0.28, max: 1.10, unit: 'pc' },
    ja: { min: 39, max: 154, unit: '個' },
  },
  'pearl-envelopes': {
    en: { min: 0.46, max: 1.84, unit: 'pc' },
    ja: { min: 64, max: 258, unit: '個' },
  },
  // Calendars
  'wall-calendars': {
    en: { min: 4.60, max: 13.80, unit: 'pc' },
    ja: { min: 644, max: 1932, unit: '個' },
  },
  'desk-calendars': {
    en: { min: 5.52, max: 16.56, unit: 'pc' },
    ja: { min: 773, max: 2318, unit: '個' },
  },
  'custom-calendars': {
    en: { min: 7.36, max: 20.24, unit: 'pc' },
    ja: { min: 1030, max: 2834, unit: '個' },
  },
  'mini-calendars': {
    en: { min: 2.76, max: 7.36, unit: 'pc' },
    ja: { min: 386, max: 1030, unit: '個' },
  },
  'photo-frame-calendars': {
    en: { min: 9.20, max: 25.76, unit: 'pc' },
    ja: { min: 1288, max: 3606, unit: '個' },
  },
  'magnetic-calendars': {
    en: { min: 3.68, max: 11.04, unit: 'pc' },
    ja: { min: 515, max: 1546, unit: '個' },
  },
  // Red Packets
  'foil-red-packets': {
    en: { min: 0.46, max: 1.84, unit: 'pc' },
    ja: { min: 64, max: 258, unit: '個' },
  },
  'embossed-red-packets': {
    en: { min: 0.92, max: 3.22, unit: 'pc' },
    ja: { min: 129, max: 451, unit: '個' },
  },
  'custom-red-packets': {
    en: { min: 0.74, max: 2.30, unit: 'pc' },
    ja: { min: 103, max: 322, unit: '個' },
  },
  'cartoon-red-packets': {
    en: { min: 0.46, max: 1.84, unit: 'pc' },
    ja: { min: 64, max: 258, unit: '個' },
  },
  'eco-red-packets': {
    en: { min: 0.74, max: 2.30, unit: 'pc' },
    ja: { min: 103, max: 322, unit: '個' },
  },
  'large-red-packets': {
    en: { min: 0.92, max: 2.76, unit: 'pc' },
    ja: { min: 129, max: 387, unit: '個' },
  },
  // Educational
  'exercise-books': {
    en: { min: 1.84, max: 5.52, unit: 'pc' },
    ja: { min: 258, max: 773, unit: '個' },
  },
  'certificates': {
    en: { min: 2.76, max: 9.20, unit: 'pc' },
    ja: { min: 386, max: 1288, unit: '個' },
  },
  'school-flyers': {
    en: { min: 0.14, max: 0.37, unit: 'pc' },
    ja: { min: 20, max: 52, unit: '個' },
  },
  'textbooks': {
    en: { min: 9.20, max: 27.60, unit: 'pc' },
    ja: { min: 1288, max: 3864, unit: '個' },
  },
};

Object.assign(newPrices, newEntries);

// Generate new INDEPENDENT_PRICES block
let newBlock = `const INDEPENDENT_PRICES: Record<string, Record<'en' | 'ja', { min: number; max: number; unit: string }>> = {\n`;

const categories = {
  'Flyers': ['a4-flyers', 'a5-flyers', 'double-sided-flyers', 'folded-leaflets', 'thick-paper-flyers', 'eco-flyers', 'same-day-flyers'],
  'Stickers': ['waterproof-stickers', 'transparent-stickers', 'removable-stickers', 'small-batch-stickers', 'die-cut-stickers', 'foil-stickers', 'security-stickers', 'fluorescent-stickers', 'fruit-food-label-stickers'],
  'Posters': ['a2-posters', 'a1-posters', 'outdoor-posters', 'display-posters', 'art-posters', 'adhesive-posters'],
  'Packaging': ['gift-boxes', 'cosmetic-boxes', 'food-boxes', 'mailer-boxes', 'folding-boxes', 'rigid-boxes', 'magnetic-closure-gift-box', 'electronics-packaging-box', 'kraft-paper-packaging-box', 'drawer-slide-gift-box'],
  'Paper Bags': ['kraft-paper-bags', 'white-card-bags', 'gift-bags', 'eco-paper-bags', 'handle-bags', 'large-bags'],
  'Banners': ['outdoor-vinyl-banners', 'roll-up-banners', 'adhesive-banners', 'vehicle-wraps', 'mesh-banners'],
  'Books': ['catalog-printing', 'saddle-stitch-booklets', 'perfect-bound-books', 'hardcover-books', 'spiral-notebooks'],
  'Menus': ['pvc-menus', 'laminated-menus', 'hardcover-menus', 'drink-menus', 'disposable-menus'],
  'Envelopes': ['business-envelopes', 'colored-envelopes', 'large-envelopes', 'pearl-envelopes'],
  'Calendars': ['wall-calendars', 'desk-calendars', 'custom-calendars', 'mini-calendars', 'photo-frame-calendars', 'magnetic-calendars'],
  'Red Packets': ['foil-red-packets', 'embossed-red-packets', 'custom-red-packets', 'cartoon-red-packets', 'eco-red-packets', 'large-red-packets'],
  'Educational': ['exercise-books', 'certificates', 'school-flyers', 'textbooks'],
};

for (const [catName, slugs] of Object.entries(categories)) {
  newBlock += `  // ========== ${catName} ==========\n`;
  for (const slug of slugs) {
    const p = newPrices[slug];
    if (!p) {
      console.warn('Missing price for', slug);
      continue;
    }
    const enMin = p.en.min.toFixed(2).replace(/\.?0+$/, '');
    const enMax = p.en.max.toFixed(2).replace(/\.?0+$/, '');
    const jaMin = p.ja.min.toString();
    const jaMax = p.ja.max.toString();
    newBlock += `  '${slug}': {\n`;
    newBlock += `    'en': { min: ${enMin}, max: ${enMax}, unit: '${p.en.unit}' },\n`;
    newBlock += `    'ja': { min: ${jaMin}, max: ${jaMax}, unit: '${p.ja.unit}' },\n`;
    newBlock += `  },\n`;
  }
}

newBlock += `};\n`;

// Replace the block
const before = lines.slice(0, startIdx).join('\n');
const after = lines.slice(endIdx + 1).join('\n');
const newContent = before + '\n' + newBlock + '\n' + after;

fs.writeFileSync(filepath, newContent);
console.log(`Updated ${filepath}: ${Object.keys(newPrices).length} SKUs total`);
console.log(`  - Existing discounted: ${Object.keys(newPrices).length - Object.keys(newEntries).length}`);
console.log(`  - New added: ${Object.keys(newEntries).length}`);
