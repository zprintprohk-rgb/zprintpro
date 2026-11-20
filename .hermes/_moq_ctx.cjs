// .hermes/_moq_ctx.cjs — 4 SKU 块内 MOQ 声称上下文
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const marks = [];
const re = /^  "([a-z0-9-]+)": \{/gm;
let m; while ((m = re.exec(t)) !== null) marks.push({ slug: m[1], off: m.index });
const targets = ['certificates', 'textbooks', 'electronics-packaging-box', 'kraft-paper-packaging-box'];
targets.forEach((slug, ti) => {
  const i = marks.findIndex(x => x.slug === slug);
  if (i < 0) return console.log(slug, 'NOT FOUND');
  const seg = t.slice(marks[i].off, marks[i + 1] ? marks[i + 1].off : t.length);
  console.log(`\n=== ${slug}`);
  for (const pat of [/[\d]{1,3}\s*個起印/g, /[\d]{1,3}\s*張起印/g, /[\d]{1,3}\s*本起印/g]) {
    let mm; const seen = new Set();
    while ((mm = pat.exec(seg)) !== null) {
      const ctx = seg.slice(Math.max(0, mm.index - 60), mm.index + 30).replace(/\\n/g, ' ');
      if (seen.has(ctx)) continue; seen.add(ctx);
      console.log('  *', JSON.stringify(ctx));
    }
  }
});
