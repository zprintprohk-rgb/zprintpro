const fs = require('fs');
const bp = fs.readFileSync('src/data/blog-posts.ts', 'utf8');
// BlogCategoryKey union
const u = bp.match(/export type BlogCategoryKey =([\s\S]*?);/);
console.log('=== BlogCategoryKey union ===');
console.log(u ? u[1].replace(/\s+/g, ' ').trim() : '(none)');
// 现有 book 相关 blog 的 categoryKey / category
const arr = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const list = Object.values(arr);
console.log('\n=== 书刊类文章 category 字段 ===');
for (const p of list) {
  if (/book|booklet|doujin|zine|catalog|yearbook|textbook|exercise/i.test(p.slug)) {
    const m = bp.match(new RegExp("slug: '" + p.slug + "[\\s\\S]{0,300}?categoryKey: '([^']+)'"));
    console.log('  ' + p.slug + ' | data.category=' + p.category + ' | categoryKey=' + (m ? m[1] : '?'));
  }
}
// PILLAR_TRIGGERS
const ilg = fs.readFileSync('scripts/guards/internal-links-cta-guard.js', 'utf8');
const i = ilg.indexOf('PILLAR_TRIGGERS');
console.log('\n=== PILLAR_TRIGGERS ===');
console.log(ilg.slice(i, i + 500));
