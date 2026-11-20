// D0: parse v28_5 ledger CSV + scan 93 dirs (file counts/sizes/naming) — read-only
const fs = require('fs');
const path = require('path');
const ROOT = 'zprintpro-en-us-images/v28_5_webp';
const csvPath = path.join(ROOT, '_ledger', 'B_sku_consolidation.csv');

function splitLine(line, d) {
  const out = []; let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) { if (c === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else { if (c === '"') q = true; else if (c === d) { out.push(cur); cur = ''; } else cur += c; }
  }
  out.push(cur); return out;
}

let raw = fs.readFileSync(csvPath, 'utf8');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const lines = raw.split(/\r?\n/).filter(l => l.length > 0);
const first = lines[0];
const tabs = (first.match(/\t/g) || []).length, commas = (first.match(/,/g) || []).length;
const delim = tabs >= commas ? '\t' : ',';
const header = splitLine(first, delim);
const rows = lines.slice(1).map(l => splitLine(l, delim));
console.log('LEDGER delim=' + (delim === '\t' ? 'TAB' : 'COMMA') + ' cols=' + header.length + ' rows=' + rows.length);
console.log('HEADER=' + JSON.stringify(header));
for (let i = 0; i < Math.min(3, rows.length); i++) console.log('SAMPLE' + i + '=' + JSON.stringify(rows[i]).slice(0, 500));

// find dir-code column(s): values like BC-001
const dirCols = [], slugCols = [];
const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)+$/;
for (let c = 0; c < header.length; c++) {
  let dirHits = 0, slugHits = 0;
  for (const r of rows) { const v = (r[c] || '').trim(); if (/^[A-Z]{2,4}-\d{3}$/.test(v)) dirHits++; if (slugRe.test(v)) slugHits++; }
  if (dirHits >= rows.length * 0.5) dirCols.push([c, header[c], dirHits]);
  if (slugHits >= rows.length * 0.5) slugCols.push([c, header[c], slugHits]);
}
console.log('DIR_COLS=' + JSON.stringify(dirCols));
console.log('SLUG_COLS=' + JSON.stringify(slugCols));

// dir scan
const RE = /^zprintpro-(.+)-(en|ja|zh-hk)-(hero|detail|variety|multi-angle)\.webp$/;
const dirs = fs.readdirSync(ROOT, { withFileTypes: true }).filter(d => d.isDirectory() && !d.name.startsWith('_')).map(d => d.name).sort();
let totalFiles = 0, anomalies = [];
const dirStats = {};
for (const d of dirs) {
  const files = fs.readdirSync(path.join(ROOT, d)).filter(f => f.toLowerCase().endsWith('.webp'));
  let total = 0, max = 0;
  const locales = new Set(), views = new Set(), badNames = [];
  for (const f of files) {
    const st = fs.statSync(path.join(ROOT, d, f)); total += st.size; if (st.size > max) max = st.size;
    if (d === 'hero') continue;
    const m = f.match(RE);
    if (m) { locales.add(m[2]); views.add(m[3]); } else badNames.push(f);
  }
  totalFiles += files.length;
  dirStats[d] = { files: files.length, totalKB: Math.round(total / 1024), maxKB: Math.round(max / 1024), locales: [...locales].sort(), views: [...views].sort(), badNames };
  const ok = d === 'hero' ? files.length === 48 : (files.length === 12 && locales.size === 3 && views.size === 4 && max < 120 * 1024 && badNames.length === 0);
  if (!ok) anomalies.push(d + ' files=' + files.length + ' locales=' + locales.size + ' views=' + views.size + ' maxKB=' + Math.round(max / 1024) + ' bad=' + badNames.slice(0, 2).join(','));
}
console.log('DIRS=' + dirs.length + ' TOTAL_WEBP=' + totalFiles);
console.log('ANOMALIES=' + (anomalies.length ? '\n' + anomalies.join('\n') : 'none'));
console.log('HERO_STATS=' + JSON.stringify(dirStats['hero'] || null));
if (dirCols.length === 1) {
  const dc = dirCols[0][0];
  // choose best slug col: highest slugHits with distinct values
  let best = null;
  for (const [c, name, hits] of slugCols) {
    const vals = new Set(rows.map(r => (r[c] || '').trim()));
    if (!best || vals.size > best[3]) best = [c, name, hits, vals.size];
  }
  if (best) {
    console.log('MAPPING_COL=' + best[0] + '(' + best[1] + ') distinct=' + best[3]);
    for (const r of rows) {
      const d = (r[dc] || '').trim();
      if (/^[A-Z]{2,4}-\d{3}$/.test(d)) console.log('MAP ' + d + ' -> ' + (r[best[0]] || '').trim());
    }
  } else console.log('NO_SLUG_COLUMN_FOUND');
} else console.log('DIR_COLS_AMBIGUOUS need manual pick: ' + JSON.stringify(dirCols));
