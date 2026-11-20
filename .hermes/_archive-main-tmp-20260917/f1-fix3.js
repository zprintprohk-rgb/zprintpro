/* F1 修复3: 交期句逐SKU差异化 (educational 2 + calendars 4) */
const fs = require('fs');
const OUT = '.hermes/f1-outputs';
const fixes = {
  'exercise-books': {
    old: '下單後 5–10 個工作天交貨，港九新界免費速遞。',
    new: '標準交期約 5–10 個工作天，交貨後港九新界免運費送上門。'
  },
  'textbooks': {
    old: '下單後 5–10 個工作天交貨，港九新界免費速遞。',
    new: '正常生產 5–10 個工作天，並安排港九新界免費速遞交付。'
  },
  'magnetic-calendars': {
    old: '下單後7-10 個工作天交貨，港九新界免費速遞。',
    new: '標準訂單 7–10 個工作天完成，港九新界免費速遞送達。'
  },
  'mini-calendars': {
    old: '下單後7-10 個工作天交貨，港九新界免費速遞。',
    new: '約 7–10 個工作天交貨，並提供港九新界免費速遞服務。'
  },
  'photo-frame-calendars': {
    old: '下單後7-10 個工作天交貨，港九新界免費速遞。',
    new: '生產連送貨約 7–10 個工作天，港九新界免運費速遞。'
  },
  'wall-calendars': {
    old: '下單後7-10 個工作天交貨，港九新界免費速遞。',
    new: '下單後約 7–10 個工作天交付，港九新界一律免費速遞。'
  },
};
for (const [s, { old, new: nw }] of Object.entries(fixes)) {
  const fp = `${OUT}/${s}.json`;
  const o = JSON.parse(fs.readFileSync(fp, 'utf8'));
  if (!o.body.includes(old)) { console.log(`!! ${s} 未命中: ${old}`); continue; }
  o.body = o.body.replace(old, nw);
  fs.writeFileSync(fp, JSON.stringify(o), 'utf8');
  console.log(`${s} ✓`);
}
// 复核: 25字可见重复
const files = fs.readdirSync(OUT).filter((f) => f.endsWith('.json'));
const visible = (b) => b.split('\n\n').map((p) => p.trim()).filter(Boolean).filter((p) => !p.startsWith('交稿規範：')).join('').replace(/\s+/g, '');
const cjk = (s) => (s || '').replace(/\*\*[^*]+\*\*/g, '').replace(/\s+/g, '').length;
const bodies = {};
for (const f of files) { const o = JSON.parse(fs.readFileSync(`${OUT}/${f}`, 'utf8')); bodies[o.slug] = o.body || ''; }
const V = {}; for (const [s, b] of Object.entries(bodies)) V[s] = visible(b);
const slugs = Object.keys(V);
let dupN = 0; const seen = new Set();
for (let a = 0; a < slugs.length; a++) for (let b = a + 1; b < slugs.length; b++) {
  const A = V[slugs[a]], B = V[slugs[b]];
  if (!A || !B || A.length < 25 || B.length < 25) continue;
  for (let k = 0; k + 25 <= A.length; k += 15) {
    const frag = A.slice(k, k + 25);
    if (B.includes(frag) && !seen.has(frag)) { seen.add(frag); dupN++; if (dupN <= 5) console.log(`  [25字] ${slugs[a]} <-> ${slugs[b]}: ${frag}`); }
  }
}
console.log(dupN ? `可见25字重复: ${dupN} 条` : '可见25字重复: 0 条 ✓');
const short = [];
for (const [s, b] of Object.entries(bodies)) { const v = cjk(visible(b)); if (v < 300) short.push(`${s}=${v}`); }
console.log(short.length ? `可见<300 FAIL: ${short.join(', ')}` : '63/63 可见≥300 ✓');
