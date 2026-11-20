const fs = require('fs');
const SLUGS = [
  'packaging-box-pricing-2026',
  'sticker-material-pvc-vinyl-removable',
  'poster-printing-guide',
  'campus-education-printing-pillar-guide',
  'foil-stamping-3-applications-2026',
  'hong-kong-printing-cost-baseline-2026',
];
const LOCALES = ['zh-hk', 'en', 'ja'];
const PROD_RE = /<p[^>]*>\s*<strong>\s*Q[0-9]*\s*[:：]\s*([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)?\s*A[0-9]*\s*[:：]\s*([\s\S]*?)<\/p>/gi;
const QRE = { 'zh-hk': /^(如何|怎麽|怎麼|點樣|點解|幾多|幾時|可唔|係咪|是否|邊個|咩|乜)/, en: /^(what|how|why|which|when|who|can |do |does |is |are )/i, ja: /^(何|どう|どの|どれ|いくら|いつ|誰|なぜ|できます|できますか)/ };
const rows = [];
for (const loc of LOCALES) {
  const d = JSON.parse(fs.readFileSync('src/data/blog-data/' + loc + '.json', 'utf8'));
  const posts = Array.isArray(d) ? d : Object.values(d);
  for (const slug of SLUGS) {
    const p = posts.find(x => x.slug === slug);
    if (!p) { rows.push({ loc, slug, error: 'NOT FOUND' }); continue; }
    const c = p.content || '';
    const text = c.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const h2s = [...c.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => m[1].replace(/<[^>]*>/g, '').trim());
    const h3s = [...c.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map(m => m[1].replace(/<[^>]*>/g, '').trim());
    const heads = [...h2s, ...h3s];
    const qn = heads.filter(h => QRE[loc].test(h)).length;
    const faq = (c.match(PROD_RE) || []).length;
    const inline = c.split('"@type"').length - 1;
    const tables = (c.match(/<table/g) || []).length;
    const qa = (c.match(/bg-(blue|green|amber|yellow|indigo|purple|rose|teal)-50/g) || []).length;
    const cta = (c.match(/wa\.me\/8619880851334/g) || []).length;
    const links = [...c.matchAll(/<a [^>]*href="(\/[^"#]+)"/g)].map(m => m[1]);
    const intLinks = links.filter(h => h.startsWith('/' + loc + '/')).length;
    const geoSec = /<section[^>]*>/.test(c) || /【[^】]{6,}】/.test(c);
    const nums = (text.match(/\d[\d,.]*(\.\d+)?/g) || []).length;
    const title = p.title || '';
    rows.push({
      loc, slug,
      titleLen: title.length,
      titleOK: title.length >= 50 && title.length <= 60,
      chars: text.length,
      h2: h2s.length, h3: h3s.length, qRatio: heads.length ? Math.round(qn / heads.length * 100) : 0,
      faq, inline, tables, qa, cta, intLinks, nums, geoSec,
      lastUpdated: p.lastUpdated,
    });
  }
}
console.log(JSON.stringify(rows, null, 0).replace(/\},\{/g, '},\n{'));
