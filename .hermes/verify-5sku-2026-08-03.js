const fs = require('fs');
const path = 'F:\\zprintpro-nextjs\\src\\data\\products.ts';
const b = fs.readFileSync(path);
console.log('Size:', b.length, 'BOM:', b[0] === 0xFF);
const c = b.toString('utf-8');
['fruit-food-label-stickers','white-card-boxes','large-bags','a5-flyers','corrugated-boxes'].forEach(s => {
  const re = new RegExp("slug: '" + s + "',\\n\\s*optimizedAt: '([^']+)',\\n\\s*optimizationRound: (\\d+)");
  const m = c.match(re);
  if (m) {
    console.log(s, '-> optimizedAt:', m[1], '/ R' + m[2]);
  } else {
    console.log(s, '-> NOT FOUND');
  }
});
console.log('\\n=== 7 industry standard line check ===');
['餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動', 'Restaurants & Catering, Retail & Boutique', '飲食・ケータリング、小売・ブティック'].forEach(needle => {
  const count = c.split(needle).length - 1;
  console.log(`"${needle.substring(0,30)}..." -> ${count} occurrences`);
});
