const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '..', 'src', 'data', 'products.ts');

// Category-specific variables templates (all with 4 fields: sizes, materials, finishings, quantities)
const templates = {
  'business-cards': `    variables: {
      sizes: [
        { value: 'standard', label: '標準尺寸 (90×54mm)', multiplier: 1 },
        { value: 'square', label: '方形 (65×65mm)', multiplier: 1.2 },
      ],
      materials: [
        { value: '300g', label: '300g銅版紙', surcharge: 0 },
        { value: '400g', label: '400g厚紙', surcharge: 100 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'matte', label: '啞膠', surcharge: 30 },
        { value: 'gloss', label: '光膠', surcharge: 30 },
        { value: 'spot-uv', label: '局部UV', surcharge: 80 },
        { value: 'foil', label: '燙金/燙銀', surcharge: 150 },
      ],
      quantities: [
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.85 },
        { value: 1000, label: '1000張', discount: 0.75 },
        { value: 2000, label: '2000張', discount: 0.65 },
      ],
    },`,

  'stickers': `    variables: {
      sizes: [
        { value: 'small', label: '小尺寸(≤50mm)', multiplier: 1 },
        { value: 'medium', label: '中尺寸(51-100mm)', multiplier: 1.5 },
        { value: 'large', label: '大尺寸(>100mm)', multiplier: 2.2 },
      ],
      materials: [
        { value: 'pvc', label: 'PVC防水', surcharge: 0 },
        { value: 'pp', label: 'PP合成紙', surcharge: 10 },
        { value: 'pet', label: 'PET透明', surcharge: 15 },
      ],
      finishings: [
        { value: 'gloss', label: '光膜', surcharge: 0 },
        { value: 'matte', label: '啞膜', surcharge: 5 },
        { value: 'diecut', label: '異形模切', surcharge: 30 },
      ],
      quantities: [
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.75 },
        { value: 1000, label: '1000張', discount: 0.6 },
      ],
    },`,

  'paper-bags': `    variables: {
      sizes: [
        { value: 'small', label: '小號(180×230×80mm)', multiplier: 1 },
        { value: 'medium', label: '中號(250×300×100mm)', multiplier: 1.4 },
        { value: 'large', label: '大號(320×400×120mm)', multiplier: 2 },
      ],
      materials: [
        { value: 'kraft', label: '牛皮紙', surcharge: 0 },
        { value: 'white', label: '白卡紙', surcharge: 50 },
        { value: 'art', label: '銅版紙', surcharge: 30 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'foil', label: '燙金', surcharge: 150 },
        { value: 'handle', label: '手挽繩', surcharge: 20 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },`,

  'flyers': `    variables: {
      sizes: [
        { value: 'a5', label: 'A5 (148×210mm)', multiplier: 0.65 },
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a3', label: 'A3 (297×420mm)', multiplier: 1.8 },
      ],
      materials: [
        { value: '128g', label: '128g銅版紙', surcharge: 0 },
        { value: '157g', label: '157g銅版紙', surcharge: 15 },
        { value: '200g', label: '200g厚紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'single', label: '單面印刷', surcharge: 0 },
        { value: 'double', label: '雙面印刷', surcharge: 20 },
        { value: 'fold', label: '摺疊', surcharge: 35 },
      ],
      quantities: [
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.8 },
        { value: 1000, label: '1000張', discount: 0.65 },
        { value: 5000, label: '5000張', discount: 0.5 },
      ],
    },`,

  'posters': `    variables: {
      sizes: [
        { value: 'a2', label: 'A2 (420×594mm)', multiplier: 1 },
        { value: 'a1', label: 'A1 (594×841mm)', multiplier: 1.8 },
        { value: 'a0', label: 'A0 (841×1189mm)', multiplier: 3.2 },
      ],
      materials: [
        { value: '157g', label: '157g銅版紙', surcharge: 0 },
        { value: '200g', label: '200g厚紙', surcharge: 50 },
        { value: 'photo', label: '相紙', surcharge: 80 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'pp', label: 'PP護膜', surcharge: 30 },
        { value: 'foam', label: '泡沫板裱貼', surcharge: 60 },
      ],
      quantities: [
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.85 },
        { value: 1000, label: '1000張', discount: 0.7 },
      ],
    },`,

  'packaging': `    variables: {
      sizes: [
        { value: 'small', label: '小號(100×80×50mm)', multiplier: 1 },
        { value: 'medium', label: '中號(150×120×80mm)', multiplier: 1.6 },
        { value: 'large', label: '大號(200×180×100mm)', multiplier: 2.5 },
      ],
      materials: [
        { value: 'white-card', label: '白卡紙', surcharge: 0 },
        { value: 'kraft', label: '牛皮紙', surcharge: 10 },
        { value: 'rigid', label: '硬紙板', surcharge: 80 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'foil', label: '燙金', surcharge: 60 },
        { value: 'uv', label: 'UV', surcharge: 50 },
        { value: 'emboss', label: '擊凸', surcharge: 70 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },`,

  'books': `    variables: {
      sizes: [
        { value: 'a5', label: 'A5 (148×210mm)', multiplier: 1 },
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1.5 },
        { value: 'b5', label: 'B5 (176×250mm)', multiplier: 1.3 },
      ],
      materials: [
        { value: '80g', label: '80g書紙', surcharge: 0 },
        { value: '100g', label: '100g書紙', surcharge: 20 },
        { value: '128g', label: '128g銅版紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'saddle', label: '騎馬釘', surcharge: 0 },
        { value: 'perfect', label: '膠裝', surcharge: 30 },
        { value: 'hardcover', label: '精裝', surcharge: 100 },
      ],
      quantities: [
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },`,

  'banners': `    variables: {
      sizes: [
        { value: 'small', label: '小號(850×2000mm)', multiplier: 1 },
        { value: 'medium', label: '中號(1000×2500mm)', multiplier: 1.5 },
        { value: 'large', label: '大號(1200×3000mm)', multiplier: 2.2 },
      ],
      materials: [
        { value: 'vinyl', label: '防水帆布', surcharge: 0 },
        { value: 'mesh', label: '網孔布', surcharge: 30 },
        { value: 'fabric', label: '旗幟布', surcharge: 50 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'eyelets', label: '打孔', surcharge: 20 },
        { value: 'pole-pocket', label: '穿杆袋', surcharge: 30 },
      ],
      quantities: [
        { value: 1, label: '1張', discount: 1 },
        { value: 5, label: '5張', discount: 0.8 },
        { value: 10, label: '10張', discount: 0.65 },
      ],
    },`,

  'menus': `    variables: {
      sizes: [
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a5', label: 'A5 (148×210mm)', multiplier: 0.7 },
        { value: 'dl', label: 'DL (99×210mm)', multiplier: 0.5 },
      ],
      materials: [
        { value: '157g', label: '157g銅版紙', surcharge: 0 },
        { value: '200g', label: '200g厚紙', surcharge: 20 },
        { value: '300g', label: '300g卡紙', surcharge: 50 },
      ],
      finishings: [
        { value: 'single', label: '單面', surcharge: 0 },
        { value: 'double', label: '雙面', surcharge: 15 },
        { value: 'laminate', label: '過膠', surcharge: 25 },
      ],
      quantities: [
        { value: 50, label: '50張', discount: 1 },
        { value: 100, label: '100張', discount: 0.85 },
        { value: 500, label: '500張', discount: 0.7 },
      ],
    },`,

  'calendars': `    variables: {
      sizes: [
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a3', label: 'A3 (297×420mm)', multiplier: 1.8 },
        { value: 'desk', label: '座檯 (150×200mm)', multiplier: 0.6 },
      ],
      materials: [
        { value: '157g', label: '157g銅版紙', surcharge: 0 },
        { value: '200g', label: '200g厚紙', surcharge: 20 },
        { value: '250g', label: '250g卡紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'saddle', label: '騎馬釘', surcharge: 0 },
        { value: 'spiral', label: '鐵圈裝', surcharge: 15 },
        { value: 'perfect', label: '膠裝', surcharge: 20 },
      ],
      quantities: [
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },`,

  'envelopes': `    variables: {
      sizes: [
        { value: 'dl', label: 'DL (110×220mm)', multiplier: 1 },
        { value: 'c5', label: 'C5 (162×229mm)', multiplier: 1.3 },
        { value: 'c4', label: 'C4 (229×324mm)', multiplier: 1.8 },
      ],
      materials: [
        { value: '80g', label: '80g書紙', surcharge: 0 },
        { value: '100g', label: '100g書紙', surcharge: 10 },
        { value: '120g', label: '120g彩色紙', surcharge: 20 },
      ],
      finishings: [
        { value: 'none', label: '無窗口', surcharge: 0 },
        { value: 'window', label: '有窗口', surcharge: 15 },
        { value: 'peel', label: '自黏封口', surcharge: 10 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },`,

  'red-packets': `    variables: {
      sizes: [
        { value: 'standard', label: '標準 (90×170mm)', multiplier: 1 },
        { value: 'large', label: '大號 (100×190mm)', multiplier: 1.3 },
        { value: 'premium', label: '豪華 (120×220mm)', multiplier: 1.8 },
      ],
      materials: [
        { value: '128g', label: '128g紅紙', surcharge: 0 },
        { value: '157g', label: '157g厚紅紙', surcharge: 15 },
        { value: 'special', label: '特種紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'none', label: '燙金', surcharge: 0 },
        { value: 'foil', label: '燙金浮雕', surcharge: 50 },
        { value: 'emboss', label: '立體燙金', surcharge: 100 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },`,

  'educational': `    variables: {
      sizes: [
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a3', label: 'A3 (297×420mm)', multiplier: 1.8 },
        { value: 'b4', label: 'B4 (250×353mm)', multiplier: 1.5 },
      ],
      materials: [
        { value: '80g', label: '80g書紙', surcharge: 0 },
        { value: '100g', label: '100g書紙', surcharge: 10 },
        { value: '120g', label: '120g彩色紙', surcharge: 20 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'staple', label: '釘裝', surcharge: 5 },
        { value: 'perfect', label: '膠裝', surcharge: 15 },
      ],
      quantities: [
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },`,
};

