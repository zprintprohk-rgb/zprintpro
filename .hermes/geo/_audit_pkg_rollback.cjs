// Independent audit of the packaging rollback vs git HEAD (pre-rollback) sitemap + products.ts diff
const fs = require('fs');
const { execSync } = require('child_process');
const TARGETS = ['corrugated-boxes', 'cosmetic-boxes', 'electronics-packaging-box', 'gang-run-card-boxes', 'kraft-paper-packaging-box', 'magnetic-closure-gift-box', 'mailer-boxes', 'rigid-boxes', 'tuck-end-boxes', 'white-card-boxes'];

const baseXml = execSync('git show HEAD:public/sitemap-image.xml', { encoding: 'utf8', maxBuffer: 64e6 });
const curXml = fs.readFileSync('public/sitemap-image.xml', 'utf8');
const set = (x) => new Set([...x.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(m => m[1]));
const B = set(baseXml), C = set(curXml);
const lost = [...B].filter(u => !C.has(u));
const lostNonTarget = lost.filter(u => !TARGETS.some(s => u.includes(s)));
const gained = [...C].filter(u => !B.has(u));
console.log(`imglocs base=${B.size} cur=${C.size} lost=${lost.length} lostNonTarget=${lostNonTarget.length} gained=${gained.length}`);
if (lostNonTarget.length) console.log('LOST_NON_TARGET_SAMPLE=' + lostNonTarget.slice(0, 5).join(' | '));

// target old URLs must all be present
const oldTs = execSync('git show 62c9b070:src/data/products.ts', { encoding: 'utf8', maxBuffer: 64e6 });
function blockOf(src, slug) {
  const start = src.indexOf(`slug: '${slug}'`);
  if (start < 0) return null;
  const re = /\bslug:\s*'[a-z0-9-]+'/g; re.lastIndex = start + 1;
  const m = re.exec(src);
  const arrEnd = src.indexOf('\n];', start);
  const end = m ? m.index : src.length;
  return src.slice(start, arrEnd !== -1 && arrEnd < end ? arrEnd : end);
}
let missing = 0, checked = 0;
for (const s of TARGETS) {
  const b = blockOf(oldTs, s);
  const ibl = b.match(/imagesByLocale:[\s\S]*?\n\s{4,}\}/)[0];
  const urls = [...ibl.matchAll(/'(\/images\/[^']+)'/g)].map(m => m[1]);
  for (const u of urls) { checked++; if (!C.has('https://zprintpro.com' + u)) { missing++; console.log(`MISSING_OLD ${s} ${u}`); } }
}
console.log(`old_urls_checked=${checked} missing=${missing}`);

// no v28_5 remains for targets; total v28_5 count
const v28 = [...C].filter(u => u.includes('/images/products/v28_5/'));
const v28Targets = v28.filter(u => TARGETS.some(s => u.includes('/v28_5/' + s + '/')));
console.log(`v28_5_total=${v28.length} (expect 492) v28_5_in_targets=${v28Targets.length} (expect 0)`);
const dirs = fs.readdirSync('public/images/products/v28_5', { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
console.log(`dirs=${dirs.length} (expect 41) target_dirs_remaining=${TARGETS.filter(t => dirs.includes(t)).length}`);

// products.ts: forbidden fields + image-only diff vs HEAD
const diff = execSync('git diff HEAD -- src/data/products.ts', { encoding: 'utf8', maxBuffer: 64e6 });
const lines = diff.split('\n').filter(l => /^[+-]/.test(l) && !/^[+-]{3}/.test(l));
const forb = ['title_zh', 'minQuantity', 'basePrice', 'seoImages', 'imageAlt'].map(k => k + '=' + lines.filter(l => l.includes(k)).length).join(' ');
console.log('forbidden=' + forb + ' changed_lines=' + lines.length);
const tsNow = fs.readFileSync('src/data/products.ts', 'utf8');
console.log('v28_5_refs_in_ts=' + (tsNow.match(/\/images\/products\/v28_5\//g) || []).length + ' (expect 533)');
