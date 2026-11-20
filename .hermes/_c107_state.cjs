// .hermes/_c107_state.cjs
const fs = require('fs');
const seo = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const i = seo.indexOf('const japanDoujinContent');
const j = seo.indexOf('const greetingCardsContent');
const blk = seo.slice(i, j > i ? j : seo.length);
console.log('japanDoujin block len', blk.length);
// 三语分段
const locs = ['zh-hk', 'en', 'ja'];
locs.forEach(l => {
  const k = blk.indexOf(l === 'zh-hk' ? "'zh-hk': {" : (l === 'en' ? 'en: {' : 'ja: {'));
  const nk = blk.indexOf(l === 'zh-hk' ? "en: {" : (l === 'en' ? 'ja: {' : 'ZZZ'), k + 1);
  const seg = blk.slice(k, nk > k ? nk : blk.length);
  const c107 = (seg.match(/C107|c107|コミケ|Comiket/g) || []).length;
  const faq = (seg.match(/q:\s*'/g) || []).length;
  console.log(`  ${l}: len=${seg.length} C107/コミケ=${c107} faq=${faq}`);
});
// 主文件里 C107 出现位置
const all = seo.match(/C107/g);
console.log('category-seo C107 hits:', all ? all.length : 0);
const blog = JSON.parse(fs.readFileSync('src/data/blog-data/ja.json', 'utf8'));
for (const s of ['comiket-printing-prep-guide', 'doujin-circle-printing-guide']) {
  const c = (blog[s] || {}).content || '';
  console.log(`${s}: len=${c.length} h2=${(c.match(/<h2/g) || []).length} C107=${(c.match(/C107/g) || []).length} 締切=${(c.match(/締切/g) || []).length}`);
}
