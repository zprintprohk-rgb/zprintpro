// 只读: dump zh-hk/en 的「延伸閱讀 / Further Reading」整节 (作为 ja 补建模板)
import fs from 'fs';
for (const loc of ['zh-hk', 'en']) {
  const d = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
  const c = d['sticker-material-pvc-vinyl-removable'].content;
  const i = c.search(/<h2>延伸閱讀<\/h2>|<h2>Further Reading<\/h2>/);
  console.log(`\n===== ${loc} (from ${i}) =====`);
  console.log(c.slice(i, i + 900));
}
