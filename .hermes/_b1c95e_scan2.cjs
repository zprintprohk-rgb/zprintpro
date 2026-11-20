// .hermes/_b1c95e_scan2.cjs — 9.5-E 全族清单 (C123456/INTL_TOP/1000_PLUS/12ind/裸15年)
const fs = require('fs');
const { execSync } = require('child_process');
const REPO = process.cwd();
const files = execSync('git ls-files src/data src/lib src/app src/components', { encoding: 'utf8' }).trim().split('\n').filter(f => /\.(ts|tsx|json)$/.test(f));
const PATS = ['FSC C123456', 'C123456', '国际顶级', '國際頂級', '1,000+', '1000+', '12 industries', '12 大行業', '12 大行业', '15 年', '15 years'];
const out = {};
const totals = {};
for (const f of files) {
  let t;
  try { t = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  const h = {};
  for (const p of PATS) {
    let c = 0, i = 0;
    while (true) { const j = t.indexOf(p, i); if (j < 0) break; c++; i = j + 1; }
    if (c) { h[p] = c; totals[p] = (totals[p] || 0) + c; }
  }
  if (Object.keys(h).length) out[f] = h;
}
fs.writeFileSync('.hermes/logs/b1c-cluster95e-inventory-v2.json', JSON.stringify({ scanned: new Date().toISOString(), files: out, totals }, null, 1), 'utf-8');
console.log(JSON.stringify(totals));
console.log('---files---');
for (const [f, h] of Object.entries(out)) console.log(f.replace(/\\/g, '/'), JSON.stringify(h));
