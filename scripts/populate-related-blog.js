const fs = require('fs');
const path = require('path');

const seoPath = path.join(__dirname, '..', 'src', 'data', 'product-seo.ts');
const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.ts');

let content = fs.readFileSync(seoPath, 'utf-8');
const productsContent = fs.readFileSync(productsPath, 'utf-8');

const guideMap = {
  'business-cards': 'business-card-buying-guide',
  'stickers': 'sticker-buying-guide',
  'flyers': 'flyer-buying-guide',
  'packaging': 'packaging-buying-guide',
  'posters': 'poster-buying-guide',
  'paper-bags': 'paper-bag-buying-guide',
};

// Find all product blocks in product-seo.ts
const productMatches = [...content.matchAll(/\n\s+'([a-z0-9-]+)':\s*\{/g)];
let changes = 0;

for (const match of productMatches) {
  const slug = match[1];
  if (['zh-hk', 'en', 'ja'].includes(slug)) continue;

  // Find category from products.ts
  const slugIdx = productsContent.indexOf(`slug: '${slug}'`);
  if (slugIdx === -1) continue;
  
  const segment = productsContent.substring(slugIdx, slugIdx + 400);
  const catMatch = segment.match(/category_slug:\s*'([a-z-]+)'/);
  if (!catMatch) continue;
  
  const cat = catMatch[1];
  const guideSlug = guideMap[cat];
  if (!guideSlug) continue;

  // Check if already has relatedBlogSlug in this product block
  const matchIdx = match.index;
  const nextMatch = productMatches.find(m => m.index > matchIdx);
  const blockEnd = nextMatch ? nextMatch.index : matchIdx + 2000;
  const block = content.substring(matchIdx, blockEnd);
  
  if (block.includes('relatedBlogSlug')) continue;

  // Insert relatedBlogSlug after the opening brace line
  const insertIdx = matchIdx + match[0].length;
  const insertText = `\n    relatedBlogSlug: '${guideSlug}',`;
  content = content.slice(0, insertIdx) + insertText + content.slice(insertIdx);
  changes++;
  console.log(`Added relatedBlogSlug to: ${slug} -> ${guideSlug}`);
}

fs.writeFileSync(seoPath, content, 'utf-8');
console.log(`\nDone! Updated ${changes} products.`);
