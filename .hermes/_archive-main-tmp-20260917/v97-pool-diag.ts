import fs from 'fs';
import path from 'path';

const ROOT = 'F:\\zprintpro-en-us-images M3的模型生成的图片';
const KNOWN_CATS = ['paper-bags', 'red-packets', 'japan-doujin', 'greeting-cards', 'wedding-invitations', 'wedding-envelope', 'educational', 'envelopes', 'packaging', 'calendars', 'stickers', 'banners', 'posters', 'flyers', 'menus', 'books'];
const VARIANTS = ['multi-angle', 'hero', 'variety', 'detail', 'spread'];

let total = 0, under = 0;
const reasons = {};
const byCat = {};
const unparsed = [];

(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!e.name.startsWith('_')) walk(p); continue; }
    if (!e.name.endsWith('.webp')) continue;
    total++;
    const size = fs.statSync(p).size;
    if (size >= 115 * 1024) { reasons['size>=115KB'] = (reasons['size>=115KB'] || 0) + 1; continue; }
    under++;
    const base = e.name.replace(/^zprintpro-/, '').replace(/\.webp$/, '');
    let variant = VARIANTS.find((v) => base.endsWith('-' + v));
    if (!variant) { reasons['no-variant'] = (reasons['no-variant'] || 0) + 1; if (unparsed.length < 10) unparsed.push(e.name); continue; }
    const rest = base.slice(0, -(variant.length + 1));
    const locale = ['en', 'ja', 'zh-hk'].find((l) => rest.endsWith('-' + l));
    if (!locale) { reasons['no-locale'] = (reasons['no-locale'] || 0) + 1; if (unparsed.length < 10) unparsed.push(e.name); continue; }
    const rest2 = rest.slice(0, -(locale.length + 1));
    const cat = KNOWN_CATS.filter((c) => rest2.startsWith(c + '-')).sort((a, b) => b.length - a.length)[0];
    if (!cat) { reasons['no-cat'] = (reasons['no-cat'] || 0) + 1; if (unparsed.length < 12) unparsed.push(e.name); continue; }
    byCat[cat] = (byCat[cat] || 0) + 1;
  }
})(ROOT);

console.log(`总 webp=${total}  <115KB=${under}`);
console.log('排除原因:', JSON.stringify(reasons));
console.log('可解析(类目×数量, <115KB):');
for (const [k, v] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) console.log(`  ${k}: ${v}`);
console.log('未解析样例:', unparsed.slice(0, 12).join(' | '));
