/**
 * 可信版 hreflang 审计:
 *  ① 大小写不敏感 (`hrefLang` camelCase 合法)
 *  ② 串行 + 间隔 (避免突发被限流 → 假 0)
 *  ③ 校验响应体确实是目标页 (含 marker + 长度下限), 否则标 INVALID 而不是计入 0
 */
const ROUTES = [
  ['home', (l) => `/${l}/`, '<title'],
  ['category', (l) => `/${l}/category/books/`, '<title'],
  ['product', (l) => `/${l}/product/saddle-stitch-booklets/`, '<title'],
  ['blog-list', (l) => `/${l}/blog/`, '<title'],
  ['blog-post-new', (l) => `/${l}/blog/zine-small-batch-booklet-printing-guide/`, 'zine-small-batch'],
  ['blog-post-old', (l) => `/${l}/blog/school-exercise-book-printing-guide/`, 'school-exercise-book'],
  ['guide', (l) => `/${l}/guide/sticker-guide/`, '<title'],
  ['quote', (l) => `/${l}/quote/`, '<title'],
  ['contact', (l) => `/${l}/contact/`, '<title'],
  ['about', (l) => `/${l}/about/`, '<title'],
  ['trade-program', (l) => `/${l}/trade-program/`, '<title'],
  ['institutional', (l) => `/${l}/institutional-printing/`, '<title'],
  ['insights', (l) => `/${l}/insights/hk-print-inquiry-index/`, '<title'],
  ['services-rush', (l) => `/${l}/services/rush-printing-delivery/`, '<title'],
  ['legal', (l) => `/${l}/legal/`, '<title'],
  ['case-studies', (l) => `/${l}/case-studies/`, '<title'],
  ['faq', (l) => `/${l}/faq/`, '<title'],
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const out = [];
  for (const [name, fn, marker] of ROUTES) {
    const cells = [];
    for (const loc of ['zh-hk', 'en', 'ja']) {
      const url = 'https://zprintpro.com' + fn(loc);
      let cell = 'ERR';
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const r = await fetch(url, { redirect: 'follow' });
          const h = await r.text();
          const valid = r.status === 200 && h.length > 5000 && h.includes(marker);
          const n = (h.match(/rel="alternate"[^>]*hreflang=/gi) || []).length;
          const langs = [...h.matchAll(/rel="alternate"[^>]*hreflang="([^"]+)"/gi)].map((m) => m[1]).join(',');
          const canon = (h.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i) || [])[1] || '';
          if (!valid) { cell = 'INVALID'; await sleep(300); continue; }
          cell = { n, langs, canon };
          break;
        } catch (e) { cell = 'ERR'; await sleep(300); }
      }
      cells.push(cell);
      await sleep(250);
    }
    out.push({ name, cells });
  }
  console.log('route'.padEnd(16) + '| zh-hk                | en                   | ja                   | langs(zh-hk)');
  console.log('-'.repeat(120));
  for (const r of out) {
    const f = (c) => (typeof c === 'string' ? c.padEnd(20) : (c.n === 0 ? '**0 (真缺)**' : String(c.n) + ' ok').padEnd(20));
    const l0 = typeof r.cells[0] === 'object' ? r.cells[0].langs : '';
    console.log(r.name.padEnd(16) + '| ' + f(r.cells[0]) + '| ' + f(r.cells[1]) + '| ' + f(r.cells[2]) + '| ' + l0);
  }
  console.log('\ncanonical(zh-hk):');
  for (const r of out) console.log('  ' + r.name.padEnd(16) + ' ' + (typeof r.cells[0] === 'object' ? (r.cells[0].canon || '(无)') : '-'));
})();
