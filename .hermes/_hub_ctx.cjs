// .hermes/_hub_ctx.cjs — packaging hub 三语块切分 + 可疑价位上下文
const fs = require('fs');
const seo = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const pc = seo.indexOf('packagingContent');
const zh = seo.indexOf("'zh-hk': {", pc);
// 严格按行首缩进定位 en / ja 键
const rest = seo.slice(zh);
const mEn = rest.match(/\n\s{2}(?:'en'|en):\s*\{/);
const enStart = mEn ? zh + mEn.index : -1;
const rest2 = seo.slice(enStart);
const mJa = rest2.match(/\n\s{2}(?:'ja'|ja):\s*\{/);
const jaStart = mJa ? enStart + mJa.index : -1;
console.log('bounds zh', zh, 'en', enStart, 'ja', jaStart, 'seoLen', seo.length);
const blocks = {
  'zh-hk': seo.slice(zh, enStart),
  en: seo.slice(enStart, jaStart),
  ja: seo.slice(jaStart),
};
const SUS = [/(HK\$|US\$|¥)\s*0?\.\d{1,2}/g, /HK\$\s*0\.03/g];
for (const [loc, b] of Object.entries(blocks)) {
  console.log(`\n===== ${loc} len=${b.length}`);
  const hits = [];
  for (const re of SUS) {
    re.lastIndex = 0; let m;
    while ((m = re.exec(b)) !== null) hits.push(m.index);
  }
  const uniq = [...new Set(hits)].sort((a, c) => a - c);
  uniq.slice(0, 8).forEach(i => console.log('  @' + i + ':', JSON.stringify(b.slice(Math.max(0, i - 90), i + 70))));
}
