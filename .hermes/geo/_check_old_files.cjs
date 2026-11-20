// Verify restored old image paths exist on disk (zero-404 check for the rollback)
const fs = require('fs');
const { execSync } = require('child_process');
const TARGETS = ['corrugated-boxes', 'cosmetic-boxes', 'electronics-packaging-box', 'gang-run-card-boxes', 'kraft-paper-packaging-box', 'magnetic-closure-gift-box', 'mailer-boxes', 'rigid-boxes', 'tuck-end-boxes', 'white-card-boxes'];
const ts = fs.readFileSync('src/data/products.ts', 'utf8');
function blockOf(src, slug) {
  const start = src.indexOf(`slug: '${slug}'`);
  if (start < 0) return null;
  const re = /\bslug:\s*'[a-z0-9-]+'/g; re.lastIndex = start + 1;
  const m = re.exec(src);
  const arrEnd = src.indexOf('\n];', start);
  const end = m ? m.index : src.length;
  return src.slice(start, arrEnd !== -1 && arrEnd < end ? arrEnd : end);
}
let total = 0, missing = [];
for (const s of TARGETS) {
  const b = blockOf(ts, s);
  const urls = [...b.matchAll(/'(\/images\/[^']+)'/g)].map(m => m[1]);
  const uniq = [...new Set(urls)];
  for (const u of uniq) {
    total++;
    const p = 'public' + u;
    if (!fs.existsSync(p)) missing.push(`${s} ${u}`);
  }
  console.log(`${s}: refs=${uniq.length} first=${uniq[0]}`);
}
console.log(`checked=${total} missing=${missing.length}`);
if (missing.length) console.log('MISSING:\n' + missing.join('\n'));
