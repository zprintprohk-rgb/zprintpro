// .hermes/_probe_pkg_raw_html.mjs
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const r = await fetch('https://zprintpro.com/zh-hk/category/packaging/', { headers: { 'user-agent': UA } });
const b = await r.text();
const i = b.indexOf('8 大盒型全表');
console.log('idx', i);
console.log(JSON.stringify(b.slice(Math.max(0, i - 700), i + 260)));
