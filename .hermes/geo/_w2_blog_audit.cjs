// 博客结构盘点 + 三语 slug 对应（只读审计）
const fs = require('fs');
const path = require('path');
const ROOT = 'F:/zprintpro-nextjs';

function audit(locale, slug) {
  const p = path.join(ROOT, 'src/data/blog-data', locale + '.json');
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  const e = j[slug];
  if (!e) return { locale, slug, found: false };
  const c = e.content || '';
  const h2s = [...c.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const tables = (c.match(/<table/g) || []).length;
  const links = [...new Set([...c.matchAll(/href="([^"]+)"/g)].map(m => m[1]))];
  const cjk = (c.match(/[\u4e00-\u9fff]/g) || []).length;
  const qa = c.includes('快速答案') || c.includes('qa-answer') || c.includes('Quick answer') || c.includes('クイック');
  return { locale, slug, found: true, h2count: h2s.length, h2s, tables, linkCount: links.length, links, cjk, qaBlock: qa, title: e.title, excerpt: (e.excerpt || '').slice(0, 80) };
}

const out = {};
for (const slug of ['food-packaging-printing-guide']) {
  for (const loc of ['zh-hk', 'en', 'ja']) out[loc + ':' + slug] = audit(loc, slug);
}
// 三语 slug 对应: 找 stickers/doujin 相关博客
for (const loc of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/blog-data', loc + '.json'), 'utf8'));
  out[loc + ':sticker-ish'] = Object.keys(j).filter(k => /sticker|small-batch/i.test(k)).slice(0, 8);
  out[loc + ':doujin-ish'] = Object.keys(j).filter(k => /doujin|同人/i.test(k)).slice(0, 8);
}
fs.writeFileSync(path.join(ROOT, '.hermes/geo/_w2_blog_audit.json'), JSON.stringify(out, null, 2));
// 控制台摘要
const f = out['zh-hk:food-packaging-printing-guide'];
console.log('zh-hk food guide: found=', f.found, 'h2=', f.h2count, 'tables=', f.tables, 'links=', f.linkCount, 'cjk=', f.cjk, 'qaBlock=', f.qaBlock);
console.log('h2:', (f.h2s || []).join(' | '));
for (const loc of ['zh-hk', 'en', 'ja']) {
  console.log(loc, 'sticker-ish:', JSON.stringify(out[loc + ':sticker-ish']));
  console.log(loc, 'doujin-ish:', JSON.stringify(out[loc + ':doujin-ish']));
}
