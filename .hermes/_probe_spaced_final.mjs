// .hermes/_probe_spaced_final.mjs — 间隔终验
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const MD = /\[[^\]<]{1,40}\]\(\/[a-z0-9\-\/]+\)/g;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const get = async (u) => {
  await sleep(5000);
  const r = await fetch('https://zprintpro.com' + u, { headers: { 'user-agent': UA } });
  const b = await r.text();
  const vis = b.replace(/<[^>]+>/g, ' ');
  return { status: r.status, len: b.length, vis, md: (vis.match(MD) || []).length };
};
let pass = 0, fail = 0;
const t = (ok, n, x = '') => { ok ? pass++ : fail++; console.log(`${ok ? 'PASS' : 'FAIL'} ${n}${x ? ' | ' + x : ''}`); };

const zh = await get('/zh-hk/category/packaging/');
t(zh.status === 200 && zh.vis.includes('包裝盒印刷價錢點計'), 'zh hub 价格 Q', 'status=' + zh.status);
t(zh.vis.includes('內側印刷（裡印）'), 'zh hub 裡印 Q');
t(zh.vis.includes('拼版 8-15 天交期'), 'zh hub 交期限定词');
t(zh.md === 0, 'zh hub 可见 md=0', 'md=' + zh.md);

const en = await get('/en/category/packaging/');
t(en.vis.includes('packaging box printing cost') || en.vis.includes('How much does'), 'en hub 价格 Q', 'status=' + en.status);
const ja = await get('/ja/category/packaging/');
t(ja.vis.includes('裏印刷'), 'ja hub 内側印刷 Q', 'status=' + ja.status);

for (const [u, bad] of [['/zh-hk/product/certificates/', '10 張起印'], ['/zh-hk/product/electronics-packaging-box/', '100 個起印'], ['/zh-hk/product/kraft-paper-packaging-box/', '100 個起印']]) {
  const x = await get(u);
  t(x.status === 200 && !x.vis.includes(bad), `${u} 无「${bad}」`, 'status=' + x.status);
}

const blog = await get('/zh-hk/blog/restaurant-opening-flyer-printing-guide/');
t(blog.md === 0 && (blog.vis.match(/\*\*/g) || []).length === 0, '博客 flyer 无裸 md/**', `md=${blog.md} stars=${(blog.vis.match(/\*\*/g) || []).length}`);

console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
