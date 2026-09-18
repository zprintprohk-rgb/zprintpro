// Quick bracket balance checker (skips string contents)
const fs = require('fs');
const path = 'src/data/category-conversion-blocks.ts';
const content = fs.readFileSync(path, 'utf-8');

let inString = false, quote = '', result = '', i = 0;
while (i < content.length) {
  const c = content[i];
  if (!inString) {
    if (c === '"' || c === "'" || c === '`') {
      inString = true; quote = c;
      result += c;
    } else result += c;
  } else {
    if (c === '\\') { result += c; i++; result += content[i]; }
    else if (c === quote) { inString = false; result += c; }
    else result += '';
  }
  i++;
}
const open = (result.match(/{/g) || []).length;
const close = (result.match(/}/g) || []).length;
const ob = (result.match(/\[/g) || []).length;
const cb = (result.match(/\]/g) || []).length;
console.log('curly:', open, close, 'diff:', open - close);
console.log('square:', ob, cb, 'diff:', ob - cb);
console.log('file length:', content.length);
console.log('lines:', content.split('\n').length);
