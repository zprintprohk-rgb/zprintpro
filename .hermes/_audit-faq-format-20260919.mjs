// 只读探针: ① FAQ 真实格式 dump ② content 内嵌 JSON-LD 真实统计 ③ 段落骨架计数
import fs from 'fs';
const slugs = [
  'packaging-box-pricing-2026',
  'sticker-material-pvc-vinyl-removable',
  'poster-printing-guide',
  'campus-education-printing-pillar-guide',
  'foil-stamping-3-applications-2026',
];
for (const loc of ['zh-hk', 'en', 'ja']) {
  const data = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
  for (const slug of slugs) {
    const c = (data[slug] || {}).content || '';
    // FAQ 候选: 任何含 Q + 冒号的 strong
    const strongQ = (c.match(/<strong>[^<]*Q[0-9]*\s*[:：]/gi) || []).length;
    // 只读页脚 JSON-LD 位置
    const ldCount = (c.match(/<script type="application\/ld\+json"/gi) || []).length;
    const firstLdIdx = c.search(/<script type="application\/ld\+json"/i);
    const pCount = (c.match(/<p[\s>]/gi) || []).length;
    const qSample = (c.match(/<p[^>]*>\s*<strong>[^<]{0,40}/) || [''])[0].slice(0, 90);
    console.log(`${loc}\t${slug}\tstrongQ=${strongQ}\tld=${ldCount}@${firstLdIdx}/${c.length}\tp=${pCount}\tsample=${JSON.stringify(qSample)}`);
  }
}
// 全区 FAQ Q/A 三种格式计数
const c = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'))['poster-printing-guide'].content;
const faqBlock = c.match(/<h2[^>]*>[^<]*FAQ[\s\S]{0,1500}/i);
console.log('\n--- poster FAQ 区块样本 ---\n' + (faqBlock ? faqBlock[0].slice(0, 1200) : 'NOT FOUND'));
