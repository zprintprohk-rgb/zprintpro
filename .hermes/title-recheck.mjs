/* 修正后合规扫描: 排除 U+30FB; 输出品牌问题清单 + ja 污染 + 跨语言混写 */
import fs from 'node:fs';
const rows = JSON.parse(fs.readFileSync('.hermes/title-audit-main.json', 'utf8'));
const SIMP = '订设验产车关门书证际达边这还们时过说经组级线张纸现业点档样术讯问题单双动发实规则总结统计算阶飞语议读讲记询货质数据学画东乐头马鸟鱼龙电话欢见对脸'.split('');
const KANA = /[\u3041-\u3096\u30a1-\u30fa]/; // 排除 ・ (U+30FB)
const LATIN = /[A-Za-z]{2,}/;
const CJK = /[\u4e00-\u9fff\u3400-\u4dbf]/;

console.log('=== ja 污染 (真) ===');
let jaPoll = 0;
for (const r of rows) {
  const t = r.ja.effective;
  const simp = SIMP.filter((c) => t.includes(c));
  const zh = t.includes('智印港');
  if (simp.length || zh) { jaPoll++; console.log(`  ${r.slug} [${r.ja.hw}]: 简体=${simp.join(',')} 智印港=${zh} | ${t}`); }
}
console.log(`ja 污染: ${jaPoll}`);

console.log('\n=== zh-hk 品牌问题清单 ===');
let zhBrand = 0;
for (const r of rows) {
  const t = r['zh-hk'].effective;
  const hasZh = t.includes('智印港');
  const hasZp = t.includes('ZprintPro');
  if (!hasZh || hasZp) {
    zhBrand++;
    console.log(`  ${r.slug} [${r['zh-hk'].hw}] frozen=${r.frozen}: 缺智印港=${!hasZh} 混ZprintPro=${hasZp} | ${t}`);
  }
}
console.log(`zh-hk 品牌问题: ${zhBrand}`);

console.log('\n=== zh-hk 混拉丁 (跨语言) ===');
let zhLat = 0;
for (const r of rows) {
  const t = r['zh-hk'].effective;
  const lat = t.match(LATIN);
  if (lat) { zhLat++; if (zhLat <= 15) console.log(`  ${r.slug} [${r['zh-hk'].hw}]: ${lat[0]} | ${t}`); }
}
console.log(`zh-hk 混拉丁: ${zhLat}`);

console.log('\n=== en 品牌问题 ===');
let enBrand = 0;
for (const r of rows) {
  const t = r.en.effective;
  if (!t.includes('ZprintPro')) { enBrand++; if (enBrand <= 15) console.log(`  ${r.slug} [${r.en.hw}]: | ${t}`); }
}
console.log(`en 缺ZprintPro: ${enBrand}`);
