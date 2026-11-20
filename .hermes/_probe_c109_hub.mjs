// .hermes/_probe_c109_hub.mjs — 部署后验收：C109 三语页 + hub 食品专节 + 反链
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const get = async (u) => {
  await sleep(5000);
  const r = await fetch('https://zprintpro.com' + u, { headers: { 'user-agent': UA } });
  const b = await r.text();
  return { s: r.status, b, vis: b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ') };
};
let pass = 0, fail = 0;
const t = (ok, n, x = '') => { ok ? pass++ : fail++; console.log(`${ok ? 'PASS' : 'FAIL'} ${n}${x ? ' | ' + x : ''}`); };

for (const [loc, needle] of [['ja', '締切逆算カレンダー'], ['en', 'Deadline countdown'], ['zh-hk', '截稿逆算時間表']]) {
  const r = await get(`/${loc}/comiket-c109/`);
  t(r.s === 200 && r.vis.includes(needle), `${loc} c109 page 200 + 逆算表`, `status=${r.s}`);
  t(r.s === 200 && /FAQPage|BreadcrumbList/.test(r.b), `${loc} c109 JSON-LD present`);
}

const ja = await get('/ja/blog/comiket-printing-prep-guide/');
t(ja.vis.includes('特設ページ') || ja.b.includes('/ja/comiket-c109/'), 'ja blog backlink to c109');

const en = await get('/en/blog/comiket-printing-prep-guide/');
t(en.b.includes('/en/comiket-c109/'), 'en blog backlink to c109');

const hub = await get('/zh-hk/category/packaging/');
t(hub.s === 200 && hub.vis.includes('食品包裝專節'), 'hub packaging zh food spoke section', `status=${hub.s}`);
t(hub.s === 200 && hub.b.includes('/zh-hk/blog/food-packaging-printing-guide/'), 'hub food spoke internal link');

console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
