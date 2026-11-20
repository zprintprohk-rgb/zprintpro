// 入档 TIME_READING_UNVERIFIED (K3 2026-09-20 要求)
import fs from 'fs';
const p = '.hermes/regression-guard/error-patterns.md';
let s = fs.readFileSync(p, 'utf8');
if (s.includes('TIME_READING_UNVERIFIED')) { console.log('已存在, 跳过'); process.exit(0); }
const lines = [
  '',
  '---',
  '',
  '### 规则 TIME_READING_UNVERIFIED — 单源时间读数未复算 (K3 2026-09-20 入档)',
  '',
  '**事故形态**: 车道空窗期我报「6.5 小时」，实测为 **18.3 小时**。根因 = 把 `git log --format=%cd` 输出里的**年份**',
  '(`Sat Sep 19 20:11:32 2026`) 误读成时刻，据此推算间隔。**单方法直觉读数、未交叉验证**。',
  '',
  '**与同族规则的关系**（同为「单一数据源不可信」，对象不同）:',
  '  · `DOUBLE_METHOD_RECOUNT`: 对象 = 内容匹配**数**;',
  '  · `LOCATE_BEFORE_PATCH`: 对象 = 待修**条目**;',
  '  · `TIME_READING_UNVERIFIED`（本条）: 对象 = **时间差**。',
  '',
  '**修法**: 任何时间差结论必须用**两个独立时间源**交叉验证（如 `Get-Date` 本机时刻 + 两个 commit 的完整时间戳取差），',
  '不得由单一格式化输出目视推算。',
  '',
  '**危害边界（诚实记录）**: 本次数字错但**方向未错**（18.3h 比 6.5h 更支持「车道僵死」判断），故危害仅为「报告数字不精确」，',
  '未导致错误决策 —— 这是侥幸，不是可依赖的模式。',
  '',
  '**同族规则**: `DOUBLE_METHOD_RECOUNT` · `LOCATE_BEFORE_PATCH` · `HREFLANG_FALSE_ALARM_MEASUREMENT_BUGS`',
  '',
];
fs.writeFileSync(p, s.trimEnd() + '\n' + lines.join('\n'), 'utf8');
console.log('✅ TIME_READING_UNVERIFIED 已入档');
