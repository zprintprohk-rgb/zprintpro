const fs = require('fs');
// 1. current sku-seo-data a4-flyers zh-hk title
const t = fs.readFileSync('F:/zprintpro-nextjs/src/data/sku-seo-data.ts', 'utf8');
const anchors = [...t.matchAll(/^  ([a-z0-9-]+): \{/gm)];
// find a4-flyers anchor differently (structure check)
const i = t.indexOf("'a4-flyers'");
const i2 = t.indexOf('a4-flyers');
console.log('a4-flyers idx:', i2);
const seg = t.slice(i2, i2 + 500);
const m = seg.match(/"title": "([^"]*)"/);
console.log('当前 zh-hk title (首个 title 字段):', m ? m[1] : '(not found in first 500 chars)');
// check structure around slug
const slugIdx = t.indexOf('a4-flyers');
const nextBrace = t.indexOf('{', slugIdx);
console.log('--- structure sample ---');
console.log(t.slice(slugIdx - 10, slugIdx + 250));

// 2. getPriceTableForSlug impl
const g = fs.readFileSync('F:/zprintpro-nextjs/src/lib/price-data.generated.ts', 'utf8');
const gi = g.indexOf('getPriceTableForSlug');
console.log('\n--- getPriceTableForSlug ---');
console.log(g.slice(gi, gi + 700));
