/**
 * 线上探针: zine 新篇 × 3 locale (push 后真验收, per §5.1 第三层 5 步)
 */
const SLUG = 'zine-small-batch-booklet-printing-guide';
const CASES = [
  ['zh-hk', ['小誌 Zine 印刷', 'HK$6-32', 'HK$1.20', '快速答案', '100 本起印', '4 的倍數'], '智印港'],
  ['en', ['Zine Printing Guide', 'HK$6-32', 'HK$1.20', 'Quick Answer', '100 copies', 'multiple of 4'], 'ZprintPro'],
  ['ja', ['ジン印刷ガイド', 'HK$6〜32', 'HK$1.20', 'クイック回答', '100 部', '4 の倍数'], 'ZprintPro'],
];
(async () => {
  let pass = 0, fail = 0;
  for (const [loc, musts, brand] of CASES) {
    const url = `https://zprintpro.com/${loc}/blog/${SLUG}/`;
    let html = '';
    try {
      const r = await fetch(url, { redirect: 'follow' });
      html = await r.text();
      if (!r.ok) { console.log(`FAIL ${loc} HTTP ${r.status}`); fail++; continue; }
    } catch (e) { console.log(`FAIL ${loc} fetch ${e.message}`); fail++; continue; }
    const miss = musts.filter((m) => !html.includes(m));
    const t = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
    const okTitle = t.includes(brand);
    const faq = (html.match(/"@type":"FAQPage"/g) || []).length;
    const breadcrumb = (html.match(/"@type":"BreadcrumbList"/g) || []).length;
    const article = (html.match(/"@type":"Article"/g) || []).length;
    const hreflang = (html.match(/hreflang=/g) || []).length;
    const internal = [...new Set((html.match(/href="\/\${?/g) || []))].length;
    const wa = (html.match(/wa\.me\/8619880851334/g) || []).length;
    const ok = miss.length === 0 && okTitle && faq >= 1 && breadcrumb >= 1 && article >= 1;
    if (ok) pass++; else fail++;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${loc}  HTTP200 len=${html.length}`);
    console.log(`   title: ${t}`);
    console.log(`   缺失关键字: [${miss.join(', ')}]  title含品牌=${okTitle}`);
    console.log(`   schema: Article=${article} FAQPage=${faq} BreadcrumbList=${breadcrumb}  hreflang=${hreflang}  wa.me=${wa}`);
  }
  console.log(`\n汇总: PASS ${pass} / FAIL ${fail}`);
  process.exit(fail ? 1 : 0);
})();
