const j = require('F:/zprintpro-nextjs/GSC数据/gsc-fresh-2026-09-03.json');
const d = j.data;
const words = ['大信封', '公司信封', '信封', 'a2 海報', 'a2海報', 'a1 海報', '海報', 'fluorescent', 'flourescent'];
const seen = new Set();
for (const w of ['7d', '28d']) {
  for (const mkt of ['hk', 'en', 'ja']) {
    const rows = d[w]?.[mkt]?.queries || [];
    for (const r of rows) {
      const q = (r.query || '').toLowerCase();
      if (words.some(x => q.includes(x.toLowerCase()))) {
        const key = w + mkt + r.query;
        if (seen.has(key)) continue;
        seen.add(key);
        console.log(`${w} ${mkt} | ${r.query} | clicks=${r.clicks} imps=${r.imps} ctr=${(r.ctr * 100).toFixed(1)}% pos=${r.pos}`);
      }
    }
  }
}
