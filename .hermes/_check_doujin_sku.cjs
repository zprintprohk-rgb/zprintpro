// .hermes/_check_doujin_sku.cjs
const fs = require('fs');
const prod = fs.readFileSync('src/data/products.ts', 'utf8');
const slugs = [...prod.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].map(m => m[1]);
console.log('products total:', slugs.length);
console.log('doujin-ish:', slugs.filter(s => /doujin|zine/i.test(s)).join(',') || '(none)');
console.log('has doujinshi-printing:', slugs.includes('doujinshi-printing'));
// 是否有 redirect 映射
for (const f of ['next.config.js', 'middleware.ts', 'src/middleware.ts']) {
  if (fs.existsSync(f)) {
    const t = fs.readFileSync(f, 'utf8');
    if (t.includes('doujinshi-printing')) console.log('redirect/mapping in', f);
  }
}
