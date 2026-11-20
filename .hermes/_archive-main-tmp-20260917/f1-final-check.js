/* F1 终验: ① 可见字数≥300 ② 跨SKU可见30字重复 ③ 简体专属字 ④ 名片禁区词 ⑤ 深圳/信任信号织入统计 */
const fs = require('fs');
const OUT = '.hermes/f1-outputs';
const files = fs.readdirSync(OUT).filter((f) => f.endsWith('.json'));
const cjk = (s) => (s || '').replace(/\*\*[^*]+\*\*/g, '').replace(/\s+/g, '').length;
const visible = (b) => b.split('\n\n').map((p) => p.trim()).filter(Boolean).filter((p) => !p.startsWith('交稿規範：')).join('');

const bodies = {};
for (const f of files) { const o = JSON.parse(fs.readFileSync(`${OUT}/${f}`, 'utf8')); bodies[o.slug] = o.body || ''; }

// ① 可见字数
console.log('=== ① 可见字数 (去掉交稿規範：段) ===');
const short = [];
for (const [s, b] of Object.entries(bodies)) { const v = cjk(visible(b)); if (v < 300) short.push(`${s}=${v}`); }
console.log(short.length ? `FAIL: ${short.join(', ')}` : `63/63 ≥300 ✓ (最低 ${Math.min(...Object.values(bodies).map((b) => cjk(visible(b))))})`);

// ② 跨SKU 可见 30 字重复 (全量)
console.log('\n=== ② 跨SKU 可见 30字重复 ===');
const V = {}; for (const [s, b] of Object.entries(bodies)) V[s] = visible(b).replace(/\s+/g, '');
const slugs = Object.keys(V);
let dupN = 0; const seen = new Set();
for (let a = 0; a < slugs.length; a++) for (let b = a + 1; b < slugs.length; b++) {
  const A = V[slugs[a]], B = V[slugs[b]];
  if (!A || !B || A.length < 30 || B.length < 30) continue;
  for (let k = 0; k + 30 <= A.length; k += 15) {
    const frag = A.slice(k, k + 30);
    if (B.includes(frag) && !seen.has(frag)) { seen.add(frag); dupN++; if (dupN <= 5) console.log(`  ${slugs[a]} <-> ${slugs[b]}: ${frag}`); }
  }
}
console.log(dupN ? `可见30字重复: ${dupN} 条` : '0 条 ✓');

// ③ 简体专属字 (严格清单)
const SIMP = '订设验产车关门书证际达边这还们时过说经组级线张纸现业点档样术讯问题单双动发实规则总结统计算阶飞语议读讲记询货质数据学画东乐头马鸟鱼龙电话欢迎见对脸'.split('');
console.log('\n=== ③ 简体专属字 ===');
let simpN = 0;
for (const [s, b] of Object.entries(bodies)) {
  const h = [...new Set(SIMP.filter((c) => b.includes(c)))];
  if (h.length) { simpN++; console.log(`  ${s}: ${h.join(',')}`); }
}
console.log(simpN ? `命中 ${simpN}` : '0 命中 ✓');

// ④ 名片禁区 (§0.0)
const BAN = /名片|咭片|business[- ]?card|名刺|name card/i;
console.log('\n=== ④ 名片禁区 ===');
const banHit = Object.entries(bodies).filter(([, b]) => BAN.test(b));
console.log(banHit.length ? banHit.map(([s]) => s).join(',') : '0 命中 ✓');

// ⑤ 深圳 / 信任信号织入
console.log('\n=== ⑤ 深圳织入 ===');
const sz = Object.entries(bodies).filter(([, b]) => b.includes('深圳'));
console.log(`含「深圳」: ${sz.length} 个 SKU (${sz.slice(0, 8).map(([s]) => s).join(', ')})`);
