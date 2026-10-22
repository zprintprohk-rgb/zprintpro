// .hermes/_probe_wave4b.mjs — 修正版：US$ 只查正文区间（排除相关产品卡）
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const get = async (u) => {
  await sleep(5000);
  const r = await fetch('https://zprintpro.com' + u, { headers: { 'user-agent': UA } });
  const b = await r.text();
  const s = b.indexOf('blog-content');
  const ends = ['View More', 'Related', 'related-'].map(k => b.indexOf(k, s)).filter(x => x > 0);
  const body = s >= 0 ? b.slice(s, ends.length ? Math.min(...ends) : b.length) : '';
  return { s: r.status, b, bodyText: body.replace(/<[^>]+>/g, ' '), h2: (body.match(/<h2/g) || []).length };
};
let pass = 0, fail = 0;
const t = (ok, n, x = '') => { ok ? pass++ : fail++; console.log(`${ok ? 'PASS' : 'FAIL'} ${n}${x ? ' | ' + x : ''}`); };

for (const [loc, ten] of [['ja', '10 冊から'], ['en', '10 copies'], ['zh-hk', '10 本起印']]) {
  const r = await get(`/${loc}/blog/doujin-circle-printing-guide/`);
  t(r.s === 200 && r.h2 === 12, `${loc} h2=12`, `h2=${r.h2}`);
  t(r.bodyText.includes(ten), `${loc} 起印 10`);
  t(!/30 部 MOQ|30-copy MOQ|30 本起印/.test(r.bodyText), `${loc} 无 30 MOQ`);
  t(!/US\$/.test(r.bodyText), `${loc} 正文无 US$`);
  t(/¥|HK\$/.test(r.bodyText), `${loc} 有价格锚`);
}
console.log(`\n== ${pass} PASS / ${fail} FAIL ==`);
