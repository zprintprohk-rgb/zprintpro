// Verify 年賀状 cluster "broke zero" claim against API end1103 (query×country)
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
const csv = parseCSV(fs.readFileSync('GSC数据/gsc-query-country-28d-end1103.csv', 'utf8'));
const hits = csv.slice(1).filter((r) => r.length >= 6 && /年賀|年賀状|ねんが|nengajo|nenga/i.test(r[0] || ''));
console.log('matched rows:', hits.length);
for (const r of hits.sort((a, b) => Number(b[4]) - Number(a[4])).slice(0, 15)) {
  console.log(`  ${r[0]} | ${r[1]} | ${r[4]}imp ${r[3]}clk pos${r[5]}`);
}
const totalImp = hits.reduce((s, r) => s + (Number(r[4]) || 0), 0);
const totalClk = hits.reduce((s, r) => s + (Number(r[3]) || 0), 0);
console.log('cluster total imp/clk:', totalImp, '/', totalClk);