let content = fs.readFileSync(PRODUCTS_FILE, 'utf8');

// Find all product blocks and their category_slugs
const productRegex = /{\s*\n\s*id:\s*'([A-Z]+-[0-9]+)'[\s\S]*?category_slug:\s*'([^']+)'[\s\S]*?(?=\n\s*},\s*\n\s*{|\n\s*}\s*;\s*\n\s*export)/g;

let match;
let injected = 0;
let skipped = 0;
const injectedIds = [];

while ((match = productRegex.exec(content)) !== null) {
  const id = match[1];
  const categorySlug = match[2];
  const block = match[0];
  
  // Skip if already has variables
  if (block.includes('variables:')) {
    skipped++;
    continue;
  }
  
  const template = templates[categorySlug];
  if (!template) {
    console.log(`No template for category: ${categorySlug} (SKU: ${id})`);
    skipped++;
    continue;
  }
  
  // Find insertion point: after imagesByLocale block or images line, before seoImages
  let insertPoint;
  const imagesByLocaleMatch = block.match(/(imagesByLocale:\s*\{[\s\S]*?\n\s*\},)/);
  if (imagesByLocaleMatch) {
    insertPoint = block.indexOf(imagesByLocaleMatch[1]) + imagesByLocaleMatch[1].length;
  } else {
    const imagesMatch = block.match(/(images:\s*\[[^\]]*\],)/);
    if (imagesMatch) {
      insertPoint = block.indexOf(imagesMatch[1]) + imagesMatch[1].length;
    } else {
      console.log(`Cannot find insertion point for ${id}`);
      skipped++;
      continue;
    }
  }
  
  // Build new block with variables inserted
  const beforeInsert = block.slice(0, insertPoint);
  const afterInsert = block.slice(insertPoint);
  const newBlock = beforeInsert + '\n' + template + afterInsert;
  
  // Replace in content
  const blockStart = content.indexOf(block);
  if (blockStart === -1) {
    console.log(`Cannot locate block for ${id} in content`);
    skipped++;
    continue;
  }
  
  content = content.slice(0, blockStart) + newBlock + content.slice(blockStart + block.length);
  
  // Adjust regex lastIndex since content changed
  productRegex.lastIndex = blockStart + newBlock.length;
  
  injected++;
  injectedIds.push(id);
}

fs.writeFileSync(PRODUCTS_FILE, content, 'utf8');
console.log(`Injected: ${injected} SKUs`);
console.log(`Skipped (already has variables or no template): ${skipped}`);
console.log('Injected IDs:', injectedIds.sort().join(', '));
