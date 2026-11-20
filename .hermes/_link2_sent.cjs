// .hermes/_link2_sent.cjs — restaurant-menu 三语 盒/包裝 句子
const fs = require('fs');
for (const l of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(`src/data/blog-data/${l}.json`, 'utf8'));
  const c = (j['restaurant-menu-printing-guide'] || {}).content || '';
  const sents = c.split(/(?<=。)|(?<=\.\s)|(?<=<\/p>)|(?<=<\/li>)/).filter(s =>
    /外賣盒|包裝盒|餐盒|便當盒|takeout box|packaging box|テイクアウト|パッケージ|容器/i.test(s) && !/href=/.test(s)
  );
  console.log(`\n[${l}] candidates=${sents.length}`);
  sents.slice(0, 4).forEach((s, i) => console.log(`  ${i + 1}.`, JSON.stringify(s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 130))));
}
