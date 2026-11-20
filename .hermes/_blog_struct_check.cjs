// .hermes/_blog_struct_check.cjs — 转换后结构体检
const fs = require('fs');
for (const l of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(`src/data/blog-data/${l}.json`, 'utf8'));
  for (const slug of ['restaurant-opening-flyer-printing-guide', 'pet-food-sticker-printing-guide']) {
    const c = j[slug].content;
    const h2 = (c.match(/<h2/g) || []).length;
    const h3 = (c.match(/<h3/g) || []).length;
    const ul = (c.match(/<ul/g) || []).length;
    const li = (c.match(/<li/g) || []).length;
    const stray = (c.match(/\*\*/g) || []).length;
    const mdLink = (c.match(/\]\(\//g) || []).length;
    const emptyLi = (c.match(/<li><\/li>/g) || []).length;
    console.log(`${l}/${slug}: h2=${h2} h3=${h3} ul=${ul} li=${li} strayBold=${stray} mdLink=${mdLink} emptyLi=${emptyLi}`);
  }
}
