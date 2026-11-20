// is the categorySeoData description text present ANYWHERE in live category HTML? (deploy vintage test)
const t = await (await fetch('https://zprintpro.com/zh-hk/category/packaging/')).text();
const probes = ['HK$1.5', '3D 打稿', '唔做膠袋', '國際認證體系'];
for (const p of probes) console.log(`${p}: ${t.includes(p)}`);
console.log('LEN=' + t.length);
console.log('VINTAGE_DONE');
