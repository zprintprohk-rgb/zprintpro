const fs = require('fs');
let content = fs.readFileSync('data/products.ts', 'utf8');

// Step 1: Merge title_zh, title_en, title_ja into name, nameEn, nameJa, title_zh
content = content.replace(
  /title_zh: '((?:[^'\\]|\\.)*)',\n\s*title_en: '((?:[^'\\]|\\.)*)',\n\s*title_ja: '((?:[^'\\]|\\.)*)',/g,
  (m, zh, en, ja) => `name: '${zh}', nameEn: '${en}', nameJa: '${ja}', title_zh: '${zh}',`
);

// Step 2: Merge description_zh, description_en, description_ja into description, descriptionEn, descriptionJa, description_zh
content = content.replace(
  /description_zh: '((?:[^'\\]|\\.)*)',\n\s*description_en: '((?:[^'\\]|\\.)*)',\n\s*description_ja: '((?:[^'\\]|\\.)*)',/g,
  (m, zh, en, ja) => `description: '${zh}', descriptionEn: '${en}', descriptionJa: '${ja}', description_zh: '${zh}',`
);

// Step 3: Replace interface fields
content = content.replace(/sku_code: string;/g, 'id: string;\n  sku_code: string;');
content = content.replace(/title_zh: string;/g, 'name: string;\n  nameEn: string;\n  nameJa: string;\n  title_zh: string;');
// Remove title_en and title_ja from interface
content = content.replace(/\n\s*title_en: string;/g, '');
content = content.replace(/\n\s*title_ja: string;/g, '');
content = content.replace(/description_zh: string;/g, 'description: string;\n  descriptionEn: string;\n  descriptionJa: string;\n  description_zh: string;');
// Remove description_en and description_ja from interface
content = content.replace(/\n\s*description_en: string;/g, '');
content = content.replace(/\n\s*description_ja: string;/g, '');
content = content.replace(/category_slug: string;/g, 'category: string;\n  category_slug: string;');
content = content.replace(/price_range: string;/g, 'price_range: string;\n  basePrice: number;');
content = content.replace(/weight_score: number;/g, 'weight_score: number;\n  isHot: boolean;\n  isNew: boolean;\n  minQuantity: number;');

// Step 4: Replace sku_code in objects
content = content.replace(/sku_code: '([^']+)'/g, "id: '$1',\n    sku_code: '$1'");

// Step 5: Replace category_slug in objects
content = content.replace(/category_slug: '([^']+)'/g, "category: '$1',\n    category_slug: '$1'");

// Step 6: Replace price_range and add basePrice, isHot, isNew, minQuantity
content = content.replace(/price_range: '([^']+)'/g, (m, p1) => {
  const num = p1.match(/HK\$([\d.]+)/);
  const basePrice = num ? parseInt(num[1]) : 0;
  return `price_range: '${p1}',\n    basePrice: ${basePrice}`;
});
content = content.replace(/weight_score: (\d+)/g, (m, p1) => {
  const score = parseInt(p1);
  return `weight_score: ${score},\n    isHot: ${score >= 90},\n    isNew: false,\n    minQuantity: 100`;
});

// Step 7: Fix getProductsByCategory to use category field
content = content.replace(
  /export function getProductsByCategory\(categorySlug: string\): Product\[\] \{\n  return products\.filter\(\(p\) => p\.category_slug === categorySlug\);\n\}/,
  `export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}`
);

// Step 8: Fix searchProducts
content = content.replace(
  /p\.title_zh\.toLowerCase\(\)\.includes\(lowerQuery\) \|\|\n\s*p\.title_en\.toLowerCase\(\)\.includes\(lowerQuery\) \|\|\n\s*p\.title_ja\.toLowerCase\(\)\.includes\(lowerQuery\) \|\|\n\s*p\.sku_code\.toLowerCase\(\)\.includes\(lowerQuery\)/,
  `p.name.toLowerCase().includes(lowerQuery) ||\n      p.nameEn.toLowerCase().includes(lowerQuery) ||\n      p.nameJa.toLowerCase().includes(lowerQuery) ||\n      p.sku_code.toLowerCase().includes(lowerQuery)`
);

fs.writeFileSync('src/data/products.ts', content);
console.log('Converted data/products.ts -> src/data/products.ts');
