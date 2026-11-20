// .hermes/_md_scan_fields.cjs — blog-data 与 category-seo 的 title/description/h2/excerpt 字段
const fs = require('fs');
const MD = /\[[^\]<]{1,40}\]\(\/[a-z0-9\-\/]+\)/g;
const BOLD = /\*\*[^*\n<]{2,80}\*\*/g;
for (const l of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(`src/data/blog-data/${l}.json`, 'utf8'));
  const hits = [];
  for (const [slug, p] of Object.entries(j)) {
    for (const f of ['title', 'description', 'excerpt']) {
      const v = p && p[f];
      if (typeof v !== 'string') continue;
      const m = (v.match(MD) || []).length, b = (v.match(BOLD) || []).length;
      if (m || b) hits.push(`${slug}.${f}(md${m}/b${b})`);
    }
  }
  console.log(`[blog ${l}] ${hits.length} hits`, hits.slice(0, 5).join(' '));
}
// category-seo-content: title/h2/featuredSnippet 等单行字段
const t = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const lines = t.split('\n');
let cnt = 0;
lines.forEach((ln, i) => {
  const tr = ln.trim();
  if (tr.startsWith('//') || tr.startsWith('*')) return;
  if (/(title|h2|featuredSnippet|subtitle)\s*:/.test(tr)) {
    if (MD.test(tr) || BOLD.test(tr)) { cnt++; if (cnt <= 3) console.log('  cat-seo L' + (i + 1), tr.slice(0, 90)); }
    MD.lastIndex = 0; BOLD.lastIndex = 0;
  }
});
console.log('[category-seo] title/h2/snippet hits:', cnt);
