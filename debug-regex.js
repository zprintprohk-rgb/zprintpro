const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf-8');
const slug = 'magnetic-closure-gift-box';
const idx = content.indexOf("slug: '" + slug + "'");
console.log('Found at index:', idx);
if (idx >= 0) {
  console.log('Context:', JSON.stringify(content.substring(idx-10, idx+50)));
}

// Try regex with 4 spaces
const re = new RegExp("(    slug: '" + slug + "',[\\s\\S]{0,500}?    images: \\[[^\\]]*\\],)");
const m = content.match(re);
console.log('Regex4 match:', m ? 'YES' : 'NO');

// Try with 2 spaces
const re2 = new RegExp("(  slug: '" + slug + "',[\\s\\S]{0,500}?  images: \\[[^\\]]*\\],)");
const m2 = content.match(re2);
console.log('Regex2 match:', m2 ? 'YES' : 'NO');

// Try with any spaces before slug
const re3 = new RegExp("(slug: '" + slug + "',[\\s\\S]{0,500}?images: \\[[^\\]]*\\],)");
const m3 = content.match(re3);
console.log('Regex0 match:', m3 ? 'YES' : 'NO');
if (m3) {
  console.log('Match:', JSON.stringify(m3[0].substring(0, 100)));
}
