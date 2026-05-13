const fs = require('fs');
const content = fs.readFileSync('src/data/pillar-content.ts', 'utf-8');
const idx = content.indexOf("content:");
console.log('First content: at', idx);
console.log(content.slice(idx, idx + 200));
console.log('---');
// Try simpler regex
const simple = content.match(/content:\s*\{[\s\S]{0,500}\}/);
console.log('Simple match:', simple ? simple[0].slice(0, 200) : 'none');
