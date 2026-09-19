// 只读: dump poster en/ja 全部 H3 标题 + 紧随其后的首段 (为段锚改写定边界)
import fs from 'fs';
for (const loc of ['en', 'ja']) {
  const d = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
  const c = d['poster-printing-guide'].content;
  console.log(`\n========== ${loc} ==========`);
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]{0,260})/gi;
  let m; let i = 0;
  while ((m = re.exec(c)) !== null) {
    i++;
    console.log(`${i}. <h3>${m[1].replace(/<[^>]+>/g, '').trim()}`);
    console.log(`   标签原样: ${m[0].slice(0, 90).replace(/\n/g, '\\n')}`);
    console.log(`   紧随: ${m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 140)}`);
  }
  console.log(`   (H2=${(c.match(/<h2/gi) || []).length} H3=${i})`);
}
