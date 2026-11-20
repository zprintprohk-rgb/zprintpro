// .hermes/_probe_wave4.mjs — 同人誌三语 12 段 + food-boxes 三语 desc 验收
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const get = async (u) => {
  await sleep(5000);
  const r = await fetch('https://zprintpro.com' + u, { headers: { 'user-agent': UA } });
  const b = await r.text();
  return { s: r.status, b, vis: b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ') };
};
let pass = 0, fail = 0;
const t = (ok, n, x = '') => { ok ? pass++ : fail++; console.log(`${ok ? 'PASS' : 'FAIL'} ${n}${x ? ' | ' + x : ''}`); };

// 1) 同人誌指南三语：12 段 + 10 起印口径 + 无 30 MOQ / US$
for (const [loc, slug, needle10, needleH2] of [
  ['ja', 'doujin-circle-printing-guide', '10 冊から', '同人誌印刷の基本スペック'],
  ['en', 'doujin-circle-printing-guide', '10 copies', 'Core specs at a glance'],
  ['zh-hk', 'doujin-circle-printing-guide', '10 本起印', '同人誌印刷基本規格'],
]) {
  const r = await get(`/${loc}/blog/${slug}/`);
  const art = r.b.slice(r.b.indexOf('blog-content'));
  const h2 = (art.match(/<h2/g) || []).length;
  t(r.s === 200 && h2 >= 12, `${loc} doujin h2>=12`, `h2=${h2}`);
  t(r.vis.includes(needle10), `${loc} 起印口径 10`);
  t(!/30 部 MOQ|30-copy MOQ|30 本起印/.test(r.vis), `${loc} 无 30 MOQ 残留`);
  t(!/US\$/.test(r.vis), `${loc} 无 US$ 残留`);
}

// 2) food-boxes 三语 desc
for (const [loc, expect] of [['zh-hk', '防油食品級紙卡'], ['en', 'food-grade board'], ['ja', '食品グレード紙']]) {
  const r = await get(`/${loc}/product/food-boxes/`);
  const d = (r.b.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  t(r.s === 200 && d.includes(expect), `${loc} food-boxes desc 更新`, `len=${d.length}`);
  t(!/月饼|2 小時打稿|2-hour|2時間/.test(d), `${loc} desc 无简体/2h 残留`);
}

console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
