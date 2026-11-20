import fs from 'fs';
const p = 'F:/zprintpro-nextjs/.hermes/staging/self-publishing-content.zhhk-ja.json';
const doc = JSON.parse(fs.readFileSync(p, 'utf8'));
const src = fs.readFileSync('F:/zprintpro-nextjs/.hermes/_probe-pb/selfpub-loc-check.mjs', 'utf8');
const extract = (name) => eval(src.match(new RegExp('const ' + name + ' = (\\/\\[[\\s\\S]*?\\]\\/g);'))[1]);
const list = (re) => [...new Set(re.source.replace(/^\[|\]$/g, '').split(''))];

for (const [loc, name] of [['zh-hk', 'SIMP_EXT'], ['ja', 'SIMP_EXT']]) {
  const set = list(extract(name));
  const fields = {
    title: doc.title[loc],
    description: doc.description[loc],
    excerpt: doc.excerpt[loc],
    category: doc.category[loc],
    content: doc.content[loc],
  };
  console.log('===== ' + loc + ' (' + name + ') =====');
  let total = 0;
  for (const [f, v] of Object.entries(fields)) {
    const hits = [...new Set([...v].filter((ch) => set.includes(ch)))];
    if (hits.length) {
      total += [...v].filter((ch) => set.includes(ch)).length;
      console.log(' ', f, hits.join(' '));
      for (const ch of hits) {
        const i = v.indexOf(ch);
        console.log('    ', ch, 'ctx:', JSON.stringify(v.slice(Math.max(0, i - 14), i + 14)));
      }
    }
  }
  console.log('  total hits:', total);
}
