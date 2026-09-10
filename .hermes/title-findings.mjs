/* 全量 FILL/RED/LEGACY 明细 + 品牌/污染/数字钩 final 判定 (main 生产版) */
import fs from 'node:fs';
const rows = JSON.parse(fs.readFileSync('.hermes/title-audit-main-v2.json', 'utf8'));
const SIMP_ZH = '订设验产车关门书证际达边这还们时过说经组级线张纸现业点档样术讯问题单双动发实规则总结统计算阶飞语议读讲记询货质数据学画东乐头马鸟鱼龙电话欢见对脸'.split('');
const SIMP_JA = '订设验产车关门书证际达边这还们时过说经组级线张纸现业点档样术讯问题单双动发实规则总结统计算阶飞语议读讲记询货质据东乐头马鸟鱼龙电话欢见对脸'.split(''); // 去 数/学/画/国 (日文标准字)
const KANA = /[\u3041-\u3096\u30a1-\u30fa]/;
const CJK = /[\u4e00-\u9fff\u3400-\u4dbf]/;
const LATIN = /[A-Za-z]{2,}/;

const band = (n) => (n < 50 ? 'FILL' : n <= 54 ? 'OK' : n <= 60 ? 'LEGACY' : 'RED');

function problems(r, loc) {
  const t = r[loc].effective;
  const p = [];
  if (loc === 'zh-hk') {
    if (!t.includes('智印港')) p.push('缺品牌');
    if (t.includes('ZprintPro')) p.push('混ZprintPro');
    const s = SIMP_ZH.filter((c) => t.includes(c));
    if (s.length) p.push(`简体:${s.slice(0, 3).join('')}`);
    if (KANA.test(t)) p.push('日文');
    const lat = t.match(LATIN);
    if (lat) p.push(`混英文:${lat[0]}`);
  } else if (loc === 'en') {
    if (!t.includes('ZprintPro')) p.push('缺品牌');
    if (CJK.test(t)) p.push('混中文');
    if (t.includes('智印港')) p.push('混智印港');
  } else {
    if (!t.includes('ZprintPro')) p.push('缺品牌');
    const s = SIMP_JA.filter((c) => t.includes(c));
    if (s.length) p.push(`简体:${s.slice(0, 3).join('')}`);
    if (t.includes('智印港')) p.push('混智印港');
    if (KANA.test(t) && !/[\u30a1-\u30fa]/.test(t)) p.push('假名');
  }
  if (!/\d/.test(t) && !/HK\$|US\$|¥|起印|枚〜|個〜|MOQ/i.test(t)) p.push('无数字钩');
  return p;
}

const out = { FILL: {}, LEGACY: {}, RED: {}, brandPoll: [] };
for (const r of rows) {
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const b = band(r[loc].hw);
    const p = problems(r, loc);
    if (b === 'OK' && p.length === 0) continue;
    const key = `${loc}|${b}`;
    if (['FILL', 'LEGACY', 'RED'].includes(b)) {
      if (!out[b][loc]) out[b][loc] = [];
      out[b][loc].push({ slug: r.slug, frozen: r.frozen, hw: r[loc].hw, title: r[loc].effective, problems: p });
    } else if (p.length) {
      out.brandPoll.push({ slug: r.slug, loc, frozen: r.frozen, hw: r[loc].hw, title: r[loc].effective, problems: p });
    }
  }
}
fs.writeFileSync('.hermes/title-audit-findings.json', JSON.stringify(out, null, 1), 'utf8');
for (const b of ['FILL', 'LEGACY', 'RED']) {
  console.log(`\n===== ${b} =====`);
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const list = out[b][loc] || [];
    console.log(`-- ${loc} (${list.length}) --`);
    for (const x of list) console.log(`  ${x.hw}${x.frozen ? '[冻]' : ''} ${x.slug}: ${x.title} ${x.problems.length ? '❗' + x.problems.join('/') : ''}`);
  }
}
console.log('\n===== OK 但有品牌/污染问题 =====');
for (const x of out.brandPoll) console.log(`  ${x.loc} ${x.hw} ${x.slug}: ${x.title} ❗${x.problems.join('/')}`);
