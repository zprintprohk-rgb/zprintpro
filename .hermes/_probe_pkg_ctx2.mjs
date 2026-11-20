// .hermes/_probe_pkg_ctx2.mjs
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const r = await fetch('https://zprintpro.com/zh-hk/category/packaging/', { headers: { 'user-agent': UA } });
const b = await r.text();
const vis = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
const ms = [...vis.matchAll(/\[[^\]<]{1,30}\]\(\/[a-z0-9\-\/]+\)/g)];
console.log('count', ms.length);
ms.slice(0, 4).forEach(m => console.log('  ', JSON.stringify(vis.slice(Math.max(0, m.index - 100), m.index + 50).replace(/\s+/g, ' '))));
