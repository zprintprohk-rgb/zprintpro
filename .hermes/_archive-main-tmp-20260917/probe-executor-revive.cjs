#!/usr/bin/env node
/* 只读: 执行层复活所需的三项前置 — ① cron prompt 是否在位 ② autoclaw CLI 是否可用 ③ 模型层错误证据 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const ROOT = 'F:\\zprintpro-main-tmp';
console.log('== ① cron prompt 文件 ==');
const cp = path.join(ROOT, '.hermes', 'cron-prompts');
if (fs.existsSync(cp)) fs.readdirSync(cp).forEach(f => console.log(`   ${fs.statSync(path.join(cp, f)).size.toString().padStart(7)} B  ${f}`));
else console.log('   (无 .hermes/cron-prompts)');

console.log('\n== ② 模型层错误证据 (近 7 天 logs 内 grep 402/Insufficient/Unknown model) ==');
const dirs = [path.join(ROOT, '.hermes', 'logs'), path.join(ROOT, '.hermes', 'reports')];
const PAT = /402|Insufficient Balance|Unknown model|model-call-started|timed out/i;
let hits = 0;
for (const d of dirs) {
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (!fs.statSync(p).isFile()) continue;
    if (fs.statSync(p).mtime < new Date(Date.now() - 7 * 864e5)) continue;
    const txt = fs.readFileSync(p, 'utf8');
    const m = txt.match(PAT);
    if (m) { console.log(`   ${f}: …${txt.slice(Math.max(0, m.index - 60), m.index + 80).replace(/\s+/g, ' ')}…`); hits++; }
  }
}
if (!hits) console.log('   (近 7 天产物内未见模型层错误字样)');

console.log('\n== ③ autoclaw CLI / 调度器可用性 ==');
for (const cmd of ['autoclaw', 'openclaw']) {
  try {
    const out = execFileSync('where', [cmd], { encoding: 'utf8' }).trim();
    console.log(`   ${cmd}: ${out.split(/\r?\n/)[0]}`);
  } catch { console.log(`   ${cmd}: PATH 内未找到`); }
}
const cronDir = 'C:\\Users\\Administrator\\.openclaw-autoclaw\\cron';
if (fs.existsSync(cronDir)) console.log('   cron 目录:', fs.readdirSync(cronDir).join(', '));
console.log('\n   (调度装载由 AutoClaw 宿主进程负责; 若宿主未运行, 任何"派活"都不会被执行)');
