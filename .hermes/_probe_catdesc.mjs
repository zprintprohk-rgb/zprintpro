// Which category pages lack meta description? Compare 4 categories x locales subset
const targets = [
  ['zh-hk', 'packaging'], ['zh-hk', 'stickers'], ['zh-hk', 'posters'], ['zh-hk', 'calendars'],
  ['en', 'packaging'], ['ja', 'packaging'],
];
for (const [L, slug] of targets) {
  const t = await (await fetch(`https://zprintpro.com/${L}/category/${slug}/`)).text();
  const desc = t.match(/<meta\s+name="description"\s+content="([^"]{0,120})"/i);
  const ogd = t.match(/<meta\s+property="og:description"\s+content="([^"]{0,80})"/i);
  const ti = t.match(/<title>([^<]{0,90})<\/title>/);
  console.log(`${L}/${slug}: desc=${desc ? 'YES(' + desc[1].length + 'c)' : 'NONE'} ogdesc=${ogd ? 'YES' : 'NONE'} title=${ti ? ti[1].slice(0, 50) : 'NONE'}`);
}
console.log('CMP_DONE');
