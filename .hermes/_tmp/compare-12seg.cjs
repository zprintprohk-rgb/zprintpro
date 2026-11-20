const fs = require('fs');
function fails(p) {
  const t = fs.readFileSync(p, 'utf8');
  const out = [];
  const re = /src\/data\/blog-data\/([a-z-]+\.json) \[(SEG\d+_[A-Z_]+)\] ([^\[\]]+) \[([a-z-]+)\]/g;
  let m;
  while ((m = re.exec(t)) !== null) out.push(m[4] + '/' + m[1] + ' ' + m[2]);
  const tot = (t.match(/\[12段骨架汇总\] (PASS=\d+ FAIL=\d+)/) || [])[1] || '?';
  const base = (t.match(/\[基线对账\] 基线 (\d+) \/ 现存 (\d+) \/ 已修 (\d+) \/ 剩余待修 (\d+)/) || [])[0] || '?';
  return { list: out, tot, base };
}
const pre = fails('.hermes/_tmp_12seg_pre.json');
const post = fails('.hermes/_tmp_12seg_post.json');
const setA = new Set(pre.list), setB = new Set(post.list);
const added = post.list.filter(x => !setA.has(x));
const removed = pre.list.filter(x => !setB.has(x));
console.log('PRE :', pre.tot, '|', pre.base, '| fails=' + pre.list.length);
console.log('POST:', post.tot, '|', post.base, '| fails=' + post.list.length);
console.log('ADDED (must be 0):', JSON.stringify(added));
console.log('FIXED:', JSON.stringify(removed, null, 1));
// poster zh detail from post output
const t = fs.readFileSync('.hermes/_tmp_12seg_post.json', 'utf8');
const i = t.indexOf('--- zh-hk/poster-printing-guide');
console.log(t.slice(i, i + 1200));
