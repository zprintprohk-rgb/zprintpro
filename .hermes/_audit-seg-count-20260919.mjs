// 12 段骨架实测 (ad-hoc 盘点, 只读): 对 5 大 Pillar slug × 3 locale 计 段/字数/FAQ/表/块/内链
import fs from 'fs';

const slugs = [
  'packaging-box-pricing-2026',
  'sticker-material-pvc-vinyl-removable',
  'poster-printing-guide',
  'campus-education-printing-pillar-guide',
  'foil-stamping-3-applications-2026',
];
const locales = ['zh-hk', 'en', 'ja'];

const strip = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ');
const words = (h, loc) => {
  const t = strip(h);
  return loc === 'en' ? (t.match(/[A-Za-z0-9'-]+/g) || []).length
                      : (t.match(/[\u4e00-\u9fff\u3040-\u30ff]/g) || []).length + (t.match(/[A-Za-z0-9'-]+/g) || []).length;
};

const rows = [];
for (const loc of locales) {
  const raw = fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8');
  const data = JSON.parse(raw);
  for (const slug of slugs) {
    const post = data[slug];
    if (!post) { rows.push({ loc, slug, exists: false }); continue; }
    const c = post.content || '';
    const h2 = (c.match(/<h2[\s>]/gi) || []).length;
    const h2q = (c.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || []).filter(m =>
      /[?？]|\b(how|what|why|when|which|can|does|is|are|should|much|many|long)\b|多少|怎樣|如何|什麼|邊款|幾多|いくら|どう|なに|どの|選び方|違い|種類|相場/.test(strip(m))).length;
    const tables = (c.match(/<table[\s>]/gi) || []).length;
    const faq = (c.match(/<p><strong>Q[0-9]*[:：]/gi) || []).length;
    const cta = (c.match(/wa\.me\/\d+/gi) || []).length;
    const links = (c.match(/<a\s[^>]*href=/gi) || []).length;
    const blocks = (c.match(/<div class="[^"]*bg-(?:amber|blue|red|green|gray|orange|yellow)-50[^"]*"/gi) || []).length;
    const nums = (c.match(/\b\d{2,}[\d,.]*\b/g) || []).length;
    const inlineLd = (c.match(/<script type="application\/ld\+json"/gi) || []).length;
    rows.push({
      loc, slug, exists: true, words: words(c, loc), h2, h2q, tables, faq, cta, links, blocks, nums, inlineLd,
      title: (post.title || '').length,
    });
  }
}
console.log(JSON.stringify(rows, null, 1));
const tot = rows.filter(r => r.exists);
console.log('\n--- summary ---');
console.log('pillar-locale 组合 =', tot.length, '/ 15');
console.log('字数 >=12000 (en: words) 的组合:', tot.filter(r => r.words >= 12000).length);
console.log('FAQ>=4:', tot.filter(r => r.faq >= 4).length, '| 表>=2:', tot.filter(r => r.tables >= 2).length,
  '| 块>=3:', tot.filter(r => r.blocks >= 3).length, '| 内链>=10:', tot.filter(r => r.links >= 10).length,
  '| CTA==2:', tot.filter(r => r.cta === 2).length, '| H2>=6:', tot.filter(r => r.h2 >= 6).length,
  '| 数字>=10:', tot.filter(r => r.nums >= 10).length, '| content 内嵌 JSON-LD=0:', tot.filter(r => r.inlineLd === 0).length);
