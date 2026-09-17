/**
 * 线上探针: 三篇月曆文章 × 3 locale 基准价区间是否已上线
 * 断言标准 (§0.23.1 教训): 本地 0 命中 ≠ 线上干净 —— 必须 curl 线上抽查
 */
const CASES = [
  ['zh-hk', 'calendar-printing-guide', ['HK$8-25/本'], ['HK$3-8/本']],
  ['zh-hk', '2027-calendar-printing-complete-guide', ['HK$8-25/本'], ['HK$14-57/本']],
  ['zh-hk', '2027-monthly-calendar-printing-timetable', ['HK$8-25'], ['HK$3-15']],
  ['en', 'calendar-printing-guide', ['US$1.00/pc'], ['$0.40/pc']],
  ['en', '2027-calendar-printing-complete-guide', ['US$1.00-3.20'], ['US$1.80-7.30']],
  ['en', '2027-monthly-calendar-printing-timetable', ['US$1.00-3.20/pc'], ['$0.40-1.90/pc']],
  ['ja', 'calendar-printing-guide', ['1部160円から'], ['1部50円から']],
  ['ja', '2027-calendar-printing-complete-guide', ['1冊160〜500円'], ['1冊280〜1,140円']],
  ['ja', '2027-monthly-calendar-printing-timetable', ['HK$8-25/冊'], ['$0.40-1.90/冊']],
];

(async () => {
  let pass = 0, fail = 0;
  for (const [loc, slug, must, mustNot] of CASES) {
    const url = `https://zprintpro.com/${loc}/blog/${slug}/`;
    let html = '';
    try {
      const r = await fetch(url, { headers: { 'cache-control': 'no-cache' }, redirect: 'follow' });
      html = await r.text();
      if (!r.ok) { console.log(`FAIL ${loc}/${slug} HTTP ${r.status}`); fail++; continue; }
    } catch (e) {
      console.log(`FAIL ${loc}/${slug} fetch error ${e.message}`);
      fail++;
      continue;
    }
    const missMust = must.filter((m) => !html.includes(m));
    const hitMustNot = mustNot.filter((m) => html.includes(m));
    const ok = missMust.length === 0 && hitMustNot.length === 0;
    if (ok) pass++; else fail++;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${loc}/${slug}  新值缺失=[${missMust}]  旧值残留=[${hitMustNot}]  (html ${html.length} B)`);
  }
  console.log(`\n汇总: PASS ${pass} / FAIL ${fail}`);
  process.exit(fail ? 1 : 0);
})();
