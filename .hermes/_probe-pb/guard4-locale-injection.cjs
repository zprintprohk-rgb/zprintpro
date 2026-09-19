'use strict';
/**
 * 技术债 6 验证 v2: 只统计**注入键**的命中 (v1 教训: 全档扫描把 704 条基线存量掺进对照 ⇒ 对照失效)
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const i18n = require(path.join(REPO, 'scripts', 'guards', 'i18n-guard.js'));
const TARGET = path.join(REPO, 'src', 'data', 'blog-data', 'en.json');

const CASES = [
  ['阳性: en 值注入中文工具名词', '<p>German 進口印刷設備 presses</p>', '>0'],
  ['阳性: en 值注入简体术语', '<p>ISO 认证体系 certified</p>', '>0'],
  ['阴性: 纯英文工具名词', '<p>German imported presses</p>', '=0'],
  ['阴性: 英文值含 ISO/FSC 术语', '<p>ISO 9001 + FSC certified paper</p>', '=0'],
];

function hitsForKey(key) {
  const content = fs.readFileSync(TARGET, 'utf8');
  const all = i18n.scanBidirectional(content, TARGET);
  // 命中不含 key 信息 ⇒ 用行号定位该 key 所在行区间
  const lines = content.split('\n');
  const start = lines.findIndex(l => l.includes(`"${key}"`));
  if (start < 0) return -1;
  // 找到该 key 值的结束行 (下一个顶层 key 或对象结束)
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^  "[^"]+":\s*\{/.test(lines[i]) || /^\}/.test(lines[i])) { end = i; break; }
  }
  return all.filter(h => h.ruleId === 'I18N_POLLUTION_EN' && h.line > start + 1 && h.line <= end).length;
}

(async () => {
  const orig = fs.readFileSync(TARGET, 'utf8');
  let pass = 0, fail = 0;
  console.log('=== 门童 #4 locale 守卫回放 v2 (只计注入键) ===\n');
  try {
    for (const [name, html, expect] of CASES) {
      const obj = JSON.parse(orig);
      obj.__probe = { title: 'Probe', content: html };
      fs.writeFileSync(TARGET, JSON.stringify(obj, null, 2), 'utf8');
      const n = hitsForKey('__probe');
      const ok = expect === '>0' ? n > 0 : n === 0;
      ok ? pass++ : fail++;
      console.log(`  ${ok ? '✅' : '❌'} ${name.padEnd(30)} 期望 ${expect.padEnd(3)} 实得 ${String(n).padStart(3)}`);
    }
    // 对照有效性自证: 同一位置换不同值, 命中必须随之变化
    console.log('\n  (对照自证: 阳性 2 例应 >0 且阴性 2 例应 =0; 若阴性也 >0 ⇒ 判据失效, 结论作废)');
  } finally {
    fs.writeFileSync(TARGET, orig, 'utf8');
    console.log('\n还原:', fs.readFileSync(TARGET, 'utf8') === orig ? 'OK' : '❌ MISMATCH');
  }
  console.log(`\n回放: PASS ${pass} / FAIL ${fail}`);
  process.exit(0);
})();
