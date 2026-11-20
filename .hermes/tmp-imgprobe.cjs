const fs = require('fs');
const s = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');
const cats = ['flyers', 'stickers', 'packaging', 'posters', 'banners', 'educational', 'calendars', 'red-packets', 'paper-bags', 'menus', 'books', 'envelopes'];
for (const cat of cats) {
  const i = s.indexOf("category_slug: '" + cat + "'");
  if (i < 0) { console.log(cat + ': NOT FOUND'); continue; }
  const seg = s.slice(i, i + 1200);
  const im = seg.match(/images:\s*\[\s*'([^']+)'/);
  const iml = seg.match(/imagesByLocale:\s*\{\s*['"]?([a-z-]+)['"]?\s*:\s*\[\s*'([^']+)'/);
  console.log(cat + ' -> images: ' + (im ? im[1] : '?') + (iml ? ' | loc0: ' + iml[1] + '=' + iml[2] : ''));
}
