// GSC analysis v2 — apply rules (2026-07-08 cron)
// Reads gsc_data.csv (UTF-8, no BOM), classifies signals, prints top entries
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const csv = fs.readFileSync(path.join(ROOT, 'gsc_data.csv'), 'utf-8');
const lines = csv.split(/\r?\n/).filter(l => l.trim());
const header = lines[0].split(',');

const colIdx = {
  query: header.findIndex(h => h.includes('热门')),
  clicks: header.findIndex(h => h.includes('点击次数')),
  imp: header.findIndex(h => h.includes('展示')),
  ctr: header.findIndex(h => h.includes('点击率')),
  rank: header.findIndex(h => h.includes('排名')),
};

console.log('colIdx:', colIdx);
console.log('total rows:', lines.length - 1);

const rows = [];
for (let i = 1; i < lines.length; i++) {
  const cells = lines[i].split(',');
  const kw = cells[colIdx.query];
  const clicks = parseInt(cells[colIdx.clicks]);
  const imp = parseInt(cells[colIdx.imp]);
  const ctrRaw = cells[colIdx.ctr] || '0%';
  const ctr = parseFloat(ctrRaw.replace('%', '')) || 0;
  const rank = parseFloat(cells[colIdx.rank]);
  if (!kw) continue;
  // 过滤竞品词
  if (kw.includes('智印港') || kw.includes('智印印港')) continue;
  rows.push({ keyword: kw, clicks, impressions: imp, ctr, rank });
}

console.log('after competitor filter:', rows.length);

// Rules
const strong_orphan = []; // imps ≥ 100 且 rank 11-30
const orphan = []; // imps ≥ 50 zero-click (CTR=0)
const high_potential = []; // imps ≥ 20 且 rank 20-50
const cta_keywords = []; // clicks ≥ 1

for (const r of rows) {
  if (r.clicks >= 1) cta_keywords.push(r);
  if (r.impressions >= 100 && r.rank >= 11 && r.rank <= 30) {
    strong_orphan.push(r);
  } else if (r.clicks === 0 && r.impressions >= 50) {
    orphan.push(r);
  } else if (r.impressions >= 20 && r.rank >= 20 && r.rank <= 50) {
    high_potential.push(r);
  }
}

const sortByImp = (a, b) => b.impressions - a.impressions;
strong_orphan.sort(sortByImp);
orphan.sort(sortByImp);
high_potential.sort(sortByImp);
cta_keywords.sort((a, b) => b.impressions - a.impressions);

console.log('\n=== strong_orphan (+2): imps≥100 rank 11-30 ===');
strong_orphan.forEach((r, i) => console.log(`  ${i + 1}. ${r.keyword} | imp=${r.impressions} rank=${r.rank} ctr=${r.ctr}% clicks=${r.clicks}`));

console.log('\n=== orphan (+1): imps≥50 zero-click ===');
orphan.slice(0, 20).forEach((r, i) => console.log(`  ${i + 1}. ${r.keyword} | imp=${r.impressions} rank=${r.rank}`));
console.log(`... total orphan: ${orphan.length}`);

console.log('\n=== high_potential (+1): imps≥20 rank 20-50 ===');
high_potential.slice(0, 20).forEach((r, i) => console.log(`  ${i + 1}. ${r.keyword} | imp=${r.impressions} rank=${r.rank}`));
console.log(`... total high_potential: ${high_potential.length}`);

console.log('\n=== top 10 cta_keywords (clicks≥1 sorted by imp) ===');
cta_keywords.slice(0, 10).forEach((r, i) => console.log(`  ${i + 1}. ${r.keyword} | clicks=${r.clicks} imp=${r.impressions} rank=${r.rank} ctr=${r.ctr}%`));

// Persist for next step
const out = {
  generated_at: new Date().toISOString(),
  total_rows: rows.length,
  strong_orphan: strong_orphan.map(r => ({ keyword: r.keyword, impressions: r.impressions, rank: r.rank })),
  orphan: orphan.map(r => ({ keyword: r.keyword, impressions: r.impressions, rank: r.rank })),
  high_potential: high_potential.map(r => ({ keyword: r.keyword, impressions: r.impressions, rank: r.rank })),
  cta_keywords: cta_keywords.slice(0, 20).map(r => ({ keyword: r.keyword, clicks: r.clicks, impressions: r.impressions, rank: r.rank, ctr: r.ctr })),
  filtered_competitor: rows.length === 0 ? [] : (() => {
    const allRows = lines.slice(1).map(l => l.split(',')[colIdx.query]).filter(q => q && (q.includes('智印港') || q.includes('智印印港')));
    return allRows;
  })(),
};
fs.writeFileSync(path.join('.hermes', 'gsc-snapshot-2026-07-08.json'), JSON.stringify(out, null, 2), 'utf-8');
console.log('\nsaved: .hermes/gsc-snapshot-2026-07-08.json');
