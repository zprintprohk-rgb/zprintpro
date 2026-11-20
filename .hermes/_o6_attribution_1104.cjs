// O6 evidence pack data: 海報印刷 (+ 喜帖/利是封 classification lines) query×page×country distribution
const fs = require('fs');
function parseCSV(text) {
  const rows = []; let row = [], field = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) { if (ch === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else inQ = false; } else field += ch; }
    else if (ch === '"') inQ = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (ch !== '\r') field += ch;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}
const csv = parseCSV(fs.readFileSync('GSC数据/money-kw-query-page-country-2026-10-31.csv', 'utf8'));
const TARGETS = ['海報印刷', '喜帖印刷', '利是封印刷'];
const out = {};
for (const q of TARGETS) {
  const perURL = {};
  for (const r of csv.slice(1)) {
    if (r.length < 7) continue;
    const [query, page, ctry, clk, imp, , pos] = r;
    if (query !== q) continue;
    const a = perURL[page] || (perURL[page] = { clk: 0, imp: 0, wpos: 0, n: 0, countries: {} });
    const c = Number(clk) || 0, m = Number(imp) || 0, p = Number(pos) || 0;
    a.clk += c; a.imp += m; a.wpos += p * m; a.n += 1;
    const cc = a.countries[ctry] || (a.countries[ctry] = { clk: 0, imp: 0 });
    cc.clk += c; cc.imp += m;
  }
  const urls = Object.entries(perURL)
    .map(([url, a]) => ({ url: url.replace('https://zprintpro.com', ''), clk: a.clk, imp: a.imp, pos_weighted: a.imp ? +(a.wpos / a.imp).toFixed(2) : null, top_country: Object.entries(a.countries).sort((x, y) => y[1].imp - x[1].imp)[0]?.[0] || '?' }))
    .sort((x, y) => y.imp - x.imp);
  const totalImp = urls.reduce((s, u) => s + u.imp, 0);
  out[q] = {
    total_imp: totalImp,
    total_clk: urls.reduce((s, u) => s + u.clk, 0),
    url_count: urls.length,
    top_share: urls.length ? +(urls[0].imp / totalImp * 100).toFixed(1) : null,
    urls: urls.slice(0, 12),
  };
}
const result = { generated_at: new Date().toISOString(), source: 'GSC数据/money-kw-query-page-country-2026-10-31.csv (window 09-30..10-27, query×page×country)', grain_note: '与 28d xlsx 全国家基线不同 grain；份额与位次仅作承接归因参考', o6_data: out };
fs.writeFileSync('.hermes/logs/gsc-2026-11-04-o6-poster-attribution.json', JSON.stringify(result, null, 2), 'utf8');
for (const [q, v] of Object.entries(out)) {
  console.log(`\n== ${q} == total ${v.total_imp} imp / ${v.total_clk} clk / ${v.url_count} URLs / top-share ${v.top_share}%`);
  v.urls.forEach((u, i) => console.log(`  ${i + 1}. ${u.url} | ${u.imp}imp ${u.clk}clk pos${u.pos_weighted} [${u.top_country}]`));
}
