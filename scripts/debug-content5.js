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

const zhMatch = block.match(/'zh-hk':\s*'([^']+)'/);
console.log('zhMatch:', !!zhMatch);

const enMatch = block.match(/en:\s*'((?:[^'\\]|\\.)*)'/);
console.log('enMatch:', !!enMatch);
if (!enMatch) {
  // Find en: manually
  const enIdx = block.indexOf('en:');
  console.log('en: at', enIdx);
  console.log(block.slice(enIdx, enIdx + 50));
}

const jaMatch = block.match(/ja:\s*'((?:[^'\\]|\\.)*)'/);
console.log('jaMatch:', !!jaMatch);
