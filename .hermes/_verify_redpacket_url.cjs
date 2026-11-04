// Which URL owns 燙金利是封 (jpn/hkg)? from query×page×country
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
const rows = csv.slice(1).filter((r) => r.length >= 7 && /燙金利是封|利是封/.test(r[0] || '') && /jpn|hkg/.test(r[2] || ''));
rows.sort((a, b) => Number(b[4]) - Number(a[4])).slice(0, 12).forEach((r) => {
  console.log(`${r[0]} | ${r[1].replace('https://zprintpro.com', '')} | ${r[2]} | imp ${r[4]} clk ${r[3]} pos ${r[6]}`);
});
