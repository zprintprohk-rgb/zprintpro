#!/usr/bin/env node
/* 只读: 30 天冲刺计划 D8-D18 逐日任务 + 每日固定动作 (§1) */
const fs = require('fs');
const p = 'F:\\zprintpro-main-tmp\\docs\\2026-08-31-v2-30day-sprint-daily-plan.md';
const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
console.log('== §1 每日固定动作 ==');
let in1 = false;
for (const l of lines) {
  if (/^## §1 /.test(l)) { in1 = true; continue; }
  if (in1 && /^## /.test(l)) break;
  if (in1 && l.trim()) console.log('   ' + l.trim().slice(0, 150));
}
console.log('\n== 逐日表 D8-D18 ==');
for (const l of lines) {
  const m = l.match(/^\|\s*\*{0,2}D(\d{1,2})/);
  if (!m) continue;
  const d = parseInt(m[1], 10);
  if (d < 8 || d > 18) continue;
  console.log('   ' + l.trim().replace(/\s*\|\s*/g, ' | ').slice(0, 220));
}
