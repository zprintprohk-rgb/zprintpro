// 归因: HEAD sitemap vs 当前(重生成后) sitemap 的丢失 URL —— 每条对照当前 products.ts 引用数, 分类 stale vs generator-miss
const fs = require('fs');
const { execSync } = require('child_process');
const head = execSync('git show HEAD:public/sitemap-image.xml', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const cur = fs.readFileSync('public/sitemap-image.xml', 'utf8');
const setOf = (x) => new Set([...x.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(m => m[1]));
const H = setOf(head), C = setOf(cur);
const lost = [...H].filter(u => !C.has(u));
const ts = fs.readFileSync('src/data/products.ts', 'utf8');
const W1 = ['spiral-notebooks', 'thick-paper-flyers', 'magnetic-closure-gift-box', 'tuck-end-boxes', 'gang-run-card-boxes'];
let stale = 0, genMiss = [];
const byPrefix = {};
for (const u of lost) {
  const file = u.replace('https://zprintpro.com', '');
  const refs = (ts.match(new RegExp(file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  const isW1 = W1.some(s => u.includes(s));
  const pref = file.split('/').slice(0, 5).join('/');
  byPrefix[pref] = (byPrefix[pref] || 0) + 1;
  if (refs > 0) genMiss.push(`${u} refs=${refs} W1=${isW1}`);
  else stale++;
}
console.log('HEAD_set=' + H.size + ' CUR_set=' + C.size + ' LOST=' + lost.length);
console.log('LOST_CLASSIFICATION: stale(0 refs in current products.ts)=' + stale + ' generator_miss(refs>0)=' + genMiss.length);
console.log('LOST_BY_PREFIX=' + JSON.stringify(byPrefix));
if (genMiss.length) console.log('GEN_MISS_DETAIL=' + genMiss.join(' | '));
const gained = [...C].filter(u => !H.has(u));
console.log('GAINED=' + gained.length + ' sample: ' + gained.slice(0, 5).join(' | '));
console.log('V28_5_IN_CUR=' + gained.filter(u => u.includes('/v28_5/')).length);
