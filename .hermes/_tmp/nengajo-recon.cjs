const fs = require('fs');
const head = (p, n) => { try { return fs.readFileSync(p, 'utf8').split('\n').slice(0, n).join('\n'); } catch (e) { return 'ERR ' + e.message; } };
console.log('== business-cards-printing page head ==');
console.log(head('src/app/[locale]/services/business-cards-printing/page.tsx', 42));
console.log('== sitemap candidates ==');
for (const p of ['src/app/sitemap.ts', 'src/app/sitemap.xml/route.ts', 'src/lib/sitemap.ts', 'next-sitemap.config.js']) console.log(p, fs.existsSync(p));
console.log('== GC SKU truth ==');
const ts = fs.readFileSync('src/data/products.ts', 'utf8');
for (const slug of ['premium-greeting-cards', 'thick-greeting-cards-400g', 'foil-greeting-cards', 'spot-uv-greeting-cards', 'matte-greeting-cards', 'rounded-corner-greeting-cards']) {
  const i = ts.indexOf("slug: '" + slug + "'");
  const blk = ts.slice(i, i + 2600);
  const g = (re) => { const m = blk.match(re); return m ? m[1] : '?'; };
  console.log(JSON.stringify({
    slug,
    basePrice: g(/basePrice:\s*([\d.]+)/),
    basePrice_ja: g(/basePrice_ja:\s*([\d.]+)/),
    minQuantity: g(/minQuantity:\s*(\d+)/),
    turnaround: g(/turnaround:\s*'([^']*)'/) || g(/turnaround:\s*"([^"]*)"/),
    nameJa: g(/nameJa:\s*'([^']{0,50})/),
  }));
}
console.log('== ja.json has new-year-card? blog-posts meta head ==');
console.log(head('src/data/blog-posts.ts', 0) === '' ? '' : '');
const bi = fs.readFileSync('src/data/blog-posts.ts', 'utf8').indexOf("slug: 'new-year-card-printing-2027-guide'");
console.log(fs.readFileSync('src/data/blog-posts.ts', 'utf8').slice(bi - 120, bi + 900));
