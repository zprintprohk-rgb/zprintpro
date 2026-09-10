/* F1 精查: ① 真简体专属字 ② 跨SKU重复片段是否在交稿規範段(非可见) */
const fs = require('fs');
// 只含「简体专属、繁体必不同」的字
const SIMPLIFIED_ONLY = '订设验产车关门书证际达边这还们时过说经组级线张纸现业点档样术讯问题单双动发实规则总结统计算阶飞语议读讲记询货质数据学画东乐头马鸟鱼龙电话欢迎见对脸样点规总结询货质数'.split('');
const OUT = '.hermes/f1-outputs';
const files = fs.readdirSync(OUT).filter((f) => f.endsWith('.json'));
const bodies = {};
for (const f of files) {
  const o = JSON.parse(fs.readFileSync(`${OUT}/${f}`, 'utf8'));
  bodies[o.slug] = o.body || '';
}
// ① 真简体残留
console.log('=== ① 真简体专属字残留 ===');
let hits = 0;
for (const [slug, b] of Object.entries(bodies)) {
  const h = [...new Set(SIMPLIFIED_ONLY.filter((c) => b.includes(c)))];
  if (h.length) { hits++; console.log(`  ${slug}: ${h.join(',')}`); }
}
console.log(hits ? `命中 ${hits} 个` : '0 命中 ✓');
// ② 跨SKU 40字重复: 分可见/交稿規範段
console.log('\n=== ② 跨SKU 40字片段重复 (分段判定) ===');
const vis = (b) => b.split('\n\n').filter((p) => p.trim() && !p.trim().startsWith('交稿規範')).join('');
const spec = (b) => b.split('\n\n').filter((p) => p.trim().startsWith('交稿規範')).join('');
const slugs = Object.keys(bodies);
const visB = {}, specB = {};
for (const s of slugs) { visB[s] = vis(bodies[s]).replace(/\s+/g, ''); specB[s] = spec(bodies[s]).replace(/\s+/g, ''); }
let visDup = 0, specDup = 0;
function scan(map, label) {
  let n = 0;
  for (let a = 0; a < slugs.length; a++) for (let b = a + 1; b < slugs.length; b++) {
    const A = map[slugs[a]], B = map[slugs[b]];
    if (!A || !B || A.length < 40 || B.length < 40) continue;
    for (let k = 0; k + 40 <= A.length; k += 15) {
      if (B.includes(A.slice(k, k + 40))) { n++; console.log(`  [${label}] ${slugs[a]} <-> ${slugs[b]}`); break; }
    }
  }
  return n;
}
visDup = scan(visB, '可见场景段');
specDup = scan(specB, '交稿規範段');
console.log(`可见段重复: ${visDup} | 交稿規範段重复: ${specDup}`);
