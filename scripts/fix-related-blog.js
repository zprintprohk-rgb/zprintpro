const fs = require('fs');
const path = require('path');

const seoPath = path.join(__dirname, '..', 'src', 'data', 'product-seo.ts');
let content = fs.readFileSync(seoPath, 'utf-8');

// Mapping: product slug -> buying guide slug
const mapping = {
  'premium-business-cards': 'business-card-buying-guide',
  'thick-business-cards-400g': 'business-card-buying-guide',
  'foil-business-cards': 'business-card-buying-guide',
  'spot-uv-business-cards': 'business-card-buying-guide',
  'matte-business-cards': 'business-card-buying-guide',
  'rounded-corner-cards': 'business-card-buying-guide',
  'double-sided-cards': 'business-card-buying-guide',
  'same-day-business-cards': 'business-card-buying-guide',
  'eco-business-cards': 'business-card-buying-guide',
  'waterproof-stickers': 'sticker-buying-guide',
  'transparent-stickers': 'sticker-buying-guide',
  'removable-stickers': 'sticker-buying-guide',
  'small-batch-stickers': 'sticker-buying-guide',
  'die-cut-stickers': 'sticker-buying-guide',
  'foil-stickers': 'sticker-buying-guide',
  'security-stickers': 'sticker-buying-guide',
  'fluorescent-stickers': 'sticker-buying-guide',
  'kraft-paper-bags': 'paper-bag-buying-guide',
  'white-card-bags': 'paper-bag-buying-guide',
  'gift-bags': 'paper-bag-buying-guide',
  'eco-paper-bags': 'paper-bag-buying-guide',
  'handle-bags': 'paper-bag-buying-guide',
  'small-bags': 'paper-bag-buying-guide',
  'large-bags': 'paper-bag-buying-guide',
  'a4-flyers': 'flyer-buying-guide',
  'a5-flyers': 'flyer-buying-guide',
  'double-sided-flyers': 'flyer-buying-guide',
  'folded-leaflets': 'flyer-buying-guide',
  'thick-paper-flyers': 'flyer-buying-guide',
  'same-day-flyers': 'flyer-buying-guide',
  'eco-flyers': 'flyer-buying-guide',
  'a2-posters': 'poster-buying-guide',
  'a1-posters': 'poster-buying-guide',
  'outdoor-posters': 'poster-buying-guide',
  'display-posters': 'poster-buying-guide',
  'art-posters': 'poster-buying-guide',
  'adhesive-posters': 'poster-buying-guide',
  'gift-boxes': 'packaging-buying-guide',
  'cosmetic-boxes': 'packaging-buying-guide',
  'food-boxes': 'packaging-buying-guide',
  'mailer-boxes': 'packaging-buying-guide',
  'folding-boxes': 'packaging-buying-guide',
  'rigid-boxes': 'packaging-buying-guide',
};

let changes = 0;

for (const [productSlug, guideSlug] of Object.entries(mapping)) {
  const oldStr = `    slug: '${productSlug}',`;
  const newStr = `    slug: '${productSlug}',
    relatedBlogSlug: '${guideSlug}',`;
  
  // Only replace first occurrence (product definition)
  if (content.includes(oldStr)) {
    content = content.replace(oldStr, newStr);
    changes++;
    console.log(`Updated: ${productSlug} -> ${guideSlug}`);
  } else {
    console.log(`WARNING: Could not find: ${productSlug}`);
  }
}

fs.writeFileSync(seoPath, content, 'utf-8');
console.log(`\nDone! Updated ${changes} products.`);
