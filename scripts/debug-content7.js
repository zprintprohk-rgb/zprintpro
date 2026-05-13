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

// Test regex on a simpler string first
const testStr = "en: 'Hello world'";
console.log('Simple test:', testStr.match(/en:\s*'((?:[^'\\]|\\.)*)'/));

// Test on block snippet
const enIdx = block.indexOf("en: '");
console.log('en: index in block:', enIdx);
const snippet = block.slice(enIdx, enIdx + 100);
console.log('Snippet:', snippet);
console.log('Regex on snippet:', snippet.match(/en:\s*'((?:[^'\\]|\\.)*)'/));
