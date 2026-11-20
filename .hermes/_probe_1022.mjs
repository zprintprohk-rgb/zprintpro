// .hermes/_probe_1022.mjs — 10/22 批次验收（B2/B3/B4 12 段 + C109 + 教育真值 + KPI 清理）
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const get = async (u) => {
  await sleep(5000);
  const r = await fetch('https://zprintpro.com' + u, { headers: { 'user-agent': UA } });
  const b = await r.text();
  const vis = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
  return { s: r.status, vis, h2: (b.match(/<h2/g) || []).length };
};
let pass = 0, fail = 0;
const t = (ok, n, x = '') => { ok ? pass++ : fail++; console.log(`${ok ? 'PASS' : 'FAIL'} ${n}${x ? ' | ' + x : ''}`); };

const ja = await get('/ja/blog/comiket-printing-prep-guide/');
t(ja.s === 200 && ja.vis.includes('締切カレンダー'), 'ja comiket: 締切カレンダー section', `h2=${ja.h2}`);
t(ja.vis.includes('C109') && !ja.vis.includes('C107'), 'ja comiket: C109 not C107');

const en = await get('/en/blog/comiket-printing-prep-guide/');
t(en.s === 200 && en.vis.includes('Deadline Calendar'), 'en comiket: Deadline Calendar', `h2=${en.h2}`);

const zhb = await get('/zh-hk/blog/cny-2027-red-packet-printing-guide/');
t(zhb.s === 200 && zhb.vis.includes('利是封尺寸同規格'), 'zh B4: 尺寸同規格 section', `h2=${zhb.h2}`);
t(zhb.vis.includes('燙金、浮雕、擊凸'), 'zh B4: 工藝段');

const dp = await get('/zh-hk/product/doujinshi-printing/');
t(dp.s === 200 && dp.vis.includes('C109') && !dp.vis.includes('C107'), 'PDP doujin: C109 / 12月29-31', `status=${dp.s}`);

const edu = await get('/ja/category/educational/');
t(edu.s === 200 && edu.vis.includes('HK$24'), 'ja educational: HK$24 (真值)');
t(edu.s === 200 && !/CTR\s*≥|pos \d|imps/.test(edu.vis), 'ja educational: 无 KPI 黑话');

const st = await get('/ja/category/stickers/');
t(st.s === 200 && !/9\/4 ja CTR/.test(st.vis), 'ja stickers: KPI 尾巴已清');

console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
process.exit(fail ? 1 : 0);
