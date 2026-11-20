'use strict';
/** 波 2 验收: ja 侧独立记账 (I18N_POLLUTION_JA) + en 侧不得回退 + locale 守卫 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const common = require(path.join(REPO, 'scripts', 'guards', 'common.js'));
const i18n = require(path.join(REPO, 'scripts', 'guards', 'i18n-guard.js'));

const files = common.collectFiles('src', false);
const per = { EN: 0, JA: 0, ZH: 0 };
const filesJA = {};
for (const f of files) {
  let content;
  try { content = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  for (const h of i18n.scanBidirectional(content, f)) {
    if (h.legacyRed) continue;
    if (h.ruleId === 'I18N_POLLUTION_EN') per.EN++;
    else if (h.ruleId === 'I18N_POLLUTION_JA') { per.JA++; filesJA[h.file] = (filesJA[h.file] || 0) + 1; }
    else per.ZH++;
  }
}
console.log('=== 波 2 验收 (独立记账) ===');
console.log(`  I18N_POLLUTION_JA: ${per.JA}   (波 2 前 196, 递减 ${196 - per.JA})`);
console.log(`  I18N_POLLUTION_EN: ${per.EN}   (波 1 后 68, 应不变 => ${per.EN === 68 ? '✅' : '❌ 回退了 ' + (per.EN - 68)})`);
console.log(`  I18N_POLLUTION (zh-hk 向): ${per.ZH}   (波 1 后 91)`);
console.log(`  合计: ${per.EN + per.JA + per.ZH}`);
console.log('\n  JA 向按文件:');
Object.entries(filesJA).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([f, n]) => console.log(`    ${String(n).padStart(4)}  ${f.replace('src/', '')}`));

// ja.json 专项
const jaPath = path.join(REPO, 'src', 'data', 'blog-data', 'ja.json');
const ja = fs.readFileSync(jaPath, 'utf8');
const bak = fs.readFileSync(path.join(REPO, '.hermes', '_probe-pb', '_wave2.ja.json.bak'), 'utf8');
const before = i18n.scanBidirectional(bak, jaPath).filter(h => h.ruleId === 'I18N_POLLUTION_JA').length;
const after = i18n.scanBidirectional(ja, jaPath).filter(h => h.ruleId === 'I18N_POLLUTION_JA').length;
console.log(`\n  ja.json: 替换前 ${before} → 替换后 ${after}  (递减 ${before - after})`);
console.log(`  ① 递减有效: ${after < before ? '✅' : '❌'}   ② 未引入反向污染: ${after <= before ? '✅' : '❌'}`);

console.log('\n=== 旧 token 残留 (ja.json) ===');
['國際認證體系', '進口印刷設備', '認證紙', '急件', '截單', '骑马钉'].forEach(t => {
  const n = ja.split(t).length - 1;
  console.log(`  ${n === 0 ? '✅' : '⚠️'} 「${t}」 × ${n}`);
});
console.log('\n=== 新译法在档 (阳性对照) ===');
['国際認証', 'ハイデルベルク印刷機', '認証紙', '特急', '締切', '中綴じ'].forEach(t => {
  const n = ja.split(t).length - 1;
  console.log(`  ${n > 0 ? '✅' : '⚠️'} 「${t}」 × ${n}`);
});
