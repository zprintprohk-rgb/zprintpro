// .hermes/_probe_batch21.mjs — 批 2.1 部署后验收
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const BASE = 'https://zprintpro.com';
const get = async (u) => {
  const r = await fetch(BASE + u, { headers: { 'user-agent': UA } });
  return { s: r.status, b: await r.text() };
};
let pass = 0, fail = 0;
const check = (name, ok, extra = '') => { ok ? pass++ : fail++; console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${extra ? ' | ' + extra : ''}`); };

// 1. 14 类目页裸 markdown
const cats = ['packaging', 'banners', 'books', 'menus', 'envelopes', 'calendars', 'red-packets', 'educational', 'stickers', 'flyers', 'posters', 'paper-bags', 'japan-doujin', 'greeting-cards'];
let rawTotal = 0, rawCats = [];
for (const c of cats) {
  const { s, b } = await get(`/zh-hk/category/${c}/`);
  const visible = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ');
  const raw = (visible.match(/\[[^\]<]{1,20}\]\(\/[a-z0-9\-\/]+\)/g) || []).length;
  rawTotal += raw;
  if (raw) rawCats.push(`${c}:${raw}`);
  if (s !== 200) { fail++; console.log(`FAIL ${c} status ${s}`); }
}
check('category raw markdown = 0', rawTotal === 0, `total=${rawTotal} ${rawCats.join(' ')}`);

// 2. MOQ 一致性 (zh PDP)
const moq = [
  ['/zh-hk/product/certificates/', '10 張起印', '100 張起印'],
  ['/zh-hk/product/electronics-packaging-box/', '100 個起印（標準尺寸無開版費', '200 個起印'],
  ['/zh-hk/product/kraft-paper-packaging-box/', '100 個起印（標準尺寸無開版費', '300 個起印'],
];
for (const [u, bad, good] of moq) {
  const { b } = await get(u);
  check(`${u} 无「${bad}」且含「${good}」`, !b.includes(bad) && b.includes(good));
}

// 3. hub FAQ 三语 + 链接
const en = await get('/en/category/packaging/');
check('en hub: price Q + inside-print Q', en.b.includes('How much does packaging box printing cost?') && en.b.includes('inside of the box'));
check('en hub: guide link present', en.b.includes('/en/blog/food-packaging-printing-guide/'));
const ja = await get('/ja/category/packaging/');
check('ja hub: 内側印刷 Q', ja.b.includes('箱の内側（裏印刷）はできますか？'));
const zh = await get('/zh-hk/category/packaging/');
check('zh hub: 5 新链接', ['/zh-hk/blog/food-packaging-printing-guide/', '/zh-hk/product/food-boxes/', '/zh-hk/product/magnetic-closure-gift-box/'].every(x => zh.b.includes(`href="${x}"`)));

console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
process.exit(fail ? 1 : 0);
