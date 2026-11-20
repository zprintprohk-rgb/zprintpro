// .hermes/_probe_spaced.mjs — 间隔探针，避免 CF 限流
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const MD = /\[[^\]<]{1,40}\]\(\/[a-z0-9\-\/]+\)/g;
const urls = ['/zh-hk/category/packaging/', '/zh-hk/category/calendars/', '/zh-hk/category/red-packets/', '/zh-hk/category/menus/'];
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
for (const u of urls) {
  await sleep(6000);
  try {
    const r = await fetch('https://zprintpro.com' + u, { headers: { 'user-agent': UA } });
    const b = await r.text();
    const cf = b.includes('cf-error') || b.includes('Attention Required') || b.length < 20000;
    const m = b.match(/<main[\s\S]*?<\/main>/);
    const vis = (m ? m[0] : b).replace(/<[^>]+>/g, ' ');
    const n = (vis.match(MD) || []).length;
    console.log(`${r.status} ${u} len=${b.length} cfErr=${cf} visibleMd=${n}`);
  } catch (e) {
    console.log('ERR', u, e.message);
  }
}
