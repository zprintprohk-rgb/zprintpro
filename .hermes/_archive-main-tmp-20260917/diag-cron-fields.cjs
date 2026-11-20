#!/usr/bin/env node
/* 只读: 对比「已武装」(w7) 与「未武装」(5 zprintpro) 的字段集, 定位缺失字段 */
const fs = require('fs');
const J = JSON.parse(fs.readFileSync('C:\\Users\\Administrator\\.openclaw-autoclaw\\cron\\jobs.json', 'utf8'));
const list = Array.isArray(J) ? J : (J.jobs || Object.values(J).find(v => Array.isArray(v)) || []);
const armed = list.find(x => /w7-strategy-m1-weekly-check/.test(x.name || ''));
const five = list.filter(x => /^ZprintPro ·/.test(x.name || ''));
if (!armed || !five.length) { console.log('未找到对照任务:', !!armed, five.length); process.exit(1); }
const keysOf = (o) => Object.keys(o).sort();
const aK = keysOf(armed), fK = keysOf(five[0]);
console.log('已武装 (w7) 字段:', aK.join(', '));
console.log('\n未武装 (5 任务) 字段:', fK.join(', '));
console.log('\n仅已武装有:', aK.filter(k => !fK.includes(k)).join(', ') || '(无)');
console.log('仅未武装有:', fK.filter(k => !aK.includes(k)).join(', ') || '(无)');
console.log('\n== 已武装样本 (值截断) ==');
for (const k of aK) console.log(`   ${k}: ${JSON.stringify(armed[k]).slice(0, 120)}`);
console.log('\n== 未武装样本 (值截断) ==');
for (const k of fK) console.log(`   ${k}: ${JSON.stringify(five[0][k]).slice(0, 120)}`);
console.log('\n== state 对比 ==');
console.log('   armed.state:', JSON.stringify(armed.state).slice(0, 300));
console.log('   5jobs.state:', JSON.stringify(five[0].state).slice(0, 300));
