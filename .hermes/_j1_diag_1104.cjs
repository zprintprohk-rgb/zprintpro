// J1 diagnosis data: 教材 印刷製本 owning URLs + page-level trend
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
// A) query×page×country rows for 教材 印刷製本
const qp = parseCSV(fs.readFileSync('GSC数据/money-kw-query-page-country-2026-10-31.csv', 'utf8'));
const rows = qp.slice(1).filter((r) => r[0] === '教材 印刷製本' && r.length >= 7);
console.log('== 教材 印刷製本 query×page rows ==');
for (const r of rows) console.log(`  ${r[1].replace('https://zprintpro.com', '')} | ${r[2]} | ${r[4]}imp ${r[3]}clk pos${r[6]}`);

// B) date×page trend for ja educational category + related pages
const dp = parseCSV(fs.readFileSync('GSC数据/gsc-date-page-28d-end1102.csv', 'utf8'));
const header = dp[0];
console.log('\n== date-page header ==', header.join(','));
const pages = [...new Set(dp.slice(1).map((r) => r[1]).filter((p) => /ja\/category\/educational|ja\/product\/(textbook|exercise|notebook)/.test(p || '')))];
console.log('ja edu-ish pages found:', pages.length);
for (const page of pages.slice(0, 3)) {
  const series = dp.slice(1).filter((r) => r[1] === page).map((r) => `${r[0]}:${r[3] || '?'}i`).join(' ');
  console.log(`\n${page.replace('https://zprintpro.com', '')}\n  ${series}`);
}
