// D0: ledger -> dir mapping (filename-derived) + alt claims census — read-only
const fs = require('fs');
const path = require('path');
const ROOT = 'zprintpro-en-us-images/v28_5_webp';
const wiring = JSON.parse(fs.readFileSync('.hermes/geo/v28_5-wiring.json', 'utf8'));
const live = new Set(wiring.live_slugs);

function splitLine(line, d) {
  const out = []; let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) { if (c === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else { if (c === '"') q = true; else if (c === d) { out.push(cur); cur = ''; } else cur += c; }
  }
  out.push(cur); return out;
}
let raw = fs.readFileSync(path.join(ROOT, '_ledger', 'B_sku_consolidation.csv'), 'utf8');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const lines = raw.split(/\r?\n/).filter(l => l.length);
const header = splitLine(lines[0], ',');
const rows = lines.slice(1).map(l => splitLine(l, ','));
const ix = Object.fromEntries(header.map((h, i) => [h, i]));

// aggregate per dir
const dirs = {};
for (const r of rows) {
  const d = r[ix['sku']].trim(); if (!/^[A-Z]{2,4}-\d{3}$/.test(d)) continue;
  (dirs[d] ||= { n: 0, mids: new Set(), locales: new Set(), views: new Set(), alts: new Set(), sources: new Set() });
  const o = dirs[d]; o.n++;
  const f = r[ix['file']].trim();
  const m = f.match(/^zprintpro-(.+)-(en|ja|zh-hk)-(hero|detail|variety|multi-angle)\.webp$/);
  if (m) { o.mids.add(m[1]); o.locales.add(m[2]); o.views.add(m[3]); }
  o.alts.add(r[ix['alt_text']].trim()); o.sources.add(r[ix['source']].trim());
}
const dirCodes = Object.keys(dirs).sort();
console.log('DIR_COUNT=' + dirCodes.length);

// token-multiset + suffix matching against live slugs
const toks = s => s.split('-').slice().sort().join('+');
function matchSlug(mid) {
  if (live.has(mid)) return [mid, 'exact'];
  let cands = [];
  for (const s of live) {
    if (mid.endsWith('-' + s) || s.endsWith('-' + mid)) cands.push([s, 'suffix']);
    else if (toks(mid) === toks(s)) cands.push([s, 'tokens']);
    else if (mid.includes(s) || s.includes(mid)) cands.push([s, 'contains']);
  }
  const pref = { exact: 0, suffix: 1, tokens: 2, contains: 3 };
  cands.sort((a, b) => pref[a[1]] - pref[b[1]]);
  return cands.length ? cands : null;
}

const claims = { ISO9001: /ISO\s*9001/i, FSC: /FSC/i, MOQ: /(MOQ|pieces?\s+minimum|個起|枚起|張起|本起|minimum\s+order|起訂|起订)/i, SLA: /(24\s*h|48\s*h|SLA|翌日|same[- ]day|當日)/i, EQUIP: /(海德堡|Heidelberg|HP\s*Indigo|小森|Komori)/i, BRAND: /(ZprintPro|智印港|ジープリント)/i, COUNT: /(\d{1,3},\d{3}\+|\d+\+\s*(clients|customers|orders)|1,000|4,500)/i, CERTNO: /C\d{6}/i };
const claimCounts = {}; let altTotal = 0;
for (const d of dirCodes) {
  const o = dirs[d];
  const mid = [...o.mids].sort().join('|');
  const m = matchSlug(mid);
  const alt = [...o.alts].sort((a, b) => b.length - a.length)[0] || '';
  altTotal += o.alts.size;
  for (const k in claims) if (claims[k].test(alt)) claimCounts[k] = (claimCounts[k] || 0) + 1;
  const ms = m ? m.map(x => x[0] + ':' + x[1]).join(',') : 'UNMATCHED';
  console.log(`MAP ${d} mid=${mid} -> ${ms} | alts=${o.alts.size} src=${[...o.sources].join('+')} | alt0=${alt.slice(0, 150)}`);
}
console.log('CLAIM_CENSUS(across ' + dirCodes.length + ' dirs, sample alt per dir)=' + JSON.stringify(claimCounts));
console.log('DISTINCT_ALTS_TOTAL=' + altTotal);
