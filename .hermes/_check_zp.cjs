const fs = require('fs');
const s = fs.readFileSync('docs/2026-11-04-o6-poster-decision-pack.md', 'utf8');
let i = -1;
while ((i = s.indexOf('ZprintPro', i + 1)) >= 0) {
  console.log('---@' + i, JSON.stringify(s.slice(Math.max(0, i - 100), i + 90)));
}
console.log('done');
