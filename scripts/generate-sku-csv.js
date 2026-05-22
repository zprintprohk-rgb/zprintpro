const fs = require('fs');
const path = require('path');

// Read the products file
const productsPath = path.join(__dirname, '../src/data/products.ts');
const content = fs.readFileSync(productsPath, 'utf-8');

// Extract all product objects
const productBlocks = content.split(/(?=\{\s*id:\s*['"])/g).slice(1);
const products = [];

for (const block of productBlocks) {
  const slugMatch = block.match(/slug:\s*['"]([^'"]+)['"]/);
  if (!slugMatch) continue;
  
  const skuMatch = block.match(/sku_code:\s*['"]([^'"]+)['"]/);
  const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/);
  const nameEnMatch = block.match(/nameEn:\s*['"]([^'"]+)['"]/);
  const nameJaMatch = block.match(/nameJa:\s*['"]([^'"]+)['"]/);
  const descMatch = block.match(/description:\s*['"]([^'"]+)['"]/);
  const descEnMatch = block.match(/descriptionEn:\s*['"]([^'"]+)['"]/);
  const descJaMatch = block.match(/descriptionJa:\s*['"]([^'"]+)['"]/);
  const catMatch = block.match(/category:\s*['"]([^'"]+)['"]/);
  const catSlugMatch = block.match(/category_slug:\s*['"]([^'"]+)['"]/);
  
  products.push({
    slug: slugMatch[1],
    sku: skuMatch ? skuMatch[1] : '',
    name: nameMatch ? nameMatch[1] : '',
    nameEn: nameEnMatch ? nameEnMatch[1] : '',
    nameJa: nameJaMatch ? nameJaMatch[1] : '',
    description: descMatch ? descMatch[1] : '',
    descriptionEn: descEnMatch ? descEnMatch[1] : '',
    descriptionJa: descJaMatch ? descJaMatch[1] : '',
    category: catMatch ? catMatch[1] : '',
    categorySlug: catSlugMatch ? catSlugMatch[1] : ''
  });
}

// Category name mapping
const categoryNames = {
  'business-cards': { zh: '咭片', en: 'Business Cards', ja: '名刺' },
  'stickers': { zh: '貼紙', en: 'Stickers', ja: 'ステッカー' },
  'paper-bags': { zh: '紙袋', en: 'Paper Bags', ja: '紙袋' },
  'flyers': { zh: '宣傳單張', en: 'Flyers', ja: 'チラシ' },
  'posters': { zh: '海報', en: 'Posters', ja: 'ポスター' },
  'packaging': { zh: '包裝盒', en: 'Packaging', ja: 'パッケージ' },
  'red-packets': { zh: '利是封', en: 'Red Packets', ja: 'ポチ袋' },
  'calendars': { zh: '年曆', en: 'Calendars', ja: 'カレンダー' },
  'menus': { zh: '餐牌', en: 'Menus', ja: 'メニュー' },
  'banners': { zh: '噴繪廣告', en: 'Banners', ja: 'バナー' },
  'books': { zh: '書籍', en: 'Books', ja: '書籍' },
  'envelopes': { zh: '信封', en: 'Envelopes', ja: '封筒' },
  'educational': { zh: '校園教育', en: 'Educational', ja: '教育' },
};

// Generate SEO data for each product
function generateSeo(product) {
  const cat = categoryNames[product.category] || { zh: '印刷', en: 'Printing', ja: '印刷' };
  
  // SEO Title (60 chars max)
  const seoTitleZh = `${product.name} | 香港專業${cat.zh}印刷 | 智印云ZPrintPro`;
  const seoTitleEn = `${product.nameEn} | Professional ${cat.en} Printing Hong Kong | ZPrintPro`;
  const seoTitleJa = `${product.nameJa} | 香港${cat.ja}印刷 | ZPrintPro`;
  
  // SEO Keywords
  const seoKeywordsZh = `${product.name},${cat.zh}印刷,香港${cat.zh},${cat.zh}定制,${cat.zh}印刷公司,智印云,即日${cat.zh},急印${cat.zh},觀塘${cat.zh}`;
  const seoKeywordsEn = `${product.nameEn},${cat.en} printing Hong Kong,custom ${cat.en.toLowerCase()},${cat.en.toLowerCase()} printing,same day ${cat.en.toLowerCase()},ZPrintPro,Kwun Tong printing`;
  const seoKeywordsJa = `${product.nameJa},${cat.ja}印刷,香港${cat.ja},${cat.ja}作成,${cat.ja}印刷会社,ZPrintPro,即日${cat.ja}`;
  
  // SEO Description (160 chars max)
  const baseDescZh = product.description.length > 80 ? product.description.substring(0, 80) + '...' : product.description;
  const baseDescEn = product.descriptionEn.length > 80 ? product.descriptionEn.substring(0, 80) + '...' : product.descriptionEn;
  const baseDescJa = product.descriptionJa.length > 80 ? product.descriptionJa.substring(0, 80) + '...' : product.descriptionJa;
  
  const seoDescZh = `${baseDescZh} 智印云提供專業${cat.zh}印刷服務，品質保證，價格透明，即日交貨。ISO9001認證，觀塘實體工廠。`;
  const seoDescEn = `${baseDescEn} ZPrintPro offers professional ${cat.en.toLowerCase()} printing in Hong Kong. Same-day delivery, ISO9001 certified, factory-direct pricing.`;
  const seoDescJa = `${baseDescJa} ZPrintProは香港の${cat.ja}印刷専門店。最短当日納品、ISO9001認証、工場直送価格。`;
  
  // Static filename
  const staticFileName = `${product.slug}.html`;
  
  return {
    seoTitleZh,
    seoTitleEn,
    seoTitleJa,
    seoKeywordsZh,
    seoKeywordsEn,
    seoKeywordsJa,
    seoDescZh,
    seoDescEn,
    seoDescJa,
    staticFileName
  };
}

// Build CSV
const headers = [
  'SKU', 'Category', 'Slug',
  'Product Name (ZH)', 'Product Name (EN)', 'Product Name (JA)',
  'Description (ZH)', 'Description (EN)', 'Description (JA)',
  'SEO Title (ZH)', 'SEO Title (EN)', 'SEO Title (JA)',
  'SEO Keywords (ZH)', 'SEO Keywords (EN)', 'SEO Keywords (JA)',
  'SEO Description (ZH)', 'SEO Description (EN)', 'SEO Description (JA)',
  'Static File Name'
];

const rows = products.map(p => {
  const seo = generateSeo(p);
  return [
    p.sku, p.category, p.slug,
    `"${p.name}"`, `"${p.nameEn}"`, `"${p.nameJa}"`,
    `"${p.description}"`, `"${p.descriptionEn}"`, `"${p.descriptionJa}"`,
    `"${seo.seoTitleZh}"`, `"${seo.seoTitleEn}"`, `"${seo.seoTitleJa}"`,
    `"${seo.seoKeywordsZh}"`, `"${seo.seoKeywordsEn}"`, `"${seo.seoKeywordsJa}"`,
    `"${seo.seoDescZh}"`, `"${seo.seoDescEn}"`, `"${seo.seoDescJa}"`,
    seo.staticFileName
  ].join(',');
});

const csv = [headers.join(','), ...rows].join('\n');

// Write CSV
const csvPath = path.join(__dirname, '../sku-seo-optimization.csv');
fs.writeFileSync(csvPath, '\uFEFF' + csv, 'utf-8');

console.log(`✅ Generated SKU SEO CSV: ${csvPath}`);
console.log(`📊 Total SKUs: ${products.length}`);
console.log(`📁 Categories: ${[...new Set(products.map(p => p.category))].join(', ')}`);
