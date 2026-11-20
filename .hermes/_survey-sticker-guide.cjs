const fs = require('fs');
for (const f of ['zh-hk', 'en', 'ja']) {
  const lines = fs.readFileSync('src/data/blog-data/' + f + '.json', 'utf8').split('\n');
  let s = lines.findIndex(l => l.includes('"sticker-guide": {'));
  let e = s;
  while (e < lines.length && !/^\s+\},?\s*$/.test(lines[e])) e++;
  const block = lines.slice(s, e + 1).join('\n');
  const pats = ['100 張', '100張', '100 枚', '100枚', '100 pieces', '100 piece', '100-unit', '100 units', '100 pcs', '100pc', '100-piece', '50-100', '起印 100', 'MOQ 100', '100 張起', 'from 100', 'From 100', 'at 100'];
  console.log('═══ ' + f + ' (lines ' + (s + 1) + '-' + (e + 1) + ') ═══');
  for (const p of pats) {
    const c = block.split(p).length - 1;
    if (c) console.log('  ' + JSON.stringify(p) + ' ×' + c);
  }
}
