// .hermes/_pkg_md5.cjs
const fs = require('fs');
const s = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const a = s.indexOf('const packagingContent');
const b = s.indexOf('const bannersContent');
const blk = s.slice(a, b);
const re = /\[[^\]]{1,18}\]\(\/[a-z0-9\-\/]+\)/g;
let m, n = 0;
while ((m = re.exec(blk)) !== null) {
  n++;
  const before = blk.slice(Math.max(0, m.index - 130), m.index);
  const line = before.split('\n').pop();
  console.log(`${n}. ${JSON.stringify(line.slice(-110))}`);
}
