// .hermes/_b1c7_similarity.cjs — 簇7 相似度双方法 (word-Jaccard + 8-gram)
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(REPO, 'src/data/sku-seo-data.ts'), 'utf8');
const SLUGS = ['wall-calendars', 'desk-calendars', 'custom-calendars', 'mini-calendars', 'photo-frame-calendars', 'magnetic-calendars'];
function grab(block, field) { const m = block.match(new RegExp('"' + field + '": "((?:[^"\\\\]|\\\\.)*)"')); return m ? m[1].replace(/\\n/g, '\n') : ''; }
const data = {};
for (const slug of SLUGS) {
  const i = src.indexOf(`"${slug}": {`);
  const seg = src.slice(i, src.indexOf('\n  },', i));
  data[slug] = {};
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const li = seg.indexOf(`"${loc}": {`);
    const lseg = seg.slice(li, seg.indexOf('\n      },', li));
    data[slug][loc] = { description: grab(lseg, 'description'), h1: grab(lseg, 'h1') };
  }
}
function words(x) { return (x || '').toLowerCase().replace(/[，。、｜|.\-\s\n\r]+/g, ' ').trim().split(/\s+/).filter(Boolean); }
function jw(a, b) { const A = new Set(words(a)), B = new Set(words(b)); const i = [...A].filter(x => B.has(x)).length; const u = new Set([...A, ...B]).size; return u ? i / u : 0; }
function g8(a, b) { const t1 = (a || '').replace(/\s+/g, ''), t2 = (b || '').replace(/\s+/g, ''); const A = new Set(), B = new Set(); for (let k = 0; k + 8 <= t1.length; k++) A.add(t1.slice(k, k + 8)); for (let k = 0; k + 8 <= t2.length; k++) B.add(t2.slice(k, k + 8)); const i = [...A].filter(x => B.has(x)).length; const u = new Set([...A, ...B]).size; return u ? i / u : 0; }
const out = { generated_at: new Date().toISOString(), gate: '红线 <0.60 目标 <=0.55', pairs: [], worst: null };
let worst = { s: 0 };
for (const loc of ['zh-hk', 'en', 'ja']) for (const f of ['description', 'h1']) {
  for (let i = 0; i < SLUGS.length; i++) for (let j = i + 1; j < SLUGS.length; j++) {
    const a = data[SLUGS[i]][loc][f], b = data[SLUGS[j]][loc][f];
    const w = jw(a, b), g = g8(a, b);
    const rec = { locale: loc, field: f, pair: `${SLUGS[i]}<->${SLUGS[j]}`, wordJaccard: +w.toFixed(3), gram8: +g.toFixed(3), pass: w < 0.6 && g < 0.6 };
    out.pairs.push(rec);
    const m = Math.max(w, g);
    if (m > worst.s) worst = { s: m, rec };
  }
}
out.worst = worst.rec;
fs.mkdirSync(path.join(REPO, '.hermes/analysis'), { recursive: true });
fs.writeFileSync(path.join(REPO, '.hermes/analysis/b1c7-similarity-2026-10-16.json'), JSON.stringify(out, null, 1));
const fails = out.pairs.filter(p => !p.pass);
console.log('pairs:', out.pairs.length, 'worst:', JSON.stringify(worst.rec));
console.log(fails.length ? 'FAILS:\n' + JSON.stringify(fails.slice(0, 6), null, 1) : 'ALL PASS');
