// Pre-lane readiness: ASCII purity check for tonight's lane wrappers (§0.35.5 编码铁律)
const fs = require('fs');
const files = [
  'F:/zprintpro-nextjs/.hermes/cron-run/ZP-gsc-feedback.cmd',
  'F:/zprintpro-nextjs/.hermes/cron-run/ZP-daily-content.cmd',
  'F:/zprintpro-nextjs/.hermes/cron-run/ZP-gsc-feedback.ps1',
  'F:/zprintpro-nextjs/.hermes/cron-run/ZP-daily-content.ps1',
];
for (const f of files) {
  let ok = fs.existsSync(f);
  if (!ok) { console.log(`${f}: MISSING`); continue; }
  const buf = fs.readFileSync(f);
  let nonAscii = 0; let firstBad = -1; let hasBOM = buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
  for (let i = 0; i < buf.length; i++) {
    if (buf[i] > 127) { nonAscii++; if (firstBad < 0) firstBad = i; }
  }
  console.log(`${f.split('/').pop()}: bytes=${buf.length} nonAscii=${nonAscii} ${nonAscii ? 'firstBadOffset=' + firstBad : ''} BOM=${hasBOM} => ${nonAscii === 0 && !hasBOM ? 'ASCII-PURE OK' : 'FAIL'}`);
}
// lane.lock check
const lock = 'F:/zprintpro-nextjs/.hermes/locks/lane.lock';
console.log(`lane.lock exists: ${fs.existsSync(lock)}${fs.existsSync(lock) ? ' (content: ' + fs.readFileSync(lock, 'utf8').slice(0, 200) + ')' : ' => free'}`);
