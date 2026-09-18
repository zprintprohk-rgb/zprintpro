/**
 * 线上 hreflang 实测审计 (measure before fix)
 * 检查: <link rel="alternate" hreflang="..."> 是否出现在服务端 HTML
 */
const ROUTES = [
  ['home', (l) => `/${l}/`],
  ['category', (l) => `/${l}/category/books/`],
  ['product', (l) => `/${l}/product/saddle-stitch-booklets/`],
  ['blog-list', (l) => `/${l}/blog/`],
  ['blog-post', (l) => `/${l}/blog/zine-small-batch-booklet-printing-guide/`],
  ['blog-old', (l) => `/${l}/blog/school-exercise-book-printing-guide/`],
  ['guide', (l) => `/${l}/guide/sticker-guide/`],
  ['quote', (l) => `/${l}/quote/`],
  ['contact', (l) => `/${l}/contact/`],
  ['about', (l) => `/${l}/about/`],
  ['trade-program', (l) => `/${l}/trade-program/`],
  ['institutional', (l) => `/${l}/institutional-printing/`],
  ['insights', (l) => `/${l}/insights/hk-print-inquiry-index/`],
  ['services-rush', (l) => `/${l}/services/rush-printing-delivery/`],
  ['legal', (l) => `/${l}/legal/`],
  ['case-studies', (l) => `/${l}/case-studies/`],
  ['faq', (l) => `/${l}/faq/`],
];
(async () => {
  const rows = [];
  for (const [name, fn] of ROUTES) {
    const rec = { name, detail: [] };
    for (const loc of ['zh-hk', 'en', 'ja']) {
      const url = 'https://zprintpro.com' + fn(loc);
      try {
        const r = await fetch(url, { redirect: 'follow' });
        const h = await r.text();
        const links = [...h.matchAll(/<link[^>]*rel="alternate"[^>]*>/gi)].map((m) => m[0]);
        // ★ 必须大小写不敏感: Next.js 服务端渲染为 camelCase `hrefLang` (HTML 属性大小写不敏感, 合法)
        const hls = links.filter((s) => /hreflang=/i.test(s));
        const canon = (h.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i) || [])[1] || '';
        rec.detail.push({ loc, status: r.status, n: hls.length, langs: hls.map((s) => (s.match(/hreflang="([^"]*)"/i) || [])[1]).join(','), canon });
      } catch (e) { rec.detail.push({ loc, status: 'ERR', n: -1, langs: e.message.slice(0, 40), canon: '' }); }
    }
    rows.push(rec);
  }
  console.log('route'.padEnd(15) + '| zh-hk | en | ja | langs(zh-hk)');
  console.log('-'.repeat(95));
  for (const r of rows) {
    const g = (l) => { const d = r.detail.find((x) => x.loc === l); return d ? (d.n < 0 ? 'ERR' : (d.n === 0 ? '**0**' : String(d.n))) : '?'; };
    const first = r.detail[0];
    console.log(r.name.padEnd(15) + '| ' + g('zh-hk').padEnd(6) + '| ' + g('en').padEnd(4) + '| ' + g('ja').padEnd(4) + '| ' + (first.langs || '(none)'));
  }
  console.log('\n=== canonical 抽查 (zh-hk) ===');
  for (const r of rows) console.log('  ' + r.name.padEnd(15) + ' ' + (r.detail[0].canon || '(无 canonical)'));
})();
