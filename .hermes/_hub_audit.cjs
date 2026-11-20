// .hermes/_hub_audit.cjs — 包装 hub 三语数字/MOQ 断言 vs products.ts 真值
const fs = require('fs');
const prod = fs.readFileSync('src/data/products.ts', 'utf8');
const seo = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');

// truths
const marks = [];
const re = /^    slug: '([a-z0-9-]+)',$/gm;
let m; while ((m = re.exec(prod)) !== null) marks.push({ slug: m[1], off: m.index });
const truth = {};
marks.forEach((mk, i) => {
  const seg = prod.slice(mk.off, marks[i + 1] ? marks[i + 1].off : prod.length);
  const mq = seg.match(/minQuantity: (\d+)/);
  const bp = seg.match(/basePrice: ([\d.]+)/);
  const pr = seg.match(/price_range: '([^']+)'/);
  if (mq) truth[mk.slug] = { minQ: +mq[1], base: bp && +bp[1], range: pr && pr[1] };
});
const PKG = ['food-boxes', 'folding-boxes', 'mailer-boxes', 'rigid-boxes', 'cosmetic-boxes', 'white-card-bags', 'kraft-paper-bags', 'eco-friendly-boxes', 'gift-boxes'];
console.log('=== 包装簇真值 ===');
Object.keys(truth).filter(k => /box|bag|packaging/.test(k)).forEach(k => console.log(' ', k, JSON.stringify(truth[k])));

// hub blocks
const pc = seo.indexOf('packagingContent');
const zh = seo.indexOf("'zh-hk': {", pc);
const enI = seo.indexOf('en: {', zh);
const jaI = seo.indexOf("'ja'", enI) >= 0 ? seo.indexOf("'ja'", enI) : seo.indexOf('ja: {', enI);
const blocks = { 'zh-hk': seo.slice(zh, enI), en: seo.slice(enI, jaI > enI ? jaI : seo.length), };
console.log('\n=== hub 数字断言 ===');
for (const [loc, b] of Object.entries(blocks)) {
  const prices = [...b.matchAll(/(HK\$|US\$|¥)\s*([\d,.]+)(?:\s*[-–〜]\s*([\d,.]+))?\s*(?:\/\s*([^\s,，。<)」']+))?/g)]
    .map(x => x[0].replace(/\s+/g, ' ').slice(0, 26));
  const moqs = [...b.matchAll(/(\d{1,6})\s*(?:個|張|枚|本|冊|pcs|pieces|個|個起)/g)].map(x => x[0]);
  console.log(`\n[${loc}] len=${b.length} priceHits=${prices.length} moqHits=${moqs.length}`);
  console.log('  prices:', [...new Set(prices)].slice(0, 24).join(' | '));
  console.log('  moqs:', [...new Set(moqs)].slice(0, 16).join(' | '));
}
