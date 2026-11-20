'use strict';
/** Step B 判据: 三语变体 × 门童 #16 正则 —— 逐条测「哪里漏、为什么漏」
 *  教训前置: 上一轮我用**简体**串做注入, 与真实文件的**繁体/日文变体**不同层 ⇒ 判据必须逐真实变体自证。
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const guard = require(path.join(REPO, 'scripts', 'guards', 'gsc-leak-guard.js'));
const F = path.join(REPO, 'src', 'data', 'buying-guides.ts');
const lines = fs.readFileSync(F, 'utf8').split('\n');

const VARIANTS = {
  'zh-hk (L929)': lines[928],
  'en (L930)': lines[929],
  'ja (L931)': lines[930],
};

console.log('=== 一、逐条正则 × 三语真实行 ===\n');
for (const [name, line] of Object.entries(VARIANTS)) {
  console.log(`--- ${name} ---`);
  let total = 0;
  guard.GSC_LEAK_PATTERNS.forEach((re, i) => {
    re.lastIndex = 0;
    const m = re.exec(line);
    if (m) { total++; console.log(`   ✅ [${i}] ${re.source.slice(0, 44)} => ${JSON.stringify(m[0])}`); }
  });
  console.log(`   ⇒ 该行命中正则数: ${total}\n`);
}

console.log('=== 二、关键探针: 各变体的"后台黑话关键词"是否被任何正则覆盖 ===\n');
const PROBES = {
  'GSC 數據 (繁)': 'GSC 數據',
  'GSC 数据 (简)': 'GSC 数据',
  'GSC データ (日)': 'GSC データ',
  'gsc-fresh 檔名': 'gsc-fresh-2026-09-03.json',
  'imps 數據 (繁, 无数字)': 'imps 數據',
  'imps 数据 (简, 无数字)': 'imps 数据',
  'imps データ (日, 无数字)': 'imps データ',
  'pos 數據 (繁, 无数字)': 'pos 數據',
  'pos 数据 (简, 无数字)': 'pos 数据',
  'pos データ (日)': 'pos データ',
  '數據誠信紅線 (繁)': '數據誠信紅線',
  '数据诚信红线 (简)': '数据诚信红线',
  'データ诚信基準 (日)': 'データ诚信基準',
  '校準 2026-09-17 (繁)': '校準 2026-09-17',
  '校准 2026-09-17 (简)': '校准 2026-09-17',
  '校正 2026-09-17 (日)': '校正 2026-09-17',
  '拍板日': '拍板日',
  '§0.23': '§0.23',
};
for (const [label, s] of Object.entries(PROBES)) {
  const hit = [];
  guard.GSC_LEAK_PATTERNS.forEach((re, i) => { re.lastIndex = 0; if (re.test(s)) hit.push(i); });
  console.log(`  ${hit.length ? '✅' : '❌'} ${label.padEnd(26)} 命中正则 [${hit.join(',')}]`);
}

console.log('\n=== 三、真实档 scan() 总命中 ===');
(async () => {
  const hits = await guard.scan([F]);
  console.log(`  scan([buying-guides.ts]) = ${hits.length} 命中`);
  hits.slice(0, 8).forEach(h => console.log(`    ${h.file}:${h.line} 「${h.match}」`));
})();
