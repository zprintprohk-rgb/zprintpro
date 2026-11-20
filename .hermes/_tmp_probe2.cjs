const fs = require('fs');
const zh = fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8');
const urls = [...new Set((zh.match(/https?:\/\/[a-z.]*linkedin\.com\/[^"'\s<>\\]{0,60}/gi) || []))];
console.log('LINKEDIN_URLS:', JSON.stringify(urls, null, 1));
// where does blog detail page read meta from?
const p = fs.readFileSync('src/app/[locale]/blog/[slug]/page.tsx', 'utf8');
const lines = p.split('\n');
lines.forEach((l, i) => { if (/blog-posts|blog-data|blogPosts|getBlogPost/.test(l)) console.log((i + 1) + ': ' + l.trim().slice(0, 120)); });
