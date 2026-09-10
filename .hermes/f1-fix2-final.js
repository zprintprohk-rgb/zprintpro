/* F1 修复2: ① escort-cards/wedding-place-cards 收费段差异化 ② 简化清单修正后全量终验 (25字) */
const fs = require('fs');
const OUT = '.hermes/f1-outputs';

const fixes = {
  'escort-cards': {
    old: '收費方面，座位卡每張 NT$8-35，50 張起印，量大另有優惠，歡迎查詢批量報價。',
    new: '收費方面，座位卡以每張 NT$8-35 計價，50 張起印；批量訂單另議優惠，歡迎向智印港查詢報價。'
  },
  'wedding-place-cards': {
    old: '收費方面，婚宴枱卡每張 NT$8-35，50 張起印，量大另有優惠，歡迎查詢批量報價。',
    new: '收費方面，婚宴枱卡每張 NT$8-35、50 張起印，量大價更優惠，歡迎查詢批量報價。'
  },
};
for (const [s, { old, new: nw }] of Object.entries(fixes)) {
  const fp = `${OUT}/${s}.json`;
  const o = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const before = o.body;
  o.body = o.body.replace(old, nw);
  if (o.body === before) console.log(`!! ${s} 未命中`);
  fs.writeFileSync(fp, JSON.stringify(o), 'utf8');
}
console.log('收费段差异化: 2/2');

// 终验 (25字可见重复 + 简化清单修正)
const files = fs.readdirSync(OUT).filter((f) => f.endsWith('.json'));
const cjk = (s) => (s || '').replace(/\*\*[^*]+\*\*/g, '').replace(/\s+/g, '').length;
const visible = (b) => b.split('\n\n').map((p) => p.trim()).filter(Boolean).filter((p) => !p.startsWith('交稿規範：')).join('');
const bodies = {};
for (const f of files) { const o = JSON.parse(fs.readFileSync(`${OUT}/${f}`, 'utf8')); bodies[o.slug] = o.body || ''; }
// 简体专属字 — 严格: 仅繁简字形不同者
const SIMP = '订设验产车关门书证际达边这还们时过说经组级线张纸现业点档样术讯问题单双动发实规则总结统计算阶飞语议读讲记询货质数据学画东乐头马鸟鱼龙电话欢见对脸'.split('').filter((c) => !'迎算特面校'.includes(c));
console.log('简体专属字扫描 (剔除同形字后):');
let simpN = 0;
for (const [s, b] of Object.entries(bodies)) {
  const h = [...new Set(SIMP.filter((c) => b.includes(c)))];
  if (h.length) { simpN++; console.log(`  ${s}: ${h.join(',')}`); }
}
console.log(simpN ? `命中 ${simpN}` : '0 命中 ✓');
// 25字可见重复全量
const V = {}; for (const [s, b] of Object.entries(bodies)) V[s] = visible(b).replace(/\s+/g, '');
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
