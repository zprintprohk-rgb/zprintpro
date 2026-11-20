// category page meta tag dump — is description truly missing?
const t = await (await fetch('https://zprintpro.com/zh-hk/category/packaging/')).text();
const metas = (t.match(/<meta[^>]{0,200}>/gi) || []).filter(x => /description|og:title|twitter/i.test(x));
console.log('META_TAGS_FOUND=' + metas.length);
for (const m of metas.slice(0, 6)) console.log(m.slice(0, 180));
// also check <title>
const ti = t.match(/<title>[^<]{0,140}<\/title>/);
console.log('TITLE=' + (ti ? ti[0] : 'NONE'));
console.log('CATMETA_DONE');
