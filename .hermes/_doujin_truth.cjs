// .hermes/_doujin_truth.cjs
const fs = require('fs');
const prod = fs.readFileSync('src/data/products.ts', 'utf8');
const pm = [...prod.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].map(m => ({ s: m[1], o: m.index }));
const cat = prod.match(/slug: 'japan-doujin'/);
const hits = pm.filter(x => /doujin|comiket|book|booklet|catalog/i.test(x.s));
hits.forEach(x => {
  const i = pm.findIndex(y => y.s === x.s);
  const seg = prod.slice(x.o, pm[i + 1] ? pm[i + 1].o : prod.length);
  const mq = (seg.match(/minQuantity: (\d+)/) || [])[1];
  const bp = (seg.match(/basePrice: ([\d.]+)/) || [])[1];
  const pr = (seg.match(/price_range: '([^']+)'/) || [])[1];
  console.log(`${x.s}: minQ=${mq} base=${bp} range=${pr}`);
});
// 类目里已有的 C107 事实（ja 段摘录）
const seo = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const i = seo.indexOf('const japanDoujinContent');
const blk = seo.slice(i, seo.indexOf('const greetingCardsContent'));
const jaK = blk.indexOf('ja: {');
const jaSeg = blk.slice(jaK);
const ms = [...jaSeg.matchAll(/[^。]{0,80}(?:C107|コミケ)[^。]{0,120}。/g)].slice(0, 6);
console.log('\n--- ja C107 上下文 ---');
ms.forEach(m => console.log('  •', m[0].replace(/\s+/g, ' ').slice(0, 150)));
