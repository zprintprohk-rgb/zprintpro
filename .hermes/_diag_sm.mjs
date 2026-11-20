// diagnose: cached vs regenerated sitemap + does repo generator overwrite public sitemaps?
const bust = Date.now();
for (const f of ['sitemap-zh-hk.xml', 'sitemap.xml']) {
  const plain = await (await fetch(`https://zprintpro.com/${f}`)).text();
  const fresh = await (await fetch(`https://zprintpro.com/${f}?v=${bust}`)).text();
  console.log(`${f}: plain_has_nj=${plain.includes('nengajo-2027')} bust_has_nj=${fresh.includes('nengajo-2027')} plainLen=${plain.length} freshLen=${fresh.length}`);
}
console.log('DIAG_DONE');
