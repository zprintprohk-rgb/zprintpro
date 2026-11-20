// D0: locate GSC export candidates (2026-10-14..17) across repo — read-only
const fs = require('fs');
const path = require('path');
const hits = [];
const CAND_ROOTS = ['.', './GSC数据', './.hermes', './docs', './.hermes/gsc-2026-09-18', './.hermes/geo', './.hermes/reports', './.hermes/logs'];
function walk(dir, depth, budget) {
  if (depth > 3 || budget.n <= 0) return;
  let ents;
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of ents) {
    if (budget.n <= 0) return;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (/node_modules|\.git$|zprintpro-en-us-images|public|src/i.test(e.name)) continue;
      budget.n--; walk(p, depth + 1, budget);
    } else if (e.isFile()) {
      budget.n--;
      const st = fs.statSync(p);
      const mt = st.mtime;
      const nameHit = /gsc|search[-_]?console|三站|网站管理/i.test(e.name);
      const dateHit = mt >= new Date('2026-10-13T00:00:00') && mt <= new Date('2026-10-17T23:59:59');
      const extHit = /\.(xlsx|xls|csv|zip|tsv)$/i.test(e.name);
      if ((nameHit && extHit) || (dateHit && extHit && /gsc|三站|28|export|导出/i.test(e.name))) {
        hits.push({ path: p.replace(/\\/g, '/'), KB: Math.round(st.size / 1024), mtime: mt.toISOString().replace('T', ' ').slice(0, 16) });
      }
    }
  }
}
const budget = { n: 30000 };
for (const r of CAND_ROOTS) walk(r, 0, budget);
for (const h of hits) console.log(`HIT ${h.mtime} ${String(h.KB).padStart(7)}KB ${h.path}`);
console.log('TOTAL_HITS=' + hits.length);
// also list GSC数据 top-level if exists
if (fs.existsSync('GSC数据')) {
  const ents = fs.readdirSync('GSC数据', { withFileTypes: true });
  console.log('GSC数据_TOP=' + ents.slice(0, 40).map(e => e.name + (e.isDirectory() ? '/' : '')).join(' | '));
} else console.log('GSC数据_DIR=NOT_FOUND');
