// moq10-show-saddle-claims.mjs — 印出騎馬釘小冊子文章內含 MOQ 字樣的句子
import fs from 'fs';

const TARGETS = {
  'zh-hk': [/(100\s*本起|1\s*本起|最低起訂|起印量|起訂)/],
  en: [/(100[- ]copy|100 copies|1 copy|no minimum|minimum order)/i],
  ja: [/(100\s*冊から|100冊|1\s*部から|最低注文|最小ロット)/],
};

for (const loc of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf-8'));
  const e = j['saddle-stitch-booklet-printing-guide'];
  if (!e) { console.log(`${loc}: 找不到該文章`); continue; }
  console.log(`\n================ ${loc} ================`);
  for (const [field, val] of Object.entries(e)) {
    if (typeof val !== 'string') continue;
    const parts = val.split(/(?<=。)|(?<=\.\s)|(?<=<\/p>)|(?<=\n)/);
    let idx = 0;
    for (const p of parts) {
      const keep = TARGETS[loc].some((re) => re.test(p));
      if (keep && p.trim().length > 8) {
        console.log(`  [${field}] ${p.replace(/\s+/g, ' ').trim().slice(0, 230)}`);
      }
      idx += p.length;
    }
  }
}
