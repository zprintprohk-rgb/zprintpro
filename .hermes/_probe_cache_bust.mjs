// .hermes/_probe_cache_bust.mjs
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const MD = /\[[^\]<]{1,30}\]\(\/[a-z0-9\-\/]+\)/g;
const ts = Date.now();
for (const suffix of ['', `?v=${ts}`]) {
  const r = await fetch(`https://zprintpro.com/zh-hk/category/packaging/${suffix}`, {
    headers: { 'user-agent': UA, 'cache-control': 'no-cache', pragma: 'no-cache' },
  });
  const b = await r.text();
  const vis = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
  console.log(`suffix="${suffix}" status=${r.status} len=${b.length} md=${(vis.match(MD) || []).length} age=${r.headers.get('age')} cf-cache=${r.headers.get('cf-cache-status')}`);
}
