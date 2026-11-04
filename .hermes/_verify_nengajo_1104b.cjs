// CORRECTED: 年賀状 cluster verification (CSV col order: query,country,clicks,impressions,ctr,position)
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
for (const f of ['GSC数据/gsc-query-country-28d-end1102.csv', 'GSC数据/gsc-query-country-28d-end1103.csv']) {
  const csv = parseCSV(fs.readFileSync(f, 'utf8'));
  const hits = csv.slice(1).filter((r) => r.length >= 6 && /年賀|ねんが|nengajo|nenga/i.test(r[0] || ''));
  let imp = 0, clk = 0;
  const rows = hits.map((r) => {
    const [q, ctry, c, m, ctr, pos] = r;
    imp += Number(m) || 0; clk += Number(c) || 0;
    return `  ${q} | ${ctry} | imp ${m} clk ${c} pos ${pos}`;
  });
  console.log(`== ${f}  (rows ${hits.length})`);
  rows.sort().forEach((x) => console.log(x));
  console.log(`  TOTAL: imp ${imp} / clk ${clk}`);
}
