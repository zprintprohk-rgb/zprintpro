// Verify 燙金利是封 / 利是封 cluster claims (col order: query,country,clicks,impressions,ctr,position)
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
const hits = csv.slice(1).filter((r) => r.length >= 6 && /利是|利市|red packet|laisee|lai see/i.test(r[0] || ''));
let imp = 0, clk = 0;
console.log('rows:', hits.length);
hits.sort((a, b) => Number(b[3]) - Number(a[3])).slice(0, 14).forEach((r) => {
  imp += 0; // printed per row below
  console.log(`  ${r[0]} | ${r[1]} | imp ${r[3]} clk ${r[2]} pos ${r[5]}`);
});
for (const r of hits) { imp += Number(r[3]) || 0; clk += Number(r[2]) || 0; }
console.log('TOTAL imp/clk:', imp, '/', clk);
const exact = hits.filter((r) => r[0] === '燙金利是封');
console.log('燙金利是封 rows:', exact.length, exact.map((r) => `${r[1]}:imp${r[3]} pos${r[5]}`).join(' | '));
