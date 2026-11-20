/**
 * verify-v5-batch2-live.cjs — 线上断言 v3：Node fetch 直连 apex 域（自动跟随重定向）
 */
const CHECKS = [
  { path: '/ja/product/roll-up-banners/', needle: 'ロールアップバナー | アルミスタンド | 1個〜 | ZprintPro' },
  { path: '/ja/product/kraft-paper-packaging-box/', needle: '¥150〜' },
  { path: '/ja/product/custom-red-packets/', needle: '100枚〜 ¥103〜' },
  { path: '/en/product/vehicle-wraps/', needle: 'Vehicle Wraps | 3M Vinyl | 1 MOQ From $6.44 | ZprintPro' },
  { path: '/en/product/eco-flyers/', needle: 'Eco Flyers | Recycled Paper | 10 MOQ $0.60 | ZprintPro' },
  { path: '/en/product/graduation-yearbook/', needle: 'Graduation Yearbook | 1 MOQ | From $10.35 | ZprintPro' },
];
(async () => {
  let pass = 0, fail = 0;
  for (const c of CHECKS) {
    try {
      const res = await fetch(`https://zprintpro.com${c.path}`, { redirect: 'follow' });
      const html = await res.text();
      const ok = res.status === 200 && html.includes(c.needle);
      const titleTag = (html.match(/<title>(.*?)<\/title>/s) || [])[1] || '';
      console.log(`${ok ? 'PASS' : 'FAIL'} ${c.path} (http ${res.status})\n  needle: ${c.needle}\n  <title>: ${titleTag.slice(0, 100)}`);
      if (ok) pass++; else fail++;
    } catch (e) {
      fail++;
      console.log(`ERROR ${c.path}: ${e.message}`);
    }
  }
  console.log(`\nRESULT: ${pass}/${CHECKS.length} PASS, ${fail} FAIL`);
})().catch((e) => { console.error(e); process.exit(1); });
