// .hermes/_probe_final.mjs — 统一验收：类目页/博客/PDP 的裸 markdown + hub FAQ + MOQ
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const BASE = 'https://zprintpro.com';
const MD = /\[[^\]<]{1,30}\]\(\/[a-z0-9\-\/]+\)/g;
const get = async (u) => {
  const r = await fetch(BASE + u, { headers: { 'user-agent': UA } });
  const b = await r.text();
  const vis = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ');
  return { s: r.status, vis };
};
const cats = ['packaging', 'banners', 'books', 'menus', 'envelopes', 'calendars', 'red-packets', 'educational', 'stickers', 'flyers', 'posters', 'paper-bags', 'japan-doujin', 'greeting-cards'];
const blogs = ['/zh-hk/blog/restaurant-opening-flyer-printing-guide/', '/zh-hk/blog/pet-food-sticker-printing-guide/', '/en/blog/restaurant-opening-flyer-printing-guide/', '/ja/blog/restaurant-opening-flyer-printing-guide/'];
const pdps = ['/zh-hk/product/food-boxes/', '/zh-hk/product/roll-stickers/', '/zh-hk/product/folding-boxes/'];
let pass = 0, fail = 0;
const line = (ok, name, extra = '') => { ok ? pass++ : fail++; console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${extra ? ' | ' + extra : ''}`); };

let catMd = 0, catDetail = [];
for (const c of cats) {
  const { s, vis } = await get(`/zh-hk/category/${c}/`);
  const n = (vis.match(MD) || []).length;
  if (n) catDetail.push(`${c}:${n}`);
  catMd += n;
  if (s !== 200) { fail++; console.log('FAIL status', c, s); }
}
line(catMd === 0, '类目页 14 页 裸 md = 0', `total=${catMd} ${catDetail.join(' ')}`);

let blogMd = 0, blogStar = 0;
for (const b of blogs) {
  const { vis } = await get(b);
  blogMd += (vis.match(MD) || []).length;
  blogStar += (vis.match(/\*\*/g) || []).length;
}
line(blogMd === 0, '博客 4 页 裸 md = 0', `md=${blogMd}`);
line(blogStar === 0, '博客 4 页 裸 ** = 0', `stars=${blogStar}`);

let pdpMd = 0, pdpStar = 0;
for (const p of pdps) {
  const { vis } = await get(p);
  pdpMd += (vis.match(MD) || []).length;
  pdpStar += (vis.match(/\*\*/g) || []).length;
}
line(pdpMd === 0, 'PDP 3 页 裸 md = 0', `md=${pdpMd}`);
line(pdpStar === 0, 'PDP 3 页 裸 ** = 0', `stars=${pdpStar}`);

const zh = await get('/zh-hk/category/packaging/');
line(zh.vis.includes('包裝盒印刷價錢點計') && zh.vis.includes('內側印刷（裡印）'), 'zh hub FAQ 价格+裡印 Q');
line(zh.vis.includes('拼版 8-15 天交期'), 'zh hub 交期限定词');

const en = await get('/en/category/packaging/');
line(en.vis.includes('How much does packaging box printing cost?'), 'en hub 价格 Q');
const ja = await get('/ja/category/packaging/');
line(ja.vis.includes('箱の内側（裏印刷）はできますか？'), 'ja hub 内側印刷 Q');

const elec = await get('/zh-hk/product/electronics-packaging-box/');
line(!elec.vis.includes('100 個起印'), 'electronics 无 100 個起印', 'has100=' + elec.vis.includes('100 個起印'));
const kraft = await get('/zh-hk/product/kraft-paper-packaging-box/');
line(!kraft.vis.includes('100 個起印'), 'kraft-packaging 无 100 個起印', 'has100=' + kraft.vis.includes('100 個起印'));
const cert = await get('/zh-hk/product/certificates/');
line(!cert.vis.includes('10 張起印'), 'certificates 无 10 張起印');

console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
process.exit(fail ? 1 : 0);
