const fs = require('fs');
const d = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const posts = Array.isArray(d) ? d : Object.values(d);
const p = posts.find(x => x.slug === 'hong-kong-printing-cost-baseline-2026');
const c = p.content || '';
// 1. inline @types
const types = [...c.matchAll(/"@type"\s*:\s*"([A-Za-z]+)"/g)].map(m => m[1]);
console.log('inline @types:', types.join(', '));
// 2. H2 headings + question-style ratio
const h2s = [...c.matchAll(/<h2>([\s\S]*?)<\/h2>/g)].map(m => m[1].replace(/<[^>]*>/g, ''));
const h3s = [...c.matchAll(/<h3>([\s\S]*?)<\/h3>/g)].map(m => m[1].replace(/<[^>]*>/g, ''));
const qre = /^(如何|怎麽|怎麼|點樣|點解|幾多|幾時|可唔|係咪|是否|哪|那|what|how|why|which|when|can |do |does |is |are |いくら|どう|どの|何|まず|何を|何が)/i;
const all = [...h2s, ...h3s];
const qn = all.filter(h => qre.test(h.trim()));
console.log('H2 count:', h2s.length, '| H3 count:', h3s.length, '| 問句式:', qn.length, '/', all.length);
console.log('H2 list:');
h2s.forEach(h => console.log('  -', h));
// 3. tail structure (last 600 chars) to find CTA insertion point
console.log('--- tail 500 ---');
console.log(c.slice(-500));
