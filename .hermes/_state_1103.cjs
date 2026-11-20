// Inspect workspace dirs: 重要文件 + recent logs
const fs = require('fs');
function ls(dir, filter) {
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true })
      .filter((d) => !filter || filter.test(d.name))
      .map((d) => {
        const p = dir + '/' + d.name;
        let t = '';
        try { t = fs.statSync(p).mtime.toISOString().slice(0, 16).replace('T', ' '); } catch (e) { t = '?'; }
        return `${t}  ${d.isDirectory() ? '[DIR] ' : ''}${d.name}`;
      });
    return items.sort().reverse().slice(0, 40).join('\n');
  } catch (e) { return 'ERR: ' + e.message; }
}
console.log('=== F:/zprintpro-nextjs/重要文件 ===');
console.log(ls('F:/zprintpro-nextjs/重要文件'));
console.log('\n=== .hermes/logs — 2026-11 files ===');
console.log(ls('F:/zprintpro-nextjs/.hermes/logs', /^2026-11/));
console.log('\n=== .hermes/logs — 2026-10-30..31 files ===');
console.log(ls('F:/zprintpro-nextjs/.hermes/logs', /^2026-10-(30|31)/));
console.log('\n=== docs — 2026-10-30..11-03 ===');
console.log(ls('F:/zprintpro-nextjs/docs', /^2026-(10-3|11-0)/));
