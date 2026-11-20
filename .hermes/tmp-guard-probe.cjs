const fs = require('fs');
const te = fs.readFileSync('scripts/guards/title-equiv.js', 'utf8');
console.log('=== title-equiv.js (first 1200) ===');
console.log(te.slice(0, 1200));

const prod = fs.readFileSync('src/data/products.ts', 'utf8');
console.log('\n=== SKU/品类存在性 ===');
for (const k of ['saddle-stitch-booklets', 'hardcover-books', 'perfect-bound-books', 'spiral-notebooks', 'japan-doujin', 'books']) {
  console.log('  ' + k + ': ' + prod.includes("'" + k + "'"));
}

const bp = fs.readFileSync('src/data/blog-posts.ts', 'utf8');
console.log('\n=== slug 冲突检查 ===');
for (const k of ['zine', 'picture-book', 'photo-book', 'notebook', 'journal']) {
  const re = new RegExp("slug: '[^']*" + k + "[^']*'", 'g');
  console.log('  ~' + k + ': ' + JSON.stringify((bp.match(re) || []).slice(0, 8)));
}

const q12 = fs.readFileSync('scripts/guards/blog-quality-12-rules-guard.js', 'utf8');
const pm = q12.match(/PILLAR[\s\S]{0,500}?\]/);
console.log('\n=== Pillar slug list ===');
console.log(pm ? pm[0].slice(0, 700) : '(not found)');

const ilg = fs.readFileSync('scripts/guards/internal-links-cta-guard.js', 'utf8');
console.log('\n=== internal-links-cta-guard 关键行 ===');
ilg.split('\n').filter((l) => /MIN_|PILLAR|>= *\d|< *\d/.test(l)).slice(0, 30).forEach((l) => console.log('  ' + l.trim().slice(0, 140)));
