const fs = require('fs');
const content = fs.readFileSync('src/data/pillar-content.ts', 'utf-8');
const dataStart = content.indexOf('export const stickerGuidePillar');
const data = content.slice(dataStart);

const idx = data.indexOf('content:');
// Find the next }, after idx+1000
let end = idx + 1000;
while (end < data.length && !(data[end] === '}' && data[end+1] === ',' && data[end+2] === '\n')) {
  end++;
}
console.log('Block ends at:', end);
console.log('End context:', JSON.stringify(data.slice(end-20, end+20)));
