import fs from 'fs';
const p = 'F:/zprintpro-nextjs/.hermes/_probe-pb/selfpub-loc-check.mjs';
const lines = fs.readFileSync(p, 'utf8').split('\n');
const i1 = lines.findIndex((l) => l.includes('const SIMP_EXT ='));
const i2 = lines.findIndex((l) => l.includes('const SIMP_EXT2 ='));
const clean = [
  '/* SSoT: identical SIMP list to .hermes/title-compliance-scan.mjs (simplified-only chars) */',
  "const SIMP_EXT = /[订设验产车关门书证际达边这还们时过说经组级线张纸现业点档样术讯问题单双动发实规则总结统计算阶飞语议读讲记询货质数据学画东乐头马鸟鱼龙电话欢见对脸]/g;",
];
lines.splice(i1, (i2 >= 0 ? i2 + 1 : i1 + 1) - i1, ...clean);
fs.writeFileSync(p, lines.join('\n'), 'utf8');
console.log('patched. SIMP_EXT now at line', i1 + 1, '->', lines[i1 + 1].slice(0, 90));
