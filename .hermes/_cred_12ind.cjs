// .hermes/_cred_12ind.cjs — en/ja blog-data 12 行业残留清点
const fs = require('fs');
for (const [l, pats] of [['ja', [/12 業界/g, /12業界/g]], ['en', [/12 Industries/g, /12-Industry/g, /12 industry/g]]]) {
  const j = JSON.parse(fs.readFileSync(`src/data/blog-data/${l}.json`, 'utf8'));
  let total = 0;
  const hits = [];
  for (const [slug, p] of Object.entries(j)) {
    const c = (p && p.content) || '';
    for (const re of pats) {
      const n = (c.match(re) || []).length;
      if (n) { total += n; hits.push(`${slug} x${n}`); }
    }
    // title/excerpt 也查
    for (const f of ['title', 'description']) {
      const v = p && p[f];
      if (typeof v === 'string') for (const re of pats) {
        if (re.test(v)) { total += 1; hits.push(`${slug}.${f} x1`); }
        re.lastIndex = 0;
      }
    }
  }
  console.log(`[${l}] total=${total}`);
  console.log('  ', hits.slice(0, 20).join(' | '));
}
