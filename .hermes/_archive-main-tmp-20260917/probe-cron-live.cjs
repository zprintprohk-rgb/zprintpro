#!/usr/bin/env node
/* 只读: 执行层（5 cron）当前是否在跑 — jobs.json 状态 + 产物新鲜度 + 今日窗口 */
const fs = require('fs');
const path = require('path');
const JOBS = 'C:\\Users\\Administrator\\.openclaw-autoclaw\\cron\\jobs.json';
const out = {};
try {
  const j = JSON.parse(fs.readFileSync(JOBS, 'utf8'));
  const list = Array.isArray(j) ? j : (j.jobs || Object.values(j).find(v => Array.isArray(v)) || []);
  out.count = list.length;
  out.jobs = list.map(x => ({
    name: x.name || x.id || '(no-name)',
    enabled: x.enabled,
    expr: x.schedule && (x.schedule.expr || x.schedule.cron) || x.expr || x.cron,
    tz: x.schedule && x.schedule.tz,
    stateKeys: x.state ? Object.keys(x.state) : null,
    nextRunAtMs: x.state && x.state.nextRunAtMs,
    lastRunAtMs: x.state && x.state.lastRunAtMs,
    lastStatus: x.state && (x.state.lastStatus || x.state.lastRunStatus),
  }));
} catch (e) { out.error = e.message; }
console.log('== cron 任务实体 ==');
console.log(JSON.stringify(out, null, 1).slice(0, 2600));

console.log('\n== 产物新鲜度 (.hermes/logs + reports) ==');
for (const d of ['F:\\zprintpro-main-tmp\\.hermes\\logs', 'F:\\zprintpro-main-tmp\\.hermes\\reports']) {
  if (!fs.existsSync(d)) { console.log(`${d}: (不存在)`); continue; }
  const fs2 = fs.readdirSync(d).map(f => ({ f, m: fs.statSync(path.join(d, f)).mtime })).sort((a, b) => b.m - a.m).slice(0, 6);
  console.log(`${d}:`);
  fs2.forEach(x => console.log(`   ${x.m.toISOString().slice(0, 16)}  ${x.f}`));
}
console.log('\n当前时间:', new Date().toISOString(), '(本地', new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }), ')');
