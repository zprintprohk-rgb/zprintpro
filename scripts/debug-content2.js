const fs = require('fs');
const content = fs.readFileSync('src/data/pillar-content.ts', 'utf-8');
const dataStart = content.indexOf('export const stickerGuidePillar');
const data = content.slice(dataStart);

// Test very simple regex
const r1 = /'zh-hk':\s*'([^']+)'/g;
let m;
let count = 0;
while ((m = r1.exec(data)) !== null && count < 3) {
  console.log('Match', count, 'length:', m[1].length);
  console.log(m[1].slice(0, 100));
  console.log('---');
  count++;
}
console.log('Total zh-hk matches:', (data.match(r1) || []).length);
