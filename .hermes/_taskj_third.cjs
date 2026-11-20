// Task-J third measurement (2026-11-04): hkg 8 keywords, same method as second test
// CSV: GSC数据/gsc-query-country-28d-end1103.csv (window 2026-10-06..2026-11-02, query×country)
// Prior: .hermes/logs/gsc-2026-11-03-taskj-c4-monthly.json (first=10-04..10-29, second=10-05..11-01)
const fs = require('fs');

function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else { inQ = false; }
      } else field += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (ch !== '\r') field += ch;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const csv = parseCSV(fs.readFileSync('GSC数据/gsc-query-country-28d-end1103.csv', 'utf8'));
const KWS = ['即日印刷', '騎馬釘', '書刊印刷', '貼紙印刷', '宣傳單張', '包裝盒印刷', '紙盒印刷', '包裝盒訂製'];
const agg = {};
for (const r of csv.slice(1)) {
  if (r.length < 6) continue;
  const [q, ctry, clk, imp, , pos] = r;
  if (ctry !== 'hkg') continue;
  if (!KWS.includes(q)) continue;
  const a = agg[q] || (agg[q] = { clk: 0, imp: 0, wpos: 0, spos: 0, n: 0 });
  const c = Number(clk) || 0, m = Number(imp) || 0, p = Number(pos) || 0;
  a.clk += c; a.imp += m; a.wpos += p * m; a.spos += p; a.n += 1;
}

const prior = JSON.parse(fs.readFileSync('.hermes/logs/gsc-2026-11-03-taskj-c4-monthly.json', 'utf8')).taskj_hkg;
const out = [];
for (const kw of KWS) {
  const a = agg[kw];
  const third_pos_w = a && a.imp ? +(a.wpos / a.imp).toFixed(2) : null;
  const third_pos_s = a && a.n ? +(a.spos / a.n).toFixed(2) : null;
  const p2 = prior.find((x) => x.kw === kw);
  out.push({
    kw,
    second_pos: p2 ? p2.second_pos : null,
    second_imp: p2 ? p2.second_imp : null,
    third_clk: a ? a.clk : 0,
    third_imp: a ? a.imp : 0,
    third_pos_weighted: third_pos_w,
    third_pos_simple: third_pos_s,
    delta_pos_vs_second: p2 && third_pos_w != null ? +(third_pos_w - p2.second_pos).toFixed(2) : null,
    rows_hkg: a ? a.n : 0,
  });
}
const result = {
  generated_at: new Date().toISOString(),
  window: '2026-10-06..2026-11-02 (28d ending 11-02, API query×country, country=hkg)',
  source_csv: 'GSC数据/gsc-query-country-28d-end1103.csv',
  method: 'imp-weighted mean position (same as second test); simple mean kept as cross-check',
  csv_rows_total: csv.length - 1,
  taskj_hkg_third: out,
  sanity: { kw_rows_sum: out.reduce((s, o) => s + o.rows_hkg, 0), kw_imp_sum: out.reduce((s, o) => s + o.third_imp, 0) },
};
fs.writeFileSync('.hermes/logs/gsc-2026-11-04-taskj-third.json', JSON.stringify(result, null, 2), 'utf8');
console.log(JSON.stringify(out, null, 1));
console.log('sanity', JSON.stringify(result.sanity));
