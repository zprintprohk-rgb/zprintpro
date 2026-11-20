// corrected determinism probe: desc can be 100-200 chars -> cap 240
const targets = [
  ['zh-hk', 'packaging'], ['zh-hk', 'stickers'], ['en', 'packaging'], ['ja', 'packaging'],
];
for (let round = 1; round <= 3; round++) {
  const line = [];
  for (const [L, s] of targets) {
    const t = await (await fetch(`https://zprintpro.com/${L}/category/${s}/`)).text();
    const m = t.match(/<meta name="description" content="([^"]{0,240})"/);
    line.push(`${L}/${s}=${m ? m[1].length + 'c' : 'MISSING'}`);
  }
  console.log(`R${round}: ${line.join(' | ')}`);
}
// value checks
const zh = await (await fetch('https://zprintpro.com/zh-hk/category/packaging/')).text();
console.log('OLD_HK15_GONE=' + !zh.includes('HK$1.5 起/個'));
console.log('NEW_HK25=' + zh.includes('HK$2.5 起/個'));
console.log('ONE_HOUR=' + zh.includes('1 小時打稿'));
console.log('FDA_STANDARD=' + zh.includes('FDA 標準紙可選'));
const ja = await (await fetch('https://zprintpro.com/ja/category/packaging/')).text();
console.log('JA_DESC=' + (/<meta name="description" content="([^"]{0,120})"/.exec(ja)?.[1] || 'MISSING').slice(0, 100));
console.log('FINAL_DET_DONE');
