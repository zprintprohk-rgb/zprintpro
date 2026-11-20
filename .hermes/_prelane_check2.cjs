// Pre-lane readiness part 2: harness footprint mtimes + dsh availability + wrapper log tail
const fs = require('fs');
function mtime(p) { try { return fs.statSync(p).mtime.toISOString() + ' (' + fs.statSync(p).mtime.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }) + ')'; } catch (e) { return 'MISSING'; } }
const logs = 'F:/zprintpro-nextjs/.hermes/logs/';
console.log('run-context-ZP-daily-content.json mtime:', mtime(logs + 'run-context-ZP-daily-content.json'));
console.log('run-context-ZP-gsc-feedback.json mtime:', mtime(logs + 'run-context-ZP-gsc-feedback.json'));
console.log('cron-ZP-daily-content.log mtime:', mtime(logs + 'cron-ZP-daily-content.log'));
console.log('cron-ZP-gsc-feedback.log mtime:', mtime(logs + 'cron-ZP-gsc-feedback.log'));
// wrapper log tails
for (const f of ['cron-ZP-daily-content.log', 'cron-ZP-gsc-feedback.log']) {
  try {
    const t = fs.readFileSync(logs + f, 'utf8').trim().split(/\r?\n/);
    console.log(`--- ${f} last 4 lines ---`);
    for (const l of t.slice(-4)) console.log('  ' + l.slice(0, 160));
  } catch (e) { console.log(`--- ${f}: unreadable`); }
}
// dsh availability (presence only, no execution)
const dshCmd = 'F:/zprintpro-nextjs/.hermes/_bin/dsh';
console.log('.dsh profile dir exists:', fs.existsSync('C:/Users/Administrator/.dsh'));
let dshOnPath = false;
for (const dir of (process.env.PATH || '').split(';')) {
  if (!dir) continue;
  for (const exe of ['dsh.exe', 'dsh.cmd', 'dsh.bat', 'dsh']) {
    const p = dir.replace(/\\$/, '') + '\\' + exe;
    if (fs.existsSync(p)) { console.log('dsh found at:', p); dshOnPath = true; break; }
  }
  if (dshOnPath) break;
}
if (!dshOnPath) console.log('dsh NOT found on this session PATH (lane wrapper uses its own environment; not necessarily a problem)');
// preflight script integrity
const pf = 'F:/zprintpro-nextjs/scripts/lane-preflight.py';
console.log('lane-preflight.py exists:', fs.existsSync(pf), 'bytes:', fs.existsSync(pf) ? fs.statSync(pf).size : 0);
const lg = 'F:/zprintpro-nextjs/scripts/lane-git-commit.py';
console.log('lane-git-commit.py exists:', fs.existsSync(lg), 'bytes:', fs.existsSync(lg) ? fs.statSync(lg).size : 0);
