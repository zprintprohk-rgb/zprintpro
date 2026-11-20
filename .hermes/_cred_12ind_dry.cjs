// .hermes/_cred_12ind_dry.cjs — 46 处上下文 dry-run
const fs = require('fs');
const map = { ja: [/12\s*業界/g], en: [/12[\s-]?Industr(?:y|ies)/gi] };
for (const l of ['ja', 'en']) {
  const j = JSON.parse(fs.readFileSync(`src/data/blog-data/${l}.json`, 'utf8'));
  console.log(`\n########## ${l}`);
  let n = 0;
  for (const [slug, p] of Object.entries(j)) {
    for (const f of ['title', 'description', 'content']) {
      const v = p && p[f];
      if (typeof v !== 'string') continue;
      for (const re of map[l]) {
        re.lastIndex = 0; let m;
        while ((m = re.exec(v)) !== null) {
          n++;
          if (n > 60) break;
          console.log(`--[${slug}.${f}]`, JSON.stringify(v.slice(Math.max(0, m.index - 45), m.index + 45)));
        }
      }
    }
  }
  console.log(`total ${n}`);
}
