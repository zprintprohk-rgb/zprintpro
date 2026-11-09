// 11-14 retest runner: same-caliber comparison for catalog A/B/C + risk-query fixes + poster/wedding split
// Usage: node .hermes/_retest_1114.cjs --qc=GSC数据/gsc-query-country-28d-end1108.csv [--qp=GSC数据/money-kw-query-page-country-2026-11-XX.csv]
// Graceful: if CSVs absent -> NO_NEW_DATA verdict (never fabricate).
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
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const i = a.indexOf('='); return [a.slice(2, i), a.slice(i + 1)]; }));
const qcPath = args.qc || null;
const qpPath = args.qp || null;
const out = { generated_at: new Date().toISOString(), qc: qcPath, qp: qpPath, items: [] };

function agg(csvPath, queries) {
  if (!fs.existsSync(csvPath)) return null;
  const rows = parseCSV(fs.readFileSync(csvPath, 'utf8')).slice(1).filter((r) => r.length >= 6);
  const res = {};
  for (const q of queries) {
    const per = {};
    for (const r of rows) {
      if (r[0] !== q) continue;
      const [query, ctry, clk, imp, , pos] = r;
      const a = per[ctry] || (per[ctry] = { clk: 0, imp: 0, wpos: 0, n: 0 });
      a.clk += Number(clk) || 0; a.imp += Number(imp) || 0; a.wpos += (Number(pos) || 0) * (Number(imp) || 0); a.n += 1;
    }
    res[q] = Object.fromEntries(Object.entries(per).map(([c, a]) => [c, { imp: a.imp, clk: a.clk, pos_w: a.imp ? +(a.wpos / a.imp).toFixed(2) : null }]));
  }
  return res;
}

const QC_QUERIES = ['china catalog printing', 'catalog printing china', '教材 印刷製本', '貼紙印刷', '宣傳單張', '書刊印刷', '喜帖印刷', '海報印刷', 'a2 poster', 'nengajo 2027'];
const qc = qcPath ? agg(qcPath, QC_QUERIES) : null;

const BASELINES = {
  'china catalog printing': { imp: 98, pos: 14.15, clk: 0, note: '28d to 11-07; A/B/C deployed 11-09 (H1 en + zh/ja desc), attribution by en grain' },
  '教材 印刷製本': { note: 'jpn blog pos 11.97 (31 imp) query×page grain; price fix 74ffa5a9 deployed 11-08', primary: 'jpn' },
  '喜帖印刷': { note: '9acc3d16 split: thank-you-cards PDP was 73% owner; recheck primary URL attribution' },
  '海報印刷': { note: '9acc3d16 split: primary = category/posters; blog 37% -> watch share shift' },
  'nengajo 2027': { note: 'break-zero 11-04: 6-7 imp/0 clk across ind/ita/jpn/phl/usa; watch growth in season window' },
};

// query×page attribution for poster/wedding/catalog primary-share if qp CSV provided
function pageShare(csvPath, query, urlPattern) {
  if (!fs.existsSync(csvPath)) return null;
  const rows = parseCSV(fs.readFileSync(csvPath, 'utf8')).slice(1).filter((r) => r.length >= 7 && r[0] === query);
  const byUrl = {};
  let total = 0;
  for (const r of rows) {
    const imp = Number(r[4]) || 0;
    total += imp;
    byUrl[r[1].replace('https://zprintpro.com', '')] = (byUrl[r[1].replace('https://zprintpro.com', '')] || 0) + imp;
  }
  const match = Object.entries(byUrl).filter(([u]) => u.includes(urlPattern)).reduce((s, [, v]) => s + v, 0);
  return { total_imp: total, matched_imp: match, share: total ? +((match / total) * 100).toFixed(1) : null, byUrl: Object.fromEntries(Object.entries(byUrl).sort((a, b) => b[1] - a[1]).slice(0, 6)) };
}

if (qc) {
  for (const q of QC_QUERIES) {
    out.items.push({ query: q, baseline: BASELINES[q] || {}, current: qc[q] || 'NO_ROWS' });
  }
} else {
  out.verdict = 'NO_NEW_DATA';
}

if (qpPath) {
  out.page_attribution = {
    'china catalog printing /en/product/catalog-printing': pageShare(qpPath, 'china catalog printing', '/en/product/catalog-printing'),
    '海報印刷 /zh-hk/category/posters': pageShare(qpPath, '海報印刷', '/zh-hk/category/posters'),
    '喜帖印刷 /zh-hk/product/wedding-thank-you-cards': pageShare(qpPath, '喜帖印刷', 'wedding'),
  };
}

out.decision_rules = {
  SCALE: 'requires repeatable improvement across windows + six-piece evidence; single-window or manual run never scales',
  FIX_DEPLOYED: 'A/B/C catalog (11-09) + risk-query fixes (74ffa5a9) + split (9acc3d16): compare per-grain baselines; pos/imp shifts without confounders -> HOLD/MEASURE continuation',
  CONFOUNDERS: 'multi-variable deployed set by 11-09: catalog H1(A) + zh/ja desc(B/C) same cluster; risk-query price/MOQ fixes; poster/wedding primary-URL split + 9acc3d16 internal links; calendars copy fix c0552853 (11-03); attribute per query grain, not site-wide',
  SERP: 'if real SERP still unavailable (network), record SERP_UNAVAILABLE; do not substitute casual snapshots',
};
fs.writeFileSync('.hermes/logs/gsc-2026-11-14-retest-run.json', JSON.stringify(out, null, 2), 'utf8');
console.log(JSON.stringify({ verdict: out.verdict || 'COMPUTED', items: out.items.length, hasPageAttribution: !!out.page_attribution }, null, 1));
