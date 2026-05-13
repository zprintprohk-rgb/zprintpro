const fs = require('fs');
const content = fs.readFileSync('src/data/pillar-content.ts', 'utf-8');
const dataStart = content.indexOf('export const stickerGuidePillar');
const data = content.slice(dataStart);

const start = data.indexOf('content:');
let braceOpen = data.indexOf('{', start);
let depth = 1;
let end = braceOpen + 1;
while (depth > 0 && end < data.length) {
  if (data[end] === '{') depth++;
  else if (data[end] === '}') depth--;
  end++;
}
const block = data.slice(start, end);

console.log('Block length:', block.length);
console.log('Block:');
console.log(block);
