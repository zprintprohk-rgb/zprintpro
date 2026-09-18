/**
 * 线上探针: BK-002 口径统一是否已上线 (PDP + 三语文章)
 * 注意: hreflang 属性大小写不敏感, 一律 /i 匹配; 且校验响应有效性 (≠ 把失败当缺失)
 */
const CASES = [
  ['PDP zh-hk', 'https://zprintpro.com/zh-hk/product/saddle-stitch-booklets/', ['HK$6-32', '100本', '100 本起'], ['HK$14-57', 'MOQ 50 本', '50 本起']],
  ['PDP en', 'https://zprintpro.com/en/product/saddle-stitch-booklets/', ['US$1.84', '100 Copies MOQ'], ['50 Copies MOQ']],
  ['PDP ja', 'https://zprintpro.com/ja/product/saddle-stitch-booklets/', ['100冊から'], ['50冊から']],
  ['blog zh-hk', 'https://zprintpro.com/zh-hk/blog/saddle-stitch-booklet-printing-guide/', ['HK$6-32/本', '100 本起'], ['HK$14-57/本', '50 本起', '無最低起印量']],
  ['blog en', 'https://zprintpro.com/en/blog/saddle-stitch-booklet-printing-guide/', ['100-copy MOQ', '100 copies'], ['50-copy', '50 copies']],
  ['blog ja', 'https://zprintpro.com/ja/blog/saddle-stitch-booklet-printing-guide/', ['100 冊から', '100冊'], ['50 冊から', '50冊']],
];
(async () => {
  let pass = 0, fail = 0;
  for (const [name, url, must, mustNot] of CASES) {
    let html = '', status = 0;
    for (let a = 0; a < 3; a++) {
      try {
        const r = await fetch(url, { redirect: 'follow' });
        const t = await r.text();
        if (r.status === 200 && t.length > 20000) { html = t; status = r.status; break; }
        status = r.status;
      } catch (e) { /* retry */ }
      await new Promise((res) => setTimeout(res, 500));
    }
    if (!html) { console.log(`INVALID ${name} — 响应不合格 (status ${status}) → 不计入 0`); fail++; continue; }
    const miss = must.filter((m) => !html.includes(m));
    const res = mustNot.filter((m) => html.includes(m));
    const hreflang = (html.match(/rel="alternate"[^>]*hreflang=/gi) || []).length;
    const ok = miss.length === 0 && res.length === 0;
    if (ok) pass++; else fail++;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${name}  len=${html.length} hreflang=${hreflang}`);
    if (!ok) console.log(`     缺失新值=[${miss}]  旧值残留=[${res}]`);
  }
  console.log(`\n汇总: PASS ${pass} / FAIL ${fail}`);
  process.exit(fail ? 1 : 0);
})();
