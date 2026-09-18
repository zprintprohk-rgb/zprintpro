/** P0-2 接入门童 #20 (幂等) */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const p = path.join(ROOT, 'scripts/check-regression-guard.js');
let r = fs.readFileSync(p, 'utf8');
if (r.includes('metaDescription:')) { console.log('已注册, 跳过'); }
else {
  const a = "  priceBand: require(path.join(GUARDS_DIR, 'price-band-guard.js')),";
  const b = a + "\n  metaDescription: require(path.join(GUARDS_DIR, 'meta-description-guard.js')),";
  if (!r.includes(a)) { console.error('❌ 锚点 A 未找到'); process.exit(1); }
  r = r.replace(a, b);
  const la = /(  priceBand: '[^']*',)/;
  if (!la.test(r)) { console.error('❌ 锚点 B 未找到'); process.exit(1); }
  r = r.replace(la, "$1\n  metaDescription: '门童 #20 meta description 完整性 (K3 2026-09-18 决策 3-B 专用基线通道: 语言错配/首词前缀重复/空 meta; 存量 120 条只许递减)',");
  fs.writeFileSync(p, r, 'utf8');
  console.log('✅ 已注册');
}
const now = fs.readFileSync(p, 'utf8');
console.log('校验 require=' + now.includes('metaDescription: require') + ' label=' + now.includes('门童 #20'));
