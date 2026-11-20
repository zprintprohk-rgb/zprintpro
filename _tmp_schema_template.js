const d = require('./src/data/blog-data/zh-hk.json');
const t = d['poster-printing-guide'];
if (!t) { console.log('not found'); process.exit(); }
const c = t.content;
// Find all schema script positions
let pos = 0;
let idx = 0;
while ((pos = c.indexOf('application/ld+json', pos)) !== -1) {
  const start = c.lastIndexOf('<script', pos);
  const end = c.indexOf('</script>', pos) + '</script>'.length;
  console.log('---schema', idx, 'start@', start, '---');
  console.log(c.substring(start, end));
  console.log('---');
  pos = end;
  idx++;
}
