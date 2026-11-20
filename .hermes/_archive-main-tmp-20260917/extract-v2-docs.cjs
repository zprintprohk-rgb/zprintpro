#!/usr/bin/env node
/* 只读: 提取 8/31 v2 三份战略文档的结构 (标题 + 任务行), 供激活与派活对账 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-main-tmp\\docs';
const FILES = ['2026-08-31-v2-strategy-master-plan.md', '2026-08-31-v2-30day-sprint-daily-plan.md', '2026-08-31-v2-90day-track-b-plan.md'];
for (const f of FILES) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) { console.log(`\n### ${f}: (未找到)`); continue; }
  const raw = fs.readFileSync(p, 'utf8');
  const lines = raw.split(/\r?\n/);
  console.log(`\n### ${f}  (${raw.length} B, ${lines.length} 行)`);
  console.log(`头部摘录: ${lines.slice(0, 4).join(' / ').slice(0, 200)}`);
  const heads = lines.filter(l => /^#{2,4}\s/.test(l)).map(l => l.trim());
  console.log(`小节 (${heads.length}):`);
  heads.slice(0, 22).forEach(h => console.log('   ' + h.slice(0, 100)));
  // 任务型行 (含 任务/派活/验收/里程碑/T\d/D\d)
  const tasks = lines.filter(l => /(^\s*[-*]\s)|(\|\s*T\d)|(D\d{1,2}\b)/.test(l) && /任务|派活|验收|里程碑|交付|D\d|T\d/.test(l)).slice(0, 8);
  if (tasks.length) { console.log('任务型行样例:'); tasks.forEach(t => console.log('   ' + t.trim().slice(0, 130))); }
}
