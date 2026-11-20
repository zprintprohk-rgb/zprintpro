// E2 catalog: query×page rows + date-page trend
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
const qp = parseCSV(fs.readFileSync('GSC数据/money-kw-query-page-country-2026-10-31.csv', 'utf8'));
const TQ = ['china catalog printing', 'catalog printing china', 'saddle stitch booklet printing'];
for (const q of TQ) {
  const rows = qp.slice(1).filter((r) => r[0] === q && r.length >= 7);
  console.log(`\n== ${q} == (${rows.length} rows)`);
  rows.sort((a, b) => Number(b[4]) - Number(a[4])).slice(0, 6)
    .forEach((r) => console.log(`  ${r[1].replace('https://zprintpro.com', '')} | ${r[2]} | ${r[4]}imp ${r[3]}clk pos${r[6]}`));
}
// date-page trend for catalog-ish en pages
const dp = parseCSV(fs.readFileSync('GSC数据/gsc-date-page-28d-end1102.csv', 'utf8'));
const pages = [...new Set(dp.slice(1).map((r) => r[1]).filter((p) => p && /\/en\/(product|category)\/(catalog|books)/.test(p)))];
console.log('\n== en catalog/books page trends ==');
for (const p of pages) {
  const s = dp.slice(1).filter((r) => r[1] === p).map((r) => `${r[0].slice(5)}:${r[3] || 0}`).join(' ');
  console.log(`${p.replace('https://zprintpro.com', '')}\n  ${s}`);
}
