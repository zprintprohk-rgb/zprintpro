#!/usr/bin/env node
/* 只读: ①jobs.json 里「真的跑过」的任务(有 lastRunAtMs) ②GSC 日粒度曝光/点击曲线 ③线上 sitemap 现状 */
const fs = require('fs');
const J = JSON.parse(fs.readFileSync('C:\\Users\\Administrator\\.openclaw-autoclaw\\cron\\jobs.json', 'utf8'));
const list = Array.isArray(J) ? J : (J.jobs || Object.values(J).find(v => Array.isArray(v)) || []);
const t = (ms) => (ms ? new Date(Number(ms)).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }) : '-');
console.log('== ① 有运行记录的任务 (lastRunAtMs 非空) ==');
const ran = list.filter(x => x.state && x.state.lastRunAtMs).map(x => ({ n: x.name, id: (x.id || '').slice(0, 8), last: x.state.lastRunAtMs, st: x.state.lastStatus, dur: x.state.lastDurationMs, err: (x.state.lastError || '').toString().slice(0, 60) })).sort((a, b) => b.last - a.last);
ran.slice(0, 12).forEach(r => console.log(`   ${t(r.last)} | ${r.st} | ${r.dur ? (r.dur / 1000).toFixed(0) + 's' : '-'} | ${r.n} (${r.id}) ${r.err ? '| ' + r.err : ''}`));
console.log(`   共 ${ran.length} 个有记录 / 总数 ${list.length}`);
console.log('\n   含 92141523 / b4fa582d 的任务:');
list.filter(x => /92141523|b4fa582d/.test(JSON.stringify(x))).forEach(x => console.log(`     ${x.name} (${(x.id || '').slice(0, 8)}) enabled=${x.enabled} last=${t(x.state && x.state.lastRunAtMs)}`));

console.log('\n== ② GSC 日曲线 (index.json) ==');
try {
  const idx = JSON.parse(fs.readFileSync('F:\\zprintpro-main-tmp\\GSC数据\\index.json', 'utf8'));
  const keys = Object.keys(idx);
  console.log('   顶层键:', keys.slice(0, 12).join(', '));
  const daily = idx.daily || idx.byDate || null;
  if (daily && typeof daily === 'object') {
    const rows = Object.entries(daily).sort().slice(-16);
    rows.forEach(([d, v]) => console.log(`   ${d}: ${JSON.stringify(v).slice(0, 120)}`));
  } else {
    console.log('   latestFreshData:', JSON.stringify(idx.latestFreshData || idx.freshness || '').slice(0, 200));
  }
} catch (e) { console.log('   index.json 读取失败:', e.message); }
