// determinism check: 3 rounds x 4 category pages, desc presence + first 60 chars
const targets = ['zh-hk/category/packaging', 'zh-hk/category/stickers', 'en/category/packaging', 'ja/category/packaging'];
for (let round = 1; round <= 3; round++) {
  const line = [];
  for (const u of targets) {
    const t = await (await fetch(`https://zprintpro.com/${u}/`)).text();
    const m = t.match(/<meta name="description" content="([^"]{0,60})"/);
    line.push(`${u.split('/').pop()}_${u.split('/')[0]}=${m ? 'YES' : 'NO'}`);
  }
  console.log(`R${round}: ${line.join(' | ')}`);
}
console.log('DET_DONE');
