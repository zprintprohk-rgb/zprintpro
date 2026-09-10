/* 定位可见段重复的具体片段 */
const fs = require('fs');
const OUT = '.hermes/f1-outputs';
const files = fs.readdirSync(OUT).filter((f) => f.endsWith('.json'));
const bodies = {};
for (const f of files) {
  const o = JSON.parse(fs.readFileSync(`${OUT}/${f}`, 'utf8'));
  bodies[o.slug] = o.body || '';
}
const vis = (b) => b.split('\n\n').filter((p) => p.trim() && !p.trim().startsWith('交稿規範')).join('').replace(/\s+/g, '');
const groups = {
  redpackets: ['foil-red-packets','embossed-red-packets','custom-red-packets','cartoon-red-packets','eco-red-packets','large-red-packets'],
  books: ['catalog-printing','hardcover-books','spiral-notebooks','saddle-stitch-booklets','perfect-bound-books'],
};
for (const [gname, gslugs] of Object.entries(groups)) {
  console.log(`\n=== ${gname} 组 ===`);
  const V = {};
  for (const s of gslugs) V[s] = vis(bodies[s]);
  const found = new Set();
  for (let a = 0; a < gslugs.length; a++) for (let b = a + 1; b < gslugs.length; b++) {
    const A = V[gslugs[a]], B = V[gslugs[b]];
    for (let k = 0; k + 40 <= A.length; k += 15) {
      const frag = A.slice(k, k + 40);
      if (B.includes(frag) && !found.has(frag)) { found.add(frag); console.log(`  重复片段 [${gslugs[a]}~${gslugs[b]}]: ${frag}`); }
    }
  }
  if (!found.size) console.log('  无 40 字重复');
  // 降低阈值看 25 字
  const f25 = new Set();
  for (let a = 0; a < gslugs.length; a++) for (let b = a + 1; b < gslugs.length; b++) {
    const A = V[gslugs[a]], B = V[gslugs[b]];
    for (let k = 0; k + 25 <= A.length; k += 12) {
      const frag = A.slice(k, k + 25);
      if (B.includes(frag)) f25.add(frag);
    }
  }
  if (f25.size) { console.log(`  (25字级 ${f25.size} 条, 前3条: ${[...f25].slice(0,3).join(' | ')})`); }
}
