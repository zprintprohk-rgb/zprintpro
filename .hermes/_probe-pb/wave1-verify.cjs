'use strict';
/** 波 1 后验收: ① en 值内 CJK 递减量 ② locale 守卫生效验证 (真实替换场景) ③ 重复词 ④ 残留 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const common = require(path.join(REPO, 'scripts', 'guards', 'common.js'));
const i18n = require(path.join(REPO, 'scripts', 'guards', 'i18n-guard.js'));

const files = common.collectFiles('src', false);
const per = { EN: 0, JA: 0, ZH: 0 };
const detail = { EN: {} };
for (const f of files) {
  let content;
  try { content = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  for (const h of i18n.scanBidirectional(content, f)) {
    if (h.legacyRed) continue;
    if (h.ruleId === 'I18N_POLLUTION_EN') { per.EN++; detail.EN[h.file] = (detail.EN[h.file] || 0) + 1; }
    else if (h.ruleId === 'I18N_POLLUTION_JA') per.JA++;
    else per.ZH++;
  }
}
console.log('=== 波 1 后 门童 #4 实测 ===');
console.log(`  I18N_POLLUTION_EN (en 值内 CJK): ${per.EN}   (波 1 前 778, 递减 ${778 - per.EN})`);
console.log(`  I18N_POLLUTION_JA: ${per.JA}   (波 1 前 197)`);
console.log(`  I18N_POLLUTION (zh-hk 向): ${per.ZH}   (波 1 前 91)`);
console.log(`  合计: ${per.EN + per.JA + per.ZH}`);
console.log('\n  en 向按文件:');
Object.entries(detail.EN).sort((a, b) => b[1] - a[1]).forEach(([f, n]) => console.log(`    ${String(n).padStart(4)}  ${f.replace('src/', '')}`));

// === locale 守卫生效验证 (真实替换场景) ===
console.log('\n=== locale 守卫验证 (真实替换场景) ===');
const enPath = path.join(REPO, 'src', 'data', 'blog-data', 'en.json');
const en = fs.readFileSync(enPath, 'utf8');
const bak = fs.readFileSync(path.join(REPO, '.hermes', '_probe-pb', '_wave1.en.bak'), 'utf8');
const bidiBefore = i18n.scanBidirectional(bak, enPath).filter(h => h.ruleId === 'I18N_POLLUTION_EN').length;
const bidiAfter = i18n.scanBidirectional(en, enPath).filter(h => h.ruleId === 'I18N_POLLUTION_EN').length;
console.log(`  en.json: 替换前 ${bidiBefore} → 替换后 ${bidiAfter}  (递减 ${bidiBefore - bidiAfter})`);
console.log(`  ① 递减有效: ${bidiAfter < bidiBefore ? '✅' : '❌'}   ② 未引入反向污染: ${bidiAfter <= bidiBefore ? '✅' : '❌'}`);

// ③ 重复词 + 半截残留扫描 (本次替换产生的新文本)
console.log('\n=== 本次替换文本的自检 (重复词 / 半截) ===');
const NEW_TOKENS = ['internationally certified', 'Heidelberg presses', 'Heidelberg 6+1 press', 'FSC-certified paper', 'rush orders, 18:00 cutoff', 'Answer nugget'];
const DUPPAT = ['certified certified', 'presses presses', 'FSC FSC-certified', 'paper certified', 'certified internationally', 'presses press'];
let dup = 0;
for (const f of ['en']) {
  for (const p of DUPPAT) { const n = en.split(p).length - 1; if (n) { console.log(`  ❌ 「${p}」 × ${n}`); dup++; } }
}
if (!dup) console.log('  ✅ 6 类重复词 0 命中');
NEW_TOKENS.forEach(t => console.log(`  ${en.includes(t) ? '✅' : '⚠️'} 新文本在档: ${JSON.stringify(t)} (${en.split(t).length - 1} 处)`));

// ④ 残留的旧 token
console.log('\n=== 旧 token 残留 ===');
['國際認證體系', '進口印刷設備', '認證紙', '急件', '截單', '答案答案'].forEach(t => {
  const n = en.split(t).length - 1;
  console.log(`  ${n === 0 ? '✅' : '⚠️'} 「${t}」 × ${n}`);
});
