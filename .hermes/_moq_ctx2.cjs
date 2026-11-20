// .hermes/_moq_ctx2.cjs — 4 SKU 剩余低值声称上下文 (含 en/ja)
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const marks = [];
const re = /^  "([a-z0-9-]+)": \{/gm;
let m; while ((m = re.exec(t)) !== null) marks.push({ slug: m[1], off: m.index });
const targets = ['certificates', 'textbooks', 'electronics-packaging-box', 'kraft-paper-packaging-box'];
const pats = [/(\d{1,5})\s*(?:個|張|枚|本|冊)\s*起印/g, /(\d{1,5})\s*(?:個|張|枚|本|冊)\s*起(?!印)/g, /(\d{1,5})\s*(?:pcs|pieces)?\s*MOQ/gi, /MOQ\s*(\d{1,5})/gi, /from\s+(\d{1,5})\s*(?:pcs|pieces)/gi, /(\d{1,5})\s*(?:枚|個|本|冊)から/g, /(\d{1,5})\s*枚〜/g];
targets.forEach(slug => {
  const i = marks.findIndex(x => x.slug === slug);
  const seg = t.slice(marks[i].off, marks[i + 1] ? marks[i + 1].off : t.length);
  console.log(`\n=== ${slug}`);
  const seen = new Set();
  for (const p of pats) {
    p.lastIndex = 0; let mm;
    while ((mm = p.exec(seg)) !== null) {
      const ctx = seg.slice(Math.max(0, mm.index - 50), mm.index + 40).replace(/\\n/g, ' ');
      if (seen.has(ctx)) continue; seen.add(ctx);
      console.log(`  [${mm[1]}]`, JSON.stringify(ctx.slice(0, 100)));
    }
  }
});
