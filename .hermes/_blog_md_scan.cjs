// .hermes/_blog_md_scan.cjs — blog-data 正文内 markdown 链接 (博客渲染 HTML, md 会原样显示)
const fs = require('fs');
let total = 0;
for (const l of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(`src/data/blog-data/${l}.json`, 'utf8'));
  const hits = [];
  for (const [slug, p] of Object.entries(j)) {
    const c = (p && p.content) || '';
    const ms = [...new Set([...c.matchAll(/\[[^\]<]{1,30}\]\(\/[a-z0-9\-\/]+\)/g)].map(m => m[0]))];
    if (ms.length) { hits.push(`${slug}(${ms.length})`); total += ms.length; if (hits.length <= 2) console.log(`  e.g. [${l}|${slug}]`, ms.slice(0, 2).join(' | ')); }
  }
  console.log(`[${l}] posts=${Object.keys(j).length} postsWithMd=${hits.length} instances=${hits.reduce((a, x) => a + Number(x.match(/\((\d+)\)/)[1]), 0)}`);
  if (hits.length) console.log('   ', hits.slice(0, 10).join(' '));
}
console.log('TOTAL md-in-blog-content:', total);
