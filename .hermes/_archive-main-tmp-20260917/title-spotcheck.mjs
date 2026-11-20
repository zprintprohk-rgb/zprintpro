/* 抽查 zh-hk 污染/品牌问题实际内容, 排除同形字误报 */
import fs from 'node:fs';
const rows = JSON.parse(fs.readFileSync('.hermes/title-audit-main.json', 'utf8'));
const SIMP = '订设验产车关门书证际达边这还们时过说经组级线张纸现业点档样术讯问题单双动发实规则总结统计算阶飞语议读讲记询货质数据学画东乐头马鸟鱼龙电话欢见对脸'.split('');
const KANA = /[\u3040-\u30ff]/;
let hit = 0;
for (const r of rows) {
  const t = r['zh-hk'].effective;
  const simp = SIMP.filter((c) => t.includes(c));
  const kana = KANA.test(t);
  if (simp.length || kana) {
    hit++;
    console.log(`${r.slug} [${r['zh-hk'].hw}]: 简体=${simp.join(',')} 假名=${kana} | ${t}`);
  }
}
console.log(`\nzh-hk 污染命中: ${hit}`);
console.log('\n=== zh-hk 缺品牌/混品牌抽样 ===');
let b = 0;
for (const r of rows) {
  const t = r['zh-hk'].effective;
  const hasZh = t.includes('智印港');
  const hasZp = t.includes('ZprintPro');
  if (!hasZh || hasZp) {
    b++;
    if (b <= 20) console.log(`${r.slug} [${r['zh-hk'].hw}]: 智印港=${hasZh} ZprintPro=${hasZp} | ${t}`);
  }
}
console.log(`zh-hk 品牌问题: ${b}`);
