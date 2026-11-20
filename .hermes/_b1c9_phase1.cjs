// .hermes/_b1c9_phase1.cjs v2 — 簇9 Phase 1: 全站病灶逐 SKU 对照 minQ 分类 (KEEP/FIX)
const fs = require('fs');
const path = require('path');
const REPO = process.cwd();
const ts = fs.readFileSync(path.join(REPO, 'src/data/sku-seo-data.ts'), 'utf8');
const csvLines = fs.readFileSync(path.join(REPO, 'zprintpro-sku-seo-data.csv'), 'utf8').split(/\r?\n/);
const prodLines = fs.readFileSync(path.join(REPO, 'src/data/products.ts'), 'utf8').split(/\r?\n/);

// 1) products.ts minQuantity map
const minQ = {};
prodLines.forEach((ln, i) => { const m = ln.match(/^    slug: '([a-z0-9-]+)',$/); if (m) minQ[m[1]] = null; });
for (let k = 0; k < prodLines.length; k++) {
  const m = prodLines[k].match(/minQuantity: (\d+)/);
  if (!m) continue;
  for (let back = k; back >= Math.max(0, k - 60); back--) {
    const s = prodLines[back].match(/^    slug: '([a-z0-9-]+)',$/);
    if (s && minQ[s[1]] === null) { minQ[s[1]] = +m[1]; break; }
  }
}
// 2) ts 块扫描: slug 行锚定
const SLUG_RE = /^  "([a-z0-9-]+)": \{/gm;
const marks = [];
let mm;
while ((mm = SLUG_RE.exec(ts)) !== null) marks.push({ slug: mm[1], start: mm.index });
for (let k = 0; k < marks.length; k++) marks[k].end = k + 1 < marks.length ? marks[k + 1].start : ts.length;
const csvSlugRows = {};
csvLines.forEach((r, i) => { const c = (r || '').split('\t'); if (c[3]) csvSlugRows[c[3]] = i + 1; });

const PATTERNS = [
  { key: '10 張起印，無開版費', truth: (mq) => mq === 10 },
  { key: 'ISO 9001 認證工廠', truth: () => false },
  { key: 'ISO 9001 認証工場', truth: () => false },
  { key: 'ISO 9001 certified', truth: () => false },
  { key: '15+ 年', truth: () => false },
  { key: '15+ 年の', truth: () => false },
  { key: '50-MOQ', truth: (mq) => mq === 50 },
  { key: ' | 100 MOQ', truth: (mq) => mq === 100 },
  { key: '100-MOQ', truth: (mq) => mq === 100 },
];
const plan = { generated_at: new Date().toISOString(), method: 'ts slug-line block scan -> products.ts minQuantity cross-check', patterns: {}, batches: { A_low_risk: [], B_needs_truth: [] } };
let totalKeep = 0, totalFix = 0, blocksScanned = 0;
for (const mk of marks) {
  blocksScanned++;
  const seg = ts.slice(mk.start, mk.end);
  const mq = minQ[mk.slug] !== undefined && minQ[mk.slug] !== null ? minQ[mk.slug] : 'UNKNOWN';
  for (const p of PATTERNS) {
    let pos = 0, count = 0;
    while (true) { const j = seg.indexOf(p.key, pos); if (j < 0) break; count++; pos = j + 1; }
    if (!count) continue;
    const keep = mq !== 'UNKNOWN' && p.truth(mq);
    const rec = { slug: mk.slug, pattern: p.key, count, minQ: mq, verdict: keep ? 'KEEP' : 'FIX', csvRow: csvSlugRows[mk.slug] || null };
    (plan.patterns[p.key] = plan.patterns[p.key] || []).push(rec);
    if (keep) totalKeep += count;
    else {
      totalFix += count;
      const batch = p.key.startsWith('ISO') || p.key.startsWith('15+') ? 'A_low_risk' : 'B_needs_truth';
      plan.batches[batch].push(rec);
    }
  }
}
plan.blocks_scanned = blocksScanned;
plan.summary = {
  totalKeep, totalFix,
  patterns: Object.fromEntries(Object.entries(plan.patterns).map(([k, v]) => [k, {
    instances: v.reduce((a, r) => a + r.count, 0),
    skus: v.length,
    keep: v.filter(r => r.verdict === 'KEEP').reduce((a, r) => a + r.count, 0),
    fix: v.filter(r => r.verdict === 'FIX').reduce((a, r) => a + r.count, 0),
  }])),
  batchA_instances: plan.batches.A_low_risk.reduce((a, r) => a + r.count, 0),
  batchB_instances: plan.batches.B_needs_truth.reduce((a, r) => a + r.count, 0),
};
fs.writeFileSync(path.join(REPO, '.hermes/_b1c9_plan.json'), JSON.stringify(plan, null, 1));
console.log('blocks:', blocksScanned);
console.log(JSON.stringify(plan.summary, null, 1));
// 打印 FIX 明细 (B 批)
console.log('\n=== B 批 FIX 明细 ===');
plan.batches.B_needs_truth.forEach(r => console.log(`  ${r.slug} (minQ=${r.minQ}) x${r.count}: ${r.pattern}`));
