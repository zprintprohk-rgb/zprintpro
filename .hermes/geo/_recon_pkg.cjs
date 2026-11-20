// Recon: packaging-category SKU set × deployed v28_5 dirs × pre-swap image blocks availability
const fs = require('fs');
const { execSync } = require('child_process');
const ts = fs.readFileSync('src/data/products.ts', 'utf8');
const prodStart = ts.indexOf('export const products: Product[] = [');
const prodEnd = ts.indexOf('\n];', prodStart);
const region = ts.slice(prodStart, prodEnd);
const hits = [...region.matchAll(/\bslug:\s*'([a-z0-9-]+)'/g)].map(m => ({ slug: m[1], i: m.index }));
const cat = {};
hits.forEach((h, k) => {
  const block = region.slice(h.i, k + 1 < hits.length ? hits[k + 1].i : region.length);
  const m = block.match(/^\s*category_slug:\s*'([a-z0-9-]+)'/m) || block.match(/^\s*category:\s*'([a-z0-9-]+)'/m);
  cat[h.slug] = m ? m[1] : 'UNKNOWN';
});
const pkg = Object.entries(cat).filter(([, c]) => c === 'packaging').map(([s]) => s).sort();
const deployed = fs.existsSync('public/images/products/v28_5') ? fs.readdirSync('public/images/products/v28_5', { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name) : [];
const deployedSet = new Set(deployed);
const pkgDeployed = pkg.filter(s => deployedSet.has(s));
const pkgNotDeployed = pkg.filter(s => !deployedSet.has(s));
console.log('packaging_skus(' + pkg.length + ')=' + pkg.join(','));
console.log('deployed_v285(' + deployed.length + ')=' + deployed.sort().join(','));
console.log('pkg_DEPLOYED(' + pkgDeployed.length + ')=' + pkgDeployed.join(','));
console.log('pkg_not_deployed(' + pkgNotDeployed.length + ')=' + pkgNotDeployed.join(','));
// category distribution sanity
const dist = {};
for (const c of Object.values(cat)) dist[c] = (dist[c] || 0) + 1;
console.log('category_dist=' + JSON.stringify(dist));
// pre-swap availability: block image fields at 62c9b070
const base = '62c9b070';
const oldTs = execSync(`git show ${base}:src/data/products.ts`, { encoding: 'utf8', maxBuffer: 64e6 });
const oldRegion = oldTs.slice(oldTs.indexOf('export const products: Product[] = ['), oldTs.indexOf('\n];', oldTs.indexOf('export const products: Product[] = [')));
const oldHits = [...oldRegion.matchAll(/\bslug:\s*'([a-z0-9-]+)'/g)].map(m => ({ slug: m[1], i: m.index }));
for (const s of pkgDeployed) {
  const k = oldHits.findIndex(h => h.slug === s);
  if (k < 0) { console.log(`OLD ${s}: NOT_FOUND`); continue; }
  const block = oldRegion.slice(oldHits[k].i, k + 1 < oldHits.length ? oldHits[k + 1].i : oldRegion.length);
  const hasIbl = /imagesByLocale:/.test(block);
  const leg = (block.match(/images:\s*\[([^\]]*)\]/) || [])[1] || '';
  const n = (leg.match(/\.(webp|jpg|jpeg|png)/g) || []).length;
  console.log(`OLD ${s}: ibl=${hasIbl} legacy=${n} sample=${(leg.match(/['"]([^'"]+)['"]/) || [])[1] || ''}`);
}
