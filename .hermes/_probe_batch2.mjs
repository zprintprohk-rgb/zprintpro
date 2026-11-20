// .hermes/_probe_batch2.mjs — 批 2 线上验收 (浏览器 UA; CF 对 curl UA 403)
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const BASE = 'https://zprintpro.com';
const checks = [
  { url: '/zh-hk/blog/food-packaging-printing-guide/', must: ['內側印刷（裡印）', '5 個食品包裝印刷常見誤區', '食品包裝盒型點揀'], mustNot: ['www. .com', '1,000+'] },
  { url: '/en/blog/food-packaging-printing-guide/', must: ['Quick Answer', 'Inside Printing', 'Multi-Industry'], mustNot: ['12-Industry'] },
  { url: '/ja/blog/food-packaging-printing-guide/', must: ['クイック回答', '内側印刷', '多業界'], mustNot: ['12 業界'] },
  { url: '/zh-hk/blog/eco-printing/', must: ['/zh-hk/category/packaging/'] },
  { url: '/zh-hk/blog/restaurant-menu-printing-guide/', must: ['/zh-hk/product/food-boxes/'] },
  { url: '/en/blog/restaurant-menu-printing-guide/', must: ['/en/product/food-boxes/'] },
  { url: '/ja/blog/eco-printing/', must: ['/ja/category/packaging/'] },
  { url: '/zh-hk/category/packaging/', must: ['包裝盒印刷價錢點計', '內側印刷（裡印）'] },
  { url: '/zh-hk/product/folding-boxes/', must: ['裡印'] },
  { url: '/zh-hk/product/mailer-boxes/', must: ['裡印'] },
  { url: '/zh-hk/product/white-card-bags/', must: ['裡印'] },
];
const h2 = async (url) => {
  const r = await fetch(BASE + url, { headers: { 'user-agent': UA, accept: 'text/html' } });
  return { status: r.status, body: await r.text() };
};
let pass = 0, fail = 0;
for (const c of checks) {
  const { status, body } = await h2(c.url);
  const miss = c.must.filter(k => !body.includes(k));
  const bad = (c.mustNot || []).filter(k => body.includes(k));
  const h2n = (body.match(/<h2/g) || []).length;
  const ok = status === 200 && miss.length === 0 && bad.length === 0;
  if (ok) pass++; else fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${c.url} [${status}] len=${body.length} h2=${h2n}` +
    (miss.length ? ` miss=${JSON.stringify(miss)}` : '') + (bad.length ? ` bad=${JSON.stringify(bad)}` : ''));
}
console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
process.exit(fail ? 1 : 0);
