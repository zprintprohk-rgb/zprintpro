// .hermes/_link_valid_check.cjs — 2 篇博客全部内链有效性 (slug 存在性)
const fs = require('fs');
const prod = fs.readFileSync('src/data/products.ts', 'utf8');
const prodSlugs = new Set([...prod.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].map(m => m[1]));
const cats = ['packaging', 'banners', 'books', 'menus', 'envelopes', 'calendars', 'red-packets', 'educational', 'stickers', 'flyers', 'posters', 'paper-bags', 'japan-doujin', 'greeting-cards'];
let bad = 0, checked = 0;
for (const l of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(`src/data/blog-data/${l}.json`, 'utf8'));
  const allSlugs = new Set(Object.keys(j));
  for (const slug of ['restaurant-opening-flyer-printing-guide', 'pet-food-sticker-printing-guide']) {
    const c = j[slug].content;
    for (const m of c.matchAll(/href="(\/[^"]+)"/g)) {
      const href = m[1];
      checked++;
      const mm = href.match(/^\/(zh-hk|en|ja)\/(product|category|blog)\/([a-z0-9-]+)\/$/);
      if (!mm) { console.log('SHAPE?', l, href); bad++; continue; }
      const [, loc, kind, s] = mm;
      if (loc !== l) { console.log('LOCALE MISMATCH', l, href); bad++; continue; }
      if (kind === 'product' && !prodSlugs.has(s)) { console.log('BAD product', href); bad++; }
      if (kind === 'category' && !cats.includes(s)) { console.log('BAD category', href); bad++; }
      if (kind === 'blog' && !allSlugs.has(s)) { console.log('BAD blog', href); bad++; }
    }
  }
}
console.log(`checked=${checked} bad=${bad}`);
