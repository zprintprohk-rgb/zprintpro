// .hermes/_probe_1022b.mjs — 修正断言后终验
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

const ja = await get('/ja/blog/comiket-printing-prep-guide/');
t(ja.s === 200 && ja.vis.includes('締切カレンダー'), 'ja comiket 締切カレンダー');
t(!ja.vis.includes('C107'), 'ja comiket 无旧刊次 C107');
t(ja.vis.includes('12 月 29 日'), 'ja comiket 12/29 开幕口径');

const en = await get('/en/blog/comiket-printing-prep-guide/');
t(en.vis.includes('Deadline Calendar') && en.vis.includes('December 29'), 'en comiket Deadline/12-29');

const zhb = await get('/zh-hk/blog/cny-2027-red-packet-printing-guide/');
t(zhb.vis.includes('利是封尺寸同規格') && zhb.vis.includes('丁未羊年'), 'zh B4 尺寸段 + 羊年');

const dp = await get('/zh-hk/product/doujinshi-printing/');
t(dp.vis.includes('C109') && !dp.vis.includes('C107'), 'PDP 同人誌 C109');

const edu = await get('/ja/category/educational/');
t(!edu.vis.includes('HK$28'), 'ja educational 无假价 HK$28');
t(!/CTR\s*≥|imps\b/.test(edu.vis), 'ja educational 无 KPI 黑话');

const st = await get('/ja/category/stickers/');
t(!/9\/4 ja CTR/.test(st.vis), 'ja stickers 无 KPI 尾巴');

console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
