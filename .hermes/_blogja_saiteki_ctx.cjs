// locate blog-ja 最安値 contexts with full visibility
const fs = require('fs');
const raw = fs.readFileSync('src/data/blog-data/ja.json', 'utf8');
const data = JSON.parse(raw);
const hits = [];
function walk(node, path) {
  if (typeof node === 'string') {
    let i = 0;
    while ((i = node.indexOf('最安値', i)) >= 0) {
      hits.push({ path, ctx: node.slice(Math.max(0, i - 90), i + 40) });
      i += 3;
    }
  } else if (Array.isArray(node)) {
    node.forEach((v, k) => walk(v, `${path}[${k}]`));
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walk(v, `${path}.${k}`);
  }
}
walk(data, '$');
console.log('total hits:', hits.length);
hits.forEach((h, n) => console.log(`\n[${n + 1}] ${h.path}\n   ...${h.ctx}...`));
