// .hermes/_b1c6b_similarity.cjs — 簇6b 相似度双方法 (word-Jaccard + 8-gram) 对账
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..');
const ts = JSON.parse(require('fs').readFileSync(path.join(REPO, '.hermes', '_b1c6b_ts_snapshot.json'), 'utf8'));
const SLUGS = ['display-posters', 'art-posters', 'adhesive-posters'];
const LOCALES = ['zh-hk', 'en', 'ja'];

function words(s) { return (s || '').toLowerCase().replace(/<[^>]+>/g, ' ').replace(/[，。、｜｜\|\-\s\n\r]+/g, ' ').trim().split(/\s+/).filter(Boolean); }
function jaccardWord(a, b) { const A = new Set(words(a)), B = new Set(words(b)); const inter = [...A].filter(x => B.has(x)).length; const uni = new Set([...A, ...B]).size; return uni ? inter / uni : 0; }
function grams8(s) { const t = (s || '').replace(/\s+/g, ''); const g = new Set(); for (let i = 0; i + 8 <= t.length; i++) g.add(t.slice(i, i + 8)); return g; }
function jaccard8(a, b) { const A = grams8(a), B = grams8(b); const inter = [...A].filter(x => B.has(x)).length; const uni = new Set([...A, ...B]).size; return uni ? inter / uni : 0; }

const fields = ['description', 'h1', 'body'];
const out = { generated_at: new Date().toISOString(), method: 'word-Jaccard + 8-gram Jaccard (双方法)', gate: '红线 <0.60, 目标 <=0.55', pairs: [] };
let worst = { score: 0 };
for (const loc of LOCALES) {
  for (const f of fields) {
    for (let i = 0; i < SLUGS.length; i++) for (let j = i + 1; j < SLUGS.length; j++) {
      const a = (ts[SLUGS[i]].seo[loc] || {})[f] || '';
      const b = (ts[SLUGS[j]].seo[loc] || {})[f] || '';
      const w = jaccardWord(a, b), g = jaccard8(a, b);
      const rec = { locale: loc, field: f, pair: `${SLUGS[i]}<->${SLUGS[j]}`, wordJaccard: +w.toFixed(3), gram8: +g.toFixed(3), pass: w < 0.60 && g < 0.60 };
      out.pairs.push(rec);
      const m = Math.max(w, g);
      if (m > worst.score) worst = { score: m, rec };
    }
  }
}
out.worst = worst;
fs.writeFileSync(path.join(REPO, '.hermes', 'analysis', 'b1c6b-similarity-2026-10-16.json'), JSON.stringify(out, null, 1));
console.log('pairs:', out.pairs.length, 'worst:', JSON.stringify(worst));
const fails = out.pairs.filter(p => !p.pass);
console.log(fails.length ? 'FAILS:\n' + JSON.stringify(fails, null, 1) : 'ALL PASS (word & 8-gram < 0.60)');
