// .hermes/_b1c95_scan2.cjs — 簇9.5 全变体扫描 v2 (文件×模式计数 + 上下文样本)
const fs = require('fs');
const { execSync } = require('child_process');
const REPO = process.cwd();
const files = execSync('git ls-files src/data src/lib src/app', { encoding: 'utf8' }).trim().split('\n').filter(f => /\.(ts|tsx|json)$/.test(f));
const PATS = ['ISO 9001', 'ISO9001', '15+ 年', '15+ years', '15,000+ clients', '1,000+', '1000+', '16 years', '16 Year', '16 年', '12 industries'];
const REPORT_ONLY = ['Heidelberg', '海德堡', 'SGS'];
const out = {};
const totals = {};
for (const f of files) {
  let t;
  try { t = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  const h = {};
  for (const p of [...PATS, ...REPORT_ONLY]) {
    let c = 0, i = 0;
    while (true) { const j = t.indexOf(p, i); if (j < 0) break; c++; i = j + 1; }
    if (c) { h[p] = c; totals[p] = (totals[p] || 0) + c; }
  }
  if (Object.keys(h).length) out[f] = h;
}
fs.writeFileSync('.hermes/logs/b1c-cluster95-surface-v2-2026-10-16.json', JSON.stringify({ scanned_at: new Date().toISOString(), fix_scope: PATS, report_only: REPORT_ONLY, files: out, totals }, null, 1), 'utf-8');
console.log(JSON.stringify(totals));
console.log('---files---');
for (const [f, h] of Object.entries(out)) console.log(f, JSON.stringify(h));
