/* main 版标题合规扫描: 品牌/污染/数字钩子 + 汇总
   用法: node .hermes/title-compliance-scan.mjs */
import fs from 'node:fs';
const rows = JSON.parse(fs.readFileSync('.hermes/title-audit-main.json', 'utf8'));

const SIMP = '订设验产车关门书证际达边这还们时过说经组级线张纸现业点档样术讯问题单双动发实规则总结统计算阶飞语议读讲记询货质数据学画东乐头马鸟鱼龙电话欢见对脸'.split('');
const KANA = /[\u3040-\u30ff]/;
const CJK = /[\u4e00-\u9fff\u3400-\u4dbf]/;

const issues = { brand: [], pollution: [], noNum: [] };
const perLocale = { 'zh-hk': { brandOk: 0, brandBad: 0, poll: 0, noNum: 0 }, en: { brandOk: 0, brandBad: 0, poll: 0, noNum: 0 }, ja: { brandOk: 0, brandBad: 0, poll: 0, noNum: 0 } };
const bandCount = { 'zh-hk': {}, en: {}, ja: {} };

for (const r of rows) {
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const t = r[loc].effective;
    const n = r[loc].hw;
    const b = n < 50 ? 'FILL' : n <= 54 ? 'OK' : n <= 60 ? 'LEGACY' : 'RED';
    bandCount[loc][b] = (bandCount[loc][b] || 0) + 1;
    const problems = [];
    if (loc === 'zh-hk') {
      // 品牌: 须含智印港(末尾), 禁 ZprintPro
      const brandOk = t.includes('智印港');
      if (!brandOk) { problems.push('缺品牌'); perLocale[loc].brandBad++; } else perLocale[loc].brandOk++;
      if (t.includes('ZprintPro')) { problems.push('混ZprintPro'); perLocale[loc].brandBad++; }
      // 污染: 简体 / 日文
      const simp = SIMP.filter((c) => t.includes(c));
      if (simp.length) { problems.push(`简体:${simp.slice(0, 4).join('')}`); perLocale[loc].poll++; }
      if (KANA.test(t)) { problems.push('日文假名'); perLocale[loc].poll++; }
    } else if (loc === 'en') {
      if (!t.includes('ZprintPro')) { problems.push('缺ZprintPro'); perLocale[loc].brandBad++; } else perLocale[loc].brandOk++;
      if (CJK.test(t)) { problems.push('混中文'); perLocale[loc].poll++; }
      if (t.includes('智印港')) { problems.push('混智印港'); perLocale[loc].poll++; }
    } else { // ja
      if (!t.includes('ZprintPro')) { problems.push('缺ZprintPro'); perLocale[loc].brandBad++; } else perLocale[loc].brandOk++;
      const simp = SIMP.filter((c) => t.includes(c));
      if (simp.length) { problems.push(`简体:${simp.slice(0, 4).join('')}`); perLocale[loc].poll++; }
      if (t.includes('智印港')) { problems.push('混智印港'); perLocale[loc].poll++; }
    }
    // 数字钩子 (数字/MOQ/价格/交期)
    const hasNum = /\d/.test(t) || /HK\$|US\$|¥|起印|枚〜|個〜|MOQ/i.test(t);
    if (!hasNum) { problems.push('无数字钩'); perLocale[loc].noNum++; }
    if (problems.length) {
      const key = `${loc}|${b}`;
      if (!issues[key]) issues[key] = [];
      issues[key].push({ slug: r.slug, frozen: r.frozen, hw: n, title: t, problems });
    }
  }
}
console.log('=== 各语言 band 分布 (main, 120 SKU) ===');
for (const loc of ['zh-hk', 'en', 'ja']) console.log(` ${loc}:`, JSON.stringify(bandCount[loc]));
console.log('\n=== 合规问题汇总 ===');
for (const loc of ['zh-hk', 'en', 'ja']) {
  console.log(`\n-- ${loc} --`);
  console.log(`  品牌: OK ${perLocale[loc].brandOk} / 问题 ${perLocale[loc].brandBad} | 污染: ${perLocale[loc].poll} | 无数字钩: ${perLocale[loc].noNum}`);
}
fs.writeFileSync('.hermes/title-compliance-main.json', JSON.stringify({ rows, perLocale, bandCount }, null, 1), 'utf8');
