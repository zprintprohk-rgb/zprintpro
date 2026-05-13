const fs = require('fs');
const content = fs.readFileSync('src/data/pillar-content.ts', 'utf-8');
const dataStart = content.indexOf('export const stickerGuidePillar');
const data = content.slice(dataStart);

const idx = data.indexOf('content:');
console.log('First content: in data at', idx);
console.log(data.slice(idx, idx + 100));
console.log('...');
console.log(data.slice(idx + 400, idx + 500));
