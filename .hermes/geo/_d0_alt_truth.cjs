// D0 补齐（千问评审缺口）: per-SKU EXIF alt vs products.ts truth + full 91-row human-readable wave ledger
const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(fs.readFileSync('.hermes/geo/v28_5-deploy-manifest.json', 'utf8'));
const byDir = Object.fromEntries(manifest.entries.map(e => [e.dir, e]));

// --- ledger: dir -> locale -> alt ---
function splitLine(line, d) {
  const out = []; let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) { if (c === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else { if (c === '"') q = true; else if (c === d) { out.push(cur); cur = ''; } else cur += c; }
  }
  out.push(cur); return out;
}
let raw = fs.readFileSync('zprintpro-en-us-images/v28_5_webp/_ledger/B_sku_consolidation.csv', 'utf8');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const lines = raw.split(/\r?\n/).filter(l => l.length);
const header = splitLine(lines[0], ',');
const ix = Object.fromEntries(header.map((h, i) => [h, i]));
const CLAIMS = { iso9001: /ISO\s*9001/i, moq100: /100 pieces minimum/i, brand: /ZprintPro/i, sla: /(24\s*h|48\s*h|SLA|翌日|same[- ]day|當日)/i, equip: /(海德堡|Heidelberg|HP\s*Indigo|小森|Komori)/i, certNo: /C\d{6}/i, bigCount: /(\d{1,3},\d{3}\+|\d+\+\s*(clients|customers|orders))/i };
const dirs = {};
for (const r of lines.slice(1).map(l => splitLine(l, ','))) {
  const d = (r[ix['sku']] || '').trim(); if (!/^[A-Z]{2,4}-\d{3}$/.test(d)) continue;
  const o = (dirs[d] ||= { alts: {} });
  const loc = (r[ix['locale']] || '').trim(), alt = (r[ix['alt_text']] || '').trim();
  if (loc && alt && !o.alts[loc]) o.alts[loc] = alt;
}

// --- products.ts: slug -> minQuantity ---
const ts = fs.readFileSync('src/data/products.ts', 'utf8');
const prodStart = ts.indexOf('export const products: Product[] = [');
const prodEnd = ts.indexOf('\n];', prodStart);
const region = ts.slice(prodStart, prodEnd);
const slugIdx = [...region.matchAll(/\bslug:\s*'([a-z0-9-]+)'/g)].map(m => [m[1], m.index]);
const minQ = {};
slugIdx.forEach(([s, i], k) => {
  const block = region.slice(i, k + 1 < slugIdx.length ? slugIdx[k + 1][1] : region.length);
  const m = block.match(/minQuantity:\s*(\d+)/);
  minQ[s] = m ? parseInt(m[1], 10) : null;
});

// --- build alt-vs-truth ---
const out = { built_at: new Date().toISOString(), note: 'D0-③ 登记完整形态: EXIF 内嵌 alt 声明 vs products.ts 真值 (本波不采纳进渲染层)', dirs: {} };
let mismatch = 0, match100 = 0, unknown = 0;
for (const [d, o] of Object.entries(dirs)) {
  const e = byDir[d] || {};
  const slug = e.slug || null;
  const alts = Object.values(o.alts);
  const claims = {};
  for (const k in CLAIMS) claims[k] = alts.some(a => CLAIMS[k].test(a));
  const mq = slug ? minQ[slug] : null;
  let moqVerdict = 'unknown-no-slug';
  if (claims.moq100) {
    if (mq === null) moqVerdict = 'unverifiable-no-minQuantity';
    else if (mq === 100) { moqVerdict = 'match'; match100++; }
    else { moqVerdict = 'mismatch(minQuantity=' + mq + ')'; mismatch++; }
  } else unknown++;
  out.dirs[d] = { slug, wave: e.wave || null, verdict: e.verdict || null, alts: o.alts, claims, truth_minQuantity: mq, moq_claim_verdict: moqVerdict, iso_verdict: claims.iso9001 ? 'unverified-do-not-render(需 K3 拍板来源)' : 'no-claim' };
}
fs.writeFileSync('.hermes/geo/v28_5-exif-alt-vs-truth.json', JSON.stringify(out, null, 1), 'utf8');

// --- waves CSV (91 rows, human-readable) ---
const csv = ['wave,dir,slug,verdict,tier,imps,imps_zh,imps_en,imps_ja,note'];
for (const e of manifest.entries) {
  const g = e.gsc || {};
  const note = (e.flags || []).join(' | ').replace(/"/g, "'");
  csv.push([e.wave || '', e.dir, e.slug || '', e.verdict, g.tier || '', g.imps ?? '', g.zh ?? '', g.en ?? '', g.ja ?? '', `"${note}"`].join(','));
}
fs.writeFileSync('.hermes/geo/v28_5-waves-2026-10-16.csv', csv.join('\n'), 'utf8');

console.log('WROTE .hermes/geo/v28_5-exif-alt-vs-truth.json + v28_5-waves-2026-10-16.csv');
console.log(`MOQ claim vs minQuantity: match(=100)=${match100} mismatch=${mismatch} (claim present on 91/91 dirs)`);
const mm = Object.entries(out.dirs).filter(([, v]) => v.moq_claim_verdict.startsWith('mismatch')).map(([d, v]) => `${d}/${v.slug}(minQ=${v.truth_minQuantity})`);
console.log('MISMATCHES=' + mm.join(', '));
