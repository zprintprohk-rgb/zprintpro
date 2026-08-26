// Dump full poster-size-guide content (3 locales) to a text file for reference
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'data', 'blog-data');
let out = '';
for (const loc of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(path.join(dir, loc + '.json'), 'utf-8'));
  const e = j['poster-size-guide'];
  out += `\n########## ${loc} ##########\n` + e.content + '\n';
}
fs.writeFileSync(path.join(__dirname, 'poster-size-ref.txt'), out, 'utf-8');
console.log('written', out.length, 'chars');
