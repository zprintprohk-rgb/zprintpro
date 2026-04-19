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

// Find all SEO entries by matching 'slug:' lines inside allProductSeo
const slugMatches = [...content.matchAll(/\n\s+slug:\s+'([a-z0-9-]+)'/g)];
let changes = 0;

for (const match of slugMatches) {
  const slug = match[1];
  
  // Find category from products.ts
  const slugIdx = productsContent.indexOf(`slug: '${slug}'`);
  if (slugIdx === -1) continue;
  
  const segment = productsContent.substring(slugIdx, slugIdx + 400);
  const catMatch = segment.match(/category_slug:\s*'([a-z-]+)'/);
  if (!catMatch) continue;
  
  const cat = catMatch[1];
  const guideSlug = guideMap[cat];
  if (!guideSlug) continue;

  // Check if this SEO block already has relatedBlogSlug
  // Find the end of this product block (next product or end of file)
  const matchIdx = match.index;
  const nextSlugMatch = slugMatches.find(m => m.index > matchIdx);
  const blockEnd = nextSlugMatch ? nextSlugMatch.index : content.length;
  const block = content.substring(matchIdx, blockEnd);
  
  if (block.includes('relatedBlogSlug')) continue;

  // Insert relatedBlogSlug right after the slug line
  const slugLineEnd = matchIdx + match[0].length;
  const insertText = `,\n    relatedBlogSlug: '${guideSlug}'`;
  content = content.slice(0, slugLineEnd) + insertText + content.slice(slugLineEnd);
  changes++;
  console.log(`Added relatedBlogSlug to: ${slug} -> ${guideSlug}`);
}

fs.writeFileSync(seoPath, content, 'utf-8');
console.log(`\nDone! Updated ${changes} products.`);
