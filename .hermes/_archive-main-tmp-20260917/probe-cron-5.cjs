#!/usr/bin/env node
/* 只读: zprintpro 5 个 cron 实体状态 (enabled / 调度 / next / last / 最近状态) */
const fs = require('fs');
const JOBS = 'C:\\Users\\Administrator\\.openclaw-autoclaw\\cron\\jobs.json';
const PAT = /zprintpro|daily-content|weekly-meta|gsc-feedback|blog-deepfix|monthly-matrix/i;
const t = (ms) => (ms ? new Date(Number(ms)).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }) : '-');
const j = JSON.parse(fs.readFileSync(JOBS, 'utf8'));
const list = Array.isArray(j) ? j : (j.jobs || Object.values(j).find(v => Array.isArray(v)) || []);
const hit = list.filter(x => PAT.test(x.name || ''));
console.log(`匹配 ${hit.length} 个 (总数 ${list.length})\n`);
for (const x of hit) {
  const s = x.state || {};
  console.log(`· ${x.name}`);
  console.log(`  enabled=${x.enabled} | expr=${(x.schedule && (x.schedule.expr || x.schedule.cron)) || x.expr || '-'} | tz=${(x.schedule && x.schedule.tz) || '-'}`);
  console.log(`  next=${t(s.nextRunAtMs)} | last=${t(s.lastRunAtMs)} | status=${s.lastStatus || s.lastRunStatus || '-'} | err=${(s.lastError || '').toString().slice(0, 80)}`);
}
console.log('\n当前本地时间:', new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));
